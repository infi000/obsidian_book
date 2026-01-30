/**
 * Daily Archive Consolidation Skill
 *
 * 功能: 自动聚合会议记录、临时笔记、CR记录到每日归档文档
 * 触发: /archive-daily 或快捷键 ⇧ + ⌘ + A
 *
 * @version 1.0.0
 * @author Claudian
 */

import { App, Plugin, PluginSettingTab, Setting, Notice, TFile } from 'obsidian';
import * as fs from 'fs';
import * as path from 'path';

interface ArchiveSource {
  path: string;
  category: string;
  enabled: boolean;
  priority: number;
}

interface ArchiveConfig {
  sources: ArchiveSource[];
  output: {
    path: string;
    format: string;
  };
  extraction: {
    method: string;
    minContentLength: number;
    skipEmptyLines: boolean;
  };
}

interface ExtractedContent {
  source: string;
  category: string;
  content: string[];
}

/**
 * Daily Archive Consolidation 插件
 */
export default class DailyArchivePlugin extends Plugin {
  settings: ArchiveConfig;
  statusBar: HTMLElement;

  async onload() {
    console.log('🚀 Daily Archive Plugin loaded');

    // 加载配置
    await this.loadConfig();

    // 注册命令: /archive-daily
    this.addCommand({
      id: 'archive-daily-trigger',
      name: 'Run Daily Archive',
      callback: () => this.executeDailyArchive(),
      hotkeys: [
        {
          modifiers: ['Mod', 'Shift'],
          key: 'a',
        },
      ],
    });

    // 添加状态栏
    this.statusBar = this.addStatusBarItem();
    this.updateStatusBar('ready');

    // 注册设置面板
    this.addSettingTab(new ArchiveSettingTab(this.app, this));
  }

  onunload() {
    console.log('🛑 Daily Archive Plugin unloaded');
  }

  /**
   * 加载配置文件
   */
  async loadConfig(): Promise<void> {
    try {
      const configPath = '_archive_config.json';
      const configFile = this.app.vault.getAbstractFileByPath(configPath);

      if (configFile && configFile instanceof TFile) {
        const configContent = await this.app.vault.read(configFile);
        this.settings = JSON.parse(configContent);
        console.log('✅ 配置已加载');
      } else {
        console.warn('⚠️ 配置文件不存在，使用默认设置');
        this.settings = this.getDefaultConfig();
      }
    } catch (err) {
      console.error('❌ 配置加载失败:', err);
      new Notice('❌ 配置加载失败，请检查 _archive_config.json');
    }
  }

  /**
   * 获取默认配置
   */
  getDefaultConfig(): ArchiveConfig {
    return {
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
      },
      extraction: {
        method: 'heading-based',
        minContentLength: 10,
        skipEmptyLines: true,
      },
    };
  }

  /**
   * 执行每日归档
   */
  async executeDailyArchive(): Promise<void> {
    try {
      this.updateStatusBar('processing');
      console.log('🚀 开始每日归档...\n');

      // 1. 提取所有源文件的内容
      const extractedContents = await this.extractAllSources();

      if (extractedContents.length === 0) {
        new Notice('⚠️ 没有新增内容，跳过更新');
        this.updateStatusBar('ready');
        return;
      }

      // 2. 生成今日章节
      const todaySection = this.generateTodaySection(extractedContents);

      // 3. 更新归档文档
      await this.updateArchiveFile(todaySection);

      // 4. 更新历史记录
      await this.updateHistoryRecord(extractedContents.length);

      this.updateStatusBar('ready');
      new Notice('✅ 每日归档完成！');
      console.log('\n✅ 每日归档完成！');
    } catch (err) {
      console.error('❌ 执行失败:', err);
      new Notice(`❌ 执行失败: ${err.message}`);
      this.updateStatusBar('error');
    }
  }

  /**
   * 提取所有源文件的内容
   */
  async extractAllSources(): Promise<ExtractedContent[]> {
    const results: ExtractedContent[] = [];

    for (const source of this.settings.sources) {
      if (!source.enabled) continue;

      console.log(`📖 读取: ${source.path}`);

      const content = await this.readSourceFile(source.path);
      const extracted = this.extractContent(content);

      if (extracted.length > 0) {
        results.push({
          source: source.path,
          category: source.category,
          content: extracted,
        });
        console.log(`   ✅ 提取了 ${extracted.length} 条内容\n`);
      } else {
        console.log(`   ℹ️ 无新增内容\n`);
      }
    }

    return results;
  }

  /**
   * 读取源文件内容
   */
  async readSourceFile(filePath: string): Promise<string> {
    try {
      const file = this.app.vault.getAbstractFileByPath(filePath);
      if (file && file instanceof TFile) {
        return await this.app.vault.read(file);
      }
      return '';
    } catch (err) {
      console.warn(`⚠️ 文件读取失败: ${filePath}`);
      return '';
    }
  }

  /**
   * 提取有效内容
   * 规则:
   * - 跳过空行和注释
   * - 保留标题、列表项、代码块等
   * - 最小内容长度检查
   */
  extractContent(fileContent: string): string[] {
    const lines = fileContent.split('\n');
    const extracted: string[] = [];
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

      // 提取标题、列表、代码样本
      if (
        trimmed.startsWith('#') ||
        trimmed.startsWith('-') ||
        trimmed.startsWith('*') ||
        trimmed.startsWith('[') ||
        trimmed.match(/^(TODO|FIXME|NOTE):/)
      ) {
        if (trimmed.length >= this.settings.extraction.minContentLength) {
          extracted.push(trimmed);
        }
      }
    }

    return extracted;
  }

  /**
   * 生成今日章节
   */
  generateTodaySection(extractedContents: ExtractedContent[]): string {
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
  async updateArchiveFile(newSection: string): Promise<void> {
    const outputPath = this.settings.output.path;

    try {
      let file = this.app.vault.getAbstractFileByPath(outputPath);

      if (!file || !(file instanceof TFile)) {
        // 文件不存在，创建新文件
        console.log(`📝 创建新文件: ${outputPath}`);
        const initialContent = this.getInitialArchiveContent();
        await this.app.vault.create(outputPath, initialContent);
        file = this.app.vault.getAbstractFileByPath(outputPath);
      }

      if (file && file instanceof TFile) {
        let content = await this.app.vault.read(file);

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
        await this.app.vault.modify(file, content);
        console.log(`✅ 已更新: ${outputPath}`);
      }
    } catch (err) {
      console.error(`❌ 文件更新失败 (${outputPath}):`, err);
      throw err;
    }
  }

  /**
   * 更新历史记录统计
   */
  async updateHistoryRecord(itemCount: number): Promise<void> {
    const outputPath = this.settings.output.path;

    try {
      const file = this.app.vault.getAbstractFileByPath(outputPath);
      if (file && file instanceof TFile) {
        let content = await this.app.vault.read(file);
        const today = this.getFormattedDate();

        // 更新历史记录行
        const historyLine = `- **${today}**: ${itemCount}条\n`;
        const markerIndex = content.search(/- \*\*\d{4}-\d{2}-\d{2}\*\*:/);

        if (markerIndex !== -1) {
          const insertPos = content.indexOf('\n', markerIndex);
          content = content.substring(0, insertPos + 1) +
            historyLine +
            content.substring(insertPos + 1);

          await this.app.vault.modify(file, content);
        }
      }
    } catch (err) {
      console.warn('⚠️ 历史记录更新失败:', err);
    }
  }

  /**
   * 获取初始归档文档内容
   */
  getInitialArchiveContent(): string {
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
  getTodayDateString(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    return `${year}年${month}月${date}日`;
  }

  /**
   * 获取格式化日期（YYYY-MM-DD）
   */
  getFormattedDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * 更新状态栏
   */
  updateStatusBar(status: 'ready' | 'processing' | 'error'): void {
    const statusTexts = {
      ready: '📅 归档就绪',
      processing: '⏳ 处理中...',
      error: '❌ 错误',
    };
    this.statusBar.setText(statusTexts[status]);
  }
}

/**
 * 设置面板
 */
class ArchiveSettingTab extends PluginSettingTab {
  plugin: DailyArchivePlugin;

  constructor(app: App, plugin: DailyArchivePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: '📅 每日归档设置' });

    new Setting(containerEl)
      .setName('输出文档路径')
      .setDesc('存储每日归档内容的 Markdown 文件')
      .addText((text) =>
        text
          .setPlaceholder('每日归档总结.md')
          .setValue(this.plugin.settings.output.path)
          .onChange(async (value) => {
            this.plugin.settings.output.path = value;
            await this.plugin.saveData(this.plugin.settings);
          })
      );

    new Setting(containerEl)
      .setName('最小内容长度')
      .setDesc('提取内容的最小字符数')
      .addText((text) =>
        text
          .setPlaceholder('10')
          .setValue(String(this.plugin.settings.extraction.minContentLength))
          .onChange(async (value) => {
            this.plugin.settings.extraction.minContentLength = parseInt(value) || 10;
            await this.plugin.saveData(this.plugin.settings);
          })
      );

    containerEl.createEl('h3', { text: '📚 数据源配置' });

    this.plugin.settings.sources.forEach((source, index) => {
      new Setting(containerEl)
        .setName(`源 ${index + 1}: ${source.path}`)
        .addToggle((toggle) =>
          toggle
            .setValue(source.enabled)
            .onChange(async (value) => {
              this.plugin.settings.sources[index].enabled = value;
              await this.plugin.saveData(this.plugin.settings);
            })
        );
    });

    containerEl.createEl('hr');
    containerEl.createEl('p', {
      text: '💡 提示: 编辑 _archive_config.json 以获得更多高级选项',
    });
  }
}
