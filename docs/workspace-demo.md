# Workspace Toggle 组件演示

这个页面用于演示和测试 WorkspaceToggle 组件的展开收缩功能。

## 组件演示

<WorkspaceToggle title="基础示例" />

## 收缩高度配置示例

### 显示 60px 高度的内容
<WorkspaceToggle title="学习笔记" :collapsed-height="60">

### 📚 我的学习笔记

这是一个自定义的内容区域，您可以在这里放置：

- **Markdown 语法**: 支持 *斜体*、**粗体**、`代码`
- **列表**: 有序和无序列表
- **链接**: [VitePress 官网](https://vitepress.dev/)
- **代码块**:

```javascript
// 示例代码
const message = "Hello, World!"
console.log(message)
```

> 💡 **提示**: 这个内容区域完全可以自定义！

#### 表格示例

| 功能 | 状态 | 说明 |
|------|------|------|
| 自定义内容 | ✅ | 支持任意 Markdown |
| 响应式 | ✅ | 适配移动端 |
| 主题切换 | ✅ | 明暗主题 |

</WorkspaceToggle>

### 显示 120px 高度的内容
<WorkspaceToggle title="更多内容示例" :collapsed-height="120">

### 🎯 更多内容示例

这个组件配置为收缩时显示 120px 的内容高度。

当内容较多时，收缩状态下仍然可以看到部分内容，给用户更好的预览体验。

- 第一行内容
- 第二行内容  
- 第三行内容
- 第四行内容
- 第五行内容

</WorkspaceToggle>

## 自定义内容示例

下面是一个包含自定义内容的组件实例：

<WorkspaceToggle title="代码示例">

```javascript
async function processModel(input, config) {
  // 构建请求数据
  const requestData = {
    messages: input.messages,
    model: 'deepseek-ai/DeepSeek-V3',
    stream: true,
    max_tokens: 4096,
    temperature: 0.7,
    top_p: 0.9
  };
  
  console.log('SiliconFlow 请求:', requestData);
  
  try {
    // 发送请求到SiliconFlow API
    const response = await fetch(`${config.baseUrl}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`SiliconFlow API 错误 ${response.status}: ${errorText}`);
    }
    
    // 处理流式响应
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    // 返回异步生成器处理流式数据
    return (async function* () {
      let buffer = '';
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          
          // 保留最后一行（可能不完整）
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            if (line.trim() === '') continue;
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') return;
              
              try {
                const parsed = JSON.parse(data);
                if (parsed.choices?.[0]?.delta?.content) {
                  yield parsed.choices[0].delta.content;
                }
              } catch (e) {
                console.warn('解析响应数据失败:', e, data);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    })();
    
  } catch (error) {
    console.error('SiliconFlow API 调用失败:', error);
    throw error;
  }
}
```

</WorkspaceToggle>

## 空内容示例

这个组件使用默认内容：

<WorkspaceToggle title="默认内容" />