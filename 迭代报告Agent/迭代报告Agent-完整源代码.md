# 📁 迭代报告Agent - 完整源代码

> 所有源文件，可直接复制使用

---

## 文件 1: adapters/vcs-adapter.ts

```typescript
// adapters/vcs-adapter.ts
// VCS 适配器 - 支持 GitLab 和 Bitbucket

import axios from 'axios'

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

export interface VCSConfig {
  type: 'gitlab' | 'bitbucket'
  baseUrl: string
  token: string
  projectId?: string  // GitLab
  workspace?: string  // Bitbucket
  repoSlug?: string   // Bitbucket
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

---

## 文件 2: agents/release-report-agent.ts

```typescript
// agents/release-report-agent.ts
// 核心 Agent 逻辑

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
          (pr, index) => \`
### \${index + 1}. PR #\${pr.number}: \${pr.title}

- **作者**: \${pr.author}
- **分支**: \\\`\${pr.branch}\\\`
- **链接**: [查看PR](\${pr.url})
- **合并时间**: \${new Date(pr.mergedAt).toLocaleString('zh-CN')}
- **改动统计**:
  - 📄 文件: \${pr.files}
  - ➕ 新增: +\${pr.additions}
  - ➖ 删除: -\${pr.deletions}
\${pr.description ? \`- **描述**: \${pr.description.substring(0, 100)}...\` : ''}
\`
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

**报告生成时间**: \${new Date(report.generatedAt).toLocaleString('zh-CN')}
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
    const filename = \`\${report.version}_\${timestamp}.md\`
    const filepath = path.join(outputDir, filename)

    const markdown = this.generateMarkdown(report)
    await fs.writeFile(filepath, markdown, 'utf-8')

    console.log(\`\n✅ 报告已保存: \${filepath}\`)
    return filepath
  }

  /**
   * 从分支名提取版本号
   */
  private extractVersion(branch: string): string {
    // 匹配 release/v1.2.3 或 release/1.2.3
    const match = branch.match(/release\/v?(.+)/)
    if (match) {
      return \`v\${match[1]}\`
    }
    return branch
  }
}
```

---

## 文件 3: cli.ts

```typescript
// cli.ts
// 命令行入口

import 'dotenv/config'
import { ReleaseReportAgent } from './agents/release-report-agent'

async function main() {
  const args = process.argv.slice(2)

  // 解析命令行参数（简单实现）
  const releaseBranch = args[0] || process.env.RELEASE_BRANCH || 'release/main'
  const baseBranch = process.env.BASE_BRANCH || 'main'

  // 验证必需的环境变量
  const vcsType = process.env.VCS_TYPE
  const baseUrl = process.env.VCS_BASE_URL
  const token = process.env.GITLAB_TOKEN || process.env.BITBUCKET_TOKEN

  if (!vcsType || !baseUrl || !token) {
    console.error('❌ 缺少必需的环境变量')
    console.error('   需要: VCS_TYPE, VCS_BASE_URL, 和相应的 Token')
    console.error('')
    console.error('请检查 .env 文件是否正确配置')
    process.exit(1)
  }

  const agent = new ReleaseReportAgent()

  // 根据VCS类型配置
  const vcsConfig: any = {
    type: vcsType as 'gitlab' | 'bitbucket',
    baseUrl,
    token
  }

  if (vcsType === 'gitlab') {
    vcsConfig.projectId = process.env.GITLAB_PROJECT_ID
    if (!vcsConfig.projectId) {
      console.error('❌ GitLab 模式需要 GITLAB_PROJECT_ID')
      process.exit(1)
    }
  } else if (vcsType === 'bitbucket') {
    vcsConfig.workspace = process.env.BITBUCKET_WORKSPACE
    vcsConfig.repoSlug = process.env.BITBUCKET_REPO_SLUG
    if (!vcsConfig.workspace || !vcsConfig.repoSlug) {
      console.error('❌ Bitbucket 模式需要 BITBUCKET_WORKSPACE 和 BITBUCKET_REPO_SLUG')
      process.exit(1)
    }
  }

  agent.registerAdapter('vcs', vcsConfig)

  try {
    const report = await agent.generateFromSingleVCS(
      'vcs',
      releaseBranch,
      baseBranch
    )

    await agent.saveReport(report)

    console.log(\`\n📊 报告统计:\`)
    console.log(\`  - PR数: \${report.totalPRs}\`)
    console.log(\`  - 文件: \${report.totalFiles}\`)
    console.log(\`  - 新增: +\${report.totalAdditions}\`)
    console.log(\`  - 删除: -\${report.totalDeletions}\`)
  } catch (error) {
    console.error('❌ 错误:', error)
    process.exit(1)
  }
}

main()
```

---

## 说明

### 如何使用这些文件

1. **创建目录结构**
   ```bash
   mkdir -p release-report-agent/{adapters,agents,release-reports}
   ```

2. **创建文件**
   ```bash
   # 复制上面的代码到对应文件
   touch release-report-agent/adapters/vcs-adapter.ts
   touch release-report-agent/agents/release-report-agent.ts
   touch release-report-agent/cli.ts
   touch release-report-agent/package.json
   touch release-report-agent/tsconfig.json
   touch release-report-agent/.env
   touch release-report-agent/.env.example
   touch release-report-agent/.gitignore
   ```

3. **从其他文档复制**
   - `package.json` → 见 《项目初始化包.md》
   - `tsconfig.json` → 见 《项目初始化包.md》
   - `.env.example` → 见 《项目初始化包.md》
   - `.gitignore` → 见 《项目初始化包.md》

4. **安装依赖**
   ```bash
   cd release-report-agent
   npm install axios dotenv
   npm install --save-dev @types/node ts-node typescript
   ```

5. **配置和运行**
   ```bash
   cp .env.example .env
   # 编辑 .env 文件，填入你的配置
   npm run dev -- release/main
   ```

---

