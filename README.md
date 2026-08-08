# zxm-skills

一个用于日常开发与学习的技能仓库，核心内容位于 `skills/`。每个子目录是一个可独立维护的技能包，包含 `SKILL.md`、参考资料，以及可选的脚本与模板文件。

## 仓库结构

```text
zxm-skills/
├─ skills/
│  ├─ agent-browser-skill/          # AI 无头浏览器自动化 CLI
│  ├─ arkts-harmony-one-stop/       # ArkTS + Harmony 一站式开发
│  ├─ chrome-devtools/              # Chrome DevTools 自动化与性能分析
│  ├─ explore-codebase/             # 代码工程系统化探索与文档化
│  ├─ frontend-slides/              # 零依赖动画型 HTML 演示文稿
│  ├─ gemini-image-simple/          # Gemini API 图片生成/编辑
│  ├─ live-action-short-video-generator/ # 真人短视频制作方案（MiniMax H3）
│  ├─ llm-wiki/                     # LLM 维护的结构化 Markdown Wiki
│  ├─ markitdown-skill/             # 文档转 Markdown 工作流
│  ├─ novel-writer/                 # 小说创作助手
│  ├─ ohos-one-stop-build/          # OHOS 一站式构建/安装/启动/日志
│  └─ write-skill/                  # 去除 AI 写作痕迹
├─ AGENTS.md
├─ CLAUDE.md
└─ README.md
```

## 技能清单（当前 12 个）

### 开发与构建

- **arkts-harmony-one-stop** — ArkTS 与 HarmonyOS/OpenHarmony 一站式开发助手。覆盖语法迁移、性能优化、编译错误修复、CodeLinter 质量检查，以及代码-构建-部署-截图-交互-日志排查的端到端开发循环。遇到 `.ets` 文件、`@ohos` 包或 TypeScript 迁移问题时激活。
- **ohos-one-stop-build** — OHOS 模块一键构建、安装 HAP、启动应用、清空并抓取 hilog 日志。标准化 `hvigorw + hdc` 工作流，复现 IDE "Run" 行为。

### 浏览器与 Web 自动化

- **agent-browser-skill** — 面向 AI 智能体的无头浏览器自动化 CLI，基于无障碍树快照和 ref 元素选择。适用于多步骤网页工作流、表单填写、数据爬取、登录、Web 测试等需要确定性元素选择或会话隔离的场景。
- **chrome-devtools** — 基于 Chrome DevTools MCP 的专家级浏览器自动化、调试与性能分析。支持页面导航、截图、网络流量分析、性能追踪与 Core Web Vitals 排查、视口/网络/CPU 环境模拟。

### 代码理解与工程梳理

- **explore-codebase** — 对陌生代码工程进行系统化探索、逆向梳理与文档化总结。适合接手新仓库、入职交接、历史系统盘点、重构前调研、技术方案前置摸底。先建立事实地图，再组织结论输出，推断明确标注来源。

### 内容创作与生成

- **novel-writer** — 专业小说写作助手，支持都市/现实、异世界穿越都市、现代穿越异世界都市等题材。全流程：灵感与大纲生成、角色与世界观管理、正文续写与扩写、风格润色与优化。
- **frontend-slides** — 零依赖、动画丰富的 HTML 演示文稿生成器。单文件内联 CSS/JS，无需 npm 或构建工具。支持从 PowerPoint 转换或从零创建，固定 16:9 舞台。（来源：[zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides)）
- **gemini-image-simple** — 通过 Gemini API 生成和编辑图片，纯 Python 标准库实现，无需 `pip`/`uv`，可在容器或受限环境运行。支持 `--model` 切换模型。
- **live-action-short-video-generator** — 为 3–5 分钟真人叙事短视频制定 MiniMax H3 全能参考模式的完整制作方案：剧本审计、资产圣经、分场分镜、连续性管理、逐镜头 Ref2VA 提示词、批量生成、音频后期、剪辑交付与质量排查。
- **write-skill** — 去除文本中的 AI 生成痕迹。检测并修复夸大象征、宣传性语言、模糊归因、破折号滥用、AI 词汇、否定式排比等模式，使文字更自然。

### 文档处理与知识管理

- **markitdown-skill** — 基于 Microsoft MarkItDown 的文档转 Markdown 工作流与脚本。支持 PDF、Word、PowerPoint、Excel、图片（OCR）、音频（转录）、HTML、YouTube。
- **llm-wiki** — 用 LLM 构建和维护个人结构化 Markdown Wiki。区别于 RAG 每次从零检索，LLM Wiki 让知识编译一次、持续更新实体页、修订摘要、标注矛盾、强化或挑战已有分析。

## 快速使用

```powershell
# 查看所有技能目录
Get-ChildItem skills

# 在技能文档中检索关键词
rg -n "ArkTS|OpenHarmony|markitdown" skills
```

按需进入具体技能目录阅读：

- `skills/<skill-name>/SKILL.md`：技能入口与使用规则（YAML 前置元数据 + Markdown）。
- `skills/<skill-name>/references/`：补充文档与案例。
- `skills/<skill-name>/scripts/`：自动化脚本（如存在）。
- `skills/<skill-name>/assets/`：模板或静态资源（如存在）。

## 贡献与维护

- 新增技能请放在 `skills/<skill-name>/`，目录名使用小写连字符。
- `SKILL.md` 须以 YAML 前置元数据开头，必需字段 `name`、`description`；可选 `license`、`tags`、`allowed-tools`、`metadata`。
- 优先复用现有模板与脚本，不要把临时文件提交到仓库。
- 提交信息建议使用祈使句：`Add ...`、`Update ...`、`Fix ...`，单次提交聚焦一个技能或一个问题。
- 详细贡献规范见 [AGENTS.md](AGENTS.md)。
