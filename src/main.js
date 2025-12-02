import { createApp } from 'vue'
import App from './App.vue'

// Router & Store
import router from './router'
import { createPinia } from 'pinia'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
const pinia = createPinia()

app
  .use(router)
  .use(pinia)
  .use(ElementPlus)
  .mount('#app')