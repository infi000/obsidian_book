# Step 2: 检查规范符合性

Code Review 的第二步是**检查代码是否遵循规范**。

⏱️ **预期时间：10 分钟**

## 🎯 目标

在这一步，你需要检查：
- ✅ 代码是否符合编码规范
- ✅ 命名是否符合规范
- ✅ 文件结构是否符合规范
- ✅ Git 提交是否符合规范

## 📋 检查清单

### 1. 代码规范 (Code Standards)

参考：[[../../知识库型Skill/standards/code-standards|知识库 - 代码规范]]

【快速检查】

- [ ] 是否使用了 `var`？（应该用 `const` 或 `let`）
- [ ] 变量声明是否清晰？（避免单字母变量）
- [ ] 函数是否简洁？（复杂逻辑应该拆分）
- [ ] 是否有清晰的注释？（特别是复杂逻辑）
- [ ] 没有 `console.log` 调试代码？（应该用 logger）
- [ ] 没有 `debugger`？（不应该提交）
- [ ] 没有 `alert`？（应该用适当的 UI）
- [ ] 有没有遵循 TypeScript 类型定义？（no `any`）

**如何检查**：
```javascript
// ❌ 问题代码示例
function getData(o) {  // 变量名太短
  console.log(o);       // 调试代码
  const r = o.data;     // 单字母变量
  return r;
}

// ✅ 好的代码示例
function getUserData(object: User): UserData {
  logger.debug('Fetching user data');
  const userData = object.data;
  return userData;
}
```

### 2. 命名规范 (Naming Conventions)

参考：[[../../知识库型Skill/standards/naming-conventions|知识库 - 命名规范]]

【快速检查】

- [ ] **文件名** - 是否符合规范？（组件用 PascalCase，其他用 camelCase）
- [ ] **变量名** - 是否清晰有意义？（用 camelCase）
- [ ] **函数名** - 是否描述了功能？（动词开头）
- [ ] **常量名** - 是否全大写？（SNAKE_CASE）
- [ ] **类名** - 是否用 PascalCase？
- [ ] **布尔变量** - 是否用 `is`、`has` 前缀？

**示例**：
```javascript
// ❌ 问题命名
const u = 'John';        // 太短
const userName = false;  // 布尔值没有 is 前缀
const getname = () => {} // 函数名没大写
const MAX_users = 100;   // 常量大小写混乱

// ✅ 好的命名
const userName = 'John';
const isUserActive = false;
const getUserName = () => {}
const MAX_USERS = 100;
```

### 3. 文件结构规范 (File Structure)

参考：[[../../知识库型Skill/standards/file-structure|知识库 - 文件结构规范]]

【快速检查】

- [ ] 新文件放在正确的目录吗？（components/ 还是 utils/？）
- [ ] 文件组织方式是否一致？（与项目现有风格一致）
- [ ] 是否在 `__tests__` 或同级添加了测试？
- [ ] 是否更新了 index.ts 导出？（如果有的话）
- [ ] 没有多余的文件吗？（如临时文件、备份文件）

**示例**：
```
src/
├── components/           ← 组件文件应该在这里
│   ├── Button.tsx
│   ├── Button.test.tsx
│   └── index.ts (导出)
├── utils/                ← 工具函数应该在这里
│   ├── formatDate.ts
│   └── formatDate.test.ts
├── pages/                ← 页面应该在这里
```

### 4. Git 提交规范 (Git Workflow)

参考：[[../../知识库型Skill/standards/git-workflow|知识库 - Git 工作流]]

【快速检查】

- [ ] 分支名是否符合规范？（feature/xxx 或 bugfix/xxx）
- [ ] 提交信息是否清晰？（feat(...): ... 或 fix(...): ...）
- [ ] 提交粒度是否合理？（一个提交 = 一个逻辑改动）
- [ ] 是否有没有意义的提交？（如 "fix: typo" 后来又改了）
- [ ] 没有提交不应该的文件吗？（node_modules、.env 等）

**示例 - 检查 git log**：
```
✅ 好的提交序列：
feat(auth): add OAuth integration
feat(auth): add OAuth token refresh
test(auth): add unit tests for OAuth

❌ 不好的提交序列：
fix: something
wip
fix: wip
fix: actually this
```

## 🚨 常见规范问题

### 问题 1: 混乱的代码规范

```javascript
// ❌ 混乱的代码
function process(data){
  var result = [];
  for(var i = 0;i<data.length;i++){
    if(data[i].active){result.push(data[i]);}
  }
  return result;
}

// ✅ 符合规范的代码
function getActiveItems(data: Item[]): Item[] {
  const activeItems = data.filter((item) => item.active);
  return activeItems;
}
```

**如何反馈**：
```
这段代码有几个规范问题：
1. 不应该使用 `var`，应该用 `const`
2. 函数名应该更清晰（getActiveItems 而不是 process）
3. 逻辑应该使用 filter() 而不是 for 循环

建议：
[提供改进的代码示例]
```

### 问题 2: 不一致的命名

```javascript
// ❌ 命名不一致
const users = [];
const activeUser = null;
const is_loading = false;  // 混合 snake_case

// ✅ 一致的命名
const users = [];
const activeUser = null;
const isLoading = false;  // 都用 camelCase
```

### 问题 3: 文件位置错误

```
❌ 错误的位置
src/pages/components/Button.tsx  ← Button 应该在 components/

✅ 正确的位置
src/components/Button.tsx
```

## ✅ 完成这一步后

如果你已经：
- ✅ 检查了代码规范符合性
- ✅ 没有发现规范问题（或已指出）
- ✅ 准备好检查代码质量

**→ 进入 [[step3-check-security-and-performance|Step 3：检查质量/安全/性能]]**

---

**下一步**：[[step3-check-security-and-performance|Step 3 - 检查代码质量、安全和性能]]
