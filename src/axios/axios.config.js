// import {Message, Spin} from 'view-design'
import {ElLoading} from 'element-plus'

const ajax = {
  // baseURL: '/qms/', // Mock
  // baseURL: 'https://47.102.135.57:8808/', // 真实数据
  baseURL: 'https://www.sr-bridgesurfacing.com:4433/zms/', // 真实数据
  timeOut: 3000 * 1000,
  type: 'post',
  dataType: 'json',
  contentType: 'application/json; charset=utf-8',
  hooks: {},
  crossDomain: true
}

/**
 *  ajax 请求前的统一处理， 自行扩展
 *
 *
 */
ajax.hooks.eachBefore = function (param) {
  // 删除空参数
  if (param.data) {
    const exclude = [0, false]
    Object.keys(param.data).forEach((key) =>
      !param.data[key] && !exclude.includes(param.data[key]) ? delete param.data[key] : ''
    )
  }
  if (param.showLoading) {
    // Spin && Spin.show()
  }
}

/**
 *  ajax 请求完成的统一处理， 自行扩展
 *
 *
 */
ajax.hooks.eachComplete = function (response, param) {
  if (param.showLoading) {
    // Spin && Spin.hide()
  }
}

/**
 *  ajax 请求失败的统一处理， 自行扩展
 *
 *
 */
ajax.hooks.eachFailure = function (response, param) {
  //   Message.error(response.desc || response.toString())
}

/**
 *  ajax 请求成功的统一处理， 自行扩展
 *
 *
 */
ajax.hooks.eachSuccess = function (response, param) {
  if (!param.noHint) {
    // Message.success(response.desc)
  }
}
export default ajax
