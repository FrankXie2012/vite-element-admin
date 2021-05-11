import {createApp} from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import '/@modules/element-plus/lib/theme-chalk/index.css'
import 'xe-utils'
import VXETable from 'vxe-table'
import '/@modules/vxe-table/lib/style.css'
import request from './axios'

const app = createApp(App)
app.use(ElementPlus)
app.use(VXETable)
app.use(router)
app.use(store)
app.mount('#app')

app.config.globalProperties.$request = request
app.provide('$request', request)
