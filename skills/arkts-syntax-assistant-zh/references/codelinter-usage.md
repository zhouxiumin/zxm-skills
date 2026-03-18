# HarmonyOS CodeLinter 命令行使用说明

## 1. 基本用途

`codelinter` 支持在命令行执行代码检查，并可选自动修复（QuickFix），适合集成到 CI/质量门禁流程。

## 2. 命令格式

```bash
codelinter [options] [dir]
```

- `dir`：待检查工程根目录；可选，不传时默认当前目录。

## 3. 常用参数

- `--config, -c <filepath>`：指定规则配置文件路径。
- `--fix`：检查同时执行可修复项。
- `--format, -f <default|json|xml|html>`：指定输出格式，默认 `default`。
- `--output, -o <filepath>`：输出结果到文件。

## 4. 配置文件（code-linter.json5）

在工程根目录放置 `code-linter.json5`，常用字段：

- `files`：纳入检查的文件模式。
- `ignore`：排除目录/文件（相对工程根目录）。
- `ruleSet`：批量启用规则集。
- `rules`：覆盖/追加单条规则配置。
- `overrides`：按目录/文件做定制规则。

## 5. 规则集实践建议

常见规则集包括：

- `@typescript-eslint`
- `@security`
- `@performance`
- `@previewer`
- `@cross-device-app-dev`
- `@hw-stylistic`
- `@correctness`

建议先用 `recommended`，稳定后再扩到 `all` 或按 `rules` 精细化。

## 6. CI 集成最小示例

```bash
codelinter -c code-linter.json5 -f json -o reports/codelinter.json .
```

如需阻断流水线，可在脚本中对输出结果里的 error/warn 数量做阈值判断。

