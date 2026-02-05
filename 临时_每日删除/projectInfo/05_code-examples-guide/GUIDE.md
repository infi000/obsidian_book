# 维度五：代码示例 (Code Examples)

这是知识库的**第五维度**，包含可以直接复制使用的标准页面、功能模块和组件模式代码。

这个维度包含多个文件，每个文件都是一个完整的代码示例。需要持续更新维护。

## 📋 这个维度包含的内容

| 文件夹 | 用途 | 内容 |
|-------|------|------|
| **overview.md** | 代码示例导航 | 所有示例的索引 |
| **standard-pages/** | 标准页面模板 | 列表页、详情页、表单页等 |
| **functional-modules/** | 功能模块 | 分页、模态框、表单验证等 |
| **component-patterns/** | 组件模式 | 自定义 Hook、Context 等 |

## 🎯 这个维度的作用

- **快速开发** - 复制模板代码，快速创建新功能
- **统一风格** - 所有代码都遵循相同的模式
- **学习参考** - 新成员通过示例学习最佳实践
- **减少 bug** - 使用经过验证的代码模式

## 📝 如何编写

### overview.md - 代码示例导航
代码示例导航，格式和内容遵守::`./templates/overview.md`

### standard-pages/overview.md - 标准页面模板总览

```markdown
# 标准页面模板总览

常见页面类型的完整实现示例。

## 页面类型分类

### 1. 列表页 (List Page)

**用途**：展示数据列表，支持分页、搜索、排序

**主要组件**：
- 搜索栏 (SearchBar)
- 表格 (Table)
- 分页器 (Pagination)
- 操作栏 (Actions)

**核心功能**：
- ✅ 数据加载和展示
- ✅ 搜索、排序、筛选
- ✅ 分页
- ✅ 批量操作（删除、导出等）
- ✅ 加载和错误状态

### 2. 详情页 (Detail Page)

**用途**：展示单个项目的详细信息

**主要组件**：
- 标题和返回按钮
- 信息区块
- 操作按钮（编辑、删除等）
- 相关项目列表（可选）

**核心功能**：
- ✅ 加载并展示数据
- ✅ 操作按钮和对应功能
- ✅ 错误处理
- ✅ 加载状态

### 3. 表单页 (Form Page)

**用途**：创建或编辑数据

**主要组件**：
- 表单字段
- 验证提示
- 提交和取消按钮

**核心功能**：
- ✅ 表单字段验证
- ✅ 表单提交
- ✅ 错误提示
- ✅ 加载状态和提交结果

## 快速选择

**我要做什么？**

- 创建**用户列表页** → 查看 [[list-page|列表页示例]]
- 创建**用户详情页** → 查看 [[detail-page|详情页示例]]
- 创建**编辑用户表单** → 查看 [[form-page|表单页示例]]
- 创建**个人档案页** → 查看 [[user-profile|用户档案示例]]

## 页面结构规范

所有页面都遵循以下结构：

```
src/pages/PageName/
├── PageName.tsx              # 主组件
├── PageName.module.css       # 样式
├── types.ts                  # 类型定义
├── hooks.usePageName.ts      # 自定义 Hook（如果有复杂逻辑）
├── api.ts                    # API 调用
└── __tests__/PageName.test.tsx   # 测试
```

## 代码模板使用流程

1. **选择页面类型** - 根据功能需求
2. **复制文件结构** - 创建相同的文件夹和文件
3. **复制代码** - 从示例中复制代码
4. **修改变量名** - 根据实际功能修改
5. **测试** - 本地测试是否正常

## 常见问题

### Q: 是否必须按照这个结构？
A: 是的，保证项目的一致性和可维护性

### Q: 代码可以修改吗？
A: 可以，示例只是参考，根据实际需求修改

### Q: 如何复用代码？
A: 不要复制粘贴，抽象成可复用的组件和 Hook
```

### standard-pages/list-page.md 示例结构

这类文件会包含完整的代码示例。格式如下：

```markdown
# 列表页示例

## 页面说明

这是一个完整的列表页实现，包含搜索、排序、分页等功能。

## 文件结构

```
src/pages/UserList/
├── UserList.tsx
├── UserList.module.css
├── types.ts
├── hooks.useUserList.ts
├── api.ts
└── __tests__/UserList.test.tsx
```

## 完整代码

### UserList.tsx

```typescript
import React, { useState } from 'react'
import { useUserList } from './hooks.useUserList'
import styles from './UserList.module.css'

export const UserList: React.FC = () => {
  const { users, loading, error, search, page, setPage } = useUserList()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    search(query)
  }

  if (loading) return <div className={styles.loading}>加载中...</div>
  if (error) return <div className={styles.error}>错误: {error}</div>

  return (
    <div className={styles.container}>
      <h1>用户列表</h1>

      <input
        type="text"
        placeholder="搜索用户..."
        onChange={(e) => handleSearch(e.target.value)}
        className={styles.searchInput}
      />

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
            <th>邮箱</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button>编辑</button>
                <button>删除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button onClick={() => setPage(page - 1)}>上一页</button>
        <span>第 {page} 页</span>
        <button onClick={() => setPage(page + 1)}>下一页</button>
      </div>
    </div>
  )
}
```

### 其他文件代码...
[包含 types.ts, hooks.ts, api.ts 等完整代码]

## 关键要点

- ✅ 分离关注：UI、逻辑、API 分开
- ✅ 加载和错误状态
- ✅ 搜索和排序功能
- ✅ 分页处理

## 修改指南

修改以下部分以适应你的项目：

1. **变量名** - user → yourEntity
2. **API 端点** - /api/users → /api/yourEntities
3. **字段列表** - 根据实际数据修改表格列
4. **样式** - 自定义样式以符合设计
```

### functional-modules/overview.md - 功能模块总览

```markdown
# 功能模块代码

项目中常用功能的实现代码和最佳实践。

## 模块列表

### 分页功能

**用途**：列表数据分页

**文件**：[[pagination|pagination.md]]

### 模态框

**用途**：弹窗/对话框

**文件**：[[modal-dialog|modal-dialog.md]]

### 表单验证

**用途**：客户端表单验证

**文件**：[[form-validation|form-validation.md]]

### API 服务

**用途**：统一管理 API 调用

**文件**：[[api-service|api-service.md]]

## 如何使用

1. 找到你需要的功能模块
2. 阅读说明和完整代码
3. 复制到你的项目
4. 修改变量名和配置
5. 集成到你的页面或组件中
```

### component-patterns/overview.md - 组件模式总览

```markdown
# 组件模式

React 组件设计的常见模式和最佳实践。

## 模式列表

### 自定义 Hook

**用途**：复用组件逻辑

**文件**：[[custom-hook|custom-hook.md]]

**例子**：useAuth, useFetch, useLocalStorage

### Provider/Consumer 模式

**用途**：跨层级传递数据

**文件**：[[context-provider|context-provider.md]]

**例子**：UserContext, ThemeContext

### 组件组合

**用途**：灵活组合多个组件

**文件**：[[composition|composition-pattern.md]]

**例子**：Card + CardHeader + CardBody

## 快速选择

- 需要复用逻辑 → [[custom-hook|自定义 Hook]]
- 需要全局状态 → [[context-provider|Context Provider]]
- 需要灵活组合 → [[composition|组件组合]]
```

## ✅ 检查清单

创建这个维度的文档时，确保：

- [ ] **overview.md** 包含所有代码示例的导航
- [ ] **standard-pages/** 包含 4+ 种常见页面模板
- [ ] **functional-modules/** 包含 4+ 种常用功能
- [ ] **component-patterns/** 包含 3+ 种常见模式
- [ ] 所有代码都有注释说明
- [ ] 代码示例都是可以直接运行的
- [ ] 包含文件结构图和创建步骤
- [ ] 代码遵循 [[../02_standards-guide/GUIDE|开发规范]]

## 📚 相关资源

- 前往 [[../02_standards-guide/GUIDE|开发规范]] - 了解编码标准
- 前往 [[../04_guides-guide/GUIDE|开发指南]] - 新建页面步骤
- 前往 [[../03_best-practices-guide/GUIDE|最佳实践]] - 学习设计模式
- 前往 [[../SKILL|主导航]] - 返回知识库首页
