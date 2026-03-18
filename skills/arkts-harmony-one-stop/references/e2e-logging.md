# 运行时日志检查

使用 `hilog` 查看运行时日志，用于调试和问题诊断。

## 基本用法

### 1. 清理旧日志

```bash
hdc shell hilog -r
```

### 2. 按标签筛选日志

```bash
hdc shell hilog --regex <标签> --exit
```

参数说明：

- `--regex <标签>`: 正则匹配日志标签
- `--exit`: 输出当前缓冲区后退出

### 示例

```bash
hdc shell hilog --regex APP_DEBUG --exit
```

## 推荐实践

### 使用统一标签

建议在代码中使用稳定且可检索的 ASCII 标签，例如 `APP_DEBUG`。

```typescript
import hilog from '@ohos.hilog';

const TAG = 'APP_DEBUG';

hilog.info(0x0000, TAG, 'Application started');
hilog.debug(0x0000, TAG, 'Button clicked: %{public}s', buttonName);
hilog.error(0x0000, TAG, 'Error occurred: %{public}s', errorMessage);
```

### 日志级别

- `debug`: 调试信息
- `info`: 一般信息
- `warn`: 警告
- `error`: 错误
- `fatal`: 致命错误

## 常用命令

### 持续监听

```bash
hdc shell hilog --regex APP_DEBUG
```

按 `Ctrl+C` 结束监听。

### 查看所有日志

```bash
hdc shell hilog
```

### 清空缓冲区

```bash
hdc shell hilog -r
```

## 调试流程

1. 清理日志
2. 运行应用并复现问题
3. 按标签筛选日志
4. 分析调用链与状态
5. 修改代码并重新验证

如果日志信息不足（关键路径缺失、状态不可见），应先补充日志点，再继续调试。

## 参考文档

- HarmonyOS 开发工具 - hilog: https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hilog
