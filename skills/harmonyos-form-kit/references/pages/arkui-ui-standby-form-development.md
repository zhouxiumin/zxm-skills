# ArkTS待机屏保卡片开发指导

> 来源：https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkui-ui-standby-form-development
> 文档标识：arkui-ui-standby-form-development
> 官方版本：V28
> 采集时间：2026-08-10T04:11:03.426Z

从API version 23开始，Form Kit提供在设备待机屏保界面（即横屏充电锁屏状态下显示的界面）上显示卡片的能力，用以展示重要信息，旨在待机下也可陪伴用户。待机屏保卡片用于展示天气、日历等信息，并支持用户个性化定制。

本文介绍了待机屏保卡片的使用步骤、约束限制，并给出开发指导。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ac/v3/fKtwSx6OSUWkBTtknanVuA/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=95E12E416A71946F9BCBCA11FB1BC3A117E980A1A3DAB0AE165886CCE099F0BF)

在待机屏保界面下默认为深色模式不会跟随系统。

#### 亮点/特征

- 丰富待机显示，提供个性美观的待机显示页面，打造全场景、个性化的“百变”心灵陪伴。
- 提供情感陪伴和情绪价值，在工作的时候，日程待办，提升工作效率；在学习的时候，作为时钟摆台，陪伴学习。

#### 约束和限制

1. 待机屏保卡片只支持 2*2尺寸的卡片。
2. 待机屏保卡片不推荐展示用户个人隐私敏感数据。
3. 待机屏保卡片有明确的UX设计规范。具体请参考设计指南中的[待机屏保](https://developer.huawei.com/consumer/cn/doc/design-guides/system-features-service-widget-0000002087671904#section966618274556)。
4. 待机屏保卡片只支持Phone中的部分机型。

#### 开启方式

待机屏保功能在系统上默认是开启的，功能开关路径“设置>桌面和个性化>待机屏保设置”，开关界面如下图。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b1/v3/WX8keIZ9Tpi06lDkLRcJtA/zh-cn_image_0000002668461112.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=665EFF740E3DEB81D69D5AE70C7B5B37F9D1E3EC1DC98E578A71AC3DCF1126DC)

#### 使用步骤

待机屏保支持卡片展示与卡片编辑功能（添加、移除），具体操作步骤如下：

1. 进入待机屏保界面：插入充电器或开启“不充电可显示” 开关，设备横屏锁屏并与桌面夹角45°~90°稳定摆放（折叠机需切换为外屏；同时折叠机支持帐篷模式显示），即可进入待机屏保界面。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/78/v3/mJFyMNutQxWjfCj1er7mjQ/zh-cn_image_0000002698220991.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=7352108DA2EFD359FFEA62411DFA7448BECDC04BFA69D0206A938AD0C201B0DC)
2. 进入待机屏保编辑界面：在待机屏保界面长按或双指捏合即可进入编辑界面。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c0/v3/UPBR1RAITZS2KUL-Bi0DpQ/zh-cn_image_0000002698140903.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=427F30435A37770C614C581874419FC6C7B5934DCEF6F3B32652E71F7E4DA172)
3. 进入待机屏保卡片中心界面：在待机屏保编辑界面，上滑左侧或右侧列表至最后，点击“+”弹出卡片管理页面。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/de/v3/fVyZCZEnTwSyQci-bY38OA/zh-cn_image_0000002668301238.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=B46AA092C217A7CF552BB8E8BCA3EE3264BB9C1E4D0D0E7B2DE4F3A5DB247E6D)
4. 进入待机屏保卡片管理页面：在待机屏保卡片中心点击“建议”会显示推荐的卡片，或者点击应用列表中的应用，弹出对应的卡片。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/71/v3/bQJLV2Q-RmC-WndvYFQlew/zh-cn_image_0000002668461114.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=4DC7036F5AB0BEBC58BEEF26D5AEC8565DEC5984533D5C1E5521EA95A5D663AA)
5. 添加卡片：在待机屏保卡片管理页面，选择好卡片后，点击“添加”按钮即可添加到待机屏保界面。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6c/v3/Rmnvew88QwGUBSspV9ax6Q/zh-cn_image_0000002698220993.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=AC7085D545CAF73AE1D4526EA4724877A407468BF801F5DEDA1F03F2F9FAFFB4)
6. 移除卡片：进入待机屏保编辑界面，点击卡片右上角的“-”即可移除卡片。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a8/v3/vjE5TYNmT-ms_XL-5LjGDw/zh-cn_image_0000002698140905.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=810C7D0340A1281853AB2D7FEE8081B431968F83C059700D00DC88331BB531AB)

#### 开发准备

#### 待机屏保开放能力申请

待机屏保卡片会展示在设备的待机屏保界面，开发者需申请上架开放能力，用以保护数据隐私安全。

因此在应用调试或发布时，必须使用

[手动签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing#section297715173233)

，并在手动签名

[申请Profile](https://developer.huawei.com/consumer/cn/doc/app/agc-help-debug-profile-0000002248181278)

过程中

[创建HarmonyOS应用](https://developer.huawei.com/consumer/cn/doc/app/agc-help-create-app-0000002247955506)

，创建应用时参考如下指导为应用接入开放能力。

1. 登录AppGallery Connect，选择“开发与服务”。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9b/v3/8w-l4XNCQp2GnH-oVQ8_ew/zh-cn_image_0000002668461108.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=2301AA2A82743D95051B589D123F54AC3B952FE1AECBF747194E6EAC304542D9)
2. 在项目列表中找到您的项目，并点击选择需开启开放能力的应用/元服务。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a9/v3/iXrMvsphR9KDYKBJ7W8QjA/zh-cn_image_0000002698220987.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=BE0A3D6A09EF8561045B5F54EC4ED823CAE5591FE8FDCD8A4A97E7B2C78131DD)
3. 在“开放能力管理”页面，点击待机屏保卡片对应的申请按钮。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/56/v3/ieg_IkjsQG-pUdkVLCNS9A/zh-cn_image_0000002668301240.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=0D1A97B71EE5E56E70654C59AA61AABB9F2F3C230FD9F5A5C415BDF41D342661)
4. 在“新建业务申请”窗口填写申请信息，然后点击“提交”。 申请原因：必填，包括应用介绍、使用场景、申请用途，不超过512个字符。 上传附件：选填，提供对应卡片UI设计释义材料，仅可上传1个附件，大小不超过500MB。支持文本、表格、图片、视频、压缩包格式。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/69/v3/xeoFKfIlRGq5ExnxPRicrg/zh-cn_image_0000002668461116.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=6114C8965879B6E76717073C6E155027052B5CC10C0E68B41AD1571D797E323B)
5. 返回“开放能力管理”页面，原“申请”按钮变为置灰显示的“申请”，待机屏保卡片的能力开关已勾选。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c3/v3/65EtbQLpQ_uXNt0Zzez0Gg/zh-cn_image_0000002698220995.png?HW-CC-KV=V1&HW-CC-Date=20260810T041103Z&HW-CC-Expire=86400&HW-CC-Sign=3E56D4190F7B45A4E1C01CD535D6EB44A0C787C438EB97830EE1361458136F94) 至此，您的应用已成功开通待机屏保开放能力。

#### 开发步骤

下面给出示例，实现待机屏保卡片展示。

1. [创建卡片](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-widget-creation)。
2. 配置卡片在待机屏保界面展示。 如果卡片不需要展示在待机屏保界面，配置isSupported字段为false;如果卡片已适配待机屏保卡片UX规范，配置isAdapted字段为true，系统会把卡片布局组件中backgroundImage移除；如果卡片涉及隐私敏感信息，需要配置isPrivacySensitive字段为true，用户将卡片添加到待机屏保界面则会有蒙版覆盖。具体参考[配置文件字段说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-widget-configuration#配置文件字段说明)。

```
  // entry/src/main/resources/base/profile/form_config.json
  {
    "forms": [
      {
        "name": "widget",
        "displayName": "$string:widget_display_name",
        "description": "$string:widget_desc",
        "src": "./ets/widget/pages/WidgetCard.ets",
        "uiSyntax": "arkts",
        "isDynamic": true,
        "isDefault": true,
        "updateEnabled": false,
        "scheduledUpdateTime": "10:30",
        "renderingMode": "autoColor",
        "updateDuration": 1,
        "defaultDimension": "1*2",
        "supportDimensions": [
          "1*2",
          "2*2"
        ],
        "standby": {
          "isSupported": true,
          "isAdapted": true,
          "isPrivacySensitive": false
        }
      }
    ]
  }
```

