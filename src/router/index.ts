import { createRouter, createWebHistory } from 'vue-router'
import InputView from '../views/InputView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'input',
      component: InputView
    },
    {
      path: '/wbs',
      name: 'wbs',
      // route level code-splitting
      // this generates a separate chunk (Wbs.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WbsView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      // route level code-splitting
      // this generates a separate chunk (Settings.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SettingsView.vue')
    }
  ]
})

export default router
