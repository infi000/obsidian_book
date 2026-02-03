# 代码质量检查清单

在 [[../../工作流型Skill/workflow/step2-check-standards|Step 2 - 检查规范符合性]] 时使用。

## ✅ 快速检查清单（3 分钟版本）

| 项目 | 检查 | 通过 |
|-----|------|-----|
| **代码规范** | 没有 `var`，使用 `const/let` | ☐ |
| **变量命名** | 变量名清晰有意义，用 camelCase | ☐ |
| **函数命名** | 函数名描述功能，用 camelCase | ☐ |
| **类型定义** | TypeScript 类型清晰，没有 `any` | ☐ |
| **文件位置** | 文件放在正确的目录 | ☐ |
| **注释** | 复杂逻辑有清晰注释 | ☐ |
| **调试代码** | 没有 console.log / debugger / alert | ☐ |
| **提交规范** | 分支名和提交信息符合规范 | ☐ |

---

## 📝 详细检查清单（完整版本）

### 编码规范

- [ ] 使用了 `var`？（应该删除，用 `const` 或 `let`）
- [ ] 变量声明清晰吗？（避免单字母变量如 'x', 'y'）
- [ ] 遵循了 TypeScript 类型规范吗？（没有过多 `any`）
- [ ] 函数长度合理吗？（>50 行应考虑拆分）
- [ ] 有清晰的注释吗？（特别是复杂逻辑）
- [ ] 没有 console.log、debugger、alert？

### 命名规范

**文件名**
- [ ] 组件文件用 PascalCase？（Button.tsx）
- [ ] 工具文件用 camelCase？（utils.ts）
- [ ] 测试文件有 .test 或 .spec？

**变量和函数**
- [ ] 变量用 camelCase？
- [ ] 布尔值有 is/has 前缀？（isActive, hasError）
- [ ] 常量用 UPPER_SNAKE_CASE？（MAX_RETRY_COUNT）
- [ ] 函数名描述了功能？（getUser, handleSubmit）
- [ ] 事件处理器用 handle 或 on 前缀？（handleClick, onClick）

**类型和接口**
- [ ] 类名用 PascalCase？
- [ ] 接口名清晰？（避免 IUser，直接用 User）

### 文件和结构

- [ ] 新文件放在正确的目录？
- [ ] 遵循了项目的目录结构？
- [ ] 更新了导出（index.ts）？
- [ ] 没有临时或备份文件？
- [ ] 没有不应该提交的文件？（.DS_Store、*.log）

### Git 相关

- [ ] 分支名符合规范？（feature/xxx, bugfix/xxx）
- [ ] 提交信息清晰？（feat(...): ...)
- [ ] 提交粒度合理？（一个提交一个逻辑）
- [ ] 没有提交不应该的文件？（node_modules、.env）

---

## 🚨 常见违规项

| 违规项 | 例子 | 改正 |
|-------|-----|------|
| 使用 var | `var x = 5;` | `const x = 5;` |
| 单字母变量 | `const u = user;` | `const currentUser = user;` |
| 不清晰的函数名 | `function process()` | `function validateUserInput()` |
| 缺少类型 | `const user: any` | `const user: User` |
| 调试代码 | `console.log(data);` | 删除 |
| 错误的文件位置 | `src/pages/Button.tsx` | `src/components/Button.tsx` |
| 混乱的提交 | 一个提交改了 10 个不相关的文件 | 分成多个提交 |

---

**参考**：[[../../知识库型Skill/standards/overview|知识库 - 规范总览]]
