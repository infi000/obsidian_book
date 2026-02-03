# 常见模式

> 【需要你填写】项目中推荐的设计模式和代码模式

## React 组件模式

【填写】

### 函数组件 + Hooks

【填写】

```javascript
【填写示例】
// ✅ 推荐的组件结构
export const UserCard: React.FC<UserCardProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 获取用户数据
  }, [userId]);

  if (loading) return <Skeleton />;
  if (!user) return <div>User not found</div>;

  return (
    <div className={styles.card}>
      {/* 组件内容 */}
    </div>
  );
};
```

**规则**:
- [ ] 优先使用函数组件
- [ ] 使用 Hooks 管理状态
- [ ] 避免 class 组件（除非有特殊需要）

### 条件渲染

【填写】

```javascript
【填写示例】
// ✅ 推荐
{isLoading ? <Spinner /> : <Content />}

{isError && <ErrorMessage />}

{items.length > 0 && <ItemList items={items} />}

// ❌ 不推荐
{isLoading === true ? <Spinner /> : <Content />}

{!isError || <ErrorMessage />}
```

### 自定义 Hook

【填写】

```javascript
【填写示例】
// ✅ 推荐的 Hook 结构
export const useUserData = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Hook 逻辑
  }, [userId]);

  return { user, loading, error };
};

// 使用
const { user, loading, error } = useUserData(userId);
```

**规则**:
- [ ] Hook 必须以 `use` 开头
- [ ] Hook 返回有意义的数据结构
- [ ] 避免过于复杂的 Hook

## 数据获取模式

【填写】

### API 请求

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 使用 custom hook
const { user, loading, error } = useFetch('/api/user');

// ✅ 推荐 - 错误处理
try {
  const data = await api.get('/endpoint');
} catch (error) {
  if (error.response?.status === 404) {
    // 处理 404
  } else {
    // 处理其他错误
  }
}

// ❌ 不推荐 - 在 JSX 中做复杂逻辑
<div>
  {(() => {
    const data = fetch('/api/user');
    // ...
  })()}
</div>
```

### 缓存策略

【填写】项目如何处理数据缓存：

- [ ] 使用【填写库名】做缓存
- [ ] 【填写缓存策略】

## 状态管理模式

【填写】项目使用什么方案管理全局状态：

### 【填写方案名】实践

【填写】举例说明如何使用你项目的状态管理方案：

```javascript
【填写示例】
```

## 文件组织模式

【填写】

### 特性分类法（Feature-based）

【填写】

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types.ts
│   │   └── store.ts
│   ├── user/
│   │   ├── components/
│   │   ├── services/
│   │   └── store.ts
│   └── ...
```

### 层级分类法（Layer-based）

【填写】

```
src/
├── components/
├── services/
├── store/
├── utils/
└── ...
```

**【选择】你的项目用哪一种？**
- [ ] 特性分类法
- [ ] 层级分类法
- [ ] 混合法
- [ ] 其他：【填写】

## 错误处理模式

【填写】

### 统一的错误处理

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 创建 Error boundary
export class ErrorBoundary extends React.Component {
  // ...
}

// ✅ 推荐 - 创建统一的错误处理
export const handleError = (error: unknown, context?: string) => {
  if (isNetworkError(error)) {
    // 处理网络错误
  } else if (isAuthError(error)) {
    // 处理认证错误
  } else {
    // 处理其他错误
  }
};
```

## 性能优化模式

【填写】

### 列表渲染优化

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 使用虚拟列表
import { FixedSizeList } from 'react-window';

// ✅ 推荐 - 使用 memo
export const ListItem = React.memo(({ item }) => (
  <div>{item.name}</div>
));
```

### 计算优化

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 使用 useMemo
const memoizedValue = useMemo(
  () => expensiveCalculation(a, b),
  [a, b]
);

// ✅ 推荐 - 使用 useCallback
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]
);
```

## 测试模式

【填写】

### 单元测试

【填写】

```javascript
【填写示例】
describe('UserCard', () => {
  it('should render user information', () => {
    const { getByText } = render(<UserCard userId="123" />);
    expect(getByText('John')).toBeInTheDocument();
  });

  it('should handle missing user', () => {
    const { getByText } = render(<UserCard userId="invalid" />);
    expect(getByText('User not found')).toBeInTheDocument();
  });
});
```

### 集成测试

【填写】

```javascript
【填写示例】
```

## 通用最佳实践

【填写】

- [ ] 【最佳实践 1】
- [ ] 【最佳实践 2】
- [ ] 【最佳实践 3】

---

**相关链接**：
- 性能优化 → [[performance-tips|性能优化]]
- 安全检查 → [[security-checklist|安全检查]]
- Code Review Skill → [[../../工作流型Skill/SKILL|代码审查]]
