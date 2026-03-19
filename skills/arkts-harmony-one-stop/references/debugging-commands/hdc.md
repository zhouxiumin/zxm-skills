# hdc

## 定位

`hdc`（HarmonyOS Device Connector）是 HarmonyOS 设备连接与调试总入口。它负责连接设备、执行远端 shell、传文件、安装/卸载应用、查看日志、做端口转发。后续大多数命令都要通过它把动作送进设备。

## 何时使用

- 设备连不上、`hdc list targets` 没输出
- 需要把 HAP、截图、trace 文件传到设备或从设备拉回本地
- 需要执行 `aa`、`bm`、`hilog`、`hidumper` 等设备端命令
- 需要端口转发、查看设备 pid、导出系统信息

## 环境准备

- 工具通常位于 DevEco Studio 或 Command Line Tools 的 `sdk/default/openharmony/toolchains` 目录。
- 设备侧需开启开发者选项和 USB 调试或无线调试。
- 多设备场景下，优先使用 `-t <connect-key>` 指定目标设备，别偷懒，不然命令打错设备就成笑话了。

## 常用命令

### 1. 设备联通

```bash
hdc list targets
hdc list targets -v
hdc -t <connect-key> wait
```

### 2. 执行设备端命令

```bash
hdc shell
hdc shell echo "Hello world"
hdc -t <connect-key> shell bm dump -n com.example.myapplication
```

### 3. 文件传输

```bash
hdc file send "<本地文件>" "data/local/tmp/"
hdc file recv "/data/local/tmp/<远端文件>" "<本地目录>"
```

### 4. 应用安装与卸载

```bash
hdc install <hap路径>
hdc uninstall com.example.myapplication
```

实际联调里更常见的是先传文件再走 `bm install`：

```bash
hdc file send "<HAP 绝对路径>" "data/local/tmp/"
hdc shell bm install -p data/local/tmp/<hap文件名>
```

### 5. 端口转发

```bash
hdc fport tcp:<本机端口> tcp:<设备端口>
hdc rport tcp:<设备端口> tcp:<本机端口>
hdc fport ls
hdc fport rm tcp:<本机端口> tcp:<设备端口>
```

### 6. 日志与系统信息

```bash
hdc shell hilog
hdc jpid
hdc track-jpid
hdc bugreport
```

## 多设备场景

- 单设备时，很多命令可以不写 `-t`。
- 多设备时，默认要求写 `-t <connect-key>`，否则命令可能直接失败，或者打到错误设备。
- USB 设备的 `connect-key` 常见是序列号；TCP 连接常见是 `IP:port`。

## 常见排障

### 设备显示 `Unauthorized`

- 检查设备端是否弹出授权框。
- 如果只点了“信任”而不是“始终信任”，重连后可能还要重新授权。
- 可尝试：

```bash
hdc kill -r
hdc list targets
```

### `list targets` 没输出

- 检查数据线是不是能传数据，不是那种纯充电废线。
- 换主板直连 USB 口，别走低质量扩展坞。
- 检查设备是否开启开发者模式与 USB 调试。

### 多设备命令冲突

- 先执行 `hdc list targets -v` 看清 `connect-key`。
- 再统一改成 `hdc -t <connect-key> ...`。

## 回答要求

1. 涉及设备命令时，先让用户执行 `hdc list targets`。
2. 需要远端命令时，明确写清是 `hdc shell <cmd>` 还是进入交互式 `hdc shell` 后执行。
3. 多设备场景默认展示带 `-t` 的命令。

## 参考文档

- https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hdc
