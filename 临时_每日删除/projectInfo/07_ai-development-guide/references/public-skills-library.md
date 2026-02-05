# 公共技能库 - 建立跨项目的可复用能力

公共技能库是团队共享的技能资源，旨在提高开发效率和代码质量。本文档说明如何使用和贡献公共技能。

## 公共技能库位置

**仓库地址**：https://git.sf-express.com/projects/SCC-IWMS/repos/scc-iwms-core-fe-common-skills/browse

**用途**：存储具有跨项目通用性的技能，供多个项目共享使用。

**提交规范**：
- 技能必须具有跨项目的通用性
- 符合 Skill 规范要求
- 按照目录结构组织

---

## 公共技能库目录结构

```plaintext
scc-iwms-core-fe-common-skills/
│
└── skills/
    │
    ├── frontend-auto-test/
    │   ├── autoTest.js            # 自动化测试主脚本
    │   ├── analyzeReport.js       # AI 分析报告脚本
    │   ├── README.md              # 详细使用说明
    │   ├── SKILL.md               # 技能描述文件
    │   └── reports/               # 测试报告输出
    │
    ├── code-generation/
    │   ├── main.js
    │   ├── templates/
    │   ├── README.md
    │   └── SKILL.md
    │
    ├── code-review/
    │   ├── analyzer.js
    │   ├── checklist.md
    │   ├── README.md
    │   └── SKILL.md
    │
    └── [其他通用技能]/
```

---

## 通用技能规划

### 1. 需求理解能力建设

**目标**：让 AI 更好地理解和分析需求

**包含的能力**：

#### 结构化需求语言定义
- 业务实体建模
  - 识别业务中的核心实体
  - 定义实体之间的关系
  - 描述实体的属性和行为

- 业务流程的状态机描述
  - 将流程分解为状态
  - 定义状态转换规则
  - 标识关键的业务逻辑

#### 自然语言处理能力
- PRD 文档的结构化解析
  - 自动识别需求类型
  - 提取关键信息
  - 生成需求清单

- 用户故事到技术任务的自动分解
  - 将用户故事转化为技术任务
  - 评估任务的复杂度
  - 生成任务优先级

- 模糊需求的澄清和确认机制
  - 识别不清晰的需求
  - 提出澄清问题
  - 生成需求确认单

**涉及技能**：
- `requirement_analysis` - 需求分析
- `user_story_decomposition` - 用户故事分解
- `requirement_clarification` - 需求澄清

---

### 2. 开发能力建设

**目标**：加速代码开发，提高代码质量

**包含的能力**：

#### 场景化需求通用能力建设
- 高确定性、高重复性的任务中立即产生价值
  - CRUD 操作自动生成
  - 标准表单生成
  - 列表页面模板

#### 通用设计稿代码生成、设计稿还原能力
- 从设计稿自动生成代码
- 支持多种设计工具（Figma、Sketch 等）
- 生成可用于生产的高保真代码

#### 沉淀常见页面模板库
- 列表页模板
- 详情页模板
- 表单页模板
- 仪表板模板
- 流程图模板

#### 内置最佳实践的项目脚手架快速落地能力
- 项目初始化脚手架
- 预配置的开发环境
- 最佳实践的示例代码
- 完整的测试框架

#### 建立"安全重构"流程，确保转换前后功能等价评估能力
- 代码重构前的测试覆盖验证
- 重构后的功能验证
- 性能对比分析
- 自动化回退机制

#### 前后端一体化能力建设
- 根据结构化需求，自动完成符合团队技术沉淀的前后端设计
- 数据库设计自动生成
- API 契约自动生成
- 代码生成（前端 + 后端）
- 文档自动生成

**涉及技能**：
- `code-generation` - 代码生成
- `design-to-code` - 设计稿转代码
- `template-library` - 模板库管理
- `architecture-generation` - 架构生成
- `database-design` - 数据库设计
- `api-contract-generation` - API 契约生成

---

### 3. 自动化测试能力

**目标**：降低测试成本，提高测试覆盖率

**包含的能力**：

#### 测试全覆盖
- 单元测试、集成测试的脚本自动生成
  - 根据源代码自动生成测试用例
  - 支持多种测试框架（Jest、Mocha 等）
  - 生成的测试可直接运行

- 脚本回归及回归报告自动生成
  - 运行测试并生成报告
  - 测试覆盖率分析
  - 趋势分析

#### 自动检查
- 漏洞的静态和动态扫描
  - 代码安全漏洞检查
  - 依赖包漏洞扫描
  - 代码质量检查

- 审计报告的自动生成
  - 生成完整的审计报告
  - 问题分级
  - 修复建议

**涉及技能**：
- `frontend-auto-test` - 前端自动化测试
- `unit-test-generation` - 单元测试生成
- `security-scanning` - 安全扫描
- `test-report-generation` - 测试报告生成

---

### 4. 部署运维自动化能力

**目标**：自动化部署流程，降低运维风险

**包含的能力**：

#### 基础设施
- 环境配置管理
  - 开发、测试、生产环境配置
  - 环境变量管理
  - 配置文件自动生成

- 监控和告警配置
  - 监控指标定义
  - 告警规则配置
  - 仪表板自动生成

#### 发布流程自动化
- 灰度发布策略的自动制定
  - 基于系统状态的灰度策略
  - 自动验证和反馈

- 回滚机制的自动准备
  - 自动备份
  - 快速回滚
  - 状态恢复

#### 报错日志自动修复
- 错误日志自动拉取
  - 从日志系统自动收集错误
  - 错误分类和聚合

- 代码层自动修复
  - 分析错误原因
  - 生成修复代码
  - 验证修复效果

**涉及技能**：
- `environment-management` - 环境管理
- `ci-cd-automation` - CI/CD 自动化
- `canary-deployment` - 金丝雀部署
- `error-auto-fix` - 错误自动修复
- `monitoring-setup` - 监控配置

---

## 如何使用公共技能

### 第 1 步：查找技能

浏览公共技能库仓库，找到需要的技能。

### 第 2 步：添加到项目

```bash
# 方式 1：克隆整个仓库到本地参考
git clone https://git.sf-express.com/projects/SCC-IWMS/repos/scc-iwms-core-fe-common-skills.git

# 方式 2：复制技能到项目
cp -r scc-iwms-core-fe-common-skills/skills/code-review \
      your-project/.sfcode/skills/
```

### 第 3 步：注册技能

在 `.AGENTS.md` 中添加技能注册：

```markdown
<skill>
<name>code-review</name>
<description>代码质量审查技能</description>
<location>./.sfcode/skills/code-review/SKILL.md</location>
</skill>
```

### 第 4 步：按照文档使用

阅读技能的 `README.md`，按照说明使用。

---

## 如何贡献公共技能

### 第 1 步：准备技能

1. 完善项目级技能的功能和文档
2. 确保技能具有通用性（可在其他项目使用）
3. 编写详细的 README.md
4. 添加使用示例和最佳实践

### 第 2 步：测试技能

1. 在多个项目中测试
2. 收集反馈，优化功能
3. 确保文档清晰完整
4. 验证兼容性

### 第 3 步：提交贡献

```bash
# 1. Fork 公共技能库仓库
# 2. 创建新分支
git checkout -b feat/my-new-skill

# 3. 添加你的技能
mkdir -p skills/my-new-skill/{references,scripts,templates}

# 4. 提交更改
git add .
git commit -m "feat: add my-new-skill"

# 5. 推送并创建 Pull Request
git push origin feat/my-new-skill
```

### 第 4 步：审核和发布

- 技术负责人进行审核
- 验证通用性和质量
- 合并到主分支
- 发布公告

---

## 贡献的好处

✅ **个人成长**
- 提升编码能力
- 学习团队最佳实践
- 积累技术知识

✅ **团队提效**
- 共享可复用技能
- 降低重复工作
- 提高开发效率

✅ **工作业绩**
- 贡献被认可
- 作为技术积累
- 职业发展加分

---

## 最佳实践

1. **通用性优先** - 确保技能在多个项目中可用
2. **文档完整** - README 和代码注释要清晰
3. **易于集成** - 技能应该易于导入和使用
4. **持续维护** - 定期更新和改进
5. **积极反馈** - 收集使用反馈，持续优化

---

## 常见问题

**Q: 我的项目特定技能应该贡献吗？**
A: 如果它具有通用性，并且能被其他项目使用，就应该贡献。

**Q: 如何确保公共技能的质量？**
A: 通过严格的审核流程、完整的文档和多项目验证。

**Q: 技能过时了怎么办？**
A: 更新版本号，提交新的更改，并通知使用者。

---

## 相关链接

- 公共技能库：https://git.sf-express.com/projects/SCC-IWMS/repos/scc-iwms-core-fe-common-skills/
- 技能规范：[[skill-standards|技能规范]]
- 贡献指南：[TODO]

---

## 下一步

- 浏览公共技能库找到可用的技能
- 贡献你的第一个公共技能
- 参与技能库的维护和优化
