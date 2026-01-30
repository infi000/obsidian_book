# 🚀 迭代报告Agent - 快速部署脚本和故障排查

> 一键部署，完整的故障排查指南

---

## 部分 1：一键部署脚本

### setup.sh - Linux/Mac 自动化脚本

```bash
#!/bin/bash

# setup.sh - 迭代报告Agent 一键部署脚本
# 使用方法：bash setup.sh

set -e  # 遇到错误立即退出

PROJECT_NAME="release-report-agent"
COLORS_GREEN='\033[0;32m'
COLORS_YELLOW='\033[1;33m'
COLORS_RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${COLORS_GREEN}🚀 开始部署迭代报告 Agent${NC}"
echo ""

# 1. 创建项目目录
echo -e "${COLORS_YELLOW}📁 创建项目目录...${NC}"
mkdir -p $PROJECT_NAME/{adapters,agents,release-reports}
cd $PROJECT_NAME
echo -e "${COLORS_GREEN}✅ 目录创建完成${NC}"
echo ""

# 2. 初始化 package.json
echo -e "${COLORS_YELLOW}📦 初始化 package.json...${NC}"
cat > package.json << 'EOF'
{
  "name": "release-report-agent",
  "version": "1.0.0",
  "description": "自动生成上线前迭代报告",
  "main": "dist/cli.js",
  "scripts": {
    "build": "tsc",
    "start": "ts-node cli.ts",
    "generate-report": "npm run build && node dist/cli.js",
    "dev": "ts-node cli.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "ts-node": "^10.0.0",
    "typescript": "^5.0.0"
  }
}
EOF
echo -e "${COLORS_GREEN}✅ package.json 创建完成${NC}"
echo ""

# 3. 创建 tsconfig.json
echo -e "${COLORS_YELLOW}⚙️  创建 tsconfig.json...${NC}"
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["*.ts", "adapters/**/*.ts", "agents/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
EOF
echo -e "${COLORS_GREEN}✅ tsconfig.json 创建完成${NC}"
echo ""

# 4. 创建 .gitignore
echo -e "${COLORS_YELLOW}🙈 创建 .gitignore...${NC}"
cat > .gitignore << 'EOF'
.env
.env.local
.env.*.local
node_modules/
npm-debug.log
yarn-error.log
dist/
build/
.vscode/
.idea/
*.swp
*.swo
*.token
*.key
*.pem
tmp/
temp/
*.tmp
.DS_Store
Thumbs.db
EOF
echo -e "${COLORS_GREEN}✅ .gitignore 创建完成${NC}"
echo ""

# 5. 创建 .env.example
echo -e "${COLORS_YELLOW}📝 创建 .env.example...${NC}"
cat > .env.example << 'EOF'
# ====== VCS 配置 ======
VCS_TYPE=gitlab

# ===== GitLab 配置 =====
VCS_BASE_URL=https://gitlab.company.com
GITLAB_PROJECT_ID=123
GITLAB_TOKEN=glpat-xxxxxxxxxxxxxxxx

# ===== Bitbucket 配置 =====
# VCS_BASE_URL=https://bitbucket.org
# BITBUCKET_WORKSPACE=your-workspace
# BITBUCKET_REPO_SLUG=frontend-repo
# BITBUCKET_TOKEN=xxxxxxxxxxxxxxxx

# ====== 上线分支配置 ======
RELEASE_BRANCH=release/main
BASE_BRANCH=main
EOF
echo -e "${COLORS_GREEN}✅ .env.example 创建完成${NC}"
echo ""

# 6. 安装依赖
echo -e "${COLORS_YELLOW}📥 安装 npm 依赖...${NC}"
npm install
echo -e "${COLORS_GREEN}✅ 依赖安装完成${NC}"
echo ""

# 7. 创建 .env（基于 .env.example）
echo -e "${COLORS_YELLOW}🔐 创建 .env 文件...${NC}"
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${COLORS_YELLOW}⚠️  .env 文件已创建，请手动编辑并填入你的配置${NC}"
else
    echo -e "${COLORS_GREEN}✅ .env 文件已存在${NC}"
fi
echo ""

# 8. 总结
echo -e "${COLORS_GREEN}✨ 部署完成！${NC}"
echo ""
echo "📝 接下来的步骤："
echo "   1. 编辑 .env 文件，填入你的 VCS 配置信息"
echo "   2. 运行验证：npx ts-node validate-config.ts"
echo "   3. 生成报告：npm run dev -- release/main"
echo ""
echo -e "${COLORS_YELLOW}💡 提示：${NC}"
echo "   - 所有 npm 依赖已安装在 ./node_modules/ 中"
echo "   - 你可以现在编辑 .env 文件：open .env 或 vim .env"
echo "   - 详细配置说明见《项目初始化包.md》"
echo ""
```

### setup.bat - Windows 自动化脚本

```batch
@echo off
REM setup.bat - 迭代报告Agent Windows 一键部署脚本

setlocal enabledelayedexpansion

set PROJECT_NAME=release-report-agent

echo 🚀 开始部署迭代报告 Agent
echo.

REM 1. 创建项目目录
echo 📁 创建项目目录...
mkdir %PROJECT_NAME%\adapters 2>nul
mkdir %PROJECT_NAME%\agents 2>nul
mkdir %PROJECT_NAME%\release-reports 2>nul
cd %PROJECT_NAME%
echo ✅ 目录创建完成
echo.

REM 2. 初始化 package.json
echo 📦 初始化 package.json...
(
echo {
echo   "name": "release-report-agent",
echo   "version": "1.0.0",
echo   "description": "自动生成上线前迭代报告",
echo   "main": "dist/cli.js",
echo   "scripts": {
echo     "build": "tsc",
echo     "start": "ts-node cli.ts",
echo     "generate-report": "npm run build ^&^& node dist/cli.js",
echo     "dev": "ts-node cli.ts",
echo     "test": "echo \"Error: no test specified\" ^&^& exit 1"
echo   },
echo   "dependencies": {
echo     "axios": "^1.6.0",
echo     "dotenv": "^16.0.0"
echo   },
echo   "devDependencies": {
echo     "@types/node": "^20.0.0",
echo     "ts-node": "^10.0.0",
echo     "typescript": "^5.0.0"
echo   }
echo }
) > package.json
echo ✅ package.json 创建完成
echo.

REM 3. 安装依赖
echo 📥 安装 npm 依赖...
call npm install
echo ✅ 依赖安装完成
echo.

REM 4. 创建 .env.example
echo 📝 创建 .env.example...
(
echo # ====== VCS 配置 ======
echo VCS_TYPE=gitlab
echo # ===== GitLab 配置 =====
echo VCS_BASE_URL=https://gitlab.company.com
echo GITLAB_PROJECT_ID=123
echo GITLAB_TOKEN=glpat-xxxxxxxxxxxxxxxx
echo # ====== 上线分支配置 ======
echo RELEASE_BRANCH=release/main
echo BASE_BRANCH=main
) > .env.example
echo ✅ .env.example 创建完成
echo.

REM 5. 复制为 .env
if not exist .env (
    copy .env.example .env
    echo ⚠️  .env 文件已创建，请手动编辑并填入你的配置
) else (
    echo ✅ .env 文件已存在
)
echo.

REM 总结
echo ✨ 部署完成！
echo.
echo 📝 接下来的步骤：
echo    1. 编辑 .env 文件，填入你的 VCS 配置信息
echo    2. 运行验证：npx ts-node validate-config.ts
echo    3. 生成报告：npm run dev -- release/main
echo.

endlocal
```

---

## 部分 2：完整故障排查指南

### 常见问题和解决方案

#### 问题 1：npm install 失败

**症状**：`npm ERR! code ERESOLVE`

**原因**：Node.js 版本不兼容或依赖冲突

**解决步骤**：
```bash
# 1. 检查 Node.js 版本（需要 14.0 或以上）
node --version

# 2. 清理 npm 缓存
npm cache clean --force

# 3. 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 4. 重新安装
npm install

# 如果仍然失败，使用 --legacy-peer-deps
npm install --legacy-peer-deps
```

---

#### 问题 2：找不到 .env 文件

**症状**：`Error: ENOENT: no such file or directory, open '.env'`

**原因**：.env 文件未创建或路径不对

**解决步骤**：
```bash
# 1. 检查当前目录
pwd

# 2. 列出文件
ls -la | grep env

# 3. 如果 .env 不存在，创建它
cp .env.example .env

# 4. 编辑 .env 文件
vim .env
# 或
code .env
```

---

#### 问题 3：Token 验证失败（401 Unauthorized）

**症状**：
```
❌ VCS 连接失败: 401 Unauthorized
```

**原因清单**：
1. Token 格式错误（如多余空格）
2. Token 已过期
3. Token 权限不足
4. Token 与 VCS_TYPE 不匹配

**逐步排查**：

```bash
# 步骤 1: 检查 Token 格式
# 打开 .env，确认：
# - GITLAB_TOKEN 以 glpat- 开头（GitLab）
# - BITBUCKET_TOKEN 没有特殊格式要求（Bitbucket）
# - 没有前后多余空格

# 步骤 2: 用 curl 测试连接
# GitLab
curl -H "PRIVATE-TOKEN: your-token-here" \
  https://your-gitlab.com/api/v4/user

# 如果返回 JSON（含 id, username 等），说明 Token 有效
# 如果返回 401，说明 Token 无效

# Bitbucket
curl -H "Authorization: Bearer your-token-here" \
  https://bitbucket.org/api/2.0/user

# 步骤 3: 如果 Token 已过期，重新生成
# GitLab：Settings → Access Tokens → 删除旧的，创建新的
# Bitbucket：Personal Settings → App passwords → 创建新的

# 步骤 4: 检查 Token 权限
# GitLab：确保有 "api" 权限
# Bitbucket：确保有 "repositories:read" 权限
```

---

#### 问题 4：GitLab Project ID 错误（404 Not Found）

**症状**：
```
❌ VCS 连接失败: 404 Not Found
```

**原因**：Project ID 不正确或 Token 无权访问

**解决步骤**：
```bash
# 1. 找到正确的 Project ID
# 方法1（Web界面）：
#   1. 登录 GitLab
#   2. 进入项目
#   3. Settings → General → Project ID（显示在上方）

# 方法2（命令行）：
curl -H "PRIVATE-TOKEN: your-token" \
  https://your-gitlab.com/api/v4/projects

# 输出会显示所有你有权限的项目，找到你的项目的 "id" 字段

# 2. 更新 .env 中的 GITLAB_PROJECT_ID
# 3. 重新运行验证
npx ts-node validate-config.ts
```

---

#### 问题 5：Bitbucket Workspace/Repo 不对

**症状**：
```
❌ VCS 连接失败: 404 Not Found
```

**原因**：Workspace 或 Repo Slug 错误

**解决步骤**：
```bash
# 1. 从 URL 找 Workspace 和 Repo Slug
# URL 格式：https://bitbucket.org/{workspace}/{repo-slug}
# 例如：https://bitbucket.org/mycompany/frontend
#   → BITBUCKET_WORKSPACE=mycompany
#   → BITBUCKET_REPO_SLUG=frontend

# 2. 用 curl 验证
curl -H "Authorization: Bearer your-token" \
  https://bitbucket.org/api/2.0/repositories/mycompany/frontend

# 3. 如果返回仓库信息，说明配置正确

# 4. 更新 .env，重新验证
npx ts-node validate-config.ts
```

---

#### 问题 6：TypeScript 编译错误

**症状**：
```
error TS2688: Cannot find type definition file for 'node'
```

**原因**：缺少 @types/node 包

**解决步骤**：
```bash
# 1. 安装缺少的类型定义
npm install --save-dev @types/node

# 2. 重新编译
npm run build

# 如果仍然报错，检查 tsconfig.json 中：
# "lib": ["ES2020"],  # 确保包含
# "skipLibCheck": true,  # 跳过库检查
```

---

#### 问题 7：找不到上线分支

**症状**：
```
⚠️  无法验证上线分支: release/main
或
❌ 找到 0 个PR
```

**原因**：
1. 分支不存在
2. 分支名写错
3. 分支中没有合并的 PR

**解决步骤**：
```bash
# 1. 检查本地分支
git branch -a | grep release

# 2. 检查分支是否存在于远程
git ls-remote origin | grep release

# 3. 如果分支存在，检查是否有 PR 合并到它
# GitLab：
curl -H "PRIVATE-TOKEN: your-token" \
  'https://your-gitlab.com/api/v4/projects/{id}/merge_requests?state=merged&target_branch=release/main'

# 如果返回空数组 [],说明没有合并的 PR

# 4. 确保 .env 中的 RELEASE_BRANCH 与分支名完全匹配
# 不能有多余的空格，大小写要一致

# 5. 如果是新创建的分支，确保已推送到远程
git push origin release/main
```

---

#### 问题 8：报告生成为空

**症状**：
```
✅ 找到 0 个PR
```

**原因**：
1. 没有 PR 合并到该分支
2. 分支名不对
3. PR 状态不是 "merged"

**解决步骤**：
```bash
# 1. 手动检查合并的 PR
# GitLab：进入项目 → Merge Requests → Merged → 检查目标分支

# 2. 确保 PR 的目标分支与 RELEASE_BRANCH 一致

# 3. 如果 PR 存在但未被识别，检查 API 返回
npx ts-node -e "
  const axios = require('axios');
  (async () => {
    const res = await axios.get('https://your-gitlab.com/api/v4/projects/{id}/merge_requests', {
      headers: {'PRIVATE-TOKEN': 'your-token'},
      params: {state: 'merged', target_branch: 'release/main'}
    });
    console.log(JSON.stringify(res.data, null, 2));
  })()
"
```

---

#### 问题 9：权限错误（Access Denied）

**症状**：
```
❌ 你没有权限访问此项目
403 Forbidden
```

**原因**：Token 对项目无读权限

**解决步骤**：
```bash
# 1. 检查 Token 权限
# GitLab：Settings → Access Tokens → 确保有 "api" 权限
# Bitbucket：Personal Settings → App passwords → 确保有 "repositories:read"

# 2. 检查项目访问权限
# GitLab：项目 → Members → 确保你的账户在列表中
# Bitbucket：仓库 → Access management → 确保你有 Read 权限

# 3. 如果仍无权限，请求管理员添加你为项目成员

# 4. 重新生成 Token（选择正确的权限）后重试
```

---

## 部分 3：验证检查清单

运行以下命令验证环境是否正确设置：

```bash
# 1. 检查 Node.js 版本
node --version
# ✅ 应该 >= 14.0.0

# 2. 检查 npm 版本
npm --version
# ✅ 应该 >= 6.0.0

# 3. 检查 npm 依赖是否安装
ls node_modules/axios
# ✅ 应该输出文件，不是 "No such file"

# 4. 检查 .env 文件
test -f .env && echo "✅ .env 文件存在" || echo "❌ .env 文件不存在"

# 5. 检查必需的环境变量
grep -E "^VCS_TYPE|^VCS_BASE_URL" .env
# ✅ 应该看到两行配置

# 6. 测试 TypeScript 编译
npm run build
# ✅ 应该在 dist/ 目录下生成 .js 文件

# 7. 验证配置
npx ts-node validate-config.ts
# ✅ 应该显示"所有配置验证通过"

# 8. 生成测试报告
npm run dev -- release/main
# ✅ 应该在 release-reports/ 生成 .md 文件
```

---

## 部分 4：性能优化建议

如果遇到性能问题（比如 PR 很多时生成报告很慢）：

```typescript
// 在 cli.ts 中添加进度显示
import { ReleaseReportAgent } from './agents/release-report-agent'

async function main() {
  // ... 前面的代码 ...

  const startTime = Date.now()
  console.log(`\n⏱️  开始时间: ${new Date().toLocaleString('zh-CN')}`)

  const report = await agent.generateFromSingleVCS(
    'vcs',
    releaseBranch,
    baseBranch
  )

  const duration = (Date.now() - startTime) / 1000
  console.log(`✅ 完成时间: ${new Date().toLocaleString('zh-CN')}`)
  console.log(`⏱️  耗时: ${duration.toFixed(2)} 秒`)

  // ... 后面的代码 ...
}
```

---

