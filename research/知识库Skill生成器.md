# 知识库 Skill 生成器

这是一个**知识库型 Skill 的自动化生成工具**。

## 🎯 这个 Skill 的功能

激活这个 Skill，提供你的项目信息，我会自动为你的项目生成一个完整的**知识库型 Skill**。

生成的 Skill 会包含：

| 部分 | 内容 | 来源 |
|-----|-----|------|
| **项目介绍** | 项目名称、描述、功能、架构、技术栈 | 自动从 README 和 package.json 提取 |
| **开发规范** | 代码规范、命名约定、文件结构、Git 规范 | 自动从配置文件分析 |
| **最佳实践** | 常见模式、性能优化、安全检查 | 根据技术栈生成 |
| **开发指南** | 快速开始、环境设置、新页面参考 | 根据项目类型生成 |
| **参考资料** | 常见问题、故障排查 | 根据项目特点生成 |

## 📋 如何使用

### 1️⃣ 告诉我你的项目路径

激活这个 Skill，然后告诉我：

```
项目路径：/Users/你的用户名/projects/my-project
```

或者如果项目在 Vault 中：

```
项目路径：./my-project
```

### 2️⃣ 我会自动做什么

- ✅ 读取你的 README.md
- ✅ 读取 package.json（技术栈、依赖、脚本）
- ✅ 扫描项目目录结构
- ✅ 检查配置文件（.eslintrc、tsconfig.json 等）
- ✅ 识别项目类型和技术栈
- ✅ **自动生成完整的知识库 Skill**

### 3️⃣ 得到什么

在你的项目下会生成一个完整的知识库 Skill，包含：

```
【项目名称】-Skill/
├── SKILL.md                    # Skill 主入口
├── project-intro/              # 项目介绍
│   ├── overview.md             # 项目概述
│   ├── architecture.md         # 架构设计
│   └── tech-stack.md           # 技术栈
├── standards/                  # 开发规范
│   ├── overview.md
│   ├── code-standards.md       # 代码规范
│   ├── naming-conventions.md   # 命名规范
│   ├── file-structure.md       # 文件结构
│   └── git-workflow.md         # Git 规范
├── best-practices/             # 最佳实践
│   ├── overview.md
│   ├── common-patterns.md      # 常见模式
│   ├── performance-tips.md     # 性能优化
│   └── security-checklist.md   # 安全检查
├── guides/                     # 开发指南
│   ├── quick-start.md          # 快速开始
│   ├── dev-environment.md      # 环境设置
│   └── new-page-template.md    # 新页面参考
└── reference/                  # 参考资料
    ├── faq.md                  # 常见问题
    └── troubleshooting.md      # 故障排查
```

所有内容都是**基于你的实际项目自动生成**的！✅

## ✨ 为什么要用这个 Skill

- 📖 **完整的项目文档** - 新成员快速上手
- 🎨 **统一的规范** - 整个团队遵循同样的标准
- 🔍 **Code Review 参考** - 审查代码时快速查看规范
- ⚡ **自动化** - 无需手动写规范，自动从项目提取
- 🚀 **立即可用** - 生成后无需修改，直接使用

## 🚀 现在就开始

### 提供你的项目信息

**只需告诉我项目路径：**

```
【请提供你的项目路径】
```

**例如：**
```
项目路径：/Users/john/projects/my-react-app
```

```
项目路径：./frontend-app
```

```
项目路径：/home/jane/workspace/backend-api
```

---

我会立即为你的项目自动生成完整的知识库 Skill！🎯
