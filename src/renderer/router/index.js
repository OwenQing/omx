import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      // component: require('@/components/LandingPage').default
      component: () => import('@/components/TomatoTime.vue'),
    },
    {
      path: '/tomatotime',
      name: 'tomatotime',
      component: () => import('@/components/TomatoTime.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('@/components/Calendar.vue')
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
