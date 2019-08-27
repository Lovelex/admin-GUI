import 'font-awesome/css/font-awesome.css'
import './config/bootstrap.js'
import Vue from 'vue'

import App from './App'

import './config/msgs.js'
import store from './config/store.js'
import router from './config/router.js';

Vue.config.productionTip = false

// TEMPORARIO
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NCwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTY2ODQwNzMzLCJleHAiOjE1NjcwOTk5MzN9.un56dxerQzQJ685wkUjaWkLyz8_v8RQKmGHVtOwzUzA'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')