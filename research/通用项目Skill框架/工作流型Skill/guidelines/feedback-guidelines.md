# 反馈指南

> 如何撰写高质量、有建设性的 Code Review 反馈

## 🎯 目标

好的反馈应该：
- ✅ **清晰明确** - 说明了问题是什么
- ✅ **有建设性** - 提供了改进方案
- ✅ **尊重友善** - 承认好的地方，礼貌地指出问题
- ✅ **可操作** - 给出了具体的改进步骤

## 📋 反馈要素检查表

在撰写反馈时，检查是否包含了这些要素：

### 1. 说明问题

**必须回答这个问题**：这是什么问题？

```
❌ 不清楚的反馈
"This doesn't look right."

✅ 清晰的反馈
"This function doesn't handle the case when the API returns an error.
If the API fails, the user will see a blank screen with no error message."
```

### 2. 说明为什么是问题

**应该回答这个问题**：为什么这很重要？

```
❌ 只指出问题
"This function is too long."

✅ 解释为什么
"This function is 150 lines long and does multiple things:
1. Validates input
2. Calls API
3. Updates state
4. Shows error message

This makes it hard to test and understand. I recommend splitting it
into smaller functions with single responsibilities."
```

### 3. 提供改进建议

**最好有建议**：如何改进？

```
❌ 没有建议
"This variable name is confusing."

✅ 有改进建议
"The variable name 'u' is too short and unclear.
Consider renaming to 'username' to match the naming conventions."
```

### 4. 给出代码示例（可选但推荐）

当涉及代码改变时，提供示例会很有帮助：

```
❌ 没有代码示例
"Use optional chaining instead of nested conditions."

✅ 有代码示例
"Use optional chaining to simplify this:

Current:
if (user && user.profile && user.profile.email) {
  // ...
}

Better:
if (user?.profile?.email) {
  // ...
}"
```

---

## 💬 反馈示例

### 例子 1: 小的代码规范问题

```
🟡 Consider renaming 'x' to 'count' for clarity.

Variable names should describe what they represent.
This matches our naming conventions.
```

### 例子 2: 缺少错误处理

```
🔴 This function doesn't handle API errors.

If the API call fails, the user will see a blank page.
Consider:

try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  setError('Failed to load data. Please try again.');
  logger.error('API error:', error);
}
```

### 例子 3: 性能问题

```
🟡 This component might have performance issues due to frequent re-renders.

The 'filtered' variable is created in JSX on every render:

Current:
const filtered = items.filter(item => item.active);
<ItemList items={filtered} />

Better:
const filtered = useMemo(() =>
  items.filter(item => item.active)
, [items]);
<ItemList items={filtered} />

This ensures the filter only runs when 'items' changes.
```

### 例子 4: 认可好的做法

```
✅ Great job on the error handling!

The try-catch block properly handles failures,
and the error message is user-friendly.
This is exactly what we need.

Small suggestion:
You could also log errors for monitoring:
logger.error('Failed to fetch:', error);
```

### 例子 5: 安全问题

```
🔴 This could have an XSS vulnerability.

Directly inserting user input into HTML is dangerous:

Current (unsafe):
<div dangerouslySetInnerHTML={{ __html: userContent }} />

Safe alternative:
<div>{userContent}</div>

React automatically escapes text content, preventing XSS.

If you need to render HTML, sanitize first:
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userContent);
<div dangerouslySetInnerHTML={{ __html: clean }} />
```

---

## 🎨 反馈的三种类型

### 类型 1: 必须修复（Blocking）

```
🔴 BLOCKING: [问题描述]

[为什么这是个问题]

Please fix this before merging.

[改进建议]
```

**使用场景**：
- 会导致 bug 或程序崩溃
- 安全漏洞
- 违反了重要规范
- 会影响其他功能

### 类型 2: 应该修复（Should Fix）

```
🟡 Should fix: [问题描述]

[为什么这很重要]

Suggestion:
[改进建议]
```

**使用场景**：
- 不符合规范
- 可以优化性能
- 代码可以更清晰

### 类型 3: 可选建议（Nice to Have）

```
💡 Suggestion: [问题描述]

This would improve readability/performance/maintainability.

Consider:
[改进建议]

(This is optional - up to you!)
```

**使用场景**：
- 风格偏好
- 代码可以更优雅
- 可选的改进

---

## ❌ 反馈反面例子

### 不好的反馈 1: 傲慢、不尊重

```
❌ This is bad code. You should know better.
```

**问题**：傲慢，没有建设性

✅ **改进**：
```
I see a few things that could be improved here:
1. This variable name is unclear
2. Missing error handling
3. Consider using arrow functions

Let me know if you have questions!
```

### 不好的反馈 2: 含糊其辞

```
❌ This doesn't look right.
```

**问题**：不清楚什么有问题

✅ **改进**：
```
This function doesn't handle the error case.
If the API fails, the user sees a blank screen.

Please add error handling:
[code example]
```

### 不好的反馈 3: 只批评，没有建议

```
❌ The variable name is bad.
```

**问题**：指出问题但没有帮助

✅ **改进**：
```
Consider renaming 'x' to 'count' for clarity.
This matches our naming conventions and makes the code easier to understand.
```

### 不好的反馈 4: 风格偏好当作规则

```
❌ I don't like this code style.
It's not how I would write it.
```

**问题**：个人偏好，不是规则

✅ **改进**：
```
According to our style guide, arrow functions are preferred.

Current:
function getData() { }

Preferred:
const getData = () => { }
```

---

## 🌟 最佳实践

### 1. 认可好的地方

```
✅ Great work on the validation logic!
The error messages are user-friendly.

Just one suggestion:
Consider adding a loading state while validating.
```

### 2. 解释"为什么"

```
✅ Instead of:
"Add error handling"

Better:
"Add error handling so the user sees a helpful message
instead of a blank screen when the API fails"
```

### 3. 提供替代方案

如果你指出了问题，给出改进方案：

```
❌ 没有替代方案
"Don't use for loop"

✅ 有替代方案
"Instead of a for loop, consider using 'map' or 'filter':

Current:
for (let i = 0; i < items.length; i++) {
  result.push(items[i].name);
}

Better:
const names = items.map(item => item.name);"
```

### 4. 使用友善的语气

```
❌ Harsh
"This is wrong"

✅ Friendly
"This won't work in this case. Consider..."
```

---

## ⚖️ 平衡：何时要求修改，何时建议

### Request Changes（必须修改）：

- [ ] 安全问题
- [ ] 会导致 bug 的逻辑错误
- [ ] 违反了关键规范
- [ ] 会影响其他功能

### Approve（可以合并，有可选建议）：

- [ ] 代码可以工作，但可以优化
- [ ] 没有安全问题
- [ ] 符合规范，只是风格建议

### 示例判断：

```
问题：变量名 'x' 不清晰
级别：🟡 Should Fix (如果你认为这很重要)
     或 🟢 Nice to Have (如果这是风格问题)

问题：缺少错误处理，会导致崩溃
级别：🔴 Blocking (必须修复)
```

---

## 📚 参考

- [[../templates/feedback-examples|反馈示例 - 更多例子]]
- [[../SKILL|回到 Code Review Skill 首页]]

---

**记住**：

> 好的 Code Review 不是说"不"，而是说"我们如何一起让代码更好"。
