---
name: arkts-harmony-one-stop
description: |-
  ArkTS 与 HarmonyOS/OpenHarmony 一站式开发助手。遇到 .ets 文件、@ohos 包、
  ArkTS 语法/TypeScript 迁移问题、HarmonyOS 构建/部署/调试/E2E 请求时激活。
  覆盖语法迁移、性能优化、编译错误修复、CodeLinter 质量检查，以及代码-构建-部署-
  截图-交互-日志排查的端到端开发循环。
---

# ArkTS + Harmony 一站式开发技能

## 使用原则

1. 先判断任务类型，再按分流文档执行，避免把所有参考文档一次性读入。
2. 优先给“可运行命令 + 最小可复现示例”，再补充背景解释。
3. 涉及构建或联调时，严格执行“改动 -> 验证 -> 反馈 -> 再改动”的闭环。
4. 若用户未要求执行命令，只提供可执行步骤，不主动做高风险操作。

## 任务分流

根据用户请求匹配以下任务类型：

1. ArkTS 语法与 TypeScript 迁移
2. ArkTS 性能优化与语言限制规避
3. 编译错误修复与构建验证
4. CodeLinter 代码质量检查与门禁集成
5. HarmonyOS 端到端开发循环（构建、部署、运行、截图、交互、日志）
6. HarmonyOS 调试命令选型与排障

## 1) 语法迁移流程

执行步骤：

1. 识别 TypeScript 写法与 ArkTS 约束冲突点。
2. 对照迁移规则给出 ArkTS 替代实现。
3. 以“错误写法 vs 正确写法”给出最小示例。
4. 说明限制原因（性能、静态化、可预测性）并给出替代路径。

优先查阅：

- `references/arkts-get-started.md`（快速入口）
- `references/common-questions.md`（高频问题速查）
- `references/typescript-to-arkts-migration-guide.md`（完整迁移规则）
- `references/arkts-more-cases.md`（实战案例）
- `references/arkts-migration-background.md`（设计背景）
- `references/introduction-to-arkts.md`（系统语法手册）

## 2) 性能优化流程

执行步骤：

1. 识别循环、数组、异常、类型声明中的性能风险。
2. 给出低成本改造建议（保持行为不变优先）。
3. 提供优化前后对比，并说明收益点。

优先查阅：

- `references/arkts-high-performance-programming.md`
- `references/arkts-more-cases.md`

## 3) 编译修复与构建验证流程

当用户明确要求“改代码并验证可编译”时执行：

1. 修复语法/类型问题。
2. 运行构建脚本验证：
   - Windows: `.\scripts\run.ps1`
   - macOS/Linux: `bash scripts/run.sh`
3. 若失败，分析错误并修复后重试，最多 3 次。
4. 若 3 次仍失败，汇报完整错误和阻塞点。

## 4) CodeLinter 流程

当用户要求规范检查、质量门禁、CI 集成时执行：

1. 确认工程根目录和 `code-linter.json5`。
2. 执行检查：
   - `codelinter -c code-linter.json5 -f default .`
   - `codelinter -c code-linter.json5 -f json -o reports/codelinter.json .`
3. 需要自动修复时执行：
   - `codelinter -c code-linter.json5 --fix .`
4. 汇总 error/warn，并给出修复优先级。

优先查阅：

- `references/codelinter-usage.md`

## 5) HarmonyOS 端到端开发循环

当用户请求“自动化开发、构建部署联调、持续调试”时执行：

1. 编写或修改代码。
2. 构建打包（`hvigorw`）。
3. 安装并运行到模拟器/设备（`hdc`）。
4. 截图确认界面状态。
5. 模拟点击/滑动复现交互。
6. 检查运行日志（`hilog`）。
7. 修复问题并重复循环，直到达成目标。

优先查阅：

- `references/end-to-end-development.md`
- `references/e2e-dependencies.md`
- `references/e2e-build.md`
- `references/e2e-install-run.md`
- `references/e2e-screenshot.md`
- `references/e2e-interaction.md`
- `references/e2e-logging.md`

## 6) 调试命令选型与排障

当用户请求“命令行调试、设备排障、性能分析、日志定位、抓取系统状态”时执行：

1. 先确认属于连接、应用管理、日志、资源状态、trace、采样分析还是综合调优问题。
2. 先读取 `references/e2e-debugging-commands.md` 做选型，不要一上来把所有调试命令文档一次性读入。
3. 根据命中的工具，再按需只读取一个或少数几个子文档：
   - `references/debugging-commands/hdc.md`
   - `references/debugging-commands/aa.md`
   - `references/debugging-commands/bm.md`
   - `references/debugging-commands/hilog.md`
   - `references/debugging-commands/hidumper.md`
   - `references/debugging-commands/hitrace.md`
   - `references/debugging-commands/hiperf.md`
   - `references/debugging-commands/hiprofiler.md`
4. 优先按 `hdc -> aa/bm -> hilog -> hidumper -> hitrace/hiperf -> hiprofiler` 的顺序选型。
5. 先给最小可执行命令，再根据输出决定是否升级工具。
6. 如果用户只问安装运行或日志查看，不要额外加载无关的性能分析文档。

优先查阅：

- `references/e2e-debugging-commands.md`
- `references/debugging-commands/`
- `references/e2e-install-run.md`
- `references/e2e-logging.md`

## 回答规范

1. 优先给可运行示例，避免只给抽象描述。
2. 对不支持能力必须给替代实现，不留“死胡同”。
3. 多步排障时，明确当前步骤、预期结果、下一步动作。
4. 引用参考文档时给出具体文件路径，减少来回跳转。

