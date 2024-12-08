import './assets/main.css'
import "./components/paperui/PaperBase.css";
import "./components/paperui/PaperExtension.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
