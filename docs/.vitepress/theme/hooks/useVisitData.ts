/**
 * 网站访问量统计
 *
 * https://cn.vercount.one/
 * 使用 POST API 直接请求，适配 SPA 路由切换
 */
const useVisitData = async () => {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    const res = await fetch('https://events.vercount.one/api/v2/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: window.location.href
      }),
      signal: controller.signal
    })

    clearTimeout(timeout)

    if (!res.ok) return

    const json = await res.json()
    const data = json.status === 'success' && json.data ? json.data : json.data || {}

    const pagePVEl = document.getElementById('vercount_value_page_pv')
    const sitePVEl = document.getElementById('vercount_value_site_pv')
    const siteUVEl = document.getElementById('vercount_value_site_uv')

    if (pagePVEl && data.page_pv !== undefined) pagePVEl.textContent = String(data.page_pv)
    if (sitePVEl && data.site_pv !== undefined) sitePVEl.textContent = String(data.site_pv)
    if (siteUVEl && data.site_uv !== undefined) siteUVEl.textContent = String(data.site_uv)

    // 显示容器
    const containers = ['page_pv', 'site_pv', 'site_uv']
    containers.forEach(key => {
      const container = document.getElementById(`vercount_container_${key}`)
      if (container) container.style.display = 'inline'
    })
  } catch (e) {
    // 静默失败
  }
}

export default useVisitData
