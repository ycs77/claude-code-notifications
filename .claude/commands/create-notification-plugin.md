---
description: 快速建立包含三個作業系統版本的 Claude Code 通知插件
allowed-tools: Skill
---

# 通知插件建立指令

使用互動式流程建立新的通知插件，包含 Windows、macOS、Linux 三個版本。

**執行動作：**
1. 使用 Skill tool 呼叫 `create-notification-plugin` skill
2. Skill 會自動引導完整的建立流程，包含：
   - 收集插件資訊（ID、名稱、作者、音檔路徑等）
   - 驗證音檔存在
   - 執行 Node.js 腳本建立插件
   - 顯示建立結果

**重要：不要嘗試自己執行這些步驟，必須透過 Skill 來完成整個流程。**
