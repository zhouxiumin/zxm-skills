# hitrace

## 定位

`hitrace` 用于采集系统与应用 trace 打点，包括系统内建打点以及开发者通过 HitraceMeter 接口埋入的打点。它适合分析启动耗时、卡顿、掉帧、线程调度和跨进程调用链路。

## 何时使用

- 启动慢，但仅看日志看不出耗时落点
- 界面卡顿、掉帧、线程阻塞
- 需要确认某段链路到底卡在 binder、调度、IO 还是业务逻辑

## 基本用法

通常通过 `hdc shell` 使用：

```bash
hdc shell hitrace -h
hdc shell hitrace --list_categories
```

## 常用命令

### 1. 查看可采集分类

```bash
hdc shell hitrace --list_categories
```

### 2. 采集文本 trace

```bash
hdc shell hitrace -t 10 sched freq idle
```

### 3. 采集二进制 trace

```bash
hdc shell hitrace --trace_begin --record --raw -t 10 sched freq idle
hdc shell hitrace --trace_finish
```

二进制 trace 更适合后续用 SmartPerf 做可视化分析。

### 4. 指定 buffer 和输出时长

```bash
hdc shell hitrace -b 32768 -t 15 sched binder
```

### 5. 导出到文件

```bash
hdc shell hitrace -t 10 -o /data/local/tmp/app_trace.ftrace sched binder
hdc file recv "/data/local/tmp/app_trace.ftrace" "<本地目录>"
```

### 6. 快照模式

```bash
hdc shell hitrace --start_bgsrv sched binder
hdc shell hitrace --dump_bgsrv /data/local/tmp/bg_trace.ftrace
hdc shell hitrace --stop_bgsrv
```

## 选型建议

- 只看“有没有报错”：先 `hilog`
- 需要看“时间都耗在哪儿”：用 `hitrace`
- 需要看“哪个函数最热”：改用 `hiperf`

## 常见排障

### 不知道选哪些 category

- 先跑 `--list_categories`
- 通用卡顿排查可从 `sched`、`freq`、`idle`、`binder` 这类系统分类开始
- 用户代码如果埋了 HitraceMeter，也要把对应打点分类考虑进去

### trace 太大或信息太杂

- 缩短 `-t` 时长
- 缩少 categories
- 用二进制格式交给工具看，不要硬读大文本

## 回答要求

1. 解释 `hitrace` 时突出“时序”和“链路”，别把它说成普通日志工具。
2. 先给 `--list_categories`，再给具体采集命令。
3. 涉及可视化分析时，提醒二进制 trace 更适合 SmartPerf。

## 参考文档

- https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hitrace
