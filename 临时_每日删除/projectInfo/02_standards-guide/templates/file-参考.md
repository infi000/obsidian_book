# 文件结构规范

## 项目整体结构

```
apodidae/
├── src/                          # 源代码目录
│   ├── containers/               # 业务页面容器 (154+ 个)
│   │   ├── order-manage/         # 订单管理
│   │   ├── user-profile/         # 用户档案（示例）
│   │   │   ├── UserProfile.tsx
│   │   │   ├── UserProfile.module.less
│   │   │   ├── types.ts
│   │   │   ├── api.ts
│   │   │   ├── hooks.ts
│   │   │   └── __tests__/
│   │   └── ...
│   │
│   ├── components/               # 可复用基础组件 (80+ 个)
│   │   ├── form-input/
│   │   ├── data-table/
│   │   ├── modal-dialog/
│   │   ├── button/
│   │   └── ...
│   │
│   ├── hooks/                    # 自定义 Hooks
│   │   ├── useUserData.ts
│   │   ├── useForm.ts
│   │   └── ...
│   │
│   ├── services/                 # 服务和工具
│   │   ├── api.ts               # API 客户端
│   │   ├── auth.ts              # 认证服务
│   │   └── ...
│   │
│   ├── utils/                    # 工具函数
│   │   ├── formatDate.ts
│   │   ├── calculateTotal.ts
│   │   ├── validateEmail.ts
│   │   └── ...
│   │
│   ├── state/                    # Redux 状态管理
│   │   ├── actions.ts
│   │   ├── reducer.ts
│   │   ├── selectors.ts
│   │   └── saga.ts
│   │
│   ├── common-base/              # 公共库（共享代码）
│   │   ├── containers/
│   │   ├── hooks/
│   │   ├── state/
│   │   └── ...
│   │
│   ├── translations/             # 国际化翻译文件
│   │   ├── zh-CN.json
│   │   ├── en-US.json
│   │   └── ...
│   │
│   ├── images/                   # 图片资源
│   │   ├── icons/
│   │   ├── logos/
│   │   └── ...
│   │
│   ├── app.js                    # Redux Store 配置
│   ├── index-dev.tsx            # 开发环境入口
│   └── index-prod.tsx           # 生产环境入口
│
├── config/                       # 构建配置
│   ├── webpack.common.config.js
│   ├── webpack.dev.config.js
│   ├── webpack.prod.config.js
│   └── ...
│
├── common-base/                  # 公共库（子模块）
│   ├── build/
│   ├── containers/
│   ├── scripts/
│   └── ...
│
├── public/                       # 静态资源
│   └── index.html
│
├── docs/                         # 文档
├── tests/                        # 测试文件
│
├── package.json
├── tsconfig.json
├── .eslintrc.js
├── vite.config.js
├── README.md
└── ...
```

## 容器组件 (containers) 文件结构

每个业务页面都应该遵循以下结构：

```
src/containers/order-manage/
├── OrderManage.tsx              # 主组件
├── OrderManage.module.less      # 样式
├── types.ts                     # TypeScript 类型定义
├── api.ts                       # API 调用和数据服务
├── hooks.ts                     # 自定义 Hooks
├── constants.ts                 # 常量定义
├── utils.ts                     # 工具函数
├── components/                  # 页面相关的子组件
│   ├── OrderForm.tsx
│   ├── OrderTable.tsx
│   └── ...
├── __tests__/                   # 单元测试
│   ├── OrderManage.test.tsx
│   └── ...
└── README.md                    # 页面说明（可选）
```

### 文件说明

| 文件 | 说明 | 何时需要 |
|-----|------|--------|
| **[ComponentName].tsx** | 主组件文件，包含业务逻辑 | 必须 |
| **[ComponentName].module.less** | 样式文件，使用 CSS Modules | 必须 |
| **types.ts** | TypeScript 类型定义 | 必须 |
| **api.ts** | API 调用函数和数据服务 | 需要请求数据时 |
| **hooks.ts** | 自定义 Hooks，复用逻辑 | 有可复用逻辑时 |
| **constants.ts** | 常量定义，如错误消息、状态值等 | 有常量时 |
| **utils.ts** | 工具函数，如格式化、验证等 | 有工具函数时 |
| **components/** | 页面相关的子组件 | 有复杂的 UI 拆分时 |
| **__tests__/** | 单元测试文件 | 关键功能需要测试 |
| **README.md** | 页面说明和使用指南 | 复杂页面需要说明 |

## 基础组件 (components) 文件结构

```
src/components/my-button/
├── MyButton.tsx                 # 组件代码
├── MyButton.module.less         # 样式
├── types.ts                     # Props 类型定义
├── __tests__/                   # 测试
│   └── MyButton.test.tsx
└── README.md                    # 使用说明（可选）
```

**简单组件** 可以放在一个文件中：

```
src/components/Button.tsx
```

## 状态管理文件结构

```
src/state/
├── actions.ts                   # Action creators
├── reducer.ts                   # Reducer 函数
├── selectors.ts                 # Reselect 选择器
├── saga.ts                      # Redux-Saga 副作用处理
├── types.ts                     # State 和 Action 类型
└── constants.ts                 # Action type 常量
```

## 新建文件时的检查清单

创建新的容器或组件时，检查以下要点：

- [ ] **文件夹位置** - 放在正确的位置（src/containers 或 src/components）
- [ ] **文件夹名称** - 使用 kebab-case
- [ ] **主文件名** - 使用 PascalCase.tsx
- [ ] **类型定义** - 有 types.ts，定义了 Props 和返回值类型
- [ ] **样式文件** - 有 [Name].module.less 样式文件
- [ ] **导出** - 在文件末尾导出组件
- [ ] **必要的文件** - 根据功能添加 api.ts、hooks.ts 等
- [ ] **测试文件** - 关键功能有对应的测试
- [ ] **命名规范** - 所有文件和变量名符合规范

## 避免的文件组织方式

❌ **不要这样做：**

```
src/containers/
├── orderManage/              # 不要用 camelCase 文件夹名
├── UserProfile/              # 不要用 PascalCase 文件夹名
├── all-in-one-file.tsx       # 不要把所有代码放在一个文件
└── api.ts                    # 不要在容器根目录放 API 文件

❌ 不要创建这样的文件夹：
src/utils/useHooks.ts         # Hooks 应该在 src/hooks/ 中
src/api/api.ts                # API 应该在各容器或服务中
src/types/user.ts             # 类型应该靠近使用的地方
```

## 导入路径最佳实践

**✅ 推荐的导入方式：**

```typescript
// 使用相对路径导入同级文件
import { formatDate } from './utils'
import styles from './OrderManage.module.less'

// 使用路径别名导入
import { Button } from '@/components/Button'
import { getUserById } from '@/services/api'
import { formatDate } from '@/utils/formatDate'

// 导入第三方库
import { connect } from 'react-redux'
import { Table } from 'antd'
```

**❌ 避免：**

```typescript
// 不要使用过长的相对路径
import { Button } from '../../../components/Button'

// 不要导入整个文件夹（应该导入具体的文件）
import * from './utils'
```

## 公共库 (common-base) 结构

公共库包含所有微应用都能使用的共享代码：

```
common-base/
├── containers/                 # 公共业务组件
├── hooks/                      # 公共 Hooks
├── scripts/                    # 构建和部署脚本
├── state/                      # 全局状态（用户、权限等）
├── utils/                      # 公共工具函数
├── styles/                     # 全局样式
└── build/                      # 构建配置
```

## 文件大小和复杂度指南

| 文件类型 | 建议行数 | 超过行数时的做法 |
|---------|--------|--------|
| **React 组件** | < 300 行 | 拆分为多个组件或子组件 |
| **类型定义** | < 100 行 | 按功能分为多个 types.ts 文件 |
| **Reducer** | < 200 行 | 按功能拆分为多个 reducer |
| **Saga** | < 300 行 | 拆分为多个 worker saga |
| **样式文件** | < 400 行 | 按组件功能拆分为多个样式文件 |

## 提交新文件的检查清单

在提交新文件或新文件夹前：

- [ ] 文件结构符合本规范
- [ ] 所有文件都有适当的命名
- [ ] 导入路径正确且清晰
- [ ] 有完整的类型定义
- [ ] 代码符合 [[02_standards/code-standards|代码规范]]
- [ ] 命名符合 [[02_standards/naming-conventions|命名规范]]
- [ ] 包含必要的测试文件
- [ ] 复杂逻辑有注释说明
