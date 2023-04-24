import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// For some reasons this import doesn't work from vite.config.js
import '@/assets/scss/styles.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
