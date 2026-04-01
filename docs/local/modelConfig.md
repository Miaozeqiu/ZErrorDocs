# 模型配置

> ZError 2.0.0版本支持了自定义平台与模型。可以自己编写一段JavaScript代码，来实现与模型的交互。下面是一些平台与模型配置。

## 如何自己编写模型配置？

模型配置简单说就是一个函数。接收两个参数，提示词 `input`，平台配置 `config`，返回一个异步生成器，每个迭代器返回一个对象，对象包含两个属性，`content` 和 `finished`。content是模型生成的文本，finished是一个布尔值，用来表示模型是否生成完文本。

## 硅基流动
> baseUrl : https://api.siliconflow.cn/v1/chat/completions  
> 官网 : https://cloud.siliconflow.cn/i/yWzlOTHL  
> 文档 : https://docs.siliconflow.cn/cn/api-reference/chat-completions/chat-completions

<WorkspaceToggle :collapsed-height="120" title="DeepSeek-V3">

``` javascript
async function processModel(input, config) {
  // 构建请求数据
  const requestData = {
    messages: input.messages,
    model: 'deepseek-ai/DeepSeek-V3',
    stream: true,
    max_tokens: 4096,
    temperature: 0.7,
    top_p:0.9
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
          
          if (done) {
            break;
          }
          
          // 解码数据块
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine === '' || trimmedLine === 'data: [DONE]') {
              continue;
            }
            
            if (trimmedLine.startsWith('data: ')) {
              try {
                const jsonStr = trimmedLine.slice(6);
                const data = JSON.parse(jsonStr);
                
                if (data.choices && data.choices[0] && data.choices[0].delta) {
                  const content = data.choices[0].delta.content || '';
                  const finished = data.choices[0].finish_reason === 'stop';
                  
                  if (content || finished) {
                    yield {
                      content: content,
                      finished: finished
                    };
                  }
                }
              } catch (parseError) {
                console.warn('解析SSE数据失败:', parseError, trimmedLine);
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

## 阿里云百炼
> baseUrl : https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions  
> 官网 : https://bailian.console.aliyun.com/  
> 文档 : https://bailian.console.aliyun.com/doc?tab=doc#/doc

<WorkspaceToggle :collapsed-height="120" title="通义千问Plus">

``` javascript
async function processModel(input, config) { 
   // 构建请求数据 
   const requestData = { 
     messages: input.messages, 
     model: 'qwen-plus', 
   }; 
   
   console.log('阿里云百炼 请求:', requestData); 
   
   try { 
     // 发送请求到阿里云百炼 API 
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
       throw new Error(`阿里云百炼 API 错误 ${response.status}: ${errorText}`); 
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
           
           if (done) { 
             break; 
           } 
           
           // 解码数据块 
           buffer += decoder.decode(value, { stream: true }); 
           const lines = buffer.split('\n'); 
           buffer = lines.pop() || ''; 
           
           for (const line of lines) { 
             const trimmedLine = line.trim(); 
             if (trimmedLine === '' || trimmedLine === 'data: [DONE]') { 
               continue; 
             } 
             
             if (trimmedLine.startsWith('data: ')) { 
               try { 
                 const jsonStr = trimmedLine.slice(6); 
                 const data = JSON.parse(jsonStr); 
                 
                 if (data.choices && data.choices[0] && data.choices[0].delta) { 
                   const content = data.choices[0].delta.content || ''; 
                   const finished = data.choices[0].finish_reason === 'stop'; 
                   
                   if (content || finished) { 
                     yield { 
                       content: content, 
                       finished: finished 
                     }; 
                   } 
                 } 
               } catch (parseError) { 
                 console.warn('解析SSE数据失败:', parseError, trimmedLine); 
               } 
             } 
           } 
         } 
       } finally { 
         reader.releaseLock(); 
       } 
     })(); 
     
   } catch (error) { 
     console.error('阿里云百炼 API 调用失败:', error); 
     throw error; 
   } 
 }
```
</WorkspaceToggle>
