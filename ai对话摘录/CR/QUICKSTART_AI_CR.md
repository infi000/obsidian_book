# 🚀 AI Code Review 系统 - 快速启动指南

**目标**：让团队快速上手 AI CR 系统
**目标读者**：开发者、Reviewer
**所需时间**：5 分钟阅读 + 第一次运行 10 分钟

---

## 快速问答

**Q: AI CR 能做什么？**
A: 自动审查你的代码，检查是否遵循项目规范、有无业务逻辑问题、是否有重复代码等

**Q: 我的代码会被发送到哪里？**
A: 上传到公司的 Claude 代理（内网部署），不会上传到公网

**Q: 是否会拖慢我的提交？**
A: 不会，AI CR 是异步的，不会阻止提交

**Q: 我可以忽视 AI 的建议吗？**
A: 可以，AI 只是辅助，最终决定权在你和 Reviewer

---

## 场景 1：自动 CR（推荐）

### 第一次设置（5 分钟）

```bash
# 1. 进入项目目录
cd your-project

# 2. 启用 AI CR Hook（一次性）
npm run setup:ai-cr

# 或者手动：
cp scripts/ai-cr-hook.sh .git/hooks/post-commit
chmod +x .git/hooks/post-commit
```

### 日常使用

```bash
# 1. 正常提交代码
git add .
git commit -m "fix: 修复告警记录列表加载"

# 2. 自动看到 AI CR 报告（10-30 秒后）
# ===== AI Code Review Report =====
# 📋 Summary: 2 issues found
# 🔴 Critical: 0
# 🟡 Medium: 2
# 🟢 Tips: 1
#
# More details in: .ai-cr-report.md

# 3. 查看详细报告
cat .ai-cr-report.md

# 4. 根据建议修改代码（或忽略）
# ... 修改代码 ...

# 5. 再次提交
git add .
git commit -m "fix: 修复 reducer 中直接修改状态的问题"
```

---

## 场景 2：手动 CR（详细审查）

### 审查某个分支的改动

```bash
# 1. Reviewer 运行此命令
claude-code-review \
  --branch feature/alarm-optimization \
  --target master \
  --full-report

# 2. 交互菜单会出现：
#
# ╔═══════════════════════════════════╗
# ║  AI Code Review - Interactive     ║
# ╠═══════════════════════════════════╣
# ║ 1. View Full Report               ║
# ║ 2. View Issues by Priority        ║
# ║ 3. View Specific Issue Detail     ║
# ║ 4. Update Review Standards        ║
# ║ 5. Export Report as PDF           ║
# ║ Q. Quit                           ║
# ╚═══════════════════════════════════╝
#
# Enter choice: 1

# 3. 浏览详细报告并做决策
```

---

## 常见问题处理

### 问题：某个建议不合理怎么办？

**记录下来**，在 PR 评论中提出，AI 会学习改进：

```markdown
# PR 评论示例
> AI 建议：改用 useTableScrollX Hook
> 不合适，因为这个表格只在某个特殊场景需要，不建议复用

@reviewer: AI CR 在这里给出了过度设计的建议，已忽略
```

---

### 问题：规范文档不准确怎么办？

在 CR 报告中直接反馈，标记为"规范问题"：

```markdown
# 反馈示例
问题 #3：规范说 selector 必须用 createSelector，但旧代码中有许多地方没有用
-> 建议更新规范：允许简单 selector 不用 createSelector
```

---

### 问题：没看到 AI CR 报告怎么办？

```bash
# 1. 检查 git hook 是否启用
cat .git/hooks/post-commit

# 2. 手动运行 AI CR
npm run ai-cr:check

# 3. 查看报告
cat .ai-cr-report.md
```

---

## AI CR 报告解读

### 标准的报告长什么样？

```markdown
# 🔍 AI Code Review Report

## 📋 Summary
- 总问题数：5
- 关键问题 🔴：2 个（必须修改）
- 中等问题 🟡：2 个（建议修改）
- 建议项 🟢：1 个（可选）

## 🔴 关键问题
### 问题 #1：Reducer 直接修改 state
📍 位置：src/containers/AlarmRecord/reducer.tsx:95
❌ 错误代码：state.searchCondition = action.payload
✅ 正确做法：return state.set('searchCondition', fromJS(action.payload))
```

### 解读方式

| 标记 | 含义 | 你应该... |
|------|------|---------|
| 🔴 P0 | 关键问题，违反核心规范 | **必须修改** |
| 🟡 P1 | 中等问题，代码质量不够 | **建议修改** |
| 🟢 P2 | 优化建议，可选项 | 根据时间考虑 |

---

## 规范速查

### 最容易犯的 5 个错误

**❌ 错误 1：Reducer 直接修改 state**

```typescript
// 错误
state.data = action.payload;
return state;

// 正确
return state.set('data', fromJS(action.payload));
```

**❌ 错误 2：Saga 没有 try-catch**

```typescript
// 错误
const response = yield call(fetchAPI);
yield put(action);

// 正确
try {
  const response = yield call(fetchAPI);
  yield put(action);
} catch (error) {
  yield put(errorAction);
}
```

**❌ 错误 3：Selector 每次创建新对象**

```typescript
// 错误
export const selectData = (state) => ({
  data: state.get('data'),
});

// 正确
export const selectData = createSelector(
  [selectState],
  (state) => ({ data: state.get('data') })
);
```

**❌ 错误 4：没有检查 API 响应**

```typescript
// 错误
case ACTION:
  return state.set('data', action.payload.data.list);

// 正确
case ACTION:
  if (action?.payload?.data?.list) {
    return state.set('data', fromJS(action.payload.data.list));
  }
  return state;
```

**❌ 错误 5：重复开发已有组件**

```typescript
// 错误：创建新的选择器组件
export function StatusSelector() { /* ... */ }

// 正确：使用现有组件
import { EnumSelect } from 'src/components/EnumSelect';
```

---

## 我应该相信 AI 的建议吗？

### ✅ 可以相信的建议

- 规范偏离（比如 Reducer 写法）
- 常见错误模式（比如缺少 null check）
- 重复代码警告
- 遗留的调试代码（console.log）

### ⚠️ 需要仔细核实的建议

- 复杂的业务逻辑问题
- 性能优化建议（有时会过度优化）
- 架构设计建议

### ❌ 可以忽略的建议

- 个人编码风格（不影响功能）
- 过度设计的优化建议
- 与你的 Reviewer 意见矛盾的建议

**原则**：如果不确定，就问 Reviewer！

---

## 最佳实践

### 1. 理解规范

在第一次使用前，**花 10 分钟阅读** `REVIEW_STANDARDS.md`，这样更容易理解 AI 的建议

### 2. 及时反馈

如果发现 AI 的建议有问题，在 PR 中直接反馈，帮助系统改进

### 3. 学习成长

不要只是被动地接收 AI 的建议，**思考为什么**这样做更好，逐步提升你的编码水平

### 4. 定期复查

每个月花 5 分钟查看 AI CR 的进展和规范演变，保持对项目规范的了解

---

## 快速命令参考

```bash
# 设置 AI CR Hook（首次）
npm run setup:ai-cr

# 手动运行 AI CR
npm run ai-cr:check

# 查看最近的 AI CR 报告
cat .ai-cr-report.md

# 查看所有报告历史
ls -la .ai-cr-reports/

# 更新规范文档
npm run ai-cr:update-standards

# 禁用某次 CR（如果网络不好）
git commit --no-verify

# 获取帮助
npm run ai-cr:help
```

---

## 遇到问题？

| 问题 | 解决方案 |
|------|--------|
| 没看到 AI CR 报告 | `npm run ai-cr:check` 手动运行 |
| 报告说法不对 | 在 PR 或 issue 中反馈 |
| 想要更详细的报告 | 运行 `claude-code-review` 命令 |
| 想禁用 AI CR | 编辑 `.git/hooks/post-commit` |
| 想改进规范 | 在反馈中说明，下周更新 |

---

## 下一步

1. ✅ **理解规范**：阅读 `REVIEW_STANDARDS.md` (15 分钟)
2. ✅ **设置 Hook**：运行 `npm run setup:ai-cr` (2 分钟)
3. ✅ **试用一次**：提交代码，看 AI CR 报告 (5 分钟)
4. ✅ **参与试点**：2-3 周内给反馈和改进建议

---

**版本**：1.0
**更新时间**：2026-01-21
**联系方式**：在项目中反馈或提问
