import { createRouter, createWebHistory } from 'vue-router'
import WeatherApp from '../views/WeatherApp.vue'
import Homepage from '../components/Homepage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage,
    },
    {
      path: '/weather-app',
      name: 'WeatherApp',
      component: WeatherApp,
    },
  ],
})

export default router
