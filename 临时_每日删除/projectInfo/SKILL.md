---
name: projectInfo
description: 这是一个**项目级别知识库型 Skill 创建指南**，帮助你快速为当前项目创建专属的知识库 Skill。根据 7 个维度拆解项目知识，每个维度有独立的目录和完整的指南。

---

# 项目知识库 Skill

一个**完整的项目知识库体系**，帮助新成员快速上手，指导开发规范，积累团队知识。


## 📚 6 个维度的知识库

项目知识分为 6 个维度，每个维度是一个独立的目录，包含完整的指南和资源。

### 🎯 维度导航

| 维度 | 目标 | 文件 |
|-----|------|------|
| **1️⃣ 项目介绍** | 了解项目背景和技术选择 | [[01_project-intro-guide/GUIDE\|查看指南]] |
| **2️⃣ 开发规范** | 遵守编码规范和工作流 | [[02_standards-guide/GUIDE\|查看指南]] |
| **3️⃣ 最佳实践** | 学习推荐做法和设计模式 | [[03_best-practices-guide/GUIDE\|查看指南]] |
| **4️⃣ 开发指南** | 快速上手，解决常见问题 | [[04_guides-guide/GUIDE\|查看指南]] |
| **5️⃣ 代码示例** | 复制使用的代码模板 | [[05_code-examples-guide/GUIDE\|查看指南]] |
| **6️⃣ 参考资料** | 查询术语、FAQ、有用链接 | [[06_reference-guide/GUIDE\|查看指南]] |
| **7️⃣ AI 开发指南** | AI 工具、技能管理、工作流 | [[07_ai-development-guide/GUIDE\|查看指南]] |

## 🚀 快速开始

### 我是新成员，怎么入门？

```
第 1 步 → 项目介绍（了解项目）
第 2 步 → AI 开发指南（配置 AI 工具和环境）
第 3 步 → 快速开始（安装开发环境）
第 4 步 → 开发指南（学习新页面模板）
第 5 步 → 代码示例（复制代码）
```

**预计时间：1.5 小时**

详见：[[04_guides-guide/GUIDE|开发指南]] 和 [[07_ai-development-guide/GUIDE|AI 开发指南]]

### 我想写代码，怎么遵守规范？

```
第 1 步 → 开发规范（学习代码风格）
第 2 步 → 代码示例（查看示例）
第 3 步 → 最佳实践（学习设计模式）
第 4 步 → 提交代码（遵循 Git 规范）
```

详见：[[02_standards-guide/GUIDE|开发规范]]

### 遇到问题怎么办？

```
第 1 步 → 故障排查（查看常见问题）
第 2 步 → FAQ（查询常见问题）
第 3 步 → 联系团队 Lead
```

详见：[[04_guides-guide/GUIDE#troubleshooting|故障排查]] 和 [[06_reference-guide/GUIDE|参考资料]]

### 我要做 Code Review，怎么检查？

```
检查项：
☐ 代码规范（开发规范）
☐ 命名规范（开发规范）
☐ 最佳实践（最佳实践）
☐ 安全检查（最佳实践）
```

详见：[[02_standards-guide/GUIDE|开发规范]] 和 [[03_best-practices-guide/GUIDE|最佳实践]]

## 📖 按场景快速查询

### 场景 1: 新建文件或变量

1. 查看 [[02_standards-guide/GUIDE#naming-conventions|命名规范]]
2. 查看 [[02_standards-guide/GUIDE#file-structure|文件结构]]

### 场景 2: 编写新功能

1. 查看 [[04_guides-guide/GUIDE#new-page-template|新页面模板]]
2. 复制 [[05_code-examples-guide/GUIDE|代码示例]] 中的模板
3. 参考 [[02_standards-guide/GUIDE|开发规范]] 检查代码
4. 参考 [[03_best-practices-guide/GUIDE|最佳实践]] 优化代码

### 场景 3: 提交代码

1. 查看 [[02_standards-guide/GUIDE#git-workflow|Git 规范]]
2. 检查代码是否符合 [[02_standards-guide/GUIDE|开发规范]]
3. 创建 PR，接受 Code Review

### 场景 4: 性能优化

1. 查看 [[03_best-practices-guide/GUIDE#performance-tips|性能优化]]
2. 查看 [[05_code-examples-guide/GUIDE|代码示例]]

### 场景 5: 安全审查

1. 查看 [[03_best-practices-guide/GUIDE#security-guidelines|安全指南]]
2. 检查 Code Review 时的安全问题

### 场景 6: 使用 AI 助手提高效率

1. 查看 [[07_ai-development-guide/GUIDE|AI 开发指南]]，了解可用的 AI 工具
2. 配置项目的 SFCODE.md，让 AI 理解项目
3. 浏览 [[07_ai-development-guide/references/skill-standards|技能规范]]，了解可用的技能
4. 查看 [[07_ai-development-guide/references/public-skills-library|公共技能库]]，复用现有技能

### 场景 7: 创建和贡献技能

1. 查看 [[07_ai-development-guide/references/skill-standards|技能规范]]
2. 遵循 [[07_ai-development-guide/GUIDE|AI 开发指南]] 创建技能
3. 考虑贡献到 [[07_ai-development-guide/references/public-skills-library|公共技能库]]

## 💡 各维度的用途

### 1️⃣ 项目介绍 - 了解项目

**包含**：
- 项目概述（是什么、为什么、特性）
- 架构设计（系统设计、模块说明）
- 技术栈（前端、后端、DevOps）

**何时查阅**：入职第一天、需要理解项目架构

[[01_project-intro-guide/GUIDE|📖 查看维度一]]

### 2️⃣ 开发规范 - 规范编码

**包含**：
- 代码规范（JS/TS、React、注释）
- 命名规范（文件、变量、函数）
- 文件结构（项目文件夹组织）
- Git 规范（分支、提交、PR）

**何时查阅**：每次编码、Code Review、提交代码

[[02_standards-guide/GUIDE|📖 查看维度二]]

### 3️⃣ 最佳实践 - 学习推荐做法

**包含**：
- 常见模式（Redux、异步、错误处理）
- 性能优化（React、网络、打包）
- 安全指南（XSS、CSRF、敏感信息）

**何时查阅**：设计功能、优化代码、Code Review

[[03_best-practices-guide/GUIDE|📖 查看维度三]]

### 4️⃣ 开发指南 - 快速上手

**包含**：
- 快速开始（5 分钟启动开发环境）
- 开发环境配置（IDE、工具、环境变量）
- 新页面模板（如何快速创建新页面）
- 故障排查（常见问题和解决方案）

**何时查阅**：第一次搭建环境、遇到问题、创建新页面

[[04_guides-guide/GUIDE|📖 查看维度四]]

### 5️⃣ 代码示例 - 复制使用的模板

**包含**：
- 标准页面模板（列表页、详情页、表单页）
- 功能模块（分页、模态框、表单验证、API 服务）
- 组件模式（自定义 Hook、Context Provider、组件组合）

**何时查阅**：创建新功能、需要代码参考

[[05_code-examples-guide/GUIDE|📖 查看维度五]]

### 6️⃣ 参考资料 - 查询和积累

**包含**：
- 常见问题 FAQ（10+ 常见问题和答案）
- 术语表（20+ 专业术语和定义）
- 有用链接（30+ 资源链接）

**何时查阅**：遇到问题、查询术语、寻找资源

[[06_reference-guide/GUIDE|📖 查看维度六]]

### 7️⃣ AI 开发指南 - 利用 AI 提高开发效率

**包含**：
- AI 工具选择与配置（Claude Code、TDDC-CLI）
- 项目规范文件编写（SFCODE.md）
- 文件组织架构和工作流
- 技能的创建、管理和注册
- 标准开发流程和工作流
- 公共技能库的使用和贡献
- 知识库管理和文档规范

**何时查阅**：配置 AI 工具、创建技能、使用 AI 进行开发、提高开发效率

[[07_ai-development-guide/GUIDE|📖 查看维度七]]

## 📋 目录结构

```
.sfcode/skills/projectInfo/
│
├── SKILL.md                              ← 你在这里
│
├── 01_project-intro-guide/
│   ├── GUIDE.md                          ← 项目介绍指南
│   └── templates/                        ← 模板资源
│
├── 02_standards-guide/
│   ├── GUIDE.md                          ← 开发规范指南
│   └── templates/                        ← 模板资源
│
├── 03_best-practices-guide/
│   ├── GUIDE.md                          ← 最佳实践指南
│   └── templates/                        ← 模板资源
│
├── 04_guides-guide/
│   ├── GUIDE.md                          ← 开发指南
│   └── templates/                        ← 模板资源
│
├── 05_code-examples-guide/
│   ├── GUIDE.md                          ← 代码示例指南
│   └── templates/                        ← 代码模板
│
├── 06_reference-guide/
│   ├── GUIDE.md                          ← 参考资料指南
│   └── templates/                        ← 模板资源
│
└── 07_ai-development-guide/
    ├── GUIDE.md                          ← AI 开发指南
    ├── references/                       ← 参考文档
    │   ├── ai-tools-selection.md        # AI 工具选择
    │   ├── file-organization.md         # 文件组织架构
    │   ├── project-overview.md          # 项目概览说明
    │   ├── skill-standards.md           # 技能规范
    │   ├── workflow-standards.md        # 流程规范
    │   ├── public-skills-library.md     # 公共技能库
    └── templates/                        ← 模板资源
        ├── sfcode-template.md
        ├── agents-template.md
        ├── skill-template.md
        └── workflow-template.yaml
```

## ✅ 使用检查清单

### 入职第一周

- [ ] 阅读 [[01_project-intro-guide/GUIDE|项目介绍]]，理解项目
- [ ] 查看 [[07_ai-development-guide/GUIDE|AI 开发指南]]，配置 AI 工具（可选但推荐）
- [ ] 按 [[04_guides-guide/GUIDE#quick-start|快速开始]] 搭建环境
- [ ] 按 [[04_guides-guide/GUIDE#dev-environment|开发环境]] 配置 IDE
- [ ] 读 [[02_standards-guide/GUIDE|开发规范]]，了解项目风格
- [ ] 看 [[05_code-examples-guide/GUIDE|代码示例]]，熟悉模板

### 开发前

- [ ] 查看 [[02_standards-guide/GUIDE|开发规范]]
- [ ] 查看 [[05_code-examples-guide/GUIDE|代码示例]]
- [ ] 查看 [[03_best-practices-guide/GUIDE|最佳实践]]

### Code Review

- [ ] 检查代码是否符合 [[02_standards-guide/GUIDE|开发规范]]
- [ ] 检查是否遵循 [[03_best-practices-guide/GUIDE|最佳实践]]
- [ ] 检查安全问题（[[03_best-practices-guide/GUIDE#security-guidelines|安全指南]]）

### 遇到问题

- [ ] 查看 [[04_guides-guide/GUIDE#troubleshooting|故障排查]]
- [ ] 查看 [[06_reference-guide/GUIDE|FAQ]]
- [ ] 联系团队

## 🎯 核心原则

这个知识库遵循以下原则：

1. **分层组织** - 6 个维度清晰分层，便于查询
2. **独立自足** - 每个维度都可以独立阅读
3. **相互引用** - 维度之间相互链接，构成知识网络
4. **实用性** - 所有内容都基于实际项目经验
5. **易于维护** - 结构清晰，便于更新和迭代
6. **团队贡献** - 鼓励团队成员贡献和分享

## 🚀 如何创建这个知识库

### 最开始：创建知识库
1. 创建skill名称：sfCodeProjectInfo
2. 创建到当前项目根目录：`.sfcode/skills/`内。
3. SKILL.md 文件开头固定的描述：
```
---
name: sfCodeProjectInfo
description: 您当前项目的知识库，用于记录项目信息、开发规范、最佳实践、开发指南、代码示例、参考资料。
---

```


### 第一步：项目信息收集

在开始前，收集以下信息：

- [ ] 项目名称和描述
- [ ] 项目使用的技术栈
- [ ] 项目结构和主要模块
- [ ] 核心团队
- [ ] 项目文档位置

### 第二步：按维度编写指南

按顺序编写 7 个维度的 GUIDE.md：

1. [[01_project-intro-guide/GUIDE|维度一]] - 项目介绍（overview、architecture、tech-stack）
2. [[02_standards-guide/GUIDE|维度二]] - 开发规范（code-standards、naming、file-structure、git）
3. [[03_best-practices-guide/GUIDE|维度三]] - 最佳实践（common-patterns、performance、security）
4. [[04_guides-guide/GUIDE|维度四]] - 开发指南（quick-start、dev-environment、new-page、troubleshooting）
5. [[05_code-examples-guide/GUIDE|维度五]] - 代码示例（标准页面、功能模块、组件模式）
6. [[06_reference-guide/GUIDE|维度六]] - 参考资料（FAQ、术语表、有用链接）
7. [[07_ai-development-guide/GUIDE|维度七]] - AI 开发指南（工具选择、技能管理、工作流、知识库）

### 第三步：完善和验证

- [ ] 所有链接都能正常打开
- [ ] 内容清晰无误
- [ ] 没有死链和错误链接
- [ ] 邀请团队成员测试和反馈
- [ ] 定期更新和维护

## 💡 最佳实践

- **定期更新** - 项目规范变化时及时更新知识库
- **团队参与** - 邀请团队贡献和完善知识库
- **代码示例很重要** - 规范一定要有代码示例
- **FAQ 很有价值** - 记录团队遇到的问题和解决方案
- **链接很关键** - 维度之间相互引用，构成知识网络

## 📞 获取帮助

- 遇到问题？查看 [[04_guides-guide/GUIDE#troubleshooting|故障排查]]
- 找不到答案？查看 [[06_reference-guide/GUIDE|FAQ]]
- 需要代码示例？查看 [[05_code-examples-guide/GUIDE|代码示例]]
- 想提交改进？提交 PR 贡献你的知识

---

## 🎉 开始使用

1. **如果你是新成员**：前往 [[07_ai-development-guide/GUIDE|AI 开发指南]] 配置 AI 工具（可选），然后前往 [[04_guides-guide/GUIDE|开发指南]] 快速上手
2. **如果你要编码**：前往 [[02_standards-guide/GUIDE|开发规范]] 了解标准，然后查看 [[07_ai-development-guide/GUIDE|AI 开发指南]] 的技能库
3. **如果你要 Code Review**：前往 [[02_standards-guide/GUIDE|开发规范]] 和 [[03_best-practices-guide/GUIDE|最佳实践]]
4. **如果你要使用 AI 助手**：前往 [[07_ai-development-guide/GUIDE|AI 开发指南]] 了解工具和技能
5. **如果你遇到问题**：前往 [[04_guides-guide/GUIDE#troubleshooting|故障排查]] 或 [[06_reference-guide/GUIDE|FAQ]]

**祝你使用愉快！** 🚀




