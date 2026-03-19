# bm

## 定位

`bm`（Bundle Manager）是应用包管理工具，负责安装、卸载、查询应用信息、清理缓存和数据、查询依赖、共享库、overlay 信息等。

## 何时使用

- HAP/HSP 安装失败，需要看安装错误
- 需要查询应用是否安装、模块信息、签名类型、共享库依赖
- 需要卸载旧包或清理数据后重装

## 使用前提

通常通过 `hdc shell` 执行：

```bash
hdc shell bm help
```

## 常用命令

### 1. 安装应用

```bash
hdc shell bm install -p data/local/tmp/entry-default-unsigned.hap
```

如果本地文件还没传上去，先：

```bash
hdc file send "<HAP 绝对路径>" "data/local/tmp/"
```

### 2. 卸载应用

```bash
hdc shell bm uninstall -n com.example.myapplication
```

### 3. 查询应用信息

```bash
hdc shell bm dump -n com.example.myapplication
hdc shell bm dump -a
```

常见用途：

- 确认应用是否安装
- 查看模块、ability、签名、`appProvisionType`
- 判断是不是 debug 包

### 4. 清理缓存和数据

```bash
hdc shell bm clean -n com.example.myapplication -c
hdc shell bm clean -n com.example.myapplication -d
```

具体参数依设备版本和命令实现而定，必要时先跑 `bm help`。

### 5. 查询依赖与共享库

```bash
hdc shell bm dump-dependencies -n com.example.myapplication
hdc shell bm dump-shared -n com.example.myapplication
```

### 6. 获取设备 udid

```bash
hdc shell bm get --udid
```

## 安装排障思路

### 安装失败先查什么

1. 文件路径是否正确
2. 设备空间是否足够
3. 签名是否匹配
4. 已装应用是否与当前包 `releaseType` 或签名不一致
5. 当前设备是否处于开发者模式

### 常用组合命令

```bash
hdc shell bm dump -n com.example.myapplication
hdc shell "bm dump -n com.example.myapplication | grep appProvisionType"
```

### 典型场景

- 旧版本签名不一致：先卸载再装
- debug/release 类型不一致：统一用同一类签名重装
- 设备 SDK 版本过低：升级系统或换兼容包

## 回答要求

1. 给安装命令时，优先给“先 `hdc file send`，再 `bm install`”这套稳定流程。
2. 一旦涉及签名、debug 能力、调试附加，主动引导用户查 `bm dump -n <bundle>`。
3. 不要把成百上千个错误码全倒给用户，先给最可能的 2 到 3 个排查点。

## 参考文档

- https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/bm-tool
