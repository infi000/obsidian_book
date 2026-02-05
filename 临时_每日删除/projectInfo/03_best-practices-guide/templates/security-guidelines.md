# 安全指南

## XSS 防护

防止跨站脚本攻击。

```typescript
// ❌ 危险：直接设置 HTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ 安全：React 自动转义
<div>{userInput}</div>

// ✅ 安全：使用模板，避免字符串拼接
const html = `<h1>\${escapeHtml(title)}</h1>`
```

## CSRF 防护

防止跨站请求伪造。

- 在 POST/PUT/DELETE 请求中包含 CSRF token
- 验证请求来源（Origin/Referer）
- 使用 SameSite Cookie 属性

## 敏感信息保护

```typescript
// ❌ 错误：硬编码密钥
const API_KEY = 'sk-1234567890'

// ✅ 正确：使用环境变量
const API_KEY = process.env.REACT_APP_API_KEY

// ❌ 错误：不要提交 .env 文件
// ✅ 正确：提交 .env.example，由开发者复制

// ❌ 错误：在控制台输出敏感信息
console.log('token:', token)

// ✅ 正确：不输出敏感信息
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info...')
}
```

## 输入验证

```typescript
// ✅ 验证所有用户输入
const validateEmail = (email: string) => {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
  return regex.test(email)
}

// ✅ 在服务器端再次验证
// 不要依赖客户端验证

// ✅ SQL 注入防护：使用参数化查询
db.query('SELECT * FROM users WHERE id = ?', [userId])
```

## Code Review 安全检查清单

- [ ] 没有 dangerouslySetInnerHTML
- [ ] 没有硬编码的敏感信息
- [ ] 用户输入已验证和转义
- [ ] 敏感数据不在日志中
- [ ] API 请求包含认证信息
- [ ] 没有使用 eval 或 Function 构造函数
