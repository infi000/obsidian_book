
# 常见问题 (FAQ)

项目相关的常见问题和答案。

## 通用问题

### Q: 如何快速上手项目？

A: 按照以下步骤：

1. 查看 [[../../04_guides-guide/GUIDE#quick-start|快速开始]]
2. 安装依赖，启动开发服务器
3. 查看 [[../../04_guides-guide/GUIDE#new-page-template|新页面模板]]
4. 开始开发第一个页面

预计时间：30 分钟

### Q: 项目用什么技术栈？

A: 查看 [[../../01_project-intro-guide/GUIDE|项目介绍]] 中的技术栈说明

## 代码规范问题

### Q: 代码应该怎么写？

A: 查看 [[../../02_standards-guide/GUIDE|开发规范]]，包含：

- 代码规范（[[../../02_standards-guide/GUIDE#code-standards|code-standards]]）
- 命名规范（[[../../02_standards-guide/GUIDE#naming-conventions|naming-conventions]]）

### Q: 如何命名变量、函数、文件？

A: 查看 [[../../02_standards-guide/GUIDE#naming-conventions|命名规范]]

### Q: 注释应该怎么写？

A: 查看 [[../../02_standards-guide/GUIDE#code-standards|代码规范]] 中的注释部分

## 开发流程问题

### Q: 如何提交代码？

A: 按照以下流程：

1. 创建功能分支：`git checkout -b feature/your-feature`
2. 编写代码，遵循 [[../../02_standards-guide/GUIDE|开发规范]]
3. 提交代码：`git commit -m "feat: your message"`
4. 推送：`git push origin feature/your-feature`
5. 创建 PR

详见 [[../../02_standards-guide/GUIDE#git-workflow|Git 规范]]

### Q: PR 应该包含什么？

A: 一个好的 PR 应该：

- 标题清晰简洁（英文）
- 描述包含变更说明（中文）
- 一个 PR 只做一个功能/修复
- CI/CD 测试通过
- 至少一个人 Review 通过

### Q: 如何进行 Code Review？

A: Code Review 时检查：

1. 代码是否遵循 [[../../02_standards-guide/GUIDE|开发规范]]
2. 逻辑是否正确，是否有 bug
3. 性能是否有问题（查看 [[../../03_best-practices-guide/GUIDE|最佳实践]]）
4. 安全性是否有问题（查看 [[../../03_best-practices-guide/GUIDE#security-guidelines|安全指南]]）

## 功能开发问题

### Q: 如何创建新页面？

A: 查看 [[../../04_guides-guide/GUIDE#new-page-template|新页面模板]]，包含：

- 创建步骤
- 文件结构
- 代码模板

### Q: 有现成的代码示例吗？

A: 有！查看 [[../../05_code-examples-guide/GUIDE|代码示例]]，包含：

- 标准页面模板（列表页、详情页、表单页）
- 功能模块（分页、模态框、表单验证）
- 组件模式（自定义 Hook、Context）

### Q: 如何调用 API？

A: 查看 [[../../05_code-examples-guide/GUIDE|代码示例]] 中的 API 服务模块

## 故障排查问题

### Q: npm install 失败怎么办？

A: 查看 [[../../04_guides-guide/GUIDE#troubleshooting|故障排查]] 中的安装问题部分

### Q: 开发服务器无法启动？

A: 查看 [[../../04_guides-guide/GUIDE#troubleshooting|故障排查]] 中的启动问题部分

### Q: 修改代码后页面不更新？

A: 查看 [[../../04_guides-guide/GUIDE#troubleshooting|故障排查]] 中的开发问题部分

## 性能和优化问题

### Q: 如何优化性能？

A: 查看 [[../../03_best-practices-guide/GUIDE#performance-tips|性能优化]]，包含：

- React 性能优化
- 网络优化
- 打包优化

### Q: 列表有 1000+ 项时怎么办？

A: 使用虚拟滚动。查看 [[../../03_best-practices-guide/GUIDE#performance-tips|性能优化]] 中的虚拟滚动部分

## 安全问题

### Q: 如何防护 XSS 攻击？

A: 查看 [[../../03_best-practices-guide/GUIDE#security-guidelines|安全指南]] 中的 XSS 防护部分

### Q: 敏感信息应该怎么存储？

A: 查看 [[../../03_best-practices-guide/GUIDE#security-guidelines|安全指南]] 中的敏感信息保护部分

## 找不到答案？

如果你的问题不在这里：

1. 先查看相关的详细文档
2. 查看项目 GitHub Issues
3. 联系团队 Lead
4. 如果是常见问题，可以提交 PR 添加到 FAQ

---

**发现新问题？提交 PR 帮助他人！**
