import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import user from './user'
import dashboard from './dashboard'

export const routes: Array<RouteRecordRaw> = [user, dashboard]

const prefix = {
  staging: '/',
  development: '/',
  production: '/'
}

const router = createRouter({
  history: createWebHistory(prefix[process.env.NODE_ENV]),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

export default router
