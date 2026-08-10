# ArkTS卡片进程模型

> 来源：https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-widget-process
> 文档标识：arkts-ui-widget-process
> 官方版本：V199
> 采集时间：2026-08-10T04:11:03.426Z

本文主要介绍，卡片从创建到显示整个过程中各个进程的含义。具体请参考卡片进程模型。

图1 卡片进程模型

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/76/v3/Y1XN9llCT_i3SQPcaYxQJQ/zh-cn_image_0000002698220973.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=681185D378FEF9F0BD4754D614B3A644F197C4F566FBB7E1E79A01168FF7FBC4)

- 卡片使用方进程：显示卡片的宿主进程，例如桌面进程。
- 卡片渲染服务进程：系统内统一加载渲染卡片UI的进程，所有卡片渲染在同一个进程内，不同的应用卡片通过虚拟机隔离。
- 卡片管理服务进程：系统内统一卡片生命周期的系统[SA](https://developer.huawei.com/consumer/cn/doc/lite-wearable-guides/serviceability-overview)服务。
- 卡片提供方进程：提供卡片的应用进程，包括应用自身UIAbility运行的主进程，以及卡片单独的[FormExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formextensionability)进程。两个进程之间内存隔离，但是共享相同的文件沙箱。
