/**
 * 网站访问量统计
 *
 * https://cn.vercount.one/
 */
const useVisitData = () => {
  // 移除旧的 script，确保浏览器重新执行
  const old = document.querySelector('script[src="https://cn.vercount.one/js"]')
  if (old) old.remove()

  const script = document.createElement('script')
  script.defer = true
  script.async = true
  script.src = 'https://cn.vercount.one/js'
  document.head.appendChild(script)
}

export default useVisitData
