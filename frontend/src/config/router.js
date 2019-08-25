import vue from 'vue'
import vueRouter from 'vue-router'

import Home from '@/components/home/Home.vue'
import AdminPages from '@/components/admin/AdminPages.vue'

vue.use(vueRouter)

const routes = [{
  name: 'home',
  path: '/',
  component: Home,
}, {
  name: 'adminPages',
  path: '/admin',
  component: AdminPages
}]

const router = new vueRouter({
  mode: 'history',
  routes 
})

export default router