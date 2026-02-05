# Git 工作流规范

## 分支命名规范

### 分支类型

| 分支类型 | 规范 | 示例 | 说明 |
|---------|------|------|------|
| **功能分支** | feature/* | feature/add-user-login | 新增功能 |
| **修复分支** | bugfix/* | bugfix/fix-order-total | Bug 修复 |
| **发布分支** | release/* | release/v1.0.0 | 发布版本 |
| **热修复** | hotfix/* | hotfix/critical-security-issue | 紧急修复 |
| **文档分支** | docs/* | docs/api-documentation | 文档更新 |
| **重构分支** | refactor/* | refactor/optimize-order-list | 代码重构 |

### 命名规则

**使用全小写，用中划线分隔，名称清晰简洁**

```
✅ 正确示例：
- feature/add-order-export
- feature/implement-pagination
- bugfix/fix-date-format-bug
- hotfix/security-patch-xss

❌ 避免：
- feature/AddOrderExport           (不要用 PascalCase)
- bugfix/fix_date_format_bug       (不要用 snake_case)
- feature/do-something-important   (太模糊)
- feature/wip                      (不清楚做什么)
```

## 提交消息规范

### 提交消息格式

遵循 **Conventional Commits** 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 提交类型

| 类型 | 说明 | 示例 |
|-----|------|------|
| **feat** | 新功能 | feat(order): add order export feature |
| **fix** | 修复 Bug | fix(table): fix pagination bug |
| **docs** | 文档更新 | docs: add API documentation |
| **style** | 代码风格（空格、缩进、符号等） | style: fix indentation |
| **refactor** | 代码重构，不涉及功能变更 | refactor(order): optimize order list |
| **perf** | 性能优化 | perf(table): optimize virtual scrolling |
| **test** | 添加或修改测试 | test(user): add user validation tests |
| **chore** | 构建、依赖、配置等 | chore(deps): upgrade antd to v4 |
| **ci** | CI/CD 配置 | ci: add GitHub actions workflow |

### 提交消息示例

**✅ 正确示例**

```
feat(auth): implement user login functionality

- Add login form component with email/password validation
- Add authentication service with token management
- Add login saga for async authentication flow
- Add error handling for invalid credentials

Closes #123
```

```
fix(order): fix order total calculation

The order total was incorrectly calculated when applying discount before tax.
Changed calculation order to apply tax before discount.

Closes #456
```

```
docs: update development setup instructions
```

```
refactor(user-list): simplify component logic

- Extract table columns configuration to separate file
- Remove unnecessary useState hooks
- Use useCallback for event handlers
```

```
perf(table): optimize large list rendering

Implement virtual scrolling for lists with 1000+ items,
reducing initial render time by 40%.

Closes #789
```

**❌ 避免**

```
❌ fixed bug              (不清楚修复了什么)
❌ Updated code           (太模糊)
❌ WIP                    (工作未完成)
❌ feat(ALL): add feature (scope 过大)
```

### 提交消息详情

**Subject（主题）**
- 使用英文
- 不超过 50 个字符
- 不要句尾加句号
- 使用祈使句（"add" 而不是 "added" 或 "adds"）

**Body（详情，可选）**
- 详细说明为什么做这个改动，而不是是什么
- 每行不超过 72 个字符
- 与 Subject 之间空一行
- 使用 `-` 或 `*` 列出主要变更

**Footer（页脚，可选）**
- 引用相关的 Issue：`Closes #123` 或 `Fixes #456`
- 标记破坏性变更：`BREAKING CHANGE: description`

## 提交前检查

提交代码前的完整检查清单：

```
提交前检查清单：
- [ ] 代码本地已运行并测试
- [ ] ESLint 无错误和警告
- [ ] TypeScript 编译无错误
- [ ] 单元测试通过
- [ ] 没有提交 console.log 调试代码
- [ ] 没有提交 .env 或敏感信息
- [ ] 提交消息符合规范
- [ ] 相关文档已更新
```

## Pull Request 流程

### PR 创建

1. **从最新的 master 创建分支**
   ```bash
   git checkout master
   git pull origin master
   git checkout -b feature/your-feature-name
   ```

2. **功能开发和提交**
   ```bash
   # 开发功能
   git add .
   git commit -m "feat(feature): description"
   ```

3. **推送到远程**
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. **创建 Pull Request**
   - 标题清晰简洁
   - 描述包含以下内容：
     - 功能说明
     - 改动详情
     - 测试方法
     - 相关 Issue

### PR 描述模板

```markdown
## 描述
简要描述这个 PR 的目的和改动。

## 相关 Issue
Closes #123

## 改动详情
- 添加了 X 功能
- 修复了 Y 问题
- 优化了 Z 性能

## 测试方法
1. 打开浏览器访问应用
2. 导航到用户管理页面
3. 点击新增用户按钮
4. 验证表单验证工作正常

## 截图
（如需要可添加截图）

## 检查清单
- [x] 代码符合风格指南
- [x] 相关文档已更新
- [x] 新增功能有测试
- [x] 所有测试通过
```

### PR Review 和 Merge

1. **审核**
   - 至少 2 名开发者审核
   - 查看代码逻辑、性能、安全性
   - 要求改进或提出建议

2. **修改建议**
   - 根据 Review 意见进行修改
   - 推送更新

3. **合并**
   - 所有检查通过后合并
   - 删除分支
   - 关闭相关 Issue

## 常用 Git 命令

### 基础操作

```bash
# 克隆仓库
git clone <repo-url>

# 查看当前分支
git branch

# 创建并切换分支
git checkout -b feature/new-feature

# 查看文件状态
git status

# 查看修改内容
git diff

# 查看提交历史
git log --oneline

# 添加文件到暂存区
git add .

# 提交
git commit -m "feat: message"

# 推送到远程
git push origin feature/new-feature

# 拉取最新代码
git pull origin master
```

### 分支操作

```bash
# 列出本地分支
git branch -a

# 删除本地分支
git branch -d feature/old-feature

# 删除远程分支
git push origin --delete feature/old-feature

# 切换分支
git checkout master

# 重命名分支
git branch -m old-name new-name
```

### 撤销操作

```bash
# 撤销工作目录的修改
git checkout -- file.ts

# 撤销暂存的修改
git reset HEAD file.ts

# 回退到上一个提交
git reset --soft HEAD~1

# 重新提交（修改最后一个提交）
git commit --amend -m "new message"
```

### 解决冲突

```bash
# 更新分支到最新
git pull origin master

# 查看冲突文件
git status

# 手动解决冲突，然后
git add .
git commit -m "fix: resolve merge conflicts"
git push origin feature/your-feature
```

## 禁止操作

- ❌ **不要** force push 到 master 或 main 分支
- ❌ **不要** 直接在 master 上提交
- ❌ **不要** 合并 WIP（未完成）的分支
- ❌ **不要** 提交包含敏感信息的代码
- ❌ **不要** 提交大的二进制文件
- ❌ **不要** 忽略 ESLint 或 TypeScript 错误
- ❌ **不要** 删除他人的分支（除非你知道他已经完成）

## 团队协作建议

1. **及时沟通** - 大功能开发前讨论架构设计
2. **小粒度提交** - 每个提交做一件事，便于 review
3. **及时 push** - 每天推送进度，避免本地更改丢失
4. **及时 pull** - 获取他人的最新改动，尽早发现冲突
5. **主动 review** - 帮助 review 他人的代码，知识共享
6. **留下评论** - PR 中留下有建设性的评论和建议
