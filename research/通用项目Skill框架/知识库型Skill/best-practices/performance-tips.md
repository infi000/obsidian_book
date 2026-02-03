# 性能优化建议

> 【需要你填写】项目中的性能优化最佳实践

## 加载性能

【填写】

### 代码分割 (Code Splitting)

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 使用动态导入
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
</Suspense>
```

**规则**:
- [ ] 为大型页面使用代码分割
- [ ] 为第三方库使用代码分割
- [ ] 【填写你项目的做法】

### 包体积优化

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 只导入需要的部分
import { debounce } from 'lodash-es';

// ❌ 不推荐 - 导入整个库
import lodash from 'lodash';
const debounce = lodash.debounce;
```

**检查清单**:
- [ ] 使用 `npm list` 检查包的大小
- [ ] 移除未使用的依赖
- [ ] 使用按需导入（tree-shaking）
- [ ] 【填写你项目的做法】

### 图片优化

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 使用 webp 格式和懒加载
<img
  src="image.webp"
  alt="description"
  loading="lazy"
  width={400}
  height={300}
/>

// ✅ 推荐 - 使用响应式图片
<picture>
  <source srcSet="image-small.jpg 480w, image-large.jpg 1024w" />
  <img src="image.jpg" alt="description" />
</picture>
```

**规则**:
- [ ] 使用现代图片格式（WebP）
- [ ] 为大图片使用懒加载
- [ ] 压缩图片
- [ ] 【填写你项目的做法】

## 运行时性能

【填写】

### 减少重新渲染

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 使用 React.memo
export const ExpensiveComponent = React.memo(({ data }) => (
  <div>{data.name}</div>
));

// ✅ 推荐 - 使用 useMemo
const memoized = useMemo(() => {
  return complexCalculation(data);
}, [data]);

// ❌ 不推荐 - 在每次渲染时创建新对象
const style = { color: 'red' };  // 每次都创建新对象
```

**检查清单**:
- [ ] 使用 `React.memo` 包装不经常改变的组件
- [ ] 使用 `useMemo` 缓存昂贵的计算
- [ ] 使用 `useCallback` 缓存函数引用
- [ ] 避免在 JSX 中创建新对象
- [ ] 【填写你项目的做法】

### 长列表优化

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 虚拟滚动
import { FixedSizeList as List } from 'react-window';

const LargeList = ({ items }) => (
  <List
    height={600}
    itemCount={items.length}
    itemSize={35}
    width="100%"
  >
    {({ index, style }) => (
      <div style={style}>{items[index].name}</div>
    )}
  </List>
);

// ✅ 推荐 - 分页加载
const [page, setPage] = useState(1);
const items = loadItems(page);
```

**检查清单**:
- [ ] 对于大列表（>100 项）使用虚拟滚动
- [ ] 或使用分页/无限滚动
- [ ] 【填写你项目的做法】

### DOM 操作优化

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 批量 DOM 更新
const fragment = document.createDocumentFragment();
items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item.name;
  fragment.appendChild(li);
});
document.getElementById('list').appendChild(fragment);

// ✅ 推荐 - 使用 React 而不是直接操作 DOM
const [items, setItems] = useState([]);
```

## 网络性能

【填写】

### API 请求优化

【填写】

```javascript
【填写示例】
// ✅ 推荐 - 请求去重
const cache = new Map();
const fetchData = async (url) => {
  if (cache.has(url)) return cache.get(url);
  const data = await fetch(url);
  cache.set(url, data);
  return data;
};

// ✅ 推荐 - 批量请求
const data = await Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
]);
```

**检查清单**:
- [ ] 实现请求缓存
- [ ] 避免重复请求
- [ ] 使用【填写库名】管理 API 请求
- [ ] 【填写你项目的做法】

### 资源预加载

【填写】

```html
【填写示例】
<!-- 预加载关键资源 -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>

<!-- 预连接到第三方域名 -->
<link rel="preconnect" href="https://cdn.example.com">

<!-- DNS 预解析 -->
<link rel="dns-prefetch" href="https://analytics.example.com">
```

## 监控和调试

【填写】

### 性能监控

【填写】项目使用什么工具监控性能：

```javascript
【填写示例】
// ✅ 推荐 - 使用 Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);  // Cumulative Layout Shift
getFID(console.log);  // First Input Delay
getFCP(console.log);  // First Contentful Paint
getLCP(console.log);  // Largest Contentful Paint
getTTFB(console.log); // Time to First Byte
```

**工具**:
- [ ] 使用【填写工具名】监控性能
- [ ] 【填写你项目的做法】

### 性能调试

【填写】

```javascript
【填写示例】
// Chrome DevTools 性能分析
// 1. 打开 DevTools
// 2. Performance 标签
// 3. 点击录制
// 4. 进行操作
// 5. 停止录制，分析结果
```

## 性能检查清单

【填写】在 Code Review 时检查以下项：

- [ ] 代码分割是否合理？
- [ ] 是否有不必要的重新渲染？
- [ ] 大列表是否使用了虚拟滚动？
- [ ] 是否有请求去重和缓存？
- [ ] 图片是否进行了优化？
- [ ] 【填写其他检查项】

---

**相关链接**：
- 常见模式 → [[common-patterns|常见模式]]
- 安全检查 → [[security-checklist|安全检查]]
- Code Review Skill → [[../../工作流型Skill/SKILL|代码审查]]
