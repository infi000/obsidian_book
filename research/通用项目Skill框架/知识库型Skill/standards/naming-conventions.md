# 命名规范

> 【需要你填写】项目的命名约定

## 文件命名

【填写】

### 组件文件

【填写】
```
【填写示例 1】React 组件
✅ Button.tsx / Button.jsx
✅ UserProfile.tsx
❌ button.tsx
❌ user_profile.tsx
❌ userprofile.tsx
```

**规则**:
- [ ] 组件文件用 **PascalCase**（大驼峰）
- [ ] 一个文件一个组件
- [ ] 文件名与组件名相同

### 普通文件和工具函数

【填写】
```
【填写示例】
✅ utils.ts
✅ formatDate.ts
✅ api-client.ts
❌ UtilsFunction.ts
❌ format-date.ts (如果是单个工具函数)
```

**规则**:
- [ ] 工具文件用 **camelCase**（小驼峰）
- [ ] 或 **kebab-case**（中划线）（【填写选择】）
- [ ] 避免过长的文件名

### 样式文件

【填写】
```
【填写示例】
✅ styles.css / styles.module.css
✅ Button.module.css
✅ button.css
❌ ButtonStyles.css
```

**规则**:
- [ ] 样式文件与组件文件同名（【填写是否这样做】）
- [ ] 使用 `.module.css` 表示 CSS Module
- [ ] 或 `.css` 表示全局样式

### 测试文件

【填写】
```
【填写示例】
✅ Button.test.ts
✅ Button.spec.ts
✅ __tests__/Button.ts
```

**规则**:
- [ ] 测试文件与源文件同名 + `.test` 或 `.spec`
- [ ] 或放在 `__tests__` 目录
- [ ] 【选择你项目的约定】

### 配置文件

【填写】
```
【填写示例】
✅ tsconfig.json
✅ webpack.config.js
✅ .env.local
```

**规则**:
- [ ] 配置文件使用 kebab-case 或全小写
- [ ] 环境变量文件：`.env`、`.env.local` 等

## 目录命名

【填写】

```
【填写示例】
✅ src/components/    (组件目录)
✅ src/pages/         (页面目录)
✅ src/utils/         (工具函数目录)
❌ src/Components/    (大写 C)
❌ src/utilities/     (过长)
```

**规则**:
- [ ] 目录名用 **kebab-case**（中划线，全小写）
- [ ] 或 **camelCase**（【填写选择】）
- [ ] 避免过长的目录名
- [ ] 目录名要清晰表达内容

## 变量命名

【填写】

### 常规变量

```javascript
【填写示例】
✅ const userName = 'John';
✅ const isActive = true;
✅ const userList = [];
❌ const user_name = 'John';
❌ const UserName = 'John';
❌ const u = 'John';
```

**规则**:
- [ ] 变量名用 **camelCase**（小驼峰）
- [ ] 布尔值变量用 `is`、`has`、`should` 等前缀
- [ ] 变量名要有意义，避免单个字母
- [ ] 集合变量用复数形式（`users` 而不是 `user`）

### 常量

```javascript
【填写示例】
✅ const MAX_RETRY_COUNT = 3;
✅ const API_BASE_URL = 'https://api.example.com';
❌ const maxRetryCount = 3;
❌ const max_retry_count = 3;
```

**规则**:
- [ ] 常量用 **UPPER_SNAKE_CASE**（全大写，下划线分隔）
- [ ] 或 **UPPER_CAMEL_CASE**（【填写选择】）
- [ ] 常量必须放在 `constants.ts` 或类似文件

### 私有变量

【填写】(如果有)
```javascript
【填写示例】
✅ #privateField
✅ _privateVariable
❌ private_variable
```

## 函数命名

【填写】

### 普通函数

```javascript
【填写示例】
✅ const getUserData = () => { };
✅ const calculateTotal = () => { };
✅ const formatDate = () => { };
❌ const get_user_data = () => { };
❌ const GetUserData = () => { };
```

**规则**:
- [ ] 函数名用 **camelCase**（小驼峰）
- [ ] 函数名通常是动词，表示函数做什么
- [ ] 避免过长的函数名

### 事件处理函数

```javascript
【填写示例】
✅ const handleClick = () => { };
✅ const onInputChange = () => { };
✅ const onSubmit = () => { };
❌ const click = () => { };
❌ const InputChange = () => { };
```

**规则**:
- [ ] React 组件中使用 `handle` 前缀：`handleClick`、`handleSubmit`
- [ ] 或使用 `on` 前缀：`onClick`、`onSubmit`
- [ ] 【填写你项目的约定】

### React Hook 和自定义 Hook

【填写】
```javascript
【填写示例】
✅ const useUserData = () => { };
✅ const useFetch = () => { };
❌ const UserDataHook = () => { };
❌ const fetchHook = () => { };
```

**规则**:
- [ ] 自定义 Hook 必须以 `use` 开头
- [ ] 后面跟 camelCase

### 工厂函数和构造函数

【填写】(如果有)
```javascript
【填写示例】
✅ const createUser = () => { };
✅ const makeRequest = () => { };
❌ const User = () => { };  // 这应该是类
```

## 类和接口命名

【填写】(如果使用 TypeScript 或 OOP)

### 类命名

```typescript
【填写示例】
✅ class UserManager { }
✅ class ApiClient { }
❌ class userManager { }
❌ class USER_MANAGER { }
```

**规则**:
- [ ] 类名用 **PascalCase**（大驼峰）
- [ ] 避免 `I` 前缀（如 `IUser`，在 TypeScript 中不推荐）

### 接口和类型命名

```typescript
【填写示例】
✅ interface User { }
✅ type UserProps = { };
✅ interface IRequest { }  // 【填写是否使用 I 前缀】
❌ interface user { }
❌ interface UserInterface { }
```

**规则**:
- [ ] 接口和类型用 **PascalCase**
- [ ] 【是否使用 `I` 前缀表示接口？】

## CSS/样式命名

【填写】

### Class 命名

【填写】选择：
- [ ] BEM 规范（`block__element--modifier`）
- [ ] SMACSS
- [ ] Tailwind（无需命名）
- [ ] CSS Modules（不需要担心命名冲突）

```css
【填写示例 - BEM】
.button { }
.button__text { }
.button--primary { }

【或填写示例 - SMACSS】
.btn { }
.btn-primary { }
.btn-disabled { }
```

### 变量命名

```css
【填写示例】
✅ --primary-color
✅ --spacing-base
❌ --primaryColor
❌ --primary_color
```

**规则**:
- [ ] CSS 变量用 **kebab-case**（中划线）
- [ ] 避免 camelCase

## 特殊命名规则

【填写】项目特有的命名约定：

- [ ] 【填写特殊约定 1】
- [ ] 【填写特殊约定 2】
- [ ] 【填写特殊约定 3】

---

**相关链接**：
- 代码规范 → [[code-standards|代码规范]]
- 文件结构 → [[file-structure|文件结构规范]]
