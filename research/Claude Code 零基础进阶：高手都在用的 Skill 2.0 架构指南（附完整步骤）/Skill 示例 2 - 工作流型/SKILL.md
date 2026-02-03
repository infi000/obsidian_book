---
name: code-review-assistant
description: 代码审查助手。帮助团队进行高效的代码审查，检查代码质量、安全性、性能。当需要审查 PR 或检查代码时使用。
---

# 🔍 代码审查助手

欢迎使用代码审查助手！这是一个完整的代码审查工作流，帮助你进行系统化的高质量代码审查。

---

## 📋 代码审查流程

请严格按照以下步骤执行代码审查：

| 步骤 | 说明 | 详细指引 |
|------|------|--------|
| 1️⃣ | 理解需求和上下文 | [workflow/step1-understand-context.md](workflow/step1-understand-context.md) |
| 2️⃣ | 检查代码质量 | [workflow/step2-check-code-quality.md](workflow/step2-check-code-quality.md) |
| 3️⃣ | 检查安全性和性能 | [workflow/step3-check-security-and-performance.md](workflow/step3-check-security-and-performance.md) |
| 4️⃣ | 整理反馈意见 | [workflow/step4-compile-feedback.md](workflow/step4-compile-feedback.md) |
| 5️⃣ | 最终检查和反馈 | [workflow/step5-final-review.md](workflow/step5-final-review.md) |

---

## 📚 参考资料

### 检查清单和规范
- **代码规范清单** → [standards/code-quality-checklist.md](standards/code-quality-checklist.md)
- **安全性检查清单** → [standards/security-checklist.md](standards/security-checklist.md)
- **性能优化清单** → [standards/performance-checklist.md](standards/performance-checklist.md)

### 反馈模板
- **审查反馈模板** → [templates/review-feedback-template.md](templates/review-feedback-template.md)
- **审查评论示例** → [templates/comment-examples.md](templates/comment-examples.md)

### 团队规范
- **审查标准** → [rules/review-standards.md](rules/review-standards.md)
- **反馈指南** → [rules/feedback-guidelines.md](rules/feedback-guidelines.md)

---

## 🎯 快速开始

### 审查新 PR

直接告诉我以下信息：

```
PR 链接: https://github.com/...
审查焦点: (代码质量/安全性/性能/全面审查)
额外上下文: (可选)
```

**我会为你：**
1. ✅ 理解 PR 的目的和修改
2. ✅ 逐一检查代码质量、安全性、性能
3. ✅ 整理专业的审查反馈
4. ✅ 提供改进建议

---

## 📊 审查优先级

### 必须关注（Blocking）

- 🔴 安全漏洞
- 🔴 关键性能问题
- 🔴 违反架构规范
- 🔴 可能导致 bug 的逻辑错误

### 应该改进（Should Fix）

- 🟡 代码规范违反
- 🟡 可读性问题
- 🟡 缺少测试
- 🟡 潜在的性能问题

### 可以建议（Nice to Have）

- 🟢 代码风格偏好
- 🟢 优化建议
- 🟢 最佳实践参考

---

## ⚠️ 重要原则

- 📖 在开始审查前，必须读 [rules/review-standards.md](rules/review-standards.md)
- 💬 在开始整理反馈前，必须读 [rules/feedback-guidelines.md](rules/feedback-guidelines.md)
- 🎯 反馈应该建设性，而非批评性
- 📝 提供具体示例和改进方案，而非仅指出问题

---

## 🔄 审查循环

审查并非单向的，应该进行互动：

1. **初始审查** → 提出反馈
2. **作者修改** → 根据反馈改进
3. **再次审查** → 确认改进
4. **最终批准** → 合并到主分支

祝你进行高质量的代码审查！🚀
