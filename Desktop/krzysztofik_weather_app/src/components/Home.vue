<template>
  <div class="flex center">
    <TabMenu :model="items"> </TabMenu>
    <p class="date">{{ currentTime }} in Poland</p>
  </div>
</template>
<script>
import { ref } from 'vue'
import { clockMixin } from '/src/App.vue'
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
  mixins: [clockMixin],
}
</script>

<style scoped></style>
