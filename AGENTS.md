# Repository Guidelines

## 项目结构与模块组织

本仓库以 `skills/` 为核心，每个子目录代表一个独立技能包（例如 `arkts-syntax-assistant-zh`、`harmony-dev`、`markitdown-skill`）。
每个技能通常包含 `SKILL.md`（入口说明）、`references/`（参考文档）、可选 `scripts/`（自动化脚本）与 `assets/`（模板或静态资源）。
根目录仅保留轻量文件：`README.md`、`.gitignore`、本指南。新增技能请放在 `skills/<skill-name>/`，避免把实现散落到根目录。

## 构建、测试与开发命令

仓库当前没有统一的根级构建系统，按技能目录执行命令：

- `Get-ChildItem skills`：快速查看已安装技能。
- `rg -n "pattern" skills`：在技能文档或脚本中定位内容。
- `powershell -ExecutionPolicy Bypass -File skills/arkts-syntax-assistant-zh/scripts/run.ps1`：运行该技能示例脚本。
- `cd skills/markitdown-skill; npm install`：安装 Node 依赖（仅该技能需要时）。
提交前至少运行与改动相关的脚本或示例，确保文档命令可复现。

## 代码风格与命名规范

Markdown 文档优先使用简洁标题与短段落，路径、命令、标识符保持原文。脚本文件遵循语言默认风格（PowerShell/ Python/ Shell）。
命名采用小写连字符：`skill-name`；文档名使用语义化名称，如 `reference.md`、`USAGE-GUIDE.md`。避免使用含糊命名（如 `test1.md`、`new.ps1`）。

## 测试指南

当前未配置统一测试框架与覆盖率门禁。默认采用“变更即验证”：

- 文档改动：检查链接、命令、路径是否可执行。
- 脚本改动：在对应技能目录做一次最小可运行验证。
- Node 技能：如存在 `package.json`，优先执行 `npm test`（若脚本已定义）。
新增自动化测试时，建议放入对应技能目录并使用 `*.test.*` 命名。

## 提交与 Pull Request 规范

现有提交历史采用简短祈使句风格（如 `Add ...`、`Initial commit`）。建议继续使用：

- 提交标题：`Add/Update/Fix <scope>: <summary>`
- 单次提交聚焦一个技能或一个问题。

PR 需包含：

- 变更目的与影响范围。
- 关键文件清单（例如 `skills/<name>/SKILL.md`）。
- 验证方式与结果（执行了哪些命令）。
- 涉及文档渲染或命令输出时，附截图或关键输出片段。

## 安全与配置提示

不要提交密钥、令牌或本地绝对路径。示例命令请使用相对路径；如需平台差异说明，分别给出 PowerShell 与 Bash 版本。
