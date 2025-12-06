import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import router from './router'
import './styles/main.scss'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Quasar, { plugins: {} })

app.mount('#app')