# 鸿蒙端到端开发指南

本指南提供“编写代码 -> 构建 -> 部署 -> 交互 -> 日志 -> 修复”的闭环流程。

适用平台：macOS、Windows

适用场景：用户要求完整开发-测试-调试循环，或要求在模拟器/设备上验证改动效果。

## 开发循环流程

每次接收新需求，按以下步骤循环执行：

1. 编写代码（实现功能或修复问题）
2. 编译打包（生成调试包）
3. 安装到模拟器/设备（部署应用）
4. 启动应用（进入目标页面）
5. 截图观察（确认 UI 和状态）
6. 模拟交互（点击/滑动复现）
7. 查看日志（定位运行时问题）
8. 根据反馈修改（回到步骤 1）

调试策略：如果日志不足以定位问题，优先回到代码中补充 `hilog` 日志，再继续后续步骤，不要在信息不足时盲目调试。

## 详细步骤文档

| 步骤 | 文档 |
|------|------|
| 安装依赖 | [e2e-dependencies.md](e2e-dependencies.md) |
| 编译打包 | [e2e-build.md](e2e-build.md) |
| 安装和运行 | [e2e-install-run.md](e2e-install-run.md) |
| 截图 | [e2e-screenshot.md](e2e-screenshot.md) |
| 模拟交互 | [e2e-interaction.md](e2e-interaction.md) |
| 运行时日志 | [e2e-logging.md](e2e-logging.md) |

## 工具路径参考

### macOS

- ohpm: `/Applications/DevEco-Studio.app/Contents/tools/ohpm/bin/ohpm`
- hdc: `/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony/toolchains/hdc`

### Windows

- ohpm: `<DevEco Studio 安装目录>\tools\ohpm\bin\ohpm.exe`
- hdc: `<DevEco Studio 安装目录>\sdk\default\openharmony\toolchains\hdc.exe`

## 注意事项

1. 首次使用前先确认模拟器已安装并可启动。
2. 使用 `hdc list targets` 确认设备在线。
3. 模拟器一般不要求签名，真机调试需要签名配置。
4. 建议统一日志标签（如 `APP_DEBUG`）便于筛选。
