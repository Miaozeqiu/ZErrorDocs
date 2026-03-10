/**
 * 网站访问量统计
 *
 * https://cn.vercount.one/
 */
const useVisitData = () => {
  const script = document.createElement('script')
  script.defer = true
  script.async = true
  script.src = 'https://cn.vercount.one/js'
  document.head.appendChild(script)
}

export default useVisitData
