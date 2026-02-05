# 新页面模板

快速生成新页面的完整步骤和模板。

## 页面类型

项目中有不同类型的页面：

| 类型 | 用途 | 例子 |
|-----|------|------|
| **列表页** | 展示数据列表 | 用户列表、订单列表 |
| **详情页** | 展示单个项目详情 | 用户详情、订单详情 |
| **表单页** | 新增/编辑数据 | 创建用户、编辑订单 |
| **首页** | 仪表板或欢迎页 | 首页、个人中心 |

## 快速生成步骤

### 1. 新建文件夹

```bash
# 在 src/pages 下创建新文件夹
mkdir src/pages/YourPageName
```

### 2. 创建基础文件

```bash
touch src/pages/YourPageName/YourPageName.tsx
touch src/pages/YourPageName/YourPageName.module.css
touch src/pages/YourPageName/types.ts
touch src/pages/YourPageName/hooks.ts
touch src/pages/YourPageName/api.ts
```

### 3. 编写代码

详细代码示例，查看 [[../../05_code-examples-guide/GUIDE|代码示例]]

## 页面文件结构

```
src/pages/UserProfile/
├── UserProfile.tsx           # 主组件（必须）
├── UserProfile.module.css    # 样式
├── types.ts                  # TypeScript 类型定义
├── hooks.ts                  # 自定义 Hook
├── api.ts                    # API 调用
└── __tests__/                # 测试（可选）
    └── UserProfile.test.tsx
```

## 模板代码

见 [[../../05_code-examples-guide/GUIDE#standard-pages|标准页面模板]]

## 常见问题

### Q: 页面用 .tsx 还是 .ts？
A: 组件文件用 .tsx，其他文件用 .ts

### Q: 样式用 CSS 还是 CSS Modules？
A: 页面级样式用 CSS Modules，全局样式用 CSS

### Q: API 调用写在哪里？
A: 写在 `api.ts`，在 Hook 中调用
