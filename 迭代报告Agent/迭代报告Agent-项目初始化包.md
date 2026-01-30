# 🚀 迭代报告Agent - 项目初始化完全指南

> 一步步从零开始，部署你的第一个自动化迭代报告

---

## 📋 项目结构

```
release-report-agent/
├── adapters/
│   └── vcs-adapter.ts              # VCS适配器（GitLab/Bitbucket）
├── agents/
│   └── release-report-agent.ts     # 核心Agent逻辑
├── cli.ts                          # CLI入口
├── package.json                    # 项目依赖
├── tsconfig.json                   # TypeScript配置
├── .env                            # 环境变量（本地，gitignore）
├── .env.example                    # 环境变量模板（提交代码库）
├── .gitignore                      # Git忽略文件
├── release-reports/                # 生成的报告输出目录
└── README.md                       # 项目说明
```

---

## 🔧 第一步：环境配置

### .env.example 模板

```bash
# ====== VCS 配置 ======

# 选择 GitLab 或 Bitbucket
VCS_TYPE=gitlab

# ===== GitLab 配置 =====
# 不使用Bitbucket时可以留空这部分

# GitLab 服务器地址
# 示例：https://gitlab.company.com 或 https://gitlab.com
VCS_BASE_URL=https://gitlab.company.com

# GitLab Project ID
# 获取方式：进入GitLab项目 → Settings → General → Project ID
GITLAB_PROJECT_ID=123

# GitLab Personal Access Token
# 获取方式：
#   1. 登录GitLab
#   2. 右上角 → Settings → Access Tokens
#   3. 创建Token，勾选 "api" 权限
# 格式：glpat-xxxxxxxxxxxxxxxx
GITLAB_TOKEN=glpat-xxxxxxxxxxxxxxxx

# ===== Bitbucket 配置 =====
# 不使用Bitbucket时可以留空这部分

# Bitbucket 服务器地址
# VCS_BASE_URL=https://bitbucket.org

# Bitbucket Workspace（组织名）
BITBUCKET_WORKSPACE=your-workspace

# Bitbucket Repo Slug（仓库名）
# 通常就是GitHub URL中的仓库名
# 例如：frontend-repo
BITBUCKET_REPO_SLUG=frontend-repo

# Bitbucket App Password / Token
BITBUCKET_TOKEN=xxxxxxxxxxxxxxxx

# ====== 上线分支配置 ======

# 上线分支名（不包括base分支）
# 示例：release/v1.2.3 或 release/main 或 release/202401
RELEASE_BRANCH=release/main

# 基础分支（用于对比统计改动）
# 通常是 main、master 或 develop
BASE_BRANCH=main
```

### 如何使用

```bash
# 1. 复制模板文件
cp .env.example .env

# 2. 编辑 .env，填入你的实际配置
# 使用你喜欢的编辑器打开 .env：
#   - VS Code
#   - Vim/Nano
#   - 或其他文本编辑器

# 3. 确保 .env 已加入 .gitignore（防止提交敏感信息）
echo ".env" >> .gitignore
```

---

## 📦 第二步：项目初始化

### package.json

```json
{
  "name": "release-report-agent",
  "version": "1.0.0",
  "description": "自动生成上线前迭代报告 - 支持 GitLab 和 Bitbucket",
  "main": "dist/cli.js",
  "scripts": {
    "build": "tsc",
    "start": "ts-node cli.ts",
    "generate-report": "npm run build && node dist/cli.js",
    "dev": "ts-node cli.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "release",
    "report",
    "agent",
    "gitlab",
    "bitbucket",
    "automation"
  ],
  "author": "",
  "license": "MIT",
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
```

### tsconfig.json

```json
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
```

### .gitignore

```
# 环境变量
.env
.env.local
.env.*.local

# Node
node_modules/
npm-debug.log
yarn-error.log

# Build output
dist/
build/

# IDE
.vscode/
.idea/
*.swp
*.swo

# 敏感信息
*.token
*.key
*.pem

# 临时文件
tmp/
temp/
*.tmp

# OS
.DS_Store
Thumbs.db
```

---

## 🛠️ 第三步：安装和初始化

### 快速开始（3 分钟）

```bash
# 1. 进入项目目录
cd /path/to/release-report-agent

# 2. 初始化NPM项目
npm init -y

# 3. 安装依赖
npm install axios dotenv
npm install --save-dev @types/node ts-node typescript

# 4. 创建项目结构
mkdir -p adapters agents release-reports

# 5. 创建 tsconfig.json
# （复制上面的 tsconfig.json 内容到 tsconfig.json 文件）

# 6. 创建 .env 文件
cp .env.example .env

# 7. 编辑 .env 填入你的配置
# 使用你喜欢的编辑器，或用以下命令（Mac/Linux）：
cat > .env << 'EOF'
VCS_TYPE=gitlab
VCS_BASE_URL=https://gitlab.company.com
GITLAB_PROJECT_ID=123
GITLAB_TOKEN=glpat-xxx
RELEASE_BRANCH=release/main
BASE_BRANCH=main
EOF
```

---

## ✅ 第四步：配置验证

### 验证脚本：validate-config.ts

```typescript
// validate-config.ts
// 验证环境变量和VCS连接

import axios from 'axios'
import * as fs from 'fs'

async function validateConfig() {
  console.log('🔍 开始验证配置...\n')

  // 1. 检查 .env 文件
  if (!fs.existsSync('.env')) {
    console.error('❌ 错误：找不到 .env 文件')
    console.log('   请运行：cp .env.example .env')
    process.exit(1)
  }
  console.log('✅ .env 文件存在')

  // 2. 加载环境变量
  require('dotenv').config()

  const vcsType = process.env.VCS_TYPE
  const vcsBaseUrl = process.env.VCS_BASE_URL
  const vcsToken = process.env.VCS_TOKEN || process.env.GITLAB_TOKEN || process.env.BITBUCKET_TOKEN
  const releaseBranch = process.env.RELEASE_BRANCH

  // 3. 验证必需变量
  const errors: string[] = []

  if (!vcsType) errors.push('VCS_TYPE 未设置 (应为 gitlab 或 bitbucket)')
  if (!vcsBaseUrl) errors.push('VCS_BASE_URL 未设置')
  if (!vcsToken) errors.push('Token 未设置 (GITLAB_TOKEN 或 BITBUCKET_TOKEN)')
  if (!releaseBranch) errors.push('RELEASE_BRANCH 未设置')

  if (vcsType === 'gitlab' && !process.env.GITLAB_PROJECT_ID) {
    errors.push('GITLAB_PROJECT_ID 未设置 (GitLab模式需要)')
  }

  if (vcsType === 'bitbucket') {
    if (!process.env.BITBUCKET_WORKSPACE) errors.push('BITBUCKET_WORKSPACE 未设置')
    if (!process.env.BITBUCKET_REPO_SLUG) errors.push('BITBUCKET_REPO_SLUG 未设置')
  }

  if (errors.length > 0) {
    console.error('\n❌ 配置错误：')
    errors.forEach(err => console.error(`   • ${err}`))
    process.exit(1)
  }

  console.log('✅ 环境变量检查通过')

  // 4. 测试 VCS 连接
  console.log('\n🌐 测试 VCS 连接...')

  try {
    if (vcsType === 'gitlab') {
      const response = await axios.get(
        `${vcsBaseUrl}/api/v4/projects/${process.env.GITLAB_PROJECT_ID}`,
        {
          headers: { 'PRIVATE-TOKEN': vcsToken }
        }
      )
      console.log(`✅ GitLab 连接成功`)
      console.log(`   项目: ${response.data.name}`)
      console.log(`   URL: ${response.data.web_url}`)
    } else if (vcsType === 'bitbucket') {
      const response = await axios.get(
        `${vcsBaseUrl}/2.0/repositories/${process.env.BITBUCKET_WORKSPACE}/${process.env.BITBUCKET_REPO_SLUG}`,
        {
          headers: { Authorization: `Bearer ${vcsToken}` }
        }
      )
      console.log(`✅ Bitbucket 连接成功`)
      console.log(`   仓库: ${response.data.name}`)
      console.log(`   URL: ${response.data.links.html.href}`)
    }
  } catch (error: any) {
    console.error(`\n❌ VCS 连接失败: ${error.message}`)
    console.error('   请检查：')
    console.error('   1. VCS_BASE_URL 是否正确')
    console.error('   2. Token 是否有效且有 API 权限')
    console.error('   3. 网络连接是否正常')
    process.exit(1)
  }

  // 5. 验证上线分支
  console.log('\n🌿 验证上线分支...')

  try {
    if (vcsType === 'gitlab') {
      const response = await axios.get(
        `${vcsBaseUrl}/api/v4/projects/${process.env.GITLAB_PROJECT_ID}/repository/branches/${releaseBranch}`,
        {
          headers: { 'PRIVATE-TOKEN': vcsToken }
        }
      )
      console.log(`✅ 上线分支存在: ${releaseBranch}`)
      console.log(`   最后提交: ${response.data.commit.short_id}`)
    } else if (vcsType === 'bitbucket') {
      const response = await axios.get(
        `${vcsBaseUrl}/2.0/repositories/${process.env.BITBUCKET_WORKSPACE}/${process.env.BITBUCKET_REPO_SLUG}/refs/branches/${releaseBranch}`,
        {
          headers: { Authorization: `Bearer ${vcsToken}` }
        }
      )
      console.log(`✅ 上线分支存在: ${releaseBranch}`)
      console.log(`   最后提交: ${response.data.target.hash.substring(0, 7)}`)
    }
  } catch (error: any) {
    console.warn(`⚠️  无法验证上线分支: ${releaseBranch}`)
    console.warn('   这可能是正常的（分支可能还未创建）')
  }

  console.log('\n✨ 所有配置验证通过！')
  console.log('\n📝 现在你可以运行：')
  console.log('   npm run dev -- release/v1.2.3')
  console.log('   或者：')
  console.log('   npm run generate-report')
}

validateConfig().catch(error => {
  console.error('验证过程出错:', error)
  process.exit(1)
})
```

### 运行验证

```bash
# 方法1：直接用 ts-node
npx ts-node validate-config.ts

# 方法2：编译后运行
npm run build
node dist/validate-config.js
```

---

## 🚀 第五步：首次运行

### 快速测试

```bash
# 方式1：使用 ts-node (无需编译，最快)
npx ts-node cli.ts release/main

# 方式2：使用 npm script
npm run dev -- release/main

# 方式3：完整流程（编译+运行）
npm run generate-report
```

### 预期输出

```
🚀 开始生成上线报告: release/main

📂 第1步：获取合并的PR...
✅ 找到 5 个PR

📊 第2步：统计改动信息...
✅ 统计完成: 45 个文件改动

✨ 报告生成完成！

✅ 报告已保存: ./release-reports/v1.2.3_2024-01-10.md
```

---

## 📋 故障排查

### 问题 1：无法读取 .env 文件

**错误信息**：`Error: ENOENT: no such file or directory`

**解决方案**：
```bash
# 检查文件是否存在
ls -la .env

# 如果不存在，创建它
cp .env.example .env

# 如果 .example 也不存在，手动创建：
cat > .env << 'EOF'
VCS_TYPE=gitlab
VCS_BASE_URL=https://your-gitlab.com
GITLAB_PROJECT_ID=123
GITLAB_TOKEN=glpat-xxx
RELEASE_BRANCH=release/main
BASE_BRANCH=main
EOF
```

### 问题 2：Token 验证失败

**错误信息**：`401 Unauthorized`

**检查列表**：
```
1. Token 是否正确复制（不要有多余空格）
2. Token 是否过期（在VCS系统中验证）
3. Token 是否有 API 权限（在VCS中检查Token权限设置）
4. VCS_BASE_URL 是否正确（含或不含末尾 /）
5. 网络是否能访问 VCS 地址
```

**调试步骤**：
```bash
# 用 curl 测试连接
# GitLab
curl -H "PRIVATE-TOKEN: your-token" \
  https://your-gitlab.com/api/v4/user

# Bitbucket
curl -H "Authorization: Bearer your-token" \
  https://bitbucket.org/api/2.0/user
```

### 问题 3：找不到项目或仓库

**错误信息**：`404 Not Found`

**检查列表**：
```
GitLab:
  1. GITLAB_PROJECT_ID 是否正确（在项目 Settings → General 中查看）
  2. 你的 Token 对该项目是否有访问权限
  3. 项目是否为私有（Token需要足够权限）

Bitbucket:
  1. BITBUCKET_WORKSPACE 是否正确（通常在URL中 bitbucket.org/{workspace}）
  2. BITBUCKET_REPO_SLUG 是否正确（仓库名，不是ID）
  3. 你的 Token 对该仓库是否有访问权限
```

### 问题 4：无法找到上线分支

**错误信息**：`Branch not found` 或报告为空

**解决方案**：
```bash
# 检查实际的分支名
git branch -a

# 确保 RELEASE_BRANCH 与实际分支名匹配
# .env 中检查是否设置了正确的分支名

# 如果分支不存在，创建它
git checkout -b release/v1.2.3
git push origin release/v1.2.3
```

---

## 📊 第六步：生成第一份报告

### 实际工作流

```bash
# 1. 周四上午：拉上线分支，合并所有需求分支到 release/main
git checkout -b release/main
git pull origin release/main
# ... 合并各个需求分支 ...
git push origin release/main

# 2. 周四中午：运行 Agent 生成报告
npm run generate-report

# 3. 查看生成的报告
cat release-reports/v1.2.3_2024-01-10.md

# 4. 报告内容示例：
#    - 版本号：v1.2.3
#    - 统计：5 个PR，45 个文件改动，+2340 -1200 行代码
#    - PR详情列表
#    - 上线检查清单
```

### 报告文件位置

所有生成的报告保存在 `release-reports/` 目录中：

```
release-reports/
├── v1.2.3_2024-01-10.md
├── v1.2.2_2024-01-03.md
└── v1.2.1_2023-12-27.md
```

---

## 🔄 第七步：集成到工作流

### Option A：手动运行（最简单）

```bash
# 周四中午，直接运行
npm run generate-report

# 报告生成完成，打开查看
open release-reports/v1.2.3_2024-01-10.md
```

### Option B：GitHub Actions（推荐）

创建 `.github/workflows/generate-report.yml`：

```yaml
name: 生成上线报告

on:
  workflow_dispatch:
    inputs:
      release_branch:
        description: '上线分支'
        required: true
        default: 'release/main'

jobs:
  generate-report:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: 安装依赖
        run: npm install

      - name: 生成报告
        env:
          VCS_TYPE: ${{ vars.VCS_TYPE }}
          VCS_BASE_URL: ${{ vars.VCS_BASE_URL }}
          GITLAB_PROJECT_ID: ${{ vars.GITLAB_PROJECT_ID }}
          GITLAB_TOKEN: ${{ secrets.GITLAB_TOKEN }}
          BITBUCKET_WORKSPACE: ${{ vars.BITBUCKET_WORKSPACE }}
          BITBUCKET_REPO_SLUG: ${{ vars.BITBUCKET_REPO_SLUG }}
          BITBUCKET_TOKEN: ${{ secrets.BITBUCKET_TOKEN }}
        run: npm run generate-report -- ${{ github.event.inputs.release_branch }}

      - name: 上传报告
        uses: actions/upload-artifact@v3
        with:
          name: release-reports
          path: release-reports/
          retention-days: 365
```

**使用方法**：
1. 在 GitHub 中进入 Actions 标签
2. 选择 "生成上线报告" workflow
3. 点击 "Run workflow"
4. 输入上线分支名
5. 等待完成，下载报告

### Option C：GitLab CI（如果使用GitLab）

创建 `.gitlab-ci.yml`：

```yaml
generate_release_report:
  stage: deploy
  image: node:18
  script:
    - npm install
    - npm run generate-report
  only:
    - web  # 手动触发
  artifacts:
    paths:
      - release-reports/
    expire_in: 365 days
```

---

## ✅ 检查清单

完成以下所有步骤后，你就可以开始使用Agent了：

- [ ] 克隆/复制项目代码到本地
- [ ] 创建项目目录结构（adapters, agents 等）
- [ ] 复制所有代码文件（adapters/vcs-adapter.ts, agents/release-report-agent.ts, cli.ts）
- [ ] 复制 package.json, tsconfig.json, .gitignore
- [ ] 运行 `npm install` 安装依赖
- [ ] 创建 .env 文件，填入你的 VCS 配置信息
- [ ] 运行验证脚本：`npx ts-node validate-config.ts`
- [ ] 测试第一次报告生成：`npm run dev -- release/main`
- [ ] 查看生成的 release-reports/*.md 文件
- [ ] （可选）配置 GitHub Actions 或 GitLab CI
- [ ] 整合到你的周四中午工作流中

---

## 📞 常见问题

### Q: 需要哪些权限？

**A**：
- **GitLab**：API 权限读取项目、合并请求、对比信息
- **Bitbucket**：API 权限读取仓库、拉取请求信息
- 通常"api"权限就足够了

### Q: 可以同时处理 GitLab 和 Bitbucket 吗？

**A**：目前实现支持单个仓库（GitLab 或 Bitbucket）。后续可以扩展支持多仓库合并报告。

### Q: 报告格式可以自定义吗？

**A**：可以！修改 `agents/release-report-agent.ts` 中的 `generateMarkdown()` 方法即可。

### Q: 可以自动上传到文档系统吗？

**A**：这个在简化版本中暂不支持。后续当你的文档系统有 API 或 MCP 时，可以添加这个功能。

### Q: 多个分支合并到 release 时怎么统计？

**A**：Agent 会自动找出所有合并到 release 分支的 PR，统计它们的总改动。

---

## 🎯 下一步

完成上述配置后，你就可以：

1. **周四上午**：拉分支，合并PR
2. **周四中午**：运行 `npm run generate-report`
3. **2分钟后**：完整的迭代报告自动生成 ✨
4. **后续优化**：集成需求系统、文档上传、机器人通知

---

**准备好开始了吗？** 🚀

从 `npm install` 开始！

