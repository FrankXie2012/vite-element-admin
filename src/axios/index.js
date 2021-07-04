import axios from 'axios'
import ajax from './axios.config'
import store from '../store/index'
// axios 配置
axios.defaults.timeout = ajax.timeOut
axios.defaults.headers.post['Content-Type'] = ajax.contentType
axios.defaults.baseURL = ajax.baseURL || ''

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  const token = store.state.userInfo && store.state.userInfo.token
  config.headers['Authorization'] = token
  return config
})

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status) {
      switch (parseInt(error.response.status)) {
        case 401:
          // 回到登录页
          window.location.href = '/login'
          break
        case 402:
          debugger
          // 获取当前失败的请求
          const config = error.response.config
          // 重置token
          const token = error.response.data.data
          const userInfo = Object.assign({}, store.state.userInfo, { token: token })
          store.dispatch('setUserInfo', userInfo)
          config.headers['Authorization'] = token
          // 重试当前请求并返回promise
          return axios(config)
      }
    }
    return Promise.reject(error)
  }
)

const request = function (...opt) {
  if (opt.length > 1 || (opt.length === 1 && typeof opt[0] === 'string')) {
    opt = {
      url: opt[0],
      data: opt[1] || {}
    }
  }
  if (Object.prototype.toString.call(opt[0]) === '[object Object]') {
    opt = opt[0]
  }
  ajax.hooks.eachBefore && ajax.hooks.eachBefore.call(this, opt)
  const promise = new Promise((resolve, reject) => {
    let method = opt.method || ajax.type
    let headers = {
      'Content-Type': opt['Content-Type'] ? opt['Content-Type'] : ajax.contentType
    }
    if (opt.headers) {
      headers = Object.assign(headers, opt.headers)
    }
    const axiosConfig = {
      headers: headers,
      responseType: opt.responseType || 'json'
    }
    axios[method](
      opt.url,
      method === 'get' ? { params: opt.data, ...axiosConfig } : opt.data,
      axiosConfig
    )
      .then((res) => {
        // 流文件
        if (
          res.headers['content-type'] === 'application/octet-stream' ||
          res.headers['content-type'] === 'application/msexcel;charset=UTF-8'
        ) {
          return resolve(res)
        }
        if (res.data && res.data.code === '200') {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
  promise
    .then((response) => {
      ajax.hooks.eachSuccess && ajax.hooks.eachSuccess.call(this, response, opt)
      ajax.hooks.eachComplete && ajax.hooks.eachComplete.call(this, response, opt)
    })
    .then(null, (response) => {
      ajax.hooks.eachFailure && ajax.hooks.eachFailure.call(this, response, opt)
      ajax.hooks.eachComplete && ajax.hooks.eachComplete.call(this, response, opt)
    })
  return promise
}
export default request
