---
name: llm-wiki
description: "LLM Wiki - 用 LLM 构建和维护个人结构化 Markdown 知识库 Wiki。当用户需要创建知识库、导入资料到 Wiki、查询知识库内容、维护知识库健康状态时触发。关键词：知识库、wiki、ingest、导入资料、知识整理、知识管理。不触发：非知识库的通用问答、非 Wiki 的文件管理、无持续积累需求的单次文档摘要。"
---

# LLM Wiki

持续积累的结构化 Markdown Wiki。不同于 RAG 每次从零检索，LLM Wiki 让知识编译一次、持续更新——更新实体页、修订摘要、标注矛盾、强化或挑战已有综合分析。

## 架构

### Raw Sources（`raw/`）
不可变原始资料。LLM 只读不改。真相来源。

### Wiki（`wiki/`）
LLM 生成并维护的 Markdown 页面集。包含：摘要页、实体页、概念页、比较页、综合分析页。LLM 全权管理创建、更新、交叉引用、一致性。

> **重要约定：Wiki 所有页面内容必须用中文书写。** 代码片段、命令、变量名、缩略词等无法翻译为中文的技术术语除外。标题、正文叙述、总结、标注等一律使用中文。

### Schema（`CLAUDE.md`）
定义 Wiki 结构、约定、工作流。用户和 LLM 共同迭代。模板见 [schema-template.md](references/schema-template.md)。

## 关键文件

- `wiki/index.md` — 按类别组织的内容目录（实体、概念、来源等），每条含链接 + 一句话摘要。每次导入时更新。查询从此开始。
- `wiki/log.md` — 追加式操作日志。格式：`## [YYYY-MM-DD] ingest | 主题`。

## 三大操作

### Ingest（导入）

当用户说"导入"、"添加到知识库"、"处理这份资料"时：

1. 读取 `raw/` 中的新资料
2. 与用户讨论关键要点
3. 在 `wiki/` 中创建摘要页
4. 更新 `wiki/index.md`
5. 更新相关的实体页和概念页（可能涉及 10-15 个页面）
6. 在 `wiki/log.md` 中追加记录
7. 标注新资料与已有内容的矛盾之处

详细流程、摘要页结构和 frontmatter 模板见 [ingest-detail.md](references/ingest-detail.md)。

### Query（查询）

当用户提问或要求分析时：

1. 读取 `wiki/index.md` 定位相关页面
2. 深入阅读相关页面
3. 综合回答，附带引用
4. 有价值的回答回写为 Wiki 新页面（让探索也能复利积累）

输出格式：Markdown、比较表格、Marp 演示文稿、图表等。

### Lint（维护）

当用户说"检查知识库"、"维护一下"时：

1. 检查页面间的矛盾
2. 发现被新资料取代的过时内容
3. 找出无入站链接的孤立页面
4. 识别被提及但缺少专属页面的重要概念
5. 发现缺失的交叉引用
6. 建议可通过网络搜索填补的数据空白
7. 建议值得调查的新问题和新资料来源

## 初始化

当用户说"创建知识库"、"初始化 wiki"时：

运行 `python scripts/init_wiki.py <目标目录>` 创建目录结构和模板文件。脚本生成：

- `raw/` 和 `raw/assets/`
- `wiki/`（含 `index.md` 和 `log.md`）
- `CLAUDE.md` schema 文件

## 参考文档

- **[practice.md](references/practice.md)** — 实战经验：资料获取技巧、页面命名规范、交叉引用原则、知识关联发现、版本管理、常见导入规模
- **[ingest-detail.md](references/ingest-detail.md)** — Ingest 详细流程、摘要页结构、各类页面 frontmatter 模板
- **[schema-template.md](references/schema-template.md)** — CLAUDE.md schema 起始模板及默认约定
