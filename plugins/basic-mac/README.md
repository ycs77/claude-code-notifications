# Notification (macOS)

當 Claude Code 執行結束或停止時，自動播放提示音通知用戶。

## 功能特色

- 🔔 **Notification 事件**: 當 Claude Code 發送通知時播放提示音
- 🛑 **Stop 事件**: 當 Claude Code 停止執行時播放提示音

## 安裝插件

在 Claude Code 中安裝插件：

```
/plugin install notification-basic-mac@ycs77
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

## 疑難排解

### 沒有聲音

1. 檢查系統音量設定
2. 確認音效檔案存在且格式正確（.wav）
3. 使用 `claude --debug` 檢查 hook 執行日誌
4. 手動測試 afplay 指令：
   ```bash
   afplay /path/to/notification.wav
   ```

### Hook 未觸發

1. 確認插件已正確安裝
2. 重新啟動 Claude Code（hooks 在啟動時載入）
3. 使用 `/hooks` 指令檢查已載入的 hooks
4. 使用 `claude --debug` 查看詳細日誌

### afplay 找不到

如果系統找不到 `afplay` 命令，這可能表示系統音效服務有問題。`afplay` 是 macOS 內建工具，通常不需要額外安裝。請確認：
- 你正在 macOS 系統上執行
- 系統音效服務正常運作

## 版本歷史

### v1.0.0
- 初始版本
- 支援 Notification 和 Stop 事件
- macOS afplay 音效播放

## 作者

Lucas Yang (yangchenshin77@gmail.com)

## 授權

MIT License
