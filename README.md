# zxm-skills

一个用于日常开发与学习的技能仓库，核心内容位于 `skills/`。每个子目录是一个可独立维护的技能包，包含 `SKILL.md`、参考资料、以及可选脚本/模板文件。

## 仓库结构

```text
zxm-skills/
├─ skills/
│  ├─ arkts-syntax-assistant-zh/
│  ├─ harmony-dev/
│  ├─ markitdown-skill/
│  ├─ novel-writer/
│  ├─ ohos-one-stop-build/
│  └─ skill-arkts-syntax-assistant/
├─ AGENTS.md
└─ README.md
```

## 技能清单（当前）

- `arkts-syntax-assistant-zh`：ArkTS 语法与迁移辅助（中文）。
- `skill-arkts-syntax-assistant`：ArkTS 语法与迁移辅助（双语版本）。
- `harmony-dev`：Harmony/OpenHarmony 端到端开发工作流指引。
- `ohos-one-stop-build`：OHOS 一站式构建、安装、启动与日志抓取流程。
- `markitdown-skill`：基于 MarkItDown 的文档转 Markdown 工作流与脚本。
- `novel-writer`：小说创作辅助（大纲、角色、续写、润色）。

## 快速使用

```powershell
# 查看所有技能目录
Get-ChildItem skills

# 在技能文档中检索关键词
rg -n "ArkTS|OpenHarmony|markitdown" skills
```

按需进入具体技能目录阅读：

- `skills/<skill-name>/SKILL.md`：技能入口与使用规则。
- `skills/<skill-name>/references/`：补充文档与案例。
- `skills/<skill-name>/scripts/`：自动化脚本（如存在）。

## 贡献与维护

- 新增技能请放在 `skills/<skill-name>/`，目录名使用小写连字符。
- 优先复用现有模板与脚本，不要把临时文件提交到仓库。
- 提交信息建议使用祈使句：`Add ...`、`Update ...`、`Fix ...`。
- 详细贡献规范见 [AGENTS.md](AGENTS.md)。
