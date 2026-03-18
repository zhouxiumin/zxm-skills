# 截图

从模拟器截取屏幕图像，用于观察界面布局和按钮位置。

## 基本用法

### 1. 在模拟器中截图

```bash
hdc shell snapshot_display -f /data/local/tmp/<随机文件名>.jpeg
```

示例：

```bash
hdc shell snapshot_display -f /data/local/tmp/snapshot_2026-01-25_21-38-31.jpeg
```

建议使用时间戳命名，避免文件冲突。

### 2. 将截图传输到电脑

```bash
hdc file recv "/data/local/tmp/<截图文件名>" "<本机目录绝对路径>"
```

示例：

```bash
hdc file recv "/data/local/tmp/snapshot_2026-01-25_21-38-31.jpeg" "/Users/<你的用户名>/screenshots"
```

## 使用场景

1. 确认界面渲染是否符合预期
2. 定位按钮像素坐标用于自动点击
3. 观察布局错位与裁剪问题
4. 留存测试证据

## 注意事项

- 截图文件默认保存到 `/data/local/tmp/`
- 用完建议删除临时文件，避免占用设备空间
- 输出格式通常为 JPEG

## 参考文档

- HarmonyOS 开发工具 - hdc: https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hdc
