import {createI18n} from 'vue-i18n'
// const modules = import.meta.glob('./*')
// import zhCN from 'vxe-table/lib/locale/lang/zh-CN'
// import enUS from 'vxe-table/lib/locale/lang/en-US'
// const zhCN = require('vxe-table/lib/locale/lang/zh-CN')
// const enUS = require('vxe-table/lib/locale/lang/en-US')

const messages = {
  // zh_CN: {
  //   ...zhCN
  // },
  // en_US: {
  //   ...enUS
  // }
}

const i18n = createI18n({
  locale: 'zh_CN',
  messages
})

export default i18n
