import { createApp } from 'vue'
import App from './App.vue'
import resizeDirect from './resize-direct'
import './style.css'

const app = createApp(App)
app.directive('resizeDirect', resizeDirect)
app.mount('#app')
