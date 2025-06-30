# ZError 接口说明文档


## API 接口详情

### 1. Root 接口 (`/`)

#### 功能描述
Root接口是主要的AI对话接口，负责处理与各种AI提供商的通信，支持流式传输和视觉识别功能。

#### 支持的HTTP方法
- `GET`: 返回基本信息和CORS头
- `HEAD`: 返回响应头信息
- `OPTIONS`: 处理预检请求，返回CORS配置
- `POST`: 主要的AI对话请求

#### 请求格式 (POST)

```json
{
  "model": "模型名称",    //改字段暂时无效，只会调用软件中选择的模型
  "messages": [
    {
      "role": "user",
      "content": "用户消息内容"
    }
  ],
  "stream": true,    //该字段也无效
}
```

#### 请求参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| model | string | 否 | AI模型名称，根据API类型自动设置 |
| messages | array | 是 | 对话消息数组 |
| stream | boolean | 否 | 是否启用流式传输，默认true |

#### 消息格式

**文本消息:**
```json
{
  "role": "user",
  "content": "这是一个文本消息"
}
```

**视觉消息（包含图片）:**
```json
{
  "role": "user",
  "content": [
    {
      "type": "text",
      "text": "请分析这张图片"
    },
    {
      "type": "image_url",
      "image_url": {
        "url": "data:image/jpeg;base64,/9j/4AAQ..."
      }
    }
  ]
}
```

#### 响应格式

**流式响应 (Server-Sent Events):**
```
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive

data: {"choices":[{"delta":{"content":"响应内容"}}]}

data: [DONE]
```

#### 支持的AI提供商

| 提供商 | API类型 | 文本模型 | 视觉模型 |
|--------|---------|----------|----------|
| DeepSeek | deepseek | deepseek-chat | deepseek-vision |
| 阿里云 | aliyun | deepseek-v3 | qwen-vl-max-latest |
| 硅基流动 | siliconflow | deepseek-ai/DeepSeek-V3 | Qwen/Qwen2.5-VL-32B-Instruct |
| 火山引擎 | volcengine | doubao-seed-1-6-250615 | doubao-1.5-vision-pro-250328 |
| freeQwQ | freeqwq | free:QwQ-32B | free:QwQ-32B |

#### 错误处理

- **400 Bad Request**: 请求格式错误或JSON无效
- **401 Unauthorized**: API密钥无效或缺失
- **500 Internal Server Error**: 服务器内部错误
- **503 Service Unavailable**: 上游API服务不可用

### 2. Query 接口 (`/query`)

#### 功能描述
Query接口专门用于处理问答查询，支持缓存机制，可以快速返回已缓存的答案或生成新的AI回答。

#### 支持的HTTP方法
- `GET`: 处理查询请求

#### 请求格式 (GET)

```
GET /query?title=问题标题&options=选项&question_type=问题类型
```

#### 请求参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 问题标题或内容 |
| options | string | 否 | 问题选项（多选题等） |
| question_type | string | 否 | 问题类型标识 |

#### 响应格式

**成功响应:**
```json
{
  "success": true,
  "data": {
    "code" : 1,
    "answer": "AI生成的答案内容",
  }
}
```

**错误响应:**
```json
{
  "success": false,
  "data": {
      "code" : 0,
      "answer": "错误信息",
  }
}
```

#### 缓存机制

- Query接口使用SQLite数据库进行响应缓存
- 相同的问题会优先返回缓存结果


## 使用示例

### 示例1: 发送文本消息到Root接口

```bash
curl -X POST http://localhost:5233/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "你好，请介绍一下自己"
      }
    ]
  }'
```

### 示例2: 使用Query接口查询问题

```bash
curl "http://localhost:5233/query?title=一坤年等于多少年"
```

### 示例3: 发送包含图片的视觉请求

```bash
curl -X POST http://localhost:5233/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "请描述这张图片的内容"
          },
          {
            "type": "image_url",
            "image_url": {
              "url": "data:image/jpeg;base64,/9j/4AAQ..."
            }
          }
        ]
      }
    ],
  }'
```

---

*本文档基于ZError当前版本编写，如有更新请参考最新的代码实现。*