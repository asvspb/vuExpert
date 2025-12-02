import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter } from 'vue-router'
import App from './App.vue'
import router from './router'
import { VueFinalModal } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import { LazyImage } from 'vue3-lazy'
import 'vue3-lazy/dist/lazy.css'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar, Line, Pie } from 'vue-chart-3'
import './styles/main.scss'

// Регистрация компонентов Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Глобальная регистрация компонентов
app.component('VueFinalModal', VueFinalModal)
app.component('LazyImage', LazyImage)
app.component('BarChart', Bar)
app.component('LineChart', Line)
app.component('PieChart', Pie)

app.mount('#app')