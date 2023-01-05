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
          <Card style="width: 8rem; margin-bottom: 2em">
            <template #content>
              <Button class="btn" label="Basic info" />
              <Button class="btn" label="Details" />
              <Button class="btn" label="Submit" />
            </template>
          </Card>
        </div>

        <Card style="width: 25rem; margin-bottom: 2em">
          <template #title>
            {{ today }}
            <p>{{ searchQuery }}</p>
          </template>
          <template #content>
            <p>{{ description }}</p>
            <img class="icon" :src="`/icons/${icon}.svg`" />
            <p>{{ basicInfo.temp }}℃</p>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'

const now = new Date()
var months = now.getMonth() + 1
if (months < 11) {
  months = '' + now.getMonth() + 1
}
const today = now.getDate() + '.' + months + '.' + now.getFullYear()

const searchQuery = ref('')
const weatherData = ref('')
const basicInfo = ref('');
const description = ref('')
const icon = ref('')

const fetchWeather = async (query) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=11f8ef5fb876de2d2394104040969315`

  await fetch(url)
    .then((response) => response.json())
    .then((data) => (weatherData.value = data),
    console.log(weatherData.value))
  description.value = weatherData.value.weather[0].description
  basicInfo.value = weatherData.value.main
  icon.value = weatherData.value.weather[0].icon
  console.log(basicInfo.value)
}


</script>

<style scoped>
.searchbox {
  width: 450px;
}
</style>
