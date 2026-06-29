# Claude Code 提示音 - 基本鈴聲 (macOS)

在 Claude Code 要求權限、提問或停止時，自動播放提示音通知用戶。

## 功能特色

- 🔔 **PermissionRequest 事件**: 當 Claude Code 要求權限時播放提示音
- 💬 **Elicitation 事件**: 當 MCP server 在工具執行過程中要求你輸入時播放提示音
- 🛑 **Stop 事件**: 當 Claude Code 停止執行時播放提示音

## 安裝插件

在 Claude Code 中安裝插件：

```
/plugin marketplace add ycs77/claude-code-notifications
/plugin install notification-basic-mac@ycs77-notifications
```

## 使用說明

安裝插件後，它會自動運作，無需額外設定。

## Hook 觸發時機

### PermissionRequest Hook

- 當權限對話框出現、需要用戶授權時觸發
- 用於提醒用戶有權限需要授權

### Elicitation Hook

- 當 MCP server 在工具執行過程中要求用戶輸入時觸發
- 用於提醒用戶有 MCP 互動需要回應

### Stop Hook

- 當 Claude Code 主代理準備停止執行時觸發
- 用於通知用戶任務已完成

## 作者

Lucas Yang (yangchenshin77@gmail.com)

## 授權

MIT License
