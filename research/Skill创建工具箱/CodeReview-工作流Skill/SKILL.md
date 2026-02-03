# Code Review 工作流 Skill

**系统化的代码审查流程，确保代码质量、规范一致、无重大风险。**

---

## 🎯 这个工作流做什么

这是一个**5 步顺序工作流**，帮助你高效地完成代码审查：

- ✅ 理解需求和改动范围
- ✅ 检查代码规范遵守情况
- ✅ 检查代码逻辑和 bug
- ✅ 检查改动的影响范围
- ✅ 汇总反馈意见

## 📊 工作流全景

```
PR 到达
   ↓
Step 1: 理解需求 (5 min)
   ↓
Step 2: 检查规范 (10 min)
   ↓
Step 3: 检查逻辑 (15 min)
   ↓
Step 4: 检查影响 (5 min)
   ↓
Step 5: 整理反馈 (10 min)
   ↓
发布反馈意见
```

---

## 🚀 快速开始

### 我要进行代码审查，怎么做？

1. **打开** [[workflow/step1-understand-requirement|第 1 步：理解需求]]
2. **依次执行** Step 2、3、4、5
3. **参考** [[templates/feedback-template|反馈模板]] 汇总意见
4. **发布** 反馈意见

---

## 📋 工作流概览

| 步骤 | 标题 | 用途 | 检查清单 | 耗时 |
|-----|------|-----|--------|------|
| **Step 1** | 理解需求 | 了解改动背景和范围 | [[standards/step1-checklist\|Step 1 清单]] | 5 min |
| **Step 2** | 检查规范 | 验证代码是否遵守规范 | [[standards/step2-checklist\|Step 2 清单]] | 10 min |
| **Step 3** | 检查逻辑 | 发现逻辑错误和 bug | [[standards/step3-checklist\|Step 3 清单]] | 15 min |
| **Step 4** | 检查影响 | 评估改动的影响范围 | [[standards/step4-checklist\|Step 4 清单]] | 5 min |
| **Step 5** | 整理反馈 | 汇总反馈，分级输出 | [[standards/step5-checklist\|Step 5 清单]] | 10 min |

---

## 📚 核心资源

### 📖 工作流步骤

- [[workflow/step1-understand-requirement|Step 1：理解需求]]
- [[workflow/step2-check-standards|Step 2：检查规范]]
- [[workflow/step3-check-logic|Step 3：检查逻辑]]
- [[workflow/step4-check-impact|Step 4：检查影响]]
- [[workflow/step5-compile-feedback|Step 5：整理反馈]]

### 📋 检查清单

- [[standards/step1-checklist|Step 1 清单：理解需求]]
- [[standards/step2-checklist|Step 2 清单：检查规范]]
- [[standards/step3-checklist|Step 3 清单：检查逻辑]]
- [[standards/step4-checklist|Step 4 清单：检查影响]]
- [[standards/step5-checklist|Step 5 清单：整理反馈]]

### 📖 指南和原则

- [[guidelines/overview|工作流原则总览]]
- [[guidelines/feedback-guidelines|反馈撰写原则]]
- [[guidelines/severity-levels|问题分级标准]]

### 📝 反馈模板

- [[templates/feedback-template|反馈意见模板]]
- [[templates/examples|好反馈的示例]]

---

## 🔗 引用的规范（知识库 Skill）

这个工作流引用你的知识库 Skill 中的以下内容：

- 代码规范
- 命名规范
- 最佳实践
- 安全指南

当进行代码审查时，会在各个步骤中引用这些规范。

---

## 💡 反馈原则

所有反馈都应该遵循：

- ✅ **具体** - 说明具体问题在哪
- ✅ **建设性** - 提出改进建议
- ✅ **尊重** - 用友好的语气
- ✅ **有根据** - 引用规范或最佳实践
- ✅ **有优先级** - 区分 🔴 Blocking / 🟡 Warning / 🟢 Info

---

## 🎯 高效审查的 5 个原则

1. **及时审查** - 24 小时内回复
2. **专注审查** - 不分心，彻底审查
3. **尊重互重** - 友善和尊重的态度
4. **清晰反馈** - 让 author 容易理解
5. **学会妥协** - 不过度完美主义

---

## ✅ 审查 Checklist

在发布反馈前，检查：

- [ ] 我遵循了所有 5 个步骤
- [ ] 我有具体的反馈意见
- [ ] 我的反馈是建设性的
- [ ] 我引用了相关规范
- [ ] 我用了正确的分级（🔴🟡🟢）
- [ ] 反馈清晰易理解

---

## 🚀 现在就开始

打开 [[workflow/step1-understand-requirement|第 1 步：理解需求]]，开始你的代码审查吧！

祝你审查愉快！👍
