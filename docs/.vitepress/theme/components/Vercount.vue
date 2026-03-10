<template>
  <div class="vercount-container">
    <span class="vercount-text">
      本页阅读量 <span class="vercount-pv">{{ pv }}</span> 次
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const pv = ref<string | number>('--')

async function fetchCount() {
  pv.value = '--'
  try {
    const url = encodeURIComponent(window.location.href)
    const res = await fetch(`https://cn.vercount.one/query?jsonpCallback=handleVercount&url=${url}`)
    const text = await res.text()
    // 响应格式: handleVercount({"site_pv":...,"page_pv":...,"site_uv":...})
    const match = text.match(/handleVercount\((.+)\)/)
    if (match) {
      const data = JSON.parse(match[1])
      pv.value = data.page_pv ?? '--'
    }
  } catch {
    pv.value = '--'
  }
}

onMounted(() => {
  fetchCount()
})

// 路由切换时重新获取
onMounted(() => {
  window.addEventListener('vitepress:route-change', fetchCount)
})
</script>

<style scoped>
.vercount-container {
  display: flex;
  align-items: center;
  padding: 0.75rem 0 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.vercount-pv {
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin: 0 0.15rem;
}
</style>
