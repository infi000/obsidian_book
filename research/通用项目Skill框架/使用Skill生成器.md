# Skill 自动生成器 - 使用指南

## 🎯 这是什么？

这是一个**自动化的 Skill 生成工具**。你只需提供项目路径，我会：

1. 自动读取你的项目信息
2. 智能分析技术栈和结构
3. 生成两个**定制化的、可直接使用的 Skill**

---

## 📋 使用方式

### 方式 1：最简单（推荐）

直接告诉我你的项目路径：

```
请根据我的项目自动生成定制 Skill，项目路径是：
/Users/你的用户名/projects/my-project
```

### 方式 2：提供额外信息

如果想给我更多上下文：

```
项目信息：
- 路径：/path/to/project
- 项目名称：MyProject
- 主要功能：前端电商应用
- 重点要求：代码审查重点关注规范和安全性

请生成定制化的 Skill。
```

### 方式 3：指定项目类型

如果项目有特殊情况：

```
项目路径：/path/to/project
项目类型：React + Node.js Monorepo
特殊需求：需要特别强调性能优化和安全检查

请生成定制化的 Skill。
```

---

## 🔍 我会自动做什么

### 阶段 1：信息收集（自动化）

```
✅ 读取项目文件：
   - README.md           → 项目描述、功能、架构
   - package.json        → 技术栈、依赖、脚本
   - tsconfig.json       → TypeScript 配置
   - .eslintrc           → 代码规范配置
   - .prettierrc          → 格式化配置
   - src/ 目录           → 项目结构

✅ 识别项目类型：
   - React/Vue/Angular?
   - TypeScript/JavaScript?
   - Monorepo/单项目?
   - 前端/后端/全栈?
```

### 阶段 2：分析和推导（AI 分析）

```
✅ 提取关键信息：
   - 项目名称和描述
   - 核心技术栈
   - 主要依赖库
   - 架构模式
   - 已有的规范配置

✅ 智能推导：
   - 推荐的代码规范（基于项目风格）
   - 推荐的命名约定（基于代码分析）
   - 推荐的文件结构（基于目录结构）
   - 推荐的最佳实践（基于技术栈）
```

### 阶段 3：生成 Skill（模板化）

```
✅ 知识库 Skill：
   - 项目介绍       （从 README 自动填写）
   - 架构设计       （从代码和配置推导）
   - 技术栈         （从 package.json 提取）
   - 代码规范       （从 ESLint/Prettier 提取）
   - 命名规范       （从代码分析推导）
   - 文件结构       （从目录扫描推导）
   - 快速开始       （从 npm scripts 生成）
   - 常见问题       （根据项目类型生成）

✅ Code Review Skill：
   - 5 步流程       （已完成，直接用）
   - 检查清单       （针对项目的定制清单）
   - 反馈指南       （通用 + 项目特定）
   - 反馈示例       （基于项目技术栈的例子）
```

---

## 📊 生成结果预览

以一个 React 项目为例，生成结果会是这样：

### 知识库 Skill

```markdown
# 项目概述

项目名称：MyApp
项目描述：一个基于 React 的电商应用...（从 README 提取）

## 核心功能
- 商品展示
- 购物车
- 订单管理
...（从 README 提取）

## 技术栈
- Frontend: React 18, TypeScript, Vite
- State: Redux Toolkit
- API: Axios
- Testing: Jest, React Testing Library
...（从 package.json 提取）

## 代码规范
- 使用 const/let，禁止 var
- 使用箭头函数
- TypeScript 类型严格模式
- 无 console.log
...（从 .eslintrc 提取）

## 命名规范
- 组件文件：PascalCase (Button.tsx)
- 工具函数：camelCase (utils.ts)
- 常量：UPPER_SNAKE_CASE
...（从代码分析推导）

## 快速开始
npm install
npm run dev
访问 http://localhost:5173
...（从 package.json scripts 生成）
```

### Code Review Skill

```
✅ 5 步流程（标准）
✅ 代码质量清单（针对 React 的定制）
✅ 安全清单（包含 React 特定的项目）
✅ 反馈指南（通用）
✅ 反馈示例（React 代码示例）
```

---

## ✅ 生成后会包含什么

### 高质量内容（无需修改）
- ✅ 项目信息和介绍
- ✅ 技术栈和依赖
- ✅ 代码规范（从配置提取）
- ✅ 快速开始步骤
- ✅ Code Review 完整流程
- ✅ 检查清单和反馈指南

### 可选内容（可以后续补充）
- 📝 详细的最佳实践
- 📝 详细的常见问题
- 📝 详细的故障排查
- 📝 项目特定的规范细节

---

## 🚀 立即生成

现在就可以开始！告诉我：

```
项目路径：【你的项目完整路径】
```

**或者如果项目在 Obsidian Vault 里：**

```
项目路径：【相对路径】
```

**或者简单说：**

```
请根据我的项目自动生成定制 Skill。
项目路径：【填写路径】
```

---

## 💡 温馨提示

- 📂 确保项目有 README.md 和 package.json
- 🔗 路径可以是相对或绝对路径
- ⏱️ 生成通常需要 5-10 分钟
- 📝 生成完成后会放在 Obsidian Vault 中
- ✏️ 生成内容可以随时编辑和完善

---

**现在就开始吧！给我你的项目路径！** 🎯
