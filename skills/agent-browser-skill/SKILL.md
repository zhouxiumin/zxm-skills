---
name: agent-browser
description: |-
  面向 AI 智能体的无头浏览器自动化 CLI，基于无障碍树快照和 ref 元素选择。适用于自动化多步骤网页工作流、填写表单、爬取数据、登录网站、测试 Web 应用或任何程序化浏览器交互场景。当需要确定性元素选择、会话隔离或复杂 SPA 自动化时，优先使用本工具而非内置浏览器工具。若主要目标是截图、PDF 或视觉检查，则使用内置浏览器工具。
metadata: {"clawdbot":{"emoji":"🌐","requires":{"commands":["agent-browser"]},"homepage":"https://github.com/vercel-labs/agent-browser"}}
allowed-tools: [Bash]
---

# Agent Browser Skill

基于无障碍树快照与 ref 元素选择的快速浏览器自动化工具。

## 核心工作流

```bash
# 1. 导航并获取快照
agent-browser open https://example.com
agent-browser snapshot -i --json

# 2. 从 JSON 解析 ref，然后交互
agent-browser click @e2
agent-browser fill @e3 "文本"

# 3. 页面变化后重新获取快照
agent-browser snapshot -i --json
```

## 常用命令

完整命令参考（交互、等待、会话、网络、Cookie、标签页等），请查阅 [references/commands.md](references/commands.md)。

## 快照输出格式

```json
{
  "success": true,
  "data": {
    "snapshot": "...",
    "refs": {
      "e1": {"role": "heading", "name": "示例域名"},
      "e2": {"role": "button", "name": "提交"},
      "e3": {"role": "textbox", "name": "邮箱"}
    }
  }
}
```

## 最佳实践

1. **始终使用 `-i` 标志** — 聚焦于可交互元素，省 Token
2. **始终使用 `--json`** — 便于解析
3. **等待页面稳定** — `agent-browser wait --load networkidle`
4. **保存认证状态** — 用 `state save/load` 跳过登录流程
5. **使用会话隔离** — 隔离不同浏览器上下文
6. **调试时使用 `--headed`** — 可视化查看操作过程
7. **调试时加 `--annotate`** — 截图带 @ref 编号，直观定位元素
8. **接管已登录浏览器** — 用 CDP 模式 `connect <port>` 避免重新登录
9. **多步操作用 `batch`** — 减少进程启动开销，提升效率
10. **找不到 ref 时用 `find`** — 按语义（文本/label/role）定位元素，无需 selector

## 示例：搜索并提取内容

```bash
agent-browser open https://www.google.com
agent-browser snapshot -i --json
# AI 识别搜索框 @e1
agent-browser fill @e1 "AI agents"
agent-browser press Enter
agent-browser wait --load networkidle
agent-browser snapshot -i --json
# AI 识别结果 ref
agent-browser get text @e3 --json
agent-browser get attr @e4 "href" --json
```

## 示例：多会话测试

```bash
# 管理员会话
agent-browser --session admin open app.com
agent-browser --session admin state load admin-auth.json
agent-browser --session admin snapshot -i --json

# 用户会话（同时运行）
agent-browser --session user open app.com
agent-browser --session user state load user-auth.json
agent-browser --session user snapshot -i --json
```

## 安装

```bash
npm install -g agent-browser
agent-browser install                     # 下载 Chromium
agent-browser install --with-deps         # Linux：同时安装系统依赖
```

## 致谢

Skill 由 Yossi Elkrief ([@MaTriXy](https://github.com/MaTriXy)) 创建

agent-browser CLI 由 [Vercel Labs](https://github.com/vercel-labs/agent-browser) 开发
