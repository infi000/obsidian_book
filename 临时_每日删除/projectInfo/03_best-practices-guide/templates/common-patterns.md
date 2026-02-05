# 常见模式

项目中经常使用的设计模式和实现方式。

## Redux 数据流

标准的 Redux 流程：
Action → Reducer → Store → Component → 订阅更新

示例：
```typescript
// action
export const setUser = (user: User) => ({
  type: 'SET_USER',
  payload: user,
})

// reducer
const initialState = { user: null }
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    default:
      return state
  }
}

// 在组件中使用
const dispatch = useDispatch()
const user = useSelector(state => state.user)
dispatch(setUser({ id: 1, name: 'John' }))
```

## 异步操作

标准的异步操作模式：

```typescript
// API 服务
export const fetchUser = async (id: string) => {
  const response = await fetch(`/api/users/\${id}`)
  return response.json()
}

// 自定义 Hook
export const useFetchUser = (id: string) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchUser(id)
        setUser(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  return { user, loading, error }
}
```

## 错误处理

统一的错误处理模式：

```typescript
// 自定义错误类
class AppError extends Error {
  constructor(message: string, public code: string) {
    super(message)
  }
}

// API 调用中的错误处理
try {
  const data = await api.get('/users')
  return data
} catch (error) {
  if (error.response?.status === 404) {
    throw new AppError('用户不存在', 'USER_NOT_FOUND')
  }
  throw new AppError('获取数据失败', 'FETCH_ERROR')
}

// 在组件中显示错误
{error && (
  <Alert type="error" message={error.message} />
)}
```

## 组件通信

避免深层 prop drilling：

```typescript
// ✅ 使用 Context
const UserContext = createContext<User | null>(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

// ❌ 避免
<Component prop1={} prop2={} prop3={} prop4={} />
```
