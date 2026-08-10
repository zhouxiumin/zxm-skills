# 背板透明卡片开发指导

> 来源：https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-transparent-backplate-form-development
> 文档标识：arkts-ui-transparent-backplate-form-development
> 官方版本：V84
> 采集时间：2026-08-10T04:11:03.426Z

从API version 22开始，Form Kit提供卡片背板元素透明显示的能力，满足更丰富的UI设计以及美观诉求。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c7/v3/HXWP2QaOShe8beVMagROEQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260810T040752Z&HW-CC-Expire=86400&HW-CC-Sign=C2CA2B0725EEB52925F0405F16A39FD344E9592DFDA62F31A33EABECE31C4D8C)

示例效果请以真机运行为准，当前不支持DevEco Studio预览器。

#### 约束和限制

1. 非透明区域要求大于等于10%，不能有大面积全透明，让用户误以为此区域没有卡片的UI设计和实现。
2. 为保障卡片内容和文字清晰可见，建议根据加卡时系统告知的推荐颜色值来显示文字。

#### 开发准备

#### 透明卡片开放能力申请

因为背板透明卡片仅使用于符合UI规范以及声明使用的场景，不允许对用户隐藏卡片显示或者功能按钮的恶意设计，所以需要开发者申请上架开放能力。

因此在应用调试或发布时，必须使用

[手动签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing#section297715173233)

，并在手动签名

[申请Profile](https://developer.huawei.com/consumer/cn/doc/app/agc-help-debug-profile-0000002248181278)

过程中

[创建HarmonyOS应用](https://developer.huawei.com/consumer/cn/doc/app/agc-help-create-app-0000002247955506)

，创建应用时参考如下指导为应用接入开放能力。

1. 登录AppGallery Connect，选择“开发与服务”。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/67/v3/SS08nMV8QhmViVT-TP6rAA/zh-cn_image_0000002668461108.png?HW-CC-KV=V1&HW-CC-Date=20260810T040752Z&HW-CC-Expire=86400&HW-CC-Sign=4A13BA99E96CCD3904A24EB6DC048ACFAA0BFA3966AB0B112E67DFD7E7B69A13)
2. 在项目列表中找到您的项目，并点击选择需开启开放能力的应用/元服务。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/47/v3/ATlTLB7WR-yBIPfzxdiKHQ/zh-cn_image_0000002698220987.png?HW-CC-KV=V1&HW-CC-Date=20260810T040752Z&HW-CC-Expire=86400&HW-CC-Sign=AA1773B4BAD598CCD84D0C906F13E9CBAD80BA16267E07FE424EC12C28EF3F85)
3. 在“开放能力管理”页面，点击背板透明卡片对应的申请按钮。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5f/v3/vIr-PYiJTherHNW6uITn4g/zh-cn_image_0000002698140899.png?HW-CC-KV=V1&HW-CC-Date=20260810T040752Z&HW-CC-Expire=86400&HW-CC-Sign=24409E48400A30599E26587ACD6D16338D63ED9FF0C349FCE2917220CDD178CD)
4. 在“新建业务申请”窗口填写申请信息，然后点击“提交”。申请原因：必填，包括应用介绍、使用场景、申请用途，不超过256个字符。上传附件：必填，提供对应卡片UI设计释义材料，仅可上传1个附件，大小不超过500MB。支持文本、表格、图片、视频、压缩包格式。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3c/v3/Gz6htxXAS_SGidNOcbxcMQ/zh-cn_image_0000002668301234.png?HW-CC-KV=V1&HW-CC-Date=20260810T040752Z&HW-CC-Expire=86400&HW-CC-Sign=BF16BDDBE857E5632451B4E504E7C4B4AE4AE14245FF246820153A6CA12A4822)
5. 返回“开放能力管理”页面，原“申请”按钮变为“申请中”，1-3个工作日反馈申请结果。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/32/v3/Smcg7HNqSdCMOabRzmDQ4w/zh-cn_image_0000002668461110.png?HW-CC-KV=V1&HW-CC-Date=20260810T040752Z&HW-CC-Expire=86400&HW-CC-Sign=BC8801AAF7DC92565E1B939BB26658338F0279FBCF866032D4CD56C1F651D37A)
6. 申请审批通过后，互动中心会发送通知给您，同时“申请中”按钮会变为置灰显示的“申请”。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d0/v3/VFOzwRZRRauWsA5d9cZIvQ/zh-cn_image_0000002698220989.png?HW-CC-KV=V1&HW-CC-Date=20260810T040752Z&HW-CC-Expire=86400&HW-CC-Sign=72B4EC308A19D67111758E77A5D1F30507A037BEA79033FBFE5B317C0DEB2965)
7. 能力申请通过后，勾选背板透明卡片的能力开关，点击右上角“保存”。至此，您的应用已成功接入开放能力。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/53/v3/rFskSsM1RlqpUKdn3G3iGg/zh-cn_image_0000002698140901.png?HW-CC-KV=V1&HW-CC-Date=20260810T040752Z&HW-CC-Expire=86400&HW-CC-Sign=9C8FF282DB59CA06B2F528361AC1D1BAD3A260B0F89A875BF3158AD23118E941)

#### 开发步骤

下面给出示例，实现背板透明卡片功能。

1. [创建卡片](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-widget-creation)。
2. 配置背板透明卡片。 在form_config.json配置文件中，背板透明卡片必须配置transparencyEnabled字段为true。具体参考[配置文件字段说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-widget-configuration#配置文件字段说明)。 // entry/src/main/resources/base/profile/form_config.json { "forms": [ { "name": "widget", "displayName": "$string:widget_display_name", "description": "$string:widget_desc", "src": "./ets/widget/pages/WidgetCard.ets", "uiSyntax": "arkts", "window": { "designWidth": 720, "autoDesignWidth": true }, "isDynamic": true, "isDefault": true, "updateEnabled": false, "scheduledUpdateTime": "10:30", "updateDuration": 1, "defaultDimension": "2*2", "transparencyEnabled": true, "supportDimensions": [ "2*2" ] } ] }
3. 设置背板透明卡片字体反色。 在WidgetCard.ets卡片布局文件中，实现默认卡片反色字体颜色设置。 // entry/src/main/ets/widget/pages/WidgetCard.ets const TAG: string = 'WidgetCard'; @Entry @Component export struct WidgetCard { readonly title: string = '已配置form_config为true三方透明卡片'; readonly actionType: string = 'router'; readonly abilityName: string = 'EntryAbility'; readonly message: string = 'add detail'; readonly fullWidthPercent: string = '100%'; readonly fullHeightPercent: string = '100%'; // 获取反色信息 @LocalStorageProp('textColor') @Watch('getTextColor') textColor: string = '#00ff00'; build() { Row() { Column() { Text(this.title).fontSize('20vp').fontWeight(FontWeight.Medium).fontColor(this.textColor) }.width(this.fullWidthPercent) }.height(this.fullHeightPercent).backgroundColor(Color.Transparent).onClick(() => { postCardAction(this, { action: this.actionType, abilityName: this.abilityName, params: { message: this.message } }); }) } private getTextColor(): void { console.info(TAG, `this.textColor = ${this.textColor}`); } } 在卡片Ability生命周期EntryFormAbility.ets文件中，实现反色字体颜色更新。 // entry/src/main/ets/entryformability/EntryFormAbility.ets import { formBindingData, FormExtensionAbility, formInfo, formProvider } from '@kit.FormKit'; import { Want } from '@kit.AbilityKit'; const TAG: string = 'ServiceEntryFormAbility'; export default class EntryFormAbility extends FormExtensionAbility { onAddForm(want: Want) { console.info(TAG, 'onAddForm', JSON.stringify(want)); let textColor: string = '#707070'; let formData: Record<string, string> = {}; if (want && want.parameters) { // 获取反色信息 let testColorJsonStr = want.parameters[formInfo.FormParam.HOST_BG_INVERSE_COLOR_KEY] as TextColor; if (!testColorJsonStr) { console.error(TAG, `no host_bg_inverse_color in want parameters`); } else { textColor = testColorJsonStr.mTextColor; formData['textColor'] = textColor; } } return formBindingData.createFormBindingData(formData); } onCastToNormalForm(formId: string) {} onUpdateForm(formId: string, wantParams?: Record<string, Object>) { console.info(TAG, 'onUpdateForm', JSON.stringify(wantParams)); let textColor: string = '#707070'; if (wantParams) { let testColorJsonStr = wantParams[formInfo.FormParam.HOST_BG_INVERSE_COLOR_KEY] as TextColor; console.info(TAG, `onUpdate typeof testColorJsonStr = ${JSON.stringify(testColorJsonStr)}`); // 获取反色信息 if (!testColorJsonStr) { console.error(TAG, `no host_bg_inverse_color in wantParams parameters`); return; } else { textColor = testColorJsonStr.mTextColor; } } let formMsg: Record<string, string> = { 'textColor': textColor }; let formData: formBindingData.FormBindingData = formBindingData.createFormBindingData(formMsg); formProvider.updateForm(formId, formData).then((succ) => { console.info(TAG,`succ = ${JSON.stringify(succ)}`); }).catch((fail:Error) => { console.info(TAG,`err = ${JSON.stringify(fail)}`); }) } onFormEvent(formId: string, message: string) {} onRemoveForm(formId: string) {} onAcquireFormState(want: Want) { return formInfo.FormState.READY; } } interface TextColor { mTextColor: string; mWallpaperType: number; }
4. 在应用调试或发布时，进行[手动签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing#section297715173233)后运行。
5. 用户可在卡片中心-卡片管理页面，点击“添加至桌面”，此时在桌面即可看到新添加的背板透明卡片。结果示例如下。![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d0/v3/hZE6WIbyTDWF2xphICV1Ug/zh-cn_image_0000002668301236.gif?HW-CC-KV=V1&HW-CC-Date=20260810T040752Z&HW-CC-Expire=86400&HW-CC-Sign=B473225FDF8CD99FC7211BAD3779F2FF7078F50F4D72416B75ED3FDB1EE3BD16)

