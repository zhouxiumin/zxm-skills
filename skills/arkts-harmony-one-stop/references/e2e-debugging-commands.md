# 调试命令选型与排障

## 使用方式

当用户请求“命令行调试、设备排障、性能分析、日志定位、抓取系统状态”时，先读本文件做选型；确定具体工具后，再按需读取对应子文档，不要把全部命令文档一次性读入。

## 处理顺序

1. 先确认设备联通性：`hdc list targets`
2. 先用 `aa` / `bm` / `hilog` 解决应用启动、安装、日志这类一线问题。
3. 日志不足以定位时，再升级到 `hidumper` 做系统状态导出。
4. 需要看时序、卡顿、跨线程链路时，使用 `hitrace`。
5. 需要看 CPU 热点、采样栈、火焰图时，使用 `hiperf`。
6. 需要长时间、多插件、可视化综合调优时，使用 `hiprofiler`。
7. 默认优先给出“最小可执行命令”，不要一上来把全家桶都端上去。

## 工具速查

- `hdc`：设备连接与通道总入口。详见 `references/debugging-commands/hdc.md`
- `aa`：Ability 调试工具。详见 `references/debugging-commands/aa.md`
- `bm`：Bundle 管理工具。详见 `references/debugging-commands/bm.md`
- `hilog`：运行时日志工具。详见 `references/debugging-commands/hilog.md`
- `hidumper`：系统状态导出工具。详见 `references/debugging-commands/hidumper.md`
- `hitrace`：trace 采集工具。详见 `references/debugging-commands/hitrace.md`
- `hiperf`：采样型性能分析工具。详见 `references/debugging-commands/hiperf.md`
- `hiprofiler`：综合调优框架。详见 `references/debugging-commands/hiprofiler.md`

## 最小命令模板

```bash
# 设备联通检查
hdc list targets

# 启动应用
hdc shell aa start -a EntryAbility -b com.example.myapplication

# 安装 HAP
hdc file send "<HAP 绝对路径>" "data/local/tmp/"
hdc shell bm install -p data/local/tmp/<hap文件名>

# 按标签过滤日志
hdc shell hilog --regex APP_DEBUG --exit

# 查看整机/进程资源
hdc shell hidumper --mem
hdc shell hidumper -p <pid>

# 查看可用 trace 分类
hdc shell hitrace --list_categories

# 查看 hiperf 帮助
hdc shell hiperf --help
```

## 选型规则

1. 设备不在线、文件传不过去、命令执行不到设备：先查 `hdc`。
2. 应用拉不起来、需要启动指定 Ability、需要强杀或附加调试：用 `aa`。
3. 应用装不上、想核对包信息/签名/安装状态：用 `bm`。
4. 先看日志就能定位的问题，不要直接上性能工具；优先 `hilog`。
5. 出现 CPU 飙高、内存暴涨、线程阻塞、服务状态异常：用 `hidumper` 导出状态。
6. 复现卡顿、启动慢、掉帧、事件链路断点不清：用 `hitrace`。
7. 需要函数级热点、采样栈、火焰图：用 `hiperf`。
8. 需要多维度、长时段、插件化采集并导入可视化工具：用 `hiprofiler`。

## 回答要求

1. 给命令时明确是在本机执行还是在 `hdc shell` 交互环境执行。
2. 带包名、Ability 名、pid 的命令，统一用占位符并说明替换项。
3. 除非用户明确要求深挖，不要一次性抛出大段官方参数表。
4. 推荐排障顺序固定为：`hdc -> aa/bm -> hilog -> hidumper -> hitrace/hiperf -> hiprofiler`。
5. 需要可视化分析时，明确说明 `hiperf` 产物通常是 `perf.data`，`hiprofiler` 产物通常是 `.htrace`。
6. `hidumper` 的 `--mem-jsheap`、`hiprofiler` 的部分插件、以及调试附加能力通常依赖 debug 包或调试证书签名；回答时要主动提醒。

## 子文档清单

- `references/debugging-commands/hdc.md`
- `references/debugging-commands/aa.md`
- `references/debugging-commands/bm.md`
- `references/debugging-commands/hilog.md`
- `references/debugging-commands/hidumper.md`
- `references/debugging-commands/hitrace.md`
- `references/debugging-commands/hiperf.md`
- `references/debugging-commands/hiprofiler.md`
