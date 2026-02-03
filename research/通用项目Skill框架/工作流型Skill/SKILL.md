# Code Review Skill（工作流型）

这是一个**代码审查工作流 Skill**，帮助团队进行系统、高效、一致的代码审查。

## 🎯 Skill 的功能

这个 Skill 帮助你：
- 🔍 按照系统的 5 步流程进行代码审查
- ✅ 检查代码是否符合规范
- 🐛 发现潜在的 bug 和逻辑问题
- 💡 识别功能影响和副作用
- 💬 撰写清晰、有建设性的反馈

## 🚀 快速开始

### 如何使用这个 Skill？

1. **收到一个 Pull Request 后**，打开这个 Skill
2. **按照 5 步流程** 逐一检查代码
3. **参考检查清单**，确保没有遗漏
4. **查看反馈指南**，撰写高质量反馈
5. **提交审查意见**，帮助开发者改进

## 📋 Code Review 的 5 步流程

| 步骤 | 内容 | 时间 |
|-----|-----|------|
| **Step 1** | 理解上下文和需求 | [[step1-understand-context\|查看详情]] | 5 min |
| **Step 2** | 检查代码是否符合规范 | [[step2-check-standards\|查看详情]] | 10 min |
| **Step 3** | 检查代码质量和安全/性能 | [[step3-check-security-and-performance\|查看详情]] | 15 min |
| **Step 4** | 整理反馈意见 | [[step4-compile-feedback\|查看详情]] | 5 min |
| **Step 5** | 最终检查和提交反馈 | [[step5-final-review\|查看详情]] | 2 min |

**总耗时：约 30-40 分钟**

## 📌 快速导航

### 我是代码审查新手，怎么开始？
1. 先读 [[step1-understand-context|第 1 步：理解上下文]]
2. 然后按顺序读完 5 步流程
3. 每一步都参考对应的检查清单

### 我急着审查代码，有快速版本吗？
1. 快速检查 [[standards/code-quality-checklist|代码质量清单]]（3 min）
2. 快速检查 [[standards/security-checklist|安全清单]]（3 min）
3. 完成！提交反馈

### 我只想检查特定方面

| 想检查 | 查看 |
|-------|------|
| 代码是否符合规范？ | [[standards/code-quality-checklist]] |
| 有没有安全问题？ | [[standards/security-checklist]] |
| 怎么写反馈？ | [[guidelines/feedback-guidelines]] |
| 反馈示例 | [[templates/feedback-examples]] |

## 🔗 关联的知识库 Skill

这个 Code Review Skill **引用**知识库 Skill 中的规范：

- **代码规范** ← [[../../知识库型Skill/standards/code-standards|从知识库中查看]]
- **命名规范** ← [[../../知识库型Skill/standards/naming-conventions|从知识库中查看]]
- **最佳实践** ← [[../../知识库型Skill/best-practices/overview|从知识库中查看]]
- **安全检查** ← [[../../知识库型Skill/best-practices/security-checklist|从知识库中查看]]

### 重要提示
进行 Code Review 时，你会参考这两个 Skill：
- 📖 **知识库 Skill** - 查看具体的规范和最佳实践
- 🔍 **Code Review Skill** - 按照工作流进行审查

---

## 📊 审查类型和预期时间

| 审查类型 | 代码行数 | 预期时间 |
|---------|---------|--------|
| 快速审查（安全修复、小改动） | <50 行 | 5-10 min |
| 标准审查（新功能、重构） | 50-300 行 | 20-40 min |
| 深度审查（关键模块、架构改动） | 300+ 行 | 60+ min |

### 审查前检查
- [ ] 我有充足的时间进行认真的审查吗？（不要在匆忙中审查）
- [ ] 我了解相关的代码背景吗？（需要的话先看 Issue 和 PR 描述）
- [ ] 我清晰吗？（有疑问就问）

---

## ✅ 完整检查清单

### 每个 Code Review 都应该检查

- [ ] **规范符合性** - 代码遵循规范吗？[[standards/code-quality-checklist]]
- [ ] **逻辑正确性** - 代码逻辑有 bug 吗？[[step3-check-security-and-performance]]
- [ ] **安全问题** - 有安全隐患吗？[[standards/security-checklist]]
- [ ] **功能影响** - 会影响其他功能吗？[[step4-compile-feedback]]

---

## 💡 Best Practices

### Code Review 的黄金规则

1. ✅ **专业且友善** - 提供建设性反馈，不要人身攻击
2. ✅ **清晰明确** - 说明为什么，而不仅仅说什么不对
3. ✅ **及时完成** - 尽快提交反馈，不要拖延
4. ✅ **不要完美主义** - 专注于重要问题，小问题可以指出但不必阻挡 merge
5. ✅ **学习分享** - 把 Review 当成教学机会，而不是检验

### 常见审查误区

- ❌ 在没有理解上下文的情况下就开始审查
- ❌ 过于严格，拒绝所有你不会写的代码
- ❌ 只指出问题，不提供解决建议
- ❌ 审查太久，导致反馈不及时
- ❌ 只专注于代码风格，忽略逻辑和功能

---

## 📚 使用流程图

```
收到 PR
    ↓
📖 Step 1: 理解上下文（5 min）
    ↓
✅ Step 2: 检查规范符合性（10 min）
    ↓
🔍 Step 3: 检查质量/安全/性能（15 min）
    ↓
💬 Step 4: 整理反馈（5 min）
    ↓
📋 Step 5: 最终检查和提交（2 min）
    ↓
✨ 完成！PR 已审查
```

---

## 🎯 你的目标

- ✅ 确保代码符合规范
- ✅ 防止 bug 进入生产
- ✅ 维护代码质量
- ✅ 帮助团队成员学习最佳实践
- ✅ 保持高效的审查流程

---

## 现在就开始吧！👇

准备好审查代码了吗？

→ **打开 [[step1-understand-context|第 1 步：理解上下文]]**

---

**问题？**
- [[guidelines/feedback-guidelines|查看反馈指南]]
- [[templates/feedback-examples|查看反馈示例]]
- 问团队 Lead
