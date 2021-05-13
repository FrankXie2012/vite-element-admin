import {createI18n} from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'

const messages = {
  zh_CN: {
    ...zhCN
  },
  en_US: {
    ...enUS
  }
}

const lang = localStorage.getItem('lang') || 'zh_CN'
const i18n = createI18n({
  locale: lang,
  fallbackLocale: lang,
  messages
})

export default i18n
