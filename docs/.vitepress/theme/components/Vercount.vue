<template>
  <div class="vercount-container">
    <span class="vercount-text">
      本页阅读量 <span id="vercount_value_page_pv" class="vercount-pv">Loading</span> 次
    </span>
  </div>
</template>

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
