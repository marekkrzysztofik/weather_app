import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css';
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import Button from 'primevue/button'
import './assets/main.css'
import WeatherApp from './views/WeatherApp.vue'
import TabMenu from 'primevue/tabmenu'
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService);
app.component('Toast', Toast);
app.component('InputText', InputText)
app.component('TabMenu', TabMenu)
app.component('Card', Card)
app.component('WeatherApp', WeatherApp)
app.component('Button', Button)
app.mount('#app')
