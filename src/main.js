import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'xe-utils'
import i18n from './i18n'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import request from './axios'
import { authCheck } from './components/utils'

VXETable.setup({
  // 对组件内置的提示语进行国际化翻译
  i18n: (key, args) => i18n.global.t(key, args),
  translate(key, args) {
    return i18n.global.t(key, args)
  }
})

const app = createApp(App)
app.use(ElementPlus)
app.use(VXETable)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')

app.config.globalProperties.$request = request
app.provide('$request', request)
app.config.globalProperties.$authCheck = authCheck
