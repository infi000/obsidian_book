# 常见问题 (FAQ)

## 开发相关

### Q: 什么时候应该使用 `any` 类型？

**A:** 尽量避免使用 `any`。如果必须使用，应该：

```typescript
// ❌ 不好：广泛使用 any
const processData = (data: any): any => {
  return data.value;
};

// ✅ 好的：使用具体类型或泛型
const processData = <T extends { value: unknown }>(data: T): T['value'] => {
  return data.value;
};

// ✅ 如果必须使用 any，应该加注释说明原因
// @ts-expect-error - 三方库类型定义不完整
const response = externalLib.process(data) as any;
```

**规则**：
- 🔴 MUST：禁止无理由地使用 `any`
- 🔴 MUST：使用 `any` 时必须加注释说明原因
- 🟡 SHOULD：优先使用 `unknown` 或泛型

---

### Q: 什么时候应该拆分组件？

**A:** 当出现以下情况时，考虑拆分：

```
✅ 拆分时机：
- 单个文件超过 300 行
- 单个函数超过 50 行
- 组件做了多个不相关的事情
- 组件被多个地方复用
- 渲染逻辑复杂（深度嵌套）

❌ 不用拆分：
- 只是为了"模块化"而拆分
- 拆分后相互依赖很强
- 只在一个地方使用的小组件
```

---

### Q: 什么时候使用 Context vs Redux？

**A:**

| 场景 | 推荐 | 理由 |
|------|------|------|
| **全局主题** | Context | 数据量小，变化频率低 |
| **用户登录状态** | Redux | 需要中间件，调试工具 |
| **表单状态** | 本地 State | 数据只在单个页面使用 |
| **复杂数据流** | Redux | 需要追踪状态变化 |
| **简单全局状态** | Context | 够用且简单 |

```typescript
// 简单场景：用 Context
const ThemeContext = createContext<'light' | 'dark'>('light');

// 复杂场景：用 Redux
// dispatch({ type: 'SET_USER', payload: user })
// subscribe(() => console.log(getState()))
```

---

### Q: 如何处理 API 错误？

**A:** 建立统一的错误处理机制

```typescript
// 定义错误类型
class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string
  ) {
    super(message);
  }
}

// 使用
try {
  const user = await fetchUser(id);
} catch (error) {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      // 处理认证错误
      redirectToLogin();
    } else if (error.status === 404) {
      // 处理未找到
      showNotFound();
    }
  }
}
```

**规则**：
- 🔴 MUST：定义自己的 Error 类
- 🟡 SHOULD：区分不同的错误类型
- 🟡 SHOULD：给用户友好的错误提示

---

## 性能相关

### Q: 如何检查性能瓶颈？

**A:** 使用 React DevTools Profiler

```bash
# 1. 安装 React DevTools 浏览器扩展
# 2. 打开 DevTools → Profiler 标签
# 3. 点击红色录制按钮
# 4. 与应用交互
# 5. 停止录制，查看性能数据

关键指标：
- Render time：组件渲染时间
- Component count：渲染的组件数量
- Flamegraph：调用堆栈可视化
```

### Q: 什么时候使用虚拟化？

**A:** 当列表项很多时

```typescript
// 性能问题示例：渲染 10000 项
const LargeList = ({ items }: { items: Item[] }) => {
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

// 解决方案：使用虚拟化库（如 react-window）
import { FixedSizeList } from 'react-window';

const VirtualizedList = ({ items }: { items: Item[] }) => {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>{items[index].name}</div>
      )}
    </FixedSizeList>
  );
};
```

**规则**：
- 🟡 SHOULD：超过 100 项时考虑虚拟化
- 🟡 SHOULD：使用库如 `react-window` 或 `react-virtualized`

---

## 测试相关

### Q: 应该测试什么？

**A:** 遵循测试金字塔

```
        /\          E2E 测试（5%）
       /  \         真实场景，但慢且昂贵
      /____\
     /      \       集成测试（15%）
    /        \      多个单元的配合
   /_________ \
  /            \    单元测试（80%）
 /              \   最快最便宜
/______________\

关键：大量单元测试，少量集成测试，少量 E2E 测试
```

### Q: 什么值得测试？

**A:**

```typescript
// ✅ 值得测试
- 业务逻辑（计算、验证）
- 错误处理
- 边界情况（空值、极值）

// ❌ 不需要测试
- 组件渲染（太微观）
- 第三方库
- CSS 样式

// 示例：值得测试的业务逻辑
const calculateDiscount = (price: number, discountRate: number): number => {
  if (price < 0) throw new Error('Invalid price');
  if (discountRate < 0 || discountRate > 1) throw new Error('Invalid rate');
  return price * (1 - discountRate);
};

// 测试
test('should calculate discount correctly', () => {
  expect(calculateDiscount(100, 0.2)).toBe(80);
  expect(calculateDiscount(0, 0.2)).toBe(0);
});

test('should throw on invalid inputs', () => {
  expect(() => calculateDiscount(-100, 0.2)).toThrow();
  expect(() => calculateDiscount(100, 1.5)).toThrow();
});
```

