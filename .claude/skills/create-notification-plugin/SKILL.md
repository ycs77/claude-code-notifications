---
name: create-notification-plugin
description: 互動式建立多平台通知插件的完整流程
allowed-tools: AskUserQuestion, Bash
---

這個 skill 會引導您建立包含三個作業系統版本的通知插件（Windows、macOS、Linux）。

## 執行步驟

### 1. 收集插件資訊

使用 AskUserQuestion tool 收集以下資訊：
- **插件 ID**（英文識別名稱，例如：`mario`、`my-sound`）
- **插件名稱**（顯示名稱，例如：`瑪利歐音效`、`我的音效`）
- **作者名稱**（預設：`Lucas Yang`）
- **作者 Email**（預設：`yangchenshin77@gmail.com`）
- **notification.wav 音檔路徑**（必填，例如：`./audios/mario-coin.wav`）
- **stop.wav 音檔路徑**（必填，例如：`./audios/mario-pipe.wav`）

**注意：** 插件描述已固定為「當 Claude Code 執行結束或停止時，自動播放提示音通知用戶」

### 2. 驗證音檔路徑

在執行腳本前，先使用 Bash tool 檢查音檔是否存在：
```bash
test -f "{notificationAudioPath}" && echo "Notification audio exists" || echo "Notification audio NOT found"
test -f "{stopAudioPath}" && echo "Stop audio exists" || echo "Stop audio NOT found"
```

如果音檔不存在，提示使用者檢查路徑並重新執行。

### 3. 執行 Node.js 腳本建立插件

使用 Bash tool 執行：
```bash
node scripts/create-notification-plugin.js \
  --id "{id}" \
  --name "{name}" \
  --author-name "{authorName}" \
  --author-email "{authorEmail}" \
  --notification-audio "{notificationAudio}" \
  --stop-audio "{stopAudio}"
```

### 4. 顯示建立結果

腳本執行成功後，向使用者顯示：
- 已建立的插件目錄列表
- 已更新的檔案（marketplace.json、README.md）
- 三個平台的安裝指令

## 重要提示

- 插件 ID 應使用小寫字母和連字符，例如 `my-sound`
- 音檔必須是 WAV 格式
- 腳本會自動更新 `.claude-plugin/marketplace.json` 和 `README.md`
- 如果插件目錄已存在，腳本會提示是否覆蓋
