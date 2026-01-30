# 🔌 Claude Code MCP 服务器配置指南

## 📖 概述

**MCP**（Model Context Protocol）允许你为 Claude Code 连接额外的工具和数据源。本指南以 **sfdoc 服务器**为例，展示如何正确配置 MCP 服务器。

> 💡 **快速导航**
> - [前置条件](#-前置条件检查) | [配置方法](#-配置方法双选一) | [验证](#-验证配置) | [排查](#-常见问题排查) | [示例](#-常用-mcp-服务器配置示例) | [最佳实践](#-最佳实践)

---

## ✅ 前置条件检查

在配置前，确保满足以下条件：

### 1️⃣ 检查依赖工具

选择对应的包管理器检查版本：

```bash
# 如果你的 MCP 使用 pnpm 作为包管理器
pnpm --version

# 如果使用 npm
npm --version

# 如果使用 node 运行
node --version
```

### 2️⃣ 验证外部服务可访问性

```bash
# 测试 NPM Registry 访问（以下为示例）
curl -s -I https://artifactory.sf-express.com/artifactory/api/npm/npm/ | head -5
```

### 3️⃣ 确认包在仓库中可用

> 📌 联系团队或检查仓库文档确认目标包存在。

---

## 🛠️ 配置方法（双选一）

### 方法一：使用命令行（⭐ 推荐）

最简单的方式是使用 `claude mcp add` 命令：

```bash
claude mcp add <server-name> <command> [args...] [options]
```

#### 📝 实例：配置 sfdoc 服务器

```bash
claude mcp add sfdoc pnpm dlx @sf/sfdoc-mcp \
  -e NPM_CONFIG_REGISTRY=https://artifactory.sf-express.com/artifactory/api/npm/npm/
```

**参数说明：**

| 参数 | 说明 |
|------|------|
| `sfdoc` | MCP 服务器名称 |
| `pnpm dlx @sf/sfdoc-mcp` | 启动命令（pnpm + dlx + 包名） |
| `-e` | 设置环境变量 |

#### 🔗 更多命令行选项

```bash
# 带多个环境变量
claude mcp add my-server command arg1 arg2 \
  -e KEY1=value1 \
  -e KEY2=value2

# 指定配置范围（local/user/project）
claude mcp add my-server command arg1 -s user

# 查看完整帮助
claude mcp add --help
```

---

### 方法二：手动编辑配置文件

如果需要更精细的控制，可以直接编辑配置文件。

#### 📍 配置文件位置

| 操作系统 | 路径 |
|---------|------|
| **macOS** | `~/.config/claude/settings.json` 或 `~/Library/Application Support/Claude/settings.json` |
| **Linux** | `~/.config/claude/settings.json` |
| **Windows** | `%APPDATA%\Claude\settings.json` |

#### 📄 配置文件格式

```json
{
  "mcpServers": {
    "sfdoc": {
      "command": "pnpm",
      "args": ["dlx", "@sf/sfdoc-mcp"],
      "description": "顺丰腾讯文档 MCP 服务器",
      "env": {
        "NPM_CONFIG_REGISTRY": "https://artifactory.sf-express.com/artifactory/api/npm/npm/"
      }
    },
    "another-server": {
      "command": "node",
      "args": ["./path/to/server.js"],
      "description": "Another MCP server"
    }
  }
}
```

#### 🔑 配置项说明

| 字段 | 说明 | 示例 |
|------|------|------|
| `command` | 启动命令 | `pnpm`, `npm`, `node`, `python` 等 |
| `args` | 命令参数数组 | `["dlx", "@sf/sfdoc-mcp"]` |
| `description` | 服务器描述 | "顺丰腾讯文档 MCP 服务器" |
| `env` | 环境变量对象 | `{"KEY": "value"}` |

---

## 🔍 验证配置

### 1️⃣ 查看已配置的服务器

```bash
claude mcp list
```

**✅ 成功输出示例：**

```
Checking MCP server health...

sfdoc: pnpm dlx @sf/sfdoc-mcp - ✓ Connected
another-server: node ./path/to/server.js - ✓ Connected
```

### 2️⃣ 检查单个服务器状态

> 📌 Claude Code 会自动检查连接状态。查看上面的 ✓ 标记表示连接成功。

---

## 🐛 常见问题排查

### ❌ 问题 1：命令未找到

```bash
# 错误：command not found: pnpm

# ✅ 解决：安装对应的包管理器
npm install -g pnpm
```

### ❌ 问题 2：网络无法访问

```bash
# 错误：无法访问 NPM Registry

# ✅ 解决：检查网络连接或 Registry 地址
curl -I https://your-registry-url
```

### ❌ 问题 3：包不存在

```bash
# 错误：@sf/sfdoc-mcp not found

# ✅ 解决步骤：
# 1. 确认包名拼写正确
# 2. 检查包是否发布到仓库
# 3. 确认有访问权限
```

### ❌ 问题 4：配置未生效

```bash
# ✅ 解决步骤：
# 1. 验证配置文件语法（JSON 格式）
jq . ~/.config/claude/settings.json

# 2. 查看 Claude Code 配置文件位置
cat ~/.claude.json

# 3. 重新运行配置命令
claude mcp add server-name command
```

---

## 📚 常用 MCP 服务器配置示例

### 📦 npm 包 MCP

```bash
claude mcp add my-npm-server pnpm dlx my-mcp-package
```

### 📁 本地脚本 MCP

```bash
claude mcp add local-server node /path/to/server.js
```

### 🐍 Python MCP

```bash
claude mcp add python-server python -m my_mcp_module
```

### 🌐 HTTP 服务 MCP

```bash
claude mcp add http-server --transport http https://api.example.com/mcp
```

---

## ⭐ 最佳实践

> 📌 按照以下步骤确保配置成功：

1. ✅ **先验证前置条件** — 确保依赖工具已安装
2. ✅ **测试网络连接** — 确保可以访问外部资源
3. ✅ **使用命令行添加** — 比手动编辑更安全
4. ✅ **添加后立即验证** — 运行 `claude mcp list` 检查状态
5. ✅ **保存配置备份** — 重要配置可以保存配置文件备份
6. ✅ **记录环境变量** — 文档化所需的 API Key 和 Registry 地址

---

## 🆘 获取帮助

```bash
# 查看完整帮助
claude mcp --help

# 查看 add 子命令帮助
claude mcp add --help

# 查看诊断信息
claude /doctor
```

> 📖 **官方文档** — https://code.claude.com/docs/en/mcp
