# aa

## 定位

`aa`（Ability Assistant）用于启动应用组件、停止服务、强制停止应用、进入/退出调试模式、启动测试框架，以及执行应用调试/调优相关动作。

## 何时使用

- 需要拉起指定 `UIAbility` 或 `ServiceExtensionAbility`
- 需要强杀应用后重新拉起
- 需要让应用进入等待调试或附加调试状态
- 需要调用测试框架或调优入口

## 使用前提

- 通常通过 `hdc shell` 使用。
- 如果不进入交互式 shell，建议用双引号包住整条 `aa` 命令，避免参数被外层 shell 吃掉。

示例：

```bash
hdc shell "aa start -a EntryAbility -b com.example.myapplication"
```

## 常用命令

### 1. 启动应用 / Ability

```bash
hdc shell aa start -a EntryAbility -b com.example.myapplication
hdc shell "aa start -A ohos.want.action.viewData -U 'https://www.example.com'"
```

常见参数：

- `-a`：Ability 名称
- `-b`：包名
- `-A`：Want action
- `-U`：URI

### 2. 停止服务或强制停止进程

```bash
hdc shell aa stop-service -a ServiceExtAbility -b com.example.myapplication
hdc shell aa force-stop com.example.myapplication
```

### 3. 进入 / 退出调试模式

```bash
hdc shell aa attach -b com.example.myapplication
hdc shell aa detach -b com.example.myapplication
```

### 4. 设置等待调试

```bash
hdc shell aa appdebug -b com.example.myapplication
```

这个状态通常只对 `debug` 包生效。

### 5. 调试 / 调优命令入口

```bash
hdc shell "aa process -b com.example.myapplication -a EntryAbility -p perf-cmd"
```

### 6. 启动测试框架

```bash
hdc shell aa test <参数...>
```

## 常见排障

### Ability 拉不起来

- 先确认包名和 Ability 名写对。
- 确认目标组件在配置里可导出，没被 `exported: false` 卡死。
- 如果是隐式拉起失败，改为显式指定 `-a` 和 `-b`。

### 应用不是 debug 包

- 某些调试命令只对 debug 包有效。
- 先查：

```bash
hdc shell "bm dump -n com.example.myapplication | grep appProvisionType"
```

预期看到：

```text
"appProvisionType": "debug"
```

### 锁屏或开发者模式导致失败

- 某些 `aa start` 失败与设备锁屏、开发者模式关闭有关。
- 先解锁设备，再确认开发者模式开启。

## 回答要求

1. 给 `aa` 命令时优先给显式启动示例：`-a` + `-b`。
2. 需要调试附加、等待调试时，主动提醒“通常要求 debug 包”。
3. 如果用户只是想拉起应用，不要先甩一堆 `attach/detach` 参数表。

## 参考文档

- https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/aa-tool
