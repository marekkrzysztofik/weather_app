<template>
  <div class="cards">
    <div class="flex">
      <p class="date">{{ time }} in Poland</p>
      <TabMenu :model="items"> </TabMenu>
    </div>
    <RouterView />
  </div>
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
export default {
  setup() {
    const items = ref([
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        to: '/',
      },
      {
        label: 'Login',
        icon: 'pi pi-user',
      },
      {
        label: 'Register',
        icon: 'pi pi-user-plus',
      },
      {
        label: 'Weather Forecast',
        icon: 'pi pi-sun',
        to: '/weather-app',
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
      },
    ])
    return { items }
  },
  data() {
    return {
      interval: null,
      time: null,
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  created() {
    this.interval = setInterval(() => {
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format()
    }, 1000)
  },
}
</script>

<style scoped></style>
