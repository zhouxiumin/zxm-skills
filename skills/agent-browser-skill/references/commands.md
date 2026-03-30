# Agent Browser — 完整命令参考

## 导航

```bash
agent-browser open <url>
agent-browser back | forward | reload | close
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
agent-browser fill @e3 "文本"
agent-browser type @e3 "文本"
agent-browser hover @e4
agent-browser check @e5 | uncheck @e5
agent-browser select @e6 "value"
agent-browser press "Enter"
agent-browser scroll down 500
agent-browser drag @e7 @e8
```

## 获取信息

```bash
agent-browser get text @e1 --json
agent-browser get html @e2 --json
agent-browser get value @e3 --json
agent-browser get attr @e4 "href" --json
agent-browser get title --json
agent-browser get url --json
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
agent-browser wait --fn "window.ready === true"
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
agent-browser screenshot --full page.png
agent-browser pdf page.pdf
```

## 网络控制

```bash
agent-browser network route "**/ads/*" --abort           # 拦截请求
agent-browser network route "**/api/*" --body '{"x":1}'  # 模拟响应
agent-browser network log                                 # 查看流量
```

## 调试

```bash
agent-browser --headed snapshot -i --json  # 显示浏览器窗口
agent-browser --timeout 30000 click @e2   # 自定义超时时间
```
