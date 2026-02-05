# 技能规范 - SKILL 的初始化和管理

技能（Skill）是 AI 的核心能力单元。本文档说明如何创建、管理和注册项目技能。

## 技能的生命周期

```
创建 → 注册 → 文档化 → 使用 → 优化 → 贡献（可选）
```

---

## 1. 初始化技能项目

### 安装 openskills 工具

```bash
# 全局安装 openskills
npm install openskills -g

# 验证安装
openskills --version
```

### 初始化项目技能

在项目目录下运行：

```bash
cd 项目目录
openskills sync
```

这会自动创建必需的目录结构和配置文件。

---

## 2. 创建新技能的步骤

### 步骤 1：创建技能目录

```bash
mkdir -p .sfcode/skills/my-skill/{references,scripts,templates}
```

### 步骤 2：创建 SKILL.md

```markdown
---
name: my-skill
description: 我的自定义技能的简要描述
version: 1.0.0
author: 你的名字
---

## 技能概述

[详细描述你的技能是什么、解决什么问题]

## 使用方式

[如何调用和使用这个技能]

## 参考资源

- `references/` - 参考文档
- `scripts/` - 执行脚本
- `templates/` - 代码模板

## 示例

[实际使用示例]
```

### 步骤 3：添加参考资源

在 `references/` 目录中添加支持文档：

```
.sfcode/skills/my-skill/references/
├── guide.md              # 详细使用指南
├── best-practices.md     # 最佳实践
└── troubleshooting.md    # 故障排查
```

### 步骤 4：添加脚本和模板

在 `scripts/` 和 `templates/` 中添加实现代码：

```
.sfcode/skills/my-skill/
├── scripts/
│   ├── main.js          # 主脚本
│   └── helpers.js       # 辅助函数
└── templates/
    ├── template-1.ts
    └── template-2.tsx
```

---

## 3. 注册技能到 AGENTS.md

创建或更新 `.sfcode/agents/AGENTS.md`：

```markdown
<skills_system priority="1">

## Available Skills

<!-- SKILLS_TABLE_START -->
<usage>
When users ask you to perform tasks, check if any of the available skills below can help complete the task more effectively. Skills provide specialized capabilities and domain knowledge.

How to use skills:
- Invoke: Bash("openskills read <skill-name>")
- The skill content will load with detailed instructions
- Base directory provided in output for resolving bundled resources
</usage>

<available_skills>

<skill>
<name>code-review</name>
<description>代码质量审查，包含 12 项检查维度</description>
<location>./.sfcode/skills/code-review/SKILL.md</location>
</skill>

<skill>
<name>my-skill</name>
<description>我的自定义技能的简要描述</description>
<location>./.sfcode/skills/my-skill/SKILL.md</location>
</skill>

</available_skills>
<!-- SKILLS_TABLE_END -->

</skills_system>
```

---

## 4. 技能目录规范

### 完整的技能目录结构

```plaintext
.sfcode/skills/my-skill/
│
├── SKILL.md                      # 技能定义文档（必需）
│   - name: 技能标识
│   - description: 简要描述
│   - version: 版本号
│
├── README.md                     # 详细使用说明（推荐）
│
├── references/                   # 参考文档目录
│   ├── guide.md                  # 使用指南
│   ├── best-practices.md         # 最佳实践
│   ├── api-reference.md          # API 参考
│   └── examples.md               # 使用示例
│
├── scripts/                      # 实现脚本
│   ├── main.js                   # 主脚本
│   ├── analyze.js                # 分析脚本
│   ├── generate.js               # 生成脚本
│   └── helpers.js                # 辅助函数
│
├── templates/                    # 代码模板
│   ├── component-template.tsx    # 组件模板
│   ├── page-template.tsx         # 页面模板
│   └── service-template.ts       # 服务模板
│
└── reports/                      # 输出报告（可选）
    └── [生成的报告文件]
```

### 最小化的技能结构

如果功能简单，可以使用最小结构：

```plaintext
.sfcode/skills/simple-skill/
├── SKILL.md          # 必需
└── README.md         # 推荐
```

---

## 5. 技能最佳实践

### 5.1 命名规范

- 技能名：使用 kebab-case（`code-review`）
- 文件名：使用 camelCase（`myFunction.js`）
- 目录名：与技能名相同（`code-review/`）

### 5.2 文档规范

- 用简洁的语言描述技能的目的
- 提供实际的使用示例
- 说明输入和输出格式
- 列出参考资源

### 5.3 代码规范

- 脚本应该是独立的、可复用的
- 提供清晰的错误处理
- 添加注释说明逻辑
- 避免硬编码配置值

### 5.4 版本管理

- 使用语义化版本（Semantic Versioning）：`MAJOR.MINOR.PATCH`
- 在 SKILL.md 中维护版本号
- 重要变化记录在变更日志中

---

## 6. 技能工作流集成

### 在工作流中使用技能

```yaml
# .sfcode/workflows/main.yaml
workflow:
  name: "标准开发工作流"

  stages:
    - id: "code_review"
      name: "代码评审"
      skills:
        - "code-review"           # 使用已注册的技能
      inputs:
        - type: "git_diff"
        - type: "files"
      outputs:
        - name: "审查报告"
          format: "markdown"
```

---

## 7. 技能的项目级 vs 全局级

### 项目级技能

**位置**：`./.sfcode/skills/`

**特点**：
- 只在该项目中可用
- 针对项目特定需求
- 与项目规范紧密相关

**示例**：
- 项目特定的代码生成工具
- 项目特定的测试脚本
- 业务领域相关的技能

### 全局技能

**位置**：全局 skills 目录（如 `~/.sfcode/skills/`）

**特点**：
- 在所有项目中可用
- 通用的技能
- 可贡献到公共库

**如何贡献**：
1. 完善项目级技能，确保通用性强
2. 提交到公共仓库：`scc-iwms-core-fe-common-skills`
3. 经过审核和测试
4. 发布供其他项目使用

---

## 8. 常见技能模板

### 模板 1：代码生成技能

```markdown
---
name: code-generator
description: 根据需求自动生成代码
version: 1.0.0
---

## 输入
- 功能描述
- 输出类型（组件/页面/服务）

## 输出
- 生成的代码文件

## 使用示例
```
生成一个用户列表页面
```
```

### 模板 2：代码审查技能

```markdown
---
name: code-reviewer
description: 进行代码质量审查
version: 1.0.0
---

## 输入
- Git diff
- 检查清单

## 输出
- 审查报告
- 问题列表

## 使用示例
```
审查这个 PR 的代码
```
```

### 模板 3：测试生成技能

```markdown
---
name: test-generator
description: 自动生成测试用例
version: 1.0.0
---

## 输入
- 源代码文件
- 测试框架

## 输出
- 测试文件

## 使用示例
```
为这个函数生成单元测试
```
```

---

## 9. 初始化检查清单

- [ ] 创建技能目录和文件
- [ ] 编写详细的 SKILL.md
- [ ] 添加参考文档（README.md）
- [ ] 创建实现脚本或模板
- [ ] 在 AGENTS.md 中注册技能
- [ ] 测试技能是否可用
- [ ] 文档和示例完整
- [ ] 版本号设定正确

---

## 10. 故障排查

### 技能未被识别

**原因**：未在 AGENTS.md 中注册

**解决**：确保在 AGENTS.md 中有对应的 `<skill>` 条目

### 脚本执行出错

**原因**：脚本依赖未安装或路径不正确

**解决**：检查依赖和相对路径

### 模板文件未找到

**原因**：模板路径不正确

**解决**：确保模板在 `templates/` 目录中，并在脚本中使用相对路径

---

## 下一步

- 查看 [[workflow-standards|流程规范]]
- 查看 [SFCODE模板](../templates/SFCODE模板.md)
