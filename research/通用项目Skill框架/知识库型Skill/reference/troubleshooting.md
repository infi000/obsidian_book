# 常见问题排查

> 【需要你填写】项目中常见的问题和解决方案

## 环境问题

### 问题: Node 版本不兼容
**症状**:
```
npm install 时报错：node version not compatible
or TypeError: unsupported
```

**解决**:
```bash
# 检查你的 Node 版本
node --version

# 【填写】应该是什么版本？
# 如果版本不对，升级 Node

# 使用 nvm 切换版本
nvm use 【填写版本】

# 或升级 Node.js
# macOS: brew upgrade node
# 其他系统: https://nodejs.org/
```

### 问题: 依赖安装失败
**症状**:
```
npm install 失败，有 ERR! 错误
```

**解决**:
```bash
# 1. 清除 npm 缓存
npm cache clean --force

# 2. 删除 node_modules 和 lock 文件
rm -rf node_modules package-lock.json

# 3. 重新安装
npm install

# 如果还不行，尝试：
npm install --legacy-peer-deps
```

### 问题: 端口被占用
**症状**:
```
npm run dev 报错：EADDRINUSE: address already in use :::3000
```

**解决**:
```bash
# macOS / Linux: 查看占用端口的进程
lsof -i :3000

# 杀死进程
kill -9 <PID>

# Windows: 用 Windows 任务管理器关闭进程

# 或改用其他端口
npm run dev -- --port 3001
```

## 开发问题

### 问题: 代码保存后没有热更新
**症状**:
修改文件后，浏览器没有自动刷新。

**解决**:
```bash
# 1. 检查 webpack/vite 配置
# 【填写项目的配置文件位置】

# 2. 重启开发服务器
npm run dev

# 3. 检查文件是否在 watch 列表中
# 某些编辑器（如 VS Code）可能需要重新加载
```

### 问题: TypeScript 报错但代码能运行
**症状**:
编辑器显示红色波浪线错误，但 `npm run build` 成功。

**解决**:
```bash
# 1. 检查 tsconfig.json 配置
cat tsconfig.json

# 2. 重新加载 TypeScript 服务
# VS Code: Ctrl+Shift+P > TypeScript: Restart TS Server

# 3. 检查类型定义是否正确
# 可能需要安装 @types/xxx
npm install --save-dev @types/【包名】
```

### 问题: 导入路径出错
**症状**:
```
Cannot find module '@/components/Button'
```

**解决**:
```bash
# 1. 检查路径别名配置
# tsconfig.json 或 vite.config.js
cat tsconfig.json | grep paths

# 2. 检查文件是否存在
# 确保 src/components/Button.tsx 存在

# 3. 重启开发服务器
npm run dev

# 4. 检查大小写
# 文件系统可能区分大小写（Linux）
```

## 测试问题

### 问题: 测试运行失败
**症状**:
```
npm test 时出现多个 test 失败
```

**解决**:
```bash
# 1. 运行单个测试看详细错误
npm test Button

# 2. 检查测试环境变量
# 需要 .env.test 吗？
cat .env.test

# 3. 清除测试缓存
npm test -- --clearCache

# 4. 检查依赖是否安装
npm install
```

### 问题: 测试超时
**症状**:
```
timeout of 5000ms exceeded
```

**解决**:
```bash
# 1. 增加超时时间
jest.setTimeout(10000);  // 在 test 文件中

# 2. 检查异步操作是否正确
// ❌ 错误
it('should load data', () => {
  fetchData();  // 没有 await
});

// ✅ 正确
it('should load data', async () => {
  await fetchData();
});

# 3. 模拟 API 调用
import { jest } from '@jest/globals';
jest.mock('@/services/api');
```

## 构建问题

### 问题: 构建失败
**症状**:
```
npm run build 时出现错误
```

**解决**:
```bash
# 1. 检查 TypeScript 错误
npm run build  # 仔细看错误信息

# 2. 检查代码是否符合 linter 规则
npm run lint

# 3. 修复 linter 错误
npm run lint -- --fix

# 4. 清除构建缓存
rm -rf dist/
npm run build
```

### 问题: 构建后文件太大
**症状**:
构建的 bundle 很大（超过 500KB）

**解决**:
```bash
# 1. 分析 bundle 大小
npm run build:analyze

# 2. 优化：
# - 移除未使用的依赖
# - 使用动态导入（代码分割）
# - 替换大库为小库

# 3. 检查依赖
npm list  # 查看依赖树
npm audit  # 检查安全问题
```

## 性能问题

### 问题: 应用加载很慢
**症状**:
首次加载花费很长时间

**解决**:
```
1. 打开 Chrome DevTools
2. Performance 标签
3. 开始录制
4. 加载页面
5. 停止录制，分析瓶颈

【填写】常见的性能问题和解决方案
```

### 问题: 内存泄漏
**症状**:
应用运行一段时间后，内存占用持续增加。

**解决**:
```
1. 检查是否有未清理的 listeners
2. 检查是否有循环引用
3. 使用 Chrome DevTools 的 Memory profiler 调试

【填写】常见的内存泄漏原因
```

## 编辑器问题

### 问题: VS Code 无法识别别名
**症状**:
编辑器显示路径错误（红色波浪线）

**解决**:
```bash
# 1. 确保 tsconfig.json 中配置了 paths
cat tsconfig.json

# 2. VS Code 设置中启用 Intellisense
# Ctrl+Shift+P > TypeScript: Enable Semantic Highlighting

# 3. 重新加载 VS Code
# Ctrl+Shift+P > Reload Window
```

### 问题: Prettier 和 ESLint 冲突
**症状**:
保存文件时，Prettier 和 ESLint 的规则互相抵触。

**解决**:
```bash
# 安装 eslint-config-prettier
npm install --save-dev eslint-config-prettier

# 在 .eslintrc 中添加
{
  "extends": ["eslint:recommended", "prettier"]
}
```

## Git 问题

### 问题: merge 冲突
**症状**:
`git merge` 时出现冲突

**解决**:
```bash
# 1. 查看冲突文件
git status

# 2. 编辑冲突文件，解决冲突

# 3. 标记已解决
git add .

# 4. 完成 merge
git commit -m "Merge branch xxx"
```

### 问题: 不小心提交了不应该提交的文件
**症状**:
提交了 node_modules 或 .env 文件

**解决**:
```bash
# 1. 如果还没 push
git reset HEAD~1  # 撤销最后一次提交

# 2. 更新 .gitignore
echo "node_modules/" >> .gitignore

# 3. 重新提交
git add .
git commit -m "fix: remove node_modules"

# 4. 如果已经 push，需要 force push（小心！）
git push --force-with-lease
```

## 网络和 API 问题

### 问题: API 请求失败
**症状**:
```
Failed to fetch from /api/xxx
CORS error
Network error
```

**解决**:
```
1. 检查 API 服务是否运行
   【填写】如何检查 API 是否启动

2. 检查 CORS 设置
   【填写】项目的 CORS 配置在哪里

3. 检查 API 文档
   【填写】API 文档位置

4. 检查网络请求
   打开 Chrome DevTools > Network 标签
   查看请求是否发出，响应是什么
```

### 问题: 超时错误
**症状**:
请求等待很长时间，最后超时

**解决**:
```bash
# 1. 增加超时时间
// 在 API 客户端中配置
axios.defaults.timeout = 10000;  // 10 秒

# 2. 检查网络
# 可能是网络连接问题

# 3. 检查 API 服务
# 可能是后端处理很慢
```

## 数据库问题

【填写】(如果项目使用数据库)

### 问题: 数据库连接失败
**症状**:
```
Cannot connect to database
Error: ECONNREFUSED
```

**解决**:
```bash
# 1. 检查数据库是否运行
# 【填写】如何检查数据库状态

# 2. 检查连接字符串
# 【填写】.env 中的数据库 URL 配置

# 3. 检查防火墙
# 【填写】如何开放数据库端口
```

## 疑难杂症

### 问题: 不知道从哪里开始
**症状**:
一切都坏了，不知道问题在哪。

**解决**:
```
1. 逐个检查：
   - 环境（Node、npm 版本）
   - 依赖（npm install）
   - 配置文件（tsconfig、webpack 等）
   - 代码（是否有语法错误）

2. 查看最近改动
   git log --oneline -10
   git diff

3. 尝试还原最近改动
   git reset --hard HEAD~1

4. 检查 git 分支
   git branch

5. 寻求帮助
   - 看项目的 Issue
   - 问团队成员
   - 开新 Issue 描述问题
```

### Q: 【其他常见问题】
**A:** 【填写】

---

**还是没解决？** 👇
- 查看 [[faq|常见问题 FAQ]]
- 创建新 Issue
- 问团队成员

**Debug 小贴士**:
- 🔍 查看浏览器 console 的错误信息
- 🔍 查看终端的完整错误堆栈
- 🔍 使用 `console.log` 追踪变量值
- 🔍 使用 Chrome DevTools 调试
- 🔍 使用 `git log` 查看改动历史
