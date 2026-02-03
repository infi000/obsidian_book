# 第三步：检查安全性和性能

## 你的任务

进行安全性和性能检查。参考：
- [standards/security-checklist.md](../standards/security-checklist.md)
- [standards/performance-checklist.md](../standards/performance-checklist.md)

---

## 安全性检查

### 1. 常见安全漏洞

```typescript
// ❌ 问题 1：SQL 注入
const query = `SELECT * FROM users WHERE id = ${userId}`;  // 危险！

// ✅ 改进：使用参数化查询
const query = db.prepare('SELECT * FROM users WHERE id = ?');
query.run(userId);

// ❌ 问题 2：XSS 漏洞
<div dangerouslySetInnerHTML={{ __html: userInput }} />  // 危险！

// ✅ 改进：让 React 自动转义
<div>{userInput}</div>

// ❌ 问题 3：暴露敏感信息
const apiKey = '1234567890';  // 不应该在代码中硬编码！

// ✅ 改进：使用环境变量
const apiKey = process.env.VITE_API_KEY;

// ❌ 问题 4：不安全的密码处理
const password = input.value;  // 明文
db.save({ password });

// ✅ 改进：加密密码
const hashedPassword = await bcrypt.hash(password, 10);
db.save({ password: hashedPassword });
```

### 2. 身份验证和授权

```markdown
检查项：
- [ ] 是否验证了用户身份？
- [ ] 是否检查了用户权限？
- [ ] 是否有 CSRF 防护？
- [ ] Token 是否安全存储？(不要存在 localStorage)
- [ ] 是否有速率限制？
```

### 3. 数据处理

```markdown
检查项：
- [ ] 是否验证了用户输入？
- [ ] 是否有 SQL 注入防护？
- [ ] 是否有 XSS 防护？
- [ ] 敏感数据是否加密？
- [ ] 日志是否隐藏敏感信息？
```

---

## 性能检查

### 1. 渲染性能

```typescript
// ❌ 问题 1：不必要的重新渲染
const UserList = ({ users }: { users: User[] }) => {
  return users.map(user => (
    <UserItem
      user={user}
      onClick={() => handleClick(user.id)}  // ❌ 每次都创建新函数
    />
  ));
};

// ✅ 改进：使用 useCallback
const handleItemClick = useCallback((userId: string) => {
  // 处理
}, []);

// ❌ 问题 2：列表没有虚拟化
const LargeList = ({ items }: { items: Item[] }) => {
  return items.map(item => <div>{item.name}</div>);  // 10000 项都渲染了！
};

// ✅ 改进：使用虚拟化
import { FixedSizeList } from 'react-window';
```

### 2. 网络性能

```markdown
检查项：
- [ ] API 调用是否过度？(N+1 问题)
- [ ] 数据是否缓存？
- [ ] 是否有无限滚动的性能问题？
- [ ] 是否有大量 API 请求？
```

### 3. 包体积

```markdown
检查项：
- [ ] 是否引入了不必要的库？
- [ ] 是否有代码重复？
- [ ] 是否使用了 Tree Shaking？
- [ ] 是否有大的依赖可以替换？
```

### 性能检查示例

```typescript
// ❌ 问题：N+1 查询问题
const UserProfiles = ({ userIds }: { userIds: string[] }) => {
  return userIds.map(id => (
    <UserProfile key={id} userId={id} />  // 每个都发起一次 API 请求
  ));
};

// ✅ 改进：批量获取
const UserProfiles = ({ userIds }: { userIds: string[] }) => {
  const users = useFetch(() => api.getUsers(userIds), [userIds]);
  return users.map(user => (
    <UserProfile key={user.id} user={user} />
  ));
};
```

---

## 完成标志

### 安全性检查清单

- [ ] 没有发现 SQL 注入风险
- [ ] 没有发现 XSS 风险
- [ ] 敏感信息没有硬编码
- [ ] 密码处理是否加密
- [ ] 身份验证检查存在
- [ ] 授权检查存在

### 性能检查清单

- [ ] 没有不必要的重新渲染
- [ ] 没有 N+1 查询问题
- [ ] 大列表使用了虚拟化
- [ ] API 调用没有过度
- [ ] 没有明显的性能瓶颈

---

## 记录问题

```
安全性问题示例：

问题1：
- 文件：src/api/auth.ts
- 行号：15
- 类型：敏感信息硬编码
- 严重程度：Blocking
- 建议：将 API 密钥移到环境变量

性能问题示例：

问题2：
- 文件：src/components/UserList.tsx
- 行号：30
- 类型：N+1 查询
- 严重程度：Should Fix
- 建议：批量获取用户而非逐个获取
```

