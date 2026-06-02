# CLAUDE.md

## 語言

請使用繁體中文。

## 插件管理

本專案以 `notifications.json` 為唯一真相來源，由根目錄 `build.js` 全量重生所有產出。

### 新增、修改、移除插件的流程

1. 編輯 `notifications.json` 的 `plugins` 陣列
2. 把對應的 `notification.wav` 與 `stop.wav` 放到 `templates/audios/{id}/`
3. 執行 `node build.js`

`build.js` 會冪等重生：

- `plugins/{id}-{win,mac,linux,wsl}/` 全部內容
- `.claude-plugin/marketplace.json`
- `README.md` 中 `<!-- plugins:start -->` 與 `<!-- plugins:end -->` 之間的插件列表表格

### 重要

- **不要手動編輯** `plugins/*/`、`.claude-plugin/marketplace.json`，以及根 `README.md` 的插件列表表格，下次 build 都會被覆蓋。要改插件清單請改 `notifications.json`。
- 若 `notifications.json` 移除了某個 entry，`build.js` 會自動清理 `plugins/{id}-{platform}/` 對應的舊資料夾（可加 `--no-prune` 旗標關閉清理）。
- 互動式建立插件可呼叫 `create-notification-plugin` skill。
