# 安全性检查清单

前端代码中常见的安全问题。

## 数据安全

### 敏感信息

- [ ] API 密钥没有硬编码
- [ ] 密码没有以明文存储
- [ ] 用户 Token 没有存在 localStorage（应使用 httpOnly cookie）
- [ ] 没有在日志中记录敏感信息
- [ ] 没有在错误消息中暴露系统信息

### 输入验证

- [ ] 用户输入是否都经过验证？
- [ ] 表单数据是否有长度限制？
- [ ] 是否检查了数据类型？
- [ ] 是否有 CAPTCHA 防止暴力破解？
- [ ] 是否有速率限制？

---

## XSS（跨站脚本）防护

### ❌ 常见问题

```javascript
// ❌ 危险：直接使用 dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ❌ 危险：在 href 中使用用户输入
<a href={userInput}>Link</a>

// ❌ 危险：在事件处理器中使用 eval
onClick={() => eval(userInput)}
```

### ✅ 正确做法

```javascript
// ✅ 安全：React 自动转义
<div>{userInput}</div>

// ✅ 使用 DOMPurify 清理 HTML
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />

// ✅ 验证 URL
const isSafeUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:', 'mailto:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};
<a href={isSafeUrl(userInput) ? userInput : '#'}>Link</a>
```

### 检查项

- [ ] 是否使用了 `dangerouslySetInnerHTML`？(如果是，是否清理了内容)
- [ ] 用户输入是否都经过转义？
- [ ] 是否验证了 URL？
- [ ] 是否使用了 Content Security Policy？

---

## CSRF（跨站请求伪造）防护

### ✅ 防护措施

```javascript
// ✅ 使用 CSRF Token
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

fetch('/api/users', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken,
  },
  body: JSON.stringify(data),
});

// ✅ 使用 SameSite Cookie
// Set-Cookie: sessionId=abc123; SameSite=Strict; HttpOnly
```

### 检查项

- [ ] POST/PUT/DELETE 请求是否有 CSRF Token？
- [ ] Token 是否正确验证？
- [ ] 是否使用了 SameSite Cookie？
- [ ] 是否验证了请求源（Origin/Referer）？

---

## 身份验证和授权

### 检查项

- [ ] 用户是否经过身份验证？
- [ ] 是否有会话超时？
- [ ] 登出后是否清除了用户信息？
- [ ] Token 是否有过期时间？
- [ ] 是否有刷新 Token 机制？

### ❌ 常见问题

```javascript
// ❌ 不安全：Token 存在 localStorage
localStorage.setItem('token', authToken);

// ✅ 更好：使用 httpOnly cookie
// 由服务器设置 Set-Cookie: token=xyz; HttpOnly; SameSite=Strict
```

### 检查项

- [ ] 用户信息是否安全存储？
- [ ] 是否有权限检查？(前端和后端都要)
- [ ] 是否可以绕过认证？
- [ ] 是否有强制 HTTPS？

---

## 依赖安全

### 检查项

- [ ] 是否使用了过时的包版本？
- [ ] 是否有已知的安全漏洞？
- [ ] 是否运行了 `npm audit`？
- [ ] 是否定期更新依赖？

```bash
# 检查安全漏洞
npm audit

# 修复已知漏洞
npm audit fix

# 强制修复（可能导致版本不兼容）
npm audit fix --force
```

---

## 通信安全

### 检查项

- [ ] 是否使用了 HTTPS？
- [ ] 是否在 HTTP 上传输敏感数据？(❌ 应该全部用 HTTPS)
- [ ] 是否验证了 API 响应？
- [ ] 是否有防止 Man-in-the-Middle 攻击的措施？

---

## 其他安全问题

### 点击劫持防护

- [ ] 是否设置了 `X-Frame-Options` header？
- [ ] 是否防止了在 iframe 中被加载？

### 内容安全策略

- [ ] 是否设置了 Content Security Policy？
- [ ] 是否禁止了不必要的 inline script？

### 信息泄露防护

- [ ] 是否隐藏了版本号？
- [ ] 错误消息是否过于详细？
- [ ] 是否启用了 CORS 检查？

---

## 安全检查优先级

| 优先级 | 项目 |
|-------|------|
| 🔴 **Critical** | XSS 漏洞、敏感信息硬编码、身份验证绕过 |
| 🟡 **High** | CSRF、不安全的数据存储、依赖漏洞 |
| 🟢 **Medium** | 不安全的通信、不足的权限检查 |

