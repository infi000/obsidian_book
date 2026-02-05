# 文件结构规范
[[根据项目实际结构生成如下形式]]
形式和内容可以参考：[text](file-参考.md)
## 推荐的项目结构

```
src/
├── components/          # React 可复用组件
│   └── Button/
│       ├── Button.tsx
│       ├── Button.module.css
│       └── Button.test.tsx
│
├── pages/              # 页面组件（路由级别）
│   └── UserProfile/
│       ├── UserProfile.tsx
│       ├── hooks.useUserProfile.ts
│       └── api.ts
│
├── services/           # API 和数据服务
│   ├── api.ts
│   ├── auth.service.ts
│   └── storage.service.ts
│
├── hooks/              # 自定义 Hook
│   ├── useAuth.ts
│   ├── useFetch.ts
│   └── useLocalStorage.ts
│
├── utils/              # 工具函数
│   ├── date.ts
│   ├── format.ts
│   └── validation.ts
│
├── types/              # TypeScript 类型定义
│   ├── user.ts
│   ├── api.ts
│   └── global.ts
│
├── constants/          # 常量定义
│   ├── api.ts
│   ├── routes.ts
│   └── config.ts
│
├── styles/             # 全局样式
│   ├── variables.css
│   ├── reset.css
│   └── globals.css
│
└── App.tsx             # 根组件
```

## 新建文件时

- 在对应的文件夹中新建
- 遵循命名规范（见命名规范文件）
- 添加必要的类型定义（.ts 或 .tsx）
- 为公共组件添加注释说明
