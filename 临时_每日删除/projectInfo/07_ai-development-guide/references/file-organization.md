# AI 文件组织架构

标准的 AI 开发项目应该有清晰的目录结构，用于组织 Skills、Workflows、配置文件和报告。

## 完整的项目目录结构

```plaintext
project-root/
│
├── CLAUDE.md                      # Claude Code 配置文件
├── AGENT.md                       # TDDC-CLI 配置文件
├── SFCODE.md                      # 项目全量规范（信息源）
├── .claude.setting.json           # 项目 AI 配置
│
├── .sfcode/                       # AI 相关目录（核心）
│   │
│   ├── settings.json              # Claude Code 配置
│   │
│   ├── skills/                    # 技能库（项目级和全局技能）
│   │   ├── skill-1/
│   │   │   ├── SKILL.md           # 技能描述文档
│   │   │   ├── references/        # 参考文档
│   │   │   ├── scripts/           # 执行脚本
│   │   │   └── templates/         # 模板文件
│   │   └── skill-2/
│   │
│   ├── agents/                    # AI Agent 定义
│   │   ├── AGENTS.md              # 技能路由和注册表
│   │   ├── main-coordinator.yaml  # 主协调器定义
│   │   └── specialized-agents/    # 专项 Agent
│   │
│   ├── workflows/                 # 工作流定义
│   │   ├── main.yaml              # 主工作流
│   │   ├── feature-dev.yaml       # 特性开发流程
│   │   ├── code-review.yaml       # 代码审查流程
│   │   └── deployment.yaml        # 部署流程
│   │
│   ├── projectInfo/               # 项目知识库（可选）
│   │   ├── docs/                  # 项目文档
│   │   ├── requirements/          # 需求规格
│   │   ├── design/                # 技术设计
│   │   └── api/                   # API 规范
│   │
│   └── reports/                   # 归档和报告
│       ├── v1.0.0/                # 版本目录
│       │   ├── CodeReview/        # 代码审查报告
│       │   ├── Test/              # 测试报告
│       │   ├── Design/            # 设计文档
│       │   ├── Dev/               # 开发总结
│       │   └── Ops/               # 运维报告
│       └── archive/               # 归档文件
│
└── src/                           # 源代码目录
    ├── components/
    ├── pages/
    ├── utils/
    └── ...
```

---

## 核心目录详解

### 1. 配置文件层（项目根目录）

#### SFCODE.md - 项目全量规范（信息源）

包含以下内容：

```plaintext
1. 项目概览
   - 项目名称、描述、核心业务

2. 项目目录结构与说明
   - 各目录的用途和组织方式

3. 主要技术栈介绍
   - 前端、后端、DevOps 等

4. 开发与运行环境介绍
   - Node.js 版本、包管理器、运行脚本

5. 核心开发要求
   - 代码规范、命名规范、性能要求

6. AI Agent 技能介绍
   - 可用的 Skills、其功能和使用方式

7. 备注 - 对 AI 的系统性约束
   - 禁止操作、特殊规则、注意事项

8. AI 相关目录对应的功能
   - .sfcode/ 各子目录的用途说明
```

#### CLAUDE.md - Claude Code 配置

```markdown
# Project Context

Import the full project specification: @SFCODE.md
```

#### AGENT.md - TDDC-CLI 配置

内容与 `SFCODE.md` 相同或引用。

---

### 2. 技能库 - `.sfcode/skills/`

#### 目录结构

```plaintext
.sfcode/skills/
├── code-review/
│   ├── SKILL.md                   # 技能文档
│   ├── references/
│   │   ├── checklist.md           # 审查清单
│   │   └── best-practices.md      # 最佳实践
│   ├── scripts/
│   │   ├── analyze.js
│   │   └── report.js
│   └── templates/
│       └── review-report.md
│
├── code-generation/
│   ├── SKILL.md
│   ├── references/
│   │   ├── patterns.md
│   │   └── components.md
│   └── templates/
│       ├── component-template.tsx
│       └── page-template.tsx
│
└── testing/
    ├── SKILL.md
    ├── scripts/
    └── templates/
```

#### SKILL.md 的内容

```markdown
---
name: code-review
description: 代码审查技能的详细描述
version: 1.0.0
---

## 技能概述

[详细描述]

## 使用方式

[如何调用]

## 参考资源

- 参考文档位置
- 脚本位置
- 模板位置
```

---

### 3. Agent 和工作流 - `.sfcode/agents/` 和 `.sfcode/workflows/`

#### AGENTS.md - 技能路由文件

```markdown
<skills_system priority="1">

## Available Skills

<available_skills>

<skill>
<name>code-review</name>
<description>代码审查技能</description>
<location>./.sfcode/skills/code-review/SKILL.md</location>
</skill>

</available_skills>

</skills_system>
```

#### workflow.yaml - 工作流定义

```yaml
workflow:
  name: "标准开发工作流"
  stages:
    - id: "requirement_analysis"
      name: "需求分析"
      skills:
        - "business_requirement_analysis"
```

---

### 4. 归档报告 - `.sfcode/reports/`

#### 目录结构

```plaintext
.sfcode/reports/
└── v1.0.0/                        # 版本目录
    ├── CodeReview/                # 代码审查报告
    │   ├── 需求名-创建人-日期.md
    │   └── ...
    ├── Test/                      # 测试报告
    │   ├── 需求名-创建人-日期.md
    │   └── ...
    ├── Design/                    # 设计文档
    │   ├── 需求名-创建人-日期.md
    │   └── ...
    ├── Dev/                       # 开发总结
    │   ├── 需求名-创建人-日期.md
    │   └── ...
    └── Ops/                       # 运维报告
        ├── 报错列表名-创建人-日期.md
        └── ...
```

#### 命名规范

```plaintext
[需求名]-[创建人]-[日期].md

示例：
用户认证-张三-2024-02-05.md
API 性能优化-李四-2024-02-04.md
```

---

## 初始化检查清单

### 新项目初始化

- [ ] 创建 `.sfcode/` 目录结构
- [ ] 编写 `SFCODE.md` 项目规范
- [ ] 创建 `CLAUDE.md` 和 `AGENT.md`
- [ ] 初始化 `AGENTS.md` 技能注册表
- [ ] 创建主要工作流定义
- [ ] 准备 `.sfcode/reports/` 版本目录

### 技能初始化

- [ ] 在 `.sfcode/skills/` 下创建技能目录
- [ ] 编写 `SKILL.md` 技能文档
- [ ] 创建 `references/` 参考文档
- [ ] 创建 `scripts/` 执行脚本（如需）
- [ ] 创建 `templates/` 模板文件
- [ ] 在 `AGENTS.md` 中注册技能

---

## 最佳实践

1. **集中管理配置** - 所有 AI 相关配置都在 `.sfcode/` 目录下
2. **清晰的层级结构** - 每个技能和工作流都在独立目录中
3. **完整的文档** - 每个技能都有 `SKILL.md` 文档
4. **版本化归档** - 报告按版本分类组织
5. **参考资源分离** - 参考文档、脚本、模板分开存放
6. **规范的命名** - 文件和目录命名遵循一致的规范

---

## 与其他目录的关系

- **源代码目录 (src/)** - AI 技能可以读取和修改源代码
- **配置目录 (config/)** - 项目配置信息可在 SFCODE.md 中引用
- **文档目录 (docs/)** - 可选，项目文档可上传至 `.sfcode/projectInfo/`
- **Git 目录 (.git/)** - AI 工具可以读取 Git 历史和提交信息

---

## 常见问题

**Q: `.sfcode/` 目录应该提交到 Git 吗？**
A: 是的，应该提交，但个人的 Skills 和 MCP 可以添加到 `.gitignore`。

**Q: 如何组织多个项目的 Skills？**
A: 项目级 Skills 放在 `.sfcode/skills/`，全局 Skills 放在全局位置。

**Q: 报告应该保留多久？**
A: 按照 `.sfcode/settings.json` 中的 `retention_policy` 配置，通常为 30 天。

---

## 下一步

- 查看 [[ai-tools-selection|AI 研发工具的选择]]
- 查看 [SFCODE模板](../template/SFCODE模板.md)
- 查看 [[project-overview|项目概览]]
