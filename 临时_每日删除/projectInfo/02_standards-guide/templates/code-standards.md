# 代码规范
- 这部分项目需要根据各自项目的实际情况进行修改、做好沉淀。

## JavaScript/TypeScript 规范

### 变量声明
- 优先使用 const
- 需要重新赋值用 let
- 禁止使用 var

示例：
```typescript
// ✅ 正确
const MAX_SIZE = 100
let counter = 0

// ❌ 错误
var name = 'John'
```

### 函数编写
- 优先使用箭头函数
- 函数名用 camelCase
- 一个函数做一件事
- 函数参数不超过 3 个（用对象参数）

### 注释规范

需要三种注释：
1. **函数/方法注释** - JSDoc 格式
2. **复杂业务流程注释** - 说明处理步骤
3. **模块文件级注释** - 说明文件用途

示例：
```typescript
1、函数/方法注释
包含参数说明清晰、返回值结构化、异常情况：列出可能抛出的异常及原因、示例
/**
     * @description 检验商品温区和运输条件，运营参数PACKING_VERIFICATION控
     * @param {Array} itemInfo 扫描商品编码/商品条码/序列号匹配到的商品
     * @param {Object} packageItem 当前已装箱，但未提交的商品
     * @return {Boolean} 是否校验通过，不通过时会调用_itemErrorRemind提示
     * @throws _throwErrorAccodingToCondition方法抛出错误
     * @example
     * formatCurrency(10000) // '100.00'
     * formatCurrency(10000, 'USD') // '$100.00'
 */
  

2、复杂业务流程注释
包含处理步骤或关键业务规则
/**
     * @description 运单号-处理运单号扫描结果
     *  作业流程
     *  1. 采集运单号：优先级高于确认运单号
     *  2. 确认运单号
     * （1）支持扫描运单号、子运单号、箱号触发关箱
     * （2）支持特殊‘NEXT’码触发关箱
     * （3）支持回车键直接关箱（value 为空，则表示用户按了回车键）
     * （4）支持扫描‘FUNCTIONKEYENTER’直接关箱
*/

3、模块文件级注释
包含模块/文件的主要功能、依赖项、版本记录

/**
	* 数据验证工具模块
	
	* 主要功能:
	*- 输入数据格式验证
	*- 业务规则校验
	*- 数据完整性检查
	
	*依赖项:
	*版本: 2.1.0
	*变更记录:
	*    v2.1.0: 添加批量验证功能
	*    v2.0.0: 重构验证逻辑，支持自定义规则
*/

```

## React 规范

### 组件编写
- 函数组件 + Hooks
- 一个文件一个组件
- Props 要有默认值
- 使用 TypeScript 定义 Props

### Hooks 使用
- useEffect 必须有依赖数组
- 自定义 Hook 文件以 use 开头
- Hook 不能在条件中使用

### 状态管理
[根据你的项目补充 Redux/Context 的规范]

## 其他规范

- 导入顺序：第三方库 → 项目模块 → 相对路径
- 避免 any 类型，使用具体的 TypeScript 类型
- 错误处理要完整，不能忽略错误
