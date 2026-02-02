# 💾 第2-1层：标准Skill库设计

> **使命：** 设计6个可复用的AI Skill，每个Skill都有明确的提示词、输入、输出、成功标准
>
> **核心理念：** 每次需要"分类需求"、"生成代码"、"审查代码"时，不用重新写提示词，直接用标准Skill，就能得到标准质量的结果

---

## 📋 Skill库总览

| 编号 | Skill名称 | 用途 | 触发时机 | 优先级 | 完成度 |
|-----|---------|------|--------|--------|-------|
| **S1** | 需求分类Skill | 快速分类新需求 | 需求阶段开始 | 🔴 高 | 0% |
| **S2** | 代码生成Skill | 根据设计生成初始代码 | 开发阶段开始 | 🔴 高 | 0% |
| **S3** | CodeReview Skill | AI预审代码+标注风险 | 每次PR提交 | 🔴 高 | 0% |
| **S4** | 配置检查Skill | 防止配置错误 | CodeReview + 发版前 | 🔴 高 | 0% |
| **S5** | 测试生成Skill | 自动生成测试用例 | 测试阶段开始 | 🟡 中 | 0% |
| **S6** | 冒烟测试Skill | 自动化UI测试 + 可用性检测 | 发版前 | 🟡 中 | 0% |

---

## 🔴 S1：需求分类Skill

### 📌 用途

快速将产品PRD自动分类，生成：
- 需求规模（大/中/小）
- 工期估计（精确到人日）
- 风险等级（低/中/高）
- 技术复杂度（简单/中等/复杂）
- 关键依赖和假设
- 建议的处理方式（单独处理/可合并）

### 🔧 触发方式

```
【场景1】PM提交新需求
  输入：产品PRD（Markdown或纯文本）
  时机：需求评审前
  责任人：PM（点击按钮运行）

【场景2】定期需求批量分类
  输入：一周的需求清单（多个PRD）
  时机：周一早上，技术周会前
  责任人：Tech Lead（批量运行）
```

### 📥 输入格式

```
产品PRD:
  标题: [需求名称]
  背景: [为什么要做]
  功能描述: [具体要做什么]
  涉及模块: [哪些系统/页面/接口]
  优先级: [P0/P1/P2]
  期望上线时间: [YYYY-MM-DD]
```

### 📤 输出格式

```json
{
  "需求ID": "REQ-2024-001",
  "需求名称": "WES系统国际化升级",
  "分类": {
    "规模": "中等（5-15人日）",
    "工期估计": "12人日 ≈ 25个工作日（假设5-6人日/天的产能）",
    "风险等级": "中风险",
    "技术复杂度": "中等",
    "关键复杂点": [
      "涉及100+ 页面翻译提取",
      "国际化框架升级（i18n库更新）",
      "翻译内容质量检查"
    ]
  },
  "关键依赖": [
    "翻译服务API（需采购或对接）",
    "设计规范更新（国际化排版）"
  ],
  "假设和约束": [
    "翻译文案由产品提供（不由开发翻译）",
    "只支持5种语言（英、日、韩、繁中、德）",
    "不影响现有英文版本"
  ],
  "建议处理": {
    "建议方式": "单独处理（不可合并）",
    "原因": "涉及系统级改动，需要完整的工程期",
    "建议时间": "单独启动，25天内交付",
    "是否可与其他需求并行": "可以，不阻塞其他功能开发"
  },
  "可能遗漏的风险": [
    "时间格式国际化（日期/时间显示）",
    "数字格式国际化（金额/数量显示）",
    "RTL语言支持（如果未来需要）",
    "用户偏好设置的多语言存储"
  ],
  "建议的技术方案初稿": "...",
  "预计工作量拆分": {
    "需求分析": "1人日",
    "技术方案设计": "2人日",
    "代码实现": "6人日",
    "测试": "2人日",
    "发版和问题修复": "1人日"
  }
}
```

### 💬 提示词模板

```
你是一个资深的技术管理者和项目经理。你需要对一个新的产品需求进行快速评估和分类。

## 需求信息
[用户粘贴的PRD内容]

## 你的任务（按照这个顺序）

### 第1步：快速理解
简述这个需求的核心目标（1-2句话）

### 第2步：规模估计
根据以下维度估计规模：
- 涉及的系统/模块个数
- 代码改动的大小（百行量级）
- 新增功能vs改造已有功能
- 测试复杂度
- 集成难度

估计规模档位：小（1-3人日）/ 中（5-15人日）/ 大（15+人日）

### 第3步：工期评估
基于规模，按照这个转换关系估计工期：
- 小需求：3-5人日工作 ≈ 5-7个工作日（一周）
- 中需求：5-15人日工作 ≈ 25个工作日（一个月）
- 大需求：15+人日工作 ≈ 30-40个工作日（6-8周）

**重要：工期包含 需求分析(10%) + 设计(15%) + 开发(50%) + 测试(20%) + 发版(5%)**

### 第4步：风险评估
识别以下维度的风险：
1. 技术风险（是否用了新框架/技术）
2. 集成风险（是否涉及多个系统集成）
3. 依赖风险（是否依赖第三方服务/外部团队）
4. 时间风险（期望上线时间是否紧张）
5. 质量风险（是否需要严格的线上监控）

风险等级：低（<10%失败概率）/ 中（10-30%）/ 高（>30%）

### 第5步：复杂度评分
从技术维度评分（1-10分，10分最复杂）：
- 5分以下：简单（使用现有框架和组件）
- 5-7分：中等（需要新的集成或算法）
- 7分以上：复杂（新框架、新算法或跨系统改造）

### 第6步：识别遗漏的风险
根据这个需求，思考：
- 是否遗漏了文案国际化？
- 是否遗漏了性能优化？
- 是否遗漏了数据迁移或兼容性问题？
- 是否遗漏了安全检查？
- 是否遗漏了第三方集成？

列出可能遗漏的3-5个风险点。

### 第7步：建议处理方式
基于上面的分析，建议：
- 这个需求应该单独处理，还是可以与其他需求合并？
- 如果可以合并，与什么样的需求合并比较合适？
- 建议的团队配置（多少人，什么角色）？
- 是否可以与其他需求并行开发？

### 第8步：工作量拆分
将工作量拆分到各个环节：
- 需求分析：X人日
- 技术方案设计：X人日
- 代码实现：X人日
- 测试：X人日
- 发版和问题修复：X人日

**请输出JSON格式的结果**，字段见上面的"输出格式"部分。
```

### ✅ 成功标准

| 指标 | 目标 | 验证方法 |
|-----|-----|--------|
| **分类准确率** | > 95% | 与实际项目数据对比 |
| **工期估计偏差** | < 20% | (预估工期 vs 实际工期) |
| **风险识别覆盖** | > 85% | 项目完成后review遗漏了哪些风险 |
| **处理建议采纳率** | > 80% | Tech Lead采纳的建议占比 |
| **响应时间** | < 2分钟 | 从提交到得到结果 |

### 🎯 优化方向

```
版本1（当前）：标准提示词
  ↓
版本2（3个月）：加入历史项目的参考数据
  - 维护一个"项目数据库"（历史5个大/中/小项目的实际工期）
  - S1会自动对标"这个新需求和历史项目最相似"
  - 这样估时会更准确

版本3（6个月）：加入团队特性学习
  - 学习"这个团队的生产效率"（是否总是快交付/慢交付）
  - 学习"这个团队擅长的技术方向"（对某些技术的估时会更准）
  - 自动调整工期估计
```

---

## 🔴 S2：代码生成Skill

### 📌 用途

根据已确认的技术方案和API定义，AI生成初始代码框架，包含：
- 项目目录结构（已搭建）
- API实现框架（70-80%代码）
- 数据库Schema（如果涉及）
- 业务逻辑的骨架代码（需要补充细节）
- 单元测试模板（待补充）

### 🔧 触发方式

```
【场景1】新功能开发
  输入：技术方案文档 + API定义 + 业务逻辑描述
  时机：项目框架搭建完毕，准备开始编码
  责任人：Lead Developer（选择模板+配置参数后运行）

【场景2】新增API
  输入：单个API的设计文档
  时机：API设计评审通过
  责任人：Developer（直接生成这一个API的实现）
```

### 📥 输入格式

```markdown
# 技术方案文档

## 1. API定义

### POST /api/v1/user/register
**请求体：**
```json
{
  "email": "string (邮箱)",
  "password": "string (密码，6-20字符)",
  "nickname": "string (昵称，2-20字符)"
}
```

**响应体：**
```json
{
  "code": 0,
  "data": {
    "userId": "string",
    "email": "string",
    "nickname": "string",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**错误场景：**
- 邮箱已存在 → code: 1001, message: "邮箱已被注册"
- 密码格式错误 → code: 1002, message: "密码不符合要求"
- 数据库错误 → code: 500, message: "服务器内部错误"

## 2. 业务逻辑

- 用户邮箱需要唯一（不重复）
- 密码需要加密存储（使用bcrypt）
- 用户创建后自动发送验证邮件（异步）
- 7天内未验证的账户自动删除

## 3. 技术栈

- 框架：Node.js + Express
- 数据库：PostgreSQL
- ORM：Sequelize
- 密码加密：bcrypt
- 邮件服务：SendGrid API
```

### 📤 输出格式

```
生成的文件结构：
src/
├─ api/
│  ├─ routes/
│  │  └─ user.js          # 路由定义
│  ├─ controllers/
│  │  └─ userController.js # 业务逻辑
│  ├─ models/
│  │  └─ User.js          # 数据模型
│  ├─ validators/
│  │  └─ userValidator.js # 数据验证
│  └─ services/
│     └─ emailService.js  # 邮件服务
├─ config/
│  └─ database.js         # 数据库配置
└─ tests/
   └─ user.test.js        # 测试用例

【示例】user.js (路由文件，这是AI生成的)
const express = require('express');
const userController = require('../controllers/userController');
const userValidator = require('../validators/userValidator');

const router = express.Router();

// 用户注册接口
router.post('/register',
  userValidator.validateRegister,  // 数据验证中间件
  userController.register          // 业务处理
);

module.exports = router;

【示例】userController.js (业务逻辑，AI生成70%，需要人工补充)
const User = require('../models/User');
const emailService = require('../services/emailService');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { email, password, nickname } = req.body;

    // 【AI生成】检查邮箱是否已存在
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        code: 1001,
        message: '邮箱已被注册'
      });
    }

    // 【AI生成】密码加密
    const hashedPassword = await bcrypt.hash(password, 10);

    // 【AI生成】创建用户
    const user = await User.create({
      email,
      password: hashedPassword,
      nickname,
      emailVerified: false
    });

    // 【需要人工补充】发送验证邮件（异步，不阻塞响应）
    // emailService.sendVerificationEmail(user.id, email).catch(err => {
    //   console.error('发送邮件失败:', err);
    // });

    // 【AI生成】返回响应
    res.status(201).json({
      code: 0,
      data: {
        userId: user.id,
        email: user.email,
        nickname: user.nickname,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('注册失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器内部错误'
    });
  }
};
```

### 💬 提示词模板

```
你是一个资深的全栈工程师，擅长快速生成高质量的项目代码。

## 项目信息
技术栈：[Node.js / Python / Java / etc.]
框架：[Express / Django / Spring / etc.]
数据库：[PostgreSQL / MySQL / MongoDB / etc.]

## 技术方案
[用户粘贴的完整技术方案文档]

## 你的任务

### 第1步：分析需求
从技术方案中提取：
- 核心API有哪些？（列出清单）
- 数据模型有哪些？（列出核心字段）
- 业务逻辑的关键点是什么？
- 是否有异步操作？（队列、后台任务）
- 是否有外部依赖？（第三方API）

### 第2步：生成目录结构
根据[技术栈]生成标准的项目结构。遵循这个原则：
- 按职责分层（routes → controllers → services → models）
- 配置文件单独放在 config/
- 工具函数放在 utils/
- 测试文件与源文件平行放置

### 第3步：生成核心代码
对于每个核心API，生成：

**路由文件**
- 定义路由和HTTP方法
- 关联数据验证中间件
- 调用控制器方法

**控制器文件**
- 处理HTTP请求
- 调用Service层的业务逻辑
- 返回格式化的HTTP响应
- 包含必要的错误处理

**Service文件**
- 实现核心业务逻辑
- 调用Model查询数据
- 实现错误处理和日志

**Model文件**
- 定义数据模型（Schema）
- 定义关系（OneToMany等）
- 定义索引和约束

**Validator文件**
- 定义输入验证规则
- 生成中间件函数

### 第4步：生成数据库Schema
如果涉及数据库：
- 生成数据库初始化脚本
- 定义所有表的Schema
- 定义索引和外键关系
- 添加必要的约束和验证

### 第5步：生成测试模板
为每个核心API生成单元测试框架（不用实现具体测试逻辑，只提供模板）

### 第6步：标注哪些代码需要人工补充
对于以下代码，用注释标注"【需要人工补充】"：
- 复杂业务逻辑的细节部分（估计人工需要30%工作量）
- 外部API调用的处理
- 错误处理的具体细节
- 性能优化的部分

【重要】：不要生成100%完整的代码。生成70-80%的框架代码，让开发者补充剩余20-30%的业务细节。

### 第7步：生成README
为这个模块生成README，包含：
- 功能简介
- 依赖的第三方库和版本
- 如何运行测试
- 关键函数的说明

### 输出要求
1. 生成的所有代码**必须能直接运行**（导入关系、依赖都正确）
2. 使用现代的最佳实践（async/await、错误处理等）
3. 代码要有注释，但注释要简洁（不要冗余）
4. 使用这个项目的编码规范（如果提供了）
5. 所有关键变量都要有类型注解（如果是TypeScript）

### 最后：生成"实现清单"
为开发者生成一个清单，列出：
- [ ] API 1 完成基本实现
- [ ] API 2 完成基本实现
- ...
- [ ] 所有数据库迁移脚本执行
- [ ] 所有测试用例编写
- [ ] 所有代码通过CodeReview
```

### ✅ 成功标准

| 指标 | 目标 | 验证方法 |
|-----|-----|--------|
| **代码可运行性** | 100% | 直接运行能否报错 |
| **代码完成度** | 70-80% | 开发者需要补充多少代码 |
| **设计规范遵循** | 100% | 是否遵循项目的目录结构、命名规范 |
| **测试覆盖率** | > 50%（框架） | 测试模板是否完整 |
| **代码质量** | > 8/10 | CodeReview的评分 |
| **生成时间** | < 5分钟 | 从提交到得到代码 |

### 🎯 优化方向

```
版本1（当前）：通用的代码生成
  ↓
版本2（2个月）：学习项目的代码风格
  - S2学习这个项目的既有代码
  - 生成的代码自动匹配现有风格
  - 减少CodeReview的风格问题

版本3（4个月）：学习团队的常见模式
  - S2学习"这个团队常用的技巧和模式"
  - 例如：缓存策略、错误处理模式、日志规范
  - 生成的代码自动应用这些模式

版本4（6个月）：支持多种架构
  - 支持微服务架构（服务通信、分布式事务）
  - 支持前端框架（React组件生成）
  - 支持算法优化（大数据量的查询优化）
```

---

## 🔴 S3：CodeReview Skill

### 📌 用途

每次开发者提交PR，S3自动预审代码，输出：
- 安全漏洞风险（SQL注入、XSS等）
- 代码规范问题（命名、缩进、注释）
- 逻辑风险点（NULL检查、边界条件、错误处理）
- 配置文件检查（**关键！防止白屏事故**）
- 性能问题（N+1问题、未优化的查询）
- 改进建议
- **标注哪些问题是「人工必须重点关注」的**

### 🔧 触发方式

```
【自动触发】Github / GitLab PR
  输入：PR的代码变更（diff）
  时机：PR创建时自动运行
  输出：评论在PR上，标注风险点
  责任人：系统自动运行

【手动触发】CodeReview工具
  输入：一个文件或一个代码片段
  时机：代码审查时
  责任人：Reviewer手动调用（如果需要重新审查）
```

### 📥 输入格式

```
Git diff 格式（标准的git diff）

例如：
```diff
--- a/src/api/controllers/userController.js
+++ b/src/api/controllers/userController.js
@@ -10,6 +10,15 @@ exports.register = async (req, res) => {
   const { email, password, nickname } = req.body;

   // 检查邮箱是否已存在
+  const existingUser = await User.findOne({
+    where: { email }
+  });
+  if (existingUser) {
+    return res.status(400).json({
+      code: 1001,
+      message: '邮箱已被注册'
+    });
+  }

   // 密码加密
   const hashedPassword = await bcrypt.hash(password, 10);
@@ -20,6 +29,8 @@ exports.register = async (req, res) => {

   // 返回响应
   res.status(201).json({
+    // 【问题】没有错误处理
     code: 0,
     data: {
       userId: user.id,
```

### 📤 输出格式

```json
{
  "summary": "发现3个安全风险，2个规范问题，建议重点关注：密码验证逻辑、配置文件中的敏感信息",
  "totalIssues": 5,
  "issuesByCategory": {
    "安全风险": 3,
    "代码规范": 2,
    "性能问题": 0,
    "逻辑问题": 0
  },
  "issues": [
    {
      "severity": "🔴 高风险",
      "category": "安全风险",
      "line": 25,
      "code": "const hashedPassword = await bcrypt.hash(password, 10);",
      "issue": "密码加密轮数太低（10轮），建议增加到12-14轮，提高安全性",
      "suggestion": "const hashedPassword = await bcrypt.hash(password, 12);",
      "reference": "OWASP密码存储规范"
    },
    {
      "severity": "🔴 高风险",
      "category": "安全风险",
      "file": "config/database.js",
      "issue": "数据库连接字符串硬编码在代码中，包含明文密码",
      "suggestion": "改用环境变量：process.env.DB_PASSWORD",
      "reference": "敏感信息管理规范"
    },
    {
      "severity": "🟡 中风险",
      "category": "逻辑问题",
      "line": 35,
      "code": "await emailService.sendVerificationEmail(user.id, email);",
      "issue": "邮件发送失败会导致整个请求失败，应该异步处理避免阻塞",
      "suggestion": "emailService.sendVerificationEmail(...).catch(err => { console.error(...) });",
      "reference": "异步操作最佳实践"
    },
    {
      "severity": "🟡 中风险",
      "category": "规范问题",
      "line": 40,
      "code": "console.error('注册失败:', error);",
      "issue": "错误处理不够细致，需要区分不同类型的错误（数据库错误 vs 业务逻辑错误）",
      "suggestion": "区分错误类型，返回相应的HTTP状态码",
      "reference": "错误处理规范"
    },
    {
      "severity": "🟢 低风险",
      "category": "规范问题",
      "line": 15,
      "code": "const existingUser = await User.findOne({ where: { email } });",
      "issue": "变量名可以更清晰，existingUser vs userExists 哪个更好？",
      "suggestion": "const userExists = await User.findOne({ where: { email } });",
      "reference": "变量命名规范"
    }
  ],
  "配置文件检查": {
    "检查项": [
      { "项目": "敏感信息（密码、API Key、Token）", "状态": "🔴 发现问题", "说明": "database.js 第5行有明文密码" },
      { "项目": "配置文件拼写检查", "状态": "✅ 通过", "说明": "所有配置key正确" },
      { "项目": "配置值类型检查", "状态": "✅ 通过", "说明": "所有类型匹配" },
      { "项目": "环境变量使用", "状态": "✅ 通过", "说明": "正确使用了环境变量" }
    ],
    "关键发现": "发现1个严重漏洞：数据库连接字符串包含明文密码，必须立即修复，防止安全泄露"
  },
  "人工重点关注项": [
    "【必查】安全风险：数据库连接字符串硬编码明文密码 → 立即改成环境变量",
    "【必查】配置检查：config/database.js 文件中的敏感信息 → 使用.env + .gitignore",
    "【重点】逻辑问题：邮件发送错误处理 → 改成异步不阻塞主流程",
    "【建议】性能：如果用户量大，考虑对User.findOne添加索引"
  ],
  "建议": {
    "立即修复": [
      "敏感信息泄露（database.js）",
      "密码加密强度不足（bcrypt轮数）"
    ],
    "下次优化": [
      "邮件服务异步处理",
      "错误类型区分"
    ],
    "可参考": [
      "OWASP安全编码规范",
      "项目代码规范文档"
    ]
  },
  "评分": {
    "安全性": 6,
    "性能": 8,
    "可维护性": 7,
    "总分": 7,
    "是否通过CR": false,
    "理由": "存在安全漏洞（敏感信息泄露），必须修复后才能合并"
  }
}
```

### 💬 提示词模板

```
你是一个资深的代码审查专家。你需要对一个代码变更进行严格的代码审查，并标注所有风险点。

## 审查环境信息
项目类型：[Node.js / Python / Java / etc.]
技术栈：[Express / Django / Spring / etc.]
编码规范文档：[可选，如果提供了规范文档的URL]
公司安全策略：[敏感信息禁止硬编码，必须使用环境变量]

## 代码变更（Git Diff）
[用户粘贴的代码变更]

## 你的任务（严格执行）

### 第1步：快速概览
总结这个PR改动了什么（1-2句话）

### 第2步：安全检查（最重要！）
检查以下安全风险：
- 【敏感信息】是否硬编码了密码、API Key、Token、数据库连接字符串？
- 【SQL注入】是否有直接拼接SQL的代码？
- 【XSS风险】是否有未转义的用户输入？
- 【认证/授权】是否遗漏了权限检查？
- 【加密强度】是否使用了弱加密算法？
- 【依赖风险】是否使用了已知的高危漏洞库？

对每个风险，标注严重程度：
- 🔴 高风险：立即修复，影响线上安全
- 🟡 中风险：重点修复，影响用户隐私
- 🟢 低风险：建议修复，提高代码质量

### 第3步：配置文件检查（防止白屏事故！）
特别关注所有配置文件（.config.js, .env, 配置定义等）：
- 检查所有配置key的拼写（是否有typo？）
- 检查配置值的类型（boolean vs string vs number）
- 检查配置值的范围（是否在预期范围内？）
- 检查环境变量的使用（是否正确引用？）
- 检查敏感信息是否暴露

**参考案例**：过去因为配置typo（PDP2D_SIZE写错）导致线上白屏，所以这一项特别重要！

### 第4步：代码规范检查
检查以下规范：
- 命名规范（变量、函数、类命名是否清晰）
- 代码缩进和格式
- 注释是否必要且清晰
- 是否有过时的代码或TODO未完成
- 导入顺序是否规范

### 第5步：逻辑和错误处理检查
- NULL检查：是否检查了所有可能为NULL的值？
- 边界条件：是否处理了边界情况（空数组、0值等）？
- 错误处理：是否有try-catch，是否区分错误类型？
- 异步操作：是否正确处理了Promise和async-await？
- 资源释放：是否有内存泄漏风险（连接、流等）？

### 第6步：性能检查
- N+1问题：循环中是否有数据库查询？
- 大对象：是否在内存中加载了过大的数据集？
- 算法复杂度：是否有O(n²)或以上的循环？
- 缓存：是否应该加缓存但没加？

### 第7步：标注"人工必须关注"的项目
从上面的所有问题中，筛选出"开发者必须重点关注、不能忽视"的项目：
- 必查项（安全风险、配置问题）：必须修复
- 重点项（逻辑问题、性能问题）：强烈建议修复
- 建议项（规范问题、最佳实践）：可以考虑修复

### 第8步：生成总体评分
- 安全性（1-10）
- 性能（1-10）
- 可维护性（1-10）
- 总分（平均）
- 是否通过CR（只有没有高风险才能通过）

### 输出格式
**请输出JSON格式**（见上面的"输出格式"部分），包含：
- 所有发现的问题（按严重程度排序）
- 配置文件检查的结果
- 人工重点关注的项目清单
- 建议（立即修复 / 下次优化 / 可参考）
- 评分和是否通过

### 重要原则
1. **宁可过度检查，不要遗漏安全风险**
2. **配置文件必须100%检查**（防止重复PDP2D_SIZE事故）
3. **对于不确定的问题，也要标注出来让人工判断**
4. **如果有高风险，必须标注"是否通过CR: false"**
5. **人工关注项要非常明确，让reviewer能快速定位问题**
```

### ✅ 成功标准

| 指标 | 目标 | 验证方法 |
|-----|-----|--------|
| **安全风险发现率** | > 90% | 与人工CR对比，漏掉多少安全风险 |
| **配置检查准确率** | > 99.5% | 配置问题的识别准确度 |
| **误报率** | < 5% | 提出的问题中有多少是假的 |
| **CR时间减少** | > 70% | CR从5h → 1h |
| **问题发现率** | ↑ 40% | 与纯人工CR对比，发现的问题是否更多 |
| **响应时间** | < 2分钟 | PR提交到得到评论 |

---

## 🔴 S4：配置检查Skill

### 📌 用途

这是**最关键的防护**。在CodeReview和发版前，自动检查所有配置文件，防止出现PDP2D_SIZE这样的白屏事故。

输出：
- 拼写检查（typo）
- 类型检查（boolean vs string vs number）
- 范围检查（值是否在预期范围内）
- 敏感信息检查（是否暴露了密码/token）
- 环境变量使用检查（是否正确引用）
- **风险等级：发现问题则立即阻止部署**

### 🔧 触发方式

```
【触发点1】CodeReview时
  自动在S3的输出中包含S4的结果

【触发点2】发版前（最关键）
  手动运行或自动运行
  命令：scripts/check-config.js
  如果有问题，自动阻止部署

【触发点3】定期检查
  每天自动扫描所有配置文件（可选）
```

### 📥 输入格式

```
项目配置文件（可以是多种格式）：

【格式1】JavaScript配置文件
config/index.js:
```javascript
module.exports = {
  port: process.env.PORT || 3000,
  database: {
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'secret123',  // 【问题】明文密码
    database: 'myapp_db'
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PRT,  // 【问题】拼写错误
    password: process.env.REDIS_PASS
  },
  cache: {
    ttl: 3600  // 秒数
  }
}
```

【格式2】环境文件 .env
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASS=secret123
REDIS_URL=redis://localhost:6379
CACHE_TTL=3600
```

【格式3】配置Schema定义
```javascript
const configSchema = {
  port: { type: 'number', min: 1, max: 65535, required: true },
  database: {
    host: { type: 'string', required: true },
    port: { type: 'number', min: 1, max: 65535, required: true },
    password: { type: 'string', secret: true, required: true }
  },
  redis: {
    host: { type: 'string', default: 'localhost' },
    port: { type: 'number', default: 6379 },
    password: { type: 'string', secret: true, required: false }
  },
  cache: {
    ttl: { type: 'number', min: 60, max: 86400, default: 3600 }
  }
}
```
```

### 📤 输出格式

```json
{
  "configFile": "config/index.js",
  "timestamp": "2024-01-15T10:30:00Z",
  "overallStatus": "🔴 发现严重问题，阻止部署",
  "issues": [
    {
      "severity": "🔴 严重",
      "type": "安全风险",
      "item": "database.password",
      "issue": "数据库密码硬编码为明文 'secret123'",
      "expectedBehavior": "应该使用环境变量：process.env.DB_PASSWORD",
      "currentValue": "'secret123'",
      "fix": "password: process.env.DB_PASSWORD"
    },
    {
      "severity": "🔴 严重",
      "type": "拼写错误",
      "item": "redis.port",
      "issue": "环境变量名拼写错误：'REDIS_PRT' 应该是 'REDIS_PORT'",
      "expectedBehavior": "REDIS_PORT",
      "currentValue": "REDIS_PRT",
      "impact": "线上Redis连接会超时，导致缓存不可用，页面响应慢",
      "fix": "port: process.env.REDIS_PORT"
    },
    {
      "severity": "🟡 中等",
      "type": "范围检查",
      "item": "cache.ttl",
      "issue": "缓存TTL = 3600秒（1小时），对于高频访问的数据可能太长",
      "expectedBehavior": "建议范围：60-600秒（1分钟到10分钟）",
      "currentValue": 3600,
      "suggestion": "考虑改为600秒，或者根据业务需要调整"
    },
    {
      "severity": "🟢 提示",
      "type": "最佳实践",
      "item": "database.host",
      "issue": "数据库地址硬编码为 'localhost'，线上环境应该用实际服务器地址",
      "currentValue": "'localhost'",
      "suggestion": "改为环境变量或配置管理系统"
    }
  ],
  "checkResults": {
    "拼写检查": { "status": "🔴 失败", "errors": 1, "detail": "发现1个环境变量拼写错误" },
    "类型检查": { "status": "✅ 通过", "errors": 0 },
    "范围检查": { "status": "🟡 警告", "warnings": 1 },
    "敏感信息检查": { "status": "🔴 失败", "errors": 2, "detail": "发现2处敏感信息硬编码" },
    "环境变量引用检查": { "status": "🟡 警告", "unresolvedVars": ["REDIS_PRT"] }
  },
  "deploymentBlockers": [
    "❌ 拼写错误：REDIS_PRT 应该是 REDIS_PORT（会导致Redis连接失败）",
    "❌ 安全风险：database.password硬编码明文（泄露数据库密码）"
  ],
  "recommendations": {
    "立即修复（部署前必须）": [
      "修复拼写错误：REDIS_PRT → REDIS_PORT",
      "移除硬编码密码，使用环境变量"
    ],
    "建议修改": [
      "调整cache.ttl到合理范围（600秒）"
    ],
    "最佳实践": [
      "所有敏感信息都应该用环境变量，不要硬编码"
    ]
  },
  "canDeploy": false,
  "reason": "存在部署阻塞问题：拼写错误导致Redis连接失败，安全风险导致密码泄露"
}
```

### 💬 提示词模板

```
你是一个配置文件检查专家。你的任务是检查项目的所有配置，防止出现配置拼写错误导致线上事故。

## 参考案例
过去发生过的事故：配置拼写错误 "PDP2D_SIZE" 导致线上页面白屏40分钟。因此这项检查非常关键！

## 项目配置信息
项目框架：[Express / Django / Spring / etc.]
环境变量文件：[.env / .env.local / etc.]
配置文件位置：[config/ / settings.py / application.yml]

## 需要检查的配置
[用户粘贴的所有配置文件内容]

## 检查规范（按照这个顺序）

### 第1步：拼写检查（最重要）
检查所有环境变量、配置key的拼写：
- 是否有typo（少字、多字、大小写错误）？
- 环境变量的引用是否正确？（例如：REDIS_PRT vs REDIS_PORT）
- 配置key的拼写是否一致？（不要有些地方写 userPassword，有些写 password）

对于每个拼写错误，评估其影响：
- 低：这个配置可选，不会导致程序崩溃
- 中：这个配置影响功能，会导致功能不可用
- 高：这个配置影响核心功能，会导致线上事故

### 第2步：类型检查
检查配置值的类型是否与定义匹配：
- 布尔值：应该用 true/false，不要用 "true"/"false" 字符串
- 数字：应该用 3000，不要用 "3000" 字符串（除非规范要求）
- 字符串：应该用引号包围，例如 "localhost"

### 第3步：范围检查
检查配置值是否在合理范围：
- 端口号：1-65535
- 超时时间：应该在可接受范围（太短导致超时，太长导致等待）
- 缓存TTL：应该根据业务需要设置
- 线程池大小：应该根据机器配置设置
- 日志级别：应该是 DEBUG / INFO / WARN / ERROR

### 第4步：敏感信息检查
检查是否有以下敏感信息硬编码：
- 数据库密码、API Key、Token、JWT密钥
- 第三方服务的凭证（AWS Key、阿里云密钥等）
- 内部URL或IP地址（应该用环境变量）

对每个敏感信息，标注：
- 应该移到环境变量
- 应该用加密的配置管理系统（如 HashiCorp Vault）

### 第5步：环境变量使用检查
检查所有环境变量的引用是否正确：
- process.env.XXX 的 XXX 是否在 .env 文件中定义？
- 是否有拼写错误导致环境变量读取失败？
- 是否所有必需的环境变量都有定义？

### 第6步：生成部署检查清单
基于上面的检查，生成清单：
- 哪些问题是"部署阻塞"（必须修复，否则无法部署）？
- 哪些是"警告"（应该修复，但不一定阻塞部署）？
- 哪些是"建议"（最佳实践，可以下次改进）？

### 第7步：生成部署报告
输出JSON格式的报告（见上面的输出格式部分），包含：
- 所有发现的问题及其影响
- 部署阻塞清单
- 修复建议
- 最终判决：canDeploy: true/false

### 重要原则
1. **严格执行** - 不要放过任何拼写错误，即使看起来很小
2. **影响评估** - 对每个错误评估其在线上的影响
3. **阻塞部署** - 如果有严重问题，必须阻止部署
4. **清晰建议** - 给出明确的修复建议，不要模糊
5. **参考案例** - 参考PDP2D_SIZE事故，强调拼写检查的重要性
```

### ✅ 成功标准

| 指标 | 目标 | 验证方法 |
|-----|-----|--------|
| **拼写错误发现率** | 100% | 是否漏掉任何typo |
| **安全漏洞发现率** | 100% | 是否发现所有硬编码的敏感信息 |
| **范围错误发现率** | > 95% | 是否发现配置值不在范围内的情况 |
| **误报率** | < 2% | 提出的问题中有多少是假的 |
| **部署阻塞准确率** | 100% | 是否正确判断什么时候应该阻塞部署 |
| **响应时间** | < 1分钟 | 从提交到得到报告 |

---

## 🟡 S5：测试生成Skill

### 📌 用途

根据需求和代码，自动生成测试用例，包含：
- 单元测试用例（针对单个函数）
- 功能测试用例（针对整个API或功能）
- 回归测试用例（检查是否破坏了已有功能）
- 边界测试（空值、极端值、错误情况）

目标：**测试覆盖率 > 95%**

### 🔧 触发方式

```
【场景1】代码生成后
  S2生成代码 → S5自动生成对应的测试用例
  输入：代码文件
  输出：测试文件框架（待补充边界情况）

【场景2】测试阶段
  QA手动运行S5生成测试用例
  输入：需求文档 + API定义
  输出：完整的测试用例清单
```

### 📥 输入格式

```markdown
# API规范

## POST /api/v1/user/register
**功能**：用户注册

**请求体**：
- email: string (邮箱，5-100字符)
- password: string (密码，6-20字符，需要包含字母和数字)
- nickname: string (昵称，2-20字符)

**响应**：
- 成功（200）：{ code: 0, data: { userId, email, nickname, createdAt } }
- 邮箱已存在（400）：{ code: 1001, message: "邮箱已被注册" }
- 密码格式错误（400）：{ code: 1002, message: "密码需要包含字母和数字" }
- 服务器错误（500）：{ code: 500, message: "服务器内部错误" }

**边界条件**：
- 邮箱需要唯一（不重复）
- 密码需要加密存储
- 用户创建后自动发送验证邮件
- 7天内未验证的账户自动删除
```

### 📤 输出格式

```javascript
// 【示例】单元测试用例（Jest语法）

describe('User Registration API', () => {

  describe('POST /api/v1/user/register', () => {

    // 【正常流程】
    test('should register user successfully with valid data', async () => {
      const requestBody = {
        email: 'user@example.com',
        password: 'password123',
        nickname: 'John Doe'
      };

      const response = await request(app)
        .post('/api/v1/user/register')
        .send(requestBody);

      expect(response.status).toBe(200);
      expect(response.body.code).toBe(0);
      expect(response.body.data.userId).toBeDefined();
      expect(response.body.data.email).toBe('user@example.com');
    });

    // 【错误流程1】邮箱已存在
    test('should return 1001 when email already exists', async () => {
      // 先创建一个用户
      await User.create({
        email: 'existing@example.com',
        password: 'hashed_password',
        nickname: 'Existing User'
      });

      // 再用同一个邮箱注册
      const response = await request(app)
        .post('/api/v1/user/register')
        .send({
          email: 'existing@example.com',
          password: 'password123',
          nickname: 'New User'
        });

      expect(response.status).toBe(400);
      expect(response.body.code).toBe(1001);
      expect(response.body.message).toContain('已被注册');
    });

    // 【错误流程2】密码格式错误
    test('should return 1002 when password is invalid', async () => {
      const response = await request(app)
        .post('/api/v1/user/register')
        .send({
          email: 'user@example.com',
          password: 'password',  // 不包含数字
          nickname: 'John Doe'
        });

      expect(response.status).toBe(400);
      expect(response.body.code).toBe(1002);
    });

    // 【边界测试】邮箱长度验证
    describe('Email validation', () => {
      test('should reject email shorter than 5 characters', async () => {
        const response = await request(app)
          .post('/api/v1/user/register')
          .send({
            email: 'a@b',
            password: 'password123',
            nickname: 'John'
          });

        expect(response.status).toBe(400);
      });

      test('should reject email longer than 100 characters', async () => {
        const longEmail = 'a'.repeat(90) + '@example.com';
        const response = await request(app)
          .post('/api/v1/user/register')
          .send({
            email: longEmail,
            password: 'password123',
            nickname: 'John'
          });

        expect(response.status).toBe(400);
      });

      test('should reject invalid email format', async () => {
        const response = await request(app)
          .post('/api/v1/user/register')
          .send({
            email: 'not-an-email',
            password: 'password123',
            nickname: 'John'
          });

        expect(response.status).toBe(400);
      });
    });

    // 【边界测试】昵称验证
    describe('Nickname validation', () => {
      test('should reject nickname shorter than 2 characters', async () => {
        const response = await request(app)
          .post('/api/v1/user/register')
          .send({
            email: 'user@example.com',
            password: 'password123',
            nickname: 'J'
          });

        expect(response.status).toBe(400);
      });

      test('should accept nickname with Chinese characters', async () => {
        const response = await request(app)
          .post('/api/v1/user/register')
          .send({
            email: 'user@example.com',
            password: 'password123',
            nickname: '张三'
          });

        expect(response.status).toBe(200);
      });
    });

    // 【边界测试】缺少必需字段
    describe('Required fields validation', () => {
      test('should reject request without email', async () => {
        const response = await request(app)
          .post('/api/v1/user/register')
          .send({
            password: 'password123',
            nickname: 'John'
          });

        expect(response.status).toBe(400);
      });

      test('should reject request without password', async () => {
        const response = await request(app)
          .post('/api/v1/user/register')
          .send({
            email: 'user@example.com',
            nickname: 'John'
          });

        expect(response.status).toBe(400);
      });
    });

    // 【数据验证】
    describe('Data integrity', () => {
      test('should encrypt password before storing', async () => {
        const response = await request(app)
          .post('/api/v1/user/register')
          .send({
            email: 'user@example.com',
            password: 'password123',
            nickname: 'John'
          });

        const user = await User.findOne({ where: { email: 'user@example.com' } });
        expect(user.password).not.toBe('password123');  // 应该是加密后的
      });

      test('should not expose password in API response', async () => {
        const response = await request(app)
          .post('/api/v1/user/register')
          .send({
            email: 'user@example.com',
            password: 'password123',
            nickname: 'John'
          });

        expect(response.body.data.password).toBeUndefined();
      });
    });
  });

  // 【性能测试】
  describe('Performance', () => {
    test('should respond within 500ms', async () => {
      const startTime = Date.now();

      await request(app)
        .post('/api/v1/user/register')
        .send({
          email: 'user@example.com',
          password: 'password123',
          nickname: 'John'
        });

      const duration = Date.now() - startTime;
      expect(duration).toBeLessThan(500);
    });
  });
});
```

### 💬 提示词模板

```
你是一个资深的QA和测试工程师。你需要为一个API或功能生成完整的测试用例。

## API规范
[用户粘贴的API定义]

## 你的任务

### 第1步：理解需求
总结这个API做什么、有哪些输入、期望的输出是什么

### 第2步：提取测试维度
从API规范中提取：
- 正常流程（Happy Path）：输入有效，期望成功响应
- 错误流程（Error Cases）：各种错误情况
- 边界条件（Boundary Cases）：极端值、特殊值
- 安全性（Security）：敏感操作是否有权限检查
- 性能（Performance）：响应时间是否满足要求

### 第3步：设计测试用例
按照以下模板设计测试用例：

**测试用例格式：**
- test_name: 清晰描述测试的目的
- precondition: 测试前的前置条件
- steps: 测试的具体步骤
- expected_result: 期望的结果
- actual_result: 【待执行】实际结果

### 第4步：生成正常流程测试
创建3-5个正常流程的测试用例：
- 最小可用输入（只填必需字段）
- 标准输入（填所有字段）
- 特殊场景（例如：中文、长字符串、特殊字符）

### 第5步：生成错误流程测试
为API定义中的每个错误场景生成测试用例：
- 例如：资源不存在 → 应该返回404
- 例如：权限不足 → 应该返回403
- 例如：参数错误 → 应该返回400

### 第6步：生成边界测试
为每个输入字段生成边界测试：
- 最小值、最大值、为空、NULL、极端值
- 例如：邮箱最短/最长、密码最短/最长
- 例如：年龄0岁、150岁、-1

### 第7步：生成安全性测试
检查是否需要测试：
- SQL注入（参数中包含SQL语句）
- XSS（参数中包含脚本标签）
- 权限验证（是否检查用户权限）
- 敏感信息（是否暴露了密码等）

### 第8步：生成性能测试
- 单个请求的响应时间（应该< 500ms）
- 批量请求的性能（大量并发请求）

### 第9步：输出测试代码
使用项目的测试框架（Jest / Mocha / PyTest / JUnit等）生成可运行的测试代码。

**代码要求：**
- 必须能直接运行（不要缺少导入、配置等）
- 每个测试用例独立（不依赖执行顺序）
- 使用清晰的测试名称（explain what is being tested）
- 包含适当的断言（assert）
- 包含前置数据（setup）和清理（teardown）

### 第10步：生成测试覆盖率报告
输出一个矩阵，显示：
- 每个需求场景是否有对应的测试用例
- 测试覆盖率（期望 > 95%）
```

### ✅ 成功标准

| 指标 | 目标 | 验证方法 |
|-----|-----|--------|
| **测试覆盖率** | > 95% | 代码覆盖率工具测量 |
| **用例完整性** | > 90% | 需求场景覆盖度 |
| **缺陷发现率** | > 80% | 能否发现常见bug |
| **可运行性** | 100% | 生成的测试能否直接运行 |
| **生成时间** | < 3分钟 | 从输入到得到测试代码 |

---

## 🟡 S6：冒烟测试Skill

### 📌 用途

自动化UI测试 + 关键路径可用性检测，确保上线前没有重大问题。

输出：
- 关键路径的可用性检测（页面能否加载、主要功能能否使用）
- 白屏/404/500错误检测
- 页面性能检测（加载时间）
- 截图对比（检测UI是否有明显变化）

目标：**关键路径可用性 > 99.5%**

### 🔧 触发方式

```
【触发点1】发版前自动运行
  时机：部署到测试环境后、部署到生产环境前
  命令：scripts/smoke-test.js
  输出：通过/失败的报告

【触发点2】CI/CD流程
  在GitHub Actions / GitLab CI中自动运行
  部署失败立即通知
```

### 📥 输入格式

```javascript
// smoke-test.config.js - 冒烟测试配置

module.exports = {
  baseUrl: 'https://staging.example.com',  // 或生产URL
  timeout: 30000,  // 每个测试的超时时间（毫秒）

  // 关键路径清单
  criticalPaths: [
    {
      name: '首页加载',
      url: '/',
      expectedStatus: 200,
      expectedElements: ['header', 'nav', 'footer'],
      maxLoadTime: 3000  // 应该在3秒内加载
    },
    {
      name: '用户注册流程',
      steps: [
        { action: 'goto', url: '/register' },
        { action: 'fill', selector: 'input[name="email"]', value: 'test@example.com' },
        { action: 'fill', selector: 'input[name="password"]', value: 'password123' },
        { action: 'fill', selector: 'input[name="nickname"]', value: 'Test User' },
        { action: 'click', selector: 'button[type="submit"]' },
        { action: 'waitFor', selector: '.success-message', timeout: 3000 }
      ]
    },
    {
      name: '用户登录流程',
      steps: [
        { action: 'goto', url: '/login' },
        { action: 'fill', selector: 'input[name="email"]', value: 'user@example.com' },
        { action: 'fill', selector: 'input[name="password"]', value: 'password123' },
        { action: 'click', selector: 'button[type="submit"]' },
        { action: 'waitFor', selector: '.dashboard', timeout: 3000 }
      ]
    },
    {
      name: '数据列表加载',
      url: '/api/users',  // API端点
      expectedStatus: 200,
      checkResponseTime: true,
      maxResponseTime: 1000
    }
  ],

  // 白屏检测
  whitescreenDetection: {
    enabled: true,
    screenshots: ['/', '/dashboard', '/profile']
  },

  // 性能基准
  performanceBenchmark: {
    enabled: true,
    maxPageLoadTime: 3000,
    maxAPIResponseTime: 1000
  }
}
```

### 📤 输出格式

```json
{
  "timestamp": "2024-01-15T14:30:00Z",
  "environment": "staging",
  "overallStatus": "✅ 通过",
  "summaryMetrics": {
    "totalTests": 12,
    "passed": 12,
    "failed": 0,
    "skipped": 0,
    "passRate": "100%",
    "duration": "2m 15s"
  },
  "criticalPathsResults": [
    {
      "name": "首页加载",
      "status": "✅ 通过",
      "statusCode": 200,
      "loadTime": 1250,
      "expectedMaxLoadTime": 3000,
      "elementsFound": ["header", "nav", "footer"],
      "elementsNotFound": [],
      "details": "首页正常加载，所有关键元素都存在"
    },
    {
      "name": "用户注册流程",
      "status": "✅ 通过",
      "steps": [
        { "step": 1, "action": "goto /register", "status": "✅ 成功", "duration": 800 },
        { "step": 2, "action": "fill email", "status": "✅ 成功" },
        { "step": 3, "action": "fill password", "status": "✅ 成功" },
        { "step": 4, "action": "fill nickname", "status": "✅ 成功" },
        { "step": 5, "action": "click submit", "status": "✅ 成功" },
        { "step": 6, "action": "waitFor success-message", "status": "✅ 成功", "duration": 500 }
      ],
      "totalDuration": 2100,
      "details": "注册流程全部通过，用户成功创建"
    },
    {
      "name": "用户登录流程",
      "status": "✅ 通过",
      "details": "登录流程正常，重定向到dashboard"
    },
    {
      "name": "数据列表加载",
      "status": "✅ 通过",
      "statusCode": 200,
      "responseTime": 850,
      "maxResponseTime": 1000,
      "dataPoints": 50,
      "details": "API响应正常，返回50条数据"
    }
  ],
  "errorDetection": {
    "whitescreenErrors": [],
    "404Errors": [],
    "500Errors": [],
    "networkErrors": [],
    "details": "未检测到明显错误"
  },
  "performanceMetrics": {
    "averagePageLoadTime": 1500,
    "averageAPIResponseTime": 850,
    "slowestPage": { "name": "首页", "loadTime": 1800 },
    "slowestAPI": { "name": "数据列表", "responseTime": 950 },
    "allWithinBenchmark": true
  },
  "screenshots": [
    {
      "page": "/",
      "status": "✅ 正常",
      "timestamp": "2024-01-15T14:30:10Z"
    },
    {
      "page": "/dashboard",
      "status": "✅ 正常",
      "timestamp": "2024-01-15T14:30:20Z"
    }
  ],
  "recommendations": [],
  "canDeploy": true,
  "deploymentSummary": "所有关键路径测试通过，系统可以部署到生产环境。没有发现白屏、404、500等错误。性能指标都在基准范围内。"
}
```

### 💬 提示词模板

```
你是一个自动化测试框架（类似Playwright/Puppeteer）。你需要执行一组冒烟测试，检查应用是否能正常运行。

## 测试配置
[用户提供的smoke-test.config.js]

## 你的任务

### 第1步：初始化测试环境
- 启动浏览器（或HTTP客户端）
- 设置timeout和其他参数
- 准备测试数据（如果需要）

### 第2步：执行关键路径测试
对于每个关键路径：
1. 导航到URL或执行操作
2. 检查响应状态（HTTP 200 / 404 / 500）
3. 检查页面是否加载（有没有白屏）
4. 检查关键元素是否存在
5. 测量加载时间和响应时间
6. 对比性能基准

### 第3步：白屏检测
对于配置中的所有页面：
- 获取页面截图
- 分析截图是否存在白屏（完全空白）
- 分析是否有错误信息（404、500等）
- 对比之前的截图（如果有）

### 第4步：性能检测
- 测量每个页面的加载时间
- 测量每个API的响应时间
- 对比基准（expectedMaxLoadTime）
- 识别性能瓶颈

### 第5步：错误识别
检查是否有：
- 网络错误（连接超时、DNS失败等）
- HTTP错误（404、500、503等）
- JavaScript错误（浏览器console里的错误）
- 数据验证错误

### 第6步：生成报告
输出JSON格式的报告（见上面的输出格式部分），包含：
- 总体通过/失败状态
- 每个测试的详细结果
- 错误和警告清单
- 性能指标
- 是否可以部署

### 输出要求
1. 清晰的通过/失败标记
2. 详细的错误信息和堆栈跟踪
3. 截图和视频（如果失败）
4. 性能指标
5. 明确的部署决策（canDeploy: true/false）
```

### ✅ 成功标准

| 指标 | 目标 | 验证方法 |
|-----|-----|--------|
| **关键路径可用性** | > 99.5% | 所有关键操作都能完成 |
| **白屏检测准确率** | 100% | 能否发现所有白屏 |
| **性能检测准确率** | > 95% | 性能指标是否真实反映 |
| **响应时间** | < 5分钟 | 从触发到得到报告 |
| **误报率** | < 2% | 提出的失败中有多少是假的 |

---

## 📊 Skill库使用优先级

### 🔴 第1优先级（必须实现）

- **S1：需求分类** - 决定了项目的规模和工期，是整个流程的入口
- **S2：代码生成** - 提升开发效率的关键（70-80%代码）
- **S3：CodeReview** - 提升代码质量的关键
- **S4：配置检查** - 防止线上事故的关键（最重要！）

预期收益：
- 工期预估准确度 > 80%
- 开发效率提升 40-50%
- 代码质量提升 25-40%
- **线上故障率 ↓ 70%**

### 🟡 第2优先级（逐步实现）

- **S5：测试生成** - 提升测试覆盖率
- **S6：冒烟测试** - 发版前的最后防线

预期收益：
- 测试覆盖率 > 95%
- 上线前发现的缺陷 > 85%
- 线上bug率 ↓ 30%

---

## 🎯 下一步

现在我们已经设计了6个Skill的具体细节：
- ✅ 每个Skill的用途和触发场景
- ✅ 输入输出格式（可以直接用来集成）
- ✅ 提示词模板（可以直接复制到AI工具）
- ✅ 成功标准（怎么评估效果）

**接下来的选择：**

1. **继续深入工具实现** → 选一个Skill（比如S1或S4），写出具体的工作代码
2. **设计项目模板** → 创建项目目录结构和配置文件模板
3. **设计流程SOP** → 把Skill库集成到5个阶段的操作规范里
4. **设计工具链自动化** → 设计CI/CD流程，让Skill库自动运行

**你想做哪个？** 💡
