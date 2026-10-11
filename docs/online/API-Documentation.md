---
title: ZE题库API文档 - 完整的接口说明和SDK示例
description: ZE题库API的完整文档，包括GET/POST请求方式、JavaScript/Python/PHP SDK示例、OCS配置说明，支持免费题库搜索服务。
head:
  - - meta
    - name: keywords
      content: ZE题库,API文档,题库接口,OCS配置,SDK示例,JavaScript,Python,PHP,网课助手API
  - - meta
    - property: og:title
      content: ZE题库API文档 - 完整的接口说明和SDK示例
  - - meta
    - property: og:description
      content: ZE题库API的完整文档，包括GET/POST请求方式、JavaScript/Python/PHP SDK示例、OCS配置说明，支持免费题库搜索服务
---

# API 文档

> 📚 ZE题库API接口的具体说明

## 接口详情

### 查询题目答案

**接口地址**: `https://api.zaizhexue.top/api/query`

**请求方式**: GET / POST

- **响应格式**: JSON

#### GET 请求方式

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| token | string | 是 | 用户认证令牌 |
| title | string | 是 | 题目标题 |
| options | string | 否 | 题目选项，选择题使用，每个选项用换行分隔|
| type | string | 否 | 题目类型标识 最好为英文(single multiple judgement completion)|

**请求示例**:
```
GET https://api.zaizhexue.top/api/query?token=your_token&title=题目内容&options=选项内容&type=题目类型
```

#### POST 请求方式

**请求头**:
```
Content-Type: application/json
Authorization: Bearer your_token_here
```

**请求参数** (JSON格式):

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 是 | 题目标题/问题内容，保持原文 |
| options | string | 否 | 题目选项，多选题时使用 |
| type | string | 否 | 题目类型标识 |
| v | string | 否 | 协议版本。OCS 5.1 图片题为 `2`，服务端不依赖它判断逻辑 |
| images | string[] | 否 | 题目图片，`data:image/...;base64,` 数组，顺序对应 `[图片1]`、`[图片2]`。最多 6 张，单张解码后不超过 3MB |
| suggestion_title | string | 否 | 题干里的图片地址换成 `[图片N]` 后的文本。没图时为空字符串 |
| suggestion_options | string | 否 | 选项里的图片地址换成 `[图片N]` 后的文本。选项没图时为空字符串 |

**请求示例**:
```bash
curl -X POST https://api.zaizhexue.top/api/query \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_token_here" \
  -d "title=题目内容&options=选项内容&type=题目类型"
```

**响应格式**:

```json
{
  "data": {
    "code": 1,
    "data": "答案内容",
    "msg": "来自题库。。。"
  },
  "success": true
}
```

**响应参数说明**:

| 参数名 | 类型 | 说明 |
|--------|------|------|
| success | boolean | 请求是否成功，一般不用管 |
| data.code | integer | 状态码，1表示找到答案，0表示未找到答案或token无效 |
| data.data | string | 答案内容，多个答案用#分隔 |
| data.msg | string | 额外信息 |





## 使用限制

- **请求频率**: 暂无限制
- **Token有效期**: 在手动重置前无限期



## 常见问题

### Q: 如何获取Token？
A: 访问[ZError](https://tiku.zerror.cc)并登录，在`我的>题库配置`页可以查看到。

### Q: 答案格式是什么？
A: 多个答案用 `#` 分隔，例如：`答案1#答案2#答案3`


## OCS题库配置

`data` 已增加 `v`、`images`、`suggestion_title`、`suggestion_options`。和旧配置的差别见 [题库配置修改](/online/tiku-config)。

以下是用于OCS题库的完整配置JSON格式：

```json
[
  {
    "name": "ZE题库",
    "homepage": "https://tiku.zerror.cc/",
    "url": "https://api.zaizhexue.top/api/query",
    "method": "post",
    "type": "GM_xmlhttpRequest",
    "data": {
      "v": "2",
      "title": "${title}",
      "options": "${options}",
      "type": "${type}",
      "images": { "handler": "return (env) => env.images" },
      "suggestion_title": "${suggestion_title}",
      "suggestion_options": "${suggestion_options}"
    },
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer your_token_here"
    },
    "handler": "return (res)=>res.data.code === 0 ? [res.data.msg, undefined] : [res.data.msg,res.data.data,{ai: res.data.ai}]"
  }
]
```

::: warning 配置说明
- 将 `your_token_here` 替换为您的实际API令牌
- POST方式使用Bearer认证，GET方式将token作为参数传递
- `images` 必须用字段解析器返回数组，不能写成 `"${images}"`
- 需要 OCS 5.1 及以上，并开启图片题优化，AI 才能看到图片。旧版粘贴这份配置时，未识别的占位符会变成空值，文字题仍可搜索
- handler函数处理不同的响应格式
:::


---

*最后更新时间: 2026-10-10*