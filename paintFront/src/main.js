import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/index.css'
import './registerServiceWorker'

import jquery from 'jquery'
window.jquery = window.$ = jquery

/* 引入工具函数 */
import jsonParse from '@/utils/jsonParse.js'

/* 引入组件 */
import '@/utils/mint-ui.js'

//引入nprogress
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' //这个样式必须引入

// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// 白名单
const whiteList = ['/login', '/register']

router.beforeEach((to,from,next)=>{
    NProgress.start()
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

router.afterEach(() => {
    NProgress.done()
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
