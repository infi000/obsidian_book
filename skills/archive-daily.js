/**
 * Daily Archive Consolidation Skill - JavaScript Implementation
 *
 * 功能: 自动聚合会议记录、临时笔记、CR记录到每日归档文档
 * 触发: /archive-daily
 *
 * @version 1.0.0
 * @author Claudian
 * @requires Node.js 或 Obsidian API
 */

class DailyArchiveSkill {
  constructor(vaultRoot = '.') {
    this.vaultRoot = vaultRoot;
    this.config = null;
    this.logger = new Logger('DailyArchive');
  }

  /**
   * 加载配置文件
   */
  async loadConfig() {
    try {
      const configPath = `${this.vaultRoot}/_archive_config.json`;
      const fs = require('fs');
      const configContent = fs.readFileSync(configPath, 'utf-8');
      this.config = JSON.parse(configContent);
      this.logger.info('✅ 配置已加载');
      return this.config;
    } catch (err) {
      this.logger.warn('⚠️ 配置加载失败，使用默认配置');
      this.config = this.getDefaultConfig();
      return this.config;
    }
  }

  /**
   * 获取默认配置
   */
  getDefaultConfig() {
    return {
      version: '1.0',
      sources: [
        {
          path: '会议记录.md',
          category: '📌 会议记录',
          enabled: true,
          priority: 1,
        },
        {
          path: '临时笔记.md',
          category: '📝 临时笔记',
          enabled: true,
          priority: 2,
        },
        {
          path: 'cr记录.md',
          category: '🔍 CR 记录',
          enabled: true,
          priority: 3,
        },
      ],
      output: {
        path: '每日归档总结.md',
        format: 'markdown',
        preserveLinks: true,
        addTimestamp: true,
      },
      extraction: {
        method: 'heading-based',
        minContentLength: 10,
        skipEmptyLines: true,
        preserveFormatting: true,
      },
      archiveRules: {
        dateFormat: 'YYYY-MM-DD',
        groupByDate: true,
        keepHistory: true,
      },
    };
  }

  /**
   * 主执行函数
   */
  async execute() {
    try {
      this.logger.info('🚀 开始每日归档...\n');

      // 1. 加载配置
      await this.loadConfig();

      // 2. 提取所有源文件的内容
      const extractedContents = await this.extractAllSources();

      if (extractedContents.length === 0) {
        this.logger.warn('⚠️ 没有新增内容，跳过更新');
        return;
      }

      // 3. 生成今日章节
      const todaySection = this.generateTodaySection(extractedContents);

      // 4. 更新归档文档
      await this.updateArchiveFile(todaySection);

      // 5. 更新历史记录
      await this.updateHistoryRecord(extractedContents.length);

      this.logger.success('\n✅ 每日归档完成！');
    } catch (err) {
      this.logger.error(`❌ 执行失败: ${err.message}`);
      throw err;
    }
  }

  /**
   * 提取所有源文件的内容
   */
  async extractAllSources() {
    const results = [];
    const fs = require('fs');

    for (const source of this.config.sources) {
      if (!source.enabled) continue;

      this.logger.info(`📖 读取: ${source.path}`);

      const filePath = `${this.vaultRoot}/${source.path}`;
      let content = '';

      try {
        content = fs.readFileSync(filePath, 'utf-8');
      } catch (err) {
        this.logger.warn(`⚠️ 文件不存在: ${source.path}`);
        continue;
      }

      const extracted = this.extractContent(content);

      if (extracted.length > 0) {
        results.push({
          source: source.path,
          category: source.category,
          content: extracted,
          priority: source.priority,
        });
        this.logger.info(`   ✅ 提取了 ${extracted.length} 条内容\n`);
      } else {
        this.logger.info(`   ℹ️ 无新增内容\n`);
      }
    }

    return results.sort((a, b) => a.priority - b.priority);
  }

  /**
   * 提取有效内容
   */
  extractContent(fileContent) {
    const lines = fileContent.split('\n');
    const extracted = [];
    let inCodeBlock = false;

    for (let line of lines) {
      const trimmed = line.trim();

      // 代码块处理
      if (trimmed.startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      if (inCodeBlock) continue;

      // 有效内容检查
      if (!trimmed || trimmed.startsWith('---')) continue;

      // 提取标题、列表、关键字
      if (
        (trimmed.startsWith('#') ||
          trimmed.startsWith('-') ||
          trimmed.startsWith('*') ||
          trimmed.startsWith('[') ||
          /^(TODO|FIXME|NOTE|重点|关键):/.test(trimmed)) &&
        trimmed.length >= this.config.extraction.minContentLength
      ) {
        extracted.push(trimmed);
      }
    }

    return extracted;
  }

  /**
   * 生成今日章节
   */
  generateTodaySection(extractedContents) {
    const today = this.getTodayDateString();
    let section = `\n## ${today}\n\n`;

    for (const extracted of extractedContents) {
      section += `### ${extracted.category}\n`;
      extracted.content.forEach((line) => {
        section += `${line}\n`;
      });
      section += '\n';
    }

    return section;
  }

  /**
   * 更新归档文档
   */
  async updateArchiveFile(newSection) {
    const fs = require('fs');
    const outputPath = `${this.vaultRoot}/${this.config.output.path}`;

    try {
      let content;

      // 读取现有文件或创建新文件
      if (fs.existsSync(outputPath)) {
        content = fs.readFileSync(outputPath, 'utf-8');
      } else {
        this.logger.info(`📝 创建新文件: ${this.config.output.path}`);
        content = this.getInitialArchiveContent();
      }

      // 在历史记录前插入新章节
      const historyMarker = '## 📋 历史记录';
      const historyIndex = content.indexOf(historyMarker);

      if (historyIndex !== -1) {
        content = content.substring(0, historyIndex) +
          newSection + '\n' +
          content.substring(historyIndex);
      } else {
        content += '\n' + newSection;
      }

      // 更新时间戳
      const now = new Date().toLocaleString('zh-CN');
      content = content.replace(
        /\*\*最后更新\*\*:.*?\|/,
        `**最后更新**: ${now} |`
      );

      // 保存文件
      fs.writeFileSync(outputPath, content, 'utf-8');
      this.logger.success(`✅ 已更新: ${this.config.output.path}`);
    } catch (err) {
      this.logger.error(`❌ 文件更新失败: ${err.message}`);
      throw err;
    }
  }

  /**
   * 更新历史记录统计
   */
  async updateHistoryRecord(itemCount) {
    const fs = require('fs');
    const outputPath = `${this.vaultRoot}/${this.config.output.path}`;

    try {
      if (!fs.existsSync(outputPath)) return;

      let content = fs.readFileSync(outputPath, 'utf-8');
      const today = this.getFormattedDate();
      const historyLine = `- **${today}**: ${itemCount}条\n`;

      // 在第一条历史记录前插入
      const markerIndex = content.search(/- \*\*\d{4}-\d{2}-\d{2}\*\*:/);

      if (markerIndex !== -1) {
        const insertPos = content.indexOf('\n', markerIndex);
        content = content.substring(0, insertPos + 1) +
          historyLine +
          content.substring(insertPos + 1);

        fs.writeFileSync(outputPath, content, 'utf-8');
      }
    } catch (err) {
      this.logger.warn(`⚠️ 历史记录更新失败: ${err.message}`);
    }
  }

  /**
   * 获取初始归档文档内容
   */
  getInitialArchiveContent() {
    const today = this.getTodayDateString();
    return `# 📅 每日归档总结

> 自动聚合会议记录、临时笔记、CR记录的日常积累

**最后更新**: ${new Date().toLocaleString('zh-CN')} | **下次更新**: 明天

---

## ${today}

> 今天的内容将自动填充...

---

## 📋 历史记录

按时间逆序排列

---
`;
  }

  /**
   * 获取今日日期字符串（中文格式）
   */
  getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    return `${year}年${month}月${date}日`;
  }

  /**
   * 获取格式化日期（YYYY-MM-DD）
   */
  getFormattedDate() {
    return new Date().toISOString().split('T')[0];
  }
}

/**
 * 简单日志工具
 */
class Logger {
  constructor(name = 'Logger') {
    this.name = name;
    this.colors = {
      reset: '\x1b[0m',
      bright: '\x1b[1m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
    };
  }

  info(message) {
    console.log(`${this.colors.blue}[${this.name}]${this.colors.reset} ${message}`);
  }

  success(message) {
    console.log(`${this.colors.green}${this.colors.bright}${message}${this.colors.reset}`);
  }

  warn(message) {
    console.log(`${this.colors.yellow}${message}${this.colors.reset}`);
  }

  error(message) {
    console.log(`${this.colors.red}${this.colors.bright}${message}${this.colors.reset}`);
  }
}

/**
 * 命令行执行入口
 */
if (require.main === module) {
  const skill = new DailyArchiveSkill('.');
  skill.execute().catch((err) => {
    console.error('💥 致命错误:', err);
    process.exit(1);
  });
}

module.exports = DailyArchiveSkill;
