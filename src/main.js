import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter } from 'vue-router'
import App from './App.vue'
import router from './router'
import { VueFinalModal } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import Vue3Lazy from 'vue3-lazy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import './styles/main.scss'

// Регистрация компонентов Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Lazy, {
  // Опции для vue3-lazy
  loading: '/src/assets/loading.gif', // путь к изображению загрузки
 error: '/src/assets/error.gif' // путь к изображению ошибки
})

// Глобальная регистрация компонентов
app.component('VueFinalModal', VueFinalModal)

app.mount('#app')