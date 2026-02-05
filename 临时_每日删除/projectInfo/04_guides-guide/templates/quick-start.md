# 快速开始

5 分钟搭建开发环境，启动应用。

## 前置要求

- Node.js >= 16（推荐 18 LTS）
- npm >= 8 或 yarn 或 pnpm
- Git
- 代码编辑器（推荐 VS Code）

验证安装：
```bash
node --version     # v16.x 或更高
npm --version      # 8.x 或更高
git --version      # 最新版
```

## 1. 克隆项目

```bash
# 使用 HTTPS（推荐，不需要 SSH key）
git clone https://github.com/your-org/your-project.git
cd your-project

# 或使用 SSH（需要配置 SSH key）
git clone git@github.com:your-org/your-project.git
cd your-project
```

## 2. 安装依赖

```bash
# 使用 npm（推荐）
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm（最快）
pnpm install
```

**如果遇到安装问题，查看 [[troubleshooting|故障排查]]**

## 3. 配置环境变量

```bash
# 从模板复制 .env 文件
cp .env.example .env.local

# 编辑 .env.local，填入以下信息
# 打开 .env.local 并根据注释填写信息
```

**环境变量说明：**
- `REACT_APP_API_URL` - API 服务地址
- `REACT_APP_ENV` - 环境标志（development/staging/production）
- `[其他必要的环境变量]`

## 4. 启动开发服务器

```bash
# 开发模式（启用热重载）
npm run dev

# 输出类似：
# > dev
# ▸ [webpack-dev-server] Project is running at http://localhost:3000/
```

## 5. 访问应用

在浏览器中打开 http://localhost:3000

你应该看到应用的首页。

## 6. 首次开发前的准备

1. **了解项目结构** - 查看 [[../../02_standards-guide/GUIDE#file-structure|文件结构]]
2. **了解开发规范** - 查看 [[../../02_standards-guide/GUIDE|开发规范]]
3. **阅读项目介绍** - 查看 [[../../01_project-intro-guide/GUIDE|项目介绍]]

## ✅ 检查清单

如果完成了以上步骤，你应该：

- [ ] 成功克隆了项目
- [ ] 成功安装了依赖
- [ ] 配置了 .env.local
- [ ] 开发服务器正常运行
- [ ] 能访问 http://localhost:3000

如果有任何问题，查看 [[troubleshooting|故障排查]] 或联系团队。
