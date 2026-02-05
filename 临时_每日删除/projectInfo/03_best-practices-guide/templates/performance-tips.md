# 性能优化建议

## React 性能优化

### 使用 useMemo 缓存计算结果

```typescript
// ❌ 低效：每次渲染都计算
const expensiveValue = expensiveCalculation(data)

// ✅ 优化：缓存计算结果
const expensiveValue = useMemo(
  () => expensiveCalculation(data),
  [data]
)
```

### 使用 useCallback 缓存函数

```typescript
// ❌ 低效：每次创建新函数
const handleClick = () => {
  doSomething()
}

// ✅ 优化：缓存函数引用
const handleClick = useCallback(() => {
  doSomething()
}, [])
```

### 使用 React.memo 缓存组件

```typescript
// ❌ 低效：父组件更新时重新渲染
export const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
)

// ✅ 优化：避免不必要的重新渲染
export const Button = React.memo(({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
))
```

### 代码分割和懒加载

```typescript
// 路由级别的代码分割
const HomePage = lazy(() => import('./pages/HomePage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))

// 组件级别的代码分割
const HeavyComponent = lazy(() => import('./components/HeavyComponent'))
```

## 网络优化

- **减少 bundle 大小** - 使用动态导入和代码分割
- **图片优化** - 使用 WebP 格式，压缩大图片
- **CDN 使用** - 静态资源存放在 CDN
- **请求合并** - 减少 HTTP 请求数量
- **缓存策略** - 利用浏览器缓存和服务器缓存

## 其他优化

- **虚拟滚动** - 列表超过 1000 项时使用虚拟滚动
- **防抖和节流** - 搜索、窗口resize 等事件
- **懒加载图片** - 离屏图片延迟加载
- **监测性能** - 使用 Performance API 监测性能指标
