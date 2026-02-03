# 快速开始指南

欢迎加入团队！👋 这份指南会帮你快速上手项目。

## 🚀 5 分钟快速启动

### 1. 环境要求

检查你的开发环境是否满足要求：

```bash
# 查看你的环境版本
node --version    # 【填写】应该是 v14+ / v16+ / v18+ 等
npm --version     # 【填写】应该是 6+ / 7+ / 8+ 等
```

详细的环境设置，见 [[dev-environment|开发环境设置]]。

### 2. 克隆和安装

```bash
# 克隆仓库
git clone 【填写项目仓库地址】
cd 【填写项目目录】

# 安装依赖
npm install

# 如果使用 yarn
yarn install
```

### 3. 启动开发服务器

```bash
# 启动开发服务器
npm run dev

# 或
npm start

# 访问 http://localhost:【填写端口，如 3000】
```

### 4. 运行测试

```bash
# 运行所有测试
npm test

# 运行特定测试
npm test Button
```

### 5. 构建生产版本

```bash
# 构建
npm run build

# 预览生产构建
npm run preview
```

✅ 现在你已经可以开发了！

## 📚 接下来要了解什么

### 新成员第一天（1 小时）

1. **了解项目** - 读 [[../project-intro/overview|项目概述]]（5 分钟）
2. **了解架构** - 读 [[../project-intro/architecture|架构设计]]（10 分钟）
3. **了解规范** - 读 [[../standards/overview|规范总览]]（15 分钟）
4. **跑一个例子** - 找一个简单的 Issue，试着修复并提交 PR（30 分钟）

### 第一周要掌握

- [ ] 阅读 [[../standards/code-standards|代码规范]]
- [ ] 阅读 [[../standards/naming-conventions|命名规范]]
- [ ] 了解 [[../project-intro/tech-stack|技术栈]]
- [ ] 阅读 [[../best-practices/common-patterns|常见模式]]

### 经常查阅

- 【疑问】→ 先看 [[../reference/faq|FAQ]]
- 【遇到问题】→ 看 [[../reference/troubleshooting|常见问题排查]]
- 【写代码】→ 参考 [[../best-practices/overview|最佳实践]]
- 【提交代码】→ 查看 [[../standards/git-workflow|Git 工作流]]

## 🔍 生成新页面时

1. 看 [[new-page-template|新页面参考]]（模板和示例）
2. 参考 [[../standards/file-structure|文件结构规范]]（文件该放哪）
3. 参考 [[../standards/naming-conventions|命名规范]]（如何命名）
4. 参考 [[../best-practices/common-patterns|常见模式]]（推荐的做法）

## 🐛 遇到问题

1. 先查 [[../reference/faq|常见问题解答]]
2. 再看 [[../reference/troubleshooting|常见问题排查]]
3. 最后问团队成员或 Lead

## 💡 推荐阅读顺序

```
第 1 天：
  1. 项目概述 (5 min)
  2. 快速开始 (5 min)
  3. 环境设置 (10 min)

第 1 周：
  4. 代码规范 (20 min)
  5. 命名规范 (15 min)
  6. 常见模式 (20 min)

之后（按需）：
  7. 技术栈详解
  8. 最佳实践
  9. FAQ 和排查指南
```

## 🤝 提交你的第一个 PR

```
1. 创建分支: git checkout -b feature/my-feature
2. 做出改动，遵循规范
3. 提交: git commit -m "feat: add my feature"
4. 推送: git push origin feature/my-feature
5. 在 GitHub 创建 Pull Request
6. 等待 Code Review
7. 根据反馈做出改动
8. Merge 到 develop 分支
```

详细说明，见 [[../standards/git-workflow|Git 工作流]]。

---

**需要帮助？** 👇
- 环境问题 → [[dev-environment|开发环境设置]]
- 有问题 → [[../reference/faq|FAQ]]
- 找不到东西 → [[../standards/file-structure|文件结构]]
- Code Review → [[../../工作流型Skill/SKILL|代码审查指南]]
