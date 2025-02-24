import {
  createApp,
} from 'vue';
import './style.css';
import App from './App.vue';

console.log('> Main -> initialize vue app');

createApp(App)
  .mount('#app');