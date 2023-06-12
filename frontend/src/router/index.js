import { createRouter, createWebHistory } from 'vue-router'
import FrontView from '@/views/FrontView.vue'
import CategoryView from '@/views/CategoryView.vue'
import ProductView from '@/views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'front',
      component: FrontView
    },
    {
      path: '/:name',
      name: 'category',
      component: CategoryView
    },
    {
      path: '/:category/:name',
      name: 'product',
      component: ProductView
    }
  ]
})

export default router
