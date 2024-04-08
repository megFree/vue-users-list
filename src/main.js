import 'normalize.css';
import '@/app/assets/base.scss';

import { createApp } from 'vue';
import App from './app/App.vue';
import router from './app/router';

createApp(App).use(router).mount('#app');
