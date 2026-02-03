# 新页面参考

> 这份文件是一个模板，帮助你快速生成新页面。

## 📋 新页面检查清单

在生成新页面前，检查：

- [ ] 这个页面应该放在哪个目录？（见 [[../standards/file-structure|文件结构规范]]）
- [ ] 文件名应该叫什么？（见 [[../standards/naming-conventions|命名规范]]）
- [ ] 使用什么组件框架或模式？（见 [[../best-practices/common-patterns|常见模式]]）
- [ ] 有没有类似的页面可以参考？

## 🎨 页面生成步骤

### 第 1 步：规划结构

```
新页面名称: 【填写】
功能: 【填写】
放置位置: src/pages/【填写】

目录结构（如果分成多个组件）:
src/pages/【PageName】/
├── index.tsx           # 页面入口
├── components/         # 页面特定的组件
│   ├── Header.tsx
│   └── Content.tsx
├── types.ts            # 类型定义
├── hooks.ts            # 自定义 Hook（如果有）
├── utils.ts            # 工具函数（如果有）
├── styles.module.css   # 样式（如果用 CSS Modules）
└── __tests__/          # 测试文件
    └── index.test.tsx
```

### 第 2 步：创建文件

```bash
# 创建目录（如果需要）
mkdir src/pages/【PageName】

# 创建文件
touch src/pages/【PageName】/index.tsx
```

### 第 3 步：编写页面

```typescript
【参考模板】

// 导入（按顺序）
import React, { useState, useEffect } from 'react';

// 导入本地库和工具
import { fetchData } from '@/services/api';
import { usePageData } from '@/hooks/usePageData';

// 导入组件
import Header from './components/Header';
import Content from './components/Content';

// 导入样式
import styles from './styles.module.css';

// 类型定义
interface PageData {
  title: string;
  content: string;
}

// 页面组件
const PageName: React.FC = () => {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 初始化逻辑
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchData();
      setData(result);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header title={data?.title} />
      {loading ? <div>Loading...</div> : <Content data={data} />}
    </div>
  );
};

export default PageName;
```

### 第 4 步：添加到路由

【填写】在哪里配置路由？

```typescript
【示例】
// src/router.ts 或 src/App.tsx
import PageName from '@/pages/PageName';

const routes = [
  {
    path: '/page-name',
    component: PageName
  }
];
```

### 第 5 步：编写样式

【填写】

```css
【示例 - CSS Modules】
/* PageName.module.css */

.container {
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  margin-bottom: 24px;
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}
```

### 第 6 步：添加测试

【填写】

```typescript
【示例】
import { render, screen } from '@testing-library/react';
import PageName from './index';

describe('PageName', () => {
  it('should render the page title', () => {
    render(<PageName />);
    expect(screen.getByText('Page Title')).toBeInTheDocument();
  });

  it('should load data on mount', () => {
    render(<PageName />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
```

## 📚 常见页面类型模板

### 列表页面

```typescript
// 显示数据列表、搜索、排序、分页
const ListPage = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  // 加载逻辑
  // 搜索逻辑
  // 分页逻辑

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} />
      <ItemList items={items} />
      <Pagination page={page} onChange={setPage} />
    </div>
  );
};
```

### 表单页面

```typescript
// 编辑或创建数据
const FormPage = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // 表单提交逻辑
  // 验证逻辑

  return (
    <form onSubmit={handleSubmit}>
      <FormField name="name" value={formData.name} onChange={handleChange} />
      {/* 更多字段 */}
      <button type="submit">Submit</button>
    </form>
  );
};
```

### 详情页面

```typescript
// 显示单个项目的详细信息
const DetailPage = ({ id }: { id: string }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetail(id);
  }, [id]);

  return (
    <div>
      {loading ? <Skeleton /> : <DetailContent data={data} />}
    </div>
  );
};
```

### 仪表板页面

```typescript
// 展示多个指标和图表
const DashboardPage = () => {
  const [metrics, setMetrics] = useState({});

  return (
    <div>
      <StatCard label="Total Users" value={metrics.users} />
      <Chart data={metrics.data} />
      <RecentActivity items={metrics.recent} />
    </div>
  );
};
```

## 🔗 参考资源

- 代码规范 → [[../standards/code-standards|代码规范]]
- 命名规范 → [[../standards/naming-conventions|命名规范]]
- 文件结构 → [[../standards/file-structure|文件结构规范]]
- 常见模式 → [[../best-practices/common-patterns|常见模式]]
- 性能优化 → [[../best-practices/performance-tips|性能优化]]

## ❓ 常见问题

**Q: 页面应该多大？**
A: 尽量保持在 300-500 行以内，如果超过了，考虑拆分成多个组件。

**Q: 如何组织组件？**
A: 见 [[../standards/file-structure|文件结构规范]]。

**Q: 如何处理数据获取？**
A: 见 [[../best-practices/common-patterns|常见模式]]。

---

**提示**: 完成新页面后，别忘了：
- [ ] 遵循代码规范
- [ ] 编写测试
- [ ] 更新路由
- [ ] 提交 PR 进行 Code Review
