import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/tailwind.css'
import App from './App.vue'
import router from './router'
import { logger } from './services/logger'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Перехват ошибок внутри Vue компонентов
app.config.errorHandler = (err, instance, info) => {
  logger.error('Vue Component Error', { error: err.message, stack: err.stack, info })
}

// Перехват глобальных ошибок JavaScript
window.addEventListener('error', (event) => {
  logger.error('Global JS Error', { message: event.message, filename: event.filename, lineno: event.lineno })
})

// Перехват необработанных отклонений Promise
window.addEventListener('unhandledrejection', (event) => {
  logger.error('Unhandled Promise Rejection', { reason: event.reason ? event.reason.toString() : 'Unknown' })
})

// Логирование навигации (переходов по страницам)
router.beforeEach((to, from, next) => {
  if (from.fullPath !== to.fullPath) {
    logger.info('Route Navigation', { from: from.fullPath, to: to.fullPath })
  }
  next()
})

app.mount('#app')