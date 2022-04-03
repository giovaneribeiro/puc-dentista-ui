import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'
import Dashboard from '@/views/Dashboard.vue'

import store from '@/store'

Vue.use(VueRouter)

const routes = [{
  path: '*',
  name: 'notfound',
  component: NotFound
}, {
  path: '/login',
  name: 'login',
  component: Login
}, {
  path: '/',
  name: 'dashboard',
  component: Dashboard,
  meta: { requiresAuth: true, authorize: [] }
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login' && store.getters.isAuth) {
    next({ name: 'dashboard' })
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuth) {
      next({ name: 'login' })
    } else if (!router.app.hasRoles(to.meta.authorize)) {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
