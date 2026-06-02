---
name: create-notification-plugin
description: 互動式建立多平台通知插件的完整流程
allowed-tools: Bash, Read, Edit
---

# 建立通知插件流程

本 skill 維護專案根目錄的 `notifications.json` 註冊表，並觸發 `build.js` 全量重生所有 `plugins/`、`.claude-plugin/marketplace.json` 與根 `README.md` 的插件清單表格。

## 步驟 1：收集插件資訊

需要從使用者取得：

- **插件 ID**：kebab-case 英文，例如 `basic`、`my-sound`
- **插件名稱**：顯示用名稱（中文 OK），例如「基本鈴聲」
- **是否要為此插件指定獨立 author**：
  - 若是 → 取得 author name 與 email
  - 若否 → 自動沿用 `templates/marketplace.json.tmpl` 的 `owner`（市集預設作者）

收集方式由你自行判斷（自然對話、批次提問、或必要時用合適的提問工具皆可），重點是訊息完整、不重複打擾使用者。

## 步驟 2：預檢音檔

驗證以下兩個音檔是否已就位：

- `templates/audios/{id}/notification.wav`
- `templates/audios/{id}/stop.wav`

任一不存在 → 明確告知使用者放置位置（`templates/audios/{id}/`），請使用者先放好音檔再繼續，**不可進入後續步驟**。

## 步驟 3：更新註冊表

1. Read `notifications.json`
2. 用 Edit 工具在 `plugins` 陣列末端插入新 entry：

```json
{
  "id": "{id}",
  "name": "{name}",
  "platforms": ["Windows", "macOS", "Linux", "WSL"]
}
```

若使用者選擇自訂 author，加上 `author` 欄：

```json
{
  "id": "{id}",
  "name": "{name}",
  "platforms": ["Windows", "macOS", "Linux", "WSL"],
  "author": {
    "name": "{authorName}",
    "email": "{authorEmail}"
  }
}
```

若同 `id` 已存在於 `plugins` 陣列：回報「該 id 已存在，build 會冪等覆蓋」，**不修改現有 entry**，直接進步驟 4。

## 步驟 4：執行建置

```bash
node build.js
```

build.js 會：

- 全量重生 `plugins/{id}-{win,mac,linux,wsl}/`
- 重寫 `.claude-plugin/marketplace.json`
- 替換根 `README.md` 中 `<!-- plugins:start -->` 與 `<!-- plugins:end -->` 之間的表格

若 build 失敗，向使用者顯示錯誤訊息並停止。

## 步驟 5：顯示結果

解析 build.js stdout，整理回報：

- 建立的插件目錄清單
- 對應平台的安裝指令，例如：
  - `/plugin install notification-{id}-win@ycs77-notifications`
  - `/plugin install notification-{id}-mac@ycs77-notifications`
  - `/plugin install notification-{id}-linux@ycs77-notifications`
  - `/plugin install notification-{id}-wsl@ycs77-notifications`
