# 使用指南

本指南将详细介绍ZError的各种功能和使用方法。

## 错误捕获

### 自动错误捕获

ZError 会自动捕获以下类型的错误：

```javascript
// 1. JavaScript 运行时错误
function buggyFunction() {
  throw new Error('这是一个运行时错误');
}

// 2. Promise 未处理的拒绝
Promise.reject('Promise 被拒绝了');

// 3. 异步函数错误
async function asyncError() {
  throw new Error('异步函数错误');
}

// 4. 网络请求错误
fetch('/api/nonexistent')
  .then(response => {
    if (!response.ok) {
      throw new Error('网络请求失败');
    }
  });
```

### 手动错误捕获

```javascript
// 捕获异常对象
try {
  riskyOperation();
} catch (error) {
  errorHandler.captureError(error, {
    level: 'error',
    tags: { section: 'payment' },
    extra: { userId: '12345' }
  });
}

// 捕获字符串消息
errorHandler.captureMessage('用户执行了无效操作', 'warning', {
  user: { id: '12345', name: 'John' },
  extra: { action: 'invalid_click' }
});

// 捕获自定义错误
errorHandler.captureError(new Error('自定义错误'), {
  fingerprint: ['custom-error', 'payment-module'],
  level: 'fatal'
});
```

## 错误级别

ZError 支持多种错误级别：

```javascript
// 致命错误 - 应用崩溃级别
errorHandler.captureMessage('应用崩溃', 'fatal');

// 错误 - 功能无法正常工作
errorHandler.captureMessage('支付失败', 'error');

// 警告 - 潜在问题
errorHandler.captureMessage('API响应缓慢', 'warning');

// 信息 - 一般信息
errorHandler.captureMessage('用户登录', 'info');

// 调试 - 调试信息
errorHandler.captureMessage('调试信息', 'debug');
```

## 上下文信息

### 用户信息

```javascript
// 设置用户信息
errorHandler.setUser({
  id: '12345',
  email: 'user@example.com',
  username: 'john_doe',
  name: 'John Doe',
  ip_address: '192.168.1.1'
});

// 更新用户信息
errorHandler.setUser({ id: '67890' });

// 清除用户信息
errorHandler.setUser(null);
```

### 标签和额外数据

```javascript
// 设置全局标签
errorHandler.setTags({
  environment: 'production',
  version: '1.2.3',
  feature: 'checkout'
});

// 设置额外数据
errorHandler.setExtra({
  buildNumber: '12345',
  gitCommit: 'abc123',
  serverRegion: 'us-east-1'
});

// 在捕获错误时添加特定上下文
errorHandler.captureError(error, {
  tags: { component: 'payment-form' },
  extra: { 
    formData: { amount: 100, currency: 'USD' },
    timestamp: Date.now()
  }
});
```

### 面包屑导航

```javascript
// 添加面包屑
errorHandler.addBreadcrumb({
  message: '用户点击了支付按钮',
  category: 'ui.click',
  level: 'info',
  data: {
    element: 'pay-button',
    amount: 100
  }
});

// 自动面包屑（需要启用）
errorHandler.configure({
  autoBreadcrumbs: {
    console: true,    // 控制台输出
    dom: true,        // DOM 事件
    xhr: true,        // XHR 请求
    location: true,   // 页面导航
    history: true     // 历史记录变化
  }
});
```

## 错误过滤和采样

### 错误过滤

```javascript
const errorHandler = new ZError({
  // 忽略特定错误消息
  ignoreErrors: [
    'Script error.',
    'Non-Error promise rejection captured',
    /ResizeObserver loop limit exceeded/
  ],
  
  // 忽略特定URL的错误
  ignoreUrls: [
    /extensions\//i,
    /^chrome:\/\//i,
    'https://example.com/ignore'
  ],
  
  // 自定义过滤函数
  beforeSend: (event) => {
    // 过滤掉开发环境的错误
    if (event.environment === 'development') {
      return null;
    }
    
    // 过滤掉特定用户的错误
    if (event.user && event.user.id === 'test-user') {
      return null;
    }
    
    // 修改错误数据
    if (event.exception) {
      event.exception.values.forEach(exception => {
        exception.stacktrace.frames.forEach(frame => {
          // 移除敏感信息
          delete frame.vars;
        });
      });
    }
    
    return event;
  }
});
```

### 采样配置

```javascript
const errorHandler = new ZError({
  // 全局采样率（0-1之间）
  sampleRate: 0.1, // 只采样10%的错误
  
  // 基于错误级别的采样
  sampleRates: {
    fatal: 1.0,    // 100% 采样致命错误
    error: 0.5,    // 50% 采样普通错误
    warning: 0.1,  // 10% 采样警告
    info: 0.01,    // 1% 采样信息
    debug: 0       // 不采样调试信息
  },
  
  // 动态采样
  shouldSample: (event) => {
    // 总是采样生产环境的错误
    if (event.environment === 'production') {
      return true;
    }
    
    // 基于用户ID采样
    if (event.user && event.user.id) {
      const hash = simpleHash(event.user.id);
      return hash % 10 === 0; // 10% 采样
    }
    
    return Math.random() < 0.1;
  }
});
```

## 性能监控

### 性能指标收集

```javascript
// 启用性能监控
const errorHandler = new ZError({
  performance: {
    enabled: true,
    
    // 监控的性能指标
    metrics: {
      navigation: true,    // 页面导航性能
      resources: true,     // 资源加载性能
      paint: true,         // 绘制性能
      layout: true         // 布局性能
    },
    
    // 性能阈值
    thresholds: {
      fcp: 2000,          // First Contentful Paint
      lcp: 4000,          // Largest Contentful Paint
      fid: 100,           // First Input Delay
      cls: 0.1            // Cumulative Layout Shift
    }
  }
});

// 手动记录性能指标
errorHandler.addPerformanceEntry({
  name: 'api-call',
  startTime: performance.now(),
  duration: 150,
  entryType: 'measure'
});
```

### 自定义性能监控

```javascript
// 监控函数执行时间
function measureFunction(fn, name) {
  return function(...args) {
    const start = performance.now();
    const result = fn.apply(this, args);
    const duration = performance.now() - start;
    
    errorHandler.addBreadcrumb({
      message: `函数 ${name} 执行完成`,
      category: 'performance',
      data: { duration, name }
    });
    
    if (duration > 1000) {
      errorHandler.captureMessage(
        `函数 ${name} 执行时间过长: ${duration}ms`,
        'warning'
      );
    }
    
    return result;
  };
}

// 使用示例
const slowFunction = measureFunction(function() {
  // 一些可能很慢的操作
}, 'slowFunction');
```

## 集成第三方服务

### 与日志服务集成

```javascript
const errorHandler = new ZError({
  integrations: [
    // 集成到 Sentry
    new ZError.Integrations.Sentry({
      dsn: 'your-sentry-dsn'
    }),
    
    // 集成到 LogRocket
    new ZError.Integrations.LogRocket({
      appID: 'your-logrocket-app-id'
    }),
    
    // 自定义集成
    {
      name: 'CustomLogger',
      setupOnce: () => {
        errorHandler.addEventProcessor((event) => {
          // 发送到自定义日志服务
          fetch('/api/logs', {
            method: 'POST',
            body: JSON.stringify(event)
          });
          return event;
        });
      }
    }
  ]
});
```

## 调试和测试

### 调试模式

```javascript
const errorHandler = new ZError({
  debug: true,  // 启用调试模式
  
  // 自定义调试输出
  debugLogger: {
    log: (message, data) => {
      console.log(`[ZError] ${message}`, data);
    },
    warn: (message, data) => {
      console.warn(`[ZError] ${message}`, data);
    },
    error: (message, data) => {
      console.error(`[ZError] ${message}`, data);
    }
  }
});
```

### 测试错误处理

```javascript
// 测试不同类型的错误
function testErrorHandling() {
  // 测试同步错误
  try {
    throw new Error('测试同步错误');
  } catch (e) {
    errorHandler.captureError(e);
  }
  
  // 测试异步错误
  setTimeout(() => {
    throw new Error('测试异步错误');
  }, 100);
  
  // 测试 Promise 错误
  Promise.reject(new Error('测试 Promise 错误'));
  
  // 测试网络错误
  fetch('/nonexistent-endpoint')
    .catch(error => {
      errorHandler.captureError(error);
    });
}

// 在开发环境中运行测试
if (process.env.NODE_ENV === 'development') {
  window.testZError = testErrorHandling;
}
```

## 最佳实践

### 1. 合理设置错误级别

```javascript
// ❌ 错误的做法
errorHandler.captureMessage('用户点击按钮', 'error');

// ✅ 正确的做法
errorHandler.captureMessage('用户点击按钮', 'info');
errorHandler.captureMessage('支付处理失败', 'error');
errorHandler.captureMessage('应用崩溃', 'fatal');
```

### 2. 提供有用的上下文

```javascript
// ❌ 缺少上下文
errorHandler.captureError(error);

// ✅ 提供丰富的上下文
errorHandler.captureError(error, {
  tags: {
    component: 'checkout',
    step: 'payment'
  },
  extra: {
    userId: user.id,
    orderId: order.id,
    paymentMethod: 'credit_card',
    amount: order.total
  },
  user: {
    id: user.id,
    email: user.email
  }
});
```

### 3. 避免敏感信息泄露

```javascript
const errorHandler = new ZError({
  beforeSend: (event) => {
    // 移除敏感信息
    if (event.extra) {
      delete event.extra.password;
      delete event.extra.creditCard;
      delete event.extra.ssn;
    }
    
    // 脱敏处理
    if (event.user && event.user.email) {
      event.user.email = event.user.email.replace(
        /(.{2}).*(@.*)/,
        '$1***$2'
      );
    }
    
    return event;
  }
});
```

### 4. 合理使用采样

```javascript
// 根据环境和用户类型设置不同的采样率
const getSampleRate = () => {
  if (process.env.NODE_ENV === 'development') {
    return 1.0; // 开发环境100%采样
  }
  
  if (user.isPremium) {
    return 0.5; // 付费用户50%采样
  }
  
  return 0.1; // 普通用户10%采样
};

const errorHandler = new ZError({
  sampleRate: getSampleRate()
});
```

通过遵循这些指南和最佳实践，您可以充分利用ZError的强大功能，构建更加稳定和可靠的应用程序。