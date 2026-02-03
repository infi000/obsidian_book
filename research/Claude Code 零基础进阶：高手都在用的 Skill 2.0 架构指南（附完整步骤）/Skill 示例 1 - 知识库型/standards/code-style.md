# 代码规范

## 🔴 JavaScript/TypeScript 编码规范

### 变量声明

```javascript
// ❌ 不要使用 var
var count = 0;

// ✅ 使用 const（默认）
const count = 0;

// ✅ 需要重新赋值时使用 let
let currentUser = null;
currentUser = getUser();
```

**规则**：
- 🔴 MUST：优先使用 `const`，需要重新赋值时才用 `let`，**禁止使用 `var`**
- 🟡 SHOULD：全文件使用 const 而不是 let（函数式编程风格）

### 命名风格

```typescript
// ✅ 常量：全大写 + 下划线
const MAX_RETRIES = 3;
const API_BASE_URL = 'https://api.example.com';

// ✅ 函数：camelCase
const fetchUserData = () => {};
const handleButtonClick = () => {};

// ✅ 类：PascalCase
class UserManager {}
class ApiClient {}

// ✅ 私有属性：前缀 _
private _internalState = {};
```

### 函数编写

```typescript
// ❌ 不要：function 声明
function getUserData(id) {
  // ...
}

// ✅ 使用：arrow function + 类型注解
const getUserData = (id: string): Promise<User> => {
  // ...
};

// ✅ 使用：async/await
const fetchUser = async (id: string): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
```

**规则**：
- 🔴 MUST：使用箭头函数而非 function 声明
- 🔴 MUST：使用 TypeScript 类型注解
- 🟡 SHOULD：优先使用 async/await 而非 .then()

### 注释规范

```typescript
// ✅ 良好的注释：解释"为什么"
// 缓存用户数据以避免重复 API 调用
const cachedUsers = new Map();

// ❌ 不好的注释：重复代码本身
// 获取用户 ID
const userId = user.id;

/**
 * 批量获取用户信息
 * @param ids - 用户 ID 数组
 * @returns 用户数组，不存在的用户被过滤掉
 * @example
 * const users = await getUsersByIds(['1', '2', '3']);
 */
const getUsersByIds = async (ids: string[]): Promise<User[]> => {
  // ...
};
```

**规则**：
- 🟡 SHOULD：为公开 API 函数添加 JSDoc 注释
- 🟢 MAY：在复杂逻辑前添加解释性注释

---

## 🔴 React 编码规范

### 组件定义

```tsx
// ✅ 使用函数式组件 + TypeScript
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

export default UserCard;
```

**规则**：
- 🔴 MUST：使用函数式组件，禁止使用 Class Component
- 🔴 MUST：定义 Props interface，使用 React.FC
- 🔴 MUST：导出组件时使用 `export const ComponentName`

### Hooks 使用

```tsx
// ✅ 正确的 Hooks 用法
const UserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const data = await api.getUser(userId);
        setUser(data);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // 依赖正确

  if (loading) return <Spinner />;
  return <div>{user?.name}</div>;
};

// ❌ 错误的 Hooks 用法
if (condition) {
  useState(value); // ❌ 不要在条件语句中调用 Hooks
}

// ❌ 错误的依赖列表
useEffect(() => {
  // ...
}, []); // ❌ userId 不在依赖列表中会导致数据过期
```

**规则**：
- 🔴 MUST：Hooks 只能在函数顶层调用，不能在条件、循环或嵌套函数中使用
- 🔴 MUST：useEffect 依赖列表必须完整和准确
- 🟡 SHOULD：优先使用 useCallback、useMemo 来优化性能

---

## 🟡 错误处理

```typescript
// ✅ 良好的错误处理
const fetchData = async (): Promise<Data | null> => {
  try {
    const response = await api.get('/data');
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`API Error: ${error.message}`);
    } else {
      console.error('Unknown error:', error);
    }
    return null; // 或者重新抛出
  }
};

// ❌ 不好的错误处理
const fetchData = async () => {
  const response = await api.get('/data'); // 没有错误处理
  return response.data;
};
```

**规则**：
- 🔴 MUST：async 函数必须有 try-catch
- 🟡 SHOULD：catch 块中区分不同的错误类型
- 🟡 SHOULD：给用户友好的错误提示

---

## 📏 代码长度

| 指标 | 推荐值 | 说明 |
|-----|-------|------|
| 单个文件行数 | < 300 | 超过需要拆分 |
| 单个函数行数 | < 50 | 超过应该拆分 |
| 单行字符数 | < 100 | 使用自动格式化工具 |

---

## 🛠️ 代码格式化

所有项目都应该配置：

```bash
# .prettierrc.json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2
}
```

**规则**：
- 🔴 MUST：使用 Prettier 自动格式化代码
- 🔴 MUST：使用 ESLint 检查代码质量
- 🔴 MUST：Pre-commit hook 自动运行格式化和 lint

