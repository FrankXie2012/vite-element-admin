import {createRouter, createWebHistory} from 'vue-router'
import store from '../store'

// 开启历史模式
// vue2中使用 mode: history 实现
const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/common/Login.vue')
    },
    {
      path: '/',
      name: 'index',
      redirect: '/home',
      meta: {
        requireAuth: true
      },
      component: () => import('../views/common/Index.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {
            requireAuth: true
          },
          component: () => import('../views/Home.vue')
        }
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   // 这里的meta就是我们刚刚在路由里面配置的meta
//   if (to.meta.requireAuth) {
//     // 根据store中的token来判断是否登录
//     if (store.state.login.userInfo.token) {
//       next()
//     } else {
//       // 没有登录跳转到登录页面，登录成功之后再返回到之前请求的页面
//       next({
//         path: '/login'
//       })
//     }
//   } else {
//     // 不需要登录的，可以继续访问
//     next()
//   }
// })

export default router
