import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'


import jquery from 'jquery'
window.jquery = window.$ = jquery

/* 引入工具函数 */
import jsonParse from '@/utils/jsonParse.js'

/* 引入组件 */
import '@/utils/mint-ui.js'

const whiteList = ['/login', '/register']
router.beforeEach((to,from,next)=>{
    console.error( to)
    if (whiteList.indexOf(to.path) !== -1) {
        sessionStorage.removeItem('user');
        next()
        return;
    }else{
        let user = jsonParse.parse(sessionStorage.getItem('user'))
        if (!user && to.path != '/login') {
            // 当前会话中还没有user用户记录
            next({ path: '/login' });
            return;
        }
        next()
    }
});

document.cookie

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
