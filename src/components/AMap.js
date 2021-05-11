// 异步加载高德地图
export default function MapLoader() {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap)
    } else {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src =
        'https://webapi.amap.com/maps?v=1.4.15&key=b5e4d8192b0b13cc32c4f3cee4de8295&callback=onLoad'
      script.onerror = reject
      document.head.appendChild(script)
      window.onLoad = function () {
        resolve(window.AMap)
      }
    }
    window.initAMap = () => {
      resolve(window.AMap)
    }
  })
}
