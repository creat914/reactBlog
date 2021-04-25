import {createApp} from 'vue'
import App from './App.vue'
import router from "./router/router";
const app = createApp(App).use(router).mount('#root')
console.log('aaaa')
