# 项目结构规范

## 标准前端项目结构

```
my-project/
├── src/
│   ├── components/          # React 组件
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.module.css
│   │   │   └── index.ts
│   │   ├── UserCard/
│   │   │   ├── UserCard.tsx
│   │   │   ├── UserCard.test.tsx
│   │   │   └── index.ts
│   │   └── common/          # 通用组件
│   │       └── Loading.tsx
│   │
│   ├── pages/               # 页面级组件
│   │   ├── HomePage.tsx
│   │   ├── UserProfilePage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── hooks/               # 自定义 Hooks
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── services/            # API 服务层
│   │   ├── api.ts           # API 配置
│   │   ├── userService.ts
│   │   └── authService.ts
│   │
│   ├── utils/               # 工具函数
│   │   ├── format.ts        # 格式化函数
│   │   ├── validate.ts      # 验证函数
│   │   └── helpers.ts
│   │
│   ├── types/               # TypeScript 类型定义
│   │   ├── index.ts
│   │   ├── user.ts
│   │   └── api.ts
│   │
│   ├── constants/           # 常量定义
│   │   ├── config.ts
│   │   └── messages.ts
│   │
│   ├── store/               # 状态管理（如果使用 Redux）
│   │   ├── store.ts
│   │   ├── slices/
│   │   │   ├── userSlice.ts
│   │   │   └── authSlice.ts
│   │   └── hooks.ts
│   │
│   ├── styles/              # 全局样式
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── theme.ts
│   │
│   ├── App.tsx              # 应用入口组件
│   └── index.tsx            # React 应用启动
│
├── public/                  # 静态资源
│   └── index.html
│
├── tests/                   # 集成测试、E2E 测试
│   └── integration/
│
├── .env                     # 环境变量（不提交）
├── .env.example             # 环境变量模板
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts           # 或 webpack.config.js
├── eslint.config.mjs
├── .prettierrc
└── README.md
```

---

## 组件内部结构

### 单文件组件（简单组件）

```tsx
// Button.tsx
import React from 'react';
import styles from './Button.module.css';

// 1. 类型定义
export interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

// 2. 组件定义
export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = 'primary',
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

// 3. 导出
export default Button;
```

### 组件目录结构（复杂组件）

```
src/components/UserProfile/
├── UserProfile.tsx          # 主组件
├── UserProfile.module.css   # 样式
├── UserProfile.test.tsx     # 测试
├── UserProfile.types.ts     # 类型定义（如果复杂）
├── hooks/
│   └── useUserData.ts       # 组件专用 Hook
├── utils/
│   └── formatUserData.ts    # 组件专用工具
├── subcomponents/           # 子组件
│   ├── Header.tsx
│   └── Content.tsx
└── index.ts                 # 导出
```

---

## 文件分类指南

| 文件类型 | 位置 | 说明 |
|---------|------|------|
| React 组件 | `components/` | 可复用的 UI 组件 |
| 页面组件 | `pages/` | 路由对应的页面 |
| 自定义 Hooks | `hooks/` | 可复用的业务逻辑 |
| API 调用 | `services/` | 后端接口封装 |
| 工具函数 | `utils/` | 纯函数工具 |
| 类型定义 | `types/` | TypeScript 类型 |
| 常量 | `constants/` | 配置常量 |
| 状态管理 | `store/` | Redux 或其他状态 |
| 全局样式 | `styles/` | CSS 变量、主题 |

---

## 命名约定

### 组件相关

```
✅ 组件内容
src/components/UserCard/
├── UserCard.tsx             # 主组件
├── UserCard.module.css      # 模块样式
├── UserCard.test.tsx        # 单元测试
└── index.ts                 # 导出

❌ 不要这样
src/components/
├── userCard.tsx             # ❌ 小写
├── user-card.tsx            # ❌ kebab-case
├── UserCard.css             # ❌ 不用 module
└── UserCard.test.js         # ❌ 应该用 .tsx
```

### 其他文件

```
✅ 正确
src/utils/formatDate.ts      # camelCase
src/hooks/useAuth.ts         # useXxx 格式
src/types/user.ts            # camelCase
src/constants/config.ts      # camelCase

❌ 错误
src/utils/format-date.ts     # kebab-case（工具文件用 camelCase）
src/hooks/auth.ts            # 缺少 use 前缀
src/types/User.ts            # PascalCase（类型文件用 camelCase）
```

---

## 导出规范

### 组件导出

```typescript
// ✅ 推荐：在 index.ts 中导出
// components/UserCard/index.ts
export { UserCard } from './UserCard';
export type { UserCardProps } from './UserCard';

// 使用时
import { UserCard } from '@/components/UserCard';

// ❌ 避免：直接导入组件文件
import { UserCard } from '@/components/UserCard/UserCard';
```

### 工具函数导出

```typescript
// ✅ 推荐：使用 named export
export const formatDate = (date: Date): string => {};
export const parseDate = (str: string): Date => {};

// 使用时
import { formatDate, parseDate } from '@/utils/dateUtils';

// 🟢 可以：为大型工具函数库使用命名空间
import * as dateUtils from '@/utils/dateUtils';
dateUtils.formatDate(new Date());
```

---

## 环境配置

### .env 文件管理

```
# .env.example（提交到 Git）
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=10000

# .env（不提交，本地开发）
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=10000

# .env.production（生产环境）
VITE_API_BASE_URL=https://api.example.com
VITE_API_TIMEOUT=30000
```

**规则**：
- 🔴 MUST：创建 `.env.example` 记录所有环境变量
- 🔴 MUST：`.env` 文件加入 `.gitignore`
- 🟡 SHOULD：环境变量前缀统一（如 `VITE_`）

---

## 导入路径配置

### 推荐：使用路径别名

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

使用别名：

```tsx
// ✅ 好的导入路径
import { UserCard } from '@/components/UserCard';
import { formatDate } from '@/utils/dateUtils';
import type { User } from '@/types/user';

// ❌ 避免相对路径
import { UserCard } from '../../../components/UserCard';
```

