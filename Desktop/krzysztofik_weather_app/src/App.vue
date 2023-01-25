<template>
  
  <!-- <div class="flex">
    <div class="flex">
        <Card style="width: 12rem; padding: 0">
          <template #content>
            <div class="tab-menu flex">
              <p class="date margin-0">{{ time }}</p>
              <p class="date margin-0">{{ today }}</p>
              <Button class="btn" label="Basic info" />
              <Button
                @click="getWeatherForecast(searchQuery)"
                class="btn"
                label="Details"
              />
              <RouterLink to="/mapa" v-slot="{ navigate }">
                <Button
                  @click="navigate"
                  role="link"
                  class="btn"
                  label="Submit"
                />
              </RouterLink>
            </div>
          </template>
        </Card>
      </div> -->
      <RouterView />
  <!-- </div> -->
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
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
