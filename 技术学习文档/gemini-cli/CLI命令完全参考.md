# CLI 命令完全参考 - 结构化文档

## 文件信息
- **版本**: 1.0
- **更新时间**: 2026-01-20
- **来源**: Gemini CLI 完整命令参考

---

## 📑 目录

1. [斜杠命令 (/)](#斜杠命令--)
2. [At 命令 (@)](#at-命令--)
3. [Shell 命令 (!)](#shell-命令--)
4. [键盘快捷键](#键盘快捷键)
5. [快速参考](#快速参考)

---

## 🔵 斜杠命令 (/)

### 概述
提供对 CLI 本身的元级别控制。这些命令以正斜杠（`/`）作为前缀。

### 完整命令列表

#### 会话与对话管理
| 命令 | 子命令 | 说明 |
|------|--------|------|
| `/chat` | save | `/chat save <tag>` - 保存当前对话历史记录 |
| `/chat` | resume | `/chat resume <tag>` - 从先前保存的对话恢复 |
| `/chat` | list | `/chat list` - 列出可用的标签以便恢复聊天状态 |
| `/chat` | delete | `/chat delete <tag>` - 删除已保存的对话检查点 |
| `/chat` | share | `/chat share file.md/json` - 将当前对话写入文件 |
| `/resume` | - | 浏览并恢复以前的对话会话（交互式浏览器） |
| `/clear` | - | 清除终端屏幕（快捷键: **Ctrl+L**） |
| `/compress` | - | 用摘要替换整个聊天上下文，节省令牌 |

#### 工具与服务管理
| 命令 | 子命令 | 说明 |
|------|--------|------|
| `/mcp` | list/ls | 列出已配置的 MCP 服务器和工具 |
| `/mcp` | desc | 列出已配置的 MCP 服务器和工具及其描述 |
| `/mcp` | schema | 列出已配置的 MCP 服务器和工具，包括架构 |
| `/mcp` | auth | `/mcp auth <server-name>` - 使用 OAuth 进行身份验证 |
| `/mcp` | refresh | 重启所有 MCP 服务器并重新发现其可用工具 |
| `/tools` | desc | `/tools desc` - 显示每个工具的详细描述 |
| `/tools` | nodesc | `/tools nodesc` - 隐藏工具描述，仅显示工具名称 |
| `/extensions` | - | 列出当前 Gemini CLI 会话中的所有活动扩展 |

#### 文件与目录管理
| 命令 | 子命令 | 说明 |
|------|--------|------|
| `/directory` (或 `/dir`) | add | `/directory add <path1>,<path2>` - 将目录添加到工作区 |
| `/directory` (或 `/dir`) | show | `/directory show` - 显示所有添加的目录 |
| `/restore` | - | `/restore [tool_call_id]` - 将项目文件恢复到执行工具之前的状态 |
| `/copy` | - | 将 Gemini CLI 生成的最后一个输出复制到剪贴板 |

#### 设置与配置
| 命令 | 说明 | 配置文件 |
|------|------|---------|
| `/settings` | 打开设置编辑器以查看和修改 Gemini CLI 设置 | `.gemini/settings.json` |
| `/memory` | 管理 AI 的指令上下文 | `GEMINI.md` 文件 |
| `/theme` | 打开对话框，让您更改 Gemini CLI 的视觉主题 | - |
| `/auth` | 打开对话框，让您更改身份验证方法 | - |
| `/editor` | 打开用于选择支持的编辑器的对话框 | - |
| `/vim` | 切换 vim 模式的开关 | `~/.gemini/settings.json` |
| `/init` | 分析当前目录并生成定制的 GEMINI.md 上下文文件 | - |

#### 内存管理（/memory）
子命令详细说明：

- **`/memory add <text>`** - 将以下文本添加到 AI 的内存中
- **`/memory show`** - 显示从所有 GEMINI.md 文件加载的当前分层内存的完整连接内容
- **`/memory refresh`** - 从所有位置找到的 GEMINI.md 文件重新加载分层指令内存
- **`/memory list`** - 列出用于分层内存的 GEMINI.md 文件的路径

#### 信息与帮助
| 命令 | 别名 | 说明 |
|------|------|------|
| `/help` | `/?` | 显示有关 Gemini CLI 的帮助信息 |
| `/stats` | - | 显示当前 Gemini CLI 会话的详细统计信息（令牌使用、缓存、时长） |
| `/about` | - | 显示版本信息（提交问题时请分享此信息） |
| `/model` | - | 打开对话框以选择您的 Gemini 模型 |
| `/privacy` | - | 显示隐私通知并允许用户选择是否同意收集其数据 |
| `/bug` | - | `/bug <issue_title>` - 为 Gemini CLI 提交问题 |
| `/quit` | `/exit` | 退出 Gemini CLI |

#### 特殊命令
| 命令 | 说明 |
|------|------|
| 自定义命令 | 允许您为最常用的提示创建个性化快捷方式 |

---

## 🟠 At 命令 (@)

### 概述
At 命令用于将文件或目录的内容作为对 Gemini 的提示的一部分包括在内。这些命令包括 git 感知过滤。

### 基本语法
```
@<path_to_file_or_directory>
```

### 使用示例
```
@path/to/your/file.txt 解释这个文本。
@src/my_project/ 总结此目录中的代码。
这个文件是关于什么的？@README.md
```

### 功能特性
- ✅ **单个文件** - 读取该文件的内容
- ✅ **目录递归** - 尝试读取该目录及任何子目录内的文件内容
- ✅ **空格转义** - 路径中的空格应使用反斜杠转义（例如 `@My\ Documents/file.txt`）
- ✅ **Git 感知过滤** - 默认排除 git 忽略的文件

### Git 感知过滤排除的文件示例
- `node_modules/`
- `dist/`
- `.env`
- `.git/`

### 配置
- **设置**: `context.fileFiltering`（可更改过滤行为）
- **底层工具**: `read_many_files` 工具

### 文件类型处理
- 适用于基于文本的文件
- 二进制文件或非常大的文件可能被跳过或截断

### 错误处理
- ❌ 路径未找到或无效 → 显示错误消息，查询可能不会发送
- ❌ `read_many_files` 工具错误 → 报告权限问题等

### 特殊情况
- **`@`（单独）** - 如果键入单个 @ 符号而没有路径，则查询按原样传递给 Gemini 模型（讨论 @ 符号本身时有用）

---

## 🔴 Shell 命令 (!)

### 概述
`!` 前缀让您可以直接从 Gemini CLI 中与系统的 shell 交互。

### 执行单个命令
```
!<shell_command>
```

#### 跨平台 Shell 支持
- **Linux/macOS**: `bash`
- **Windows**: `powershell.exe -NoProfile -Command`

#### 使用示例
```
!ls -la              # 执行 ls -la 并返回到 Gemini CLI
!git status          # 执行 git status 并返回到 Gemini CLI
```

### 切换 Shell 模式
```
!
```

#### 进入 Shell 模式
- 激活时，使用不同的颜色和"Shell 模式指示器"
- 您键入的文本被直接解释为 shell 命令

#### 退出 Shell 模式
- UI 恢复为标准外观
- Gemini CLI 正常行为恢复

### 安全警告
⚠️ **重要**: 您在 shell 模式中执行的命令具有与直接在终端中运行它们相同的权限和影响。

### 环境变量
当命令通过 `!` 或在 shell 模式中执行时，`GEMINI_CLI=1` 环境变量在子进程的环境中被设置。这允许脚本或工具检测它们是否在 Gemini CLI 中运行。

---

## ⌨️ 键盘快捷键

### 输入提示快捷键

| 快捷键 | 功能 | 范围 |
|--------|------|------|
| **Ctrl+Z** | 撤销 | 输入提示 |
| **Ctrl+Shift+Z** | 重做 | 输入提示 |
| **Ctrl+L** | 清除屏幕 | 全局（等同于 `/clear`） |

### Vim 模式快捷键（启用 `/vim` 后）

#### NORMAL 模式导航
| 快捷键 | 功能 |
|--------|------|
| `h/j/k/l` | 左/下/上/右 导航 |
| `w/b/e` | 按词跳转（下一个词/上一个词/词尾） |
| `0` | 转到行首 |
| `$` | 转到行尾 |
| `^` | 转到首个非空字符 |
| `G` | 转到特定行（前加行号，如 `10G`） |
| `gg` | 转到第一行 |

#### NORMAL 模式编辑
| 快捷键 | 功能 |
|--------|------|
| `x` | 删除字符 |
| `c` | 改变 |
| `i` | 在光标前插入 |
| `a` | 在光标后插入 |
| `o` | 下方插入新行 |
| `O` | 上方插入新行 |
| `dd` | 删除整行 |
| `cc` | 改变整行 |
| `dw` | 按词删除 |
| `cw` | 按词改变 |
| `.` | 重复最后一个编辑操作 |

#### INSERT 模式
- **标准文本输入**
- **Escape** - 返回 NORMAL 模式

#### 计数支持
在命令前加数字（例如 `3h`、`5w`、`10G`）来重复操作指定次数。

#### 状态指示器
启用时，在页脚中显示 `[NORMAL]` 或 `[INSERT]`

#### 持久化
Vim 模式偏好保存到 `~/.gemini/settings.json`，并在会话间恢复

---

## 🎯 快速参考

### 会话管理
```
/chat save <tag>        # 保存对话
/chat resume <tag>      # 恢复对话
/resume                 # 浏览所有会话
/stats                  # 查看令牌统计
```

### 开发工具
```
/mcp                    # MCP 服务器管理
/tools                  # 显示可用工具
/directory add <path>   # 添加工作目录
/restore [id]           # 恢复文件状态
```

### 自定义与编辑
```
/settings               # 编辑设置
/theme                  # 更改主题
/vim                    # 启用 vim 模式
/memory add <text>      # 添加 AI 记忆
/editor                 # 选择编辑器
```

### 故障排除
```
/bug <title>            # 提交问题
/mcp auth <server>      # MCP 认证
/mcp refresh            # 重启 MCP 服务器
/copy                   # 复制输出
```

### 信息查询
```
/help                   # 显示帮助
/tools desc             # 显示工具描述
/about                  # 显示版本信息
/privacy                # 隐私设置
```

---

## 📁 配置文件与路径

### 配置文件位置
| 配置 | 文件 | 说明 |
|------|------|------|
| 主设置 | `.gemini/settings.json` | Gemini CLI 配置 |
| AI 记忆 | `GEMINI.md` | 分层指令内存（多个位置） |
| Vim 偏好 | `~/.gemini/settings.json` | Vim 模式偏好 |

### 检查点位置

#### Linux/macOS
```
~/.gemini/tmp/<project_hash>/
```

#### Windows
```
C:\Users\<YourUsername>\.gemini\tmp\<project_hash>\
```

**注意**: 聊天保存在项目特定的目录中。保存的聊天仅在在同一项目中工作时才可访问。

### 剪贴板工具要求

| 平台 | 工具 | 说明 |
|------|------|------|
| Linux | `xclip` 或 `xsel` | 通常可以使用系统的软件包管理器安装 |
| macOS | `pbcopy` | 通常预安装 |
| Windows | `clip` | 通常预安装 |

---

## 📊 命令分类总览

### 按功能分类
1. **会话管理** - `/chat`, `/resume`, `/stats`, `/compress`
2. **文件操作** - `/directory`, `/restore`, `/copy`
3. **AI 记忆** - `/memory` (add/show/refresh/list)
4. **MCP 服务** - `/mcp` (list/desc/schema/auth/refresh)
5. **个性化** - `/settings`, `/theme`, `/vim`, `/editor`
6. **帮助与信息** - `/help`, `/about`, `/tools`, `/privacy`
7. **工作流** - `/bug`, `/init`, `/model`, `/auth`
8. **清理与退出** - `/clear`, `/quit`

### 按频率分类
- **常用**: `/chat`, `/settings`, `/help`, `/model`, `/tools`
- **偶用**: `/memory`, `/theme`, `/vim`, `/directory`
- **少用**: `/bug`, `/privacy`, `/about`, `/init`
- **紧急**: `/restore`, `/copy`, `/quit`

---

**文档完成！可以在 Obsidian 中随时查看。**
