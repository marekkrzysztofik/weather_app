<template>
  <div class="container">
    <div>
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText
          v-model="searchQuery"
          class="searchbox"
          type="text"
          placeholder="Search"
        />
      </span>
      <Button @click="fetchWeather(searchQuery)" label="Submit" />
      <div class="cards">
        <div class="card1">
          <Card  style="width: 8rem; margin-bottom: 2em">
            <template #content>
              <Button class="btn" label="Submit" />
              <Button class="btn" label="Submit" />
              <Button class="btn" label="Submit" />
            </template>
          </Card>
        </div>

        <Card style="width: 25rem; margin-bottom: 2em">
          <template #title> {{now}} kocham cie marus </template>
          <template #content>
            <p>{{ weatherData }}</p>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'

const now = ref(new Date());
console.log(now);

const searchQuery = ref('')
const weatherData = ref('')

const fetchWeather = (query) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=11f8ef5fb876de2d2394104040969315`

  fetch(url)
    .then((response) => response.json())
    .then((data) => (weatherData.value = data), console.log(weatherData.value))
}
</script>

<style scoped>
.searchbox {
  width: 450px;
}
</style>
