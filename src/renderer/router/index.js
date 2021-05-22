import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: () => import('@/components/Todo.vue'),
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('@/components/Todo.vue')
    },
    {
      path: '/objectmanagement',
      name: 'objectmanagement',
      component: () => import('@/components/ObjectManagement.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
