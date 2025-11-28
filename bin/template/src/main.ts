import App from '@/App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import Ylibrary from '@pksep/yui';
import '@pksep/yui/styles';
import { createApp } from 'vue';

// @ts-ignore
const app = createApp(App);
const piniaStore = createPinia();

app.use(piniaStore).use(router).use(Ylibrary).mount('#app');
