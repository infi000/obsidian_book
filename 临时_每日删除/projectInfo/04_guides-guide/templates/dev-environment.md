# 开发环境配置

配置你的开发环境，提高开发效率。

## IDE: Visual Studio Code

### 推荐扩展

在 VS Code 中安装这些扩展：

| 扩展 | 功能 | 命令 |
|-----|------|------|
| ESLint | 代码检查 | `code --install-extension dbaeumer.vscode-eslint` |
| Prettier | 代码格式化 | `code --install-extension esbenp.prettier-vscode` |
| React Native Tools | React 开发工具 | `code --install-extension msjsdiag.vscode-react-native` |
| TypeScript Vue Plugin | Vue/TS 支持 | `code --install-extension Vue.volar` |
| Debugger for Chrome | 调试工具 | `code --install-extension msjsdiag.debugger-for-chrome` |

### 推荐设置

打开 VS Code 设置（`Cmd+,`），搜索以下配置：

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "eslint.autoFixOnSave": true,
  "editor.rulers": [80, 120],
  "editor.wordWrap": "on",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## 包管理器

### npm vs yarn vs pnpm

| 工具 | 优点 | 缺点 |
|-----|------|------|
| **npm** | 内置，无需安装 | 速度相对较慢 |
| **yarn** | 快，稳定 | 需要单独安装 |
| **pnpm** | 最快，节省空间 | 依赖链接方式复杂 |

**推荐：使用 pnpm**

安装 pnpm：
```bash
npm install -g pnpm
```

## 环境变量配置

### 创建 .env.local

```bash
# 复制模板
cp .env.example .env.local

# 编辑 .env.local（不要提交此文件！）
```

### 常见环境变量

```
# API 服务地址
REACT_APP_API_URL=http://localhost:3001

# 环境标志
REACT_APP_ENV=development

# 日志级别
REACT_APP_LOG_LEVEL=debug

# 其他配置
REACT_APP_CUSTOM_CONFIG=...
```

## Git 配置

### 首次使用 Git

```bash
# 配置用户名和邮箱
git config --global user.name "Your Name"
git config --global user.email "your.email@company.com"
```

### 生成 SSH Key（可选）

```bash
ssh-keygen -t ed25519 -C "your.email@company.com"
# 一直按 Enter 使用默认设置
```

然后添加公钥到 GitHub 设置。

## Node 版本管理（可选）

如果你有多个项目使用不同 Node 版本，可以使用版本管理工具。

### 使用 nvm（推荐）

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重启 shell 后，安装指定版本
nvm install 18
nvm use 18

# 验证版本
node --version  # v18.x
```

## 常见工具

| 工具 | 用途 | 安装 |
|-----|------|------|
| Docker | 容器化 | [安装链接](https://www.docker.com) |
| Postman | API 测试 | [安装链接](https://www.postman.com) |
| Git GUI | Git 可视化 | Sourcetree 或 GitKraken |

## 故障排查

遇到开发环境问题？查看 [[troubleshooting|故障排查]]
