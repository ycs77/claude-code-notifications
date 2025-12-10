#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 解析命令列參數
function parseArgs() {
  const args = {};
  const argv = process.argv.slice(2);

  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      const value = argv[i + 1];

      // 轉換 kebab-case 為 camelCase
      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      args[camelKey] = value;
      i++;
    }
  }

  return args;
}

// 佔位符替換函數
function replacePlaceholders(template, values) {
  let result = template;
  for (const [key, value] of Object.entries(values)) {
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    result = result.replace(regex, value);
  }
  return result;
}

// 主函數
function main() {
  const args = parseArgs();

  // 驗證必填參數
  const requiredParams = ['id', 'name', 'notificationAudio', 'stopAudio'];
  for (const param of requiredParams) {
    if (!args[param]) {
      console.error(`錯誤：缺少必填參數 --${param.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
      process.exit(1);
    }
  }

  // 固定的描述文字
  const description = '當 Claude Code 執行結束或停止時，自動播放提示音通知用戶';

  // 設定預設值
  const authorName = args.authorName || 'Lucas Yang';
  const authorEmail = args.authorEmail || 'yangchenshin77@gmail.com';

  // 驗證音檔存在
  if (!fs.existsSync(args.notificationAudio)) {
    console.error(`錯誤：Notification 音檔不存在：${args.notificationAudio}`);
    process.exit(1);
  }
  if (!fs.existsSync(args.stopAudio)) {
    console.error(`錯誤：Stop 音檔不存在：${args.stopAudio}`);
    process.exit(1);
  }

  // 定義平台
  const platforms = ['win', 'mac', 'linux'];
  const osNameMap = {
    win: 'Windows',
    mac: 'macOS',
    linux: 'Linux'
  };
  const templateDir = 'templates';

  console.log(`\n開始建立插件：${args.name} (${args.id})`);
  console.log('========================================\n');

  // 為每個平台建立插件
  for (const platform of platforms) {
    const pluginDir = `plugins/${args.id}-${platform}`;
    const osName = osNameMap[platform];

    console.log(`正在建立 ${platform} 版本...`);

    // 檢查目錄是否已存在
    if (fs.existsSync(pluginDir)) {
      console.warn(`  警告：目錄 ${pluginDir} 已存在，將被覆蓋`);
      fs.rmSync(pluginDir, { recursive: true, force: true });
    }

    // 建立目錄結構
    fs.mkdirSync(`${pluginDir}/.claude-plugin`, { recursive: true });
    fs.mkdirSync(`${pluginDir}/hooks`, { recursive: true });
    fs.mkdirSync(`${pluginDir}/audios`, { recursive: true });

    // 生成 plugin.json
    const pluginTemplate = fs.readFileSync(path.join(templateDir, 'plugin.json'), 'utf-8');
    const pluginContent = replacePlaceholders(pluginTemplate, {
      id: args.id,
      platform: platform,
      name: args.name,
      description: description,
      OS: osName,
      authorName: authorName,
      authorEmail: authorEmail
    });
    const pluginJson = JSON.parse(pluginContent);
    fs.writeFileSync(
      `${pluginDir}/.claude-plugin/plugin.json`,
      JSON.stringify(pluginJson, null, 2) + '\n'
    );

    // 生成 hooks.json
    const hooksTemplate = fs.readFileSync(path.join(templateDir, `hooks-${platform}.json`), 'utf-8');
    fs.writeFileSync(`${pluginDir}/hooks/hooks.json`, hooksTemplate);

    // 複製音檔
    fs.copyFileSync(args.notificationAudio, `${pluginDir}/audios/notification.wav`);
    fs.copyFileSync(args.stopAudio, `${pluginDir}/audios/stop.wav`);

    // 生成 README.md
    const readmeTemplate = fs.readFileSync(path.join(templateDir, `README-${platform}.md`), 'utf-8');
    const readmeContent = replacePlaceholders(readmeTemplate, {
      id: args.id,
      name: args.name,
      description: `${description}。`,
      authorName: authorName,
      authorEmail: authorEmail
    });
    fs.writeFileSync(`${pluginDir}/README.md`, readmeContent);

    console.log(`  ✅ ${pluginDir}`);
  }

  console.log('\n正在更新 marketplace.json...');

  // 更新 marketplace.json
  const marketplacePath = '.claude-plugin/marketplace.json';
  const marketplace = JSON.parse(fs.readFileSync(marketplacePath, 'utf-8'));

  // 移除舊的同名插件（如果存在）
  marketplace.plugins = marketplace.plugins.filter(p =>
    !p.name.startsWith(`${args.id}-`)
  );

  // 新增新插件
  for (const platform of platforms) {
    const osName = osNameMap[platform];
    marketplace.plugins.push({
      name: `${args.id}-${platform}`,
      description: `[${osName}] ${args.name} - ${description}`,
      version: '1.0.0',
      source: `./plugins/${args.id}-${platform}`,
      category: 'development'
    });
  }

  fs.writeFileSync(marketplacePath, JSON.stringify(marketplace, null, 2) + '\n');
  console.log('  ✅ .claude-plugin/marketplace.json');

  console.log('\n正在更新 README.md...');

  // 更新 README.md
  const readmePath = 'README.md';
  let readme = fs.readFileSync(readmePath, 'utf-8');

  // 移除舊的同名插件行（如果存在）
  const lines = readme.split('\n');
  const tableStartIndex = lines.findIndex(line => line.startsWith('| Name | Sources |'));
  if (tableStartIndex !== -1) {
    // 找到表格結束位置
    let tableEndIndex = tableStartIndex + 2; // 跳過表頭和分隔線
    while (tableEndIndex < lines.length && lines[tableEndIndex].startsWith('|')) {
      if (!lines[tableEndIndex].includes(`./plugins/${args.id}-`)) {
        tableEndIndex++;
      } else {
        // 移除這一行
        lines.splice(tableEndIndex, 1);
        tableEndIndex--; // 調整索引
        tableEndIndex++;
      }
    }

    // 在分隔線後插入新行
    const newLine = `| ${args.name} | [Windows](./plugins/${args.id}-win) \\| [macOS](./plugins/${args.id}-mac) \\| [Linux](./plugins/${args.id}-linux) |`;
    lines.splice(tableStartIndex + 2, 0, newLine);

    readme = lines.join('\n');
    fs.writeFileSync(readmePath, readme);
    console.log('  ✅ README.md');
  } else {
    console.warn('  ⚠️  無法找到插件列表表格，請手動更新 README.md');
  }

  // 輸出成功訊息
  console.log('\n========================================');
  console.log('✅ 插件建立成功！\n');
  console.log('已建立的插件：');
  for (const platform of platforms) {
    console.log(`  - plugins/${args.id}-${platform}`);
  }
  console.log('\n安裝指令：');
  for (const platform of platforms) {
    console.log(`  /plugin install ${args.id}-${platform}@ycs77-notifications`);
  }
  console.log('');
}

// 執行主函數
try {
  main();
} catch (error) {
  console.error('\n錯誤：', error.message);
  process.exit(1);
}
