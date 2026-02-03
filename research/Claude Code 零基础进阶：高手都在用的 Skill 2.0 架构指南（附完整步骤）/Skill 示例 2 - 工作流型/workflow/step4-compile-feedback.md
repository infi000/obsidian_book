# 第四步：整理反馈意见

## 你的任务

将前面步骤发现的所有问题，整理成专业、建设性的审查反馈。

---

## 1. 分类和优先级

将所有发现的问题按优先级分类：

### 🔴 Blocking（必须修复）

```markdown
这些问题会导致代码无法合并：
- 安全漏洞
- 功能 bug
- 违反架构规范
- 测试失败
```

### 🟡 Should Fix（强烈建议修复）

```markdown
代码审查会要求修复：
- 代码规范违反
- 可读性问题
- 潜在的性能问题
- 缺少测试
```

### 🟢 Nice to Have（可以建议）

```markdown
可选改进建议：
- 代码风格偏好
- 优化建议
- 最佳实践参考
- 文档改进
```

---

## 2. 撰写反馈

遵循 [rules/feedback-guidelines.md](../rules/feedback-guidelines.md) 中的指南。

### 好的反馈格式

```markdown
**问题**: [清晰描述问题是什么]

**位置**: [文件路径:行号]

**为什么**: [解释为什么这是个问题]

**建议**: [提供具体的改进方案]

**代码示例**:
\`\`\`typescript
// 当前代码
const example = (data: any) => {};

// 改进后
const example = (data: User[]): void => {};
\`\`\`
```

### 反馈模板

使用 [templates/review-feedback-template.md](../templates/review-feedback-template.md) 中的模板。

---

## 3. 组织反馈顺序

### 推荐顺序：

1. **总体评价**（2-3 句）
   - 工作量评估
   - 整体质量评价

2. **Blocking 问题**（必须修复）
   - 逐一列出
   - 提供明确的修复建议

3. **Should Fix 问题**（强烈建议）
   - 按类别分组（规范/性能/可读性等）
   - 提供示例和改进方案

4. **Nice to Have**（可选建议）
   - 列出优化和最佳实践建议
   - 提供参考资源

5. **赞许和总结**（鼓励性）
   - 肯定做得好的地方
   - 鼓励作者进行改进

---

## 4. 反馈示例

### 示例 1：完整的代码审查反馈

```markdown
## 代码审查反馈

### 总体评价

感谢提交这个 PR！工作量适中，功能实现基本正确，但有几个需要改进的地方。

### 🔴 Blocking 问题

#### 1. 安全漏洞：敏感信息硬编码

**位置**: src/services/api.ts:12

**问题**:
```typescript
const API_KEY = '1234567890abcdef';  // ❌ 不应该硬编码
```

**为什么**: 密钥被提交到 Git，任何人都可以访问，这是严重的安全风险。

**建议**: 将密钥移到环境变量
```typescript
const API_KEY = process.env.VITE_API_KEY;
```

并在 `.env` 文件中配置（该文件已在 .gitignore 中）。

---

### 🟡 Should Fix 问题

#### 1. TypeScript 类型问题

**位置**: src/components/UserForm.tsx:34

**问题**:
```typescript
const handleSubmit = (data: any) => {  // ❌ 使用了 any
  // ...
};
```

**为什么**: 使用 `any` 失去了 TypeScript 类型检查的优势，容易引入 bug。

**建议**:
```typescript
interface FormData {
  name: string;
  email: string;
  age: number;
}

const handleSubmit = (data: FormData): void => {
  // ...
};
```

#### 2. Hooks 依赖列表不完整

**位置**: src/hooks/useFetch.ts:18

**问题**:
```typescript
useEffect(() => {
  fetchData(userId);  // ❌ 使用了 userId
}, []);  // ❌ 但没有在依赖列表中
```

**为什么**: 这会导致当 userId 改变时，effect 不会重新运行，数据会过期。

**建议**:
```typescript
useEffect(() => {
  fetchData(userId);
}, [userId]);  // ✅ 添加依赖
```

---

### 🟢 Nice to Have

**可选建议**:

1. 可以考虑使用 React Query 或 SWR 库来简化数据获取逻辑。
2. 对于大列表，建议使用 `react-window` 进行虚拟化。
3. 参考团队规范文档了解更多最佳实践。

---

### ✅ 做得好的地方

- 代码结构清晰，易于阅读
- 组件拆分合理，单一职责
- 添加了很好的测试覆盖

---

### 总结

请解决 Blocking 问题后重新提交。Should Fix 问题强烈建议修复，以保证代码质量。

期待看到你的改进！👍
```

---

## 5. 完成检查清单

- [ ] 所有问题都有清晰的描述
- [ ] 所有问题都按优先级分类
- [ ] 所有问题都有具体的改进建议
- [ ] 所有建议都有代码示例
- [ ] 反馈语气建设性而非批评性
- [ ] 没有遗漏任何重要问题

