# Claude Code 提示音 - {name} (Linux)

{description}

## 功能特色

- 🔔 **Notification 事件**: 當 Claude Code 發送通知時播放提示音
- 🛑 **Stop 事件**: 當 Claude Code 停止執行時播放提示音

## 安裝插件

在 Claude Code 中安裝插件：

```
/plugin install {id}-linux@ycs77-notifications
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
3. 測試 aplay 是否正常運作：
   ```bash
   aplay /usr/share/sounds/alsa/Front_Center.wav
   ```
4. 使用 `claude --debug` 檢查 hook 執行日誌
5. 手動測試音效播放：
   ```bash
   aplay /path/to/plugins/{id}-linux/audios/notification.wav
   ```

### Hook 未觸發

1. 確認插件已正確安裝
2. 重新啟動 Claude Code（hooks 在啟動時載入）
3. 使用 `/hooks` 指令檢查已載入的 hooks
4. 使用 `claude --debug` 查看詳細日誌

### 權限問題

如果遇到音效裝置權限問題，確認您的使用者在 `audio` 群組中：

```bash
# 檢查使用者群組
groups

# 如果不在 audio 群組，將使用者加入
sudo usermod -a -G audio $USER

# 重新登入以套用變更
```

### ALSA 配置問題

如果 aplay 無法找到音效裝置：

```bash
# 列出可用的音效裝置
aplay -l

# 測試預設裝置
aplay -D default /usr/share/sounds/alsa/Front_Center.wav
```

## 作者

{authorName} ({authorEmail})

## 授權

MIT License
