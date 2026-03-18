# 安装和运行到模拟器

将编译好的 HAP 安装到模拟器或设备并启动应用。

## 前置检查

### 1. 检查设备是否在线

```bash
hdc list targets
```

若无输出，说明设备/模拟器未连接或未启动。

### 2. 检查 hdc 命令

- macOS: `/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony/toolchains/hdc`
- Windows: `<DevEco Studio 安装目录>\sdk\default\openharmony\toolchains\hdc.exe`

## 安装和运行步骤

### 1. 停止并卸载旧版本（可选）

```bash
hdc shell aa force-stop com.example.myapplication
hdc uninstall com.example.myapplication
```

### 2. 上传 HAP 文件

```bash
hdc file send "<HAP 绝对路径>" "data/local/tmp/"
```

示例：

```bash
hdc file send "/Users/<你的用户名>/DevEcoStudioProjects/MyApplication/entry/build/default/outputs/default/entry-default-unsigned.hap" "data/local/tmp/"
```

### 3. 安装应用

```bash
hdc shell bm install -p data/local/tmp/entry-default-unsigned.hap
```

### 4. 启动应用

```bash
hdc shell aa start -a EntryAbility -b com.example.myapplication
```

## 签名错误处理

若出现 `error: no signature file`：

- 模拟器通常不需要签名，先确认目标是否为模拟器。
- 真机调试需要在 DevEco Studio 的 `Signing Configs` 中完成签名配置。

## 常用排查命令

### 查询已安装应用

```bash
hdc shell bm dump -n com.example.myapplication
```

### 查询应用 ability

```bash
hdc shell aa dump -a
```

## 参考文档

- HarmonyOS 开发工具 - hdc: https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hdc
- HarmonyOS 开发工具 - aa: https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/aa-tool
- HarmonyOS 开发工具 - bm: https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/bm-tool
