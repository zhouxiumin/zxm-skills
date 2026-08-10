# ArkTS卡片为组件添加动效

> 来源：https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-widget-page-animation
> 文档标识：arkts-ui-widget-page-animation
> 官方版本：V227
> 采集时间：2026-08-10T04:11:03.426Z

ArkTS卡片开放了使用动画效果的能力，支持

[显式动画](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-explicit-animation)

、

[属性动画](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-animatorproperty)

、

[组件内转场](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-transition-animation-component)

能力。ArkTS卡片使用动画效果时具有以下限制：

表1 动效参数限制

| 名称 | 参数说明 | 限制描述 |
| --- | --- | --- |
| duration | 动画播放时长 | 最长动效播放时长为2000毫秒，当设置大于2000毫秒时，动效时长仍为2000毫秒。 **说明：** 在API版本26.0.0之前，最长动效播放时长为1000毫秒。 |
| tempo | 动画播放速度 | 卡片中禁止设置此参数，使用默认值1。 |
| delay | 动画延迟执行的时长 | 卡片中禁止设置此参数，使用默认值0毫秒。 |
| iterations | 动画播放次数 | 卡片中禁止设置此参数，使用默认值1次。 |

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cb/v3/9YJF-kDoRzqFJQoEDQG4_Q/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260810T040752Z&HW-CC-Expire=86400&HW-CC-Sign=95D568C33735A6959591B06431207620A4764CD6DAC738F988F09A922D7B95E6)

静态卡片不支持使用动效能力。

#### 组件自身动效

以下示例代码使用

[animation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-animatorproperty)

接口实现了按钮旋转的动画效果。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f9/v3/Cs5IBXp4TvGVEDG7kfCsgw/zh-cn_image_0000002668461096.gif?HW-CC-KV=V1&HW-CC-Date=20260810T040752Z&HW-CC-Expire=86400&HW-CC-Sign=3578BCFF179F92EFECED1B0C5D43715CF8792B4EEE1D2DE1196D0267307237F6)

```
@Entry
@Component
struct AnimationCard {
  @State rotateAngle: number = 0;

  build() {
    Row() {
      Button('change rotate angle')
        .height('20%')
        .width('90%')
        .margin('5%')
        .onClick(() => {
          this.rotateAngle = (this.rotateAngle === 0 ? 90 : 0);
        })
        .rotate({ angle: this.rotateAngle })
        .animation({
          curve: Curve.EaseOut,
          playMode: PlayMode.Normal,
        })
    }.height('100%')
     .alignItems(VerticalAlign.Center)
  }
}
```

#### 组件转场动效

以下示例代码使用

[transition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-transition-animation-component)

接口实现了在卡片内图片出现与消失的动画效果。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c6/v3/app9JokyRfGGbawVutdLUw/zh-cn_image_0000002698220975.gif?HW-CC-KV=V1&HW-CC-Date=20260810T040752Z&HW-CC-Expire=86400&HW-CC-Sign=44927504694D09BCF792EE320DFF4B9E3B08BA297FAB02BC343895EC93C1DD34)

```
// entry/src/main/ets/widget/pages/TransitionEffectExample1.ets
@Entry
@Component
struct TransitionEffectExample1 {
  @State flag: boolean = true;
  @State show: string = 'show';

  build() {
    Column() {
      Button(this.show).width(80).height(30).margin(30)
        .onClick(() => {
          // 点击Button控制Image的显示和消失
          if (this.flag) {
            this.show = 'hide';
          } else {
            this.show = 'show';
          }
          this.flag = !this.flag;
        })
      if (this.flag) {
        // Image的显示和消失配置为相同的过渡效果（出现和消失互为逆过程）
        // 出现时从指定的透明度为0、绕z轴旋转180°的状态，变为默认的透明度为1、旋转角为0的状态，透明度与旋转动画时长都为1000ms
        // 消失时从默认的透明度为1、旋转角为0的状态，变为指定的透明度为0、绕z轴旋转180°的状态，透明度与旋转动画时长都为1000ms
        // $r('app.media.testImg')需要替换开发者所需的图像资源文件
        Image($r('app.media.testImg')).width(200).height(200)
          .transition(TransitionEffect.OPACITY.animation({ duration: 1000, curve: Curve.Ease }).combine(
            TransitionEffect.rotate({ z: 1, angle: 180 })
          ))
      }
    }.width('100%')
  }
}
```
