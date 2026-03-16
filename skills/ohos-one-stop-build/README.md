# ohos-one-stop-build

[English](#english) | [中文](#中文)

---

## English

### Introduction

**ohos-one-stop-build** is a Claude Code Skill designed for HarmonyOS (OHOS) development. It provides a one-stop workflow to build, install, run HarmonyOS applications, and fetch device logs — all through a single command.

This skill enables Code Agents to automatically detect build errors and runtime issues, making HarmonyOS development more efficient and streamlined.

### Features

- **One-command workflow**: Build → Install → Run → Fetch Logs
- **Auto-detection**: Automatically locates `hvigorw` and `hdc` tools
- **JAVA_HOME setup**: Handles JDK requirement using DevEco Studio bundled JBR
- **Error recognition**: Code Agent can identify and analyze build/runtime errors
- **UI automation testing**: Screenshot, layout dump, simulated interactions, and log analysis
- **Flexible configuration**: Supports custom project paths, modules, and log settings
- **CLI-based**: Reproduces IDE "Run" behavior via command line

### Prerequisites

If your system does not have a standalone JDK installed, set JAVA_HOME before building:

```bash
export JAVA_HOME=/Applications/DevEco-Studio.app/Contents/jbr/Contents/Home
```

### Core Workflow

```bash
# 1. Build HAP
$HVIGORW assembleHap -p product=$PRODUCT -p module=$MODULE --daemon

# 2. Clear device logs
$HDC shell hilog -r

# 3. Install HAP
$HDC install -r "$HAP_PATH"

# 4. Stop existing app
$HDC shell aa force-stop $BUNDLE

# 5. Start app
$HDC shell aa start -a $ABILITY -b $BUNDLE

# 6. Fetch logs
$HDC shell hilog -v time -T $LOG_TAG -z $LOG_LINES
```

### UI Automation Testing

After build/install/start, use `ohos-ui-test.sh` for automated UI verification:

```bash
UITEST=~/Projects/skills/ohos-ui-test.sh

$UITEST screenshot                    # Take screenshot
$UITEST dump                          # Dump layout tree
$UITEST tap <x> <y>                   # Tap coordinates
$UITEST tap_text "button text"        # Find and tap by text
$UITEST swipe <x1> <y1> <x2> <y2>    # Swipe gesture
$UITEST input "test text"             # Input text
$UITEST full_check                    # Screenshot + dump + hilog
$UITEST verify "expected text"        # Verify text on page
$UITEST cleanup                       # Clean temp files
```

### Configuration

| Variable | Description | Example |
|----------|-------------|----------|
| PROJECT_ROOT | Project root directory | /path/to/project |
| HVIGORW | Path to hvigorw | /path/to/hvigorw |
| HDC | Path to hdc | /path/to/hdc |
| MODULE | Module name | entry |
| PRODUCT | Product name | default |
| BUNDLE | Bundle identifier | com.example.app |
| ABILITY | Entry ability | EntryAbility |
| HAP_PATH | HAP output path | entry/build/.../entry-default-unsigned.hap |
| LOG_TAG | Log filter tag | MyAppTag |
| LOG_LINES | Number of log lines | 500 |

### Use Cases

- One-command build/install/run on HarmonyOS
- Reproducing IDE "Run" behavior via CLI
- Clearing and fetching hilog after install/run
- Standardizing hvigorw + hdc workflows
- Automated UI testing with screenshot and layout analysis
- Automated CI/CD pipelines for HarmonyOS apps

### Troubleshooting

- **hvigorw not found**: Verify HVIGORW path or add to PATH
- **hdc not found**: Verify HDC path or add to PATH
- **No device**: Check `hdc list targets`
- **HAP missing**: Verify HAP_PATH after build
- **Signing warning**: Expected for unsigned debug HAP; configure signing if needed
- **Java/JDK not found**: `export JAVA_HOME=/Applications/DevEco-Studio.app/Contents/jbr/Contents/Home`
- **PackageHap fails with Java error**: Same fix — set JAVA_HOME before hvigorw

---

## 中文

### 简介

**ohos-one-stop-build** 是一个专为鸿蒙 (HarmonyOS/OHOS) 开发设计的 Claude Code Skill。它提供一站式工作流，通过单个命令完成应用的构建、安装、运行和日志获取。

该 Skill 支持 Code Agent 自动识别编译报错和运行时问题，让鸿蒙开发更加高效便捷。

### 功能特性

- **一键式工作流**：构建 → 安装 → 运行 → 获取日志
- **自动检测**：自动定位 `hvigorw` 和 `hdc` 工具
- **JAVA_HOME 配置**：使用 DevEco Studio 内置 JBR 解决 JDK 依赖
- **错误识别**：Code Agent 可识别并分析编译/运行时错误
- **UI 自动化测试**：截图、布局树导出、模拟交互、日志分析
- **灵活配置**：支持自定义项目路径、模块和日志设置
- **命令行驱动**：通过 CLI 复现 IDE 的 "Run" 行为

### 前置条件

如果系统没有独立安装 JDK，需要在构建前设置 JAVA_HOME：

```bash
export JAVA_HOME=/Applications/DevEco-Studio.app/Contents/jbr/Contents/Home
```

### 核心工作流

```bash
# 1. 构建 HAP
$HVIGORW assembleHap -p product=$PRODUCT -p module=$MODULE --daemon

# 2. 清除设备日志
$HDC shell hilog -r

# 3. 安装 HAP
$HDC install -r "$HAP_PATH"

# 4. 停止现有应用
$HDC shell aa force-stop $BUNDLE

# 5. 启动应用
$HDC shell aa start -a $ABILITY -b $BUNDLE

# 6. 获取日志
$HDC shell hilog -v time -T $LOG_TAG -z $LOG_LINES
```

### UI 自动化测试

构建/安装/启动后，使用 `ohos-ui-test.sh` 进行自动化 UI 验证：

```bash
UITEST=~/Projects/skills/ohos-ui-test.sh

$UITEST screenshot                    # 截图
$UITEST dump                          # 导出布局树
$UITEST tap <x> <y>                   # 点击坐标
$UITEST tap_text "按钮文本"             # 通过文本查找并点击
$UITEST swipe <x1> <y1> <x2> <y2>    # 滑动
$UITEST input "测试文本"               # 输入文字
$UITEST full_check                    # 截图 + 布局树 + 日志
$UITEST verify "期望文本"              # 验证页面包含指定文本
$UITEST cleanup                       # 清理临时文件
```

### 配置说明

| 变量 | 说明 | 示例 |
|------|------|------|
| PROJECT_ROOT | 项目根目录 | /path/to/project |
| HVIGORW | hvigorw 路径 | /path/to/hvigorw |
| HDC | hdc 路径 | /path/to/hdc |
| MODULE | 模块名称 | entry |
| PRODUCT | 产品名称 | default |
| BUNDLE | 包标识符 | com.example.app |
| ABILITY | 入口 Ability | EntryAbility |
| HAP_PATH | HAP 输出路径 | entry/build/.../entry-default-unsigned.hap |
| LOG_TAG | 日志过滤标签 | MyAppTag |
| LOG_LINES | 日志行数 | 500 |

### 使用场景

- 鸿蒙应用一键构建/安装/运行
- 通过 CLI 复现 IDE "Run" 行为
- 安装/运行后清除并获取 hilog
- 标准化 hvigorw + hdc 工作流
- 自动化 UI 测试（截图 + 布局分析）
- 鸿蒙应用自动化 CI/CD 流水线

### 常见问题

- **找不到 hvigorw**：检查 HVIGORW 路径或添加到 PATH
- **找不到 hdc**：检查 HDC 路径或添加到 PATH
- **无设备**：检查 `hdc list targets`
- **HAP 缺失**：构建后检查 HAP_PATH
- **签名警告**：未签名的调试 HAP 会出现此警告，如需要请配置签名
- **找不到 Java/JDK**：`export JAVA_HOME=/Applications/DevEco-Studio.app/Contents/jbr/Contents/Home`
- **PackageHap 报 Java 错误**：同上，构建前设置 JAVA_HOME

---

## License

Internal use only

## Author

Created by vanicliu @ 2026-01-19
