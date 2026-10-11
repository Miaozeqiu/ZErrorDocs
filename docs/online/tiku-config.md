# 题库配置修改

`POST /api/query` 增加了图片题字段。官网「我的 → 题库配置」生成的 JSON 已同步修改。以前复制进 OCS 的配置需要重新复制一份。

地址、请求方式和返回处理没有改。改动只在 `data` 里。

## 字段变化

| 字段 | 变化 |
|------|------|
| `title` | 不变。题目原文 |
| `options` | 不变。选项原文，多项之间换行 |
| `type` | 不变。题型，如 `single`、`multiple`、`judgement`、`completion` |
| `v` | 新增。固定写 `"2"`，表示按 OCS 5.1 图片题协议填写。服务端不靠这个值决定怎么查 |
| `images` | 新增。题目图片数组 |
| `suggestion_title` | 新增。题干里的图片地址换成 `[图片N]` 之后的文本 |
| `suggestion_options` | 新增。选项里的图片地址换成 `[图片N]` 之后的文本 |

`name`、`homepage`、`url`、`method`、`type`、`headers`、`handler` 保持原样。

## 现在的配置

把 `your_token_here` 换成自己的 API 令牌。官网页面会直接生成带令牌的配置。

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

以前的 `data` 只有三个字段：

```json
"data": {
  "title": "${title}",
  "options": "${options}",
  "type": "${type}"
}
```

## 新字段怎么填

`images` 必须写成字段解析器，由脚本返回 `env.images`。不要写成 `"${images}"`，那样会变成一个字符串，服务端无法当图片数组解析。

数组里每一项都是 `data:image/png;base64,...` 或 `data:image/jpeg;base64,...` 这类 data URL，支持 png、jpeg、jpg、gif、webp。顺序就是图片编号的顺序。最多 6 张，单张解码后不超过 3MB。没有图片时传空数组，或者不传这个字段。

`suggestion_title`、`suggestion_options` 是给 AI 看的文本。题干和选项里的图片地址要换成 `[图片1]`、`[图片2]`。编号整道题共用：先题干，再选项，同一张图只占一个编号。没有图片时这两个字段传空字符串。OCS 把未识别的占位符填成 `undefined` 时，服务端会当成空字符串。

文字搜索仍然用原来的 `title` 和 `options`。只有建议题干或建议选项里有内容时，AI 才按建议文本和附带的图片作答，答案里的图片写成 `[图片N]`。

## 旧配置

旧配置仍然可以查没有图片的题目。要让 AI 看到图片，需要 OCS 5.1 及以上，并重新粘贴上面的配置。
