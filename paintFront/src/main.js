import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import jquery from 'jquery'
window.jquery = window.$ = jquery

/* 引入组件 */
import '@/utils/mint-ui.js'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
