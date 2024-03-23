import { createApp } from 'vue'
import '@fd-libs/header'
import App from './App.vue'
import resizeDirect from './resize-direct'
import './style.scss'

const app = createApp(App)
app.directive('resizeDirect', resizeDirect)
app.mount('#app')
