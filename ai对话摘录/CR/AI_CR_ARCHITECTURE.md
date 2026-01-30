# AI Code Review 系统 - 技术架构与实现计划

**版本**：1.0.0
**创建日期**：2026-01-21
**状态**：实施中

---

## 1. 系统架构概览

```
┌─────────────────────────────────────────────────────────────┐
│                     开发工作流                                   │
│  代码 Push → Git Hook / 手动触发 Claude Code                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                   AI CR 系统 (Claude)                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 输入层：                                              │  │
│  │ 1. PR/分支 diff 代码                                  │  │
│  │ 2. REVIEW_STANDARDS.md（项目规范）                   │  │
│  │ 3. 相关的源文件上下文                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│           ↓                                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 分析引擎：                                             │  │
│  │ 1. 代码理解（TypeScript/React 语法）                 │  │
│  │ 2. 规范对齐（REVIEW_STANDARDS 匹配）                │  │
│  │ 3. 模式识别（重复代码、相似逻辑）                    │  │
│  │ 4. 风险评估（业务逻辑、状态管理）                    │  │
│  │ 5. 优化建议（性能、可维护性）                        │  │
│  └──────────────────────────────────────────────────────┘  │
│           ↓                                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 输出层：                                              │  │
│  │ Markdown 审查报告（按优先级排序）                    │  │
│  │ + 规范更新建议（可选）                               │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────┬────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                   输出展示层                                   │
│  选项1：Git Hook 报告 → 屏幕输出 / 文件保存                 │
│  选项2：Claude Code IDE → 诊断面板 / 报告浮窗                │
│  选项3：通知系统 → Slack / 钉钉 / 其他                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. 集成方案详细设计

### 2.1 集成方式 A：Git Hook 自动触发

**触发时机**：PR 创建时自动运行

**实现流程**：

```bash
# .git/hooks/post-commit（或通过 husky 配置）
#!/bin/bash

# 1. 获取本次提交的变更代码
DIFF_CODE=$(git diff HEAD~1..HEAD --cached)

# 2. 读取项目规范
STANDARDS=$(cat REVIEW_STANDARDS.md)

# 3. 调用 Claude Code CLI 或本地 API
claude-code-review \
  --diff "$DIFF_CODE" \
  --standards "$STANDARDS" \
  --context src/ \
  --output review-report.md

# 4. 展示报告
if [ -f review-report.md ]; then
  echo "=== AI Code Review Report ==="
  cat review-report.md

  # 可选：失败时阻止提交
  # exit 1
fi
```

**优点**：
- ✅ 自动化无感，开发者无需额外操作
- ✅ 快速反馈，提交即知道问题
- ✅ 保证每个提交都被审查

**缺点**：
- ❌ 可能会拖慢提交速度（需要异步）
- ❌ 依赖网络连接

**推荐配置**：异步执行，不阻止提交

---

### 2.2 集成方式 B：Claude Code 独立工具

**触发方式**：Reviewer 手动调用

**实现流程**：

```bash
# Reviewer 在本地运行（已安装 Claude Code）
claude-code-review \
  --branch feature/alarm-optimization \
  --target master \
  --generate-report \
  --update-standards

# 交互式菜单
# 1. 查看完整审查报告
# 2. 接受规范更新建议
# 3. 标记为已审核
# 4. 反馈改进意见
```

**优点**：
- ✅ 灵活，在任何时间运行
- ✅ 可以指定对比分支
- ✅ IDE 集成更好（可视化）

**缺点**：
- ❌ 需要手动触发
- ❌ 依赖 Reviewer 主动使用

**推荐场景**：用于详细审查，或补充性审查

---

### 2.3 推荐集成策略：双轨并行

| 场景 | 方式 | 触发条件 | 用途 |
|------|------|--------|------|
| **提交时** | Git Hook（异步） | 每个 commit | 快速初步反馈 |
| **PR 发起时** | Claude Code（手动） | Reviewer 主动 | 深度审查，决策 |
| **合并前** | CLI 命令 | 团队流程 | 最终检查，更新规范 |

---

## 3. 实现细节

### 3.1 Prompt 设计（核心）

AI 审查的质量完全取决于 prompt。以下是推荐的 prompt 框架：

```markdown
# AI Code Review 任务

## 上下文信息

### 项目背景
- 项目名称：TMS/OMS 系统
- 技术栈：React 16.5 + Redux + Redux-Saga + TypeScript 3.8
- 代码库位置：src/
- 项目规范：见附录 REVIEW_STANDARDS.md

### 审查范围
变更的代码：
\`\`\`
{DIFF_CODE}
\`\`\`

相关文件上下文（reducer/saga/selectors）：
\`\`\`
{RELATED_FILES}
\`\`\`

## 审查任务

请按照以下维度进行代码审查，依据 REVIEW_STANDARDS.md：

### 1. 业务逻辑审查（优先级: P0）
- [ ] Redux 状态流转是否正确（reducer → saga → selector）
- [ ] 异步操作的错误处理是否完整（try-catch，失败 action）
- [ ] API 数据结构检查是否严谨（null/undefined 检查）
- [ ] 业务约束是否被遵守（如时间范围、数据有效性）
- [ ] 是否有重复代码或可复用的现有逻辑

### 2. 规范遵循审查（优先级: P0）
- [ ] 文件结构是否符合 Container 标准模式
- [ ] 命名是否遵循规范（PascalCase/camelCase）
- [ ] reducer 是否使用 Immutable.js（fromJS/set）
- [ ] Action type 是否在 constants.tsx 定义
- [ ] Selector 是否使用 reselect 的 createSelector
- [ ] 国际化是否集中在 messages.tsx

### 3. 重复代码检测（优先级: P1）
- [ ] 新增逻辑是否与 src/utils 中的工具重复
- [ ] 新增组件是否与 src/components 中的现有组件功能相同或相似
- [ ] 新增 Hook 是否与 src/hooks 中已有的相同或相似
- [ ] 新增的业务逻辑是否与其他 container 中的相似

### 4. 性能与优化（优先级: P1）
- [ ] Selector 是否使用 createStructuredSelector（避免每次创建新对象）
- [ ] Hook 的依赖数组是否完整且最小化
- [ ] 是否有不必要的组件重渲染（useCallback/useMemo）
- [ ] 大列表是否使用了虚拟化

### 5. 低级错误检测（优先级: P2）
- [ ] TypeScript 类型检查（any, 类型不匹配）
- [ ] 语法错误或明显的逻辑错误
- [ ] console.log 或调试代码遗留
- [ ] 未使用的变量或导入

## 输出格式

按以下格式输出审查结果：

### 📋 审查摘要
- 总问题数：X
- 关键问题（P0）：X 个
- 中等问题（P1）：X 个
- 建议项（P2）：X 个

### 🔴 关键问题（需立即修改）
针对每个问题格式如下：
**问题 #1：[标题]**
- 位置：[文件:行号]
- 严重级别：P0
- 描述：[具体问题描述]
- 原因：[为什么这是问题]
- 建议：[如何修改]
- 规范参考：第 X 部分

### 🟡 中等问题（建议修改）
[同上格式]

### 🟢 优化建议（可选修改）
[同上格式]

### 📌 规范更新建议
如果发现新的规范需要沉淀或现有规范需要调整，列出建议：
- 建议项：[描述]
- 影响范围：[多少文件]
- 优先级：[高/中/低]

## 审查标准

- 只报告有信息价值的问题，避免噪音
- 如果不确定是否是问题，在备注中说明假设
- 建议必须可执行、明确

REVIEW_STANDARDS.md 附录内容（完整的规范文档）
```

---

### 3.2 上下文收集脚本

为了让 AI 理解项目，需要自动收集相关上下文：

```bash
#!/bin/bash
# scripts/collect-context.sh

DIFF_CODE="$1"  # 传入的 diff
TARGET_DIR="src/"

# 1. 提取变更涉及的 container
CHANGED_CONTAINERS=$(echo "$DIFF_CODE" | grep -o "src/containers/[^/]*" | sort -u)

# 2. 收集相关的源文件（reducer, saga, selectors）
for container in $CHANGED_CONTAINERS; do
  echo "## Context: $container"

  for file in reducer.tsx saga.tsx selectors.tsx constants.tsx; do
    if [ -f "$container/$file" ]; then
      echo "### $file"
      cat "$container/$file"
      echo ""
    fi
  done
done

# 3. 收集相关的 utils 和 hooks
echo "## Available Utilities"
ls -la src/utils/ | grep -E "\.tsx?$"

echo "## Available Hooks"
ls -la src/hooks/ | grep -E "\.tsx?$"

# 4. 收集 REVIEW_STANDARDS.md
echo "## Project Standards"
cat REVIEW_STANDARDS.md
```

---

### 3.3 报告生成和展示

**生成的报告示例**：

```markdown
# 🔍 AI Code Review Report

## 提交信息
- Branch: `feature/alarm-optimization`
- Commit: `abc123...`
- Changed Files: 5
- Added Lines: 145
- Removed Lines: 32

---

## 📋 审查摘要

| 级别 | 数量 | 是否有阻塞项 |
|------|------|----------|
| 🔴 关键 (P0) | 2 | ❌ 是，需修改 |
| 🟡 中等 (P1) | 3 | ⚠️  建议修改 |
| 🟢 提议 (P2) | 5 | ✅ 可选 |

---

## 🔴 关键问题（必须修改）

### 问题 #1：Reducer 直接修改 state

**位置**：`src/containers/AlarmRecord/reducer.tsx:95`

**问题**：
```typescript
case UPDATE_SEARCH_CONDITION:
  state.searchCondition = action.payload;  // ❌ 直接修改！
  return state;
```

**原因**：违反 Redux/Immutable 规范，会导致状态变化无法正确追踪

**解决方案**：
```typescript
case UPDATE_SEARCH_CONDITION:
  return state.set('searchCondition', fromJS(action.payload));  // ✅
```

**参考规范**：[REVIEW_STANDARDS.md 第 3.1 节 - Reducer 写法](./REVIEW_STANDARDS.md#31-reducer-写法)

---

### 问题 #2：Saga 错误处理不完整

**位置**：`src/containers/AlarmRecord/saga.tsx:42-60`

**问题**：
```typescript
export function* getDataListSaga(action: SofaAction.Action) {
  const response: any = yield call(services.fetchDataList, action.payload);
  yield put({
    type: `${FATCH_ACTION_SUCCESS_PREFIX}${GET_DATA_LIST}`,
    payload: response,
  });
  // ❌ 没有 try-catch，没有检查 response.data
}
```

**原因**：
1. 缺少错误处理，任何异常会导致 saga 崩溃
2. 没有检查 API 响应结构，可能传入 undefined 数据

**解决方案**：
```typescript
export function* getDataListSaga(action: SofaAction.Action) {
  try {
    const response: any = yield call(services.fetchDataList, action.payload);

    if (response?.data?.list) {
      yield put({
        type: `${FATCH_ACTION_SUCCESS_PREFIX}${GET_DATA_LIST}`,
        payload: response,
      });
    } else {
      yield put({
        type: `${FATCH_ACTION_FAILURE_PREFIX}${GET_DATA_LIST}`,
        payload: response?.message || '加载失败',
      });
    }
  } catch (error) {
    yield put({
      type: `${FATCH_ACTION_FAILURE_PREFIX}${GET_DATA_LIST}`,
      payload: (error as Error).message || '网络错误',
    });
  }
}
```

**参考规范**：[REVIEW_STANDARDS.md 第 4.2 节 - 错误处理模式](./REVIEW_STANDARDS.md#42-错误处理模式)

---

## 🟡 中等问题（建议修改）

### 问题 #3：重复的枚举选择器组件

**位置**：`src/containers/AlarmRecord/components/StatusSelector.tsx`

**问题**：新增的 `StatusSelector` 组件与已有的 `src/components/EnumSelect` 功能完全相同

**原因**：没有检查现有组件库

**建议**：
直接使用 `src/components/EnumSelect` 组件，避免重复开发

**相似的现有组件**：
- `EnumSelect` - 通用枚举选择器
- `LimitedSelect` - 限制选项的选择器

**参考规范**：[REVIEW_STANDARDS.md 第 7.1 节 - 现有高频组件](./REVIEW_STANDARDS.md#71-现有高频组件)

---

### 问题 #4：Selector 未使用 createSelector

**位置**：`src/containers/AlarmRecord/selectors.tsx:15-20`

**问题**：
```typescript
// ❌ 每次调用都创建新对象
export const selectAlarmRecordState = (state: any) => ({
  tableData: state.getIn([NAMESPACE, 'tableData']),
  pagination: state.getIn([NAMESPACE, 'pagination']),
});
```

**影响**：组件会频繁重渲染，因为引用地址每次都不同

**解决方案**：
```typescript
// ✅ 使用 createSelector
export const selectAlarmRecordState = createSelector(
  [selectState],
  state => ({
    tableData: state.get('tableData'),
    pagination: state.get('pagination'),
  })
);
```

**参考规范**：[REVIEW_STANDARDS.md 第 3.3 节 - Selector 写法](./REVIEW_STANDARDS.md#33-selector-写法)

---

### 问题 #5：日期时间戳格式不一致

**位置**：`src/containers/AlarmRecord/components/SearchForm.tsx:28`

**问题**：
```typescript
const startDate = new Date().toISOString();  // ❌ ISO 字符串
// 但 reducer 期望的是 Unix 时间戳（moment().format('X')）
```

**建议**：检查时间格式的一致性，参照项目约定

**相关代码**：
- `AlarmRecord/reducer.tsx` 使用 `moment().subtract(7, 'days').format('X')`（Unix 时间戳）
- 新增代码应该保持一致

---

## 🟢 优化建议（可选）

### 建议 #1：考虑使用 Hook 简化组件逻辑

在 `SearchForm.tsx` 中，有重复的网络请求管理代码

**推荐**：使用现有的 `src/hooks/useGetRequest` Hook

---

### 建议 #2：类型完整性

建议在 `types.ts` 中明确定义 `ISearchCondition` 接口，增加类型安全性

---

## 📌 规范更新建议

### 建议 1：补充 moment.js 时间戳约定
**内容**：项目使用 Unix 时间戳（`moment().format('X')`），所有时间字段应统一

**影响范围**：4+ 个文件（时间相关的 reducer/services）

**优先级**：🟡 中

**行动**：在 REVIEW_STANDARDS.md 第 3.2 节补充说明

---

## 📊 统计信息

- 审查耗时：~1.5 分钟
- 代码行数审查：~145 行
- 检测到的规范偏离：3 项
- 重复代码警告：1 项
- 预估修改时间：15-20 分钟

---

## ✅ 后续行动

1. **开发者修改**：修复 5 个问题（尤其是 P0 问题）
2. **Reviewer 检查**：验证修改符合建议
3. **规范更新**：考虑是否需要更新 REVIEW_STANDARDS.md
4. **合并**：所有问题解决后可以安全合并

---

**生成时间**：2026-01-21 10:30:00
**AI 模型**：Claude (Sofa Apodidae)
**审查版本**：v1.0
```

---

## 4. 规范更新流程

### 4.1 自动更新建议生成

每次 CR 后，AI 会分析是否需要更新规范：

```markdown
## 规范更新建议

### 发现新模式：Saga 中的默认值处理

**描述**：
在多个 Saga 中发现相同的模式：
- 从 selector 读取当前条件
- 与新 action payload 合并

**新规范建议**：
在 REVIEW_STANDARDS.md 4.1 节补充 Saga 合并条件的标准写法

**示例代码**：
\`\`\`typescript
// 标准模式
const searchCondition = yield select(selectSearchCondition);
const payload = {
  ...searchCondition?.toJS?.(),
  ...action.payload,
};
\`\`\`

**应用范围**：至少 5+ 个 saga 可以采用这个模式

---

### 发现规范偏离：时间戳格式混乱

**问题**：项目中有多个时间格式：
- Unix 时间戳（moment().format('X')）
- ISO 字符串（new Date().toISOString()）
- 毫秒时间戳（Date.now()）

**建议**：
统一时间戳格式为 Unix 时间戳，在 REVIEW_STANDARDS.md 补充说明

**影响**：10+ 个文件
```

### 4.2 更新流程

```
AI 提交规范更新建议
    ↓
审视 1 周数据积累
    ↓
Reviewer 审核建议（每周五）
    ↓
人工决策和调整
    ↓
合并到 REVIEW_STANDARDS.md
    ↓
git commit 记录版本历史
    ↓
通知团队更新
```

---

## 5. 实施路线图

### Phase 1：准备阶段（第 1-2 周）

**关键活动**：
- [x] 完成 REVIEW_STANDARDS.md 初稿（已完成）
- [x] 完成规格说明 AI_CODE_REVIEW_SPEC.md（已完成）
- [ ] 搭建 Git Hook 自动触发机制
- [ ] 准备 Claude Code 集成脚本
- [ ] 准备 prompt 模板和上下文收集脚本
- [ ] 团队预热：介绍系统、讲解规范

**交付物**：
- Git Hook 代码
- 上下文收集脚本
- 完整的 prompt 模板
- 团队培训材料

---

### Phase 2：试点阶段（第 3-4 周）

**参与者**：2-3 个核心开发者 + 1 个 Reviewer

**关键活动**：
- [ ] 在当前项目运行 AI CR
- [ ] 收集反馈：建议准确性、规范完整性
- [ ] 优化 prompt 和上下文收集
- [ ] 积累 CR 案例库
- [ ] 迭代更新 REVIEW_STANDARDS.md（基于发现）

**目标**：
- 信息价值率 > 80%
- 规范精准度 > 90%
- 开发者满意度 > 8/10

**交付物**：
- CR 案例库（5-10 个典型案例）
- 优化后的 prompt
- 改进的 REVIEW_STANDARDS.md v1.1
- 团队反馈总结

---

### Phase 3：扩大范围（第 5 周）

**参与者**：当前项目全部开发者（30 人）

**关键活动**：
- [ ] 在整个团队推广
- [ ] 团队培训和演示
- [ ] 建立 CR 反馈渠道
- [ ] 持续优化规范
- [ ] 自动更新规范（每周一次）

**目标**：
- 90% 的 PR 使用 AI CR
- 规范更新自动化程度 > 80%
- 团队满意度稳定 > 8/10

---

### Phase 4：推广和复用（第 6+ 周）

**对象**：其他技术栈的项目（Vue2/Vue3）

**关键活动**：
- [ ] 分析其他项目技术栈
- [ ] 适配 REVIEW_STANDARDS 模板
- [ ] 创建不同技术栈的规范库
- [ ] 复用 AI CR 系统

---

## 6. 关键指标和成功标准

### 6.1 定量指标

| 指标 | 目标值 | 衡量方法 |
|------|--------|--------|
| **信息价值率** | > 80% | 采样 CR，人工评估有效性 |
| **误报率** | < 10% | 开发者反馈虚假警告 |
| **规范覆盖率** | > 90% | 发现问题与 REVIEW_STANDARDS 重合 |
| **重复代码检测** | > 80% | 检测与实际情况对比 |
| **采纳率** | > 75% | 开发者接纳 AI 建议的比例 |

### 6.2 定性反馈

- 开发者是否认为 AI CR 有价值？
- 是否愿意在今后的 CR 中使用？
- 哪些规范需要调整或补充？

---

## 7. 风险管理

| 风险 | 影响 | 缓解方案 |
|------|------|--------|
| AI 理解有误 | 误报高 | 初期设置高置信度，逐步优化 |
| 规范不完整 | 检测效果差 | 每周迭代更新，积累案例 |
| 集成失败 | 无法使用 | 并行支持两种集成方式（Hook + 手动） |
| 团队不接受 | 推广困难 | 展示案例，逐步建立信心 |

---

## 8. 工具和技术选型

### 8.1 使用的技术

| 组件 | 技术 | 原因 |
|------|------|------|
| AI 模型 | Claude (Sofa 代理) | 公司现有资源，能力足够 |
| 版本控制 | Git | 项目已使用，REVIEW_STANDARDS.md 跟随 git |
| 自动化 | Shell 脚本 + Husky | 轻量，易于维护 |
| 输出展示 | Markdown | 通用，易于分享和存档 |

### 8.2 可选的增强

- 后续可集成 Slack/钉钉 通知
- 后续可添加 Web 仪表板查看历史报告
- 后续可评估 RAG 方案增强知识库

---

## 9. 维护和支持

### 9.1 日常维护

- **每周**：汇总规范更新建议，进行人工审核
- **每月**：分析 AI CR 的效果指标
- **按需**：调整 prompt、收集脚本、规范文档

### 9.2 问题处理

如果出现问题（如误报过多、规范不准），操作流程：

1. **记录问题**：具体的案例和现象
2. **分析原因**：是 prompt 问题、规范问题、还是 AI 理解问题
3. **改进措施**：调整相应的组件
4. **验证效果**：在下一批 CR 中验证改进

---

## 10. 交流和反馈

**反馈渠道**：
- 在 PR 中直接评论 AI CR 报告
- 周报总结规范演进
- 定期团队分享会

**改进建议**：
- 自动化不足的地方？
- 规范遗漏或不准确的地方？
- 新发现的模式和最佳实践？

---

**文档版本**：1.0.0
**最后更新**：2026-01-21
**下一步**：实施 Git Hook 和脚本部分
