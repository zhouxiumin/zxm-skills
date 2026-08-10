# 场景动效类型互动卡片概述

> 来源：https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-sceneanimation-overview
> 文档标识：arkts-ui-liveform-sceneanimation-overview
> 官方版本：V201
> 采集时间：2026-08-10T04:11:03.426Z

从API version 20开始，场景动效类型互动卡片支持在特定场景下触发互动卡片的特有效果。例如，开发者可以选择将动效渲染区域扩展到卡片自身的渲染区域之外，营造“破框”效果。

#### 基本概念

场景动效类型互动卡片主要包含两个状态：激活态和非激活态。卡片生命周期中的事件，如数据定时或定点刷新、用户点击等交互场景，可触发卡片动效，使卡片切换至激活态。动效结束后，卡片切回非激活态。

非激活态：在此状态下，卡片与普通卡片行为无异，遵循既有的卡片开发规范，卡片UI由卡片提供方widgetCard.ets中的内容所呈现。

激活态： 表示互动卡片动效渲染状态，在此状态下，卡片UI由卡片提供方所开发的

[LiveFormExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-liveformextensionability)

对应page页面完成渲染。详细可参考

[场景动效类型互动卡片开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-sceneanimation-development)

。

图1 互动卡片状态切换说明

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d4/v3/F1wLf0iOR_iE2Qfs4SQv6A/zh-cn_image_0000002698140909.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=B6C256E5CF8730043694442AC01145EC7D0EF0A937B6D64FEFFC6CE35E6093B3)

图2 互动卡片动效触发流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ef/v3/TTgrbe4_QimpGbNHiNgP9Q/zh-cn_image_0000002668301244.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=91E3EB72F1C7C66B55ECD36E0BFBE551753F37DEA90562EE7602706D41947173)

#### 实现原理

开发者可以通过

[formProvider.requestOverflow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formprovider#formproviderrequestoverflow20)

接口触发互动卡片动效，例如在用户点击时触发，典型时序图如下。

图3 点击触发互动卡片动效时序图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ab/v3/sJaQB-XASmy6By4JU7YSwg/zh-cn_image_0000002668461120.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=7390E25560F668F87F0D42FAB983D72E9F5878000109C757535735563F8E0C71)

图4 定时定点触发互动卡片动效时序图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/af/v3/wm3V5WALRR6iaapAbvEfqA/zh-cn_image_0000002698220999.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=4E7D62ECF91206AAD1E2A4B6FDE2F8547172D89EA017A9FD79E32FC4D4454931)

图5 摇一摇触发互动卡片动效时序图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/48/v3/USh1ly9lSJObnanrlAR6pw/zh-cn_image_0000002698140911.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=EF96C702B798367D1B17CC78AD26D01C04B7AF1D2B8C70D06F2270FA1CFF6CF0)

#### 约束和限制

#### 支持的场景

1. 当前互动卡片动效只有在[FormLocation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-forminfo#formlocation20)为“DESKTOP”的单张卡片上面才能生效。
2. 由于性能功耗影响只支持部分机型，在不支持的机型会报[801](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal#section801-该设备不支持此api)错误码。

#### 请求参数约束

1. 互动卡片申请动效的最大合法动效时长：3500ms，倒计时结束时，卡片将切换回非激活态。
2. 由卡片定时定点刷新触发的互动卡片动效，一天内单张卡片最多触发50次。
3. 最大可申请动效区域：如下图，矩形ABCD表示卡片自身渲染区域，矩形IJKL表示卡片最大可申请动效区域。两个矩形中心对齐。尺寸满足以下表格描述。

| 卡片样式 | JK 边长 | IJ 边长 |
| --- | --- | --- |
| 1 * 2 | 不超过AD边长的150%。 | 不超过AB边长的200%。 |
| 2 * 2 | 不超过AD边长的150%。 | 不超过AB边长的150%。 |
| 2 * 4 | 不超过AD边长的125%。 | 不超过AB边长的150%。 |
| 4 * 4 | 不超过AD边长的125%。 | 不超过AB边长的125%。 |
| 6 * 4 | 不超过AD边长的125%。 | 不超过AB边长的110%。 |

图6 互动卡片动效区域申请规则说明

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/80/v3/KfsCimE_QkOLEKxDaq1IQw/zh-cn_image_0000002668301246.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=EF7A62A8BAAD13C30B1D2A574BEEAD54072460FEDB8BE3704CB47970D9E32A14)

例如：某设备上一个2*2卡片宽度为158vp，高度为158vp。对应上图则有：

（1）AD=158vp，AB=158vp，IJ=158*1.5=237vp，JK=158*1.5=237vp。

（2）IA两点水平相距39.5vp，垂直相距39.5vp。

因此，以A点为原点，向右为X轴正方向，向下为Y轴正方向，图5中E点的合法坐标可以是（-20，-20），EF边长合法值可以是200vp，EH边长合法值可以是200vp。

互动卡片可以通过调用

[formProvider.getFormRect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formprovider#formprovidergetformrect20)

接口获取卡片在窗口中的尺寸及相对坐标位置信息。卡片提供方以此计算动效申请范围，坐标计算时，以上图A点为（0,0）点，计算矩形EFGH对应参数，单位为vp。

调用

[formProvider.requestOverflow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formprovider#formproviderrequestoverflow20)

接口时，

[overflowInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-forminfo#overflowinfo20)

中描述的互动卡片动效渲染区域（矩形EFGH）需要满足：

1. 包含了卡片（矩形ABCD）的全部区域。
2. 不超过矩形IJKL（矩形IJKL完整包含矩形EFGH）。

具体可参考

[场景动效类型互动卡片开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-liveform-sceneanimation-development)

。

#### 功耗约束

1. 设备进入省电模式时，互动卡片不响应动效请求。
2. 当设备热档位进入HOT时，不再响应非点击触发的动效请求；当热档位进入OVERHEATED时，不再响应所有动效请求。具体可参考[热档位信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-thermal#thermallevel)。

#### 动效请求约束

1. 同一时刻，全局只有一个卡片执行互动卡片动效。
2. 当用户通过点击等方式主动触发互动卡片动效时，优先响应此次请求。此时，当前卡片切换到激活态，执行动效，其他卡片切换到非激活态。
3. 其他触发方式，例如通过卡片定时定点数据刷新机制触发动效，遵循先到先得原则。系统只处理第一个合法动效请求。其他请求返回失败，同时不做缓存。
4. 用户在桌面的其他有效操作（点击应用、卡片等，滑动翻页，下拉进入全搜、双中心、拖动卡片、长按卡片等）均会打断当前动效，卡片重新变成非激活态。
5. 互动卡片执行动效期间，超过卡片自身渲染范围（对应图5中的矩形ABCD）的交互事件，互动卡片不做响应。
6. 更多场景动效类型互动卡片激活态能力约束，可参考[LiveFormExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-liveformextensionability)中说明。

