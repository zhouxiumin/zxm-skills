# hiperf

## 定位

`hiperf` 是采样型性能分析工具，用于收集 CPU 热点、函数调用栈、性能事件统计数据，并生成 `perf.data` 等产物供 SmartPerf 或相关工具做火焰图分析。

## 何时使用

- 想知道 CPU 时间主要耗在哪些函数上
- 需要函数级热点和采样调用栈
- 需要做性能事件统计，而不是只看时间线

## 基本用法

通常通过 `hdc shell` 使用：

```bash
hdc shell hiperf --help
hdc shell hiperf list
```

## 常用命令

### 1. 查看支持的事件

```bash
hdc shell hiperf list
```

### 2. 录制采样数据

```bash
hdc shell hiperf record -f 1000 -d 10 -o /data/local/tmp/perf.data -p <pid>
```

常见思路：

- `-p <pid>`：盯某个进程
- `-d 10`：采样 10 秒
- `-o`：指定输出文件

具体参数以设备版本帮助信息为准，必要时先跑：

```bash
hdc shell hiperf help record
```

### 3. 查看统计信息

```bash
hdc shell hiperf stat -p <pid> -d 5
```

### 4. 导出可读内容

```bash
hdc shell hiperf dump -i /data/local/tmp/perf.data
hdc shell hiperf report -i /data/local/tmp/perf.data
```

### 5. 拉回本地分析

```bash
hdc file recv "/data/local/tmp/perf.data" "<本地目录>"
```

## 使用建议

- 如果你要的是“函数热点”，优先 `hiperf`；如果你要的是“时序链路”，优先 `hitrace`。
- 采样时尽量只盯目标 pid，别把整个系统一锅炖了，数据会很脏。
- 采完及时把 `perf.data` 拉回本地，用 SmartPerf 做火焰图，比你硬看文本舒服太多。

## 常见排障

### 不知道该采哪个进程

先查：

```bash
hdc jpid
hdc track-jpid
```

### 数据太杂

- 缩短采样时长
- 限定 pid
- 按需限定 CPU 核、事件和采样周期

## 回答要求

1. 明确说明 `hiperf` 的产物通常是 `perf.data`。
2. 先给 `list` / `help`，再给 `record`。
3. 不要把 `hiperf` 和 `hiprofiler` 混着讲；前者偏采样热点，后者偏多插件综合调优。

## 参考文档

- https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hiperf
