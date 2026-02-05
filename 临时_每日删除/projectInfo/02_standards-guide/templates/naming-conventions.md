# 命名规范

## 文件和文件夹

| 类型 | 规范 | 示例 |
|-----|------|------|
| React 组件文件 | PascalCase | `UserProfile.tsx` |
| 工具函数文件 | camelCase | `formatDate.ts` |
| 样式文件 | kebab-case | `header-styles.css` |
| 文件夹 | kebab-case | `user-profile/` |
| 常量文件 | UPPER_SNAKE_CASE 或 camelCase | `API_ENDPOINTS.ts` |

## 变量和常量

- **普通变量**: camelCase - `userName`
- **常量**: UPPER_SNAKE_CASE - `MAX_SIZE`
- **布尔值**: is/has/can 前缀 - `isLoading`, `hasError`
- **私有属性**: _ 前缀 - `_privateMethod`

## 函数命名

- **get/set 前缀**: 获取/设置数据 - `getUser()`, `setUser()`
- **handle 前缀**: 事件处理函数 - `handleClick()`, `handleSubmit()`
- **is/has/can**: 返回布尔值的函数 - `isValid()`, `hasPermission()`
- **fetch/load**: 获取远程数据 - `fetchUserData()`, `loadConfig()`
