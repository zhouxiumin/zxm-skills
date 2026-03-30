# Agent Browser — 完整命令参考

## 安装与更新

```bash
npm install -g agent-browser
agent-browser install                     # 下载 Chromium
agent-browser install --with-deps         # Linux：同时安装系统依赖
agent-browser upgrade                     # 更新到最新版
```

其他安装方式：`brew install agent-browser`（macOS）、`cargo install agent-browser`（Rust）

**常用环境变量**：
- `AGENT_BROWSER_DOWNLOAD_PATH=/path/to/downloads` — 默认下载目录

## 导航

```bash
agent-browser open <url>
agent-browser back | forward | reload
agent-browser close                       # 关闭当前会话
agent-browser close --all                 # 关闭全部会话
```

## 快照

AI 工作流中始终使用 `-i --json`。

```bash
agent-browser snapshot -i --json          # 可交互元素，JSON 输出
agent-browser snapshot -i -c -d 5 --json  # 额外：紧凑模式，深度限制
agent-browser snapshot -s "#main" -i      # 限定范围到选择器
```

## 交互（基于 Ref）

```bash
agent-browser click @e2
agent-browser click @e2 --new-tab         # 在新标签页打开
agent-browser dblclick @e2
agent-browser hover @e4
agent-browser focus @e3
agent-browser fill @e3 "文本"             # 清空并填充（推荐）
agent-browser type @e3 "文本"             # 逐字输入
agent-browser keyboard type "文本"        # 向当前焦点输入
agent-browser keyboard inserttext "文本"  # 插入文本（不触发键盘事件）
agent-browser check @e5 | uncheck @e5
agent-browser select @e6 "value"
agent-browser press "Enter"              # 支持 Tab、Control+a 等组合键
agent-browser scroll down 500
agent-browser drag @e7 @e8
agent-browser scrollintoview @e3
agent-browser upload @e5 /path/to/file   # 文件上传
```

## 语义查找（Find，无需 Selector）

无需 @ref，直接按语义描述元素：

```bash
agent-browser find role button click --name "提交"
agent-browser find text "登录" click
agent-browser find label "邮箱" fill "test@example.com"
agent-browser find placeholder "搜索" type "关键词"
agent-browser find first ".item" click
```

支持 `--exact` 精确匹配、`--name` 按可访问名称过滤。

## 获取信息

```bash
agent-browser get text @e1 --json
agent-browser get html @e2 --json
agent-browser get value @e3 --json
agent-browser get attr @e4 "href" --json
agent-browser get title --json
agent-browser get url --json
agent-browser get cdp-url --json
agent-browser get count ".item" --json
```

## 检查状态

```bash
agent-browser is visible @e2 --json
agent-browser is enabled @e3 --json
agent-browser is checked @e4 --json
```

## 等待

```bash
agent-browser wait @e2                    # 等待元素出现
agent-browser wait 1000                   # 等待毫秒数
agent-browser wait --text "Welcome"       # 等待文本出现
agent-browser wait --url "**/dashboard"   # 等待 URL 匹配
agent-browser wait --load networkidle     # 等待网络空闲
agent-browser wait --load domcontentloaded
agent-browser wait --fn "window.ready === true"
agent-browser wait --download             # 等待下载完成
```

## 会话（隔离浏览器）

```bash
agent-browser --session admin open site.com
agent-browser --session user open site.com
agent-browser session list
# 或通过环境变量：AGENT_BROWSER_SESSION=admin agent-browser ...
```

## 状态持久化

```bash
agent-browser state save auth.json        # 保存 Cookie/Storage
agent-browser state load auth.json        # 加载（跳过登录）
```

## 截图与 PDF

```bash
agent-browser screenshot page.png
agent-browser screenshot --full page.png  # 全页截图
agent-browser screenshot --annotate       # 带 @ref 编号标注（调试利器）
agent-browser pdf page.pdf
```

## 网络控制

```bash
agent-browser network route "**/ads/*" --abort           # 拦截请求
agent-browser network route "**/api/*" --body '{"x":1}'  # 模拟响应
agent-browser network log                                 # 查看流量
```

## CDP 模式（接管已有浏览器）

适合接管已登录的浏览器会话，无需重新登录：

```bash
# 先以远程调试模式启动 Chrome
# chrome --remote-debugging-port=9222

agent-browser connect 9222               # 接管指定端口
agent-browser --cdp open https://...     # CDP 模式导航
```

## 批量执行

高效执行多步操作，减少进程启动开销：

```bash
echo '[["open","https://example.com"],["snapshot","-i"]]' | agent-browser batch --json
```

## 设备模拟

```bash
agent-browser set viewport 375 812
agent-browser set device "iPhone 14"     # 预设设备
agent-browser set geo 37.7749 -122.4194  # 模拟地理位置
```

## 鼠标、剪贴板与 JS

```bash
agent-browser mouse move 100 200
agent-browser clipboard read
agent-browser clipboard write "文本"
agent-browser eval "document.title"      # 执行 JS 并返回结果
```

## 下载

```bash
agent-browser download @e5 /path/to/save
agent-browser wait --download
```

## 调试

```bash
agent-browser --headed snapshot -i --json       # 显示浏览器窗口
agent-browser --headed screenshot --annotate    # 可视化 + 标注 ref 编号
agent-browser --timeout 30000 click @e2        # 自定义超时时间
```
