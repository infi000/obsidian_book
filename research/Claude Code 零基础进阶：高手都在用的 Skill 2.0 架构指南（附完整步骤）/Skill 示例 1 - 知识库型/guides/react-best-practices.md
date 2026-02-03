# React 最佳实践

## 组件设计原则

### 单一职责原则

```tsx
// ❌ 不好：一个组件做了太多事
const UserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // 获取用户、文章、评论
  }, []);

  return (
    <div>
      {/* 显示用户信息、文章列表、评论列表 */}
    </div>
  );
};

// ✅ 好的：拆分成多个小组件
const UserProfile = ({ userId }: { userId: string }) => {
  return (
    <div>
      <UserHeader userId={userId} />
      <UserPostList userId={userId} />
      <UserCommentList userId={userId} />
    </div>
  );
};

// 每个子组件各司其职
const UserHeader = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState(null);
  // 只处理用户信息
};

const UserPostList = ({ userId }: { userId: string }) => {
  const [posts, setPosts] = useState([]);
  // 只处理文章列表
};
```

**规则**：
- 🔴 MUST：每个组件只做一件事
- 🟡 SHOULD：当组件超过 200 行时考虑拆分
- 🟡 SHOULD：使用容器/展示组件模式

### Props Drilling 避免

```tsx
// ❌ Props drilling：逐层传递 props
const App = () => {
  const [user, setUser] = useState(null);
  return <Page user={user} />;
};

const Page = ({ user }: { user: User }) => {
  return <Header user={user} />;
};

const Header = ({ user }: { user: User }) => {
  return <UserMenu user={user} />;
};

// ✅ 使用 Context 避免 Props Drilling
const UserContext = createContext<User | null>(null);

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={user}>
      <Page />
    </UserContext.Provider>
  );
};

const UserMenu = () => {
  const user = useContext(UserContext);
  return <div>{user?.name}</div>;
};
```

**规则**：
- 🟡 SHOULD：Props 超过 5 个时考虑使用 Context
- 🟡 SHOULD：使用 Redux 或 Zustand 管理全局状态

---

## Hooks 最佳实践

### useEffect 规范

```tsx
// ❌ 常见错误：依赖列表不完整
const UserProfile = ({ userId }: { userId: string }) => {
  useEffect(() => {
    // 使用了 userId，但没有在依赖列表中
    fetchUser(userId);
  }, []); // ❌ 缺少 userId
};

// ✅ 正确：完整的依赖列表
const UserProfile = ({ userId }: { userId: string }) => {
  useEffect(() => {
    fetchUser(userId);
  }, [userId]); // ✅ 包含所有依赖
};

// ✅ 使用 useCallback 避免不必要的重新创建
const handleSubmit = useCallback((data: FormData) => {
  submitForm(data);
}, []); // 如果函数不依赖外部变量，依赖列表为空
```

### 自定义 Hooks 设计

```tsx
// ✅ 良好的自定义 Hook
const useFetch = <T,>(
  url: string,
  options?: RequestInit
): { data: T | null; loading: boolean; error: Error | null } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

// 使用
const UserProfile = ({ userId }: { userId: string }) => {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return <div>{user?.name}</div>;
};
```

**规则**：
- 🔴 MUST：自定义 Hook 名称以 `use` 开头
- 🟡 SHOULD：Hook 应该是可复用的，不依赖于特定组件
- 🟡 SHOULD：Hook 内部的逻辑应该是清晰和可测试的

---

## 性能优化

### React.memo 使用

```tsx
// ❌ 没有优化的列表
const UserList = ({ users }: { users: User[] }) => {
  return (
    <div>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

// ✅ 使用 memo 避免不必要的重新渲染
const UserItem = memo(({ user }: { user: User }) => {
  console.log('UserItem rendered:', user.id);
  return <div>{user.name}</div>;
});

const UserList = ({ users }: { users: User[] }) => {
  return (
    <div>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};
```

### 列表性能

```tsx
// ❌ 不好：在 JSX 中创建回调
const UserList = ({ users }: { users: User[] }) => {
  return (
    <div>
      {users.map(user => (
        <UserItem
          key={user.id}
          user={user}
          onClick={() => console.log(user.id)} // ❌ 每次都创建新函数
        />
      ))}
    </div>
  );
};

// ✅ 好的：使用 useCallback
const UserList = ({ users }: { users: User[] }) => {
  const handleItemClick = useCallback((userId: string) => {
    console.log(userId);
  }, []);

  return (
    <div>
      {users.map(user => (
        <UserItem
          key={user.id}
          user={user}
          onClick={() => handleItemClick(user.id)}
        />
      ))}
    </div>
  );
};
```

**规则**：
- 🟡 SHOULD：使用 React DevTools Profiler 检查性能瓶颈
- 🟡 SHOULD：当列表项超过 100 个时考虑虚拟化
- 🟡 SHOULD：使用 useMemo 优化昂贵的计算

---

## 错误处理和加载状态

```tsx
// ✅ 完整的状态处理
const UserProfile = ({ userId }: { userId: string }) => {
  const { data: user, loading, error } = useFetch<User>(
    `/api/users/${userId}`
  );

  // 加载中
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // 错误处理
  if (error) {
    return (
      <div className="text-red-600">
        <h2>加载失败</h2>
        <p>{error.message}</p>
        <button onClick={() => location.reload()}>重试</button>
      </div>
    );
  }

  // 空状态
  if (!user) {
    return <div>用户不存在</div>;
  }

  // 正常渲染
  return <div>{user.name}</div>;
};
```

