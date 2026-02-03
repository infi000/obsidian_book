# 知识库skillCreator

这是一个**知识库型 Skill 创建指南**，帮助你快速为任何项目创建专属的知识库 Skill。

## 🎯 这个 Skill 的作用

- 📖 指导你创建项目的知识库 Skill
- 📝 提供完整的模板和框架
- ✅ 包含检查清单，确保不遗漏重点
- 🎨 包含实际示例，易于参考

## 📋 快速导航

| 步骤 | 说明 |
|-----|-----|
| **第一步** | [[#第一步-项目信息收集|项目信息收集]] |
| **第二步** | [[#第二步-创建文件结构|创建文件结构]] |
| **第三步** | [[#第三步-编写知识库内容|编写知识库内容]] |
| **第四步** | [[#第四步-完成和验证|完成和验证]] |

---

## 第一步：项目信息收集

在开始创建 Skill 前，先收集项目信息：

### 必须了解的信息

- [ ] **项目名称** - 正式的项目名称
- [ ] **项目描述** - 一句话说明这个项目做什么
- [ ] **技术栈** - 主要使用的技术（React/Vue/Node.js 等）
- [ ] **项目结构** - 文件夹层级组织
- [ ] **核心团队** - 主要开发者和 Lead
- [ ] **存储位置** - README 等文档在哪里

### 快速检查清单

```
[ ] 项目有 README.md 、有SFCODE.md吗？
[ ] 项目有 package.json（如果是 Node.js）吗？
[ ] 项目有现有的规范文档吗？
[ ] 项目的主文件夹有哪些？
[ ] 项目用的什么框架和库？
```

---

## 第二步：创建文件结构

创建你的知识库 Skill 文件夹结构：

### 完整的目录结构

```
your-project-kb-skill/
│
├── SKILL.md                    ← 主入口（必须）
│
├── 📂 01_project-intro/
│   ├── overview.md             项目概述
│   ├── architecture.md         架构设计
│   └── tech-stack.md           技术栈说明
│
├── 📂 02_standards/
│   ├── overview.md             规范总览
│   ├── code-standards.md       代码规范
│   ├── naming-conventions.md   命名规范
│   ├── file-structure.md       文件结构
│   └── git-workflow.md         Git 提交规范
│
├── 📂 03_best-practices/
│   ├── overview.md             最佳实践总览
│   ├── common-patterns.md      常见模式
│   ├── performance-tips.md     性能优化
│   └── security-guidelines.md  安全检查
│
├── 📂 04_guides/
│   ├── quick-start.md          快速开始
│   ├── dev-environment.md      开发环境
│   ├── new-page-template.md    新页面模板
│   └── troubleshooting.md      故障排查
│
├── 📂 05_code-examples/
│   ├── overview.md             代码示例总览
│   ├── standard-pages/         标准页面模板
│   │   ├── user-profile.md
│   │   ├── list-page.md
│   │   ├── form-page.md
│   │   └── detail-page.md
│   ├── functional-modules/     功能模块代码
│   │   ├── pagination.md
│   │   ├── modal-dialog.md
│   │   ├── form-validation.md
│   │   └── api-service.md
│   └── component-patterns/     组件模式
│       ├── custom-hook.md
│       ├── provider-consumer.md
│       └── composition-pattern.md
│
└── 📂 06_reference/
    ├── faq.md                  常见问题
    ├── glossary.md             术语表
    └── useful-links.md         有用链接
```

### 创建步骤

```bash
# 在你的项目根目录执行：

# 1. 创建主文件夹
mkdir "your-project-kb-skill"

# 2. 创建子文件夹
mkdir "your-project-kb-skill/01_project-intro"
mkdir "your-project-kb-skill/02_standards"
mkdir "your-project-kb-skill/03_best-practices"
mkdir "your-project-kb-skill/04_guides"
mkdir "your-project-kb-skill/05_code-examples"
mkdir "your-project-kb-skill/05_code-examples/standard-pages"
mkdir "your-project-kb-skill/05_code-examples/functional-modules"
mkdir "your-project-kb-skill/05_code-examples/component-patterns"
mkdir "your-project-kb-skill/06_reference"

# 3. 创建所有的 .md 文件
```

---

## 第三步：编写知识库内容

### 各部分内容说明

#### 📄 SKILL.md（主入口）- **必须**

这是你的知识库的首页，应该包含：

```markdown
# 项目名-知识库 Skill

**项目简介**：一句话说明项目做什么

## 🎯 这个知识库的作用

- 新成员快速了解项目
- 开发时查询规范和最佳实践
- Code Review 时参考检查标准

## 📑 快速导航

| 章节 | 用途 | 链接 |
|-----|-----|------|
| **项目介绍** | 了解项目结构和技术选择 | [[01_project-intro/overview\|项目概述]] |
| **开发规范** | 遵循开发标准 | [[02_standards/overview\|规范总览]] |
| **最佳实践** | 学习推荐做法 | [[03_best-practices/overview\|最佳实践]] |
| **开发指南** | 快速上手 | [[04_guides/quick-start\|快速开始]] |
| **代码示例** | 直接复制的代码模板 | [[05_code-examples/overview\|代码示例]] |
| **参考资料** | 常见问题和术语 | [[06_reference/faq\|常见问题]] |

## 🚀 我是新人，怎么开始？

1. 先看 [[01_project-intro/overview\|项目概述]]
2. 再看 [[04_guides/quick-start\|快速开始]]
3. 最后查 [[04_guides/dev-environment\|开发环境]]

## 💡 我想写代码，怎么参考规范？

1. 看 [[02_standards/code-standards\|代码规范]]
2. 看 [[02_standards/naming-conventions\|命名规范]]
3. 看 [[03_best-practices/common-patterns\|常见模式]]
4. 看 [[05_code-examples/overview\|代码示例模板]]
```

#### 📂 01_project-intro/ - 项目的三个核心文件

**overview.md** - 项目概述
```markdown
# 项目概述

## 是什么

简洁描述这个项目做什么。

## 为什么要做

解释项目的意义和价值。

## 核心特性

- 特性 1
- 特性 2
- 特性 3

## 主要用户

谁在用这个项目？

## 相关链接

- 产品文档链接
- 设计稿链接
- 需求文档链接
```

**architecture.md** - 架构设计
```markdown
# 架构设计

## 总体架构

[描述整体架构或放架构图]

## 技术选择

| 组件 | 选择 | 原因 |
|-----|------|------|
| 框架 | React 18 | ... |
| 状态管理 | Redux | ... |
| API 通信 | Axios | ... |

## 关键模块

- **模块 A** - 说明
- **模块 B** - 说明

## 数据流

[描述数据如何在各个模块间流动]
```

**tech-stack.md** - 技术栈
```markdown
# 技术栈说明

## 前端

- React 18
- TypeScript
- Redux
- [其他库...]

## 后端

- Node.js / Python / Go
- 框架名称
- 数据库
- [其他...]

## DevOps

- Docker
- CI/CD 工具
- [其他...]

## 版本号

记录关键库的版本要求
```

#### 📂 02_standards/ - 最重要的部分

**overview.md** - 规范导航
```markdown
# 开发规范总览

这里列出所有规范，快速导航。

| 规范 | 说明 |
|-----|------|
| [[code-standards\|代码规范]] | 编码风格、最佳实践 |
| [[naming-conventions\|命名规范]] | 文件、变量、函数命名 |
| [[file-structure\|文件结构]] | 项目文件组织方式 |
| [[git-workflow\|Git 规范]] | 提交、分支、PR 规范 |
```

**code-standards.md** - 代码规范（根据你的项目填写）
```markdown
# 代码规范

## JavaScript/TypeScript 规范

### 变量声明
- 优先使用 const
- 需要重新赋值用 let
- 禁止使用 var

### 函数编写
- 优先使用 arrow function
- 函数名用 camelCase
- 一个函数做一件事

### 注释
- 复杂逻辑要有注释
- 公共函数要有 JSDoc
- 不要写显而易见的注释

## React 规范

### 组件编写
- 函数组件 + Hooks
- 一个文件一个组件
- Props 要有默认值

### 组件命名
- 文件名: PascalCase (Button.tsx)
- 组件名: PascalCase
- 文件夹名: kebab-case

## 其他规范

[根据你的项目补充]
```

**naming-conventions.md** - 命名规范
```markdown
# 命名规范

## 文件和文件夹

| 类型 | 规范 | 示例 |
|-----|------|------|
| 组件文件 | PascalCase | UserProfile.tsx |
| 工具函数 | camelCase | formatDate.ts |
| 样式文件 | kebab-case | header-styles.css |
| 文件夹 | kebab-case | user-profile |

## 变量和常量

- 普通变量: camelCase
- 常量: UPPER_SNAKE_CASE
- 布尔值: is/has/can 前缀

## 函数命名

- get/set 前缀: 获取/设置数据
- handle 前缀: 事件处理函数
- is/has/can: 返回布尔值的函数
```

**file-structure.md** - 文件结构
```markdown
# 文件结构规范

## 推荐的项目结构

project/
├── src/
│   ├── components/      # React 组件
│   ├── pages/          # 页面组件
│   ├── services/       # API 和数据服务
│   ├── hooks/          # 自定义 Hook
│   ├── utils/          # 工具函数
│   ├── styles/         # 全局样式
│   ├── types/          # TypeScript 类型定义
│   ├── constants/      # 常量
│   └── App.tsx         # 根组件
├── public/             # 静态资源
├── tests/              # 测试文件
└── README.md

## 新建文件时

- 在对应的文件夹中新建
- 遵循命名规范
- 添加必要的注释和类型定义
```

**git-workflow.md** - Git 规范
```markdown
# Git 工作流规范

## 分支命名规范

| 分支类型 | 规范 | 示例 |
|---------|------|------|
| 功能分支 | feature/* | feature/user-login |
| 修复分支 | bugfix/* | bugfix/fix-login-bug |
| 发布分支 | release/* | release/v1.0.0 |
| 热修复 | hotfix/* | hotfix/security-issue |

## 提交信息规范

```

```

**Type 包括：**
- feat: 新功能
- fix: 修复 bug
- docs: 文档更新
- style: 代码风格
- refactor: 重构
- test: 测试
- chore: 构建、依赖等

**例子：**

feat(auth): add user login functionality

- Add login form component
- Add authentication service
- Add login validation

Closes #123
```

## PR 规范

- 一个 PR 一个功能
- PR 标题清晰简洁
- PR 描述包含变更说明
- 至少一个 Code Review 通过才能合并
```

#### 📂 03_best-practices/ - 可选但有用

**overview.md** - 最佳实践总览
```markdown
# 最佳实践总览

这里列出所有推荐做法，快速导航。

| 最佳实践 | 说明 |
|--------|------|
| [[common-patterns\|常见模式]] | 项目中常见的实现模式 |
| [[performance-tips\|性能优化]] | 性能优化的关键点 |
| [[security-guidelines\|安全指南]] | 安全相关的检查要点 |
```

**common-patterns.md** - 常见模式
```markdown
# 常见模式

## Redux 数据流

[描述你的项目如何使用 Redux]

## 异步操作

[如何处理 API 调用、加载状态等]

## 错误处理

[错误处理的标准方式]

## 其他模式

[项目中常见的设计模式]
```

**performance-tips.md** - 性能优化
```markdown
# 性能优化建议

## React 性能

- 使用 useMemo 缓存计算结果
- 使用 useCallback 缓存函数
- 使用 React.memo 缓存组件
- 代码分割和懒加载

## 网络优化

- 减少 bundle 大小
- 图片优化和压缩
- CDN 使用
- 请求合并

## 其他优化

[补充你项目特有的优化建议]
```

**security-guidelines.md** - 安全检查
```markdown
# 安全指南

## 常见安全问题

### XSS 防护
- 避免使用 innerHTML
- 使用模板而不是字符串拼接
- 转义用户输入

### CSRF 防护
- 使用 CSRF token
- 检查请求来源

### 敏感信息
- 不要在代码中硬编码密钥
- 使用环境变量
- 不要提交 .env 文件

## Code Review 时的安全检查

[补充你项目特有的安全要求]
```

#### 📂 04_guides/ - 实用指南

**overview.md** - 开发指南总览
```markdown
# 开发指南总览

新成员快速上手、开发、故障排查的完整指南。

| 指南 | 说明 |
|-----|------|
| [[quick-start\|快速开始]] | 初次安装和启动 |
| [[dev-environment\|开发环境]] | 开发环境配置 |
| [[new-page-template\|新页面模板]] | 如何快速生成新页面 |
| [[troubleshooting\|故障排查]] | 常见问题排查 |
```

**quick-start.md** - 快速开始
```markdown
# 快速开始

## 前置要求

- Node.js >= 16
- npm >= 8

## 安装步骤

1. 克隆项目
   ```
   git clone ...
   ```

2. 安装依赖
   ```
   npm install
   ```

3. 启动开发服务器
   ```
   npm run dev
   ```

4. 访问 http://localhost:3000

## 首次开发

[新成员首次开发应该做什么？]
```

**dev-environment.md** - 开发环境
```markdown
# 开发环境配置

## 推荐的工具

- IDE: VS Code
- 扩展: [列出推荐的 VS Code 扩展]
- 包管理: npm / yarn / pnpm

## 环境变量配置

复制 `.env.example` 到 `.env.local`，填入以下信息：
- API_URL
- [其他必要的环境变量]

## 常见问题

[开发环境配置时的常见问题和解决方案]
```

**new-page-template.md** - 新页面模板
```markdown
# 新页面创建指南

## 快速生成新页面

### 第 1 步：创建文件结构

src/pages/YourPageName/
├── YourPageName.tsx        # 主组件
├── YourPageName.module.css # 样式（如果使用 CSS Module）
├── types.ts               # 类型定义
├── hooks.ts               # 自定义 Hook
├── api.ts                 # 数据服务
└── __tests__/             # 测试文件
    └── YourPageName.test.tsx
```
```

### 第 2 步：使用模板

[提供一个简单的页面组件模板]

### 第 3 步：检查清单

- [ ] 文件结构符合规范
- [ ] 使用了 TypeScript 类型
- [ ] 添加了必要的注释
- [ ] 添加了测试文件
- [ ] 在路由中注册了页面
```

**troubleshooting.md** - 故障排查
```markdown
# 常见问题排查

## 问题 1: npm install 失败

原因: [可能的原因]
解决方案: [解决步骤]

## 问题 2: 开发服务器无法启动

原因: [可能的原因]
解决方案: [解决步骤]

## 问题 3: [其他常见问题]

[补充你团队遇到的常见问题]
```

#### 📂 05_code-examples/ - 代码示例和模板

**overview.md** - 代码示例总览
```markdown
# 代码示例和模板

这里包含可以直接复制使用的标准页面、功能模块和组件模式代码。

## 标准页面模板

常见页面的完整实现示例，包含文件结构、代码和说明。

| 页面类型 | 说明 |
|---------|------|
| [[standard-pages/user-profile\|用户档案页]] | 单个用户信息展示和编辑 |
| [[standard-pages/list-page\|列表页]] | 数据列表展示，支持分页、搜索、排序 |
| [[standard-pages/form-page\|表单页]] | 新增/编辑表单，包含验证和提交 |
| [[standard-pages/detail-page\|详情页]] | 单个项目的详细信息展示 |

## 功能模块代码

项目中常用功能的实现代码和最佳实践。

| 功能模块 | 说明 |
|---------|------|
| [[functional-modules/pagination\|分页功能]] | 列表分页的完整实现 |
| [[functional-modules/modal-dialog\|模态框]] | 弹窗/对话框的标准写法 |
| [[functional-modules/form-validation\|表单验证]] | 前端表单验证的规范方式 |
| [[functional-modules/api-service\|API 服务]] | 数据请求的统一管理方式 |

## 组件模式

React 组件设计的常见模式和最佳实践。

| 模式 | 说明 |
|-----|------|
| [[component-patterns/custom-hook\|自定义 Hook]] | 逻辑复用的最佳实践 |
| [[component-patterns/provider-consumer\|Provider/Consumer]] | Context API 的标准用法 |
| [[component-patterns/composition-pattern\|组件组合]] | 组件之间的组合方式 |
```

**standard-pages/user-profile.md** - 用户档案页示例
```markdown
# 用户档案页（User Profile Page）

用户信息的查看和编辑页面。

## 文件结构

\`\`\`
src/pages/UserProfile/
├── UserProfile.tsx           # 主组件
├── UserProfile.module.css    # 样式
├── types.ts                  # 类型定义
├── hooks.useUserProfile.ts   # 自定义 Hook
├── api.ts                    # 数据服务
└── __tests__/UserProfile.test.tsx
\`\`\`

## 完整代码示例

### UserProfile.tsx

\`\`\`typescript
import React, { useState } from 'react'
import { useUserProfile } from './hooks.useUserProfile'
import styles from './UserProfile.module.css'
import { UserData } from './types'

interface UserProfileProps {
  userId: string
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const { user, loading, error, updateUser } = useUserProfile(userId)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<UserData>>({})

  const handleEdit = () => {
    setFormData(user)
    setIsEditing(true)
  }

  const handleSave = async () => {
    try {
      await updateUser(formData)
      setIsEditing(false)
    } catch (err) {
      console.error('更新用户信息失败:', err)
    }
  }

  if (loading) return <div>加载中...</div>
  if (error) return <div>错误: {error}</div>
  if (!user) return <div>用户不存在</div>

  return (
    <div className={styles.container}>
      <h1>用户档案</h1>

      {isEditing ? (
        <div className={styles.form}>
          {/* 编辑表单 */}
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="名字"
          />
          <button onClick={handleSave}>保存</button>
          <button onClick={() => setIsEditing(false)}>取消</button>
        </div>
      ) : (
        <div className={styles.profile}>
          <div>名字: {user.name}</div>
          <div>邮箱: {user.email}</div>
          <button onClick={handleEdit}>编辑</button>
        </div>
      )}
    </div>
  )
}

export default UserProfile
\`\`\`

### types.ts

\`\`\`typescript
export interface UserData {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  createdAt: string
  updatedAt: string
}

export interface UserProfileState {
  user: UserData | null
  loading: boolean
  error: string | null
}
\`\`\`

### hooks.useUserProfile.ts

\`\`\`typescript
import { useState, useEffect } from 'react'
import { UserData } from './types'
import * as api from './api'

export const useUserProfile = (userId: string) => {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const data = await api.getUserById(userId)
        setUser(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : '未知错误')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  const updateUser = async (updates: Partial<UserData>) => {
    try {
      const updated = await api.updateUser(userId, updates)
      setUser(updated)
      return updated
    } catch (err) {
      throw err
    }
  }

  return { user, loading, error, updateUser }
}
\`\`\`

## 关键要点

- ✅ 分离关注：UI、Hook、API、类型分开管理
- ✅ 错误处理：完整的错误提示
- ✅ 加载状态：显示 loading 和 error 状态
- ✅ 类型安全：使用 TypeScript 定义所有类型
- ✅ 可重用：Hook 可以在其他组件中复用

## 检查清单

- [ ] 文件结构符合规范
- [ ] 有完整的类型定义
- [ ] 业务逻辑在 Hook 中
- [ ] API 调用在 api.ts 中
- [ ] 有错误和加载状态处理
- [ ] 有测试文件
\`\`\`

**standard-pages/list-page.md** - 列表页示例
```markdown
# 列表页（List Page）

数据列表展示，支持分页、搜索、排序。

[类似结构的完整代码示例]
\`\`\`

**standard-pages/form-page.md** - 表单页示例
```markdown
# 表单页（Form Page）

新增/编辑表单，包含验证和提交。

[类似结构的完整代码示例]
\`\`\`

**standard-pages/detail-page.md** - 详情页示例
```markdown
# 详情页（Detail Page）

单个项目的详细信息展示。

[类似结构的完整代码示例]
\`\`\`

**functional-modules/pagination.md** - 分页功能
```markdown
# 分页功能实现

[分页功能的完整实现代码]
\`\`\`

**functional-modules/modal-dialog.md** - 模态框
```markdown
# 模态框组件

[模态框的完整实现代码]
\`\`\`

**functional-modules/form-validation.md** - 表单验证
```markdown
# 表单验证规范

[表单验证的完整实现代码]
\`\`\`

**functional-modules/api-service.md** - API 服务
```markdown
# API 服务管理

[API 服务的完整实现代码]
\`\`\`

**component-patterns/custom-hook.md** - 自定义 Hook
```markdown
# 自定义 Hook 模式

[自定义 Hook 的最佳实践]
\`\`\`

**component-patterns/provider-consumer.md** - Provider/Consumer
```markdown
# Provider/Consumer 模式

[Context API 的标准用法]
\`\`\`

**component-patterns/composition-pattern.md** - 组件组合
```markdown
# 组件组合模式

[组件组合的最佳实践]
\`\`\`

#### 📂 06_reference/ - 参考资料

**overview.md** - 参考资料总览
```markdown
# 参考资料总览

常见问题、术语表和有用链接的汇总。

| 资料 | 说明 |
|-----|------|
| [[faq\|常见问题]] | 项目相关的常见问题解答 |
| [[glossary\|术语表]] | 项目中使用的专业术语 |
| [[useful-links\|有用链接]] | 相关文档和资源的链接 |
```

**faq.md** - 常见问题
```markdown
# 常见问题

## Q: 如何快速上手项目？
A: 请先看 [[04_guides/quick-start|快速开始]]。

## Q: 代码风格有什么要求？
A: 请看 [[02_standards/code-standards|代码规范]]。

[补充你项目特有的常见问题]
```

**glossary.md** - 术语表（可选）
```markdown
# 术语表

- **API** - Application Programming Interface
- **Redux** - 状态管理库
- [其他术语...]
```

**useful-links.md** - 有用链接（可选）
```markdown
# 有用链接

- [项目代码仓库](...)
- [设计稿](...)
- [API 文档](...)
- [需求文档](...)
```

---

## 第四步：完成和验证

### 检查清单

在发布你的知识库 Skill 前，检查：

- [ ] **SKILL.md** 完整，导航清晰
- [ ] **项目介绍** 三个文件都写了（overview、architecture、tech-stack）
- [ ] **开发规范** 至少有 code-standards 和 naming-conventions
- [ ] **开发指南** 至少有 quick-start 和 dev-environment
- [ ] **代码示例** 至少有 1 个标准页面模板和 2 个功能模块示例
- [ ] **所有链接** 都是正确的（使用 wikilink [[文件]])
- [ ] **没有废话** 内容精准有用
- [ ] **举了例子** 规范都有具体例子说明

### 验证步骤

1. 在 Obsidian 中打开 SKILL.md
2. 点击导航链接，确保都能打开
3. 检查是否有死链
4. 邀请同事测试，看是否好理解

---

## 💡 快速提示

- 💾 **定期更新** - 项目规范变了，及时更新 Skill
- 🔗 **使用 wikilink** - 方便在 Obsidian 中跳转
- 📊 **表格很好用** - 对比信息用表格展示
- 📝 **代码示例很重要** - 规范要有例子说明
- 👥 **让团队参与** - 征求团队反馈，不断完善

---

## 🚀 现在就开始

1. 收集你的项目信息
2. 按照文件结构创建文件夹和文件
3. 按照上面的模板逐个填写内容
4. 验证完成
5. 分享给团队

祝你创建成功！🎉