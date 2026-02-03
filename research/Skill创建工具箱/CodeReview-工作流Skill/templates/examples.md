# 好反馈的示例

这里列出了几个好反馈的完整示例，你可以参考。

---

## 示例 1：代码风格问题

### ❌ 坏的反馈

```
这里变量名不好，改一下
```

### ✅ 好的反馈

```
### 🟡 Warning：变量命名不清晰

**位置**：UserProfile.tsx, 第 25 行

**当前代码**：
```typescript
const d = userData
```

**问题**：变量 `d` 太简洁，看代码时不容易理解这是什么数据

**建议**：改为更描述性的名称：
```typescript
const userProfileData = userData
// 或者
const currentUser = userData
```

**为什么更好**：
- 更清晰地说明变量的含义
- 其他开发者快速理解代码
- 符合命名规范

**参考**：知识库 > 命名规范 > 变量命名
```

---

## 示例 2：逻辑/Bug 问题

### ❌ 坏的反馈

```
这里有 bug
```

### ✅ 好的反馈

```
### 🔴 Blocking：缺少错误处理

**位置**：UserProfile.tsx, 第 45-50 行

**当前代码**：
```typescript
const user = await fetchUser(id)
setUser(user)  // 如果 fetchUser 失败会 crash
```

**问题**：当 `fetchUser` API 请求失败时，异常会导致组件 crash，
用户会看到白屏，影响体验

**改进建议**：添加 try-catch 错误处理
```typescript
try {
  const user = await fetchUser(id)
  setUser(user)
} catch (err) {
  console.error('Failed to fetch user:', err)
  setError('加载用户信息失败，请重试')
}
```

**代码解析**：
- try 块中执行 API 请求
- catch 块捕获错误并显示用户友好的错误提示
- 避免应用 crash

**参考**：知识库 > 最佳实践 > 错误处理

---

### 📊 为什么这是好反馈？

✅ **具体** - 说明了具体位置和具体问题
✅ **建设性** - 给出了完整的解决方案
✅ **有根据** - 解释了为什么要这样做
✅ **代码示例** - 提供了可直接参考的代码
✅ **优先级清晰** - 标记为 🔴 Blocking，说明必须修改
```

---

## 示例 3：性能建议

### ❌ 坏的反馈

```
这样写会很慢
```

### ✅ 好的反馈

```
### 🟡 Warning：性能优化建议

**位置**：List.tsx, 第 20-30 行

**当前代码**：
```typescript
const filteredList = items.filter(item => item.active)

return (
  <div>
    {filteredList.map(item => <Item key={item.id} {...item} />)}
  </div>
)
```

**建议**：使用 useMemo 缓存计算结果

**改进方案**：
```typescript
const filteredList = useMemo(() => {
  return items.filter(item => item.active)
}, [items])
```

**为什么更好**：
- 当 `items` 没有变化时，不会重新计算 `filteredList`
- 避免每次组件重新渲染都执行 filter
- 提高组件性能，特别是数据量大时

**什么时候需要**：
- 计算量较大（如复杂过滤、排序）
- 依赖数据量较多
- 组件重新渲染频繁

**参考**：知识库 > 最佳实践 > 性能优化

---

### 📊 为什么这是好反馈？

✅ **具体** - 说明了具体位置和具体建议
✅ **代码示例** - 提供了改进前后的对比
✅ **解释原因** - 说明为什么这样做更好
✅ **给出适用场景** - 说明什么时候使用
✅ **优先级合理** - 标记为 🟡 Warning，说明不强制修改
```

---

## 示例 4：架构问题

### ❌ 坏的反馈

```
这个设计不太好
```

### ✅ 好的反馈

```
### 🔴 Blocking：改动了 API 接口需要同步更新

**位置**：UserService.ts 和所有调用处

**问题**：改动了 getUserProfile 的参数结构
```typescript
// 旧：getUserProfile(userId)
// 新：getUserProfile({ id: userId })
```

但其他地方还在使用旧的调用方式，会导致数据获取失败。

**受影响的文件**：
- UserProfile.tsx
- UserList.tsx
- ProfilePage.tsx

**修改建议**：
1. 统一更新所有调用处为新格式
2. 或者保持向后兼容，接受两种格式

**代码示例**：
```typescript
// 调用方要改成
const user = await getUserProfile({ id: userId })
```

**参考**：知识库 > 最佳实践 > API 设计

---

### 📊 为什么这是好反馈？

✅ **具体** - 说明了改动的具体内容
✅ **列出影响** - 明确说明哪些地方受影响
✅ **给出选择** - 提供了多种解决方案
✅ **标记为 Blocking** - 说明必须修改
```

---

## 示例 5：综合的完整反馈

```
## Code Review 反馈 - PR #123

### 📊 整体评价

⚠️ **有一些需要改进**

代码逻辑清晰，也符合大部分规范，但有一个必须修改的地方（缺少错误处理），
以及几个建议改进的地方。

---

### 🔴 Blocking（必须修改）

#### 问题 1：缺少 API 错误处理

**位置**：UserProfile.tsx, 第 45 行

**问题**：fetchUser 可能失败，但没有处理错误情况

**修改建议**：添加 try-catch 块

**代码**：[参考示例 2]

---

### 🟡 Warning（建议修改）

#### 建议 1：变量命名不够清晰

**位置**：UserProfile.tsx, 第 25 行

**当前**：const d = userData

**建议**：const userProfileData = userData

**原因**：更清晰的命名帮助理解代码

---

#### 建议 2：性能优化

**位置**：List.tsx, 第 20 行

**建议**：过滤操作可以用 useMemo 缓存

**代码**：[参考示例 3]

---

### 🟢 Info（参考）

- 可以考虑添加 loading 状态提示用户
- JSDoc 文档可以更详细

---

### ✅ 优点

✅ 代码结构清晰，易于维护
✅ TypeScript 类型定义完整
✅ 测试覆盖充分

---

## 后续

请先修改 🔴 Blocking 问题，然后重新提交审查。
加油！👍
```

---

## 💡 学习这些示例的关键点

1. **结构清晰** - 整体评价 > Blocking > Warning > Info > 优点
2. **具体位置** - 总是说明文件名和行号
3. **代码对比** - 展示当前代码和建议代码
4. **解释原因** - 说明为什么要这样改
5. **友善语气** - 即使是问题，也用尊重的语气
6. **给出选择** - 有时提供多种解决方案
7. **优先级清晰** - 用 🔴 🟡 🟢 帮助 author 安排修改
8. **引用规范** - 链接到知识库或最佳实践

---

## 参考

- [[feedback-template|反馈模板]]
- [[../guidelines/feedback-guidelines|反馈撰写原则]]
- [[../guidelines/severity-levels|问题分级标准]]
