# 反馈指南

进行代码审查时的沟通原则和最佳实践。

## 📝 反馈原则

### 1. 建设性而非批评性

```markdown
❌ 不好的反馈：
"这个变量名起得太差了"
"这代码写得什么呀"
"这个方式太蠢了"

✅ 好的反馈：
"这个变量名 `d` 不够清晰，建议改为 `userData` 以提高可读性"
"这种实现虽然可行，但有一个潜在的性能问题..."
"这里可以使用 useCallback 来优化性能"
```

**原则**：批评想法，不要批评人。

### 2. 具体而非模糊

```markdown
❌ 不好的反馈：
"代码不好"
"需要改进"
"这样不符合规范"

✅ 好的反馈：
"这个函数 userData 返回 any 类型，建议定义 UserData interface"
"useEffect 的依赖列表缺少 userId，当 userId 改变时不会重新获取数据"
"根据命名规范，React 组件应该使用 PascalCase，建议改为 UserCard.tsx"
```

**原则**：指出具体的问题，而非笼统的说"不好"。

### 3. 解释为什么

```markdown
❌ 不好的反馈：
"改一下这里"
"不要这样写"

✅ 好的反馈：
"这里应该使用 const 而非 let，因为这个变量不会重新赋值。
使用 const 可以防止意外修改，提高代码可读性。"

"建议将这个组件拆分成两个小组件。当前超过 200 行，
不仅难以维护，而且违反了单一职责原则。"
```

**原则**：解释你的建议背后的原因。

### 4. 提供解决方案

```markdown
❌ 不好的反馈：
"这个逻辑有问题"

✅ 好的反馈：
"这个逻辑在处理空数组时可能出错。建议添加防空检查：

\`\`\`typescript
const processItems = (items: Item[]): void => {
  if (!items || items.length === 0) {
    return;
  }
  // 处理逻辑
};
\`\`\`"
```

**原则**：不仅指出问题，还要提供解决方案。

---

## 🎯 不同类型反馈的方式

### Blocking 问题（必须修复）

使用**请求更改**的语气：

```markdown
**🔴 Security Issue: 敏感信息硬编码**

位置: src/api/config.ts:5

这是一个安全问题，必须修复才能合并。

当前代码：
\`\`\`typescript
const API_KEY = 'abc123def456';
\`\`\`

问题：API 密钥被提交到 Git，任何人都可以访问。

建议改为：
\`\`\`typescript
const API_KEY = process.env.VITE_API_KEY;
\`\`\`

并在 .env 文件中配置（该文件已在 .gitignore 中）。
```

### Should Fix 问题（强烈建议）

使用**建议改进**的语气：

```markdown
**🟡 Suggestion: 类型定义不完整**

位置: src/components/Form.tsx:23

建议添加类型定义以提高代码质量和可维护性。

当前代码：
\`\`\`typescript
const handleSubmit = (data: any) => {
  // ...
};
\`\`\`

建议改为：
\`\`\`typescript
interface FormData {
  name: string;
  email: string;
}

const handleSubmit = (data: FormData): void => {
  // ...
};
\`\`\`

这样可以获得更好的类型检查和 IDE 支持。
```

### Nice to Have（可选建议）

使用**参考信息**的语气：

```markdown
**🟢 Reference: 可考虑的优化**

当处理大列表（超过 100 项）时，可以考虑使用 react-window 进行虚拟化，
以提高性能。参考：https://react-window.vercel.app/

这是可选的改进，不影响功能。
```

---

## 💬 语气和用词

### ✅ 推荐用词

```markdown
我的建议是...
考虑...
也许可以...
这里可能...
建议...
为什么不试试...
这样做的好处是...
```

### ❌ 避免的用词

```markdown
你错了
这是错的
不要...
应该...（过于命令）
这样不行
根本不...
```

---

## 📋 反馈检查清单

在提交反馈前问自己：

- [ ] 我的反馈是否建设性？
- [ ] 我是否清晰地解释了问题？
- [ ] 我是否提供了解决方案？
- [ ] 我是否解释了为什么？
- [ ] 我是否尊重了作者？
- [ ] 我的语气是否友好？
- [ ] 我是否指出了做得好的地方？
- [ ] 反馈数量是否合理？(不要太多)

---

## 🎓 学习和成长

### 作为审查者

- 定期阅读其他人的反馈，学习更好的表达方式
- 如果反馈没有被采纳，反思是否表达不清
- 鼓励和支持团队成员的改进

### 作为被审查者

- 不要把反馈当做对个人的批评
- 主动请教为什么要这样改进
- 感谢审查者的反馈，即使有异议也要讨论

---

## 🌟 优秀反馈示例

### 完整示例

```markdown
## Code Review Feedback

感谢提交这个 PR！整体代码质量很好，有以下几点建议：

### 🔴 必须修复

**1. 缺失类型定义**

位置: src/services/userService.ts:12

\`\`\`typescript
// 现在
const fetchUser = (id) => {
  return api.get(`/users/${id}`);
};

// 建议
const fetchUser = (id: string): Promise<User> => {
  return api.get(`/users/${id}`);
};
\`\`\`

这样可以让 TypeScript 进行类型检查，防止潜在的错误。

### 🟡 强烈建议

**2. useEffect 依赖列表不完整**

位置: src/hooks/useFetch.ts:18

`useEffect` 使用了 `userId` 但没有在依赖列表中，
这会导致当 `userId` 改变时不会重新获取数据。

\`\`\`typescript
useEffect(() => {
  fetchUser(userId);
}, [userId]); // ✅ 添加 userId
\`\`\`

### 🟢 可选建议

**3. 考虑使用 React Query**

对于数据获取逻辑，推荐使用 React Query 库，
可以简化缓存、loading 和 error 管理。

参考: https://tanstack.com/query/latest

### ✅ 做得好的地方

- 代码结构清晰易读
- 很好地拆分了组件
- 添加了完整的测试

### 总结

请解决 Blocking 问题后重新提交。期待看到你的改进！👍

感谢你的贡献！
```

