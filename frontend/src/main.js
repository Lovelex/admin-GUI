import 'font-awesome/css/font-awesome.css'
import './config/bootstrap.js'
import Vue from 'vue'

import App from './App'
import store from './config/store.js'
import router from './config/router.js';

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')