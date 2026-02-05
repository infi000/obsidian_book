# 常见问题排查

遇到问题？按流程排查。

## 安装和启动问题

### 问题 1: npm install 失败

**症状**
```
npm ERR! code E404
npm ERR! 404 Not Found
```

**可能原因**
- npm 源配置有问题
- 网络连接问题
- 版本冲突

**解决方案**

1. 清空缓存：
   ```bash
   npm cache clean --force
   ```

2. 使用淘宝源（如果网络慢）：
   ```bash
   npm config set registry https://registry.npmmirror.com
   ```

3. 删除 node_modules 和 lock 文件重新安装：
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### 问题 2: 开发服务器无法启动

**症状**
```
Port 3000 is already in use
```

**解决方案**

方案 1：杀死占用端口的进程
```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

方案 2：使用其他端口
```bash
PORT=3001 npm run dev
```

### 问题 3: Module not found 错误

**症状**
```
Module not found: Can't resolve 'react-router-dom'
```

**解决方案**
```bash
# 重新安装依赖
npm install

# 或者安装缺失的包
npm install react-router-dom
```

## 开发问题

### 问题 4: 修改代码后页面不更新

**原因**
- 热重载没有启用
- 修改的文件不被监听

**解决方案**
1. 检查开发服务器是否正常运行
2. 重启开发服务器
3. 硬刷新浏览器（Cmd+Shift+R）

### 问题 5: 样式不生效

**原因**
- CSS Modules 命名错误
- 选择器优先级问题

**解决方案**
```typescript
// ✅ 正确用法
import styles from './App.module.css'

export default function App() {
  return <div className={styles.container}>...</div>
}

// ❌ 错误用法
import './App.css'
export default function App() {
  return <div className="container">...</div>
}
```

## 常见错误消息

| 错误消息 | 原因 | 解决方案 |
|---------|------|--------|
| `Cannot find module` | 导入路径错误 | 检查文件路径 |
| `Property does not exist on type` | TypeScript 类型错误 | 检查类型定义 |
| `Unexpected token` | 语法错误 | 查看错误行号，修复语法 |

## 获取帮助

- 查看项目 GitHub Issues
- 联系团队 Lead
- 查看相关文档

---

**还有其他问题？**

1. 先在这里搜索问题关键词
2. 查看 [[../../06_reference-guide/GUIDE|常见问题]] 中的 FAQ
3. 联系团队
