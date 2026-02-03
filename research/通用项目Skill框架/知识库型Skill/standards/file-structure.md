# 文件结构规范

> 【需要你填写】项目的目录和文件组织方式

## 项目根目录结构

【填写】描述项目最高层级的结构：

```
project-root/
├── src/                          【填写】源代码目录
├── tests/ 或 __tests__/          【填写】测试目录
├── public/                        【填写】静态资源目录（如果有）
├── docs/                          【填写】文档目录（如果有）
├── .github/                       【填写】GitHub 相关（workflows、templates 等）
├── build/ 或 dist/               【填写】构建输出目录
├── node_modules/                 【填写】依赖包（不提交）
│
├── package.json                  【填写】项目配置
├── tsconfig.json                 【填写】TypeScript 配置
├── .eslintrc                      【填写】ESLint 配置
├── .prettierrc                    【填写】Prettier 配置
├── .env.example                   【填写】环境变量示例
│
├── README.md                      【填写】项目说明
├── CHANGELOG.md                   【填写】更新日志
└── LICENSE                        【填写】许可证
```

## 源代码目录结构

【填写】`src/` 目录的详细结构：

### 通用结构

```
src/
├── components/          【填写】可复用组件
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   └── Button.test.tsx
│   ├── Modal/
│   └── ...
│
├── pages/              【填写】页面组件
│   ├── HomePage.tsx
│   ├── UserPage.tsx
│   └── ...
│
├── layouts/            【填写】布局组件（如果有）
│   ├── MainLayout.tsx
│   └── AdminLayout.tsx
│
├── hooks/              【填写】自定义 Hook
│   ├── useUserData.ts
│   ├── useFetch.ts
│   └── ...
│
├── services/           【填写】API 服务
│   ├── api.ts
│   ├── auth.ts
│   └── ...
│
├── utils/              【填写】工具函数
│   ├── formatDate.ts
│   ├── validateForm.ts
│   └── ...
│
├── constants/          【填写】常量
│   ├── colors.ts
│   ├── config.ts
│   └── ...
│
├── types/              【填写】TypeScript 类型定义
│   ├── user.ts
│   ├── api.ts
│   └── ...
│
├── store/              【填写】状态管理（如果使用）
│   ├── userSlice.ts
│   ├── store.ts
│   └── ...
│
├── styles/             【填写】全局样式（如果有）
│   ├── global.css
│   ├── variables.css
│   └── ...
│
└── App.tsx             【填写】主应用组件
└── main.tsx / index.tsx  【填写】入口文件
```

### 你的项目特定结构

【填写】根据实际情况调整上面的结构，或添加特殊的目录：

```
src/
├── 【填写额外的目录 1】
├── 【填写额外的目录 2】
└── 【填写额外的目录 3】
```

## 组件目录结构

【填写】单个组件应该如何组织：

### 选项 1: 组件内部

```
src/components/Button/
├── Button.tsx           // 组件主体
├── Button.module.css    // 组件样式
├── Button.test.tsx      // 单元测试
├── Button.types.ts      // 组件类型定义
└── index.ts             // 导出
```

### 选项 2: 组件平铺

```
src/components/
├── Button.tsx
├── Button.css
├── Button.test.tsx
└── ...
```

**【选择】你的项目用哪一种？**
- [ ] 选项 1（组件内部）
- [ ] 选项 2（组件平铺）

## 测试文件位置

【填写】测试文件应该放在哪里：

### 选项 1: 同级目录（推荐）

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx
└── utils/
    ├── formatDate.ts
    └── formatDate.test.ts
```

### 选项 2: 专门的测试目录

```
src/
├── components/
│   └── Button.tsx
└── __tests__/
    ├── components/
    │   └── Button.test.tsx
    └── utils/
        └── formatDate.test.ts
```

**【选择】你的项目用哪一种？**
- [ ] 选项 1（同级）
- [ ] 选项 2（专门目录）

## 样式文件组织

【填写】项目如何组织样式：

### 选项 1: CSS Modules（推荐）

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.module.css
│   └── ...
└── pages/
    ├── Home/
    │   ├── Home.tsx
    │   └── Home.module.css
    └── ...
```

### 选项 2: 全局 CSS

```
src/
├── styles/
│   ├── global.css
│   ├── variables.css
│   └── mixins.css
├── components/
└── pages/
```

### 选项 3: Tailwind CSS（无需组织）

所有样式在 HTML/JSX 中使用 class。

**【选择】你的项目用哪一种？**
- [ ] 选项 1（CSS Modules）
- [ ] 选项 2（全局 CSS）
- [ ] 选项 3（Tailwind）
- [ ] 其他：【填写】

## 导入路径别名

【填写】项目是否使用路径别名：

```typescript
【填写示例】
// ✅ 推荐
import Button from '@/components/Button';
import { formatDate } from '@/utils/formatDate';

// ❌ 相对路径较深时不推荐
import Button from '../../../components/Button';
```

**配置**（如果使用）:
- [ ] `@` 表示 `src/` 目录
- [ ] `@components` 表示 `src/components/` 目录
- [ ] 【填写你项目的别名配置】

配置文件：`tsconfig.json` 或 `vite.config.js` 或 `webpack.config.js`

## 环境相关文件

【填写】

```
project-root/
├── .env              // 本地默认配置（提交）
├── .env.local        // 本地开发配置（不提交）
├── .env.staging      // 预发环境配置（不提交）
└── .env.production   // 生产环境配置（不提交）
```

【填写】
- 哪些 `.env` 文件需要提交？
- 哪些 `.env` 文件应该在 `.gitignore` 中？

## .gitignore 标准配置

【填写】项目应该忽略的文件和目录：

```
【填写示例】
node_modules/
dist/
build/
.env.local
.env.*.local
.DS_Store
*.log
.idea/
.vscode/local

【补充】你的项目特有的忽略项：
```

## 禁止的文件结构

【填写】项目中不应该出现的结构：

- [ ] 【填写禁止项 1】
- [ ] 【填写禁止项 2】
- [ ] 【填写禁止项 3】

例如：
- 不应该有 `temp/` 或 `trash/` 目录
- 不应该有 `.js` 和 `.ts` 混用（除非特殊原因）
- 不应该有多个版本的组件（如 `ButtonV1`、`ButtonV2`）

---

**相关链接**：
- 命名规范 → [[naming-conventions|命名规范]]
- 代码规范 → [[code-standards|代码规范]]
