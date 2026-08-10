---
name: harmonyos-form-kit
description: 基于华为官方 HarmonyOS Form Kit（卡片开发服务）文档，辅助设计、开发、配置、调试和评审服务卡片。需要处理 ArkTS 卡片、JS 卡片、Stage/FA 模型、FormExtensionAbility 生命周期、form_config.json、卡片刷新与页面交互、互动卡片、锁屏卡片、背板透明卡片、卡片编辑、加桌或适配问题时使用。
---

# HarmonyOS Form Kit

使用随附的华为官方 Form Kit 文档快照，为 HarmonyOS 卡片相关任务提供可检索的实现依据。资料按官方目录拆分为 51 个 Markdown 页面，入口索引见 [references/index.md](references/index.md)。

## 工作流程

1. 先阅读 [references/index.md](references/index.md)，根据任务定位具体页面；不要默认加载全部正文。
2. 按任务选择最小资料集：
   - 创建与配置：`arkts-form-overview.md`、`arkts-ui-widget-creation.md`、`arkts-ui-widget-configuration.md`。
   - 生命周期与刷新：`arkts-ui-widget-lifecycle.md`、`arkts-ui-widget-interaction.md` 及其下级页面、`form-refresh-and-data-interaction.md`。
   - 卡片事件：`arkts-ui-widget-event.md` 及 `arkts-ui-widget-event-*.md` 页面。
   - 互动卡片：`arkts-ui-liveform*.md` 页面。
   - JS 卡片：`form-js-ui.md`、`js-ui-widget-*.md`、`widget-development-fa.md`。
   - 术语、兼容性和疑难问题：`form-glossary.md`、`arkts-ui-widget-adapt-faq.md`。
3. 结合用户工程中的 `build-profile.json5`、`module.json5`、`form_config.json`、ArkTS/JS 源文件和实际 API version 验证结论。资料快照不是对当前 SDK 的替代，不能把快照里的版本号或能力直接当成用户工程版本。
4. 给出实现或修改时，优先引用官方页面中的配置字段、生命周期回调、事件参数和接口链接；发现文档与工程版本不一致时明确指出差异。

## 关键判断

- 优先推荐 Stage 模型和 ArkTS 卡片，但只有在用户工程与目标 API version 支持时才迁移；FA/JS 卡片任务应沿用对应页面的模型和配置。
- 区分卡片提供方、卡片使用方和卡片管理服务；生命周期回调属于提供方，页面事件和 `postCardAction` 负责跨进程或跨 Ability 交互。
- 配置问题先检查卡片五元组、`FormExtensionAbility` 的 `metadata`、`form_config.json` 的 `uiSyntax`/尺寸/刷新字段，以及 `module.json5` 的 Ability 与权限声明。
- 刷新问题先区分主动刷新、被动刷新、Push 刷新、事件触发刷新和应用侧数据同步，再核对 `formId` 持久化与 `formProvider.updateForm()` 调用链。
- 涉及能力边界、废弃字段或 API version 时，以页面正文和链接到的 references 页面为准，并保留“官方版本：V227”的来源标记。

## 资料更新

`references/manifest.json` 记录来源、采集时间和页面清单。需要更新官方资料时，在 Skill 根目录执行：

```powershell
node .\scripts\collect_form_kit.mjs
```

脚本从华为公开的 `getCatalogTree` 和 `getDocumentById` 接口递归获取 `form-kit` 目录，输出 `references/index.md`、`references/manifest.json` 和 `references/pages/*.md`。联网更新后应检查页面数量、失败日志、Markdown 标题、代码块和表格；不要把登录态、Cookie 或私有接口数据写入 Skill。
