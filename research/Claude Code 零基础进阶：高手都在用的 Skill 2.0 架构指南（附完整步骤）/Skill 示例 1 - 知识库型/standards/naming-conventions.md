# 命名规范

## 文件和文件夹命名

### 📁 文件夹命名

```
src/
├── components/          ✅ 组件目录
├── pages/              ✅ 页面目录
├── hooks/              ✅ 自定义 Hooks
├── utils/              ✅ 工具函数
├── services/           ✅ API 服务
├── types/              ✅ TypeScript 类型定义
├── constants/          ✅ 常量定义
└── styles/             ✅ 全局样式
```

**规则**：
- 🔴 MUST：文件夹使用 **小写 + 复数**（如 `components`, `utils`）
- 🔴 MUST：不要使用大驼峰（如 ❌ `Components`）
- 🟡 SHOULD：文件夹名称清晰且通用

### 📄 文件命名

```
src/components/
├── Button.tsx          ✅ React 组件：PascalCase
├── user-avatar.tsx     ❌ 应该是 UserAvatar.tsx
├── useAuth.ts          ✅ Hooks：useXxx 格式
├── api.ts              ✅ 普通文件：camelCase 或 kebab-case
├── constants.ts        ✅ 常量文件
├── types.ts            ✅ 类型定义文件
└── user.test.ts        ✅ 测试文件：.test 或 .spec
```

**规则**：
- 🔴 MUST：React 组件文件使用 **PascalCase**（`UserCard.tsx`）
- 🔴 MUST：Hooks 文件使用 **useXxx** 格式（`useAuth.ts`）
- 🟡 SHOULD：其他文件使用 **camelCase** 或 **kebab-case**
- 🔴 MUST：测试文件后缀 `.test.ts` 或 `.spec.ts`

---

## 变量命名

### 常见场景

```typescript
// ✅ 布尔值：is/has/can 前缀
const isLoading = false;
const hasError = false;
const canEdit = true;

// ✅ 数组：复数名词
const users: User[] = [];
const items: Item[] = [];

// ✅ 回调函数：handle/on 前缀
const handleClick = () => {};
const onUserUpdate = (user: User) => {};

// ✅ 状态相关：通用名词
const userList = [];
const currentUser = null;
const selectedIds: string[] = [];

// ❌ 不好的命名
const data = []; // 太模糊
const temp = {}; // 太模糊
const x = 10; // 无意义
const obj1, obj2; // 无区别
```

### 命名规则表

| 用途 | 前缀/后缀 | 示例 | 说明 |
|-----|---------|------|------|
| 布尔值 | is/has/can | `isActive` | 表示状态 |
| 事件处理 | handle/on | `handleSubmit` | 处理函数 |
| 数组/集合 | 复数或 List | `users`, `userList` | 表示多个 |
| 常量 | UPPER_SNAKE | `MAX_SIZE` | 全大写下划线 |
| 私有属性 | 前缀 `_` | `_cache` | 仅类内使用 |

---

## 组件命名

### React 组件

```tsx
// ❌ 不好的命名
const user = () => {
  return <div>User</div>;
};

const UserCard = () => {
  return <div>User Card</div>;
};

// ✅ 好的命名
const UserCard = () => {
  return <div>User Card</div>;
};

const UserProfileHeader = () => {
  return <div>User Profile Header</div>;
};

// ✅ 根据功能分类
const UserCardContainer = () => {}; // 容器组件
const UserCardPresentation = () => {}; // 展示组件
const useUserData = () => {}; // 自定义 Hook
```

**规则**：
- 🔴 MUST：组件名使用 **PascalCase** 且通常是 **名词 + 修饰词**
- 🟡 SHOULD：复杂组件可以用 `Container` 和 `Presentation` 后缀区分
- 🟡 SHOULD：使用 `use` 前缀命名自定义 Hooks

### API/Service 命名

```typescript
// ✅ 使用动词 + 名词
const getUserById = async (id: string) => {};
const createUser = async (data: UserInput) => {};
const updateUser = async (id: string, data: UserInput) => {};
const deleteUser = async (id: string) => {};

// ✅ 通用的 CRUD 模式
class UserService {
  async fetch(id: string) {} // 获取
  async create(data: UserInput) {} // 创建
  async update(id: string, data: UserInput) {} // 更新
  async delete(id: string) {} // 删除
  async list(filters?: FilterParams) {} // 列表
}
```

**规则**：
- 🔴 MUST：API 函数使用 **动词 + 名词** 格式
- 🟡 SHOULD：遵循 CRUD 规范：fetch/get, create, update, delete, list
- 🟡 SHOULD：Service 类使用动词方法名

---

## 类型/接口命名

```typescript
// ✅ 接口和类型使用 PascalCase
interface UserProps {
  id: string;
  name: string;
}

type UserId = string & { readonly brand: 'UserId' };

// ✅ 类型工具函数：前缀 Omit/Pick/Partial 等
type UserWithoutPassword = Omit<User, 'password'>;
type ReadonlyUser = Readonly<User>;

// ✅ 回调类型：Callback 后缀
type OnClickCallback = (event: React.MouseEvent) => void;
type OnDataChangeCallback = (data: Data) => void;
```

**规则**：
- 🔴 MUST：Interface 和 Type 使用 **PascalCase**
- 🟡 SHOULD：类型名称清晰表达其用途
- 🟡 SHOULD：复杂类型使用 TypeScript 工具类型

