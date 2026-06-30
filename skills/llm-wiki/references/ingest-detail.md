# Ingest 详细流程与模板

## 目录

- [完整 Ingest 流程](#complete-ingest-flow)
- [摘要页结构](#summary-page-structure)
- [Frontmatter 模板](#frontmatter-template)

## 完整 Ingest 流程

一次完整导入产生的操作：

1. **复制原文到 `raw/`** — 保持原始资料不可变
2. **创建摘要页** — `source-xxx.md`，包含：
   - YAML frontmatter（tags、source、author、date、url）
   - 来源信息
   - 核心观点提炼
   - 关键数据/案例
   - 注意事项
   - `[[双向链接]]` 指向相关实体和概念页
3. **创建/更新实体页** — 每个重要工具、产品、人物一个页面
4. **创建/更新概念页** — 每个方法论、模式、工作流一个页面
5. **交叉引用** — 所有页面之间用 `[[wikilink]]` 互相关联
6. **更新 index.md** — 按类别（资料摘要/实体/概念）添加新条目
7. **更新 log.md** — 记录创建了哪些页面、更新了哪些页面、关键要点、与已有知识的关联

## 摘要页结构

摘要页推荐包含以下段落：

```markdown
# 来源：{文章标题}

## 来源信息
- 作者：xxx
- 日期：YYYY-MM-DD
- URL：xxx

## 核心观点
- 观点1
- 观点2

## 关键数据/案例
- 数据/案例1

## 注意事项
- 限制/前提条件

## 相关概念
- [[实体A]] — ...
- [[概念B]] — ...
```

## Frontmatter 模板

### 资料摘要页

```yaml
---
tags: [source-summary, 领域标签1, 领域标签2]
type: source
source: "原文标题"
author: 作者名
date: YYYY-MM-DD
url: "原始链接"
---
```

### 实体页

```yaml
---
tags: [entity, tool]
type: entity
---
```

### 概念页

```yaml
---
tags: [concept]
type: concept
---
```

### 工作流页

```yaml
---
tags: [workflow]
type: workflow
---
```
