# 工作流skillCreator

这是一个**工作流型 Skill 创建指南**，帮助你快速为任何项目创建专属的工作流 Skill（如 Code Review 流程）。

## 🎯 这个 Skill 的作用

- 📋 指导你创建项目的工作流 Skill
- 📝 提供完整的步骤流程模板
- ✅ 包含检查清单，确保无遗漏
- 🎨 包含实际示例，易于参考

## 📋 快速导航

| 步骤 | 说明 |
|-----|-----|
| **第一步** | [[#第一步-工作流需求分析|工作流需求分析]] |
| **第二步** | [[#第二步-创建文件结构|创建文件结构]] |
| **第三步** | [[#第三步-编写工作流内容|编写工作流内容]] |
| **第四步** | [[#第四步-完成和验证|完成和验证]] |

---

## 第一步：工作流需求分析

在创建工作流 Skill 前，先明确需求：

### 工作流的基本要素

- [ ] **流程名称** - 这个工作流叫什么？（如：Code Review）
- [ ] **流程目标** - 这个工作流要达到什么目标？
- [ ] **步骤数量** - 分几步？（通常 3-7 步最佳）
- [ ] **输入条件** - 开始工作流前需要什么信息？
- [ ] **输出结果** - 完成工作流后产出什么？
- [ ] **相关规范** - 引用知识库 Skill 中的哪些规范？
- [ ] **检查清单** - 每个步骤有哪些检查项？
- [ ] **结果模板** - 最终的输出格式是什么？

### Code Review 流程示例

```
工作流名称：Code Review（代码审查）
目标：确保代码质量、符合规范、无重大 bug

步骤分解：
  Step 1: 理解上下文 - 了解需求和改动范围
  Step 2: 检查规范 - 是否遵守编码规范
  Step 3: 检查逻辑 - 代码逻辑是否正确
  Step 4: 检查影响 - 是否有副作用和风险
  Step 5: 整理反馈 - 汇总意见，分级输出

输入：PR/MR，包含代码变更
输出：Code Review 反馈意见

关键规范引用：
  - 02_standards/code-standards
  - 02_standards/naming-conventions
  - 03_best-practices/common-patterns
```

### 快速检查清单

```
[ ] 工作流有明确的名称和目标
[ ] 流程步骤清晰（最多 7 步）
[ ] 每个步骤都有具体的检查项
[ ] 有清晰的输入和输出定义
[ ] 知道要引用哪些知识库内容
[ ] 有反馈/输出的标准格式
```

---

## 第二步：创建文件结构

创建你的工作流 Skill 文件夹结构：

### 完整的目录结构

```
your-project-workflow-skill/
│
├── SKILL.md                    ← 主入口（必须）
│
├── 📂 workflow/                N 个工作流步骤
│   ├── step1-understand-context.md
│   ├── step2-check-standards.md
│   ├── step3-check-logic.md
│   ├── step4-check-impact.md
│   └── step5-compile-feedback.md
│
├── 📂 standards/               工作流专用的检查清单
│   ├── step1-checklist.md
│   ├── step2-checklist.md
│   ├── step3-checklist.md
│   ├── step4-checklist.md
│   └── step5-checklist.md
│
├── 📂 guidelines/              工作流的原则和指南
│   ├── overview.md             工作流原则总览
│   ├── feedback-guidelines.md  反馈的撰写原则
│   └── severity-levels.md      问题分级标准
│
└── 📂 templates/               反馈和输出模板
    ├── feedback-template.md    反馈意见的模板格式
    └── examples.md             好反馈的示例
```

### 创建步骤

```bash
# 在你的项目根目录执行：

# 1. 创建主文件夹
mkdir "your-project-workflow-skill"

# 2. 创建子文件夹
mkdir "your-project-workflow-skill/workflow"
mkdir "your-project-workflow-skill/standards"
mkdir "your-project-workflow-skill/guidelines"
mkdir "your-project-workflow-skill/templates"

# 3. 创建所有的 .md 文件
```

---

## 第三步：编写工作流内容

### 各部分内容说明

#### 📄 SKILL.md（主入口）- **必须**

这是你的工作流的首页：

```markdown
# 代码审查工作流 Skill

**工作流目标**：通过系统化的审查流程，确保代码质量、规范一致、无重大 bug。

## 🎯 这个工作流做什么

- 提供清晰的审查步骤
- 降低审查遗漏项
- 统一审查标准
- 生成高质量的反馈意见

## 📋 工作流全景

```
PR 到达 → Step 1 → Step 2 → Step 3 → Step 4 → Step 5 → 发布反馈
        理解    检查    检查    检查    整理
        上下文  规范    逻辑    影响    反馈
```

## 🚀 快速开始

### 我要进行代码审查，怎么做？

1. 先看 [[workflow/step1-understand-context|第 1 步：理解上下文]]
2. 按顺序执行 Step 2-5
3. 最后参考 [[templates/feedback-template|反馈模板]] 汇总意见

### 每一步包含什么？

| 步骤 | 用途 | 检查清单 | 耗时 |
|-----|-----|--------|------|
| **Step 1** | 了解需求和范围 | [[standards/step1-checklist\|Step 1 清单]] | 5 min |
| **Step 2** | 检查规范遵守 | [[standards/step2-checklist\|Step 2 清单]] | 10 min |
| **Step 3** | 检查代码逻辑 | [[standards/step3-checklist\|Step 3 清单]] | 15 min |
| **Step 4** | 检查影响范围 | [[standards/step4-checklist\|Step 4 清单]] | 5 min |
| **Step 5** | 整理反馈意见 | [[standards/step5-checklist\|Step 5 清单]] | 10 min |

## 📚 相关资源

这个工作流引用知识库 Skill 中的以下内容：
- [[知识库Skill/02_standards/code-standards|代码规范]]
- [[知识库Skill/02_standards/naming-conventions|命名规范]]
- [[知识库Skill/03_best-practices/common-patterns|常见模式]]

## 💡 反馈原则

所有反馈都应该遵循：
- ✅ 具体 - 说明具体问题在哪
- ✅ 建设性 - 提出改进建议
- ✅ 尊重 - 用友好的语气
- ✅ 有优先级 - 标注问题的严重程度
```

#### 📂 workflow/ - 5 个工作流步骤

**step1-understand-context.md** - 第一步：理解上下文

```markdown
# 第一步：理解上下文

在开始审查代码前，先理解**这个 PR/MR 要做什么**。

## 目的

- 了解需求背景
- 知道改动的范围
- 识别潜在的风险点

## 你需要检查

### 必看的信息

- [ ] 有 PR/MR 的标题和描述吗？
- [ ] 标题清晰说明了改动是什么？
- [ ] 描述说明了为什么要做这个改动？
- [ ] 有相关的 issue 或需求链接吗？

### 改动范围

- [ ] 改动了哪些文件？
- [ ] 改动了多少行代码？
- [ ] 是新增功能、修复 bug 还是重构？
- [ ] 涉及几个模块？

### 关键问题

在开始详细审查前，问自己：
1. **这个改动的目的是什么？**
   - [回答]
2. **会影响哪些功能模块？**
   - [回答]
3. **有什么潜在的风险？**
   - [回答]
4. **需要特别关注什么？**
   - [回答]

## 下一步

完成上面的检查后，进入 [[step2-check-standards|Step 2：检查规范]]

## 参考

- [[../../knowledge-base/01_project-intro/overview|项目概述]] - 了解项目结构
- [[../../knowledge-base/02_standards/overview|开发规范]] - 快速回顾规范
```

**step2-check-standards.md** - 第二步：检查规范

```markdown
# 第二步：检查规范

代码是否遵守了规范和约定。

## 目的

- 确保代码符合团队规范
- 发现代码风格问题
- 验证命名是否正确

## 你需要检查

### 代码风格

参考：[[../../knowledge-base/02_standards/code-standards|代码规范]]

- [ ] 变量声明用了 const/let 吗？（禁止 var）
- [ ] 使用了 arrow function 吗？
- [ ] 函数复杂度合理吗？（不超过 15 行）
- [ ] 有必要的注释吗？（复杂逻辑需要注释）
- [ ] 代码格式一致吗？（缩进、空格等）

### 命名规范

参考：[[../../knowledge-base/02_standards/naming-conventions|命名规范]]

- [ ] 文件名符合规范吗？（PascalCase for components）
- [ ] 变量名清晰有意义吗？（camelCase）
- [ ] 函数名描述了功能吗？
- [ ] 常量用 UPPER_SNAKE_CASE 吗？

### TypeScript 类型

- [ ] 有类型定义吗？（不要用 any）
- [ ] 接口名用 I 前缀吗？（如 IUserData）
- [ ] 类型定义完整吗？

### 导入和依赖

- [ ] 导入是否按规范排序？（内置 > 第三方 > 本地）
- [ ] 有未使用的导入吗？
- [ ] 循环依赖吗？

## 发现问题？

如果发现规范问题：
1. 标注位置
2. 说明违反了什么规范
3. 给出改进建议

## 下一步

完成本步后，进入 [[step3-check-logic|Step 3：检查逻辑]]

## 参考

- [[../../knowledge-base/02_standards/code-standards|代码规范]] - 具体规范要求
- [[../../knowledge-base/02_standards/naming-conventions|命名规范]] - 命名规则
- [[../../knowledge-base/03_best-practices/common-patterns|常见模式]] - 如何正确实现
```

**step3-check-logic.md** - 第三步：检查逻辑

```markdown
# 第三步：检查逻辑

代码逻辑是否正确，是否有 bug。

## 目的

- 发现逻辑错误
- 识别潜在的 bug
- 验证算法的正确性

## 你需要检查

### 业务逻辑

- [ ] 逻辑是否实现了需求？
- [ ] 处理了所有的边界情况吗？（null、empty、undefined）
- [ ] 有没有逻辑漏洞？
- [ ] 条件判断是否准确？

### 错误处理

- [ ] 是否处理了 API 失败？
- [ ] 是否处理了网络超时？
- [ ] 错误提示是否清晰？
- [ ] 是否有 try-catch？

### 数据流

- [ ] 数据从哪里来？（props、state、API）
- [ ] 数据流向是否正确？
- [ ] 有没有数据泄露？（不应该的数据暴露）
- [ ] 状态更新是否正确？

### 异步操作

- [ ] 异步操作是否正确处理？
- [ ] 竞态条件？（多个异步同时进行）
- [ ] 清理工作（cleanup）是否完整？
- [ ] 取消机制是否正确？

### 性能问题

- [ ] 有没有无限循环？
- [ ] 有没有频繁的重新渲染？
- [ ] 有没有内存泄漏？
- [ ] 算法复杂度可以接受吗？

## 常见的 bug 模式

- [ ] 闭包陷阱（循环中的闭包）
- [ ] 异步问题（await 的正确使用）
- [ ] 引用问题（对象引用而非值复制）
- [ ] 副作用（无意的全局变量修改）

## 下一步

完成本步后，进入 [[step4-check-impact|Step 4：检查影响]]

## 参考

- [[../../knowledge-base/03_best-practices/common-patterns|常见模式]] - 正确的实现方式
```

**step4-check-impact.md** - 第四步：检查影响

```markdown
# 第四步：检查影响

代码改动会不会对其他功能造成影响。

## 目的

- 识别潜在的副作用
- 发现兼容性问题
- 评估影响范围

## 你需要检查

### 依赖关系

- [ ] 这个模块被谁调用？
- [ ] 改动了什么接口/API？
- [ ] 是否破坏了后向兼容性？
- [ ] 相关的模块需要同步改动吗？

### 测试覆盖

- [ ] 有没有新增或修改的测试？
- [ ] 测试是否覆盖了改动的代码？
- [ ] 现有的测试会不会失败？

### 性能影响

- [ ] 改动会影响性能吗？
- [ ] 加载时间会增加吗？
- [ ] 内存占用会增加吗？

### 安全影响

- [ ] 有没有新引入的安全风险？
- [ ] 用户输入是否都验证了？
- [ ] 敏感信息是否保护好了？

### 其他影响

- [ ] 文档需要更新吗？
- [ ] 数据库 schema 需要改动吗？
- [ ] 部署流程需要特殊处理吗？
- [ ] 回滚计划是什么？

## 下一步

完成本步后，进入 [[step5-compile-feedback|Step 5：整理反馈]]

## 参考

- [[../../knowledge-base/03_best-practices/security-guidelines|安全指南]] - 安全检查要点
```

**step5-compile-feedback.md** - 第五步：整理反馈

```markdown
# 第五步：整理反馈

把审查过程中发现的问题汇总成反馈意见。

## 目的

- 清晰地总结审查结果
- 给出建设性的改进建议
- 帮助 author 快速理解反馈

## 反馈的组织方式

### 1. 整体评价

先给出总体的评价：
- ✅ 代码质量好，符合规范
- ⚠️ 有一些需要改进的地方
- ❌ 有较多问题，建议重新审视

### 2. 分类总结

按照严重程度分类：

**🔴 Blocking（需要修改后才能合并）**
- 问题 1: [具体说明]
- 问题 2: [具体说明]

**🟡 Warning（应该修改，但不强制）**
- 建议 1: [具体说明]
- 建议 2: [具体说明]

**🟢 Info（参考信息，可选修改）**
- 注意 1: [具体说明]

### 3. 参考材料

如果问题与规范有关，提供相关的规范链接：
- [[../../knowledge-base/02_standards/code-standards|代码规范 - 第 X 部分]]

## 反馈模板

参考：[[../templates/feedback-template|反馈模板]]

## 反馈原则

- ✅ [[../guidelines/feedback-guidelines|反馈撰写原则]]

## 审查完成

反馈意见发布后，Code Review 流程完成。

## 参考

- [[../templates/feedback-template|反馈模板]] - 标准的反馈格式
- [[../guidelines/feedback-guidelines|反馈原则]] - 如何给出好的反馈
```

#### 📂 standards/ - 每个步骤的检查清单

**step1-checklist.md** - Step 1 检查清单

```markdown
# Step 1 检查清单：理解上下文

## PR 基本信息

- [ ] PR 有标题
- [ ] 标题清晰说明改动内容
- [ ] PR 有描述
- [ ] 描述说明了改动原因
- [ ] PR 链接了相关 issue
- [ ] PR 关联了正确的分支

## 改动范围

- [ ] 改动的文件列表清晰
- [ ] 改动行数在合理范围（建议 <500 行）
- [ ] 没有无关的改动
- [ ] 改动分类清晰（新增/修改/删除）

## 风险评估

- [ ] 确认了改动的风险点
- [ ] 确认了可能影响的模块
- [ ] 确认了需要特别关注的地方

✅ 完成 Step 1 后，进入 Step 2
```

**step2-checklist.md** - Step 2 检查清单

```markdown
# Step 2 检查清单：检查规范

## 代码风格

- [ ] 变量声明合规（const/let）
- [ ] 函数写法合规（arrow function）
- [ ] 代码格式一致
- [ ] 没有拼写错误
- [ ] 注释清晰

## 命名规范

- [ ] 文件名符合规范
- [ ] 变量名清晰有意义
- [ ] 函数名描述功能
- [ ] 常量命名正确

## TypeScript

- [ ] 没有使用 any
- [ ] 类型定义完整
- [ ] 接口命名正确

## 导入整理

- [ ] 导入排序正确
- [ ] 没有未使用的导入
- [ ] 没有循环依赖

✅ 完成 Step 2 后，进入 Step 3
```

（Step 3、4、5 的检查清单类似）

#### 📂 guidelines/ - 工作流原则

**overview.md** - 工作流原则总览

```markdown
# Code Review 工作流原则

## 审查者的责任

- 🎯 确保代码质量
- 📏 维护规范一致性
- 🐛 发现潜在的 bug
- 📖 帮助团队学习

## 审查时的态度

- ✅ 尊重和友善
- ✅ 建设性的批评
- ✅ 解释为什么，不只是说不行
- ✅ 承认自己不知道的东西

## 高效审查的原则

1. **及时审查** - 24 小时内回复
2. **专注审查** - 不分心
3. **彻底审查** - 不走马观花
4. **清晰反馈** - 让 author 容易理解
5. **学会妥协** - 不要过度完美主义
```

**feedback-guidelines.md** - 反馈原则

```markdown
# 反馈撰写原则

## 好反馈的特点

✅ **具体** - 说明具体的问题在哪
✅ **建设性** - 不仅指出问题，还给建议
✅ **尊重** - 用友好的语气
✅ **有根据** - 引用规范或最佳实践
✅ **有优先级** - 区分 critical 和 nice-to-have

## 反馈的分级

### 🔴 Blocking（必须修改）
- 安全问题
- 重大 bug
- 违反核心规范
- 影响系统稳定性

### 🟡 Warning（应该修改）
- 代码风格问题
- 性能优化建议
- 可读性改进
- 次要的最佳实践

### 🟢 Info（可选修改）
- 参考信息
- 学习资源
- 有趣的想法

## 反馈示例

❌ 坏的反馈：
```
这里不好，改一下
```

✅ 好的反馈：
```
这里的变量名不清晰。建议改为 `userProfileData` 而不是 `data`，这样更容易理解这个数据的含义。
参考：[[../../knowledge-base/02_standards/naming-conventions|命名规范]]
```
```

**severity-levels.md** - 问题分级

```markdown
# 问题分级标准

## 如何给问题分级

### 🔴 Critical（关键）
- 功能不符合需求
- 重大安全漏洞
- 数据丢失风险
- 系统崩溃风险

示例：使用了 innerHTML，可能造成 XSS 攻击

### 🟠 Major（重要）
- 会导致 bug
- 性能严重下降
- 违反重要规范
- 影响用户体验

示例：改动了 API 接口但没有更新调用方

### 🟡 Minor（一般）
- 代码风格问题
- 可读性改进
- 最佳实践建议
- 文档不完整

示例：变量命名不够清晰

### 🟢 Trivial（微小）
- 拼写错误
- 空行格式
- 注释改进

示例：注释中有拼写错误
```

#### 📂 templates/ - 反馈模板

**feedback-template.md** - 反馈意见模板

```markdown
# Code Review 反馈模板

使用这个模板组织你的 Code Review 反馈。

## 反馈意见

### 📊 整体评价

[选一个]
- ✅ 代码质量很好，符合规范，可以合并
- ⚠️ 有一些需要改进的地方，建议修改后再合并
- ❌ 有较多问题，建议重新审视

**理由**：[简述主要原因]

---

### 🔴 Blocking（需要修改）

#### 问题 1：[问题标题]
- **位置**：文件路径 + 行号
- **问题描述**：具体说明问题
- **改进建议**：如何修改
- **参考**：相关规范或最佳实践链接

#### 问题 2：[问题标题]
...

---

### 🟡 Warning（应该修改）

#### 建议 1：[建议标题]
- **位置**：文件路径 + 行号
- **建议**：具体说明
- **原因**：为什么这样做更好

#### 建议 2：[建议标题]
...

---

### 🟢 Info（参考信息）

- [信息 1]
- [信息 2]

---

### ✅ 优点

- [值得表扬的地方 1]
- [值得表扬的地方 2]

---

## 总结

**修改项目**：
- [ ] 解决所有 🔴 Blocking 问题
- [ ] 处理 🟡 Warning 建议
- [ ] 考虑 🟢 Info 参考

**下一步**：
修改完成后请重新提交，我会再次审查。
```

**examples.md** - 好反馈的示例

```markdown
# 好反馈示例

## 示例 1：代码风格问题

❌ 坏的反馈：
```
这里代码写得不好
```

✅ 好的反馈：
```
**问题**：这里的变量 `d` 命名不清晰，不易理解含义

**建议**：改为 `userData` 或 `userProfileData`，这样其他人也能快速理解这个变量是做什么的

**参考**：[[../../knowledge-base/02_standards/naming-conventions#变量命名|命名规范 - 变量命名]]
```

## 示例 2：逻辑问题

❌ 坏的反馈：
```
这里有 bug
```

✅ 好的反馈：
```
**问题**：这里没有处理 API 调用失败的情况

**具体位置**：UserProfile.tsx, 第 45-50 行

**问题描述**：当 `fetchUser` 失败时，代码会直接使用 `user` 对象，可能导致 undefined 错误

**建议**：添加 try-catch 处理，并显示错误提示给用户

**代码示例**：
\`\`\`typescript
try {
  const data = await fetchUser(id)
  setUser(data)
} catch (err) {
  setError(err.message)
  // 显示错误提示
}
\`\`\`
```

## 示例 3：性能建议

❌ 坏的反馈：
```
这里会很慢
```

✅ 好的反馈：
```
**建议**：考虑添加 useMemo 缓存计算结果，避免每次渲染都重新计算

**具体位置**：List.tsx, 第 20-30 行

**原因**：这里的 `filteredList` 每次都会重新计算，即使输入没变。使用 useMemo 可以缓存结果，只在依赖项变化时重新计算

**建议代码**：
\`\`\`typescript
const filteredList = useMemo(() => {
  return items.filter(item => item.active)
}, [items])
\`\`\`

**参考**：[[../../knowledge-base/05_code-examples/component-patterns/custom-hook|自定义 Hook 最佳实践]]
```
```

---

## 第四步：完成和验证

### 检查清单

在发布你的工作流 Skill 前，检查：

- [ ] **SKILL.md** 完整，工作流步骤清晰
- [ ] **workflow/** 有 N 个完整的步骤文件
- [ ] **standards/** 有对应步骤的检查清单
- [ ] **guidelines/** 有工作流原则和反馈指南
- [ ] **templates/** 有反馈模板和示例
- [ ] **所有链接** 都是正确的（引用了知识库 Skill）
- [ ] **步骤流程** 清晰有序
- [ ] **检查项** 具体可操作

### 验证步骤

1. 在 Obsidian 中打开 SKILL.md
2. 点击导航链接，确保都能打开
3. 检查是否有死链
4. 邀请同事测试，看是否好理解

---

## 💡 快速提示

- 💾 **定期更新** - 新发现的 bug 模式记录下来
- 🔗 **引用知识库** - 反馈中总是引用相关规范
- 📊 **收集反馈** - 定期问团队成员这个流程是否有用
- 👥 **团队讨论** - 新的审查原则先讨论，再加入 Skill

---

## 🚀 现在就开始

1. 分析你的工作流需求
2. 按照文件结构创建文件夹和文件
3. 按照上面的模板逐个填写内容
4. 验证完成
5. 分享给团队，收集反馈，不断优化

祝你创建成功！🎉