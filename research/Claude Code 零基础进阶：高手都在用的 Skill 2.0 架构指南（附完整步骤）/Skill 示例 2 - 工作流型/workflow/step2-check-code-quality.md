# 第二步：检查代码质量

## 你的任务

进行代码质量检查。参考 [standards/code-quality-checklist.md](../standards/code-quality-checklist.md)

### 1. 代码规范检查

```markdown
检查项：
- [ ] 是否遵循命名规范？(变量、函数、文件)
- [ ] 是否遵循代码风格？(缩进、空行、注释)
- [ ] 是否有 ESLint/Prettier 错误？
- [ ] 是否有类型检查错误？(TypeScript)
- [ ] 是否有 console.log 或 debugger？
```

### 2. 逻辑和结构检查

```markdown
检查项：
- [ ] 逻辑是否清晰正确？
- [ ] 是否遵循单一职责原则？
- [ ] 函数是否太长？(超过 50 行？)
- [ ] 文件是否太大？(超过 300 行？)
- [ ] 是否有重复代码？
```

### 3. TypeScript 检查

```typescript
// ❌ 问题代码示例
const processData = (data: any) => {  // ❌ 使用 any
  const result = data.filter(item => item.value > 10);  // ❌ 没有类型
  return result;
};

// ✅ 应该这样
interface DataItem {
  id: string;
  value: number;
}

const processData = (data: DataItem[]): DataItem[] => {
  return data.filter(item => item.value > 10);
};
```

### 4. React 组件检查

如果是 React 代码：

```markdown
检查项：
- [ ] 是否使用函数式组件？(禁止 class 组件)
- [ ] Props 是否有类型定义？
- [ ] Hooks 使用是否正确？
- [ ] useEffect 依赖列表是否完整？
- [ ] 是否有不必要的重新渲染？
- [ ] 组件是否太复杂？(应该拆分)
```

---

## 常见问题和改进建议

### 示例问题 1：命名不清晰

```typescript
// ❌ 不好
const getData = () => {
  const d = fetchUser();
  const s = d.status;
  return s;
};

// ✅ 改进
const getUserStatus = (): string => {
  const user = fetchUser();
  return user.status;
};
```

**反馈模板**：
> "变量名 `d` 和 `s` 不够清晰。建议改为 `user` 和 `status` 以提高可读性。"

### 示例问题 2：缺少类型

```typescript
// ❌ 不好
const handleSubmit = (data) => {  // 缺少参数类型
  // ...
};

// ✅ 改进
interface FormData {
  name: string;
  email: string;
}

const handleSubmit = (data: FormData): void => {
  // ...
};
```

**反馈模板**：
> "函数 `handleSubmit` 的参数缺少类型定义。建议添加参数类型以便 TypeScript 类型检查。"

---

## 记录问题

当发现问题时，记下：

1. **问题位置**：文件和行号
2. **问题类型**：命名/逻辑/性能/规范等
3. **严重程度**：Blocking/Should Fix/Nice to Have
4. **建议改进**：具体的改进方案

```
示例记录：

问题1：
- 文件：src/components/UserForm.tsx
- 行号：45-60
- 类型：Hooks 依赖不完整
- 严重程度：Blocking
- 建议：将 userId 添加到 useEffect 依赖列表

问题2：
- 文件：src/utils/api.ts
- 行号：23
- 类型：缺少错误处理
- 严重程度：Should Fix
- 建议：添加 try-catch 处理 API 错误
```

---

## 完成标志

- ✅ 检查完所有代码规范要求
- ✅ 识别了所有逻辑问题
- ✅ 记录了所有发现的问题和建议
- ✅ 准备好进入下一步

