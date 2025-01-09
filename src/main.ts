import {createApp} from 'vue'
import {createPinia} from 'pinia'
import "@/assets/base.css"
import "@/assets/theme.css"
import ArcoVue from '@arco-design/web-vue';
import App from "./App.vue"
import router from './router'
import '@arco-design/web-vue/dist/arco.css';
import "font-awesome/css/font-awesome.min.css"


const app = createApp(App)
app.use(ArcoVue)
app.use(createPinia())
app.use(router);

(window as any).isLaptops = document.documentElement.clientWidth > 1200 &&  document.documentElement.clientWidth< 1800

app.mount('#app')
