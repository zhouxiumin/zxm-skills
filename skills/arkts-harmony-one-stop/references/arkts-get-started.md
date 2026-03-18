# 初识 ArkTS 语言（快速入口）

本页用于快速定位 ArkTS 迁移与开发资料，适合在回答问题前先建立上下文。

## 你应该先看哪篇

- 需要 3 分钟了解 ArkTS 与 TS 差异：`typescript-to-arkts-migration-guide.md`
- 需要快速修具体报错：`common-questions.md`
- 需要看完整语法细节：`introduction-to-arkts.md`
- 需要理解为什么会有这些限制：`arkts-migration-background.md`
- 需要性能导向建议：`arkts-high-performance-programming.md`
- 需要实战迁移案例：`arkts-more-cases.md`

## ArkTS 核心差异（相对 TypeScript）

1. 强制静态类型，减少运行时类型开销。
2. 禁止运行时动态改变对象布局。
3. 限制部分运算符语义以提升可优化性。
4. 不支持 structural typing 等高动态特性。

## 回答问题时的建议顺序

1. 先判断问题属于“语法限制 / 迁移改写 / 性能优化 / E2E 调试”。
2. 给出最小可运行示例（错误写法 vs 正确写法）。
3. 解释限制背后的性能或稳定性原因。
4. 如需深入，再跳转到对应参考文档。

## 常见触发词

- 文件与上下文：`.ets`、`@ohos`、HarmonyOS/OpenHarmony
- 迁移类：`any`、`unknown`、`for..in`、解构、索引签名、`globalThis`
- 工程类：`hvigorw`、`hdc`、`hilog`、CodeLinter

## 延伸资料

- ArkTS 官方学习入口：https://developer.huawei.com/consumer/cn/arkts/
- ArkTS 视频课程：https://developer.huawei.com/consumer/cn/training/course/slightMooc/C101717496870909384?pathId=101667550095504391

