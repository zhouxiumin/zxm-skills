---
name: arkts-syntax-assistant-zh
description: |-
  ArkTS 开发助手，用于 HarmonyOS/OpenHarmony 应用开发。遇到 .ets 文件、
  ArkTS 关键字、HarmonyOS/OpenHarmony 上下文、@ohos 包时激活。涵盖语法
  参考、TypeScript 迁移、性能优化、编译错误、状态管理、组件开发和语言
  相关问题指导。
---

# ArkTS 语法助手

---

## 概述

ArkTS 是 OpenHarmony 应用的默认开发语言，在 TypeScript 基础上做了静态类型强化，提升程序稳定性和性能。

## 核心特性

- **强制静态类型**：编译时确定所有类型，减少运行时检查
- **禁止动态对象布局**：对象结构在编译时固定，不可运行时修改
- **限制运算符语义**：部分运算符行为受限，鼓励清晰代码
- **不支持 Structural typing**：当前版本不支持结构化类型

## 参考文档导航

根据需求选择对应文档：

| 场景 | 参考文档 |
|------|----------|
| **语法学习** | [references/introduction-to-arkts.md](references/introduction-to-arkts.md) |
| **快速概览** | [references/arkts-get-started.md](references/arkts-get-started.md) |
| **TS 迁移** | [references/typescript-to-arkts-migration-guide.md](references/typescript-to-arkts-migration-guide.md) |
| **迁移背景** | [references/arkts-migration-background.md](references/arkts-migration-background.md) |
| **性能优化** | [references/arkts-high-performance-programming.md](references/arkts-high-performance-programming.md) |
| **更多案例** | [references/arkts-more-cases.md](references/arkts-more-cases.md) |

## 工作流程

### 1. 语法问题处理流程

```
用户提问 -> 判断问题类型 -> 查阅对应文档 -> 提供代码示例
```

**常见语法问题**：
- 变量声明 -> 使用 `let`/`const`，需显式类型或推断
- 函数定义 -> 支持可选参数、默认值、rest 参数、箭头函数
- 类与接口 -> 必须初始化字段，支持继承和实现
- 泛型使用 -> 支持约束、默认值
- 空安全 -> 可空类型 ((T | null))，非空断言 ((!))，可选链 ((?.))

### 2. TypeScript 迁移问题流程

```
识别 TS 代码 -> 检查不兼容特性 -> 查阅迁移规则 -> 提供 ArkTS 替代方案
```

**关键迁移规则速查**：

| TS 写法 | ArkTS 替代 |
|---------|-----------|
| `var x` | `let x` |
| `any`/`unknown` | 具体类型 |
| `{n: 42}` 对象字面量 | 先定义 class/interface |
| `[index: T]: U` 索引签名 | `Record<T, U>` |
| `A & B` 交叉类型 | `interface C extends A, B` |
| `function(){}` 函数表达式 | `() => {}` 箭头函数 |
| `<Type>value` 类型断言 | `value as Type` |
| 解构赋值 `[a, b] = arr` | 逐个访问 `arr[0]`, `arr[1]` |
| `for..in` | `for` 循环或 `for..of` |
| constructor 参数属性 | 显式声明字段 |

### 3. 性能优化问题流程

```
分析代码 -> 识别性能问题 -> 查阅优化建议 -> 提供优化方案
```

**高性能编程要点**：

- **声明**：不变量用 `const`；避免整型浮点混用
- **循环**：提取循环不变量；避免数值溢出
- **函数**：参数传递优于闭包；避免可选参数
- **数组**：数值用 TypedArray；避免稀疏数组；避免联合类型数组
- **异常**：避免循环中抛异常；用返回值代替

### 4. 编译错误处理流程

```
获取错误信息 -> 在迁移规则中搜索 -> 查找对应案例 -> 提供修复方案
```

## 常见问题速查

常见问题与对比示例请查阅对应参考文档。

- [references/common-questions.md](references/common-questions.md)

## 禁止使用的标准库 API

以下在 ArkTS 中禁止使用：

- **全局**：`eval`
- **Object**：`__proto__`、`defineProperty`、`freeze`、`getPrototypeOf` 等
- **Reflect**：`apply`、`construct`、`defineProperty` 等
- **Proxy**：所有 handler 方法

## 编译脚本

scripts 目录提供 ArkTS 项目快速编译脚本（包含依赖安装）：

| 平台 | 脚本 | 用途 |
|------|------|------|
| macOS/Linux | `scripts/run.sh` | 执行 `ohpm install` + `hvigorw assembleApp` |
| Windows | `scripts/run.ps1` | 执行 `ohpm install` + `hvigorw assembleApp` |

使用方式：
```bash
# macOS/Linux
bash scripts/run.sh

# Windows PowerShell
.\scripts\run.ps1
```

脚本执行步骤：
1. 安装依赖（`ohpm install --all`）
2. 编译项目（`hvigorw assembleApp`）

## 编译与验证建议

当用户明确要求“落地改代码/可编译验证”时，再执行编译验证流程：

1. 运行构建脚本进行验证：
   - macOS/Linux: `bash scripts/run.sh`
   - Windows: `.\scripts\run.ps1`
2. 失败时先分析错误并修复，再重试（建议最多 3 次）。
3. 若仍失败，请向用户汇报完整错误输出并请求下一步指示。

## 回答指南

1. **优先提供代码示例**：展示正确写法和错误写法对比
2. **引用官方文档**：需要详细说明时，指引用户查阅 references/ 中的对应文档
3. **解释原因**：说明为什么 ArkTS 有此限制（性能、稳定性）
4. **提供替代方案**：不支持的特性要给出可行的替代方案

## 许可证

MIT License（如需单独文件请在本目录补充）
