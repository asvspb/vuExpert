import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import VuetifyDemo from '../views/VuetifyDemo.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld
  },
  {
    path: '/vuetify-demo',
    name: 'VuetifyDemo',
    component: VuetifyDemo
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router