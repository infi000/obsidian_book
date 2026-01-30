---
title: Gemini CLI 完整指南
date: 2026-01-20
tags:
  - gemini-cli
  - CLI
  - 命令参考
  - 技术文档
aliases:
  - CLI 指南
  - Gemini 命令参考
status: completed
---

# Gemini CLI 完整指南

> [!info] 关于本文档
> 这是 Gemini CLI 的完整参考指南，包含所有命令系统、快捷键和使用场景。文档已分类整理，便于快速查阅。

## 📑 快速导航

- [[#🔵-斜杠命令--元级别控制|🔵 斜杠命令（/）]]
- [[#🟠-at-命令--文件内容注入|🟠 At 命令（@）]]
- [[#🔴-shell-命令--系统交互|🔴 Shell 命令（!）]]
- [[#⌨️-键盘快捷键|⌨️ 键盘快捷键]]
- [[#🎯-使用场景|🎯 使用场景]]

---

## 🔵 斜杠命令 (/) - 元级别控制

### 命令总览

> [!tip] 提示
> 斜杠命令提供对 CLI 本身的元级别控制，以 `/` 开头。共有 **25 个**主要命令。

### 📊 会话与对话管理（4 个）

| 命令 | 语法 | 说明 |
|------|------|------|
| **`/chat`** | `/chat save \<tag\>` | 保存当前对话历史记录 |
| **`/chat`** | `/chat resume \<tag\>` | 从已保存的对话恢复 |
| **`/chat`** | `/chat list` | 列出可用的标签 |
| **`/chat`** | `/chat delete \<tag\>` | 删除已保存的对话 |
| **`/chat`** | `/chat share file.md` | 将对话导出为 Markdown |
| **`/resume`** | `/resume` | 浏览所有已保存会话（交互式） |
| **`/clear`** | `/clear` | 清除终端屏幕 |
| **`/compress`** | `/compress` | 用摘要替换聊天上下文，节省令牌 |

**快捷键：** `Ctrl+L` 等同于 `/clear`

**检查点位置：**
- Linux/macOS: `~/.gemini/tmp/<project_hash>/`
- Windows: `C:\Users\<YourUsername>\.gemini\tmp\<project_hash>\`

> [!warning] 重要
> 聊天检查点是项目特定的。保存的聊天仅在同一项目中工作时可访问。

---

### 🛠️ 工具与服务管理（7 个）

#### MCP 服务器管理

> [!info] MCP 是什么
> MCP（Model Context Protocol）是用于管理 Gemini CLI 的服务器和工具的协议。

| 命令 | 说明 |
|------|------|
| `/mcp list` 或 `/mcp ls` | 列出已配置的 MCP 服务器和工具 |
| `/mcp desc` | 列出 MCP 服务器及其描述 |
| `/mcp schema` | 列出 MCP 服务器及其完整架构 |
| `/mcp auth <server-name>` | 使用 OAuth 进行身份验证 |
| `/mcp refresh` | 重启所有 MCP 服务器并重新发现工具 |

#### 工具和扩展

| 命令 | 说明 |
|------|------|
| `/tools desc` | 显示每个工具的详细描述 |
| `/tools nodesc` | 隐藏工具描述，仅显示名称 |
| `/extensions` | 列出当前会话的所有活动扩展 |

---

### 📁 文件与目录管理（4 个）

| 命令 | 语法 | 说明 |
|------|------|------|
| **`/directory`** | `/directory add <path1>,<path2>` | 将目录添加到工作区 |
| **`/directory`** | `/directory show` | 显示所有已添加的目录 |
| **`/restore`** | `/restore [tool_call_id]` | 恢复项目文件到执行工具前状态 |
| **`/copy`** | `/copy` | 复制最后一个输出到剪贴板 |

**别名：** `/directory` 可以简写为 `/dir`

**剪贴板工具要求：**
- 🐧 Linux: `xclip` 或 `xsel`
- 🍎 macOS: `pbcopy`（通常预装）
- 🪟 Windows: `clip`（通常预装）

---

### ⚙️ 设置与配置（6 个）

#### 个性化设置

| 命令 | 配置文件 | 说明 |
|------|---------|------|
| `/settings` | `.gemini/settings.json` | 打开设置编辑器 |
| `/theme` | - | 更改 CLI 的视觉主题 |
| `/vim` | `~/.gemini/settings.json` | 切换 Vim 模式 |
| `/editor` | - | 选择支持的编辑器 |
| `/model` | - | 选择 Gemini 模型 |
| `/auth` | - | 更改身份验证方法 |

> [!tip] Vim 模式
> 启用 Vim 模式后，输入区域支持 NORMAL 和 INSERT 模式的 Vim 风格导航和编辑命令。详见[[#vim-模式快捷键|Vim 快捷键部分]]。

#### 初始化和内存

| 命令 | 说明 |
|------|------|
| `/init` | 分析当前目录并生成定制的 `GEMINI.md` 文件 |
| `/memory add <text>` | 将文本添加到 AI 的分层内存 |
| `/memory show` | 显示当前分层内存的完整内容 |
| `/memory refresh` | 从所有 `GEMINI.md` 文件重新加载记忆 |
| `/memory list` | 列出用于分层内存的所有 `GEMINI.md` 文件路径 |

---

### ℹ️ 信息与帮助（5 个）

| 命令 | 别名 | 说明 |
|------|------|------|
| `/help` | `/?` | 显示帮助信息 |
| `/stats` | - | 显示会话统计（令牌、缓存、时长） |
| `/about` | - | 显示版本信息 |
| `/privacy` | - | 显示隐私通知 |
| `/bug <title>` | - | 为 Gemini CLI 提交问题 |
| `/quit` | `/exit` | 退出 Gemini CLI |

> [!warning] 版本信息
> 提交 Bug 报告时，请使用 `/about` 命令获取并分享版本信息。

---

## 🟠 At 命令 (@) - 文件内容注入

### 概述

> [!info] At 命令的作用
> At 命令用于将文件或目录的内容作为对 Gemini 的提示的一部分包括在内，支持 Git 感知过滤。

### 基本语法

```markdown
@<path_to_file_or_directory>
```

### 使用示例

- `@path/to/your/file.txt 解释这个文本。`
- `@src/my_project/ 总结此目录中的代码。`
- `这个文件是关于什么的？@README.md`
- `@My\ Documents/file.txt` （空格用 `\` 转义）

### 特殊用法

| 命令 | 说明 |
|------|------|
| `@<path>` | 注入单个文件或整个目录 |
| `@` | 单独的 @ 符号：查询按原样传递给 Gemini |

### Git 感知过滤

> [!tip] 自动排除
> 默认情况下，At 命令会自动排除 `.gitignore` 中列出的文件。

**自动排除的文件/目录示例：**
- `node_modules/`
- `dist/`
- `.env`
- `.git/`
- `.gitignore`
- 其他在 `.gitignore` 中指定的文件

**配置：** 使用 `context.fileFiltering` 设置修改过滤行为

### 错误处理

- ❌ 路径未找到 → 显示错误消息
- ❌ 权限问题 → `read_many_files` 工具报告错误
- ℹ️ 二进制文件 → 可能被跳过或截断

---

## 🔴 Shell 命令 (!) - 系统交互

### 概述

> [!info] Shell 命令
> `!` 前缀让您可以直接从 Gemini CLI 中与系统的 shell 交互。

### 执行单个命令

**语法：**
```
!<shell_command>
```

**跨平台支持：**
- Linux/macOS: `bash`
- Windows: `powershell.exe -NoProfile -Command`

**使用示例：**
```bash
!ls -la              # 列出文件详情
!git status          # 查看 Git 状态
!npm install         # 安装包
!python script.py    # 运行 Python 脚本
```

### 切换 Shell 模式

**语法：**
```
!
```

**行为：**

| 操作 | 说明 |
|------|------|
| **进入** | 使用不同的颜色和"Shell 模式指示器" |
| **输入** | 键入的文本被直接解释为 shell 命令 |
| **退出** | UI 恢复为标准外观，正常行为恢复 |

### 环境变量

> [!warning] 环境变量检测
> 当命令通过 `!` 或在 shell 模式中执行时，`GEMINI_CLI=1` 环境变量被设置。脚本可以用它来检测是否在 Gemini CLI 中运行。

### 安全提示

> [!danger] 重要警告
> 您在 shell 模式中执行的命令具有与直接在终端中运行它们相同的权限和影响。请谨慎使用！

---

## ⌨️ 键盘快捷键

### 全局快捷键

| 快捷键 | 功能 | 范围 |
|--------|------|------|
| `Ctrl+Z` | 撤销 | 输入提示 |
| `Ctrl+Shift+Z` | 重做 | 输入提示 |
| `Ctrl+L` | 清除屏幕 | 全局（等同于 `/clear`） |

### Vim 模式快捷键

> [!tip] 启用 Vim 模式
> 使用 `/vim` 命令切换 Vim 模式。启用时，在页脚显示 `[NORMAL]` 或 `[INSERT]`。

#### NORMAL 模式 - 导航

| 快捷键 | 功能 |
|--------|------|
| `h` / `j` / `k` / `l` | 左 / 下 / 上 / 右 |
| `w` | 跳到下一个词 |
| `b` | 跳到上一个词 |
| `e` | 跳到词尾 |
| `0` | 转到行首 |
| `$` | 转到行尾 |
| `^` | 转到首个非空字符 |
| `G` | 转到特定行（前加行号，如 `10G`） |
| `gg` | 转到第一行 |

#### NORMAL 模式 - 编辑

| 快捷键 | 功能 |
|--------|------|
| `x` | 删除字符 |
| `c` | 改变（与移动结合） |
| `i` | 在光标前插入 |
| `a` | 在光标后插入 |
| `o` | 下方插入新行 |
| `O` | 上方插入新行 |
| `dd` | 删除整行 |
| `cc` | 改变整行 |
| `dw` | 删除词 |
| `cw` | 改变词 |
| `.` | 重复上一个编辑操作 |

#### INSERT 模式

| 快捷键 | 功能 |
|--------|------|
| 标准文本输入 | 在此模式下输入文本 |
| `Escape` | 返回 NORMAL 模式 |

#### 计数支持

在命令前加数字来重复操作：
- `3h` - 向左移动 3 次
- `5w` - 跳过 5 个词
- `10G` - 转到第 10 行
- `2dd` - 删除 2 行

> [!info] Vim 模式持久化
> Vim 模式偏好保存到 `~/.gemini/settings.json`，在会话间保留。

---

## 📁 配置文件与路径

### 主要配置文件

| 配置 | 路径 | 说明 |
|------|------|------|
| **主设置** | `.gemini/settings.json` | Gemini CLI 全局配置 |
| **分层记忆** | `GEMINI.md` | AI 指令上下文（多个位置） |
| **Vim 偏好** | `~/.gemini/settings.json` | Vim 模式设置 |

### 检查点和临时文件位置

```
Linux/macOS:
~/.gemini/tmp/<project_hash>/

Windows:
C:\Users\<YourUsername>\.gemini\tmp\<project_hash>\
```

---

## 🎯 使用场景

### 场景 1️⃣ : 对话保存与恢复

> [!example] 场景描述
> 你正在进行一个长期的代码审查项目，需要在多个会话中保留上下文。

**步骤：**
```
1. /chat save code-review      # 保存当前会话
2. ... 继续工作，关闭 CLI ...
3. /chat resume code-review    # 恢复之前的会话
4. /stats                      # 查看令牌使用统计
```

---

### 场景 2️⃣ : 代码分析与审查

> [!example] 场景描述
> 需要让 Gemini 分析整个项目的代码质量。

**步骤：**
```
1. @src/                       # 注入 src 目录所有文件
   分析这个项目的代码质量，找出可能的改进点
2. /copy                       # 复制建议到剪贴板
3. /chat save analysis         # 保存分析结果
```

---

### 场景 3️⃣ : Vim 编辑模式

> [!example] 场景描述
> 你熟悉 Vim，想用 Vim 快捷键来编辑命令。

**步骤：**
```
1. /vim                        # 启用 Vim 模式
2. i                           # 进入 INSERT 模式
   输入你的问题...
3. Escape                      # 回到 NORMAL 模式
4. dd                          # 删除不需要的行
5. :q                          # 提交并退出
```

---

### 场景 4️⃣ : MCP 服务器配置

> [!example] 场景描述
> 需要配置和认证 MCP 服务器来使用外部工具。

**步骤：**
```
1. /mcp list                   # 查看配置的服务器
2. /mcp schema                 # 查看完整架构
3. /mcp auth my-server         # 进行 OAuth 认证
4. /mcp refresh                # 重启服务器
5. /tools desc                 # 查看新增工具
```

---

### 场景 5️⃣ : 项目初始化

> [!example] 场景描述
> 启动一个新项目，需要为 Gemini 设置上下文。

**步骤：**
```
1. /init                       # 生成 GEMINI.md 文件
2. /memory show                # 查看自动生成的记忆
3. /memory add 项目特定信息    # 添加自定义上下文
4. /model                      # 选择合适的 Gemini 模型
5. /directory add src docs     # 添加关键工作目录
```

---

## 📊 命令快速参考表

### 按功能分类

#### 🔹 会话管理
- `/chat save <tag>` - 保存对话
- `/chat resume <tag>` - 恢复对话
- `/resume` - 浏览所有会话
- `/stats` - 查看统计信息
- `/compress` - 压缩上下文

#### 🔹 文件操作
- `/directory add <path>` - 添加目录
- `/restore [id]` - 恢复文件状态
- `/copy` - 复制输出

#### 🔹 AI 记忆
- `/memory add <text>` - 添加记忆
- `/memory show` - 显示记忆
- `/memory refresh` - 刷新记忆
- `/memory list` - 列出文件

#### 🔹 MCP 服务
- `/mcp list` - 列出服务器
- `/mcp auth <server>` - 认证
- `/mcp refresh` - 重启服务器

#### 🔹 个性化
- `/settings` - 编辑设置
- `/theme` - 更改主题
- `/vim` - 启用 Vim 模式
- `/model` - 选择模型

---

## 🔗 相关文件

- [[CLI_commands_structure.json]] - 结构化 JSON 参考
- [[一些文件和记录.md]] - KAPP 接入文档

---

> [!success] 文档完成
> 本文档涵盖了 Gemini CLI 的所有主要命令、快捷键和使用场景。根据需要使用 `Ctrl+F` 搜索特定命令。

**最后更新：** 2026-01-20
**版本：** 2.0 (Obsidian 优化版)
