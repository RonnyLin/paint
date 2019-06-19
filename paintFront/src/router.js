import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
     },
    {
      path: '/main',
      name: 'main',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Main.vue'),
      children:[
          {
              path:'/room',
              name:'room',
              component:() => import('./views/Main/Room.vue')
          },
          {
              path:'/message',
              name:'message',
              component:() => import('./views/Main/Message.vue')
          },
          {
              path:'/personal',
              name:'personal',
              component:() => import('./views/Main/Personal.vue')
          },
      ]
    }
  ]
})
