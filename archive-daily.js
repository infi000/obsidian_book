#!/usr/bin/env node

/**
 * Daily Archive Consolidation Skill
 * 功能: 自动聚合会议记录、临时笔记、CR记录到每日归档
 * 触发: /archive-daily
 */

const fs = require('fs');
const path = require('path');

// ==================== 配置加载 ====================

function loadConfig() {
  try {
    const configPath = '_archive_config.json';
    const configContent = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(configContent);
  } catch (err) {
    console.error('❌ 配置文件读取失败:', err.message);
    process.exit(1);
  }
}

// ==================== 文件操作 ====================

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    console.warn(`⚠️ 文件不存在: ${filePath}`);
    return '';
  }
}

function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ 已保存: ${filePath}`);
  } catch (err) {
    console.error(`❌ 文件保存失败 (${filePath}):`, err.message);
  }
}

// ==================== 日期处理 ====================

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const date = String(today.getDate()).padStart(2, '0');
  return `${year}年${month}月${date}日`;
}

function getFormattedDate() {
  return new Date().toISOString().split('T')[0];
}

// ==================== 内容提取 ====================

function extractContent(fileContent, category) {
  /**
   * 从源文件中提取有意义的内容
   * 规则:
   * 1. 跳过空行和注释
   * 2. 保留标题和列表项
   * 3. 最小内容长度检查
   */

  const lines = fileContent.split('\n');
  const extracted = [];
  let inCodeBlock = false;

  for (let line of lines) {
    // 代码块处理
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    // 有效内容检查
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('---')) continue;

    // 提取标题、列表、代码样本
    if (
      trimmed.startsWith('#') ||
      trimmed.startsWith('-') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('[ ]') ||
      trimmed.startsWith('[x]')
    ) {
      extracted.push(trimmed);
    }
  }

  return extracted.length > 0 ? extracted : [];
}

// ==================== 文档更新 ====================

function generateDailySection(config) {
  /**
   * 生成今日归档章节
   */

  const today = getTodayDate();
  let section = `\n## ${today}\n\n`;

  for (const source of config.sources) {
    if (!source.enabled) continue;

    const fileContent = readFile(source.path);
    const extracted = extractContent(fileContent, source.category);

    if (extracted.length > 0) {
      section += `### ${source.category}\n`;
      extracted.forEach(line => {
        section += `${line}\n`;
      });
      section += '\n';
    } else {
      console.log(`ℹ️ ${source.path} 无新增内容`);
    }
  }

  return section;
}

function hasDailySection(content, today) {
  /**
   * 检查是否已存在今日章节
   */
  return content.includes(`## ${today}\n`);
}

function updateArchiveFile(config, newSection) {
  /**
   * 更新归档文档
   * 插入位置: 在"历史记录"前
   * 防重复: 检查今日章节是否已存在
   */

  const outputPath = config.output.path;
  let content = readFile(outputPath);

  if (!content) {
    console.warn(`⚠️ 输出文件不存在: ${outputPath}`);
    return;
  }

  const today = getTodayDate();

  // ✅ 关键: 检查是否已有今日章节，防止重复
  if (hasDailySection(content, today)) {
    console.log(`⚠️ 今日章节已存在，跳过重复插入`);
    return;
  }

  const historyMarker = '## 📋 历史记录';
  const historyIndex = content.indexOf(historyMarker);

  if (historyIndex === -1) {
    // 如果没有历史记录段，追加到末尾
    content += '\n' + newSection;
  } else {
    // 在历史记录前插入
    content =
      content.substring(0, historyIndex) +
      newSection + '\n' +
      content.substring(historyIndex);
  }

  // 更新时间戳
  const now = new Date().toLocaleString('zh-CN');
  content = content.replace(
    /\*\*最后更新\*\*:.*$/m,
    `**最后更新**: ${now}`
  );

  writeFile(outputPath, content);
}

function updateHistoryRecord(config) {
  /**
   * 更新历史记录摘要
   */

  const outputPath = config.output.path;
  let content = readFile(outputPath);

  const today = getTodayDate();
  const todayDate = getFormattedDate();

  // 统计今日内容条数
  const todaySection = content.split(`## ${today}`)[1];
  if (!todaySection) return;

  const itemCount = (todaySection.match(/^###/m) || []).length;

  const historyLine = `- **${todayDate}**: ${itemCount}条 (待更新)\n`;

  // 在"按时间逆序排列"后插入
  const markerIndex = content.indexOf('- **2026-01-21**:');
  if (markerIndex !== -1) {
    const insertPos = content.indexOf('\n', markerIndex);
    content =
      content.substring(0, insertPos + 1) +
      historyLine +
      content.substring(insertPos + 1);
  }

  writeFile(outputPath, content);
}

// ==================== 主函数 ====================

function main() {
  console.log('🚀 开始归档更新...\n');

  const config = loadConfig();
  console.log(`📋 配置已加载: ${config.sources.length}个数据源\n`);

  // 生成今日章节
  const newSection = generateDailySection(config);

  if (newSection.trim() === `## ${getTodayDate()}\n\n`.trim()) {
    console.log('⚠️ 今天没有新增内容，跳过更新');
    return;
  }

  // 更新档案文档
  updateArchiveFile(config, newSection);

  // 更新历史记录
  updateHistoryRecord(config);

  console.log('\n✅ 归档更新完成！');
  console.log(`📄 查看: [[每日归档总结.md]]`);
}

// ==================== 执行 ====================

if (require.main === module) {
  main();
}

module.exports = { generateDailySection, updateArchiveFile };
