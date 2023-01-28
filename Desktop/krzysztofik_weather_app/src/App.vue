<template>
    <RouterView />
</template>



<script>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
  export const clockMixin = {
  data() {
    return {
      currentTime: ''
    }
  },
  mounted() {
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString()
    }, 1000)
  }
}
</script>