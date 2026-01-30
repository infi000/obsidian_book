# 🚀 上线前自动迭代报告 Agent - 完整方案

> 自动化收集需求、分支、CR记录，一键生成完整的版本报告

---

## 📋 现状分析

### 你的工作流
```
周三：PM确认版本需求
  ↓
周四上午：拉上线分支，成员合并需求分支
  ↓
周四中午：开始CR审查
  ↓
周四下午：分支发给测试
  ↓
周四晚上：上线
  ↓
❌ 手工创建版本报告（繁琐、容易遗漏、格式不统一）
```

### 痛点
- 🔴 每个版本都要手工整理需求链接
- 🔴 要找出所有合并的分支
- 🔴 要手工整理CR记录
- 🔴 要统计改动文件数、代码行数等
- 🔴 报告格式不一致，难以追溯

### 解决方案
**一个Agent，自动完成上面的所有工作** → 周四中午CR开始时，直接生成完整报告

---

## 🎯 Agent 设计方案

### 核心流程

```
┌─────────────────────────────────────────────────┐
│  输入：上线分支名（如 release/v1.2.3）          │
├─────────────────────────────────────────────────┤
│                                                  │
│ 1️⃣ 获取所有合并的分支                           │
│   └─ git log release/v1.2.3...main --merges    │
│                                                  │
│ 2️⃣ 提取需求信息                                │
│   └─ 从 PR/commit message 解析需求号            │
│   └─ 调用需求管理系统API获取详情                │
│                                                  │
│ 3️⃣ 收集改动统计                                │
│   └─ 改动文件数、新增/删除行数                  │
│   └─ 涉及的组件/模块                            │
│   └─ 影响范围分析                               │
│                                                  │
│ 4️⃣ 收集CR记录                                  │
│   └─ 从GitHub/GitLab API获取PR信息              │
│   └─ 提取评论、建议、问题记录                   │
│                                                  │
│ 5️⃣ 生成报告                                    │
│   └─ Markdown格式的完整报告                     │
│   └─ 自动上传到Wiki或文档系统                   │
│                                                  │
│ 6️⃣ 通知团队                                    │
│   └─ 发送到Slack/钉钉                          │
│                                                  │
└─────────────────────────────────────────────────┘
```

---

## 💻 完整实现代码

### 第一步：定义Agent的数据结构

```typescript
// agents/release-report-agent.ts

import { Octokit } from '@octokit/rest'
import { exec } from 'child_process'
import { promisify } from 'util'
import axios from 'axios'

const execAsync = promisify(exec)

interface RequirementInfo {
  id: string                    // 需求ID（如 JIRA-123）
  title: string                 // 需求标题
  status: string                // 需求状态
  assignee: string              // 责任人
  link: string                  // 需求链接
}

interface BranchInfo {
  name: string                  // 分支名
  commits: number               // 提交数
  files: number                 // 改动文件数
  additions: number             // 新增行数
  deletions: number             // 删除行数
  requirements: string[]        // 关联的需求ID
  author: string                // PR作者
  prNumber: number              // PR号
  prUrl: string                 // PR链接
  mergedAt: string              // 合并时间
}

interface CRRecord {
  prNumber: number
  title: string
  author: string
  reviewer: string
  comments: number
  approvedAt?: string
  requestedChanges?: string[]
}

interface ReleaseReport {
  version: string               // 版本号
  releaseBranch: string         // 上线分支
  releaseDate: string           // 上线日期（计划）
  requirements: RequirementInfo[]
  branches: BranchInfo[]
  crRecords: CRRecord[]
  statistics: {
    totalRequirements: number
    totalBranches: number
    totalFiles: number
    totalAdditions: number
    totalDeletions: number
    approvedPRs: number
    pendingReviews: number
  }
  generatedAt: string
  generatedBy: string
}
```

### 第二步：核心Agent类

```typescript
class ReleaseReportAgent {
  private octokit: Octokit
  private owner: string
  private repo: string
  private requirementSystemAPI: string  // JIRA、禅道等API地址

  constructor(options: {
    githubToken: string
    owner: string
    repo: string
    requirementSystemAPI: string
  }) {
    this.octokit = new Octokit({ auth: options.githubToken })
    this.owner = options.owner
    this.repo = options.repo
    this.requirementSystemAPI = options.requirementSystemAPI
  }

  /**
   * 主入口：生成完整的版本报告
   */
  async generateReleaseReport(releaseBranch: string): Promise<ReleaseReport> {
    console.log(`\n🚀 开始生成上线报告: ${releaseBranch}`)

    // 1. 提取版本号
    const version = this.extractVersionFromBranch(releaseBranch)
    console.log(`📌 版本号: ${version}`)

    // 2. 获取合并的所有分支和PR
    console.log(`\n📂 第1步：获取所有合并的分支...`)
    const branches = await this.getMergedBranches(releaseBranch)
    console.log(`✅ 找到 ${branches.length} 个分支`)

    // 3. 提取需求信息
    console.log(`\n📝 第2步：提取需求信息...`)
    const requirements = await this.extractRequirements(branches)
    console.log(`✅ 找到 ${requirements.length} 个需求`)

    // 4. 收集CR记录
    console.log(`\n💬 第3步：收集CR记录...`)
    const crRecords = await this.collectCRRecords(branches)
    console.log(`✅ 收集了 ${crRecords.length} 条CR记录`)

    // 5. 计算统计信息
    console.log(`\n📊 第4步：计算统计信息...`)
    const statistics = this.calculateStatistics(branches, requirements, crRecords)

    // 6. 生成报告
    const report: ReleaseReport = {
      version,
      releaseBranch,
      releaseDate: this.getScheduledReleaseDate(),
      requirements,
      branches,
      crRecords,
      statistics,
      generatedAt: new Date().toISOString(),
      generatedBy: process.env.USER || 'Agent'
    }

    console.log(`\n✨ 报告生成完成！`)
    return report
  }

  /**
   * 第1步：获取所有合并到上线分支的分支和PR
   */
  private async getMergedBranches(releaseBranch: string): Promise<BranchInfo[]> {
    const branches: BranchInfo[] = []

    // 方法1：通过git log找到所有合并提交
    try {
      const { stdout } = await execAsync(
        `git log ${releaseBranch} --merges --format="%H %s" --reverse`,
        { cwd: process.cwd() }
      )

      const mergeCommits = stdout.trim().split('\n').filter(Boolean)

      for (const commit of mergeCommits) {
        const [hash, message] = commit.split(' ')

        // 从merge commit message中提取PR号 (如 "Merge pull request #123")
        const prMatch = message.match(/#(\d+)/)
        if (!prMatch) continue

        const prNumber = parseInt(prMatch[1])

        // 获取PR详情
        try {
          const { data: pr } = await this.octokit.pulls.get({
            owner: this.owner,
            repo: this.repo,
            pull_number: prNumber
          })

          // 获取PR中的改动统计
          const { data: comparison } = await this.octokit.repos.compareCommits({
            owner: this.owner,
            repo: this.repo,
            base: 'main',
            head: pr.head.ref
          })

          // 从PR标题或body中提取需求ID
          const requirementIds = this.extractRequirementIds(
            pr.title + '\n' + (pr.body || '')
          )

          branches.push({
            name: pr.head.ref,
            commits: pr.commits || 1,
            files: comparison.files?.length || 0,
            additions: comparison.additions || 0,
            deletions: comparison.deletions || 0,
            requirements: requirementIds,
            author: pr.user?.login || 'Unknown',
            prNumber,
            prUrl: pr.html_url,
            mergedAt: pr.merged_at || new Date().toISOString()
          })
        } catch (error) {
          console.warn(`⚠️ 无法获取PR #${prNumber}的详情`)
        }
      }
    } catch (error) {
      console.error('❌ 获取合并分支失败:', error)
    }

    return branches
  }

  /**
   * 第2步：提取需求信息
   */
  private async extractRequirements(
    branches: BranchInfo[]
  ): Promise<RequirementInfo[]> {
    const requirementMap = new Map<string, RequirementInfo>()

    // 收集所有需求ID
    const allRequirementIds = new Set<string>()
    branches.forEach(branch => {
      branch.requirements.forEach(id => allRequirementIds.add(id))
    })

    // 为每个需求ID获取详细信息
    for (const requirementId of allRequirementIds) {
      try {
        const info = await this.getRequirementInfo(requirementId)
        if (info) {
          requirementMap.set(requirementId, info)
        }
      } catch (error) {
        console.warn(`⚠️ 无法获取需求 ${requirementId} 的详情`)
        // 降级处理：如果无法获取详情，至少记录ID
        requirementMap.set(requirementId, {
          id: requirementId,
          title: '(无法获取标题)',
          status: 'Unknown',
          assignee: 'Unknown',
          link: `${this.requirementSystemAPI}/${requirementId}`
        })
      }
    }

    return Array.from(requirementMap.values())
  }

  /**
   * 从需求管理系统获取需求详情（需要根据你们的系统调整）
   */
  private async getRequirementInfo(
    requirementId: string
  ): Promise<RequirementInfo | null> {
    try {
      // 示例：调用 JIRA API
      // 需要替换为你们实际的API端点和认证方式
      const response = await axios.get(
        `${this.requirementSystemAPI}/rest/api/2/issue/${requirementId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REQUIREMENT_SYSTEM_TOKEN}`
          }
        }
      )

      const issue = response.data
      return {
        id: requirementId,
        title: issue.fields.summary,
        status: issue.fields.status.name,
        assignee: issue.fields.assignee?.displayName || 'Unassigned',
        link: `${this.requirementSystemAPI}/browse/${requirementId}`
      }
    } catch (error) {
      console.warn(`⚠️ 无法从需求系统获取 ${requirementId}:`, error)
      return null
    }
  }

  /**
   * 第3步：收集CR记录
   */
  private async collectCRRecords(branches: BranchInfo[]): Promise<CRRecord[]> {
    const records: CRRecord[] = []

    for (const branch of branches) {
      try {
        // 获取PR的详细信息（包括reviews）
        const { data: pr } = await this.octokit.pulls.get({
          owner: this.owner,
          repo: this.repo,
          pull_number: branch.prNumber
        })

        // 获取PR的所有reviews
        const { data: reviews } = await this.octokit.pulls.listReviews({
          owner: this.owner,
          repo: this.repo,
          pull_number: branch.prNumber
        })

        // 获取PR的所有comments
        const { data: comments } = await this.octokit.issues.listComments({
          owner: this.owner,
          repo: this.repo,
          issue_number: branch.prNumber
        })

        // 统计审核信息
        const approvals = reviews.filter(r => r.state === 'APPROVED')
        const requestedChanges = reviews
          .filter(r => r.state === 'CHANGES_REQUESTED')
          .map(r => r.user?.login || 'Unknown')

        records.push({
          prNumber: branch.prNumber,
          title: pr.title,
          author: branch.author,
          reviewer: approvals.map(a => a.user?.login).join(', ') || 'Pending',
          comments: comments.length,
          approvedAt: approvals[0]?.submitted_at || undefined,
          requestedChanges
        })
      } catch (error) {
        console.warn(`⚠️ 无法获取PR #${branch.prNumber}的CR记录`)
      }
    }

    return records
  }

  /**
   * 计算统计信息
   */
  private calculateStatistics(
    branches: BranchInfo[],
    requirements: RequirementInfo[],
    crRecords: CRRecord[]
  ) {
    const approvedPRs = crRecords.filter(cr => cr.approvedAt).length
    const pendingReviews = crRecords.filter(cr => !cr.approvedAt).length

    return {
      totalRequirements: requirements.length,
      totalBranches: branches.length,
      totalFiles: branches.reduce((sum, b) => sum + b.files, 0),
      totalAdditions: branches.reduce((sum, b) => sum + b.additions, 0),
      totalDeletions: branches.reduce((sum, b) => sum + b.deletions, 0),
      approvedPRs,
      pendingReviews
    }
  }

  /**
   * 从文本中提取需求ID（如 JIRA-123）
   */
  private extractRequirementIds(text: string): string[] {
    // 匹配格式：JIRA-123, TASK-456 等
    // 需要根据你们的需求系统调整正则表达式
    const regex = /([A-Z]+-\d+)/g
    const matches = text.match(regex) || []
    return [...new Set(matches)] // 去重
  }

  /**
   * 从分支名中提取版本号
   */
  private extractVersionFromBranch(branch: string): string {
    // 假设分支名格式为 release/v1.2.3 或 release/1.2.3
    const match = branch.match(/release\/v?(.+)/)
    return match ? `v${match[1]}` : branch
  }

  /**
   * 获取计划上线日期（周四晚上）
   */
  private getScheduledReleaseDate(): string {
    const now = new Date()
    const daysUntilThursday = (4 - now.getDay() + 7) % 7 || 7
    const releaseDate = new Date(now)
    releaseDate.setDate(now.getDate() + daysUntilThursday)
    releaseDate.setHours(21, 0, 0, 0) // 周四晚上9点
    return releaseDate.toISOString()
  }
}

export { ReleaseReportAgent, ReleaseReport }
```

### 第三步：报告生成和输出

```typescript
// agents/report-generator.ts

class ReportGenerator {
  /**
   * 生成Markdown格式的版本报告
   */
  static generateMarkdown(report: ReleaseReport): string {
    return `
# 📋 ${report.version} 版本上线报告

**生成时间**: ${new Date(report.generatedAt).toLocaleString('zh-CN')}
**上线分支**: \`${report.releaseBranch}\`
**计划上线时间**: ${new Date(report.releaseDate).toLocaleString('zh-CN')}

---

## 📊 版本统计

| 指标 | 数值 |
|------|------|
| 需求数 | ${report.statistics.totalRequirements} |
| 合并分支数 | ${report.statistics.totalBranches} |
| 改动文件数 | ${report.statistics.totalFiles} |
| 新增代码行 | +${report.statistics.totalAdditions} |
| 删除代码行 | -${report.statistics.totalDeletions} |
| 已审批PR | ${report.statistics.approvedPRs} ✅ |
| 待审批PR | ${report.statistics.pendingReviews} ⏳ |

---

## 📝 需求列表

${
  report.requirements.length > 0
    ? report.requirements
        .map(
          req => `
### ${req.id}: ${req.title}
- **状态**: ${req.status}
- **责任人**: ${req.assignee}
- **链接**: [查看详情](${req.link})
`
        )
        .join('\n')
    : '暂无需求信息'
}

---

## 🔀 分支合并记录

${
  report.branches.length > 0
    ? report.branches
        .map(
          branch => `
### ${branch.name}
- **作者**: ${branch.author}
- **PR**: [#${branch.prNumber}](${branch.prUrl})
- **合并时间**: ${new Date(branch.mergedAt).toLocaleString('zh-CN')}
- **改动统计**: ${branch.files} 文件, +${branch.additions} -${branch.deletions} 行
- **关联需求**: ${branch.requirements.join(', ') || '无'}
- **提交数**: ${branch.commits}
`
        )
        .join('\n')
    : '暂无分支记录'
}

---

## 💬 Code Review 记录

${
  report.crRecords.length > 0
    ? report.crRecords
        .map(
          cr => `
### PR #${cr.prNumber}: ${cr.title}

- **作者**: ${cr.author}
- **审批人**: ${cr.reviewer}
- **评论数**: ${cr.comments}
- **审批时间**: ${cr.approvedAt ? new Date(cr.approvedAt).toLocaleString('zh-CN') : '⏳ 待审批'}
${cr.requestedChanges && cr.requestedChanges.length > 0 ? `- **需要修改的地方**: ${cr.requestedChanges.join(', ')}` : ''}
`
        )
        .join('\n')
    : '暂无CR记录'
}

---

## ✅ 上线检查清单

- [ ] 所有PR已审批通过
- [ ] 所有需求已完成
- [ ] 代码改动已验证
- [ ] 性能测试通过
- [ ] 安全审计通过
- [ ] 文档已更新
- [ ] 数据库迁移已准备
- [ ] 回滚方案已准备

---

## 📌 备注

生成人: ${report.generatedBy}
生成时间: ${new Date(report.generatedAt).toLocaleString('zh-CN')}

`
  }

  /**
   * 生成HTML版本（用于邮件或文档系统）
   */
  static generateHTML(report: ReleaseReport): string {
    // 简化实现，实际可以使用 markdown-to-html 库
    return `<html>...</html>`
  }

  /**
   * 生成JSON版本（用于后续处理或存档）
   */
  static generateJSON(report: ReleaseReport): string {
    return JSON.stringify(report, null, 2)
  }
}

export { ReportGenerator }
```

### 第四步：输出和通知

```typescript
// agents/report-publisher.ts

import * as fs from 'fs/promises'
import axios from 'axios'
import { ReleaseReport } from './release-report-agent'
import { ReportGenerator } from './report-generator'

class ReportPublisher {
  /**
   * 保存报告到本地文件
   */
  static async saveToFile(
    report: ReleaseReport,
    outputDir: string = './release-reports'
  ): Promise<string> {
    await fs.mkdir(outputDir, { recursive: true })

    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `${report.version}_${timestamp}.md`
    const filepath = `${outputDir}/${filename}`

    const markdown = ReportGenerator.generateMarkdown(report)
    await fs.writeFile(filepath, markdown, 'utf-8')

    console.log(`✅ 报告已保存: ${filepath}`)
    return filepath
  }

  /**
   * 上传报告到Wiki系统（如Confluence）
   */
  static async uploadToWiki(
    report: ReleaseReport,
    confluenceConfig: {
      baseUrl: string
      spaceKey: string
      username: string
      apiToken: string
    }
  ): Promise<string> {
    try {
      const markdown = ReportGenerator.generateMarkdown(report)

      // 调用Confluence API创建页面
      const response = await axios.post(
        `${confluenceConfig.baseUrl}/rest/api/2/content`,
        {
          type: 'page',
          space: { key: confluenceConfig.spaceKey },
          title: `${report.version} 上线报告`,
          body: {
            storage: {
              value: markdown, // 实际需要转换为Confluence格式
              representation: 'storage'
            }
          }
        },
        {
          auth: {
            username: confluenceConfig.username,
            password: confluenceConfig.apiToken
          }
        }
      )

      console.log(`✅ 报告已上传到Wiki: ${response.data._links.self}`)
      return response.data._links.self
    } catch (error) {
      console.error('❌ 上传到Wiki失败:', error)
      throw error
    }
  }

  /**
   * 发送通知到Slack/钉钉
   */
  static async notifyTeam(
    report: ReleaseReport,
    notificationConfig: {
      type: 'slack' | 'dingtalk'
      webhook: string
    }
  ): Promise<void> {
    const message =
      notificationConfig.type === 'slack'
        ? this.generateSlackMessage(report)
        : this.generateDingtalkMessage(report)

    try {
      await axios.post(notificationConfig.webhook, message)
      console.log(`✅ 已通知团队`)
    } catch (error) {
      console.error('❌ 发送通知失败:', error)
    }
  }

  private static generateSlackMessage(report: ReleaseReport) {
    return {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${report.version} 版本上线报告*\n计划上线: <!date^${new Date(report.releaseDate).getTime() / 1000}^{date} {time}|${report.releaseDate}>`
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*需求数*\n${report.statistics.totalRequirements}`
            },
            {
              type: 'mrkdwn',
              text: `*分支数*\n${report.statistics.totalBranches}`
            },
            {
              type: 'mrkdwn',
              text: `*改动文件*\n${report.statistics.totalFiles}`
            },
            {
              type: 'mrkdwn',
              text: `*已审批*\n${report.statistics.approvedPRs}/${report.statistics.totalBranches}`
            }
          ]
        }
      ]
    }
  }

  private static generateDingtalkMessage(report: ReleaseReport) {
    return {
      msgtype: 'markdown',
      markdown: {
        title: `${report.version} 版本上线报告`,
        text: `
### ${report.version} 版本上线报告

**统计信息：**
- 需求数: ${report.statistics.totalRequirements}
- 分支数: ${report.statistics.totalBranches}
- 改动文件: ${report.statistics.totalFiles}
- 已审批: ${report.statistics.approvedPRs}/${report.statistics.totalBranches} ✅

**计划上线时间**: ${new Date(report.releaseDate).toLocaleString('zh-CN')}
`
      }
    }
  }
}

export { ReportPublisher }
```

### 第五步：CLI 命令和 GitHub Actions 集成

```typescript
// cli.ts - 命令行入口

import { ReleaseReportAgent } from './agents/release-report-agent'
import { ReportPublisher } from './agents/report-publisher'

async function main() {
  const releaseBranch = process.argv[2] || 'release/main'

  const agent = new ReleaseReportAgent({
    githubToken: process.env.GITHUB_TOKEN!,
    owner: process.env.GITHUB_OWNER || 'your-org',
    repo: process.env.GITHUB_REPO || 'your-repo',
    requirementSystemAPI: process.env.REQUIREMENT_SYSTEM_API || ''
  })

  // 生成报告
  const report = await agent.generateReleaseReport(releaseBranch)

  // 保存到文件
  await ReportPublisher.saveToFile(report)

  // 上传到Wiki（可选）
  if (process.env.CONFLUENCE_TOKEN) {
    await ReportPublisher.uploadToWiki(report, {
      baseUrl: process.env.CONFLUENCE_URL!,
      spaceKey: process.env.CONFLUENCE_SPACE!,
      username: process.env.CONFLUENCE_USER!,
      apiToken: process.env.CONFLUENCE_TOKEN
    })
  }

  // 发送Slack通知（可选）
  if (process.env.SLACK_WEBHOOK) {
    await ReportPublisher.notifyTeam(report, {
      type: 'slack',
      webhook: process.env.SLACK_WEBHOOK
    })
  }

  console.log('\n✨ 报告生成完成！')
}

main().catch(err => {
  console.error('❌ 错误:', err)
  process.exit(1)
})
```

```yaml
# .github/workflows/generate-release-report.yml
# 周四中午CR时自动执行

name: 生成上线报告

on:
  workflow_dispatch:  # 允许手动触发
    inputs:
      release_branch:
        description: '上线分支'
        required: true
        default: 'release/main'

jobs:
  generate-report:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # 获取完整的git历史

      - name: 设置 Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: 安装依赖
        run: npm install

      - name: 生成上线报告
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITHUB_OWNER: ${{ github.repository_owner }}
          GITHUB_REPO: ${{ github.event.repository.name }}
          REQUIREMENT_SYSTEM_API: ${{ secrets.REQUIREMENT_SYSTEM_API }}
          REQUIREMENT_SYSTEM_TOKEN: ${{ secrets.REQUIREMENT_SYSTEM_TOKEN }}
          CONFLUENCE_URL: ${{ secrets.CONFLUENCE_URL }}
          CONFLUENCE_SPACE: ${{ secrets.CONFLUENCE_SPACE }}
          CONFLUENCE_USER: ${{ secrets.CONFLUENCE_USER }}
          CONFLUENCE_TOKEN: ${{ secrets.CONFLUENCE_TOKEN }}
          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
        run: npm run generate-report -- ${{ github.event.inputs.release_branch }}

      - name: 上传报告
        uses: actions/upload-artifact@v3
        with:
          name: release-reports
          path: release-reports/
          retention-days: 365
```

---

## 🎯 使用方式

### 方式1：手动触发（最简单）

```bash
# 本地运行
npx ts-node cli.ts release/v1.2.3

# 或通过npm script
npm run generate-report -- release/v1.2.3
```

### 方式2：自动触发（GitHub Actions）

1. 在GitHub项目中进入 Actions 标签
2. 选择 "生成上线报告" workflow
3. 点击 "Run workflow"
4. 输入上线分支名（如 `release/v1.2.3`）
5. 点击运行

### 方式3：定时触发

```yaml
# 周四中午12:00 自动生成
on:
  schedule:
    - cron: '0 12 * * 4'  # 周四中午12:00
```

---

## 📋 输出示例

生成的报告会包含：

```
📋 v1.2.3 版本上线报告

📊 版本统计
├─ 需求数: 8
├─ 合并分支数: 12
├─ 改动文件数: 45
├─ 新增代码行: +2,340
├─ 删除代码行: -1,200
├─ 已审批PR: 10 ✅
└─ 待审批PR: 2 ⏳

📝 需求列表
├─ JIRA-1234: 用户认证功能
├─ JIRA-1235: 性能优化
└─ ...

🔀 分支合并记录
├─ feat/auth (author, #123, +500 -100)
├─ perf/optimize (author, #124, +300 -200)
└─ ...

💬 Code Review 记录
├─ #123: 用户认证 (已审批, 2024-01-10)
├─ #124: 性能优化 (待审批)
└─ ...
```

---

## 🔧 配置说明

### 必需的环境变量

```bash
# GitHub
GITHUB_TOKEN=xxx                    # GitHub personal access token

# 需求管理系统（JIRA为例）
REQUIREMENT_SYSTEM_API=https://jira.example.com
REQUIREMENT_SYSTEM_TOKEN=xxx        # JIRA API token

# 可选：Wiki系统（Confluence）
CONFLUENCE_URL=https://confluence.example.com
CONFLUENCE_SPACE=DEV
CONFLUENCE_USER=xxx
CONFLUENCE_TOKEN=xxx

# 可选：消息通知
SLACK_WEBHOOK=https://hooks.slack.com/...
DINGTALK_WEBHOOK=https://oapi.dingtalk.com/...
```

### package.json 配置

```json
{
  "scripts": {
    "generate-report": "ts-node cli.ts"
  },
  "dependencies": {
    "@octokit/rest": "^19.0.0",
    "axios": "^1.6.0"
  }
}
```

---

## 💡 定制建议

这个Agent可以进一步定制以满足你的具体需求：

### 1. **需求系统集成**
目前代码假设使用JIRA，可以调整为：
- 禅道
- 飞书任务
- GitHub Issues
- 其他系统

只需修改 `getRequirementInfo()` 方法

### 2. **自定义需求ID格式**
如果你的需求号格式不同（如 `TASK-123` 或 `F-123`），修改 `extractRequirementIds()` 方法的正则表达式

### 3. **添加更多统计维度**
比如：
- 按模块统计改动
- 按开发者统计代码量
- 风险等级评估
- 性能影响分析

### 4. **生成更详细的报告**
比如：
- 添加"待改进项"统计
- 添加"重点关注"列表
- 添加"历史对比"（与上个版本对比）

---

## ✅ 总结

这个Agent会为你节省：
- ⏰ **手工整理时间** - 从30分钟 → 2分钟（自动生成）
- 📝 **手工错误** - 100% 自动化，零遗漏
- 🔄 **重复劳动** - 每个版本都能快速生成
- 📊 **数据准确性** - 直接从系统拉取，数据真实

现在你可以：
- 周四上午：拉分支、合并代码
- 周四中午：运行这个Agent → 自动生成完整报告
- 周四中午：开始CR（参考自动生成的报告）
- 周四下午：发测试
- 周四晚上：上线

---

**需要我调整什么吗？比如**：
- 你的需求系统是什么？（JIRA/禅道/其他）
- 需求号的格式是什么？
- 是否需要特定的统计维度？
- 是否需要和其他系统集成？
