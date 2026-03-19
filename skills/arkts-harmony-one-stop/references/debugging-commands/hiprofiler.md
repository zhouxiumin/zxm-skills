# hiprofiler

## 定位

`hiprofiler` 是综合调优框架，通常通过 `hiprofiler_cmd` 启动调优服务和插件采集进程，采集 CPU、ftrace、GPU、memory、network、native hook、能耗等多维数据，并生成 `.htrace` 供 DevEco Studio 或 SmartPerf 做可视化分析。

## 何时使用

- 单独用 `hilog`、`hidumper`、`hitrace`、`hiperf` 已经不够
- 需要长时间、多维度、可视化联合分析
- 需要同时看 CPU、内存、ftrace、网络、native hook 等插件数据

## 基本思路

1. 用 `hiprofiler_cmd` 指定输出路径、持续时间和服务控制参数。
2. 通过 `<<CONFIG ... CONFIG` 传入插件配置。
3. 采集完成后把 `.htrace` 拉回本地。
4. 用 DevEco Studio 或 SmartPerf 打开分析。

## 常用命令模板

```bash
hdc shell hiprofiler_cmd \
  -c - \
  -o /data/local/tmp/hiprofiler_data.htrace \
  -t 30 \
  -s \
  -k \
<<CONFIG
request_id: 1
session_config {
  buffers {
    pages: 16384
  }
}
plugin_configs {
  plugin_name: "ftrace-plugin"
  sample_interval: 1000
  config_data {
    hitrace_categories: "binder"
    buffer_size_kb: 204800
    flush_interval_ms: 1000
    flush_threshold_kb: 4096
    trace_period_ms: 200
  }
}
CONFIG
```

## 常用参数

- `-c`：指定配置来源；常见写法是 `-c -`，表示从标准输入读配置
- `-o`：输出文件路径，通常放 `/data/local/tmp/`
- `-t`：采集时长，单位秒
- `-s`：拉起调优服务进程
- `-k`：杀掉已存在的调优服务进程

## 常见插件方向

- `ftrace-plugin`：内核 trace / hitrace 相关数据
- `cpu plugin`：进程和线程 CPU 使用率
- `memory plugin`：进程内存占用
- `native hook`：堆内存分配调用栈
- `network plugin` / `network profiler`：网络流量统计或 HTTP/HTTPS 详细信息
- `gpu plugin`：GPU 使用率
- `xpower plugin`：能耗数据

## 使用建议

- 只查一个局部问题时，优先简单工具；别没事就上 `hiprofiler`，那玩意重。
- 当你已经明确需要“多维度联合分析 + 可视化”时，再启用它。
- 配置里只开必要插件，插件越多，数据量越大，分析越乱。

## 文件处理

采集完成后，把结果拉回本地：

```bash
hdc file recv "/data/local/tmp/hiprofiler_data.htrace" "<本地目录>"
```

然后用 DevEco Studio 或 SmartPerf 解析。

## 特别提醒

- 某些插件或调试能力只支持 debug 包或调试证书签名应用。
- 可先检查：

```bash
hdc shell "bm dump -n com.example.myapplication | grep appProvisionType"
```

预期：

```text
"appProvisionType": "debug"
```

## 回答要求

1. 强调 `hiprofiler` 是“多插件综合调优框架”，不要和 `hiperf` 混淆。
2. 回答时优先给模板和插件方向，不要把 proto 字段表整页糊给用户。
3. 明确说明输出文件通常是 `.htrace`，后续要导入可视化工具。

## 参考文档

- https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hiprofiler
