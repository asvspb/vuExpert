import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExamplesView from '../views/ExamplesView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/examples',
    name: 'examples',
    component: ExamplesView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router