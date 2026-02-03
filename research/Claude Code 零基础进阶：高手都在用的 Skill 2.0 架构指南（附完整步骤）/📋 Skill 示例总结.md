# 📚 前端团队 Skill 标准 - 完整指南

这份文档总结了两个标准化 Skill 示例，供前端团队参考和学习。

---

## 📋 目录

1. [项目结构](#项目结构)
2. [Skill 1: 知识库型](#skill-1-知识库型)
3. [Skill 2: 工作流型](#skill-2-工作流型)
4. [对比和选择](#对比和选择)
5. [部署和使用](#部署和使用)

---

## 项目结构

```
前端团队 Skill 示例/
├── Skill 示例 1 - 知识库型/
│   ├── SKILL.md                          # 入口文件
│   ├── standards/                        # 规范文件
│   │   ├── code-style.md                # JavaScript/React 代码规范
│   │   ├── naming-conventions.md        # 命名规范
│   │   └── project-structure.md         # 项目结构规范
│   ├── guides/                          # 最佳实践指南
│   │   ├── react-best-practices.md      # React 最佳实践
│   │   ├── git-workflow.md              # Git 工作流
│   │   └── state-management.md          # 状态管理（可选）
│   └── reference/                       # 参考资料
│       ├── faq.md                       # 常见问题
│       └── toolchain.md                 # 工具链（可选）
│
├── Skill 示例 2 - 工作流型/
│   ├── SKILL.md                          # 入口文件
│   ├── workflow/                         # 工作流步骤
│   │   ├── step1-understand-context.md  # 理解需求
│   │   ├── step2-check-code-quality.md  # 检查代码质量
│   │   ├── step3-check-security-and-performance.md
│   │   ├── step4-compile-feedback.md    # 整理反馈
│   │   └── step5-final-review.md        # 最终检查
│   ├── standards/                        # 检查清单
│   │   ├── code-quality-checklist.md    # 代码质量清单
│   │   ├── security-checklist.md        # 安全性清单
│   │   └── performance-checklist.md     # 性能清单
│   ├── templates/                        # 反馈模板
│   │   ├── review-feedback-template.md  # 反馈模板
│   │   └── comment-examples.md          # 反馈示例
│   └── rules/                            # 规范指南
│       ├── review-standards.md          # 审查标准
│       └── feedback-guidelines.md       # 反馈指南
│
└── 📋 此指南.md
```

---

## Skill 1: 知识库型

### 🎯 用途

为前端团队提供**一站式的规范和最佳实践查询平台**。

### ✨ 特点

| 特点 | 说明 |
|-----|------|
| **核心结构** | SKILL.md（轻量索引） + 规范文件 |
| **数据组织** | 知识点原子化，独立文件存储 |
| **使用方式** | 按需查询，点击快速找到相关规范 |
| **适用场景** | 代码审查、新项目启动、规范查询 |

### 📁 核心文件

```
├── SKILL.md
│   ↓ 链接到
├── standards/code-style.md           # JavaScript/TypeScript/React 编码规范
├── standards/naming-conventions.md   # 命名规范（文件、变量、函数、类型）
├── standards/project-structure.md    # 项目文件夹组织方式
├── guides/react-best-practices.md    # React 组件设计、Hooks 最佳实践
├── guides/git-workflow.md            # 分支管理、提交规范、PR 流程
└── reference/faq.md                  # 常见问题和解答
```

### 📖 使用场景

1. **新项目启动**
   ```
   "我该怎么组织项目文件？"
   → 查看 standards/project-structure.md
   ```

2. **代码审查**
   ```
   "这个变量名是否符合规范？"
   → 查看 standards/naming-conventions.md
   ```

3. **遇到问题**
   ```
   "什么时候应该使用 Context vs Redux？"
   → 查看 reference/faq.md
   ```

4. **学习最佳实践**
   ```
   "React 组件怎么优化性能？"
   → 查看 guides/react-best-practices.md
   ```

---

## Skill 2: 工作流型

### 🎯 用途

为代码审查提供**系统化的工作流和检查清单**。

### ✨ 特点

| 特点 | 说明 |
|-----|------|
| **核心结构** | 5 个顺序工作流步骤 |
| **执行方式** | 一步一步按流程执行，每步都有清晰目标 |
| **支撑工具** | 检查清单、反馈模板、示例 |
| **适用场景** | PR 代码审查、质量把控 |

### 📋 工作流步骤

```
SKILL.md
  ↓
  ├─ Step 1: 理解需求和上下文
  │  └─ 读 PR 信息、了解背景、确定焦点
  │
  ├─ Step 2: 检查代码质量
  │  ├─ 参考: code-quality-checklist.md
  │  └─ 检查: 规范、逻辑、TypeScript、React
  │
  ├─ Step 3: 检查安全性和性能
  │  ├─ 参考: security-checklist.md + performance-checklist.md
  │  └─ 检查: 安全漏洞、性能问题
  │
  ├─ Step 4: 整理反馈意见
  │  ├─ 参考: feedback-guidelines.md
  │  ├─ 模板: review-feedback-template.md
  │  └─ 分类: Blocking / Should Fix / Nice to Have
  │
  └─ Step 5: 最终检查和提交
     ├─ 质量检查
     ├─ 提交反馈
     └─ 后续跟进
```

### 📄 支撑材料

| 文件 | 用途 |
|-----|------|
| `code-quality-checklist.md` | 代码质量检查清单 |
| `security-checklist.md` | 安全性检查清单 |
| `performance-checklist.md` | 性能优化检查清单 |
| `feedback-guidelines.md` | 如何写出好的反馈 |
| `review-feedback-template.md` | 反馈模板（如适用） |
| `comment-examples.md` | 优秀反馈示例 |

### 📖 使用场景

```
场景：审查一个新的 PR

Step 1:
  问题："这个 PR 做什么？"
  → 打开 step1-understand-context.md

Step 2:
  问题："代码质量怎么样？"
  → 打开 step2-check-code-quality.md
  → 参考 code-quality-checklist.md

Step 3:
  问题："有没有安全或性能问题？"
  → 打开 step3-check-security-and-performance.md
  → 参考 security-checklist.md 和 performance-checklist.md

Step 4:
  问题："怎么组织反馈？"
  → 打开 step4-compile-feedback.md
  → 参考 feedback-guidelines.md
  → 使用 review-feedback-template.md 组织反馈

Step 5:
  问题："反馈前怎么检查？"
  → 打开 step5-final-review.md
```

---

## 对比和选择

### 何时使用知识库型

✅ **适合以下场景**：

- 需要查询规范（"组件怎么命名？"）
- 遇到问题寻求答案（"什么时候拆分组件？"）
- 学习最佳实践（"React 性能优化怎么做？"）
- 新成员入职培训

❌ **不适合**：
- 需要逐步完成复杂任务
- 需要逐个检查清单项

### 何时使用工作流型

✅ **适合以下场景**：

- 进行代码审查（有明确的 5 步流程）
- 需要系统化的检查（安全、性能、质量）
- 需要生成专业的反馈意见
- 新审查者学习代码审查流程

❌ **不适合**：
- 简单的问题查询
- 已经很熟悉代码审查流程的人

### 比较表

| 维度 | 知识库型 | 工作流型 |
|-----|---------|---------|
| **适用场景** | 规范查询、学习 | 代码审查 |
| **数据组织** | 知识点分散 | 步骤顺序连接 |
| **文件关系** | 独立且可跳跃查询 | 有明确的执行顺序 |
| **使用方式** | 按需查阅 | 按步骤执行 |
| **新手友好度** | ⭐⭐⭐ | ⭐⭐⭐⭐ (有引导) |
| **效率** | 快速查询 | 系统完整的审查 |

---

## 部署和使用

### 1. 部署 Skill

将这两个 Skill 放到你的 Claude Code 环境中：

```bash
# 找到 Claude Code 的 Skill 目录
~/.claude/skills/

# 复制文件夹
cp -r "Skill 示例 1 - 知识库型" ~/.claude/skills/frontend-team-standards
cp -r "Skill 示例 2 - 工作流型" ~/.claude/skills/code-review-assistant
```

### 2. 在 Claude Code 中使用

#### 使用知识库 Skill

```
用户：我需要了解命名规范

Claude Code 识别 Skill: frontend-team-standards

用户：/frontend-team-standards

或者：

用户：按照前端规范，这个组件应该怎么命名？
```

#### 使用工作流 Skill

```
用户：帮我审查这个 PR

Claude Code 识别 Skill: code-review-assistant

用户：/code-review-assistant

或者：

用户：请帮我做代码审查
      https://github.com/...

Claude 会逐步进行：
Step 1: 理解 PR 内容
Step 2: 检查代码质量
Step 3: 检查安全性和性能
Step 4: 整理反馈
Step 5: 最终审查
```

### 3. 自定义 Skill

你可以根据团队需要修改这两个 Skill：

#### 修改知识库

1. 添加新的规范文件（如 `styling-guide.md`）
2. 在 `SKILL.md` 中添加链接
3. 更新现有规范内容

#### 修改工作流

1. 调整步骤数量或内容
2. 更新检查清单
3. 添加或修改反馈模板

---

## 🎓 团队使用指南

### 对于新成员

1. 先阅读 [[📋 结构梳理.md|📋 结构梳理]] 理解 Skill 概念
2. 使用 `frontend-team-standards` Skill 学习规范
3. 参考常见问题（FAQ）了解团队实践
4. 在进行第一次代码审查时，使用 `code-review-assistant` Skill

### 对于资深开发者

1. 使用 `frontend-team-standards` Skill 作为快速参考
2. 使用 `code-review-assistant` Skill 进行高质量的代码审查
3. 定期更新 Skill 内容，保持规范最新

### 对于 Team Lead

1. 定期审视和更新这两个 Skill
2. 收集团队反馈，改进内容
3. 在新项目启动时指导成员使用 Skill
4. 在 code review 中引导使用 Skill

---

## 📈 后续优化建议

### 短期（1-2 周）

- [ ] 部署两个 Skill
- [ ] 对团队进行培训
- [ ] 收集使用反馈

### 中期（1 个月）

- [ ] 根据反馈调整内容
- [ ] 添加更多 FAQ
- [ ] 完善代码示例

### 长期（持续）

- [ ] 定期审视规范是否仍然适用
- [ ] 添加新的最佳实践
- [ ] 基于真实项目经验更新 Skill

---

## 🔗 相关资源

- [原始指南](https://claude.com/claude-code-skill-2.0)
- [Obsidian Markdown 文档](https://help.obsidian.md/)
- [前端开发最佳实践](https://web.dev/lighthouse-performance/)

---

## 📞 反馈和改进

如果你对这两个 Skill 有改进建议，请：

1. 提出具体的问题或需求
2. 建议改进的方案
3. 分享使用中的最佳实践

让我们一起打磨出更好的团队 Skill！ 🚀

