import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded routes for better code-splitting
const HomeView = () => import('../views/HomeView.vue')
const Documentation = () => import('../components/Documentation.vue')
const DatabaseExample = () => import('../components/DatabaseExample.vue')
const HelloWorld = () => import('../components/HelloWorld.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Главная' }
  },
  {
    path: '/docs',
    name: 'docs',
    component: Documentation,
    meta: { title: 'Документация' }
  },
  {
    path: '/db',
    name: 'db',
    component: DatabaseExample,
    meta: { title: 'База данных' }
  },
  {
    path: '/hello',
    name: 'hello',
    component: HelloWorld,
    meta: { title: 'Пример' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = `${to.meta.title} • vuExpert`
  }
})

export default router
