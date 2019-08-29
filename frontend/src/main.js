import 'font-awesome/css/font-awesome.css'
import './config/bootstrap.js'
import Vue from 'vue'

import App from './App'

import './config/msgs.js'
import store from './config/store.js'
import router from './config/router.js';

Vue.config.productionTip = false

// TEMPORARIO
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwibmFtZSI6ImFkbWluMiIsImVtYWlsIjoiYWRtaW5AYWRtaW4yLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1NjcwMjA3OTIsImV4cCI6MTU2NzI3OTk5Mn0.Bof2YbiCs3cSEusSNyagr3v7JyOUDXtqdCCEWSsVM0s'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')