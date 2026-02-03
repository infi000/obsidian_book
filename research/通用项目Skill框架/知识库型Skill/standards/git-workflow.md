# Git 工作流

> 【需要你填写】项目的 Git 提交和分支规范

## 分支管理

【填写】

### 分支命名规范

【填写】项目使用什么分支管理策略：

#### 主分支

```
【填写示例】
- main / master: 生产版本
- develop / dev: 开发版本
- staging: 预发布版本
```

**规则**：
- [ ] `main` 或 `master` 用于生产版本
- [ ] `develop` 用于开发版本
- [ ] 其他：【填写】

#### 功能分支

```
【填写示例】
✅ feature/user-authentication
✅ feature/add-payment-feature
❌ feature/new
❌ Feature/UserAuthentication
```

**规则**:
- [ ] 使用 `feature/` 前缀
- [ ] 分支名用 **kebab-case**（中划线，全小写）
- [ ] 分支名要清晰描述功能
- [ ] 【填写你项目的约定】

#### Bug 修复分支

```
【填写示例】
✅ bugfix/button-click-error
✅ hotfix/memory-leak-in-search
❌ bug/fix
❌ BugFix/ButtonClickError
```

**规则**:
- [ ] 使用 `bugfix/` 或 `hotfix/` 前缀
- [ ] 分支名用 **kebab-case**
- [ ] 【填写你项目的约定】

#### 其他分支

【填写】你的项目是否有其他分支类型：
- [ ] `docs/` - 文档更新
- [ ] `refactor/` - 代码重构
- [ ] `chore/` - 依赖更新、构建配置等
- [ ] 其他：【填写】

### 分支生命周期

【填写】分支的创建、使用、删除流程：

```
【填写示例工作流】
1. 从 develop 创建 feature/user-auth 分支
2. 在 feature/user-auth 上进行开发和提交
3. 提交 PR (Pull Request)，进行 Code Review
4. Review 通过后，merge 到 develop
5. 删除 feature/user-auth 分支
6. 定期将 develop merge 到 main（发版）
```

## 提交规范

【填写】

### 提交信息格式

【填写】选择一种提交规范：

#### 选项 1: Conventional Commits (推荐)

```
【填写示例】
type(scope): subject

例子：
feat(auth): add login functionality
fix(button): fix click handler issue
docs(readme): update installation steps
style(css): adjust padding
refactor(api): simplify request logic
test(user): add user creation test
chore(deps): upgrade React to 18.0
```

**类型 (type)**：
- `feat` - 新功能
- `fix` - 修复 bug
- `docs` - 文档更新
- `style` - 代码格式（不改变逻辑）
- `refactor` - 代码重构
- `perf` - 性能优化
- `test` - 测试相关
- `chore` - 构建、依赖、工具等

**范围 (scope)**：
【填写】你项目的常见 scope：
- `auth` - 认证模块
- `api` - API 相关
- `ui` - 用户界面
- 【填写其他 scope】

**主题 (subject)**：
- [ ] 使用祈使句（"add" 而不是 "added"）
- [ ] 不要大写首字母
- [ ] 不要在末尾加句号
- [ ] 保持简洁（50 字以内）

#### 选项 2: 简化格式

```
【填写示例】
prefix: description

例子：
[feat] add login functionality
[fix] fix button click issue
[docs] update README
```

#### 选项 3: 自定义格式

【填写】你项目使用的格式：

```
【填写示例】

```

**【选择】你的项目用哪一种？**
- [ ] 选项 1（Conventional Commits）- 推荐
- [ ] 选项 2（简化格式）
- [ ] 选项 3（自定义）

### 提交信息内容

【填写】

```
【填写示例 - 详细的提交信息】
feat(auth): add JWT token refresh mechanism

Add automatic token refresh before expiration.

Why:
- Prevents session timeout during long user interactions
- Improves user experience

What:
- Added refreshToken() utility
- Added TokenManager class
- Update Auth context to use TokenManager
- Added tests for token refresh

Fixes #123
Co-authored-by: Team Member <email@example.com>
```

**规则**:
- [ ] 第一行是简短的主题（50 字以内）
- [ ] 空一行后写详细说明（可选）
- [ ] 说明中包含"为什么"而不仅仅是"做了什么"
- [ ] 关联 Issue：`Fixes #123`、`Closes #456`
- [ ] 【填写你项目的要求】

### 提交频率

【填写】

- [ ] 一个功能一次提交（大提交）
- [ ] 逻辑清晰的小步骤多次提交（推荐）
- [ ] 【填写你项目的实践】

**原则**:
- ✅ 一次提交应该是一个完整的、逻辑清晰的改动
- ✅ 避免一次提交改太多不相关的东西
- ❌ 避免提交半完成的功能

## Pull Request 规范

【填写】

### PR 标题

【填写】PR 标题应该遵循什么规范：

```
【填写示例】
✅ feat(auth): add OAuth integration
✅ [WIP] fix(button): adjust hover state
❌ fixed something
❌ update
```

**规则**:
- [ ] 遵循提交规范
- [ ] 如果还在进行中，用 `[WIP]` 前缀
- [ ] 【填写你项目的约定】

### PR 描述模板

【填写】PR 应该包含什么信息：

```markdown
【填写示例】
## 描述

简要说明这个 PR 做了什么。

## 为什么需要这个改动？

解释为什么需要这个改动。

## 如何测试？

说明如何测试这个改动。

## 相关 Issue

Fixes #123
Related to #456

## 检查清单

- [ ] 代码遵循项目规范
- [ ] 添加了相应的测试
- [ ] 更新了文档
- [ ] 没有新的 warning/error
```

**【填写】你的项目使用的 PR 模板**

### PR 审查

【填写】PR 审查的要求：

- [ ] 至少【填写数字】人 Review 才能 merge
- [ ] 所有评论必须被解决
- [ ] 所有 CI/CD 检查必须通过
- [ ] 【填写其他要求】

## 合并策略

【填写】

### Merge 方式

【填写】选择一种 merge 策略：

```
【填写示例】
- Squash and merge: 将所有 commit 合并为一个
- Create a merge commit: 保留所有 commit，添加 merge commit
- Rebase and merge: 变基后 merge（保留 commit 历史）
```

**【选择】你的项目用哪一种？**
- [ ] Squash and merge
- [ ] Create a merge commit
- [ ] Rebase and merge
- [ ] 【填写你项目的做法】

### 删除分支

【填写】
- [ ] merge 后自动删除分支
- [ ] 手动删除分支
- [ ] 【填写你项目的做法】

## Tag 规范

【填写】项目是否使用 tag：

### 版本 Tag

【填写】如果使用 tag，遵循什么规范：

```
【填写示例 - 语义化版本】
v1.0.0
v1.2.3
v2.0.0-beta.1

【或填写】
release/1.0
release/1.1
```

**规则**:
- [ ] 遵循语义化版本（SemVer）: `v主版本.次版本.修订版本`
- [ ] 【填写你项目的规范】

### 发版流程

【填写】如何创建 release 版本：

```
【填写示例】
1. 从 main 创建 release/1.1.0 分支
2. 更新版本号和 CHANGELOG
3. 提交 PR，进行 review
4. merge 到 main
5. 创建 tag: git tag v1.1.0
6. 推送 tag: git push origin v1.1.0
7. GitHub 自动创建 Release
```

## 日常操作建议

【填写】一些最佳实践：

- [ ] 定期更新本地分支（`git fetch`、`git pull`）
- [ ] 提交前先运行测试和 linter
- [ ] 避免强制推送（`git push --force`）除非你知道你在做什么
- [ ] 使用 `.gitignore` 避免提交不应该的文件
- [ ] 【填写你项目的建议】

## 常见问题

【填写】项目中常见的 Git 问题：

### Q: 怎么撤销最后一次提交？
【填写】答案

### Q: 怎么修改已经推送的提交信息？
【填写】答案

### 【更多 FAQ】
【填写】

---

**相关链接**：
- 代码规范 → [[code-standards|代码规范]]
- 命名规范 → [[naming-conventions|命名规范]]
