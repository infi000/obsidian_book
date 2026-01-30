原文在：https://geminicli.com/docs/tools/mcp-server/

# 使用Gemini CLI的MCP服务器

本文档提供了配置和使用模型上下文协议(MCP)服务器与Gemini CLI的指南。

## 什么是MCP服务器？

MCP服务器是一个应用程序，通过模型上下文协议向Gemini CLI公开工具和资源，使其能够与外部系统和数据源进行交互。MCP服务器充当Gemini模型和你的本地环境或其他服务(如API)之间的桥梁。

MCP服务器使Gemini CLI能够：

- **发现工具：** 通过标准化的模式定义列出可用工具、其描述和参数。
- **执行工具：** 调用特定工具并使用已定义的参数获取结构化响应。
- **访问资源：** 从服务器公开的特定资源中读取数据(文件、API有效负载、报告等)。

通过MCP服务器，你可以扩展Gemini CLI的功能，执行超越其内置功能的操作，如与数据库、API、自定义脚本或专门工作流交互。

## 核心集成架构

Gemini CLI通过内置于核心包中的复杂发现和执行系统与MCP服务器集成(`packages/core/src/tools/`)：

### 发现层(`mcp-client.ts`)

发现过程由`discoverMcpTools()`协调，其功能包括：

1. **遍历配置的服务器** 从你的`settings.json`的`mcpServers`配置中获取
2. **建立连接** 使用适当的传输机制(Stdio、SSE或可流式HTTP)
3. **获取工具定义** 使用MCP协议从每个服务器获取
4. **清理和验证** 工具模式以确保与Gemini API兼容
5. **在全局工具注册表中注册工具** 进行冲突解决
6. **获取和注册资源** 如果服务器公开任何资源

### 执行层(`mcp-tool.ts`)

每个被发现的MCP工具都包装在`DiscoveredMCPTool`实例中，该实例：

- **处理确认逻辑** 基于服务器信任设置和用户偏好
- **管理工具执行** 通过使用适当参数调用MCP服务器
- **处理响应** 用于LLM上下文和用户显示
- **维护连接状态** 并处理超时

### 传输机制

Gemini CLI支持三种MCP传输类型：

- **Stdio传输：** 生成子进程并通过stdin/stdout进行通信
- **SSE传输：** 连接到Server-Sent Events端点
- **可流式HTTP传输：** 使用HTTP流进行通信

## 处理MCP资源

一些MCP服务器除了公开工具和提示外，还公开上下文"资源"。Gemini CLI会自动发现这些资源，并让你可以在聊天中引用它们。

### 发现和列表

- 当发现运行时，CLI获取每个服务器的`resources/list`结果。
- `/mcp`命令为每个连接的服务器显示资源部分以及工具和提示。

这返回一个简洁的纯文本URI列表加上元数据。

### 在对话中引用资源

你可以使用与引用本地文件相同的`@`语法：

```
@server://resource/path
```

资源URI出现在完成菜单中，与文件系统路径一起。当你提交消息时，CLI调用`resources/read`并将内容注入对话中。

## 如何设置你的MCP服务器

Gemini CLI使用`settings.json`文件中的`mcpServers`配置来定位和连接MCP服务器。此配置支持多个具有不同传输机制的服务器。

### 在settings.json中配置MCP服务器

你可以通过两种主要方式在`settings.json`文件中配置MCP服务器：通过顶级`mcpServers`对象进行特定服务器定义，以及通过`mcp`对象进行控制所有服务器发现和执行的全局设置。

#### 全局MCP设置(`mcp`)

`settings.json`中的`mcp`对象允许你为所有MCP服务器定义全局规则。

- **`mcp.serverCommand`** (字符串)：启动MCP服务器的全局命令。
- **`mcp.allowed`** (字符串数组)：允许的MCP服务器名称列表。如果设置了此项，只有此列表中的服务器(与`mcpServers`对象中的键匹配)才会被连接。
- **`mcp.excluded`** (字符串数组)：要排除的MCP服务器名称列表。此列表中的服务器将不被连接。

**示例：**

```json
{
  "mcp": {
    "allowed": ["my-trusted-server"],
    "excluded": ["experimental-server"]
  }
}
```

#### 特定服务器配置(`mcpServers`)

`mcpServers`对象是你定义要连接的每个MCP服务器的地方。

### 配置结构

将`mcpServers`对象添加到你的`settings.json`文件中：

```json
{ ...file contains other config objects
  "mcpServers": {
    "serverName": {
      "command": "path/to/server",
      "args": ["--arg1", "value1"],
      "env": {
        "API_KEY": "$MY_API_TOKEN"
      },
      "cwd": "./server-directory",
      "timeout": 30000,
      "trust": false
    }
  }
}
```

### 配置属性

每个服务器配置支持以下属性：

#### 必需(以下之一)

- **`command`** (字符串)：Stdio传输的可执行文件路径
- **`url`** (字符串)：SSE端点URL(例如`"http://localhost:8080/sse"`)
- **`httpUrl`** (字符串)：HTTP流端点URL

#### 可选

- **`args`** (字符串[])：Stdio传输的命令行参数
- **`headers`** (对象)：使用`url`或`httpUrl`时的自定义HTTP标头
- **`env`** (对象)：服务器进程的环境变量。值可以使用`$VAR_NAME`或`${VAR_NAME}`语法引用环境变量
- **`cwd`** (字符串)：Stdio传输的工作目录
- **`timeout`** (数字)：请求超时，单位毫秒(默认：600,000ms = 10分钟)
- **`trust`** (布尔值)：当设为`true`时，绕过此服务器的所有工具调用确认(默认：`false`)
- **`includeTools`** (字符串[])：要从此MCP服务器包含的工具名称列表。指定时，只有此处列出的工具才可用(允许列表行为)。如果未指定，默认启用服务器的所有工具。
- **`excludeTools`** (字符串[])：要从此MCP服务器排除的工具名称列表。此处列出的工具将不可用，即使它们由服务器公开。**注意：** `excludeTools`优先于`includeTools` - 如果工具在两个列表中，它将被排除。
- **`targetAudience`** (字符串)：在你尝试访问的IAP保护应用程序上列入白名单的OAuth客户端ID。与`authProviderType: 'service_account_impersonation'`配合使用。
- **`targetServiceAccount`** (字符串)：要模拟的Google Cloud服务账户的电子邮件地址。与`authProviderType: 'service_account_impersonation'`配合使用。

### 远程MCP服务器的OAuth支持

Gemini CLI使用SSE或HTTP传输为远程MCP服务器支持OAuth 2.0身份验证。这使得对需要身份验证的MCP服务器的安全访问成为可能。

#### 自动OAuth发现

对于支持OAuth发现的服务器，你可以省略OAuth配置并让CLI自动发现它：

```json
{
  "mcpServers": {
    "discoveredServer": {
      "url": "https://api.example.com/sse"
    }
  }
}
```

CLI将自动：

- 检测服务器何时需要OAuth身份验证(401响应)
- 从服务器元数据发现OAuth端点
- 执行动态客户端注册(如果支持)
- 处理OAuth流和令牌管理

#### 身份验证流程

连接到启用OAuth的服务器时：

1. **初始连接尝试** 失败，返回401 Unauthorized
2. **OAuth发现** 找到授权和令牌端点
3. **浏览器打开** 进行用户身份验证(需要本地浏览器访问)
4. **授权代码** 被交换为访问令牌
5. **令牌被存储** 以供将来使用
6. **连接重试** 成功，使用有效的令牌

#### 浏览器重定向要求

**重要：** OAuth身份验证要求你的本地机器能够：

- 打开用于身份验证的网络浏览器
- 在`http://localhost:7777/oauth/callback`上接收重定向

此功能在以下情况下不适用：

- 无浏览器访问的无头环境
- 无X11转发的远程SSH会话
- 无浏览器支持的容器化环境

#### 管理OAuth身份验证

使用`/mcp auth`命令管理OAuth身份验证：

```bash
# 列出需要身份验证的服务器
/mcp auth

# 与特定服务器进行身份验证
/mcp auth serverName

# 如果令牌过期，重新进行身份验证
/mcp auth serverName
```

#### OAuth配置属性

- **`enabled`** (布尔值)：为此服务器启用OAuth
- **`clientId`** (字符串)：OAuth客户端标识符(动态注册时可选)
- **`clientSecret`** (字符串)：OAuth客户端密钥(公共客户端可选)
- **`authorizationUrl`** (字符串)：OAuth授权端点(如果省略则自动发现)
- **`tokenUrl`** (字符串)：OAuth令牌端点(如果省略则自动发现)
- **`scopes`** (字符串[])：所需的OAuth作用域
- **`redirectUri`** (字符串)：自定义重定向URI(默认为`http://localhost:7777/oauth/callback`)
- **`tokenParamName`** (字符串)：SSE URL中令牌的查询参数名称
- **`audiences`** (字符串[])：令牌有效的受众

#### 令牌管理

OAuth令牌自动：

- **安全存储** 在`~/.gemini/mcp-oauth-tokens.json`中
- **刷新** 当过期时(如果可用刷新令牌)
- **验证** 在每次连接尝试前
- **清理** 当无效或过期时

#### 身份验证提供者类型

你可以使用`authProviderType`属性指定身份验证提供者类型：

- **`authProviderType`** (字符串)：指定身份验证提供者。可以是以下之一：
  - **`dynamic_discovery`** (默认)：CLI将自动从服务器发现OAuth配置。
  - **`google_credentials`**：CLI将使用Google应用默认凭证(ADC)与服务器进行身份验证。使用此提供者时，你必须指定所需的作用域。
  - **`service_account_impersonation`**：CLI将模拟Google Cloud服务账户与服务器进行身份验证。这对访问IAP保护的服务很有用(此功能专为Cloud Run服务设计)。

#### Google凭证

```json
{
  "mcpServers": {
    "googleCloudServer": {
      "httpUrl": "https://my-gcp-service.run.app/mcp",
      "authProviderType": "google_credentials",
      "oauth": {
        "scopes": ["https://www.googleapis.com/auth/userinfo.email"]
      }
    }
  }
}
```

#### 服务账户模拟

要使用服务账户模拟与服务器进行身份验证，你必须将`authProviderType`设置为`service_account_impersonation`并提供以下属性：

- **`targetAudience`** (字符串)：在你尝试访问的IAP保护应用程序上列入白名单的OAuth客户端ID。
- **`targetServiceAccount`** (字符串)：要模拟的Google Cloud服务账户的电子邮件地址。

CLI将使用你的本地应用默认凭证(ADC)为指定的服务账户和受众生成OIDC ID令牌。此令牌将用于与MCP服务器进行身份验证。

#### 设置说明

1. **[创建](https://cloud.google.com/iap/docs/oauth-client-creation)或使用现有的OAuth 2.0客户端ID。** 要使用现有OAuth 2.0客户端ID，请按照[如何共享OAuth客户端](https://cloud.google.com/iap/docs/sharing-oauth-clients)中的步骤进行操作。
2. **将OAuth ID添加到应用程序的[程序化访问](https://cloud.google.com/iap/docs/sharing-oauth-clients#programmatic_access)白名单。** 由于Cloud Run目前不是gcloud iap中支持的资源类型，你必须在项目中将客户端ID列入白名单。
3. **创建服务账户。** [文档](https://cloud.google.com/iam/docs/service-accounts-create#creating)、[Cloud Console链接](https://console.cloud.google.com/iam-admin/serviceaccounts)
4. **将服务账户和用户添加到IAP策略** 在Cloud Run服务的"安全"选项卡中或通过gcloud。
5. **授予所有用户和组** 他们需要[模拟服务账户](https://cloud.google.com/docs/authentication/use-service-account-impersonation)的必要权限(即`roles/iam.serviceAccountTokenCreator`)。
6. **[启用](https://console.cloud.google.com/apis/library/iamcredentials.googleapis.com)** 项目的IAM凭证API。

### 示例配置

#### Python MCP服务器(stdio)

```json
{
  "mcpServers": {
    "pythonTools": {
      "command": "python",
      "args": ["-m", "my_mcp_server", "--port", "8080"],
      "cwd": "./mcp-servers/python",
      "env": {
        "DATABASE_URL": "$DB_CONNECTION_STRING",
        "API_KEY": "${EXTERNAL_API_KEY}"
      },
      "timeout": 15000
    }
  }
}
```

#### Node.js MCP服务器(stdio)

```json
{
  "mcpServers": {
    "nodeServer": {
      "command": "node",
      "args": ["dist/server.js", "--verbose"],
      "cwd": "./mcp-servers/node",
      "trust": true
    }
  }
}
```

#### 基于Docker的MCP服务器

```json
{
  "mcpServers": {
    "dockerizedServer": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "API_KEY",
        "-v",
        "${PWD}:/workspace",
        "my-mcp-server:latest"
      ],
      "env": {
        "API_KEY": "$EXTERNAL_SERVICE_TOKEN"
      }
    }
  }
}
```

#### 基于HTTP的MCP服务器

```json
{
  "mcpServers": {
    "httpServer": {
      "httpUrl": "http://localhost:3000/mcp",
      "timeout": 5000
    }
  }
}
```

#### 带有自定义标头的基于HTTP的MCP服务器

```json
{
  "mcpServers": {
    "httpServerWithAuth": {
      "httpUrl": "http://localhost:3000/mcp",
      "headers": {
        "Authorization": "Bearer your-api-token",
        "X-Custom-Header": "custom-value",
        "Content-Type": "application/json"
      },
      "timeout": 5000
    }
  }
}
```

#### 带有工具过滤的MCP服务器

```json
{
  "mcpServers": {
    "filteredServer": {
      "command": "python",
      "args": ["-m", "my_mcp_server"],
      "includeTools": ["safe_tool", "file_reader", "data_processor"],
      // "excludeTools": ["dangerous_tool", "file_deleter"],
      "timeout": 30000
    }
  }
}
```

### 带有SA模拟的SSE MCP服务器

```json
{
  "mcpServers": {
    "myIapProtectedServer": {
      "url": "https://my-iap-service.run.app/sse",
      "authProviderType": "service_account_impersonation",
      "targetAudience": "YOUR_IAP_CLIENT_ID.apps.googleusercontent.com",
      "targetServiceAccount": "your-sa@your-project.iam.gserviceaccount.com"
    }
  }
}
```

## 发现过程深入探讨

当Gemini CLI启动时，它通过以下详细过程执行MCP服务器发现：

### 1. 服务器迭代和连接

对于`mcpServers`中配置的每个服务器：

1. **开始状态跟踪：** 服务器状态设置为`CONNECTING`
2. **传输选择：** 基于配置属性：
   - `httpUrl` → `StreamableHTTPClientTransport`
   - `url` → `SSEClientTransport`
   - `command` → `StdioClientTransport`
3. **建立连接：** MCP客户端尝试使用配置的超时进行连接
4. **错误处理：** 连接失败被记录，服务器状态设置为`DISCONNECTED`

### 2. 工具发现

成功连接后：

1. **工具列表：** 客户端调用MCP服务器的工具列表端点
2. **模式验证：** 每个工具的函数声明都被验证
3. **工具过滤：** 工具根据`includeTools`和`excludeTools`配置进行过滤
4. **名称清理：** 工具名称被清理以满足Gemini API要求：
   - 无效字符(非字母数字、下划线、点、连字符)被替换为下划线
   - 长于63个字符的名称被截断并进行中间替换(`___`)

### 3. 冲突解决

当多个服务器公开具有相同名称的工具时：

1. **首次注册获胜：** 首个注册工具名称的服务器获得不带前缀的名称
2. **自动前缀：** 后续服务器获得带前缀的名称：`serverName__toolName`
3. **注册表跟踪：** 工具注册表维护服务器名称和其工具之间的映射

### 4. 模式处理

工具参数模式经历Gemini API兼容性清理：

- **`$schema`属性** 被移除
- **`additionalProperties`** 被删除
- **`anyOf`与`default`** 移除其默认值(Vertex AI兼容性)
- **递归处理** 应用于嵌套模式

### 5. 连接管理

发现后：

- **持久连接：** 成功注册工具的服务器维护其连接
- **清理：** 不提供任何可用工具的服务器的连接被关闭
- **状态更新：** 最终服务器状态设置为`CONNECTED`或`DISCONNECTED`

## 工具执行流程

当Gemini模型决定使用MCP工具时，发生以下执行流程：

### 1. 工具调用

模型生成`FunctionCall`，包含：

- **工具名称：** 注册名称(可能带前缀)
- **参数：** 与工具参数模式匹配的JSON对象

### 2. 确认过程

每个`DiscoveredMCPTool`实现复杂的确认逻辑：

#### 基于信任的绕过

```typescript
if (this.trust) {
  return false; // 不需要确认
}
```

#### 动态允许列表

系统维护以下内部允许列表：

- **服务器级别：** `serverName` → 此服务器的所有工具都受信任
- **工具级别：** `serverName.toolName` → 此特定工具受信任

#### 用户选择处理

需要确认时，用户可以选择：

- **仅此次执行：** 这次执行后不再提示
- **总是允许此工具：** 添加到工具级别的允许列表
- **总是允许此服务器：** 添加到服务器级别的允许列表
- **取消：** 中止执行

### 3. 执行

确认后(或信任绕过)：

1. **参数准备：** 参数根据工具的模式进行验证
2. **MCP调用：** 底层`CallableTool`使用以下方式调用服务器：

   ```typescript
   const functionCalls = [
     {
       name: this.serverToolName, // 原始服务器工具名称
       args: params,
     },
   ];
   ```

3. **响应处理：** 结果被格式化为LLM上下文和用户显示

### 4. 响应处理

执行结果包含：

- **`llmContent`：** 语言模型上下文的原始响应部分
- **`returnDisplay`：** 用户显示的格式化输出(通常是markdown代码块中的JSON)

## 如何与你的MCP服务器交互

### 使用`/mcp`命令

`/mcp`命令提供有关MCP服务器设置的全面信息：

```bash
/mcp
```

这显示：

- **服务器列表：** 所有配置的MCP服务器
- **连接状态：** `CONNECTED`、`CONNECTING`或`DISCONNECTED`
- **服务器详细信息：** 配置摘要(排除敏感数据)
- **可用工具：** 来自每个服务器的工具列表及其描述
- **发现状态：** 整体发现过程状态

### 示例`/mcp`输出

```
MCP服务器状态：

📡 pythonTools (已连接)
  命令: python -m my_mcp_server --port 8080
  工作目录: ./mcp-servers/python
  超时: 15000ms
  工具: calculate_sum, file_analyzer, data_processor

🔌 nodeServer (已断开)
  命令: node dist/server.js --verbose
  错误: 连接被拒绝

🐳 dockerizedServer (已连接)
  命令: docker run -i --rm -e API_KEY my-mcp-server:latest
  工具: docker__deploy, docker__status

发现状态: 已完成
```

### 工具使用

一旦被发现，MCP工具对Gemini模型可用，就像内置工具一样。模型将自动：

1. **选择适当的工具** 基于你的请求
2. **显示确认对话框** (除非服务器受信任)
3. **执行工具** 使用适当的参数
4. **显示结果** 以用户友好的格式

## 状态监控和故障排除

### 连接状态

MCP集成跟踪几种状态：

#### 服务器状态(`MCPServerStatus`)

- **`DISCONNECTED`：** 服务器未连接或有错误
- **`CONNECTING`：** 连接尝试进行中
- **`CONNECTED`：** 服务器已连接并准备就绪

#### 发现状态(`MCPDiscoveryState`)

- **`NOT_STARTED`：** 发现尚未开始
- **`IN_PROGRESS`：** 当前正在发现服务器
- **`COMPLETED`：** 发现完成(无论是否有错误)

### 常见问题和解决方案

#### 服务器无法连接

**症状：** 服务器显示`DISCONNECTED`状态

**故障排除：**

1. **检查配置：** 验证`command`、`args`和`cwd`是否正确
2. **手动测试：** 直接运行服务器命令以确保它能工作
3. **检查依赖项：** 确保所有必需的包都已安装
4. **查看日志：** 在CLI输出中查找错误消息
5. **验证权限：** 确保CLI可以执行服务器命令

#### 没有发现工具

**症状：** 服务器连接但没有可用工具

**故障排除：**

1. **验证工具注册：** 确保你的服务器实际注册了工具
2. **检查MCP协议：** 确认你的服务器正确实现MCP工具列表
3. **查看服务器日志：** 检查stderr输出以查找服务器端错误
4. **测试工具列表：** 手动测试你的服务器的工具发现端点

#### 工具无法执行

**症状：** 工具被发现但在执行时失败

**故障排除：**

1. **参数验证：** 确保你的工具接受预期的参数
2. **模式兼容性：** 验证你的输入模式是有效的JSON模式
3. **错误处理：** 检查你的工具是否抛出未处理的异常
4. **超时问题：** 考虑增加`timeout`设置

#### 沙箱兼容性

**症状：** 启用沙箱时MCP服务器失败

**解决方案：**

1. **基于Docker的服务器：** 使用包含所有依赖项的Docker容器
2. **路径可访问性：** 确保服务器可执行文件在沙箱中可用
3. **网络访问：** 配置沙箱以允许必要的网络连接
4. **环境变量：** 验证所需的环境变量被传递

### 调试提示

1. **启用调试模式：** 使用`--debug`运行CLI以获取详细输出
2. **检查stderr：** MCP服务器stderr被捕获并记录(INFO消息被过滤)
3. **测试隔离：** 在集成前独立测试你的MCP服务器
4. **增量设置：** 从简单工具开始，然后添加复杂功能
5. **频繁使用`/mcp`：** 在开发过程中监控服务器状态

## 重要说明

### 安全考虑

- **信任设置：** `trust`选项绕过所有确认对话框。请谨慎使用，仅用于你完全控制的服务器
- **访问令牌：** 配置包含API密钥或令牌的环境变量时要有安全意识
- **沙箱兼容性：** 使用沙箱时，确保MCP服务器在沙箱环境中可用
- **私人数据：** 使用范围广泛的个人访问令牌可能导致存储库之间的信息泄露

### 性能和资源管理

- **连接持久性：** CLI维护与成功注册工具的服务器的持久连接
- **自动清理：** 与不提供任何工具的服务器的连接自动关闭
- **超时管理：** 根据你的服务器的响应特性配置适当的超时
- **资源监控：** MCP服务器作为单独的进程运行并消耗系统资源

### 模式兼容性

- **属性剥离：** 系统自动为Gemini API兼容性移除某些模式属性(`$schema`、`additionalProperties`)
- **名称清理：** 工具名称自动清理以满足API要求
- **冲突解决：** 服务器间的工具名称冲突通过自动前缀解决

这个全面的集成使MCP服务器成为扩展Gemini CLI功能的强大方式，同时保持安全性、可靠性和易用性。

## 从工具返回富文本内容

MCP工具不限于返回简单文本。你可以在单个工具响应中返回丰富的多部分内容，包括文本、图像、音频和其他二进制数据。这使你能够构建强大的工具，在单个回合中提供多样化的信息。

从工具返回的所有数据都被处理并作为其下一个生成的上下文发送到模型，使其能够对所提供的信息进行推理或总结。

### 工作原理

要返回富文本内容，你的工具响应必须遵守MCP规范的[`CallToolResult`](https://modelcontextprotocol.io/specification/2025-06-18/server/tools#tool-result)。结果的`content`字段应该是`ContentBlock`对象的数组。Gemini CLI将正确处理此数组，分离文本和二进制数据，并将其打包供模型使用。

你可以在`content`数组中混合和匹配不同的内容块类型。支持的块类型包括：

- `text`
- `image`
- `audio`
- `resource`(嵌入式内容)
- `resource_link`

### 示例：返回文本和图像

以下是MCP工具的有效JSON响应示例，该响应同时返回文本描述和图像：

```json
{
  "content": [
    {
      "type": "text",
      "text": "Here is the logo you requested."
    },
    {
      "type": "image",
      "data": "BASE64_ENCODED_IMAGE_DATA_HERE",
      "mimeType": "image/png"
    },
    {
      "type": "text",
      "text": "The logo was created in 2025."
    }
  ]
}
```

当Gemini CLI收到此响应时，它将：

1. 提取所有文本并将其合并为模型的单个`functionResponse`部分。
2. 将图像数据呈现为单独的`inlineData`部分。
3. 在CLI中提供清洁、用户友好的摘要，指示收到了文本和图像。

这使你能够构建复杂的工具，可以为Gemini模型提供丰富的多模式上下文。

## MCP提示作为斜杠命令

除了工具外，MCP服务器还可以公开预定义的提示，可以在Gemini CLI中作为斜杠命令执行。这使你能够为可以通过名称轻松调用的常见或复杂查询创建快捷方式。

### 在服务器上定义提示

以下是定义提示的小型stdio MCP服务器示例：

```ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'prompt-server',
  version: '1.0.0',
});

server.registerPrompt(
  'poem-writer',
  {
    title: 'Poem Writer',
    description: 'Write a nice haiku',
    argsSchema: { title: z.string(), mood: z.string().optional() },
  },
  ({ title, mood }) => ({
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Write a haiku${mood ? ` with the mood ${mood}` : ''} called ${title}. Note that a haiku is 5 syllables followed by 7 syllables followed by 5 syllables `,
        },
      },
    ],
  }),
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

这可以包含在`settings.json`中的`mcpServers`下，如下所示：

```json
{
  "mcpServers": {
    "nodeServer": {
      "command": "node",
      "args": ["filename.ts"]
    }
  }
}
```

### 调用提示

一旦发现提示，你可以使用其名称作为斜杠命令调用它。CLI将自动处理参数解析。

```bash
/poem-writer --title="Gemini CLI" --mood="reverent"
```

或使用位置参数：

```bash
/poem-writer "Gemini CLI" reverent
```

运行此命令时，Gemini CLI在MCP服务器上执行`prompts/get`方法，并使用提供的参数。服务器负责将参数替换到提示模板中并返回最终提示文本。然后CLI将此提示发送到模型以供执行。这提供了一种自动化和共享常见工作流的便捷方式。

## 使用`gemini mcp`管理MCP服务器

虽然你始终可以通过手动编辑`settings.json`文件来配置MCP服务器，但Gemini CLI提供了一套便捷的命令来以编程方式管理你的服务器配置。这些命令简化了添加、列表和删除MCP服务器的过程，而无需直接编辑JSON文件。

### 添加服务器(`gemini mcp add`)

`add`命令在你的`settings.json`中配置新的MCP服务器。根据范围(`-s, --scope`)，它将被添加到用户配置`~/.gemini/settings.json`或项目配置`.gemini/settings.json`文件中。

**命令：**

```bash
gemini mcp add [options] <name> <commandOrUrl> [args...]
```

- `<name>`：服务器的唯一名称。
- `<commandOrUrl>`：执行命令(用于`stdio`)或URL(用于`http`/`sse`)。
- `[args...]`：`stdio`命令的可选参数。

**选项(标志)：**

- `-s, --scope`：配置范围(user或project)。[默认："project"]
- `-t, --transport`：传输类型(stdio、sse、http)。[默认："stdio"]
- `-e, --env`：设置环境变量(例如-e KEY=value)。
- `-H, --header`：为SSE和HTTP传输设置HTTP标头(例如-H "X-Api-Key: abc123" -H "Authorization: Bearer abc123")。
- `--timeout`：设置连接超时，单位毫秒。
- `--trust`：信任服务器(绕过所有工具调用确认提示)。
- `--description`：设置服务器的描述。
- `--include-tools`：要包含的工具名称的逗号分隔列表。
- `--exclude-tools`：要排除的工具名称的逗号分隔列表。

#### 添加stdio服务器

这是运行本地服务器的默认传输。

```bash
# 基本语法
gemini mcp add [options] <name> <command> [args...]

# 示例：添加本地服务器
gemini mcp add -e API_KEY=123 -e DEBUG=true my-stdio-server /path/to/server arg1 arg2 arg3

# 示例：添加本地python服务器
gemini mcp add python-server python server.py -- --server-arg my-value
```

#### 添加HTTP服务器

此传输用于使用可流式HTTP传输的服务器。

```bash
# 基本语法
gemini mcp add --transport http <name> <url>

# 示例：添加HTTP服务器
gemini mcp add --transport http http-server https://api.example.com/mcp/

# 示例：使用身份验证标头添加HTTP服务器
gemini mcp add --transport http --header "Authorization: Bearer abc123" secure-http https://api.example.com/mcp/
```

#### 添加SSE服务器

此传输用于使用Server-Sent Events(SSE)的服务器。

```bash
# 基本语法
gemini mcp add --transport sse <name> <url>

# 示例：添加SSE服务器
gemini mcp add --transport sse sse-server https://api.example.com/sse/

# 示例：使用身份验证标头添加SSE服务器
gemini mcp add --transport sse --header "Authorization: Bearer abc123" secure-sse https://api.example.com/sse/
```

### 列表服务器(`gemini mcp list`)

要查看当前配置的所有MCP服务器，请使用`list`命令。它显示每个服务器的名称、配置详细信息和连接状态。此命令没有标志。

**命令：**

```bash
gemini mcp list
```

**示例输出：**

```sh
✓ stdio-server: command: python3 server.py (stdio) - 已连接
✓ http-server: https://api.example.com/mcp (http) - 已连接
✗ sse-server: https://api.example.com/sse (sse) - 已断开
```

### 删除服务器(`gemini mcp remove`)

要从你的配置中删除服务器，请使用`remove`命令和服务器的名称。

**命令：**

```bash
gemini mcp remove <name>
```

**选项(标志)：**

- `-s, --scope`：配置范围(user或project)。[默认："project"]

**示例：**

```bash
gemini mcp remove my-server
```

这将从基于范围(`-s, --scope`)的适当`settings.json`文件中的`mcpServers`对象中查找并删除"my-server"条目。

## 说明

Gemini CLI支持[MCP服务器说明](https://modelcontextprotocol.io/specification/2025-06-18/schema#initializeresult)，这些说明将被附加到系统说明中。