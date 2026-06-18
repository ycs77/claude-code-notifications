# Claude Code 提示音 - 二階堂希羅 (Windows)

在 Claude Code 需要互動、提問或停止時，自動播放提示音通知用戶。

## 功能特色

- 🔔 **Notification 事件**: 當 Claude Code 發送通知時播放提示音
- 🛑 **Stop 事件**: 當 Claude Code 停止執行時播放提示音

## 安裝插件

在 Claude Code 中安裝插件：

```
/plugin marketplace add ycs77/claude-code-notifications
/plugin install notification-nikaidouhiro-win@ycs77-notifications
```

## 使用說明

安裝插件後，它會自動運作，無需額外設定。

## Hook 觸發時機

### Notification Hook

- 當 Claude Code 發送用戶通知時觸發
- 用於提醒用戶注意重要訊息

### Stop Hook

- 當 Claude Code 主代理準備停止執行時觸發
- 用於通知用戶任務已完成

## 作者

Lucas Yang (yangchenshin77@gmail.com)

## 授權

MIT License
