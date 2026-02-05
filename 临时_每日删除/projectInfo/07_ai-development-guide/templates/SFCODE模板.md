## 项目概览

**elog-nwms-core-all-web** 是顺丰仓储管理系统（WMS）的前端 Monorepo 项目，使用 **pnpm** + **Turborepo** 构建。项目包含多个仓储管理应用，采用 **Vue 2.7** 技术栈并集成 **Element UI** 组件库。

### 项目结构

```
elog-nwms-core-all-web/
├── apps/                    # 应用程序目录
│   ├── n-wms/              # 主干仓储系统 (NWMS)
│   ├── m-wms/              # 物资仓储系统
│   └── d-wms/              # DSC 仓储系统
├── packages/                # 共享包
│   ├── components/         # 通用组件库 (@packages/components)
│   └── utils/              # 通用工具函数
├── internal/                # 内部配置
│   └── config-eslint/      # 共享 ESLint 配置 (@repo/eslint-config)
├── envs/                    # 环境配置文件
│   ├── n-wms.js
│   ├── m-wms.js
│   └── d-wms.js
└── agents/                  # AI Agent 技能配置
```

### 主要技术栈

- **框架**: Vue 2.7.14
- **UI 库**: Element UI 2.14.1
- **状态管理**: Vuex 3.x
- **路由**: Vue Router 3.x
- **构建工具**: Vue CLI 5.x / Vite 2.x
- **包管理器**: pnpm 8.15.6
- **Monorepo 工具**: Turborepo 2.x
- **国际化**: vue-i18n 8.x
- **CSS 预处理**: Less

---

## 构建与运行

### 环境要求

- **Node.js**: v16.20.2 (参见 `.nvmrc`)
- **包管理器**: pnpm 8.15.6 (强制使用，其他包管理器会被拦截)

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 运行所有应用
pnpm dev

# 运行特定应用
pnpm n-wms:dev    # 主干仓储系统
pnpm m-wms:dev    # 物资仓储系统
pnpm d-wms:dev    # DSC 仓储系统
```

### 生产构建

```bash
# 构建所有应用
pnpm build

# 构建特定应用
pnpm n-wms:build  # 主干仓储系统
pnpm m-wms:build  # 物资仓储系统
pnpm d-wms:build  # DSC 仓储系统
```

### 代码检查

```bash
# 在具体应用目录下执行
cd apps/n-wms
pnpm lint         # 代码检查
pnpm lint:fix     # 自动修复
```

---

## 开发要求

### 代码规范

1. **ESLint**: 项目使用统一的 ESLint 配置 (`@repo/eslint-config`)，所有应用继承根目录配置
2. **Prettier**: 代码格式化通过 `lint-staged` 在提交时自动执行
3. **Commit 规范**: 使用 `commitlint` 遵循 Conventional Commits 规范
4. **Husky**: Git hooks 用于提交前代码检查

### 工作区包引用

- 使用 `workspace:*` 语法引用本地包
- 共享组件: `@packages/components`
- 共享工具: `@packages/utils`
- ESLint 配置: `@repo/eslint-config`

### 目录别名 (n-wms 应用)

```javascript
'@': './src/'
'components': './src/components'
'img': './src/assets/img'
'style': './src/assets/style'
'api': './src/api'
'utils': './src/utils'
```

### 环境配置

- 环境配置文件位于 `envs/` 目录
- 使用 `env-cmd` 加载环境变量
- 开发环境 (`dev`) 和生产环境 (`prod`) 配置分离

### 样式规范

- 使用 Less 作为 CSS 预处理器
- 全局样式变量定义在 `src/assets/style/config.less`
- 组件样式使用 scoped 或 Less 模块化

---

## 公共组件

### @packages/components

通用组件库，按业务领域划分：
- `common/` - 通用基础组件
- `enterprise/` - 企业级组件
- `warehouse/` - 仓储业务组件
- `lang/` - 国际化相关

### 公共工具函数

通用工具函数库，供所有应用共享。

---

## AI Agent 技能

项目集成了 AI 辅助开发技能（见 `AGENTS.md`）


使用方式：
```bash
openskill read code-review
```

---

## 备注
- 你是一名经验丰富的资深前端开发，你的核心任务是完成需求设计与开发，你要确保设计真实性、代码质量和与项目约定的无缝集成，所有问题用中文回答
