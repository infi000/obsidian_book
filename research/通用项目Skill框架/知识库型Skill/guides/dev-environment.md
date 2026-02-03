# 开发环境设置

> 【需要你填写】项目的环境配置说明

## 系统要求

【填写】

### 最低要求

| 工具 | 版本 | 说明 |
|-----|------|------|
| Node.js | 【填写】 | 【填写说明】 |
| npm / yarn | 【填写】 | 【填写说明】 |
| 操作系统 | 【填写】 | Windows / macOS / Linux |

### 推荐配置

| 工具 | 版本 |
|-----|------|
| Node.js | 【填写】 |
| npm | 【填写】 |
| 【其他工具】 | 【填写】 |

## 安装步骤

【填写】

### 1. 安装 Node.js

【填写】选择合适的方式：

**macOS:**
```bash
# 使用 Homebrew
brew install node

# 或使用 nvm（推荐）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 【填写版本如 18.0.0】
```

**Windows:**
```
下载: https://nodejs.org/
选择 LTS 版本
双击安装器，按提示完成安装
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install nodejs npm
```

### 2. 克隆项目

```bash
git clone 【填写】
cd 【填写】
```

### 3. 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install
```

### 4. 配置环境变量

【填写】

```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑 .env.local，填写必要的配置
# 例如：API_KEY、DATABASE_URL 等
```

**必要的环境变量：**
【填写】

| 变量 | 示例值 | 说明 |
|-----|-------|------|
| 【填写】 | 【填写】 | 【填写】 |

### 5. 验证安装

```bash
# 运行测试
npm test

# 或启动开发服务器
npm run dev

# 或构建
npm run build
```

✅ 一切顺利的话，你的环境就设置好了！

## 常用命令

【填写】

| 命令 | 说明 |
|-----|------|
| `npm run dev` | 启动开发服务器 |
| `npm test` | 运行测试 |
| `npm run build` | 构建生产版本 |
| `npm run lint` | 运行代码检查 |
| `npm run format` | 格式化代码 |
| 【填写】 | 【填写】 |

## IDE 和工具推荐

【填写】

### 编辑器

**推荐：** VS Code
```
下载: https://code.visualstudio.com/
```

### VS Code 扩展

【填写】推荐安装的扩展：

- [ ] ESLint - 代码检查
- [ ] Prettier - 代码格式化
- [ ] TypeScript Vue Plugin - Vue/TypeScript 支持（如果使用）
- [ ] 【填写其他扩展】

### 调试

【填写】如何调试项目：

```javascript
【填写示例】
// 在 VS Code 中添加 .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

## Git 配置

【填写】

### 全局配置

```bash
# 配置用户信息
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Pre-commit Hooks

【填写】项目是否使用 pre-commit hooks：

```bash
# husky 自动 lint 代码
npm run prepare

# 或手动安装
npx husky install
```

## 常见问题

【填写】

### Q: 如何切换 Node 版本？
【填写】答案

### Q: npm install 失败怎么办？
【填写】答案

### 【更多问题】
【填写】

---

**相关链接**：
- 快速开始 → [[quick-start|快速开始指南]]
- FAQ → [[../reference/faq|常见问题]]
- 故障排查 → [[../reference/troubleshooting|故障排查]]
