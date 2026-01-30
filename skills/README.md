# 📅 Daily Archive Consolidation Skill

> Claudian 的每日归档技能 - 自动聚合会议、临时笔记、CR 记录

## 📦 文件结构

```
skills/
├── daily-archive.yml              # Skill 元数据和配置
├── archive-daily.js               # JavaScript 实现（推荐）
├── archive-daily-plugin.ts        # TypeScript/Obsidian 插件版本（可选）
└── README.md                       # 本文档
```

---

## 🚀 快速开始

### 方案 A: 直接运行（最快）

```bash
cd /Users/01389450/Documents/Obsidian\ Vault

# 运行 Skill
node skills/archive-daily.js
```

**输出**：
```
🚀 开始每日归档...

📖 读取: 会议记录.md
   ✅ 提取了 3 条内容

📖 读取: 临时笔记.md
   ✅ 提取了 2 条内容

📖 读取: cr记录.md
   ✅ 提取了 5 条内容

✅ 已更新: 每日归档总结.md
✅ 每日归档完成！
```

### 方案 B: Obsidian 命令面板（推荐）

1. 安装 TypeScript/Obsidian 插件版本
2. 按 Cmd+P (Mac) / Ctrl+P (Windows)
3. 输入 `Daily Archive Consolidation` 或 `archive-daily`
4. Enter 执行

### 方案 C: 快捷键

```
Mac:    ⇧ + ⌘ + A
Windows: Shift + Ctrl + A
```

---

## 📋 文件说明

### 1. `daily-archive.yml` - 元数据文件

定义 Skill 的基本信息：
- **name**: Skill 名称
- **id**: 唯一标识符
- **trigger**: 触发命令和快捷键
- **sources**: 数据源列表
- **behavior**: 运行时行为配置

**使用场景**:
- Obsidian 插件系统会读取此文件
- 注册命令和快捷键
- 配置用户界面

### 2. `archive-daily.js` - JavaScript 实现（推荐）

**特点**：
- ✅ 零依赖，纯 Node.js
- ✅ 可直接运行或集成
- ✅ 兼容性最好
- ✅ 易于调试和修改

**核心类**：
```javascript
class DailyArchiveSkill {
  async execute()           // 执行主流程
  async extractAllSources() // 提取所有源文件内容
  async updateArchiveFile() // 更新归档文档
  async updateHistoryRecord() // 更新历史统计
}
```

**使用示例**：
```javascript
const DailyArchiveSkill = require('./skills/archive-daily.js');
const skill = new DailyArchiveSkill('.');
await skill.execute();
```

### 3. `archive-daily-plugin.ts` - TypeScript/Obsidian 版本（可选）

**特点**：
- ✅ 深度集成 Obsidian API
- ✅ 提供设置面板
- ✅ 实时状态栏显示
- ✅ Hot reload 支持

**需要**：
- Obsidian 开发环境
- TypeScript 编译器
- Obsidian 插件模板

---

## ⚙️ 配置

### 文件: `_archive_config.json`

```json
{
  "sources": [
    {
      "path": "会议记录.md",
      "category": "📌 会议记录",
      "enabled": true,
      "priority": 1
    }
  ],
  "output": {
    "path": "每日归档总结.md",
    "format": "markdown"
  },
  "extraction": {
    "minContentLength": 10,
    "skipEmptyLines": true
  }
}
```

### 自定义配置

**添加新数据源**：
```json
{
  "sources": [
    // 原有配置...
    {
      "path": "你的新文件.md",
      "category": "📌 新类别",
      "enabled": true,
      "priority": 4
    }
  ]
}
```

**禁用某个源**：
```json
{
  "enabled": false  // 设置为 false
}
```

**修改输出路径**：
```json
{
  "output": {
    "path": "自定义归档.md"  // 修改此路径
  }
}
```

---

## 📊 工作流程

```
┌─────────────────────────────────────────┐
│ 每日工作                                │
├─────────────────────────────────────────┤
│ 1. 创建 / 更新源文件内容                │
│    - 会议记录.md                         │
│    - 临时笔记.md                         │
│    - cr记录.md                           │
│                                          │
│ 2. 触发 Skill                           │
│    $ node skills/archive-daily.js       │
│    或使用快捷键 ⇧ + ⌘ + A               │
│                                          │
│ 3. 自动处理                             │
│    - 读取源文件                          │
│    - 提取有效内容                        │
│    - 按类别分组                          │
│    - 生成今日章节                        │
│                                          │
│ 4. 更新输出                             │
│    每日归档总结.md                       │
│    ↓                                     │
│    新增: 2026年1月21日                   │
│    ├─ 📌 会议记录 (3条)                 │
│    ├─ 📝 临时笔记 (2条)                 │
│    └─ 🔍 CR 记录 (5条)                  │
│                                          │
│ 5. 历史统计更新                         │
│    - 2026-01-21: 10条                   │
│    - 2026-01-20: 8条                    │
└─────────────────────────────────────────┘
```

---

## 🔄 使用模式

### 模式 1: 每日自动运行（使用 Cron）

```bash
# 每天下午 6 点运行
0 18 * * * cd /Users/01389450/Documents/Obsidian\ Vault && node skills/archive-daily.js

# 或使用 macOS launchd
# 编辑 ~/Library/LaunchAgents/com.claudian.archive.plist
```

### 模式 2: 手动触发（推荐）

```bash
# 终端执行
node skills/archive-daily.js

# 或在 Obsidian 中
Cmd+P → Daily Archive Consolidation
```

### 模式 3: Git Hook

```bash
# .git/hooks/post-commit
#!/bin/bash
node skills/archive-daily.js
```

---

## 🎯 高级用法

### 只更新特定类别

编辑 `_archive_config.json`：
```json
{
  "sources": [
    {"path": "会议记录.md", "enabled": true},
    {"path": "临时笔记.md", "enabled": false},
    {"path": "cr记录.md", "enabled": false}
  ]
}
```

### 自定义提取规则

```json
{
  "extraction": {
    "method": "heading-based",
    "minContentLength": 20,
    "skipEmptyLines": true,
    "preserveFormatting": true
  }
}
```

### 使用代码集成

```javascript
const DailyArchiveSkill = require('./skills/archive-daily.js');

async function dailyWorkflow() {
  const skill = new DailyArchiveSkill('.');

  try {
    await skill.execute();
    console.log('✅ 每日归档完成！');
  } catch (err) {
    console.error('❌ 失败:', err);
  }
}

dailyWorkflow();
```

---

## 🐛 常见问题

### Q1: 脚本找不到源文件？
**A**:
- 检查 `_archive_config.json` 中的文件路径
- 确保相对路径从 vault 根目录开始
```json
// ✅ 正确
"path": "会议记录.md"

// ❌ 错误
"path": "/会议记录.md"
"path": "./会议记录.md"
```

### Q2: 内容出现重复？
**A**:
- 检查文件的 `最后更新` 时间戳
- 避免同天运行多次
- 使用日期检查逻辑防止重复更新

### Q3: 如何排查问题？
**A**:
```bash
# 添加详细日志
node -e "
  const Skill = require('./skills/archive-daily.js');
  const skill = new Skill('.');
  skill.loadConfig().then(() => {
    console.log(JSON.stringify(skill.config, null, 2));
  });
"
```

### Q4: 性能优化？
**A**:
- 只启用必要的数据源
- 增加 `minContentLength` 过滤短内容
- 定期清理历史记录（保留 90 天）

---

## 🔗 相关文件

| 文件 | 说明 |
|------|------|
| [[每日归档总结.md]] | 输出文档 |
| [[_archive_config.json]] | 配置文件 |
| [[灵感记录.md]] | 快速操作指令 |
| [[每日归档使用指南.md]] | 完整使用手册 |

---

## 📞 技术栈

| 组件 | 技术 | 说明 |
|------|------|------|
| 配置定义 | YAML | 元数据和触发规则 |
| 实现（推荐） | JavaScript | 零依赖，纯 Node.js |
| 实现（可选） | TypeScript | Obsidian 插件深度集成 |
| 触发方式 | 手动/Cron/快捷键 | 多种选择 |

---

## ✨ 功能特点

- ✅ **自动聚合** - 智能提取和分组
- ✅ **按日期组织** - 便于长期积累
- ✅ **灵活配置** - 自定义数据源和规则
- ✅ **零依赖** - JavaScript 版本即装即用
- ✅ **易于扩展** - 模块化设计，易于修改
- ✅ **多种触发** - 命令行、快捷键、Cron
- ✅ **详细日志** - 便于调试和监控

---

## 🚀 下一步

1. ✅ **立即试用**
   ```bash
   node skills/archive-daily.js
   ```

2. 📖 **查看结果**
   - 打开 [[每日归档总结.md]]
   - 检查是否成功生成今日章节

3. ⚙️ **自定义配置**
   - 编辑 `_archive_config.json`
   - 添加或修改数据源

4. 🔄 **自动化运行**
   - 配置 Cron 定时任务
   - 集成 Git hooks

5. 🎓 **深度集成**
   - 使用 TypeScript 版本
   - 自定义提取逻辑

---

**创建日期**: 2026-01-21 | **版本**: 1.0.0 | **状态**: ✅ 就绪

**快速命令**:
```bash
# 立即运行
node skills/archive-daily.js

# 查看配置
cat _archive_config.json

# 查看结果
open 每日归档总结.md
```
