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
      name: 'dashboard',
      redirect: '/dashboard',
      meta: {
        requireAuth: true
      },
      component: () => import('../views/common/Index.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: {
            requireAuth: true
          },
          component: () => import('../views/dashboard/Index.vue')
        },
        {
          path: '/geo',
          name: 'geo',
          meta: {
            requireAuth: true
          },
          component: () => import('../views/geo/Index.vue')
        },
        {
          path: '/app',
          name: 'app',
          meta: {
            requireAuth: true
          },
          component: () => import('../views/app/Index.vue')
        },
        {
          path: '/push',
          name: 'push',
          meta: {
            requireAuth: true
          },
          component: () => import('../views/push/Index.vue')
        },
        {
          path: '/merchant',
          name: 'merchant',
          meta: {
            requireAuth: true
          },
          component: () => import('../views/merchant/Index.vue')
        },
        {
          path: '/terminal',
          name: 'terminal',
          meta: {
            requireAuth: true
          },
          component: () => import('../views/terminal/Index.vue')
        },
        {
          path: '/report',
          name: 'report',
          meta: {
            requireAuth: true
          },
          component: () => import('../views/report/Index.vue')
        },
        {
          path: '/admin',
          name: 'admin',
          meta: {
            requireAuth: true
          },
          component: () => import('../views/admin/Index.vue')
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
