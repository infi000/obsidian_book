# 安全检查清单

> 【需要你填写】项目中需要关注的安全问题

## 输入验证和防护

【填写】

### XSS (跨站脚本攻击) 防护

【填写】

```javascript
【填写示例】
// ✅ 推荐 - React 自动转义文本内容
<div>{userInput}</div>

// ✅ 推荐 - 使用 DOMPurify 清理 HTML
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userHTML);
<div dangerouslySetInnerHTML={{ __html: clean }} />

// ❌ 危险 - 直接使用 dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ❌ 危险 - 直接操作 DOM
document.body.innerHTML = userInput;
```

**检查清单**:
- [ ] 不使用 `dangerouslySetInnerHTML` 除非必要且内容已清理
- [ ] 用户输入必须转义或清理
- [ ] 使用【填写库名】清理 HTML 内容
- [ ] 【填写你项目的做法】

### SQL 注入防护

【填写】(如果项目涉及数据库)

```javascript
【填写示例】
// ✅ 推荐 - 使用参数化查询
const user = await db.query(
  'SELECT * FROM users WHERE id = ?',
  [userId]
);

// ❌ 危险 - 字符串拼接
const user = await db.query(
  `SELECT * FROM users WHERE id = '${userId}'`
);
```

**检查清单**:
- [ ] 始终使用参数化查询
- [ ] 不要拼接 SQL 字符串
- [ ] 使用 ORM（如【填写工具名】）
- [ ] 【填写你项目的做法】

### CSRF (跨站请求伪造) 防护

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 使用 CSRF Token
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
fetch('/api/update', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken
  },
  body: JSON.stringify(data)
});

// ✅ 推荐 - 使用 SameSite Cookie
Set-Cookie: sessionId=abc; SameSite=Strict; Secure; HttpOnly
```

**检查清单**:
- [ ] 敏感操作（POST/PUT/DELETE）使用 CSRF Token
- [ ] Cookie 设置 `SameSite=Strict` 或 `SameSite=Lax`
- [ ] 使用【填写框架名】的 CSRF 保护
- [ ] 【填写你项目的做法】

## 认证和授权

【填写】

### 密码处理

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 使用强大的哈希算法
import bcrypt from 'bcrypt';
const hashedPassword = await bcrypt.hash(password, 10);

// ✅ 推荐 - 验证密码
const isValid = await bcrypt.compare(password, hashedPassword);

// ❌ 危险 - 存储明文密码
db.save({ username, password }); // 不要这样做！
```

**检查清单**:
- [ ] 密码必须哈希存储（使用【填写算法】）
- [ ] 不要记录或日志中输出密码
- [ ] 密码策略：最小长度、复杂性等
- [ ] 【填写你项目的做法】

### Token 管理

【填写】

```javascript
【填写示例】
// ✅ 推荐 - Token 应该短期有效
const token = jwt.sign(
  { userId },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }  // 15 分钟过期
);

// ✅ 推荐 - 使用 refresh token
const refreshToken = jwt.sign(
  { userId },
  process.env.REFRESH_TOKEN_SECRET,
  { expiresIn: '7d' }
);

// ❌ 不推荐 - Token 有效期过长
{ expiresIn: '1y' }  // 太长了
```

**检查清单**:
- [ ] Access Token 有短的过期时间（15-60 分钟）
- [ ] Refresh Token 有更长的过期时间（7-30 天）
- [ ] Token 存储在【填写位置】（HttpOnly Cookie 推荐）
- [ ] 【填写你项目的做法】

### 权限检查

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 前端检查并显示/隐藏
{isAdmin && <AdminPanel />}

// ✅ 必须 - 后端总是要检查权限
app.get('/api/admin/data', (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  // ...
});

// ❌ 危险 - 只在前端检查权限
// 用户可以修改 JS 绕过检查
```

**检查清单**:
- [ ] 前端检查用于 UX（显示/隐藏按钮）
- [ ] 后端必须验证所有请求的权限
- [ ] 不相信来自客户端的任何权限声称
- [ ] 【填写你项目的做法】

## API 安全

【填写】

### API 认证

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 使用 Bearer Token
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

// ✅ 推荐 - 使用 API Key（非敏感操作）
X-API-Key: sk_live_xxxxx
```

**检查清单**:
- [ ] 所有 API 都需要认证
- [ ] 使用【填写认证方法】
- [ ] API Key 不应该在代码中硬编码
- [ ] 【填写你项目的做法】

### Rate Limiting

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 使用 rate limiter
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 分钟
  max: 100  // 限制 100 个请求
});

app.use('/api/', limiter);
```

**检查清单**:
- [ ] 实施 Rate Limiting 防止滥用
- [ ] 限制值根据【填写需求】设置
- [ ] 【填写你项目的做法】

### HTTPS

【填写】

```
【填写示例】
✅ 所有通信都使用 HTTPS
✅ 使用 TLS 1.2 或更高版本
✅ 有有效的 SSL 证书
```

**检查清单**:
- [ ] 生产环境强制 HTTPS
- [ ] 使用 HSTS（HTTP Strict Transport Security）
- [ ] 证书定期更新
- [ ] 【填写你项目的做法】

## 数据保护

【填写】

### 敏感数据处理

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 不要在前端存储敏感信息
// ❌ 不推荐
localStorage.setItem('credit_card', '4532-1234-5678-9010');

// ✅ 推荐 - 最小化传输
// 不要在 URL 中传输敏感数据
// 使用 POST 而不是 GET

// ✅ 推荐 - 加密敏感数据
import crypto from 'crypto';
const encrypted = crypto.encrypt(sensitiveData, encryptionKey);
```

**检查清单**:
- [ ] 不在 localStorage/sessionStorage 中存储敏感数据
- [ ] 不在 URL 参数中传输敏感数据
- [ ] 不在日志中记录敏感数据（密码、token、卡号等）
- [ ] 使用【填写工具】加密敏感数据
- [ ] 【填写你项目的做法】

### 数据脱敏

【填写】

在 Code Review 中，要检查：
- [ ] API 响应是否包含不必要的敏感数据？
- [ ] 用户密码是否被日志记录？
- [ ] 支付信息是否被前端处理？

## 依赖安全

【填写】

### 依赖检查

【填写】

```bash
【填写示例】
# ✅ 推荐 - 定期检查依赖安全
npm audit
npm audit fix

# ✅ 推荐 - 使用 Snyk
snyk test
snyk monitor

# ✅ 推荐 - 定期更新依赖
npm outdated
npm update
```

**检查清单**:
- [ ] 定期运行 `npm audit`
- [ ] 及时修复安全漏洞
- [ ] 更新过期的依赖
- [ ] 避免使用已知有漏洞的版本
- [ ] 【填写你项目的做法】

### 依赖管理

【填写】

```
【填写示例】
✅ 生产依赖 (dependencies)
❌ 开发依赖 (devDependencies) - 不应该在生产中使用
✅ 锁定依赖版本 (package-lock.json / yarn.lock)
❌ 使用宽泛的版本范围
```

## 环境和配置

【填写】

### 敏感信息管理

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 使用环境变量
const apiKey = process.env.API_KEY;
const dbUrl = process.env.DATABASE_URL;

// ❌ 危险 - 硬编码敏感信息
const apiKey = 'sk_live_abc123xyz';
const dbUrl = 'mongodb://user:password@host/db';
```

**检查清单**:
- [ ] 所有敏感信息（API Key、密码、Token）都存储在 `.env` 中
- [ ] `.env` 文件在 `.gitignore` 中
- [ ] 不要提交包含敏感信息的文件
- [ ] 【填写你项目的做法】

### 日志安全

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 不记录敏感信息
logger.info(`User login: ${userId}`);

// ❌ 危险 - 记录了密码和 token
logger.info(`User: ${username}, Password: ${password}, Token: ${token}`);

// ✅ 推荐 - 日志脱敏
const maskSensitive = (obj) => {
  return {
    ...obj,
    password: '***',
    token: '***'
  };
};
logger.info(maskSensitive(userData));
```

## 安全检查清单

【填写】Code Review 时的快速检查：

### 输入和数据处理
- [ ] 用户输入是否被验证和清理？
- [ ] 是否有 XSS 防护？
- [ ] 是否有 CSRF 防护？
- [ ] 敏感数据是否被脱敏？

### 认证和授权
- [ ] 认证检查是否正确？
- [ ] 权限检查是否正确？
- [ ] Token 是否安全？

### API 和通信
- [ ] 是否使用 HTTPS？
- [ ] 是否验证了输入？
- [ ] 是否限制了请求频率？

### 密钥和配置
- [ ] 是否有硬编码的敏感信息？
- [ ] 环境变量是否正确使用？
- [ ] 日志中是否泄露了敏感信息？

---

**相关链接**：
- 常见模式 → [[common-patterns|常见模式]]
- 性能优化 → [[performance-tips|性能优化]]
- Code Review Skill → [[../../工作流型Skill/SKILL|代码审查]]
