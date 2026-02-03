# Step 4: 整理反馈

Code Review 的第四步是**将所有发现的问题整理成清晰、有建设性的反馈**。

⏱️ **预期时间：5 分钟**

## 🎯 目标

在这一步，你需要：
- ✅ 将发现的所有问题分类
- ✅ 按照严重程度排序
- ✅ 撰写清晰、有建设性的反馈
- ✅ 提供改进建议

## 📋 问题分类

### 严重程度分类

#### 🔴 Blocking（必须修复）

这些问题会导致 bug 或安全问题，**必须修复才能 merge**：

- 会导致程序崩溃
- 安全漏洞
- 逻辑错误（会产生错误结果）
- 破坏向后兼容性
- 会影响其他功能

**怎么说**：
```
❌ This will cause a crash if items is empty.
Please add a null check before accessing items[0].
```

#### 🟡 Should Fix（应该修复）

这些问题不会导致 bug，但不符合规范或最佳实践，**应该修复**：

- 不符合代码规范
- 性能可以优化
- 边界情况处理不完整
- 代码可以更清晰

**怎么说**：
```
⚠️ This component is re-rendering too frequently.
Consider memoizing this calculation with useMemo.
```

#### 🟢 Nice to Have（建议改进）

这些是可选的改进建议，不一定要改：

- 代码可以更优雅
- 可以用更新的特性
- 风格偏好

**怎么说**：
```
💡 Consider using optional chaining instead of this nested condition.
This would make the code more readable.
```

### 问题类型分类

| 类型 | 例子 | 分类 |
|-----|-----|------|
| **Bug** | 逻辑错误会导致崩溃 | 🔴 Blocking |
| **安全** | XSS 或 SQL 注入风险 | 🔴 Blocking |
| **规范** | 变量名不清晰 | 🟡 Should Fix |
| **性能** | 不必要的重渲染 | 🟡 Should Fix |
| **可读性** | 代码可以更清晰 | 🟢 Nice to Have |
| **最佳实践** | 应该使用 newer API | 🟢 Nice to Have |

## 📝 反馈模板

### 格式 1: 简单问题

```
【严重程度】问题描述

【建议】如何改进
```

**示例**：
```
🔴 Variable 'u' is too short and unclear.

Please rename to 'username' to match naming conventions.
```

### 格式 2: 复杂问题

```
【严重程度】问题描述

为什么这是个问题：
[解释为什么这很重要]

建议：
[提供改进方案，最好有代码示例]
```

**示例**：
```
🟡 This function doesn't handle the case when the API returns an error.

Why: If the API fails, the user sees a blank page with no error message.
This is a bad user experience.

Suggest:
Try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  setError('Failed to load data. Please try again.');
}
```

### 格式 3: 提供改进代码

```
【严重程度】问题描述

❌ 当前代码:
[粘贴有问题的代码]

✅ 建议改为:
[提供改进的代码]
```

**示例**：
```
🟡 This list rendering can be slow for large datasets.

❌ Current:
{items.map((item) => <ListItem key={item.id} data={item} />)}

✅ Suggest using virtual scrolling:
<VirtualList
  items={items}
  renderItem={(item) => <ListItem data={item} />}
/>

This will only render visible items, improving performance.
```

## 💬 反馈原则

参考：[[../guidelines/feedback-guidelines|完整反馈指南]]

### ✅ 好的反馈

- 清晰明确 - 说明了什么有问题、为什么有问题
- 建设性 - 提供了改进建议，不只是批评
- 尊重 - 认可做得好的部分，礼貌地指出问题
- 实用 - 给出了可以立即采取的行动

**示例**：
```
✅ Great work on the form validation! 👏

One suggestion: this error message could be more specific.
Instead of "Invalid input", it would be better to show
"Email address must contain @".

This helps users understand what they need to fix.
```

### ❌ 不好的反馈

- 含糊其辞 - "这看起来不对"
- 只是批评 - "代码写得不好"
- 傲慢 - "这是错误的"
- 不实用 - 指出问题但不给建议

**示例**：
```
❌ This is wrong.
Fix it.

---

✅ This logic doesn't handle empty arrays correctly.
When items is empty, accessing items[0] will cause an error.

Please add a check like:
if (items.length === 0) return null;
```

## 📋 整理反馈的步骤

### 1. 列出所有问题

```
遇到的所有问题：
- variable naming issue
- missing error handling
- security issue with dangerouslySetInnerHTML
- performance: re-renders too often
- code could be simpler
```

### 2. 按严重程度分类

```
🔴 Blocking:
- Security: dangerouslySetInnerHTML issue
- Logic: missing error handling

🟡 Should Fix:
- variable naming
- performance issue

🟢 Nice to Have:
- code could be simpler
```

### 3. 逐个撰写反馈

```
🔴 Security issue: dangerouslySetInnerHTML
This could allow XSS attacks if userInput is not sanitized.

Use sanitize library:
```javascript
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);
<div dangerouslySetInnerHTML={{ __html: clean }} />
```

[继续其他反馈...]
```

### 4. 检查反馈

- [ ] 反馈清晰吗？（不会有误解）
- [ ] 给出了建议吗？（不是只批评）
- [ ] 语气是否友善？（不是傲慢）
- [ ] 没有遗漏重要问题吗？

## ✅ 反馈检查清单

在提交反馈前，检查：

- [ ] 每个反馈都说明了 **为什么** 这是个问题
- [ ] 大多数反馈都提供了 **改进建议**
- [ ] 反馈按 **严重程度** 分类了
- [ ] 肯定了 PR 中做得好的部分吗？
- [ ] 语气是否 **友善且尊重**？

---

**下一步**：[[step5-final-review|Step 5 - 最终检查和提交反馈]]
