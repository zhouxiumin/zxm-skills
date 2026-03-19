# hidumper

## 定位

`hidumper` 是统一系统信息导出工具，用来导出 CPU、内存、存储、进程、系统能力、网络、异常退出记录以及 ArkTS 应用 JS 堆快照等信息。它适合在日志不够用时继续往下挖系统状态。

## 何时使用

- CPU 飙高、内存暴涨、线程阻塞
- 怀疑系统服务状态异常
- 需要查看进程、网络、存储、异常退出记录
- 需要抓 ArkTS 应用的 JS 堆快照

## 基本用法

通常通过 `hdc shell` 使用：

```bash
hdc shell hidumper -h
```

## 常用命令

### 1. 整机内存

```bash
hdc shell hidumper --mem
hdc shell hidumper --mem --prune
```

### 2. 单进程内存

```bash
hdc shell hidumper --mem <pid>
hdc shell hidumper --mem <pid> --show-ashmem
hdc shell hidumper --mem <pid> --show-dmabuf
```

### 3. CPU 使用率与频率

```bash
hdc shell hidumper --cpuusage
hdc shell hidumper --cpuusage <pid>
hdc shell hidumper --cpufreq
```

### 4. 进程信息

```bash
hdc shell hidumper -p <pid>
```

### 5. 网络与存储

```bash
hdc shell hidumper --net
hdc shell hidumper --net <pid>
hdc shell hidumper --storage
hdc shell hidumper --storage <pid>
```

### 6. 系统能力与全量系统信息

```bash
hdc shell hidumper -ls
hdc shell hidumper -s <SA名称>
hdc shell hidumper -c
```

### 7. 异常退出记录和故障日志

```bash
hdc shell hidumper -e --list
hdc shell hidumper -e --print <record_id>
```

### 8. JS 堆快照

```bash
hdc shell hidumper --mem-jsheap <pid>
hdc shell hidumper --mem-jsheap <pid> --gc
hdc shell hidumper --mem-jsheap <pid> --raw
```

生成文件通常在设备侧，后续可配合 `hdc file recv` 拉回本地。

## 使用建议

- 先用 `hilog` 判断问题大致方向，再用 `hidumper` 采状态，别上来就乱 dump。
- `--mem-jsheap` 更偏重 ArkTS/JS 堆问题定位，通常只对 debug 场景更有价值。
- 遇到系统服务异常时，先 `-ls` 看系统能力名，再 `-s <SA>` 深挖。

## 常见排障

### 不知道看哪个 pid

先查：

```bash
hdc jpid
hdc track-jpid
```

或者配合：

```bash
hdc shell aa force-stop com.example.myapplication
hdc shell aa start -a EntryAbility -b com.example.myapplication
hdc jpid
```

### dump 太大

- 先用精简参数，比如 `--mem --prune`
- 或者只盯单个 `pid`
- 必要时使用 `--zip` 保存压缩结果

## 回答要求

1. 先说清楚 `hidumper` 用于“系统状态导出”，别跟 `hilog` 混成一锅。
2. 给命令时优先根据问题类型分组：内存、CPU、进程、系统能力、JS 堆。
3. 涉及 `--mem-jsheap` 时，主动提醒这是更偏调试/诊断场景的能力。

## 参考文档

- https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hidumper
