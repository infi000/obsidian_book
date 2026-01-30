# 📋 上线前迭代报告 Agent - 下一步行动指南

> 从方案到实施，你需要做的具体事情

---

## 🎯 当前进度

✅ **已完成**：
1. 设计完整的Agent架构
2. 支持 GitLab 和 Bitbucket 的多仓库适配器
3. 自建需求系统的通用适配器
4. 文档系统和机器人通知的集成方案
5. 完整的代码实现

⏳ **待完成**：
1. 获取你的具体系统信息
2. 根据实际API调整代码
3. 测试和部署

---

## 📌 我需要从你这里获得的信息

### 第一类：代码仓库信息

#### 如果你们使用 GitLab（可能多个）

```
对于每个 GitLab 实例，我需要：
□ GitLab 地址（如 https://gitlab.company.com）
□ Project ID（如 123）
□ Personal Access Token 或 API Token

获取方式：
1. 登录 GitLab
2. 右上角 Settings → Access Tokens
3. 创建 "API" 权限的 Token
```

#### 如果你们使用 Bitbucket（可能多个）

```
对于每个 Bitbucket 实例，我需要：
□ Bitbucket 地址（如 https://bitbucket.org 或自建地址）
□ Workspace（如 your-company）
□ Repo Slug（如 frontend-repo）
□ App Token / Personal Token

获取方式：
1. 登录 Bitbucket
2. Personal Settings → App passwords / 或 Account Settings
3. 创建新 Token，权限选择 "repositories:read"
```

---

### 第二类：自建需求系统信息

这是最关键的部分。我需要理解你的需求系统API。

#### 问题 1：你的自建需求系统叫什么？

```
可能的答案：
□ 内部开发的管理系统
□ 使用了某个开源系统（如 OpenProject、Taiga 等）
□ 其他名称
```

#### 问题 2：给我一个API请求的例子

```
我需要知道：
1. 查询需求的 API 端点是什么？
   例如：GET /api/requirements/search?name=xxx

2. 需求对象的数据结构是什么？
   例如：
   {
     "id": "123",
     "name": "用户认证功能",
     "title": "...",
     "status": "done",
     "priority": "high",
     "assignee": "张三",
     "url": "https://..."
   }

   特别是，需求的这些字段分别对应什么？
   • 需求的唯一ID - 字段名叫什么？
   • 需求的名字/标题 - 字段名叫什么？
   • 需求的状态 - 字段名叫什么？可能的值有哪些？
   • 责任人 - 字段名叫什么？
   • 需求的链接 - 字段名叫什么？或怎么拼接？
```

#### 问题 3：认证方式

```
□ API Token / Bearer Token
□ Basic Auth （用户名密码）
□ OAuth
□ 其他

如果是 Token，怎么在请求头中传递？
示例：Authorization: Bearer {token} 还是其他？
```

---

### 第三类：文档系统信息

#### 问题 1：你们用腾讯文档，还是有自建的文档系统？

```
如果是腾讯文档：
□ 腾讯文档的分享链接 / 文件夹链接
□ 是否有 API（腾讯文档提供了吗？）
□ 如果没有 API，我可以调整为生成本地文件，然后手动上传

如果是自建系统：
□ 系统地址
□ 创建文档的 API 端点
□ API Token
□ 需求的数据格式
```

#### 如果没有现成的API，备选方案：

```
我可以改为：
1. 生成 Markdown 文件到本地
2. 生成后自动打开本地文件
3. 或保存为可分享的格式，你们手动上传
```

---

### 第四类：机器人通知信息

#### 问题 1：自建机器人的 Webhook 地址

```
□ Webhook URL（如 https://robot.company.com/webhook）
□ 接受的消息格式：JSON、Markdown、还是文本？
□ 是否有其他的参数要求？

给我一个示例：
假如要发送一条消息，我应该 POST 什么样的数据到你的 Webhook？

例如：
{
  "text": "xxx",
  "title": "xxx"
}

还是：
{
  "msgtype": "text",
  "content": "xxx"
}

还是其他格式？
```

---

## 📋 快速检查清单

### 对于 VCS（代码仓库）
- [ ] 确认是 GitLab 还是 Bitbucket（或两者都有）
- [ ] 准备好 Token / 访问方式
- [ ] 知道上线分支的命名规则（如 release/xxx）

### 对于需求系统
- [ ] 知道系统的 API 地址
- [ ] 知道查询需求的 API 端点
- [ ] 知道需求对象的字段映射
- [ ] 准备好 Token / 认证方式

### 对于文档系统
- [ ] 决定是用腾讯文档还是自建系统
- [ ] 准备好相应的访问信息

### 对于机器人
- [ ] 准备好 Webhook URL
- [ ] 知道接受的消息格式

---

## 🚀 我能帮你做的

一旦你提供了上面的信息，我会：

1. **适配代码** - 根据你的 API 调整适配器代码
2. **配置文件** - 生成可用的 `.env` 示例
3. **测试脚本** - 写一个简单的测试脚本验证连接
4. **最终部署方案** - 包括 GitHub Actions / GitLab CI 配置
5. **使用手册** - 怎么运行、怎么排查问题

---

## 💡 建议的沟通方式

为了高效，我建议你这样回答我：

```
【VCS 信息】
类型：GitLab / Bitbucket / 两者都有
主地址：xxx
Token：（可以后面再提供，现在先告诉我怎么获取）

【需求系统】
API 地址：xxx
查询端点：xxx
字段映射：
  - 名字字段：name
  - 状态字段：status（可能的值：new, processing, done）
  - 责任人字段：assignee
  - 链接：可以拼接为 {baseUrl}/requirement/{id}
认证：Bearer Token

【文档系统】
选择：腾讯文档 / 自建
如果是自建，提供 API 信息...

【机器人】
Webhook：xxx
消息格式：JSON
示例：{...}
```

---

## ⏱️ 预期时间表

```
现在 → 你提供信息（1天）
  ↓
调整代码 + 测试（1-2天）
  ↓
部署到你的环境（1天）
  ↓
团队培训 + 正式上线（1天）

总计：3-5天 内可以正式上线使用
```

---

## 📞 问题排查

如果某个系统没有 API，常见的替代方案：

| 系统 | 没有API时 | 替代方案 |
|------|---------|--------|
| **文档** | 腾讯文档无API | 生成本地Markdown，你们手动上传 |
| **需求** | 自建系统无API | 需要你们开放API，或者我直接连接数据库（如果可以） |
| **机器人** | 没有Webhook | 可以换成发邮件、Slack、钉钉等其他方式 |

---

## ✅ 现在就告诉我

请用简洁的格式回答上面的四大类问题。我会：
1. 立即调整代码
2. 提供最终的配置示例
3. 帮你完成部署

让我们在**本周内**把这个Agent正式跑起来！🚀

---

**等你的信息！** 💬
