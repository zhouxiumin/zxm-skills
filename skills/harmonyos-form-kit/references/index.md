# Form Kit（卡片开发服务）

> 来源：https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/form-kit
> 采集时间：2026-08-10T04:11:03.426Z
> 页面数量：51
> 采集范围：Form Kit 目录节点及其全部下级目录页；页面正文引用的其他 Kit/API 文档不在本次目录快照范围内。

## 页面目录

- [Form Kit（卡片开发服务）](pages/form-kit.md)
- [Form Kit简介](pages/formkit-overview.md)
- [ArkTS卡片开发（推荐）](pages/arkts-ui.md)
- [ArkTS卡片概述](pages/arkts-form-overview.md)
- [创建ArkTS卡片](pages/arkts-ui-widget-creation.md)
- [配置ArkTS卡片的配置文件](pages/arkts-ui-widget-configuration.md)
- [管理ArkTS卡片生命周期](pages/arkts-ui-widget-lifecycle.md)
- [ArkTS卡片进程模型](pages/arkts-ui-widget-process.md)
- [ArkTS卡片提供方开发指导](pages/arkts-ui-widget.md)
  - [ArkTS卡片UI界面开发](pages/arkts-ui-widget-page.md)
    - [ArkTS卡片界面开发概述](pages/arkts-ui-widget-page-overview.md)
    - [ArkTS卡片为组件添加动效](pages/arkts-ui-widget-page-animation.md)
    - [ArkTS卡片使用画布组件绘制自定义图形](pages/arkts-ui-widget-page-custom-drawing.md)
    - [ArkTS卡片使用自定义字体](pages/arkts-ui-widget-load-custom-font.md)
  - [ArkTS卡片页面刷新](pages/arkts-ui-widget-interaction.md)
    - [ArkTS卡片页面刷新概述](pages/arkts-ui-widget-interaction-overview.md)
    - [ArkTS卡片主动刷新](pages/arkts-ui-widget-active-refresh.md)
    - [ArkTS卡片被动刷新](pages/arkts-ui-widget-passive-refresh.md)
    - [ArkTS卡片Push刷新](pages/arkts-ui-widget-update-by-push.md)
    - [刷新本地图片和网络图片](pages/arkts-ui-widget-image-update.md)
    - [根据卡片状态刷新不同内容](pages/arkts-ui-widget-update-by-status.md)
  - [ArkTS卡片页面交互](pages/arkts-ui-widget-event.md)
    - [ArkTS卡片页面交互概述](pages/arkts-ui-widget-event-overview.md)
    - [卡片跳转到应用页面（router事件）](pages/arkts-ui-widget-event-router.md)
    - [卡片拉起应用UIAbility到后台（call事件）](pages/arkts-ui-widget-event-call.md)
    - [卡片传递消息给应用（message事件）](pages/arkts-ui-widget-event-formextensionability.md)
    - [通过router或call事件刷新卡片内容](pages/arkts-ui-widget-event-uiability.md)
  - [ArkTS卡片编辑](pages/arkts-ui-widget-edit.md)
    - [ArkTS卡片编辑概述](pages/arkts-ui-widget-event-formeditextensionability-overview.md)
  - [应用内请求卡片加桌](pages/arkts-ui-widget-add.md)
    - [应用内拉起卡片管理加桌](pages/arkts-ui-widget-open-formmanager.md)
  - [ArkTS锁屏卡片](pages/arkts-ui-lockscreen-form.md)
    - [锁屏卡片开发指导](pages/arkts-ui-lockscreen-form-development.md)
  - [ArkTS背板透明卡片](pages/arkts-ui-transparent-backplate-form.md)
    - [背板透明卡片开发指导](pages/arkts-ui-transparent-backplate-form-development.md)
  - [ArkTS待机屏保卡片开发指导](pages/arkui-ui-standby-form-development.md)
- [互动卡片开发](pages/arkts-ui-liveform.md)
  - [互动卡片概述](pages/arkts-ui-liveform-overview.md)
  - [趣味交互类型互动卡片开发指导](pages/arkts-ui-liveform-funinteraction-development.md)
  - [场景动效类型互动卡片](pages/arkts-ui-liveform-sceneanimation.md)
    - [场景动效类型互动卡片概述](pages/arkts-ui-liveform-sceneanimation-overview.md)
    - [场景动效类型互动卡片开发指导](pages/arkts-ui-liveform-sceneanimation-development.md)
- [ArkTS卡片最佳实践](pages/arkts-ui-best-practice.md)
  - [音乐服务卡片](pages/arkts-ui-music-service-form.md)
  - [卡片更新与数据交互](pages/form-refresh-and-data-interaction.md)
- [ArkTS卡片适配常见问题](pages/arkts-ui-widget-adapt-faq.md)
- [JS卡片开发](pages/form-js-ui.md)
- [JS卡片概述](pages/js-ui-widget-overview.md)
- [JS卡片开发指导（Stage模型）](pages/js-ui-widget-development.md)
- [JS卡片开发指导（FA模型）](pages/widget-development-fa.md)
- [Form Kit术语](pages/form-glossary.md)

## 使用说明

- `pages/` 下每个文件对应一个官方文档页面。
- 页面正文按官方目录顺序保存，代码、表格、链接和图片引用尽量保持原结构。
- 需要核对最新内容时，重新运行 `scripts/collect_form_kit.mjs`。
