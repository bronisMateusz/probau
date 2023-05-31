import { createRouter, createWebHistory } from 'vue-router'
import FrontView from '@/views/FrontView.vue'
import CategoryView from '@/views/CategoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'front',
      component: FrontView
    },
    {
      path: '/kategorie/:name',
      name: 'kategorie',
      component: CategoryView
    }
  ]
})

export default router
