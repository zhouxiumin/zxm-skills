# hilog

## 定位

`hilog` 是 HarmonyOS 运行时日志查看工具，用于读取应用日志、系统日志、启动日志和内核日志，并支持按级别、tag、domain、pid、正则表达式过滤。

## 何时使用

- 应用启动失败、页面没反应、按钮点击无效
- 想看自定义 `@ohos.hilog` 打出来的业务日志
- 需要先从日志确认问题，再决定要不要上 `hidumper`、`hitrace`、`hiperf`

## 基本用法

通常通过 `hdc shell` 使用：

```bash
hdc shell hilog
```

## 常用命令

### 1. 查看全部日志

```bash
hdc shell hilog
```

默认阻塞读取，按 `Ctrl+C` 结束。

### 2. 一次性读取后退出

```bash
hdc shell hilog --exit
```

### 3. 按 tag / 正则过滤

```bash
hdc shell hilog --regex APP_DEBUG --exit
hdc shell hilog -T APP_DEBUG --exit
```

### 4. 按级别过滤

```bash
hdc shell hilog -L D
hdc shell hilog -L E --exit
```

常见级别：`D`、`I`、`W`、`E`、`F`

### 5. 按 pid 过滤

```bash
hdc shell hilog -P <pid>
```

### 6. 清空缓冲区

```bash
hdc shell hilog -r
```

### 7. 看缓冲区大小或统计

```bash
hdc shell hilog -g
hdc shell hilog -s
```

## 推荐日志打法

```typescript
import hilog from '@ohos.hilog';

const TAG = 'APP_DEBUG';

hilog.info(0x0000, TAG, 'Application started');
hilog.debug(0x0000, TAG, 'Button clicked: %{public}s', buttonName);
hilog.error(0x0000, TAG, 'Error occurred: %{public}s', errorMessage);
```

建议：

- 使用稳定、可检索的 ASCII tag
- 关键路径先打 `info` / `error`
- 含用户数据时注意 `%{public}` / `%{private}` 的暴露控制

## 排障套路

1. `hdc shell hilog -r` 清旧日志
2. 复现问题
3. 用 `--regex`、`-T`、`-P` 缩小范围
4. 如果日志信息不够，再补日志点或升级到 `hidumper` / `hitrace`

## 回答要求

1. 用户只想“看日志”时，优先给 `--regex` + `--exit` 这种最省事命令。
2. 代码侧如果没日志点，要明确提醒先补 `@ohos.hilog`。
3. 不要把落盘、buffer、quota 参数一口气全甩出去，除非用户明确要深挖。

## 参考文档

- https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hilog
