# 项目知识库 Skill

这是一个**通用的项目知识库 Skill 模板**。

## 🎯 Skill 的功能

这个知识库可以帮助：
- 📖 **新成员快速上手** - 了解项目架构、规范、最佳实践
- 🎨 **生成新页面时参考** - 查看文件结构、命名规范、常见模式
- 🔍 **Code Review 时参考** - 检查代码是否符合规范和最佳实践

## 📑 快速导航

| 章节 | 用途 | 链接 |
|-----|-----|------|
| **项目介绍** | 了解项目是什么 | [[project-intro/overview\|项目概述]] |
| **架构设计** | 了解技术选择 | [[project-intro/architecture\|架构设计]] |
| **开发规范** | 遵循开发标准 | [[standards/overview\|规范总览]] |
| **最佳实践** | 学习推荐做法 | [[best-practices/overview\|最佳实践]] |
| **新人指南** | 快速上手项目 | [[guides/quick-start\|快速开始]] |
| **常见问题** | 查看 FAQ | [[reference/faq\|常见问题]] |

## 🚀 如何使用

### 我是新成员，怎么快速上手？
1. 先看 [[project-intro/overview|项目概述]]（5 分钟）
2. 再看 [[guides/quick-start|快速开始指南]]（15 分钟）
3. 然后看 [[standards/overview|规范总览]]（10 分钟）
4. 最后在做事时随时查阅其他章节

### 我要生成新页面，需要参考什么？
1. 看 [[guides/new-page-template|新页面参考]]
2. 查看 [[standards/file-structure|文件结构规范]]
3. 参考 [[standards/naming-conventions|命名规范]]
4. 学习 [[best-practices/common-patterns|常见模式]]

### Code Review 时要检查什么？
1. 参考 [[standards/code-standards|代码规范]]
2. 检查 [[standards/git-workflow|提交规范]]
3. 查看 [[best-practices/security-checklist|安全要点]]

---

## 📖 完整目录

### 📂 项目介绍 (project-intro/)
- `overview.md` - 项目概述（从 README 自动提取）
- `architecture.md` - 架构设计和技术选择
- `tech-stack.md` - 技术栈详解

### 📂 开发规范 (standards/)
- `overview.md` - 规范总览（所有规范的快速索引）
- `code-standards.md` - 代码规范（变量、函数、注释等）
- `naming-conventions.md` - 命名规范（文件、变量、函数、CSS等）
- `file-structure.md` - 文件结构和目录组织
- `git-workflow.md` - Git 提交规范

### 📂 最佳实践 (best-practices/)
- `overview.md` - 最佳实践总览
- `common-patterns.md` - 常见开发模式
- `performance-tips.md` - 性能优化建议
- `security-checklist.md` - 安全检查清单

### 📂 开发指南 (guides/)
- `quick-start.md` - 新人快速开始
- `dev-environment.md` - 开发环境设置
- `new-page-template.md` - 新页面生成参考

### 📂 参考资料 (reference/)
- `faq.md` - 常见问题解答
- `troubleshooting.md` - 常见问题排查

---

## 📝 使用这个 Skill 的方式

### 方式 1：在 Claude Code 中激活
```
1. 在项目根目录创建 .claude/skills/ 文件夹
2. 将这个 Skill 复制到该文件夹
3. 在 Claude Code 中激活这个 Skill
4. 需要帮助时，Claude 会自动引用这个 Skill
```

### 方式 2：作为知识库查阅
```
1. 新成员入职时，给他这个知识库的链接
2. 在 Code Review 时，引用具体的规范文件
3. 在讨论最佳实践时，参考相关章节
```

---

## ✏️ 如何填写这个 Skill

> **重要**：下面的 `【需要你填写】` 标记的部分，你需要根据你的项目填写。

| 文件 | 内容来源 | 状态 |
|-----|--------|------|
| `project-intro/overview.md` | 从你的 README 提取 | 【需要你填写】 |
| `project-intro/architecture.md` | 你的技术架构说明 | 【需要你填写】 |
| `project-intro/tech-stack.md` | 你的技术栈 | 【需要你填写】 |
| `standards/code-standards.md` | 你的代码规范 | 【需要你填写】 |
| `standards/naming-conventions.md` | 你的命名约定 | 【需要你填写】 |
| `standards/file-structure.md` | 你的文件结构 | 【需要你填写】 |
| `standards/git-workflow.md` | 你的 Git 规范 | 【需要你填写】 |
| `best-practices/common-patterns.md` | 项目常见模式 | 【需要你填写】 |
| `best-practices/performance-tips.md` | 性能优化建议 | 【需要你填写】 |
| `best-practices/security-checklist.md` | 安全检查清单 | 【需要你填写】 |
| `guides/quick-start.md` | 新人上手指南 | 【需要你填写】 |
| `guides/dev-environment.md` | 开发环境配置 | 【需要你填写】 |
| `guides/new-page-template.md` | 新页面参考 | 【需要你填写】 |
| `reference/faq.md` | 项目常见问题 | 【需要你填写】 |
| `reference/troubleshooting.md` | 问题排查指南 | 【需要你填写】 |

---

## 🔗 关联的 Skill

- **Code Review Skill** - 代码审查工作流（引用本知识库的规范）

---

**下一步**：查看各个文件，根据 【需要你填写】 的标记补充你的项目信息。
