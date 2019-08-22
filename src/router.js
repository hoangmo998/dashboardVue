import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        const role = localStorage.getItem('token')
        if (role) {
          next()
        } else next('/login')
      }
    },
    
    {
      path: '/login',
      component: Login,
      props: (router) => ({
        token:router.query.token
      })
    },
    
  ]
})
