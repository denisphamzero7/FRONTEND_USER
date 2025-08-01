// src/main.ts (hoặc main.js)
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './style.css';
import App from './App.vue';
import router from './router';
import { abilitiesPlugin } from '@casl/vue'
import { useAbilityStore } from '../src/store/abilityStore'


const app = createApp(App);
const pinia = createPinia();
app.use(pinia);


app.use(router);
const abilityStore = useAbilityStore()
app.use(abilitiesPlugin, abilityStore.ability)
app.mount('#app');
