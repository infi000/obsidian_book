# REVIEW_STANDARDS.md - 项目代码审查规范

**版本**：1.0.0
**最后更新**：2026-01-21
**维护方式**：AI 自动建议 + 人工审核
**更新频率**：每周一次（基于 CR 反馈）

---

## 1. 项目概述

本文档定义了该项目的代码审查规范和标准。这些规范来自于对现有代码库的深度分析，反映了项目的实际开发实践。

**技术栈**：React 16.5 + Redux + Redux-Saga + TypeScript 3.8 + Ant Design v3
**项目类型**：TMS/OMS 业务系统
**代码规模**：~2,400+ TypeScript/TSX 文件，150+ 业务模块，80+ 通用组件

---

## 2. 代码组织规范

### 2.1 容器（Container）标准结构

每个业务模块（容器）必须遵循以下文件组织：

```
src/containers/{ModuleName}/
├── index.tsx                    # 容器入口（必需）
├── reducer.tsx                  # Redux reducer（必需）
├── saga.tsx                      # Redux-Saga 异步处理（必需）
├── actions.tsx                   # Action creators（必需）
├── selectors.tsx                # Reselect selectors（必需）
├── constants.tsx                # 常量和 NAMESPACE（必需）
├── services.tsx                 # API 调用层（必需）
├── messages.tsx                 # 国际化资源（必需）
├── types.ts                      # TypeScript 类型定义（可选但推荐）
├── components/                  # 本地组件目录（可选）
│   ├── DataTable.tsx
│   ├── SearchForm.tsx
│   └── ...
└── modules/                     # 功能模块目录（可选）
    ├── FunctionsAndSearchToolbar.tsx
    ├── CreateAndEditModal.tsx
    └── ...
```

**验收标准**：
- [ ] 每个 container 都有完整的 NAMESPACE 定义
- [ ] index.tsx 使用 compose + injectReducer + injectSaga HOC 模式
- [ ] 不应该有孤立的文件（如 utils、helpers 等散落在 container 根目录）

### 2.2 文件命名规范

| 类型 | 命名规则 | 示例 | 说明 |
|------|--------|------|------|
| 容器目录 | PascalCase | `AlarmRecord` | 业务功能名 |
| 文件 | index.tsx, 小驼峰.tsx | `dataTable.tsx` | 内容描述，不重复目录名 |
| 组件文件 | PascalCase | `DataTable.tsx` | 如果导出 React 组件 |
| 常量文件 | 固定名 | `constants.tsx` | 统一命名 |
| 类型文件 | types.ts 或 types.tsx | `types.ts` | 统一命名 |

**违规案例**：
- ❌ `src/containers/AlarmRecord/alarmRecord.tsx` （重复名字）
- ❌ `src/containers/AlarmRecord/utils.tsx` （散落的工具文件）
- ❌ `src/containers/AlarmRecord/helper.js` （混合 JS 和 TS）

### 2.3 组件组织原则

**何时创建新组件**：
- ✅ UI 逻辑复杂、可复用（多处使用）
- ✅ 业务逻辑清晰、边界明确
- ✅ 需要独立测试和维护

**何时不应该创建新组件**：
- ❌ 只在一个地方使用，改成 inline JSX
- ❌ 只是简单的 wrapper，直接使用原组件
- ❌ 逻辑混乱，应该先拆分

---

## 3. Redux/状态管理规范

### 3.1 Reducer 写法

**标准模板**：

```typescript
// constants.tsx
export const NAMESPACE = 'alarmRecord';
export const GET_DATA_LIST = 'GET_DATA_LIST';
export const UPDATE_SEARCH_CONDITION = 'UPDATE_SEARCH_CONDITION';
export const UPDATE_PAGINATION = 'UPDATE_PAGINATION';

// reducer.tsx
import { fromJS } from 'immutable';
import { FATCH_ACTION_SUCCESS_PREFIX } from 'common-base/utils/constants';
import { NAMESPACE, GET_DATA_LIST, UPDATE_SEARCH_CONDITION } from './constants';

const initialState = fromJS({
  searchCondition: { /* ... */ },
  tableData: [],
  pagination: { page: 1, pageSize: 20, total: 0 },
});

function reducer(state = initialState, action: SofaAction.Action) {
  switch (action.type) {
    case UPDATE_SEARCH_CONDITION:
      return state.set('searchCondition', fromJS(action.payload));
    case `${FATCH_ACTION_SUCCESS_PREFIX}${GET_DATA_LIST}`:
      if (action?.payload?.data?.list) {
        return state
          .set('tableData', fromJS(action.payload.data.list))
          .setIn(['pagination', 'total'], action.payload.data.total);
      }
      return state;
    default:
      return state;
  }
}
export default reducer;
```

**必须遵守的规则**：

1. **使用 Immutable.js**
   - ✅ 初始状态使用 `fromJS()`
   - ✅ 使用 `.set()` 和 `.setIn()` 更新状态
   - ❌ 不要直接修改状态对象

2. **Action type 约定**
   - ✅ 在 `constants.tsx` 中定义所有 action type
   - ✅ 使用大写 SNAKE_CASE
   - ✅ 异步成功 action 使用 `${FATCH_ACTION_SUCCESS_PREFIX}${ACTION_NAME}` 格式
   - ❌ 不要使用字符串字面量在 reducer 中

3. **状态结构**
   - ✅ 扁平化设计（避免深层嵌套）
   - ✅ 业务实体独立存储（如 tableData, entityModal, pagination）
   - ✅ 使用有意义的键名，反映业务含义

4. **安全检查**
   - ✅ 对 `action.payload` 进行 null/undefined 检查
   - ✅ 异步数据需要检查 `payload.data` 存在性
   - ❌ 不要假设数据结构，总是验证

### 3.2 Action 写法

**标准模板**：

```typescript
// actions.tsx
import { NAMESPACE, UPDATE_SEARCH_CONDITION, GET_DATA_LIST } from './constants';

// 同步 action
export function updateSearchCondition(payload: any) {
  return {
    type: UPDATE_SEARCH_CONDITION,
    payload,
  };
}

// 异步 action（触发 saga）
export function getDataList(payload: any) {
  return {
    type: GET_DATA_LIST,
    payload,
  };
}
```

**规则**：
- ✅ Action creator 返回纯对象
- ✅ 清晰的函数名（updateXXX、getXXX）
- ❌ 不要在 action creator 中做异步操作

### 3.3 Selector 写法

**标准模板**：

```typescript
// selectors.tsx
import { createSelector } from 'reselect';
import { NAMESPACE } from './constants';

const selectState = (state: any) => state.getIn([NAMESPACE]);

// 简单 selector
export const selectTableData = createSelector(
  [selectState],
  state => state?.get('tableData')
);

// 复杂 selector（多个依赖）
export const selectTableWithPagination = createSelector(
  [selectState],
  state => ({
    tableData: state?.get('tableData'),
    pagination: state?.get('pagination')?.toJS?.(),
  })
);

// 使用 createStructuredSelector
export const selectAlarmRecordState = createSelector(
  [selectState],
  state => ({
    tableData: state?.get('tableData'),
    searchCondition: state?.get('searchCondition')?.toJS?.(),
    pagination: state?.get('pagination')?.toJS?.(),
  })
);
```

**规则**：
- ✅ 使用 `reselect` 避免不必要的重新计算
- ✅ Selector 函数名以 `select` 开头
- ✅ 如果返回 Immutable 对象，使用 `.toJS()` 转换为普通对象
- ❌ 不要在 selector 中执行副作用

### 3.4 常见错误模式

**❌ 错误：直接修改 state**

```typescript
// 错误
case UPDATE_SEARCH_CONDITION:
  state.searchCondition = action.payload;  // 直接修改！
  return state;
```

**✅ 正确**：

```typescript
case UPDATE_SEARCH_CONDITION:
  return state.set('searchCondition', fromJS(action.payload));
```

---

**❌ 错误：假设异步数据结构**

```typescript
case `${FATCH_ACTION_SUCCESS_PREFIX}${GET_DATA_LIST}`:
  return state.set('tableData', fromJS(action.payload.data.list));  // 没有检查！
```

**✅ 正确**：

```typescript
case `${FATCH_ACTION_SUCCESS_PREFIX}${GET_DATA_LIST}`:
  if (action?.payload?.data?.list) {
    return state.set('tableData', fromJS(action.payload.data.list));
  }
  return state;
```

---

## 4. Saga 异步处理规范

### 4.1 标准 Saga 模式

```typescript
// saga.tsx
import { put, takeLatest, call, select } from 'redux-saga/effects';
import { NAMESPACE, GET_DATA_LIST } from './constants';
import * as services from './services';
import * as actions from './actions';
import { selectSearchCondition } from './selectors';

// Worker saga
export function* getDataListSaga(action: SofaAction.Action) {
  try {
    const searchCondition: any = yield select(selectSearchCondition);
    const payload = {
      ...searchCondition?.toJS?.(),
      ...action.payload,
    };
    const response: any = yield call(services.fetchDataList, payload);

    if (response?.success || response?.data) {
      yield put({
        type: `${FATCH_ACTION_SUCCESS_PREFIX}${GET_DATA_LIST}`,
        payload: response,
      });
    } else {
      // 错误处理
      yield put({
        type: `${FATCH_ACTION_FAILURE_PREFIX}${GET_DATA_LIST}`,
        payload: response?.message || '加载失败',
      });
    }
  } catch (error) {
    yield put({
      type: `${FATCH_ACTION_FAILURE_PREFIX}${GET_DATA_LIST}`,
      payload: (error as Error).message || '加载失败',
    });
  }
}

// 导出 saga
export default function* rootSaga() {
  yield takeLatest(GET_DATA_LIST, getDataListSaga);
}
```

**规则**：
- ✅ 异步操作都在 saga 中
- ✅ 使用 `yield call()` 调用服务
- ✅ 使用 `yield put()` 发送 action
- ✅ 必须有 try-catch 和错误处理
- ✅ 成功和失败都要有相应的 action
- ❌ 不要在 saga 中修改状态（只能 put action）

### 4.2 错误处理模式

**必须处理的场景**：

1. 网络错误（超时、连接失败）
2. API 返回错误（success=false）
3. 数据解析错误（unexpected structure）
4. 业务错误（数据不存在、权限不足）

**标准模式**：

```typescript
export function* getDataListSaga(action: SofaAction.Action) {
  try {
    const response: any = yield call(services.fetchDataList, action.payload);

    // 检查 API 响应结构
    if (!response) {
      throw new Error('API 返回空响应');
    }

    // 检查业务成功标志
    if (response.success || response.data) {
      yield put({
        type: `${FATCH_ACTION_SUCCESS_PREFIX}${GET_DATA_LIST}`,
        payload: response,
      });
    } else {
      // API 业务错误（如: success=false）
      yield put({
        type: `${FATCH_ACTION_FAILURE_PREFIX}${GET_DATA_LIST}`,
        payload: response?.message || '操作失败，请稍后重试',
      });
    }
  } catch (error) {
    // 网络或其他运行时错误
    console.error('[Saga] getDataListSaga error:', error);
    yield put({
      type: `${FATCH_ACTION_FAILURE_PREFIX}${GET_DATA_LIST}`,
      payload: (error as Error).message || '网络错误，请检查网络连接',
    });
  }
}
```

---

## 5. React 组件规范

### 5.1 函数式组件写法

**标准模板**：

```typescript
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Modal, Form, Input, Button, message } from 'antd';

import { selectTableData, selectPagination } from './selectors';
import * as actions from './actions';

interface IProps {
  tableData: any[];
  pagination: any;
  onGetDataList: (payload: any) => void;
}

const MyComponent: React.FC<IProps> = (props) => {
  const { tableData, pagination, onGetDataList } = props;

  React.useEffect(() => {
    onGetDataList({ page: 1 });
  }, []);

  return (
    <div>
      {/* JSX */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  tableData: selectTableData,
  pagination: selectPagination,
});

const mapDispatchToProps = {
  onGetDataList: actions.getDataList,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(MyComponent);
```

**规则**：
- ✅ 使用 TypeScript 类型注解
- ✅ Props 定义为 interface
- ✅ 使用 `connect` + `compose` 而不是 hooks（保持一致性）
- ✅ `mapDispatchToProps` 中 handler 使用 `on` 前缀
- ❌ 不要混用 connect HOC 和 hooks（除非特别说明）

### 5.2 Hook 使用规范

**已存在的自定义 Hooks**（优先使用）：

| Hook | 用途 | 示例 |
|------|------|------|
| `useTableScrollX` | 表格自适应横向滚动 | 大数据表格布局 |
| `useGetRequest` | 简化 GET 请求逻辑 | 初始化加载数据 |
| `useUpdateEffect` | 忽略初始化的 effect | 依赖变化时更新 |
| `useDeepCompareEffect` | 深比较依赖（Immutable） | Redux 状态依赖 |
| `useEffecMounted` | 检查是否已挂载 | 避免内存泄漏 |
| `useDynamicList` | 动态列表管理 | 表单字段数组 |

**优先级规则**：
1. ✅ 先查看 `src/hooks/` 有没有现成的 Hook
2. ✅ 再看通用组件库有没有相似功能
3. ✅ 最后才考虑创建新 Hook

**创建新 Hook 时**：

```typescript
// src/hooks/useMyHook.ts
import { useEffect, useState, useRef } from 'react';

export function useMyHook(dependency: any) {
  const [state, setState] = useState(null);
  const mounted = useRef(true);

  useEffect(() => {
    // 业务逻辑
    if (mounted.current) {
      setState(/* ... */);
    }

    return () => {
      mounted.current = false;
    };
  }, [dependency]);

  return state;
}
```

---

## 6. 工具函数和工具库规范

### 6.1 何时提取工具函数

**应该提取**：
- ✅ 被 2+ 个组件使用的逻辑
- ✅ 与业务逻辑无关的通用算法
- ✅ 字符串转换、日期处理、数据验证等

**不应该提取**：
- ❌ 只在一个地方使用的逻辑
- ❌ 由于懒惰而抽取的 5 行代码
- ❌ 还不清楚需求的代码

### 6.2 工具文件命名

在 `src/utils/` 下创建工具文件：

```
src/utils/
├── dateUtils.tsx           # 日期相关
├── stringUtils.tsx         # 字符串处理
├── validationUtils.tsx     # 数据验证
├── formatUtils.tsx         # 格式化
└── ...
```

**不要**在 container 内创建 `utils.tsx`（应该放在全局 utils）

---

## 7. 通用组件库规范

### 7.1 现有高频组件（推荐复用）

以下组件被多个模块使用，新功能优先使用：

| 组件 | 位置 | 用途 | 何时使用 |
|------|------|------|--------|
| `AsyncExportConfirm` | `src/components/AsyncExportConfirm/` | 异步导出 | 导出大数据 |
| `DraggableTable` | `src/components/DraggableTable/` | 可拖拽表格 | 表格行排序 |
| `EnumSelect` | `src/components/EnumSelect/` | 枚举选择器 | 下拉菜单类型 |
| `DistrictsComponentForService` | `src/components/DistrictsComponentForService/` | 地区选择 | 地理位置选择 |
| `Export` | `src/components/Export/` | 通用导出 | 数据导出功能 |
| `ImgsModal` | `src/components/ImgsModal/` | 图片预览 | 图片展示 |
| `OnwayRecord` | `src/components/OnwayRecord/` | 在途记录 | 物流信息 |
| `OperateLog` | `src/components/OperateLog/` | 操作日志 | 审计追踪 |

**检查规则**：
- ✅ 添加新功能前，在 `src/components/` 搜索相似组件
- ✅ 如果找到相似组件但不完全匹配，考虑扩展而不是重建
- ❌ 不要重复开发已有的功能

### 7.2 创建新通用组件的条件

只有在以下情况下才创建新组件：
1. 明确需要被多个模块使用
2. 功能边界清晰，独立性强
3. 现有组件库中确实没有相似功能

---

## 8. 国际化（i18n）规范

### 8.1 消息定义

**在 `messages.tsx` 中集中定义**：

```typescript
// src/containers/AlarmRecord/messages.tsx
import { defineMessages } from 'react-intl';

export default defineMessages({
  pageTitle: {
    id: 'alarmRecord.pageTitle',
    defaultMessage: 'Alarm Records',
  },
  searchBtn: {
    id: 'alarmRecord.searchBtn',
    defaultMessage: 'Search',
  },
  // 更多消息...
});
```

**使用**：

```typescript
import messages from './messages';
import { injectIntl, InjectedIntl } from 'react-intl';

interface IProps {
  intl: InjectedIntl;
}

const Component: React.FC<IProps> = ({ intl }) => {
  return (
    <button>{intl.formatMessage(messages.searchBtn)}</button>
  );
};

export default injectIntl(Component);
```

**规则**：
- ✅ 所有用户可见的文本都要 i18n 化
- ✅ 在 `messages.tsx` 集中管理
- ✅ ID 使用 `模块名.关键词` 格式
- ❌ 不要在组件中硬编码文本

---

## 9. TypeScript 类型规范

### 9.1 类型定义位置

**统一在 `types.ts` 中定义**：

```typescript
// src/containers/AlarmRecord/types.ts
export interface ISearchCondition {
  equipId?: string;
  orderId?: string;
  startDate?: string;
  endDate?: string;
  [key: string]: any;
}

export interface ITableRow {
  id: string;
  alarmType: number;
  status: string;
  createTime: number;
  description: string;
}

export interface IPagination {
  page: number;
  pageSize: number;
  total: number;
}

export interface IAlarmRecordState {
  searchCondition: ISearchCondition;
  tableData: ITableRow[];
  pagination: IPagination;
  loading: boolean;
}
```

**使用**：

```typescript
// reducer.tsx / saga.tsx
import { IAlarmRecordState, ITableRow } from './types';

const initialState = fromJS<IAlarmRecordState>({
  // ...
});

function reducer(state = initialState, action: SofaAction.Action): any {
  // ...
}
```

**规则**：
- ✅ 复杂类型都要定义
- ✅ 使用 `interface` 而不是 `type`（除非特殊需要）
- ✅ 类型名称使用 `I` 前缀（保持一致性）
- ❌ 不要使用 `any`，除非实在无法定义

---

## 10. 常见错误和陷阱

### 10.1 Redux 相关错误

**❌ 错误：直接修改 Immutable state**

```typescript
case UPDATE_PAGINATION:
  state.get('pagination').page = action.payload.page;  // 错误！
  return state;
```

**✅ 正确**：

```typescript
case UPDATE_PAGINATION:
  return state.setIn(['pagination', 'page'], action.payload.page);
```

---

**❌ 错误：在 selector 中返回新对象**

```typescript
export const selectData = (state: any) => {
  return {
    // 每次调用都会返回新对象，导致组件不必要重渲染！
    tableData: state.getIn([NAMESPACE, 'tableData']),
  };
};
```

**✅ 正确**：

```typescript
export const selectData = createSelector(
  [selectState],
  state => ({
    tableData: state.get('tableData'),
  })
);
```

---

### 10.2 React 组件错误

**❌ 错误：Hook 依赖不完整**

```typescript
useEffect(() => {
  fetchData(searchCondition);
}, []);  // 缺少 searchCondition 依赖！
```

**✅ 正确**：

```typescript
useEffect(() => {
  fetchData(searchCondition);
}, [searchCondition]);
```

---

**❌ 错误：在 reducer 中进行异步操作**

```typescript
case FETCH_DATA:
  // 这里不能调用 async/await！
  const data = await fetchAPI();
  return state.set('data', fromJS(data));
```

**✅ 正确**：异步操作在 saga 中进行

---

### 10.3 状态管理陷阱

**❌ 错误：过度嵌套的状态结构**

```typescript
const state = fromJS({
  module1: {
    submodule: {
      data: {
        list: [/* ... */]
      }
    }
  }
});
// 访问时需要多层 getIn(['module1', 'submodule', 'data', 'list'])
```

**✅ 正确**：扁平化设计

```typescript
const state = fromJS({
  tableData: [/* ... */],
  entityModal: { /* ... */ },
  pagination: { /* ... */ },
  loading: false,
});
```

---

## 11. 代码审查检查清单

### 11.1 新增 Container 时

- [ ] 文件结构完整（index.tsx, reducer.tsx, saga.tsx 等）
- [ ] NAMESPACE 定义且唯一
- [ ] Redux 状态结构合理（扁平化）
- [ ] Reducer 所有 case 都有 payload 检查
- [ ] Saga 有完整的 try-catch 和错误处理
- [ ] Selector 使用 createSelector
- [ ] 没有重复的业务逻辑（检查相似 container）
- [ ] API 调用集中在 services.tsx

### 11.2 新增组件时

- [ ] 检查 src/components/ 是否已有相似组件
- [ ] 组件职责单一，边界清晰
- [ ] Props 有 TypeScript 类型定义
- [ ] 有 PropTypes 或 TypeScript 文档说明
- [ ] 可复用性考虑（参数化，通用配置）

### 11.3 修改现有状态时

- [ ] 使用 `.set()` / `.setIn()` 更新（不直接修改）
- [ ] 检查所有依赖的 selector 是否需要更新
- [ ] 检查所有使用该状态的组件是否受影响
- [ ] 更新相应的 reducer 分支

### 11.4 API 调用相关

- [ ] 错误处理完整（try-catch）
- [ ] 响应数据结构检查（null/undefined 检查）
- [ ] 超时和重试机制（如需要）
- [ ] 业务错误和网络错误都有处理

---

## 12. 更新日志

### v1.0.0 (2026-01-21)

**初版发布**

- 文档化项目代码组织规范
- 定义 Redux/Saga 标准模式
- 列出高频使用的组件和 Hooks
- 汇总常见错误和最佳实践

---

## 13. 维护和反馈

**本文档的维护方式**：

1. **AI 自动更新**：每次 CR 后分析新发现的模式和规范偏离
2. **周期性汇总**：每周汇总建议，由 Reviewer 审核并 merge
3. **版本管理**：每次更新提交 git 记录，便于查看历史演进

**反馈和改进**：

如果你发现：
- 文档中的规范不符合实际
- 发现新的模式或最佳实践
- 规范有歧义或需要澄清

请在 CR 时提出，AI 会记录并建议更新。

---

**最后一次人工审核**：2026-01-21
**下次 AI 建议更新**：待首次 CR
