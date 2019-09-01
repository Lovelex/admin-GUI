import vue from 'vue'
import vueRouter from 'vue-router'

import Home from '@/components/home/Home.vue'
import AdminPages from '@/components/admin/AdminPages.vue'
import ArticlesByCategory from '@/components/article/ArticlesByCategory.vue'
import ArticleById from '@/components/article/ArticleById.vue'
import Auth from '@/components/auth/Auth.vue'

import { userKey } from '@/global.js'

vue.use(vueRouter)

const routes = [{
  name: 'home',
  path: '/',
  component: Home,
}, {
  name: 'adminPages',
  path: '/admin',
  component: AdminPages,
  meta: { requiresAdmin: true }
}, {
  name: 'articleByCategory',
  path: '/categories/:id/articles',
  props: true,
  component: ArticlesByCategory
}, {
  name: 'articleById',
  path: '/articles/:id',
  props: true,
  component: ArticleById
}, {
  name: 'auth',
  path: '/auth',
  component: Auth
}]

const router = new vueRouter({
  mode: 'history',
  routes 
})

router.beforeEach((to, from, next) => {
  const json = localStorage.getItem(userKey)

  if(to.matched.some(record => record.meta.requiresAdmin)){
    const user = JSON.parse(json)
    user && user.admin ? next() : next({ path: '/' })
  } else {
    next()
  }
})

export default router