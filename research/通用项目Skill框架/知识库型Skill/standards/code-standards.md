# 代码规范

> 【需要你填写】项目的编码规范

## 变量声明

【填写】

### 变量关键字

```javascript
【填写示例】
// ✅ 推荐
const name = 'John';
let count = 0;

// ❌ 不推荐
var name = 'John';
```

**规则**:
- [ ] 优先使用 `const`，除非需要重新赋值
- [ ] 需要重新赋值时用 `let`
- [ ] 禁止使用 `var`

### 变量命名

见 [[naming-conventions|命名规范]]。

## 函数编写

【填写】

### 函数声明

```javascript
【填写示例】
// ✅ 推荐
const handleClick = () => {
  // ...
};

// ❌ 不推荐
function handleClick() {
  // ...
}
```

**规则**:
- [ ] 优先使用箭头函数
- [ ] 避免在条件中声明函数

### 函数参数

【填写】

```javascript
【填写示例】
// ✅ 推荐
const getData = ({ id, name }) => {
  // ...
};

// ❌ 不推荐
const getData = (obj) => {
  const id = obj.id;
  const name = obj.name;
};
```

## 对象和数组

【填写】

### 对象操作

```javascript
【填写示例】
// ✅ 推荐 - 使用展开运算符
const updated = { ...obj, newKey: value };

// ❌ 不推荐 - 直接修改
obj.newKey = value;
```

### 数组操作

```javascript
【填写示例】
// ✅ 推荐 - 使用数组方法
const filtered = array.filter(item => item.active);
const mapped = array.map(item => item.name);

// ❌ 不推荐 - 使用 for 循环
for (let i = 0; i < array.length; i++) {
  // ...
}
```

## 类型定义

【填写】

### TypeScript 要求

【填写】是否必须使用 TypeScript？
- [ ] 所有文件必须是 `.ts` 或 `.tsx`
- [ ] 可以混用 `.js` 和 `.ts`
- [ ] 不要求使用 TypeScript

### 类型标注

```typescript
【填写示例】
// ✅ 推荐
interface User {
  id: number;
  name: string;
  email?: string;
}

const user: User = { id: 1, name: 'John' };

// ❌ 不推荐
const user: any = { id: 1, name: 'John' };
```

**规则**:
- [ ] 禁止使用 `any`
- [ ] 为所有函数参数和返回值标注类型
- [ ] 复杂对象必须定义 `interface` 或 `type`

## 注释规范

【填写】

### 代码注释

```javascript
【填写示例】
// ✅ 推荐 - 解释为什么，而不是做什么
// 使用 debounce 避免频繁请求
const handleSearch = debounce((query) => {
  // ...
}, 300);

// ❌ 不推荐 - 注释重复代码
// 将 name 赋值给 userName
const userName = name;
```

### 函数注释

```javascript
【填写示例】
// ✅ 推荐 - 使用 JSDoc
/**
 * 计算两个数的和
 * @param {number} a - 第一个数
 * @param {number} b - 第二个数
 * @returns {number} 两数之和
 */
const add = (a: number, b: number): number => a + b;
```

**规则**:
- [ ] 复杂函数必须有 JSDoc 注释
- [ ] 特殊的业务逻辑必须有解释注释
- [ ] 避免冗余注释（注释不要重复代码）

## 代码格式

【填写】

### 缩进和空格

【填写】
- 使用【填写 2 空格 / 4 空格 / tabs】缩进
- 一行最多【填写 80 / 100 / 120】个字符
- 【其他格式要求】

### 括号和分号

【填写】
- [ ] 必须以分号结尾
- [ ] 推荐使用分号
- [ ] 可以不用分号（自动插入）

### 其他规则

【填写】
- [ ] 禁止使用 console.log（使用 logger）
- [ ] 禁止注释掉代码（应该删除或使用 version control）
- [ ] 禁止使用 debugger
- [ ] 禁止使用 alert

## 导入和导出

【填写】

### ESM vs CommonJS

【填写】选择：
- [ ] 只用 ESM (import / export)
- [ ] 只用 CommonJS (require / module.exports)
- [ ] 混用（不推荐）

### 导入顺序

```javascript
【填写示例】
// ✅ 推荐的导入顺序
// 1. 外部库
import React from 'react';
import { useEffect } from 'react';

// 2. 内部库和工具
import { API } from '@/services';
import { formatDate } from '@/utils';

// 3. 组件和常量
import Button from '@/components/Button';
import { COLORS } from '@/constants';

// 4. 样式
import styles from './styles.module.css';
```

## 错误处理

【填写】

### 处理 Promise

```javascript
【填写示例】
// ✅ 推荐 - 使用 async/await
try {
  const data = await fetch(url);
  console.log(data);
} catch (error) {
  console.error('Error:', error);
}

// ❌ 不推荐 - 使用 .then().catch()
fetch(url)
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### 异常处理

【填写】
- [ ] 必须处理所有可能的 error
- [ ] 不能使用空的 catch 块
- [ ] 必须有合理的 fallback

## 禁止事项

【填写】列出绝对禁止的做法：

- [ ] 【填写禁止项 1】
- [ ] 【填写禁止项 2】
- [ ] 【填写禁止项 3】

---

**相关链接**：
- 命名规范 → [[naming-conventions|命名规范]]
- Code Review 检查清单 → [[../../工作流型Skill/standards/code-quality-checklist|代码质量清单]]
