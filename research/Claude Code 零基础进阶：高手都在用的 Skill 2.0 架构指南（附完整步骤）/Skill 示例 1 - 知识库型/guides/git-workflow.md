# Git 工作流

## 分支管理规范

### 分支类型

```
main                    # 生产分支（只能通过 PR 合并）
  ├── develop          # 开发分支（集成分支）
  ├── feature/*        # 功能分支
  ├── bugfix/*         # 修复分支
  └── hotfix/*         # 热修复分支
```

### 分支命名

```
✅ 正确的分支名
feat/user-authentication      # 功能：用户认证
feat/add-dark-mode            # 功能：添加深色模式
fix/login-form-validation     # 修复：登录表单验证
hotfix/critical-api-bug       # 热修复：关键 API 错误

❌ 错误的分支名
feature_user_auth             # ❌ 用下划线而非斜杠
addDarkMode                    # ❌ 没有前缀
fix_bug                        # ❌ 太模糊
WIP-something                  # ❌ 没有类型前缀
```

**规则**：
- 🔴 MUST：分支名格式 `type/description`
- 🔴 MUST：使用小写和连字符（kebab-case）
- 🟡 SHOULD：分支名自描述，20 字以内

---

## 提交规范

### Commit Message 格式

遵循 [Conventional Commits](https://www.conventionalcommits.org/)

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 详细示例

```
✅ 好的 commit message：

feat(auth): add login form validation

- Add required field validation
- Add email format validation
- Show error messages to users
- Add unit tests for validators

Closes #123

❌ 不好的 commit messages：

"fix stuff"                     # ❌ 太模糊
"WIP"                          # ❌ 不完整
"asdfjkl; fix"                 # ❌ 垃圾信息
"Update components"            # ❌ 没有类型和范围
```

### Commit Types

| Type | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat(auth): add login form` |
| `fix` | 修复 bug | `fix(form): handle validation error` |
| `docs` | 文档更新 | `docs: add setup instructions` |
| `style` | 代码格式（不改逻辑） | `style: format code with prettier` |
| `refactor` | 重构（不改功能） | `refactor(api): simplify error handling` |
| `perf` | 性能优化 | `perf: memoize expensive component` |
| `test` | 添加或更新测试 | `test: add validation tests` |
| `chore` | 依赖、配置更新 | `chore: upgrade dependencies` |
| `ci` | CI/CD 配置 | `ci: update github workflow` |

### Commit 规范

```
✅ 规范的 commit 记录

commit 1: feat(auth): implement login form
commit 2: feat(auth): add form validation
commit 3: test(auth): add login tests
commit 4: fix(auth): handle token refresh error
commit 5: docs: update auth documentation

❌ 不规范的 commit 记录

commit 1: "WIP"
commit 2: "更新了一些东西"
commit 3: "fix"
commit 4: "试试这个"
commit 5: "最终版本"
```

**规则**：
- 🔴 MUST：使用 `type(scope): subject` 格式
- 🔴 MUST：Subject 首字母小写，不以句号结尾
- 🟡 SHOULD：Body 清晰解释为什么做这个改动
- 🟡 SHOULD：一个 commit 只做一个逻辑改动

---

## 代码审查流程

### Pull Request 规范

1. **创建 PR**

```bash
git checkout -b feat/user-profile
# 开发功能
git add .
git commit -m "feat(profile): add user profile page"
git push origin feat/user-profile
```

2. **PR 标题和描述**

```markdown
# PR Title (应该和首个 commit 一致)
feat(profile): add user profile page

## Description

Implement user profile page with the following features:
- Display user basic information
- Show user's recent activities
- Allow editing profile information

## Related Issue
Closes #456

## Testing

- [x] Unit tests added
- [x] Tested in Chrome, Firefox, Safari
- [x] Mobile responsive checked

## Screenshots (if UI changes)

Before:
[screenshot]

After:
[screenshot]
```

3. **PR 检查清单**

- [ ] 代码符合规范（运行 eslint、prettier）
- [ ] 添加了测试代码
- [ ] 更新了相关文档
- [ ] 没有留下 console.log 或 debugger
- [ ] 没有硬编码的敏感信息
- [ ] 本地测试通过
- [ ] 不会破坏其他功能

### Code Review 反馈

```
✅ 好的 review 反馈：

"This implementation could be more efficient by using useMemo here.
See https://react.dev/reference/react/useMemo for details."

❌ 不好的反馈：

"不行"
"我不喜欢这样"
"改一下"
```

**规则**：
- 🟡 SHOULD：反馈要建设性和有具体建议
- 🟡 SHOULD：指出问题的同时提供解决方案
- 🟡 SHOULD：尊重作者，用讨论而非命令语气

---

## 合并策略

### 推荐：Squash and Merge

```bash
# 开发过程中可以有多个 commit
git commit -m "WIP: add form"
git commit -m "fix: handle validation"
git commit -m "test: add tests"

# Squash 合并时，这些 commit 会被合并成一个
# 提交历史保持整洁
```

### 合并前检查

- ✅ 所有 CI 检查通过
- ✅ 至少一个 code review 通过
- ✅ 没有冲突，或冲突已解决
- ✅ 分支最新（已 rebase main）

