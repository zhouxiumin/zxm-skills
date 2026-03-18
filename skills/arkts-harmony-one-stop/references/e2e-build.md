# 编译打包

编译项目并生成调试包（HAP 文件）。

## 常用命令

### Phone 项目

```bash
hvigorw --mode module -p module=entry@default -p product=default -p requiredDeviceType=phone assembleHap --analyze=normal --parallel --incremental --daemon
```

### Wearable 项目

```bash
hvigorw --mode module -p module=entry@default -p product=default -p requiredDeviceType=wearable assembleHap --analyze=normal --parallel --incremental --daemon
```

## 参数说明

- `--mode module`: 模块编译模式
- `-p module=entry@default`: 指定 entry 模块
- `-p product=default`: 使用 default 产品配置
- `-p requiredDeviceType=phone/wearable`: 指定设备类型
- `assembleHap`: 生成 HAP 包
- `--analyze=normal`: 常规分析模式
- `--parallel`: 并行编译
- `--incremental`: 增量编译
- `--daemon`: 启用守护进程加速

## hvigorw 位置

如果项目中没有 `hvigorw`，可使用 DevEco Studio 自带版本：

### macOS

```bash
/Applications/DevEco-Studio.app/Contents/tools/hvigor/bin/hvigorw
```

### Windows

```powershell
"<DevEco Studio 安装目录>\tools\hvigor\bin\hvigorw.bat"
```

## 输出位置

编译成功后，HAP 文件通常位于：

```text
<项目根目录>/entry/build/default/outputs/default/entry-default-unsigned.hap
```

## 故障排除

### Invalid DEVECO_SDK_HOME

若运行 `hvigorw` 时出现如下错误：

```text
Error: Exit code 255
> hvigor ERROR: 00303217 Configuration Error
Error Message: Invalid value of 'DEVECO_SDK_HOME' in the system environment path.
```

可先设置环境变量后重试（将 `<你的用户名>` 替换为本机用户名）：

```bash
export DEVECO_SDK_HOME=/Applications/DevEco-Studio.app/Contents/sdk
export JAVA_HOME=/Applications/DevEco-Studio.app/Contents/jbr/Contents/Home
export HOME=/Users/<你的用户名>
export SUDO_COMMAND=/Applications/DevEco-Studio.app/Contents/MacOS/devecostudio
export NODE_HOME=/Applications/DevEco-Studio.app/Contents/tools/node
```

## 参考文档

- HarmonyOS 命令行工具 - hvigor: https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-hvigor-commandline
