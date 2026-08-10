#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const API_ROOT = 'https://svc-drcn.developer.huawei.com/community/servlet/consumer/cn/documentPortal';
const DOC_ROOT = 'https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/';
const DEFAULT_OUTPUT = decodeURIComponent(new URL('../references/', import.meta.url).pathname).replace(/^\/([A-Za-z]):/, '$1:');

const args = new Map();
for (let index = 2; index < process.argv.length; index += 1) {
  const value = process.argv[index];
  if (value.startsWith('--')) {
    const [key, inlineValue] = value.slice(2).split('=', 2);
    args.set(key, inlineValue ?? process.argv[++index] ?? '');
  }
}

const outputRoot = path.resolve(args.get('out') || DEFAULT_OUTPUT);
const pagesRoot = path.join(outputRoot, 'pages');
const concurrency = Math.max(1, Number(args.get('concurrency') || 6));
const now = new Date();
const fetchedAt = now.toISOString();

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function postJson(endpoint, body, attempt = 0) {
  try {
    const response = await fetch(`${API_ROOT}/${endpoint}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(60000),
    });
    const text = await response.text();
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${text.slice(0, 300)}`);
    }
    const data = JSON.parse(text);
    if (data.code !== 0) {
      throw new Error(`${data.code}: ${data.message || '接口返回失败'}`);
    }
    return data.value;
  } catch (error) {
    if (attempt < 3) {
      await sleep(700 * (attempt + 1));
      return postJson(endpoint, body, attempt + 1);
    }
    throw error;
  }
}

function flatten(node, ancestors = []) {
  const current = [...ancestors, node];
  const result = [{ node, ancestors }];
  for (const child of node.children || []) {
    result.push(...flatten(child, current));
  }
  return result;
}

function findNode(nodes, documentName) {
  for (const node of nodes || []) {
    if (node.relateDocument === documentName) return node;
    const match = findNode(node.children, documentName);
    if (match) return match;
  }
  return undefined;
}

function decodeHtml(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#([0-9]+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&amp;/gi, '&');
}

function parseAttributes(source) {
  const attributes = {};
  const expression = /([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match;
  while ((match = expression.exec(source))) {
    attributes[match[1].toLowerCase()] = decodeHtml(match[2] ?? match[3] ?? match[4] ?? '');
  }
  return attributes;
}

function parseHtml(html) {
  const root = { tag: 'root', attributes: {}, children: [] };
  const stack = [root];
  const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
  const tokens = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<!DOCTYPE[\s\S]*?>/gi, '')
    .match(/<[^>]+>|[^<]+/g) || [];

  for (const token of tokens) {
    if (token.startsWith('<')) {
      if (/^<\//.test(token)) {
        const tag = token.slice(2, -1).trim().toLowerCase();
        while (stack.length > 1) {
          const current = stack.pop();
          if (current.tag === tag) break;
        }
        continue;
      }
      if (/^<!/.test(token) || /^<\?/.test(token)) continue;
      const match = token.match(/^<\s*([^\s/>]+)([\s\S]*?)(\/?)>$/);
      if (!match) continue;
      const node = { tag: match[1].toLowerCase(), attributes: parseAttributes(match[2]), children: [] };
      stack.at(-1).children.push(node);
      if (!voidTags.has(node.tag) && !match[3]) stack.push(node);
    } else {
      stack.at(-1).children.push({ tag: '#text', text: decodeHtml(token), children: [] });
    }
  }
  return root;
}

function textContent(node) {
  if (node.tag === '#text') return node.text;
  return (node.children || []).map(textContent).join('');
}

function cleanInline(value) {
  return value
    .replace(/[ \t\r\n]+/g, ' ')
    .replace(/ +([,.;:!?，。；：！？])/g, '$1')
    .trim();
}

function inlineMarkdown(nodes) {
  return cleanInline((nodes || []).map((node) => {
    if (node.tag === '#text') return node.text;
    if (['script', 'style', 'head', 'nav'].includes(node.tag)) return '';
    if (node.tag === 'br') return '\n';
    if (node.tag === 'strong' || node.tag === 'b') return `**${inlineMarkdown(node.children)}**`;
    if (node.tag === 'em' || node.tag === 'i') return `*${inlineMarkdown(node.children)}*`;
    if (node.tag === 'del' || node.tag === 's') return `~~${inlineMarkdown(node.children)}~~`;
    if (node.tag === 'code') return `\`${textContent(node).trim()}\``;
    if (node.tag === 'a') {
      const label = inlineMarkdown(node.children) || node.attributes.href || '';
      const href = node.attributes.href || '';
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return label;
      return `[${label}](${href})`;
    }
    if (node.tag === 'img') {
      const source = node.attributes.src || '';
      if (!source || source.startsWith('data:')) return '';
      const absolute = new URL(source, DOC_ROOT).href;
      return `![${node.attributes.alt || ''}](${absolute})`;
    }
    return inlineMarkdown(node.children);
  }).join(''));
}

function blockMarkdown(node) {
  if (node.tag === '#text') return node.text;
  if (['script', 'style', 'head', 'nav', 'noscript'].includes(node.tag)) return '';
  if (/^h[1-6]$/.test(node.tag)) {
    const level = Number(node.tag.slice(1));
    return `\n${'#'.repeat(level)} ${inlineMarkdown(node.children)}\n\n`;
  }
  if (node.tag === 'pre') {
    const code = textContent(node).replace(/^\s*\n|\n\s*$/g, '');
    const className = textContent(node).includes('```') ? '' : (node.attributes.class || '');
    const language = (className.match(/(?:language|lang)-([\w+-]+)/i) || [])[1] || '';
    return `\n\n\`\`\`${language}\n${code}\n\`\`\`\n\n`;
  }
  if (node.tag === 'blockquote') {
    const content = renderChildren(node).trim().split('\n').map((line) => `> ${line}`.trimEnd()).join('\n');
    return `\n\n${content}\n\n`;
  }
  if (node.tag === 'ul' || node.tag === 'ol') return listMarkdown(node);
  if (node.tag === 'table') return tableMarkdown(node);
  if (node.tag === 'hr') return '\n\n---\n\n';
  if (node.tag === 'br') return '\n';
  if (node.tag === 'img') return `\n\n${inlineMarkdown([node])}\n\n`;
  if (['html', 'body', 'p', 'div', 'section', 'article', 'header', 'footer', 'figure', 'figcaption', 'dl', 'dt', 'dd', 'main'].includes(node.tag)) {
    return `\n${renderChildren(node)}\n`;
  }
  return inlineMarkdown(node.children);
}

function renderChildren(node) {
  return (node.children || []).map(blockMarkdown).join('');
}

function listMarkdown(node) {
  const ordered = node.tag === 'ol';
  const lines = [];
  let index = 1;
  for (const child of node.children || []) {
    if (child.tag !== 'li') continue;
    const nested = (child.children || []).filter((item) => item.tag === 'ul' || item.tag === 'ol');
    const main = (child.children || []).filter((item) => !nested.includes(item));
    const prefix = ordered ? `${index}. ` : '- ';
    const content = cleanInline(main.map((item) => item.tag === '#text' ? item.text : inlineMarkdown([item])).join(''));
    lines.push(`${prefix}${content}`);
    for (const list of nested) {
      const nestedText = listMarkdown(list).trim().split('\n').map((line) => `  ${line}`).join('\n');
      lines.push(nestedText);
    }
    index += 1;
  }
  return `\n\n${lines.join('\n')}\n\n`;
}

function tableMarkdown(node) {
  const rows = [];
  function findRows(current) {
    if (current.tag === 'tr') rows.push(current);
    else for (const child of current.children || []) findRows(child);
  }
  findRows(node);
  const values = rows.map((row) => (row.children || [])
    .filter((cell) => cell.tag === 'th' || cell.tag === 'td')
    .map((cell) => inlineMarkdown(cell.children).replace(/\|/g, '\\|')));
  if (!values.length) return '';
  const width = Math.max(...values.map((row) => row.length));
  const normalized = values.map((row) => [...row, ...Array(width - row.length).fill('')]);
  const header = `| ${normalized[0].join(' | ')} |`;
  const separator = `| ${normalized[0].map(() => '---').join(' | ')} |`;
  const body = normalized.slice(1).map((row) => `| ${row.join(' | ')} |`);
  return `\n\n${[header, separator, ...body].join('\n')}\n\n`;
}

function toMarkdown(html) {
  const root = parseHtml(html);
  let markdown = renderChildren(root)
    .replace(/\[h[1-6]\]\s*/gi, '')
    .replace(/\n[ \t]+\n/g, '\n\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return markdown ? `${markdown}\n` : '';
}

function pageFileName(documentName) {
  return `${documentName.replace(/[^a-zA-Z0-9._-]/g, '-')}.md`;
}

function pageEntry(item) {
  const node = item.node;
  const ancestors = item.ancestors.filter((ancestor) => ancestor.relateDocument !== 'form-kit');
  return {
    slug: node.relateDocument,
    title: node.nodeName,
    path: ancestors.map((ancestor) => ancestor.nodeName).concat(node.nodeName),
    file: `pages/${pageFileName(node.relateDocument)}`,
    url: `${DOC_ROOT}${node.relateDocument}`,
  };
}

async function mapWithConcurrency(items, worker) {
  const output = new Array(items.length);
  let next = 0;
  async function run() {
    while (true) {
      const index = next;
      next += 1;
      if (index >= items.length) return;
      output[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, run));
  return output;
}

function indexMarkdown(entries, rootTitle) {
  const lines = [
    `# ${rootTitle}`,
    '',
    `> 来源：${DOC_ROOT}form-kit`,
    `> 采集时间：${fetchedAt}`,
    `> 页面数量：${entries.length}`,
    '> 采集范围：Form Kit 目录节点及其全部下级目录页；页面正文引用的其他 Kit/API 文档不在本次目录快照范围内。',
    '',
    '## 页面目录',
    '',
  ];
  for (const entry of entries) {
    const indent = '  '.repeat(Math.max(0, entry.path.length - 2));
    lines.push(`${indent}- [${entry.title}](${entry.file})`);
  }
  lines.push('', '## 使用说明', '', '- `pages/` 下每个文件对应一个官方文档页面。', '- 页面正文按官方目录顺序保存，代码、表格、链接和图片引用尽量保持原结构。', '- 需要核对最新内容时，重新运行 `scripts/collect_form_kit.mjs`。', '');
  return lines.join('\n');
}

await fs.mkdir(pagesRoot, { recursive: true });
const treeValue = await postJson('getCatalogTree', { language: 'cn', catalogName: 'harmonyos-guides', objectId: 'form-kit', showHide: 0 });
const rootNode = findNode(treeValue.catalogTreeList, 'form-kit');
if (!rootNode) throw new Error('未在 harmonyos-guides 目录中找到 form-kit 节点');
const root = flatten(rootNode)[0];
const catalogItems = flatten(root.node).map(pageEntry);

console.log(`发现 ${catalogItems.length} 个页面，开始获取正文...`);
const pages = await mapWithConcurrency(catalogItems, async (entry, index) => {
  const value = await postJson('getDocumentById', { language: 'cn', objectId: entry.slug });
  const html = value.content?.content || '';
  if (!html) throw new Error(`${entry.slug} 返回空正文`);
  const markdown = [
    `# ${value.title || entry.title}`,
    '',
    `> 来源：${entry.url}`,
    `> 文档标识：${entry.slug}`,
    `> 官方版本：${value.version || '未提供'}`,
    `> 采集时间：${fetchedAt}`,
    '',
    toMarkdown(html).replace(/^# .*\n+/, ''),
  ].join('\n').replace(/\n{3,}/g, '\n\n');
  await fs.writeFile(path.join(pagesRoot, pageFileName(entry.slug)), `${markdown.trim()}\n`, 'utf8');
  console.log(`[${index + 1}/${catalogItems.length}] ${entry.slug}`);
  return { ...entry, title: value.title || entry.title };
});

await fs.writeFile(path.join(outputRoot, 'index.md'), indexMarkdown(pages, root.node.nodeName), 'utf8');
await fs.writeFile(path.join(outputRoot, 'manifest.json'), JSON.stringify({ source: `${DOC_ROOT}form-kit`, fetchedAt, pageCount: pages.length, pages }, null, 2) + '\n', 'utf8');
console.log(`完成：${pages.length} 个 Markdown 页面，输出目录：${outputRoot}`);
