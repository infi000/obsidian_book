# Step 3: 检查质量、安全和性能

Code Review 的第三步是**检查代码质量、安全隐患和性能问题**。

⏱️ **预期时间：15 分钟**

## 🎯 目标

在这一步，你需要检查：
- ✅ 代码逻辑是否正确，有没有 bug？
- ✅ 有没有安全隐患？
- ✅ 有没有性能问题？
- ✅ 代码会影响其他功能吗？

## 📋 检查清单

### 1. 代码质量 (Code Quality)

参考：[[../standards/code-quality-checklist|代码质量清单]]

【核心问题】

- [ ] **逻辑是否正确？** 是否有明显的 bug？
  ```javascript
  ❌ if (user.age > 18 && user.age < 18) { }  // 永远不会执行
  ✅ if (user.age >= 18) { }
  ```

- [ ] **边界情况处理？** 空值、边界条件？
  ```javascript
  ❌ items[0].name  // 如果 items 是空会崩溃
  ✅ items?.[0]?.name ?? 'Unknown'
  ```

- [ ] **异常处理？** 是否有 try-catch？
  ```javascript
  ❌ const data = await fetch(url);  // 如果失败会崩溃
  ✅ try {
       const data = await fetch(url);
     } catch (error) {
       logger.error('Failed to fetch:', error);
     }
  ```

- [ ] **复杂度？** 函数是否过于复杂？（>50 行应该考虑拆分）

- [ ] **重复代码？** 有没有相同的逻辑重复了？

### 2. 安全问题 (Security)

参考：[[../standards/security-checklist|安全清单]]

【关键检查】

- [ ] **用户输入处理？** 是否验证和清理了输入？
  ```javascript
  ❌ <div dangerouslySetInnerHTML={{ __html: userInput }} />
  ✅ <div>{userInput}</div>  // React 自动转义
  ```

- [ ] **敏感信息？** 有没有泄露密码、token、密钥？
  ```javascript
  ❌ logger.info(`Password: ${password}`);
  ✅ logger.info(`User login successful`);
  ```

- [ ] **认证/授权？** 是否检查了用户权限？
  ```javascript
  ❌ // 前端隐藏按钮，后端没检查
  ✅ // 后端验证用户权限
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  ```

- [ ] **SQL/数据库？** 是否使用参数化查询？
  ```javascript
  ❌ db.query(`SELECT * FROM users WHERE id = ${id}`);
  ✅ db.query('SELECT * FROM users WHERE id = ?', [id]);
  ```

- [ ] **依赖安全？** 新的依赖是否可信？是否有漏洞？

### 3. 性能问题 (Performance)

参考：[[../../知识库型Skill/best-practices/performance-tips|性能优化]]

【常见问题】

- [ ] **不必要的重新渲染？** 组件是否频繁重新渲染？
  ```javascript
  ❌ 在 JSX 中创建新数组/对象
  const filtered = items.filter(...);  // 每次都创建新数组

  ✅ 使用 useMemo
  const filtered = useMemo(() => items.filter(...), [items]);
  ```

- [ ] **大列表性能？** 是否处理了大列表？
  ```javascript
  ❌ 直接渲染 1000 个元素
  ✅ 使用虚拟滚动或分页
  ```

- [ ] **API 请求？** 是否有不必要的重复请求？
  ```javascript
  ❌ 在 JSX 中进行 fetch（会无限循环）
  ✅ 在 useEffect 中进行 fetch
  ```

- [ ] **依赖大小？** 是否添加了很重的依赖？

- [ ] **循环和算法？** 时间复杂度是否合理？

### 4. 功能影响分析

【需要问的问题】

- [ ] 这个改动会影响现有功能吗？
- [ ] 有没有破坏向后兼容性？
- [ ] 数据库结构改动了吗？（需要 migration）
- [ ] API 签名改变了吗？（需要更新客户端）
- [ ] 会影响其他团队吗？

**示例**：
```javascript
// ❌ 可能有问题的改动
// 改变了 API 返回格式
// 之前：{ name: 'John' }
// 现在：{ firstName: 'John', lastName: 'Doe' }
// 这会破坏所有使用这个 API 的地方！

// ✅ 更安全的改动
// 添加新字段，保留旧字段
{
  name: 'John',
  firstName: 'John',
  lastName: 'Doe'
}
```

## 🚨 红旗信号

看到这些时，要特别注意：

- 🚩 **全局状态修改** - 会影响整个应用
- 🚩 **数据库 migration** - 需要谨慎检查
- 🚩 **API 改动** - 会影响客户端
- 🚩 **权限检查移除** - 安全风险！
- 🚩 **大量删除代码** - 确认不会影响其他地方
- 🚩 **引入新库** - 检查大小、安全性、替代方案
- 🚩 **关键业务逻辑改动** - 需要深入审查和测试

## ✅ 测试检查

- [ ] 有没有添加或修改测试？
- [ ] 测试是否覆盖了主要场景？
- [ ] 有没有新增的 bug 的风险？

参考：[[../../知识库型Skill/guides/new-page-template|测试模板]]

## ✅ 完成这一步后

如果你已经：
- ✅ 检查了代码逻辑和 bug
- ✅ 没有发现重大问题（或已指出）
- ✅ 准备好整理反馈

**→ 进入 [[step4-compile-feedback|Step 4：整理反馈]]**

---

**下一步**：[[step4-compile-feedback|Step 4 - 整理反馈意见]]
