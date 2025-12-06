import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import PrimeVueDemo from '../views/PrimeVueDemo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld
  },
  {
    path: '/primevue-demo',
    name: 'PrimeVueDemo',
    component: PrimeVueDemo
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router