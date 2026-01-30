# 🚀 上线前迭代报告Agent - 定制实现方案

> 支持自建需求系统、GitLab + Bitbucket、腾讯文档、自建机器人通知

---

## 🎯 针对你的定制

你的技术栈：
- ✅ **需求系统**：自建（直接用需求名）
- ✅ **代码仓库**：GitLab + Bitbucket 混用
- ✅ **文档系统**：腾讯文档（可配置自建）
- ✅ **通知方式**：自建机器人（群里发布）

---

## 💻 定制实现方案

### 第一步：多仓库适配（GitLab + Bitbucket）

```typescript
// adapters/vcs-adapter.ts
// 统一的版本控制系统适配层

import axios from 'axios'

/**
 * 版本控制系统适配器接口
 */
interface VCSAdapter {
  getMergedPRs(releaseBranch: string): Promise<any[]>
  getPRDetails(prNumber: number | string): Promise<any>
  getCompareStat(base: string, head: string): Promise<any>
  listPRComments(prNumber: number | string): Promise<any[]>
  listPRReviews(prNumber: number | string): Promise<any[]>
}

/**
 * GitLab 适配器
 */
class GitLabAdapter implements VCSAdapter {
  private baseUrl: string
  private projectId: string
  private token: string

  constructor(baseUrl: string, projectId: string, token: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
    this.projectId = projectId
    this.token = token
  }

  private async request(path: string, options: any = {}) {
    return axios.get(`${this.baseUrl}/api/v4${path}`, {
      headers: {
        'PRIVATE-TOKEN': this.token
      },
      ...options
    })
  }

  async getMergedPRs(releaseBranch: string) {
    // 获取所有已合并到发布分支的MR
    const { data: mergeRequests } = await this.request(
      `/projects/${encodeURIComponent(this.projectId)}/merge_requests`,
      {
        params: {
          state: 'merged',
          target_branch: releaseBranch,
          per_page: 100,
          order_by: 'updated_at',
          sort: 'desc'
        }
      }
    )

    return mergeRequests
  }

  async getPRDetails(mrId: number | string) {
    const { data } = await this.request(
      `/projects/${encodeURIComponent(this.projectId)}/merge_requests/${mrId}`
    )
    return data
  }

  async getCompareStat(base: string, head: string) {
    // GitLab 的对比API
    const { data } = await this.request(
      `/projects/${encodeURIComponent(this.projectId)}/repository/compare`,
      {
        params: { from: base, to: head }
      }
    )
    return {
      files: data.diffs?.length || 0,
      additions: data.diffs?.reduce((sum: number, diff: any) =>
        sum + (diff.additions || 0), 0) || 0,
      deletions: data.diffs?.reduce((sum: number, diff: any) =>
        sum + (diff.deletions || 0), 0) || 0,
      commits: data.commits?.length || 0
    }
  }

  async listPRComments(mrId: number | string) {
    const { data } = await this.request(
      `/projects/${encodeURIComponent(this.projectId)}/merge_requests/${mrId}/notes`,
      {
        params: { per_page: 100 }
      }
    )
    return data
  }

  async listPRReviews(mrId: number | string) {
    // GitLab 中叫 Approvals
    const { data: mr } = await this.request(
      `/projects/${encodeURIComponent(this.projectId)}/merge_requests/${mrId}`
    )

    return (mr.approvals?.approved_by || []).map((approver: any) => ({
      state: 'APPROVED',
      user: { login: approver.user.username },
      submitted_at: mr.merged_at
    }))
  }
}

/**
 * Bitbucket 适配器
 */
class BitbucketAdapter implements VCSAdapter {
  private baseUrl: string
  private workspace: string
  private repoSlug: string
  private token: string

  constructor(
    baseUrl: string,
    workspace: string,
    repoSlug: string,
    token: string
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
    this.workspace = workspace
    this.repoSlug = repoSlug
    this.token = token
  }

  private async request(path: string, options: any = {}) {
    return axios.get(`${this.baseUrl}/2.0${path}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      ...options
    })
  }

  async getMergedPRs(releaseBranch: string) {
    // 获取所有已合并的PullRequest
    const { data } = await this.request(
      `/repositories/${this.workspace}/${this.repoSlug}/pullrequests`,
      {
        params: {
          state: 'MERGED',
          destination_branch: releaseBranch,
          pagelen: 100
        }
      }
    )

    return data.values || []
  }

  async getPRDetails(prId: number | string) {
    const { data } = await this.request(
      `/repositories/${this.workspace}/${this.repoSlug}/pullrequests/${prId}`
    )
    return data
  }

  async getCompareStat(base: string, head: string) {
    // Bitbucket 的对比API
    const { data } = await this.request(
      `/repositories/${this.workspace}/${this.repoSlug}/diffstat/${base}..${head}`
    )

    const files = data.values || []
    return {
      files: files.length,
      additions: files.reduce((sum: number, file: any) =>
        sum + (file.lines_added || 0), 0),
      deletions: files.reduce((sum: number, file: any) =>
        sum + (file.lines_removed || 0), 0),
      commits: 0 // Bitbucket 这个API没有commit数
    }
  }

  async listPRComments(prId: number | string) {
    const { data } = await this.request(
      `/repositories/${this.workspace}/${this.repoSlug}/pullrequests/${prId}/comments`,
      {
        params: { pagelen: 100 }
      }
    )
    return data.values || []
  }

  async listPRReviews(prId: number | string) {
    // 获取PR详情，其中包含reviewers信息
    const { data } = await this.request(
      `/repositories/${this.workspace}/${this.repoSlug}/pullrequests/${prId}`
    )

    return (data.reviewers || [])
      .filter((reviewer: any) => reviewer.approved)
      .map((reviewer: any) => ({
        state: 'APPROVED',
        user: { login: reviewer.username },
        submitted_at: new Date().toISOString()
      }))
  }
}

/**
 * VCS 工厂类 - 支持多种仓库
 */
class VCSAdapterFactory {
  static create(config: {
    type: 'gitlab' | 'bitbucket'
    baseUrl: string
    projectId?: string
    workspace?: string
    repoSlug?: string
    token: string
  }): VCSAdapter {
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
    throw new Error(`Unsupported VCS type: ${config.type}`)
  }
}

export { VCSAdapter, GitLabAdapter, BitbucketAdapter, VCSAdapterFactory }
```

### 第二步：自建需求系统适配

```typescript
// adapters/requirement-system-adapter.ts

interface RequirementInfo {
  id: string                    // 内部使用的ID
  name: string                  // 需求名称（显示用）
  description?: string
  status: string
  assignee: string
  link: string
  priority?: 'high' | 'medium' | 'low'
  createdAt?: string
  updatedAt?: string
}

interface RequirementSystemAdapter {
  getRequirementByName(name: string): Promise<RequirementInfo | null>
  getRequirementsByNames(names: string[]): Promise<RequirementInfo[]>
  searchRequirements(keyword: string): Promise<RequirementInfo[]>
}

/**
 * 自建需求系统适配器
 *
 * 你需要根据你的自建系统调整API调用
 */
class CustomRequirementAdapter implements RequirementSystemAdapter {
  private baseUrl: string
  private token: string

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
    this.token = token
  }

  private async request(path: string, options: any = {}) {
    return axios.get(`${this.baseUrl}${path}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      ...options
    })
  }

  async getRequirementByName(name: string): Promise<RequirementInfo | null> {
    try {
      // 调整这个API端点为你的自建系统的实际端点
      const { data } = await this.request('/api/requirements/search', {
        params: { name }
      })

      if (data && data.data && data.data.length > 0) {
        const requirement = data.data[0]
        return this.mapToRequirementInfo(requirement)
      }
      return null
    } catch (error) {
      console.warn(`⚠️ 无法获取需求: ${name}`)
      return null
    }
  }

  async getRequirementsByNames(names: string[]): Promise<RequirementInfo[]> {
    const requirements: RequirementInfo[] = []

    for (const name of names) {
      const req = await this.getRequirementByName(name)
      if (req) {
        requirements.push(req)
      }
    }

    return requirements
  }

  async searchRequirements(keyword: string): Promise<RequirementInfo[]> {
    try {
      const { data } = await this.request('/api/requirements/search', {
        params: { keyword }
      })

      return (data.data || []).map((req: any) =>
        this.mapToRequirementInfo(req)
      )
    } catch (error) {
      console.warn(`⚠️ 搜索需求失败: ${keyword}`)
      return []
    }
  }

  /**
   * 将自建系统的需求格式转换为统一格式
   * 需要根据你的系统调整字段映射
   */
  private mapToRequirementInfo(rawRequirement: any): RequirementInfo {
    return {
      id: rawRequirement.id || rawRequirement.req_id,
      name: rawRequirement.name || rawRequirement.title || rawRequirement.summary,
      description: rawRequirement.description || rawRequirement.content,
      status: rawRequirement.status || 'unknown',
      assignee: rawRequirement.assignee || rawRequirement.owner || 'Unassigned',
      link: rawRequirement.url || `${this.baseUrl}/requirements/${rawRequirement.id}`,
      priority: this.normalizePriority(rawRequirement.priority),
      createdAt: rawRequirement.created_at || rawRequirement.create_time,
      updatedAt: rawRequirement.updated_at || rawRequirement.update_time
    }
  }

  private normalizePriority(
    priority: any
  ): 'high' | 'medium' | 'low' | undefined {
    if (!priority) return undefined
    const normalized = String(priority).toLowerCase()
    if (normalized.includes('high') || normalized === '1' || normalized === 'urgent') {
      return 'high'
    } else if (normalized.includes('low') || normalized === '3') {
      return 'low'
    }
    return 'medium'
  }
}

export { RequirementInfo, RequirementSystemAdapter, CustomRequirementAdapter }
```

### 第三步：优化的 Release Report Agent

```typescript
// agents/release-report-agent-custom.ts

import { VCSAdapterFactory, VCSAdapter } from '../adapters/vcs-adapter'
import { CustomRequirementAdapter } from '../adapters/requirement-system-adapter'
import type { RequirementInfo } from '../adapters/requirement-system-adapter'

interface BranchInfo {
  name: string
  commits: number
  files: number
  additions: number
  deletions: number
  requirementNames: string[]    // 改为需求名称（不是ID）
  author: string
  prNumber: number | string
  prUrl: string
  mergedAt: string
}

interface ReleaseReport {
  version: string
  releaseBranch: string
  releaseDate: string
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

interface CRRecord {
  prNumber: number | string
  title: string
  author: string
  reviewers: string[]
  comments: number
  approvedAt?: string
  requestedChanges?: string[]
}

class ReleaseReportAgent {
  private vcsAdapter: VCSAdapter
  private requirementAdapter: CustomRequirementAdapter

  constructor(options: {
    vcsConfig: any  // GitLab 或 Bitbucket 配置
    requirementSystemUrl: string
    requirementSystemToken: string
  }) {
    this.vcsAdapter = VCSAdapterFactory.create(options.vcsConfig)
    this.requirementAdapter = new CustomRequirementAdapter(
      options.requirementSystemUrl,
      options.requirementSystemToken
    )
  }

  /**
   * 主入口：生成完整的版本报告
   */
  async generateReleaseReport(releaseBranch: string): Promise<ReleaseReport> {
    console.log(`\n🚀 开始生成上线报告: ${releaseBranch}`)

    const version = this.extractVersionFromBranch(releaseBranch)
    console.log(`📌 版本号: ${version}`)

    // 1. 获取合并的分支
    console.log(`\n📂 第1步：获取所有合并的分支...`)
    const branches = await this.getMergedBranches(releaseBranch)
    console.log(`✅ 找到 ${branches.length} 个分支`)

    // 2. 提取需求信息
    console.log(`\n📝 第2步：提取需求信息...`)
    const requirements = await this.extractRequirements(branches)
    console.log(`✅ 找到 ${requirements.length} 个需求`)

    // 3. 收集CR记录
    console.log(`\n💬 第3步：收集CR记录...`)
    const crRecords = await this.collectCRRecords(branches)
    console.log(`✅ 收集了 ${crRecords.length} 条CR记录`)

    // 4. 计算统计
    const statistics = this.calculateStatistics(branches, requirements, crRecords)

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
   * 获取合并的分支
   * 支持 GitLab 和 Bitbucket
   */
  private async getMergedBranches(releaseBranch: string): Promise<BranchInfo[]> {
    const branches: BranchInfo[] = []

    try {
      const mergedPRs = await this.vcsAdapter.getMergedPRs(releaseBranch)

      for (const pr of mergedPRs) {
        try {
          // 获取详细信息
          const prNumber = pr.iid || pr.id  // GitLab用iid，Bitbucket用id
          const details = await this.vcsAdapter.getPRDetails(prNumber)

          // 获取对比统计
          const base = details.target_branch || details.destination_branch
          const head = details.source_branch || details.source_branch
          const stat = await this.vcsAdapter.getCompareStat(base, head)

          // 从PR描述中提取需求名称
          const description = details.description || ''
          const requirementNames = this.extractRequirementNames(description)

          branches.push({
            name: head,
            commits: stat.commits || 1,
            files: stat.files,
            additions: stat.additions,
            deletions: stat.deletions,
            requirementNames,
            author: details.author?.username || details.author?.login || 'Unknown',
            prNumber,
            prUrl: details.web_url || details.links?.html?.href,
            mergedAt: details.merged_at || new Date().toISOString()
          })
        } catch (error) {
          console.warn(`⚠️ 无法获取PR详情:`, error)
        }
      }
    } catch (error) {
      console.error('❌ 获取合并分支失败:', error)
    }

    return branches
  }

  /**
   * 从PR描述中提取需求名称
   * 支持格式：
   * - "需求：xxx"
   * - "需求名：xxx"
   * - "关联需求：xxx, yyy"
   * - 等等
   */
  private extractRequirementNames(text: string): string[] {
    if (!text) return []

    const names: Set<string> = new Set()

    // 匹配模式1：需求：xxx 或 需求名：xxx
    const pattern1 = /需求[名]*[:：]\s*([^\n,，]+)/g
    let match
    while ((match = pattern1.exec(text)) !== null) {
      const name = match[1].trim()
      if (name && name.length > 0) {
        names.add(name)
      }
    }

    // 匹配模式2：关联需求：xxx, yyy
    const pattern2 = /关联需求[:：]\s*([^\n]+)/g
    while ((match = pattern2.exec(text)) !== null) {
      const itemsText = match[1]
      const items = itemsText.split(/[,，]/).map(s => s.trim())
      items.forEach(item => {
        if (item && item.length > 0) {
          names.add(item)
        }
      })
    }

    return Array.from(names)
  }

  /**
   * 提取需求信息
   */
  private async extractRequirements(
    branches: BranchInfo[]
  ): Promise<RequirementInfo[]> {
    const requirementNames = new Set<string>()

    branches.forEach(branch => {
      branch.requirementNames.forEach(name => {
        requirementNames.add(name)
      })
    })

    // 从自建需求系统获取详情
    const requirements = await this.requirementAdapter.getRequirementsByNames(
      Array.from(requirementNames)
    )

    return requirements
  }

  /**
   * 收集CR记录
   */
  private async collectCRRecords(branches: BranchInfo[]): Promise<CRRecord[]> {
    const records: CRRecord[] = []

    for (const branch of branches) {
      try {
        // 获取review
        const reviews = await this.vcsAdapter.listPRReviews(branch.prNumber)
        const comments = await this.vcsAdapter.listPRComments(branch.prNumber)

        const reviewers = reviews.map(r => r.user.login)
        const approved = reviews.find(r => r.state === 'APPROVED')

        records.push({
          prNumber: branch.prNumber,
          title: branch.name,
          author: branch.author,
          reviewers,
          comments: comments.length,
          approvedAt: approved?.submitted_at,
          requestedChanges: []
        })
      } catch (error) {
        console.warn(`⚠️ 无法获取PR ${branch.prNumber}的CR记录`)
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

  private extractVersionFromBranch(branch: string): string {
    const match = branch.match(/release\/v?(.+)/)
    return match ? `v${match[1]}` : branch
  }

  private getScheduledReleaseDate(): string {
    const now = new Date()
    const daysUntilThursday = (4 - now.getDay() + 7) % 7 || 7
    const releaseDate = new Date(now)
    releaseDate.setDate(now.getDate() + daysUntilThursday)
    releaseDate.setHours(21, 0, 0, 0)
    return releaseDate.toISOString()
  }
}

export { ReleaseReportAgent, ReleaseReport, BranchInfo, CRRecord }
```

### 第四步：腾讯文档和自建机器人集成

```typescript
// publishers/document-publisher.ts
// 支持腾讯文档和自建文档系统

interface DocumentPublishConfig {
  type: 'tencent-doc' | 'custom'
  url: string
  token?: string
  spaceId?: string
  folderId?: string
}

interface NotificationConfig {
  type: 'custom-robot'
  webhookUrl: string
  format?: 'json' | 'text' | 'markdown'
}

class DocumentPublisher {
  /**
   * 上传报告到腾讯文档
   */
  static async uploadToTencentDoc(
    report: ReleaseReport,
    config: DocumentPublishConfig
  ): Promise<string> {
    try {
      const content = this.generateMarkdown(report)

      // 腾讯文档API调用
      // 需要根据实际的腾讯文档API调整
      const response = await axios.post(
        `${config.url}/api/documents`,
        {
          title: `${report.version} 上线报告`,
          content,
          folderId: config.folderId
        },
        {
          headers: {
            Authorization: `Bearer ${config.token}`
          }
        }
      )

      console.log(`✅ 报告已上传到腾讯文档`)
      return response.data.url
    } catch (error) {
      console.error('❌ 上传到腾讯文档失败:', error)
      throw error
    }
  }

  /**
   * 上传到自建文档系统
   */
  static async uploadToCustomSystem(
    report: ReleaseReport,
    config: DocumentPublishConfig
  ): Promise<string> {
    try {
      const content = this.generateMarkdown(report)

      const response = await axios.post(
        `${config.url}/api/documents/create`,
        {
          title: `${report.version} 上线报告`,
          content,
          version: report.version,
          releaseDate: report.releaseDate,
          metadata: {
            releaseBranch: report.releaseBranch,
            totalRequirements: report.statistics.totalRequirements,
            totalBranches: report.statistics.totalBranches
          }
        },
        {
          headers: {
            Authorization: `Bearer ${config.token}`
          }
        }
      )

      console.log(`✅ 报告已上传到文档系统`)
      return response.data.documentUrl
    } catch (error) {
      console.error('❌ 上传到文档系统失败:', error)
      throw error
    }
  }

  /**
   * 生成 Markdown 格式报告
   */
  private static generateMarkdown(report: ReleaseReport): string {
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
        .map(req => {
          let status = ''
          if (req.status === 'done' || req.status === 'completed') {
            status = '✅'
          } else if (req.status === 'in_progress') {
            status = '🔄'
          } else {
            status = '⏳'
          }

          let priority = ''
          if (req.priority === 'high') {
            priority = '🔴 高'
          } else if (req.priority === 'low') {
            priority = '🔵 低'
          } else {
            priority = '🟡 中'
          }

          return `
### ${status} ${req.name}

- **状态**: ${req.status}
- **优先级**: ${priority}
- **责任人**: ${req.assignee}
- **链接**: [查看详情](${req.link})
`
        })
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
- **PR链接**: [#${branch.prNumber}](${branch.prUrl})
- **合并时间**: ${new Date(branch.mergedAt).toLocaleString('zh-CN')}
- **改动**: ${branch.files} 文件，+${branch.additions} -${branch.deletions} 行
- **关联需求**: ${branch.requirementNames.join(', ') || '无'}
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
        .map(cr => {
          const status = cr.approvedAt ? '✅ 已审批' : '⏳ 待审批'
          return `
### ${status} PR #${cr.prNumber}: ${cr.title}

- **作者**: ${cr.author}
- **审批人**: ${cr.reviewers.join(', ') || '待审批'}
- **评论数**: ${cr.comments}
${cr.approvedAt ? `- **审批时间**: ${new Date(cr.approvedAt).toLocaleString('zh-CN')}` : ''}
`
        })
        .join('\n')
    : '暂无CR记录'
}

---

## ✅ 上线检查清单

- [ ] 所有PR已审批通过
- [ ] 所有需求已完成
- [ ] 代码改动已验证
- [ ] 测试用例已通过
- [ ] 文档已更新
- [ ] 数据库迁移已准备
- [ ] 回滚方案已准备
- [ ] 监控告警已配置

---

**生成人**: ${report.generatedBy}
**生成时间**: ${new Date(report.generatedAt).toLocaleString('zh-CN')}
`
  }
}

export { DocumentPublisher, DocumentPublishConfig }
```

### 第五步：自建机器人通知

```typescript
// notifiers/custom-robot-notifier.ts

interface CustomRobotNotificationConfig {
  webhookUrl: string
  format?: 'json' | 'text' | 'markdown'
}

class CustomRobotNotifier {
  /**
   * 发送通知到自建机器人
   */
  static async notify(
    report: ReleaseReport,
    config: CustomRobotNotificationConfig
  ): Promise<void> {
    try {
      const message = this.formatMessage(report, config.format || 'json')

      await axios.post(config.webhookUrl, message, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log(`✅ 已发送通知到自建机器人`)
    } catch (error) {
      console.error('❌ 发送通知失败:', error)
      throw error
    }
  }

  /**
   * 格式化消息
   */
  private static formatMessage(
    report: ReleaseReport,
    format: string
  ): any {
    if (format === 'markdown') {
      return {
        msgtype: 'markdown',
        markdown: {
          title: `${report.version} 版本上线报告`,
          text: this.generateMarkdownMessage(report)
        }
      }
    } else if (format === 'text') {
      return {
        msgtype: 'text',
        text: {
          content: this.generateTextMessage(report)
        }
      }
    } else {
      // JSON格式 - 最灵活
      return {
        msgtype: 'json',
        data: {
          version: report.version,
          releaseBranch: report.releaseBranch,
          releaseDate: report.releaseDate,
          statistics: report.statistics,
          summary: this.generateSummary(report)
        }
      }
    }
  }

  private static generateSummary(report: ReleaseReport): string {
    return `
【${report.version} 版本上线报告】

📊 统计信息:
- 需求数: ${report.statistics.totalRequirements}
- 分支数: ${report.statistics.totalBranches}
- 改动文件: ${report.statistics.totalFiles}
- 新增代码: +${report.statistics.totalAdditions}
- 删除代码: -${report.statistics.totalDeletions}
- 已审批: ${report.statistics.approvedPRs}/${report.statistics.totalBranches}

📝 需求列表:
${report.requirements.map(r => `  • ${r.name} (${r.status})`).join('\n')}

🔀 分支数: ${report.statistics.totalBranches}

💬 Code Review: ${report.statistics.approvedPRs} 已批准，${report.statistics.pendingReviews} 待批准

计划上线: ${new Date(report.releaseDate).toLocaleString('zh-CN')}
    `.trim()
  }

  private static generateMarkdownMessage(report: ReleaseReport): string {
    return `
**${report.version} 版本上线报告**

统计信息:
- 需求数: ${report.statistics.totalRequirements}
- 分支数: ${report.statistics.totalBranches}
- 改动: +${report.statistics.totalAdditions} -${report.statistics.totalDeletions}
- Code Review: ${report.statistics.approvedPRs}✅ ${report.statistics.pendingReviews}⏳

计划上线: ${new Date(report.releaseDate).toLocaleString('zh-CN')}
    `.trim()
  }

  private static generateTextMessage(report: ReleaseReport): string {
    return `
【${report.version} 版本上线报告】

统计：需求${report.statistics.totalRequirements}个，分支${report.statistics.totalBranches}个，改动${report.statistics.totalFiles}个文件

CR状态：${report.statistics.approvedPRs}个已批准，${report.statistics.pendingReviews}个待批准

计划上线：${new Date(report.releaseDate).toLocaleString('zh-CN')}
    `.trim()
  }
}

export { CustomRobotNotifier, CustomRobotNotificationConfig }
```

### 第六步：完整的使用脚本

```typescript
// cli.ts

import { ReleaseReportAgent } from './agents/release-report-agent-custom'
import { DocumentPublisher } from './publishers/document-publisher'
import { CustomRobotNotifier } from './notifiers/custom-robot-notifier'

async function main() {
  const releaseBranch = process.argv[2] || process.env.RELEASE_BRANCH || 'release/main'

  console.log('🚀 开始生成版本报告...\n')

  // 初始化Agent
  const agent = new ReleaseReportAgent({
    // VCS 配置 - 支持 GitLab 和 Bitbucket
    vcsConfig: {
      type: process.env.VCS_TYPE as 'gitlab' | 'bitbucket',
      baseUrl: process.env.VCS_BASE_URL!,

      // GitLab 特有
      projectId: process.env.GITLAB_PROJECT_ID,

      // Bitbucket 特有
      workspace: process.env.BITBUCKET_WORKSPACE,
      repoSlug: process.env.BITBUCKET_REPO_SLUG,

      token: process.env.VCS_TOKEN!
    },

    // 自建需求系统配置
    requirementSystemUrl: process.env.REQUIREMENT_SYSTEM_URL!,
    requirementSystemToken: process.env.REQUIREMENT_SYSTEM_TOKEN!
  })

  // 1. 生成报告
  const report = await agent.generateReleaseReport(releaseBranch)

  // 2. 上传到文档系统
  if (process.env.DOCUMENT_SYSTEM_URL) {
    console.log('\n📄 上传到文档系统...')
    const docUrl = await DocumentPublisher.uploadToTencentDoc(report, {
      type: 'tencent-doc',
      url: process.env.DOCUMENT_SYSTEM_URL,
      token: process.env.DOCUMENT_SYSTEM_TOKEN,
      folderId: process.env.DOCUMENT_FOLDER_ID
    })
    console.log(`✅ 文档链接: ${docUrl}`)
  }

  // 3. 发送通知到自建机器人
  if (process.env.ROBOT_WEBHOOK_URL) {
    console.log('\n🤖 发送通知到机器人群...')
    await CustomRobotNotifier.notify(report, {
      webhookUrl: process.env.ROBOT_WEBHOOK_URL,
      format: (process.env.ROBOT_MESSAGE_FORMAT as any) || 'json'
    })
  }

  console.log('\n✨ 所有操作完成！')
  console.log(`版本: ${report.version}`)
  console.log(`需求: ${report.statistics.totalRequirements} 个`)
  console.log(`分支: ${report.statistics.totalBranches} 个`)
  console.log(`CR进度: ${report.statistics.approvedPRs}/${report.statistics.totalBranches}`)
}

main().catch(err => {
  console.error('❌ 错误:', err)
  process.exit(1)
})
```

### 第七步：环境变量配置

```bash
# .env 文件配置示例

# ====== VCS 配置 ======
# 选择 GitLab 或 Bitbucket
VCS_TYPE=gitlab  # 或 bitbucket
VCS_BASE_URL=https://gitlab.company.com  # 或 https://bitbucket.org
VCS_TOKEN=xxx

# GitLab 专有
GITLAB_PROJECT_ID=123

# Bitbucket 专有
BITBUCKET_WORKSPACE=your-workspace
BITBUCKET_REPO_SLUG=your-repo

# ====== 需求系统 ======
REQUIREMENT_SYSTEM_URL=https://requirement.company.com
REQUIREMENT_SYSTEM_TOKEN=xxx

# ====== 文档系统 ======
DOCUMENT_SYSTEM_URL=https://docs.company.com
DOCUMENT_SYSTEM_TOKEN=xxx
DOCUMENT_FOLDER_ID=xxx

# ====== 通知机器人 ======
ROBOT_WEBHOOK_URL=https://robot.company.com/webhook
ROBOT_MESSAGE_FORMAT=json  # 或 markdown、text

# ====== 其他 ======
RELEASE_BRANCH=release/main
```

### 第八步：GitHub Actions / GitLab CI 配置

```yaml
# 对于 GitLab CI
.gitlab-ci.yml:

generate_release_report:
  stage: deploy
  image: node:18
  script:
    - npm install
    - npm run generate-report -- release/main
  only:
    - web  # 手动触发
  artifacts:
    reports:
      dotenv: report.env
```

---

## 🎯 核心特点

### ✅ 支持多个代码仓库
- GitLab ✅
- Bitbucket ✅
- 混用情况下自动适配

### ✅ 自建需求系统
- 无需特定格式，直接用需求名
- 从PR描述中智能提取需求名
- 灵活的需求信息映射

### ✅ 自建文档系统
- 支持腾讯文档
- 支持自建文档系统
- 自动生成 Markdown 格式

### ✅ 自建机器人通知
- 支持 JSON/Markdown/Text 格式
- 灵活的消息定制
- 直接推送到群里

---

## 📋 配置清单

现在我需要你提供：

1. **GitLab 信息**（如有）
   - [ ] GitLab 地址
   - [ ] Project ID
   - [ ] Personal Access Token

2. **Bitbucket 信息**（如有）
   - [ ] Bitbucket 地址
   - [ ] Workspace
   - [ ] Repo Slug
   - [ ] App Token

3. **自建需求系统**
   - [ ] API 地址
   - [ ] Token
   - [ ] 需求查询接口示例（给我一个API调用例子）
   - [ ] 需求字段映射（你的系统中，需求的名字字段叫什么？）

4. **文档系统**
   - [ ] 腾讯文档的访问信息，还是自建系统？
   - [ ] 如果是自建，API 地址和 Token

5. **机器人**
   - [ ] Webhook URL
   - [ ] 期望的消息格式（JSON/Markdown/文本）

有了这些信息，我就能帮你**最终测试和部署**这个Agent。

准备好吗？🚀
