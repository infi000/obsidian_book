# AI 研发工具的选择

团队支持多个编程助手，每个工具有不同的特点和适用场景。

## 支持的 AI 工具
### 1. TDDC-CLI（推荐）

**公司官方地址**：https://tddc-home.sit.sf-express.com/

**特点**：
- 内部推荐的编程助手
- 更新最新的 AI 模型
- 与公司系统深度集成
- 支持多个 AI 后端

**适用场景**：
- 大多数项目首选
- 需要与公司系统集成的开发
- 需要最新 AI 能力的项目

**配置文件**：`AGENT.md`

---

### 2. Claude Code 

**公司官方地址**：https://claudecode.sf-express.com/

**特点**：
- 官方 Claude CLI
- 本地集成，支持直接调用
- 完整的文件操作和代码审查能力
- 支持自定义 Skills 和 MCP 集成

**适用场景**：
- 本地开发环境集成
- 需要 Claude 完整能力的项目
- 需要自定义 Skills 的开发

**配置文件**：`CLAUDE.md`

---



### 3. 其他工具

- **TDDC 老版本**（Gemini-CLI）：旧版本，不再推荐使用
- **OpenCode**：TDDC 新版本的组件

---

## 统一配置方案

由于不同 CLI 的项目信息读取路径不同，建议在项目根目录下创建统一配置：

### 步骤 1：创建 CLAUDE.md

在项目根目录下创建 `CLAUDE.md`：

```markdown
# Project Context

Import the full project specification: @SFCODE.md
```

这样，Claude Code 可以自动读取 `SFCODE.md` 中的项目信息。

### 步骤 2：创建 AGENT.md

在项目根目录下创建 `AGENT.md`，内容与 `SFCODE.md` 一致。

这样，TDDC-CLI 和其他 Agents 可以自动读取项目信息。

### 步骤 3：编写完整的 SFCODE.md

在项目根目录下编写详细的 `SFCODE.md`，包含：
- 项目概览
- 技术栈
- 开发与运行环境
- 核心开发要求
- AI Agent 技能介绍
- AI 相关的约束和备注

---

## 内存文件位置对照表

| CLI 工具 | 记忆文件位置 | 用途 |
|---------|-----------|------|
| Claude Code | `CLAUDE.md` | Claude 工具配置 |
| TDDC 新版 | `AGENT.md` | TDDC 最新版本配置 |
| TDDC 老版 | `SFCODE.md` | TDDC 老版本配置 |

> **建议**：统一使用 `SFCODE.md` 作为项目规范文件，通过 `CLAUDE.md` 和 `AGENT.md` 引入。

---

## 技能文件位置统一

所有 CLI 工具的技能文件位置统一为：

```
.sfcode/skills/
```

无论使用哪个 CLI，都可以在这个目录下定义和管理技能。

---

## 项目配置文件目录结构

```plaintext
project-root/
├── CLAUDE.md              # Claude Code 配置（引入 SFCODE.md）
├── AGENT.md               # TDDC-CLI 配置（引入 SFCODE.md）
├── SFCODE.md              # 项目全量规范（所有工具的信息源）
├── .sfcode/
│   ├── settings.json      # sfcode 设置
│   ├── skills/            # 所有 Skills
│   ├── agents/            # 所有 Agents
│   ├── workflows/         # 工作流
│   └── reports/           # 报告归档
└── .claude.setting.json   # 项目目录的 AI 配置
```

---

## 最佳实践

1. **集中管理项目信息** - 在 `SFCODE.md` 中维护完整的项目信息
2. **简化引入方式** - 通过 `CLAUDE.md` 和 `AGENT.md` 引入
3. **统一技能位置** - 所有 Skills 存放在 `.sfcode/skills/` 目录
4. **定期更新** - 项目信息变化时及时更新 `SFCODE.md`
5. **清晰的文档结构** - 使用 Markdown 的标题和列表清晰组织内容

---

## 常见问题

**Q: 应该选择哪个工具？**
A: 首选 TDDC-CLI，备选 Claude Code。根据项目实际需求和团队偏好选择。

**Q: 不同工具之间能互相兼容吗？**
A: 可以，只要项目信息在 `SFCODE.md` 中维护完整，所有工具都可以读取和理解项目规范。

**Q: 如何在项目中同时使用多个工具？**
A: 在根目录同时创建 `CLAUDE.md` 和 `AGENT.md`，都引入 `SFCODE.md`。

---

## 下一步

- 查看 [[file-organization|AI 文件组织架构]]
- 查看 [SFCODE模板](../templates/SFCODE模板.md)
