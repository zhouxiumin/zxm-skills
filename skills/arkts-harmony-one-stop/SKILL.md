---
name: arkts-harmony-one-stop
description: |-
  ArkTS 与 HarmonyOS/OpenHarmony 一站式开发助手。遇到 .ets 文件、@ohos 包、
  ArkTS 语法或 TypeScript 迁移问题、HarmonyOS 构建/部署/调试/E2E 请求时激活。
  覆盖语法与迁移、性能优化、编译错误修复、CodeLinter 质量检查，以及代码-构建-部署-
  截图-交互-日志排查的端到端开发循环。
---

# ArkTS + Harmony 一站式开发技能

## 任务分流

根据用户请求优先匹配以下任务类型，再进入对应流程：

1. ArkTS 语法与 TypeScript 迁移
2. ArkTS 性能优化与语言限制规避
3. 编译错误修复与构建验证
4. CodeLinter 代码质量检查与门禁集成
5. HarmonyOS 端到端开发循环（构建、部署、运行、截图、交互、日志）

## 1) 语法迁移流程

执行以下步骤：

1. 识别用户代码中的 TypeScript 写法与 ArkTS 约束冲突点。
2. 对照迁移规则给出 ArkTS 替代实现。
3. 以“错误写法 vs 正确写法”给出最小可复用示例。
4. 说明限制原因（性能、静态化、可预测性）并给出替代路径。

优先查阅：

- `references/introduction-to-arkts.md`
- `references/arkts-get-started.md`
- `references/typescript-to-arkts-migration-guide.md`
- `references/arkts-migration-background.md`
- `references/common-questions.md`

## 2) 性能优化流程

执行以下步骤：

1. 识别循环、数组、异常、类型声明中的性能风险。
2. 给出低成本改造建议（保持行为不变优先）。
3. 对关键语句提供优化前后对比。

优先查阅：

- `references/arkts-high-performance-programming.md`
- `references/arkts-more-cases.md`

## 3) 编译修复与构建验证流程

当用户明确要求“改代码并验证可编译”时执行：

1. 先修复语法/类型问题。
2. 运行构建脚本验证：
   - Windows: `.\scripts\run.ps1`
   - macOS/Linux: `bash scripts/run.sh`
3. 若失败，分析错误并修复后重试，最多 3 次。
4. 若 3 次仍失败，向用户汇报完整错误并说明阻塞点。

## 4) CodeLinter 流程

当用户要求规范检查、质量门禁、CI 集成时执行：

1. 确认工程根目录与 `code-linter.json5` 配置。
2. 执行检查并输出结果：
   - `codelinter -c code-linter.json5 -f default .`
   - `codelinter -c code-linter.json5 -f json -o reports/codelinter.json .`
3. 需要自动修复时执行：
   - `codelinter -c code-linter.json5 --fix .`
4. 汇总 error/warn，并给出修复优先级。

优先查阅：

- `references/codelinter-usage.md`

## 5) HarmonyOS 端到端开发循环

当用户请求“自动化开发、构建部署联调、持续调试”时执行完整循环：

1. 编写或修改代码。
2. 构建打包（`hvigorw`）。
3. 安装并运行到模拟器或设备（`hdc`）。
4. 截图确认界面状态。
5. 模拟点击/滑动复现交互。
6. 检查运行日志（`hilog`）。
7. 修复问题并重复循环直到达成目标。

优先查阅：

- `references/end-to-end-development.md`
- `references/e2e-dependencies.md`
- `references/e2e-build.md`
- `references/e2e-install-run.md`
- `references/e2e-screenshot.md`
- `references/e2e-interaction.md`
- `references/e2e-logging.md`

## 回答规范

1. 优先给可运行示例，避免只给抽象描述。
2. 对不支持能力必须给替代实现，不留“死胡同”。
3. 涉及多步排障时，明确当前步骤、预期结果、下一步动作。
4. 需要深入背景时，引用 `references/` 中对应文档路径。
