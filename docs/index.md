---
layout: home
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 自动重定向到外部链接
  window.location.href = 'https://app.zerror.cc'
})
</script>

<div style="text-align: center; padding: 50px;">
  <h1>正在跳转到 ZError 应用...</h1>
  <p>如果没有自动跳转，请点击 <a href="https://app.zerror.cc">这里</a></p>
</div>