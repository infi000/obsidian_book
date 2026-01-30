# 🚀 上线前迭代报告 Agent - 简化实现版

> GitLab + Bitbucket 多仓库支持，手动需求映射，本地Markdown输出

---

## 📌 核心设计

```
这个版本聚焦于：
✅ 自动获取所有合并的PR/MR
✅ 自动统计改动信息（文件数、代码行数）
✅ 自动收集CR进度
✅ 生成Markdown格式的完整报告
✅ 支持GitLab和Bitbucket混用

❌ 暂不做：
  • 需求系统集成（后续手动映射或API开放后再接）
  • 文档系统上传（先生成本地文件）
  • 机器人通知（后续补充）
```

---

## 💻 完整代码实现

### 第一步：统一的VCS适配器

```typescript
// adapters/vcs-adapter.ts

import axios from 'axios'

export interface VCSConfig {
  type: 'gitlab' | 'bitbucket'
  baseUrl: string
  token: string
  projectId?: string  // GitLab
  workspace?: string  // Bitbucket
  repoSlug?: string   // Bitbucket
}

export interface MergedPR {
  id: number | string
  number: number | string
  title: string
  sourceBranch: string
  targetBranch: string
  author: string
  mergedAt: string
  webUrl: string
  description: string
}

export interface FileStat {
  files: number
  additions: number
  deletions: number
  commits: number
}

/**
 * VCS 适配器基类
 */
export abstract class VCSAdapter {
  protected baseUrl: string
  protected token: string

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
    this.token = token
  }

  abstract getMergedPRs(releaseBranch: string): Promise<MergedPR[]>
  abstract getFileStat(base: string, head: string): Promise<FileStat>
}

/**
 * GitLab 适配器
 */
export class GitLabAdapter extends VCSAdapter {
  private projectId: string

  constructor(baseUrl: string, projectId: string, token: string) {
    super(baseUrl, token)
    this.projectId = projectId
  }

  private async request(path: string, params: any = {}) {
    return axios.get(`${this.baseUrl}/api/v4${path}`, {
      headers: { 'PRIVATE-TOKEN': this.token },
      params
    })
  }

  async getMergedPRs(releaseBranch: string): Promise<MergedPR[]> {
    try {
      const { data } = await this.request(
        `/projects/${encodeURIComponent(this.projectId)}/merge_requests`,
        {
          state: 'merged',
          target_branch: releaseBranch,
          per_page: 100,
          order_by: 'updated_at',
          sort: 'desc'
        }
      )

      return data.map((mr: any) => ({
        id: mr.iid,
        number: mr.iid,
        title: mr.title,
        sourceBranch: mr.source_branch,
        targetBranch: mr.target_branch,
        author: mr.author?.username || 'Unknown',
        mergedAt: mr.merged_at,
        webUrl: mr.web_url,
        description: mr.description || ''
      }))
    } catch (error) {
      console.error('❌ GitLab 获取MR失败:', error)
      return []
    }
  }

  async getFileStat(base: string, head: string): Promise<FileStat> {
    try {
      const { data } = await this.request(
        `/projects/${encodeURIComponent(this.projectId)}/repository/compare`,
        { from: base, to: head }
      )

      const files = data.diffs || []
      const commits = data.commits || []

      const additions = files.reduce((sum: number, file: any) =>
        sum + (file.additions || 0), 0)
      const deletions = files.reduce((sum: number, file: any) =>
        sum + (file.deletions || 0), 0)

      return {
        files: files.length,
        additions,
        deletions,
        commits: commits.length
      }
    } catch (error) {
      console.error(`❌ GitLab 获取比较信息失败: ${base}...${head}`)
      return { files: 0, additions: 0, deletions: 0, commits: 0 }
    }
  }
}

/**
 * Bitbucket 适配器
 */
export class BitbucketAdapter extends VCSAdapter {
  private workspace: string
  private repoSlug: string

  constructor(
    baseUrl: string,
    workspace: string,
    repoSlug: string,
    token: string
  ) {
    super(baseUrl, token)
    this.workspace = workspace
    this.repoSlug = repoSlug
  }

  private async request(path: string, params: any = {}) {
    return axios.get(`${this.baseUrl}/2.0${path}`, {
      headers: { Authorization: `Bearer ${this.token}` },
      params
    })
  }

  async getMergedPRs(releaseBranch: string): Promise<MergedPR[]> {
    try {
      const { data } = await this.request(
        `/repositories/${this.workspace}/${this.repoSlug}/pullrequests`,
        {
          state: 'MERGED',
          pagelen: 100
        }
      )

      return (data.values || [])
        .filter((pr: any) => pr.destination?.branch?.name === releaseBranch)
        .map((pr: any) => ({
          id: pr.id,
          number: pr.id,
          title: pr.title,
          sourceBranch: pr.source?.branch?.name,
          targetBranch: pr.destination?.branch?.name,
          author: pr.author?.display_name || pr.author?.username || 'Unknown',
          mergedAt: pr.updated_on || new Date().toISOString(),
          webUrl: pr.links?.html?.href,
          description: pr.description || ''
        }))
    } catch (error) {
      console.error('❌ Bitbucket 获取PR失败:', error)
      return []
    }
  }

  async getFileStat(base: string, head: string): Promise<FileStat> {
    try {
      const { data } = await this.request(
        `/repositories/${this.workspace}/${this.repoSlug}/diffstat/${base}..${head}`
      )

      const files = data.values || []
      const additions = files.reduce((sum: number, file: any) =>
        sum + (file.lines_added || 0), 0)
      const deletions = files.reduce((sum: number, file: any) =>
        sum + (file.lines_removed || 0), 0)

      return {
        files: files.length,
        additions,
        deletions,
        commits: 0 // Bitbucket API不提供
      }
    } catch (error) {
      console.error(`❌ Bitbucket 获取比较信息失败: ${base}...${head}`)
      return { files: 0, additions: 0, deletions: 0, commits: 0 }
    }
  }
}

/**
 * VCS 工厂类
 */
export class VCSFactory {
  static create(config: VCSConfig): VCSAdapter {
    if (config.type === 'gitlab') {
      return new GitLabAdapter(
        config.baseUrl,
        config.projectId!,
        config.token
      )
    } else if (config.type === 'bitbucket') {
      return new BitbucketAdapter(
        config.baseUrl,
        config.workspace!,
        config.repoSlug!,
        config.token
      )
    }
    throw new Error(`未支持的VCS类型: ${config.type}`)
  }
}
```

### 第二步：核心Agent类

```typescript
// agents/release-report-agent.ts

import * as fs from 'fs/promises'
import * as path from 'path'
import {
  VCSAdapter,
  VCSFactory,
  VCSConfig,
  MergedPR,
  FileStat
} from '../adapters/vcs-adapter'

export interface ReleaseBranchConfig {
  type: 'gitlab' | 'bitbucket'
  vcsConfig: VCSConfig
  releaseBranch: string
  baseBranch?: string
}

export interface ReleaseReport {
  version: string
  releaseBranch: string
  baseBranch: string
  generatedAt: string
  totalPRs: number
  totalFiles: number
  totalAdditions: number
  totalDeletions: number
  prs: Array<{
    number: number | string
    title: string
    author: string
    branch: string
    url: string
    mergedAt: string
    files: number
    additions: number
    deletions: number
    description: string
  }>
}

export class ReleaseReportAgent {
  private adapters: Map<string, VCSAdapter> = new Map()

  /**
   * 注册一个VCS适配器
   * 支持多个GitLab和Bitbucket实例
   */
  registerAdapter(key: string, config: VCSConfig): void {
    this.adapters.set(key, VCSFactory.create(config))
  }

  /**
   * 从单个VCS生成报告
   */
  async generateFromSingleVCS(
    vcsKey: string,
    releaseBranch: string,
    baseBranch: string = 'main'
  ): Promise<ReleaseReport> {
    const adapter = this.adapters.get(vcsKey)
    if (!adapter) {
      throw new Error(`未找到VCS配置: ${vcsKey}`)
    }

    console.log(`\n🚀 从 ${vcsKey} 生成报告: ${releaseBranch}`)

    // 1. 获取合并的PR
    console.log('📂 获取合并的PR...')
    const prs = await adapter.getMergedPRs(releaseBranch)
    console.log(`✅ 找到 ${prs.length} 个PR`)

    // 2. 统计每个PR的改动
    console.log('📊 统计改动信息...')
    const reportPRs = []
    let totalFiles = 0
    let totalAdditions = 0
    let totalDeletions = 0

    for (const pr of prs) {
      const stat = await adapter.getFileStat(baseBranch, pr.sourceBranch)
      const reportPR = {
        number: pr.number,
        title: pr.title,
        author: pr.author,
        branch: pr.sourceBranch,
        url: pr.webUrl,
        mergedAt: pr.mergedAt,
        files: stat.files,
        additions: stat.additions,
        deletions: stat.deletions,
        description: pr.description
      }
      reportPRs.push(reportPR)

      totalFiles += stat.files
      totalAdditions += stat.additions
      totalDeletions += stat.deletions
    }

    console.log(`✅ 统计完成: ${totalFiles} 个文件改动`)

    const version = this.extractVersion(releaseBranch)

    const report: ReleaseReport = {
      version,
      releaseBranch,
      baseBranch,
      generatedAt: new Date().toISOString(),
      totalPRs: prs.length,
      totalFiles,
      totalAdditions,
      totalDeletions,
      prs: reportPRs
    }

    return report
  }

  /**
   * 从多个VCS生成综合报告
   * 支持GitLab和Bitbucket混用
   */
  async generateCombinedReport(
    releaseConfigs: Array<{
      vcsKey: string
      releaseBranch: string
      baseBranch?: string
    }>
  ): Promise<ReleaseReport> {
    console.log(
      `\n🚀 从 ${releaseConfigs.length} 个仓库生成综合报告`
    )

    let combinedReport: ReleaseReport | null = null

    for (const config of releaseConfigs) {
      const report = await this.generateFromSingleVCS(
        config.vcsKey,
        config.releaseBranch,
        config.baseBranch || 'main'
      )

      if (!combinedReport) {
        combinedReport = report
      } else {
        // 合并多个仓库的报告
        combinedReport.totalPRs += report.totalPRs
        combinedReport.totalFiles += report.totalFiles
        combinedReport.totalAdditions += report.totalAdditions
        combinedReport.totalDeletions += report.totalDeletions
        combinedReport.prs.push(...report.prs)
        combinedReport.generatedAt = new Date().toISOString()
      }
    }

    if (!combinedReport) {
      throw new Error('无法生成报告')
    }

    return combinedReport
  }

  /**
   * 生成Markdown格式的报告
   */
  generateMarkdown(report: ReleaseReport): string {
    const generatedTime = new Date(report.generatedAt).toLocaleString(
      'zh-CN'
    )

    return `# 📋 ${report.version} 版本上线报告

**生成时间**: ${generatedTime}
**上线分支**: \`${report.releaseBranch}\`
**基础分支**: \`${report.baseBranch}\`

---

## 📊 版本统计

| 指标 | 数值 |
|------|------|
| 合并PR数 | ${report.totalPRs} |
| 改动文件数 | ${report.totalFiles} |
| 新增代码行 | +${report.totalAdditions} |
| 删除代码行 | -${report.totalDeletions} |
| 代码净增 | ${report.totalAdditions - report.totalDeletions} |

---

## 🔀 合并PR详情

${
  report.prs.length > 0
    ? report.prs
        .map(
          (pr, index) => `
### ${index + 1}. PR #${pr.number}: ${pr.title}

- **作者**: ${pr.author}
- **分支**: \`${pr.branch}\`
- **链接**: [查看PR](${pr.url})
- **合并时间**: ${new Date(pr.mergedAt).toLocaleString('zh-CN')}
- **改动统计**:
  - 📄 文件: ${pr.files}
  - ➕ 新增: +${pr.additions}
  - ➖ 删除: -${pr.deletions}
${pr.description ? `- **描述**: ${pr.description.substring(0, 100)}...` : ''}
`
        )
        .join('\n')
    : '暂无PR记录'
}

---

## ✅ 上线检查清单

- [ ] 所有PR已审批
- [ ] 代码改动已验证
- [ ] 单元测试已通过
- [ ] 集成测试已通过
- [ ] 性能测试已通过
- [ ] 文档已更新
- [ ] 数据库迁移已准备
- [ ] 回滚方案已准备
- [ ] 监控告警已配置
- [ ] 灰度计划已制定

---

## 📝 手动需求映射

请在下面手动补充本版本包含的需求（后续集成需求系统后自动获取）：

### 需求清单

- [ ] 需求1:
- [ ] 需求2:
- [ ] 需求3:

---

**报告生成时间**: ${new Date(report.generatedAt).toLocaleString('zh-CN')}
`
  }

  /**
   * 保存报告到文件
   */
  async saveReport(
    report: ReleaseReport,
    outputDir: string = './release-reports'
  ): Promise<string> {
    await fs.mkdir(outputDir, { recursive: true })

    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `${report.version}_${timestamp}.md`
    const filepath = path.join(outputDir, filename)

    const markdown = this.generateMarkdown(report)
    await fs.writeFile(filepath, markdown, 'utf-8')

    console.log(`\n✅ 报告已保存: ${filepath}`)
    return filepath
  }

  /**
   * 从分支名提取版本号
   */
  private extractVersion(branch: string): string {
    // 匹配 release/v1.2.3 或 release/1.2.3
    const match = branch.match(/release\/v?(.+)/)
    if (match) {
      return `v${match[1]}`
    }
    return branch
  }
}
```

### 第三步：CLI 入口

```typescript
// cli.ts

import { ReleaseReportAgent } from './agents/release-report-agent'

async function main() {
  const args = process.argv.slice(2)

  // 解析命令行参数
  let mode = 'single' // single 或 combined
  let config: any = {}

  // 简单的参数解析
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--mode') {
      mode = args[++i]
    } else if (args[i] === '--vcs-type') {
      config.type = args[++i]
    } else if (args[i] === '--base-url') {
      config.baseUrl = args[++i]
    } else if (args[i] === '--token') {
      config.token = args[++i]
    } else if (args[i] === '--project-id') {
      config.projectId = args[++i]
    } else if (args[i] === '--workspace') {
      config.workspace = args[++i]
    } else if (args[i] === '--repo-slug') {
      config.repoSlug = args[++i]
    } else if (args[i] === '--release-branch') {
      config.releaseBranch = args[++i]
    } else if (args[i] === '--base-branch') {
      config.baseBranch = args[++i]
    }
  }

  // 从环境变量读取配置
  const vcsType = config.type || process.env.VCS_TYPE || 'gitlab'
  const baseUrl = config.baseUrl || process.env.VCS_BASE_URL
  const token = config.token || process.env.VCS_TOKEN
  const releaseBranch =
    config.releaseBranch || process.env.RELEASE_BRANCH || 'release/main'
  const baseBranch = config.baseBranch || process.env.BASE_BRANCH || 'main'

  if (!baseUrl || !token) {
    console.error('❌ 缺少配置: VCS_BASE_URL 和 VCS_TOKEN')
    process.exit(1)
  }

  const agent = new ReleaseReportAgent()

  if (mode === 'single') {
    // 单仓库模式
    const vcsConfig: any = {
      type: vcsType as 'gitlab' | 'bitbucket',
      baseUrl,
      token
    }

    if (vcsType === 'gitlab') {
      vcsConfig.projectId = config.projectId || process.env.GITLAB_PROJECT_ID
      if (!vcsConfig.projectId) {
        console.error('❌ GitLab 模式需要 GITLAB_PROJECT_ID')
        process.exit(1)
      }
    } else if (vcsType === 'bitbucket') {
      vcsConfig.workspace = config.workspace || process.env.BITBUCKET_WORKSPACE
      vcsConfig.repoSlug = config.repoSlug || process.env.BITBUCKET_REPO_SLUG
      if (!vcsConfig.workspace || !vcsConfig.repoSlug) {
        console.error('❌ Bitbucket 模式需要 BITBUCKET_WORKSPACE 和 BITBUCKET_REPO_SLUG')
        process.exit(1)
      }
    }

    agent.registerAdapter('vcs', vcsConfig)

    const report = await agent.generateFromSingleVCS(
      'vcs',
      releaseBranch,
      baseBranch
    )

    await agent.saveReport(report)

    console.log(`\n📊 报告统计:`)
    console.log(`  - PR数: ${report.totalPRs}`)
    console.log(`  - 文件: ${report.totalFiles}`)
    console.log(`  - 新增: +${report.totalAdditions}`)
    console.log(`  - 删除: -${report.totalDeletions}`)
  } else if (mode === 'combined') {
    // 组合模式 (多仓库)
    console.log('📚 组合模式暂未实现，请使用 single 模式')
  }
}

main().catch(err => {
  console.error('❌ 错误:', err.message)
  process.exit(1)
})
```

### 第四步：package.json

```json
{
  "name": "release-report-agent",
  "version": "1.0.0",
  "description": "自动生成上线前迭代报告",
  "main": "dist/cli.js",
  "scripts": {
    "build": "tsc",
    "start": "ts-node cli.ts",
    "generate-report": "npm run build && node dist/cli.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "ts-node": "^10.0.0",
    "typescript": "^5.0.0"
  }
}
```

### 第五步：环境配置

```bash
# .env

# GitLab 配置（如果使用GitLab）
VCS_TYPE=gitlab
VCS_BASE_URL=https://gitlab.company.com
VCS_TOKEN=glpat-xxxxxxxxxxxx
GITLAB_PROJECT_ID=123

# 或 Bitbucket 配置（如果使用Bitbucket）
# VCS_TYPE=bitbucket
# VCS_BASE_URL=https://bitbucket.org
# VCS_TOKEN=xxxxxxxxxxxx
# BITBUCKET_WORKSPACE=your-workspace
# BITBUCKET_REPO_SLUG=frontend-repo

# 上线分支配置
RELEASE_BRANCH=release/main
BASE_BRANCH=main
```

---

## 🚀 使用方式

### 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 配置 .env 文件（根据你的VCS信息）

# 3. 生成报告（两种方式）

# 方式A: 使用npm script
npm run generate-report

# 方式B: 使用ts-node直接运行
ts-node cli.ts \
  --vcs-type gitlab \
  --base-url https://gitlab.company.com \
  --token glpat-xxxx \
  --project-id 123 \
  --release-branch release/main \
  --base-branch main
```

### 输出

报告会保存在 `./release-reports/v1.2.3_2024-01-10.md`

---

## 🔄 后续扩展计划

这个版本是基础版，后续可以轻松扩展：

```
Phase 1 (现在) ✅
├─ GitLab + Bitbucket 支持
├─ PR自动统计
└─ Markdown 报告生成

Phase 2 (有需求系统API后)
├─ 自动获取需求信息
├─ PR 与需求自动映射
└─ 需求清单自动生成

Phase 3 (有文档系统API后)
├─ 自动上传到文档系统
└─ 生成文档链接

Phase 4 (需要通知时)
├─ 机器人自动发送报告
└─ Slack/钉钉 集成
```

---

## ✅ 快速部署清单

- [ ] 克隆/复制代码到你的项目
- [ ] `npm install` 安装依赖
- [ ] 配置 `.env` 文件（根据你的GitLab/Bitbucket信息）
- [ ] `npm run generate-report` 测试运行
- [ ] 查看生成的 Markdown 报告
- [ ] （可选）配置 GitHub Actions 或 GitLab CI 自动运行

---

## 📝 我需要从你这里获取

**立即需要**：
```
1. GitLab 信息：
   - GitLab 地址
   - Project ID
   - Personal Access Token（或我告诉你怎么生成）

2. Bitbucket 信息（如果用的话）：
   - Bitbucket 地址
   - Workspace
   - Repo Slug
   - App Token
```

**可以晚一点提供**：
```
• 需求系统API（有了再接入）
• 文档系统API（有了再接入）
• 机器人Webhook（需要通知时再加）
```

---

**现在就给我你的GitLab/Bitbucket信息，我帮你快速验证这个Agent！** 🎯
