# Claude Code 提示音合集

這裡是 Claude Code 提示音合集倉庫，會收錄各種有趣好玩的提示音插件。

## Plugins

| Name | Description | Contents |
|------|-------------|----------|
| [basic-win](./plugins/basic-win) | 聲音通知插件 (Windows) | 當 Claude Code 執行結束或停止時，自動播放提示音通知用戶<br />**Hook:** `Notification` - 發送通知時播放音效<br />**Hook:** `Stop` - 停止執行時播放音效 |
| [basic-mac](./plugins/basic-mac) | 聲音通知插件 (macOS) | 當 Claude Code 執行結束或停止時，自動播放提示音通知用戶<br />**Hook:** `Notification` - 發送通知時播放音效<br />**Hook:** `Stop` - 停止執行時播放音效 |

## 在 Claude Code 中安裝

在 Claude Code 中執行以下命令，將此 repo 註冊為插件市場：

```
/plugin marketplace add ycs77/claude-code-notifications
```

## 作者

Lucas Yang (yangchenshin77@gmail.com)

## 授權

[MIT License](LICENSE.md)

本倉庫中的所有音檔均從網路上取得，版權歸原作者所有。
