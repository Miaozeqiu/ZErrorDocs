/**
 * 网站访问量统计
 *
 * https://cn.vercount.one/
 * 使用 POST API 直接请求，适配 SPA 路由切换
 */
const useVisitData = async () => {
  try {
    const res = await fetch('https://cn.vercount.one/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: window.location.href,
        referrer: document.referrer
      })
    })
    if (!res.ok) return
    const data = await res.json()
    const pagePVEl = document.getElementById('vercount_value_page_pv')
    const sitePVEl = document.getElementById('vercount_value_site_pv')
    const siteUVEl = document.getElementById('vercount_value_site_uv')
    if (pagePVEl && data.page_pv !== undefined) pagePVEl.textContent = data.page_pv
    if (sitePVEl && data.site_pv !== undefined) sitePVEl.textContent = data.site_pv
    if (siteUVEl && data.site_uv !== undefined) siteUVEl.textContent = data.site_uv
  } catch (e) {
    // 静默失败
  }
}

export default useVisitData
