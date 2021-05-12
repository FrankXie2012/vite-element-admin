// 权限控制
export function authCheck(val) {
  // const authList = this.$store.state.login.authList
  // const userInfo = this.$store.state.login.userInfo
  // let account = ''
  // if (userInfo && userInfo.account) {
  //   account = userInfo.account
  // }
  // if (val === 'structHistory' && account == 'gudj') {
  //   return false
  // }
  // if (val == 'structHistory1' && account == 'gudj') {
  //   return true
  // } else if (val == 'structHistory1') {
  //   return false
  // }
  //   if (authList.includes(val)) {
  // console.log(val)
  return true
  //   }
  //   return false
}

/**
 * Stringify an object for use in a query string.
 *
 * @param {Object} obj - The object.
 * @param {string} prefix - When nesting, the parent key.
 *     keys in `obj` will be stringified as `prefix[key]`.
 */

export function queryStringify(obj, prefix) {
  var pairs = []
  for (var key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (!obj.hasOwnProperty(key)) {
      continue
    }

    var value = obj[key]
    var enkey = encodeURIComponent(key)
    var pair
    if (typeof value === 'object') {
      pair = queryStringify(value, prefix ? prefix + '[' + enkey + ']' : enkey)
    } else {
      pair = (prefix ? prefix + '[' + enkey + ']' : enkey) + '=' + encodeURIComponent(value)
    }
    pairs.push(pair)
  }
  return pairs.join('&')
}

// export function defaultImg(event) {
//   event.target.src = require('@/assets/pic.jpg')
// }

/**
 * @description 判断变量的类型
 * @param {*} obj
 * @returns {String} 返回变量的类型
 */
export const getType = (obj) => {
  return Object.prototype.toString.call(obj).replace(/\[object\s(\w+)\]/g, function () {
    return arguments[1].toLocaleLowerCase()
  })
}

export const required = [
  {
    required: true,
    message: '必填',
    trigger: 'blur'
  }
]

export const formatDate = function (fmt, time) {
  let dateTime = new Date(time)
  let o = {
    'M+': dateTime.getMonth() + 1, //月份
    'd+': dateTime.getDate(), //日
    'H+': dateTime.getHours(), //小时
    'm+': dateTime.getMinutes(), //分
    's+': dateTime.getSeconds(), //秒
    'q+': Math.floor((dateTime.getMonth() + 3) / 3), //季度
    S: dateTime.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (dateTime.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

// 获取当前时间
export const getNow = (fmt) => {
  const now = new Date()
  const year = now.getFullYear()
  const month = ('0' + (now.getMonth() + 1)).slice(-2)
  const day = ('0' + now.getDate()).slice(-2)
  const hour = ('0' + now.getHours()).slice(-2)
  const minute = ('0' + now.getMinutes()).slice(-2)
  const second = ('0' + now.getSeconds()).slice(-2)
  switch (fmt) {
    case 'yyyy-MM-dd hh:mm:ss':
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    case 'yyyy-MM-dd':
      return `${year}-${month}-${day}`
    case 'yyyy/MM/dd':
      return `${year}/${month}/${day}`
    default:
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }
}

// 下载
// param = {
//   url: '',
//   data: {}
// }
export const download = async function ({url = 'manage/down', data = {}, method = 'get'}) {
  const res = await this.$request({url, data, method})
  const elink = document.createElement('a') // 创建a标签
  const disposition = res.headers['Content-disposition']
  console.log(res.headers, res)
  let fileName = disposition && disposition.split('filename=')[1]
  const blob = new Blob([res])
  elink.download = fileName // 文件名
  elink.style.display = 'none'
  elink.href = URL.createObjectURL(blob)
  document.body.appendChild(elink)
  elink.click() // 触发点击a标签事件
  document.body.removeChild(elink)
}

// vxe-table 基础配置
export const tableConfig = {
  round: true,
  border: false,
  resizable: false,
  autoResize: true,
  height: 'auto',
  highlightHoverRow: true,
  highlightCurrentRow: true,
  emptyText: '没有更多数据了！',
  rowId: 'id',
  checkboxConfig: {
    reserve: true
  },
  pagerConfig: {
    pageSize: 10
  }
}
