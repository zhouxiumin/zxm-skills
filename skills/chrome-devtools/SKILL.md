---
name: chrome-devtools
description: '使用 Chrome DevTools MCP 进行专家级浏览器自动化、调试与性能分析。适用于网页交互、截图采集、网络流量分析以及性能剖析。'
license: MIT
---

# Chrome DevTools 智能体

## 概述

这是一个用于控制和检查实时 Chrome 浏览器的专项技能。它基于 `chrome-devtools` MCP 服务器，可执行从基础页面导航到复杂性能剖析在内的大量浏览器相关任务。

## 何时使用

在以下场景中使用此技能：

- **浏览器自动化**：页面导航、点击元素、填写表单、处理弹窗。
- **可视化检查**：为网页拍摄截图或获取文本快照。
- **调试**：检查控制台消息、在页面上下文中执行 JavaScript，以及分析网络请求。
- **性能分析**：录制并分析性能追踪，用于定位瓶颈和 Core Web Vitals 问题。
- **环境模拟**：调整视口尺寸，或模拟网络 / CPU 条件。

## 工具分类

### 1. 导航与页面管理

- `new_page`：打开一个新的标签页 / 页面。
- `navigate_page`：跳转到指定 URL、刷新页面或在历史记录中前进 / 后退。
- `select_page`：在已打开页面之间切换上下文。
- `list_pages`：查看所有已打开页面及其 ID。
- `close_page`：关闭指定页面。
- `wait_for`：等待页面中出现指定文本。

### 2. 输入与交互

- `click`：点击某个元素（使用快照中的 `uid`）。
- `fill` / `fill_form`：向输入框填入文本，或一次性填写多个字段。
- `hover`：将鼠标移动到某个元素上方。
- `press_key`：发送键盘快捷键或特殊按键（例如 `"Enter"`、`"Control+C"`）。
- `drag`：执行拖拽操作。
- `handle_dialog`：接受或取消浏览器警告框 / 提示框。
- `upload_file`：通过文件输入框上传文件。

### 3. 调试与检查

- `take_snapshot`：获取基于文本的无障碍树结构（最适合用于识别元素）。
- `take_screenshot`：截取整个页面或指定元素的可视化图像。
- `list_console_messages` / `get_console_message`：检查页面控制台输出。
- `evaluate_script`：在页面上下文中执行自定义 JavaScript。
- `list_network_requests` / `get_network_request`：分析网络流量及请求详情。

### 4. 模拟与性能

- `resize_page`：修改视口尺寸。
- `emulate`：对 CPU / 网络进行限速，或模拟地理位置。
- `performance_start_trace`：开始录制性能分析追踪。
- `performance_stop_trace`：停止录制并保存追踪结果。
- `performance_analyze_insight`：从录制的性能数据中获取详细分析。

## 工作流模式

### 模式 A：识别元素（优先使用快照）

查找元素时，始终优先使用 `take_snapshot`，而不是 `take_screenshot`。因为快照会提供交互工具所必需的 `uid` 值。

```markdown
1. 使用 `take_snapshot` 获取当前页面结构。
2. 找到目标元素的 `uid`。
3. 使用 `click(uid=...)` 或 `fill(uid=..., value=...)`。
```

### 模式 B：排查错误

当页面运行异常时，同时检查控制台日志和网络请求。

```markdown
1. 使用 `list_console_messages` 检查 JavaScript 错误。
2. 使用 `list_network_requests` 定位失败的资源请求（4xx / 5xx）。
3. 使用 `evaluate_script` 检查特定 DOM 元素或全局变量的值。
```

### 模式 C：性能剖析

用于定位页面变慢的原因。

```markdown
1. `performance_start_trace(reload=true, autoStop=true)`
2. 等待页面加载完成 / 追踪结束。
3. 使用 `performance_analyze_insight` 查找 LCP 问题或布局偏移。
```

## 最佳实践

- **上下文感知**：如果不确定当前激活的是哪个标签页，务必先执行 `list_pages` 和 `select_page`。
- **快照更新**：每次发生重要导航或 DOM 变化后都应重新获取快照，因为 `uid` 可能会变化。
- **超时控制**：为 `wait_for` 设置合理超时时间，避免在加载缓慢的元素上卡死。
- **截图使用**：`take_screenshot` 适合做视觉验证，但逻辑判断应优先依赖 `take_snapshot`。
