import { createApp } from 'vue'
import { Quasar } from 'quasar'
import App from './App.vue'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

createApp(App).use(Quasar).mount('#app')