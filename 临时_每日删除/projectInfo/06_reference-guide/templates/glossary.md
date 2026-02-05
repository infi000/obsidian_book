# 术语表

项目中使用的专业术语和定义。

## A

**API** - Application Programming Interface（应用程序接口）
- 应用程序之间进行通信的标准
- 在本项目中通常指 REST API

**Axios** - HTTP 客户端库
- 用于发送 HTTP 请求
- 比 fetch API 功能更完整

## B

**Bundle** - 打包后的代码
- 所有 JavaScript/CSS 代码打包成一个或多个文件
- 用于部署到服务器

**Babel** - JavaScript 转译器
- 将现代 JavaScript 转译成浏览器兼容的代码
- 支持 JSX、TypeScript 等

## C

**CI/CD** - Continuous Integration / Continuous Deployment（持续集成/持续部署）
- 自动化测试和部署流程
- 提交代码后自动运行测试和部署

**Components** - React 组件
- UI 的基本单位
- 可以是函数组件或类组件

**Context** - React Context API
- 跨层级传递数据的方案
- 避免 prop drilling

**CSS Modules** - CSS 模块化
- 将 CSS 样式限制在单个组件范围内
- 避免全局样式污染

## D

**Dependencies** - 依赖
- 项目使用的外部库
- 在 package.json 中定义

## E

**ESLint** - 代码检查工具
- 检查代码是否符合规范
- 自动修复某些问题

**Environment Variables** - 环境变量
- 根据不同环境（开发/生产）的配置
- 在 .env 文件中定义

## H

**Hook** - React Hook
- 函数组件中使用状态和生命周期的方法
- 例如：useState, useEffect, useContext

**Hot Module Replacement** - 热模块替换
- 修改代码后自动更新页面，无需刷新

## J

**JSDoc** - JavaScript 文档
- 函数和变量的说明文档
- 用于生成 API 文档

**JSX** - JavaScript XML
- 在 JavaScript 中写 HTML 标签的语法
- React 的核心概念

## M

**Module** - 模块
- 独立的代码单位
- 可以被导入和使用

## P

**Package.json** - 项目配置文件
- 定义项目名称、版本、依赖等
- npm 根据此文件安装依赖

**Prettier** - 代码格式化工具
- 自动格式化代码
- 团队成员的代码格式保持一致

**Props** - React 组件属性
- 从父组件传递给子组件的数据
- 只读，不能修改

**Prop Drilling** - Props 逐层传递
- 多层级组件间传递数据
- 造成代码不够简洁
- 可以用 Context 优化

## R

**Redux** - 状态管理库
- 集中管理应用状态
- 适用于复杂的应用

**Ref** - React 引用
- 直接访问 DOM 元素
- 应谨慎使用

**Render** - 渲染
- 将组件转换为 HTML 并显示在页面上
- React 自动渲染，无需手动调用

## S

**State** - React 状态
- 组件内部的数据
- 状态变化会触发重新渲染

**Storybook** - 组件开发工具
- 独立开发和测试组件
- 生成组件库

## T

**TypeScript** - JavaScript 的超集
- 添加了类型系统
- 提高代码质量和开发效率

## V

**Virtual DOM** - 虚拟 DOM
- React 内部的 DOM 表示
- 用于高效地更新真实 DOM

## W

**Webpack** - 模块打包工具
- 打包 JavaScript、CSS、图片等资源
- 支持代码分割和懒加载

## 按类别查询

### React 相关
- Components, Props, State, Hooks, Context, Ref, Render, Virtual DOM

### 工具相关
- Webpack, Babel, ESLint, Prettier, Storybook, TypeScript

### 项目相关
- API, CI/CD, Environment Variables, Bundle

---

**发现新术语？提交 PR 添加到术语表！**
