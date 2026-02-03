# 问题分级标准

---

## 如何给问题分级？

在 Code Review 中，问题的严重程度不同，应该用不同的标记。

---

## 🔴 Blocking（关键，必须修改）

这些是**必须修改后才能合并**的问题。

### 特点

- 影响功能正确性
- 影响系统稳定性或安全性
- 违反核心规范
- 可能导致线上问题

### 示例

#### 功能不符合需求

```
【问题】删除用户功能没有二次确认

当前：点击删除按钮直接删除
问题：可能误删，影响数据完整性
建议：添加确认弹窗，让用户确认后再删除
```

#### 重大安全漏洞

```
【问题】使用了 innerHTML，存在 XSS 风险

当前代码：element.innerHTML = userInput
问题：用户输入未转义，可能被注入恶意代码
建议：改为 element.textContent = userInput
或者：使用 DOMPurify 清理 HTML
```

#### 重大逻辑错误

```
【问题】金额计算错误，可能导致财务问题

当前：total = price * quantity  （没有考虑折扣）
问题：折扣未应用，用户少支付了
建议：total = price * quantity * (1 - discount)
```

#### 影响系统稳定性

```
【问题】没有处理数组越界，可能导致 crash

当前：const item = items[index]  （如果 index 超出范围）
问题：会导致 undefined，可能在后续操作中出错
建议：添加边界检查：if (index >= 0 && index < items.length)
```

---

## 🟠 Major（重要，应该修改）

这些是**应该修改的问题**，但不一定要在合并前完全修复。

有时候可以创建 issue 后续处理，但建议在合并前修改。

### 特点

- 会导致 bug
- 性能有明显下降
- 违反重要规范
- 影响用户体验

### 示例

#### 会导致 bug

```
【问题】改动了 API 接口但没有更新调用方

当前：API 参数从 { userId } 改为 { id }
问题：调用方还在使用 userId，会传错数据
建议：同步更新所有调用方，确保参数一致
```

#### 性能明显下降

```
【问题】在循环中执行数据库查询

当前：for (let i = 0; i < users.length; i++) {
        const profile = await getUserProfile(users[i].id)
      }
问题：如果有 100 个用户，就要查询 100 次，性能很差
建议：使用批量查询 API，一次查询所有数据
```

#### 影响用户体验

```
【问题】没有处理加载状态

当前：点击后直接发起请求，UI 无反馈
问题：用户不知道在加载，可能重复点击或关闭页面
建议：显示加载提示，禁用按钮直到请求完成
```

---

## 🟡 Minor（一般，可以考虑修改）

这些是**建议修改的地方**，但不必强制。

### 特点

- 代码风格问题
- 可读性改进
- 最佳实践建议
- 文档不完整

### 示例

#### 代码风格问题

```
【问题】变量命名不够清晰

当前：const d = userData
建议：const userProfileData = userData
原因：更清晰的名称能帮助其他开发者快速理解
```

#### 可读性改进

```
【问题】函数太长，不易理解

当前：fetchAndProcessUserData 函数有 50 行
建议：拆分成多个小函数：fetchUser、processUserData 等
原因：单职责原则，更易测试和维护
```

#### 最佳实践建议

```
【问题】可以使用 useMemo 优化性能

当前：const filteredList = items.filter(...)  （每次都重新计算）
建议：const filteredList = useMemo(() =>
        items.filter(...), [items])
原因：缓存计算结果，避免不必要的重新计算
```

#### 文档不完整

```
【问题】复杂函数缺少注释

当前：function complexAlgorithm(data) { ... }
建议：添加注释说明算法逻辑和参数含义
原因：帮助其他开发者理解这个函数的用途
```

---

## 🟢 Trivial（微小，可选修改）

这些是**参考信息，可选修改**的项目。

### 特点

- 拼写错误
- 空行格式
- 注释改进
- 学习资源

### 示例

#### 拼写错误

```
【信息】注释中有拼写错误

当前：// Seralize the data
建议：// Serialize the data
```

#### 格式问题

```
【信息】建议添加空行提高可读性

当前：function foo() {
        const x = 1
        const y = 2
        return x + y
      }

建议：function foo() {
        const x = 1
        const y = 2

        return x + y
      }
```

#### 学习资源

```
【信息】这个模式很好，可以参考以下资源：
- React Patterns: Render Props
- 链接：https://example.com
```

---

## 分级决策树

```
问题会导致功能错误或安全问题？
  └─ 是 → 🔴 Blocking
  └─ 否
      └─ 会导致 bug 或性能问题？
          └─ 是 → 🟠 Major
          └─ 否
              └─ 是代码风格或最佳实践？
                  └─ 是 → 🟡 Minor
                  └─ 否 → 🟢 Trivial
```

---

## 给 author 的提示

作为 author，看到不同的分级：

- **🔴 Blocking** - 你**必须**修改这些，否则不能合并
- **🟠 Major** - 你**应该**修改这些，但可以在后续版本改进
- **🟡 Minor** - 你**可以**考虑这些建议，但不强制
- **🟢 Trivial** - 这些是参考信息，**可选**修改

---

## 参考

- [[feedback-guidelines|反馈撰写原则]]
- [[overview|工作流原则总览]]
