import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Action from '../views/Action.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },{
    path: '/Action',
    component: Action
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
