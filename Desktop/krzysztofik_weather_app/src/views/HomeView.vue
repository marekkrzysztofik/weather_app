<template>
  <div class="container">
    <div class="search-box">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText
          v-model="searchQuery"
          class="searchbox"
          type="text"
          placeholder="Search"
        />
      </span>
      <Button @click="currentWeather(searchQuery)" label="Submit" />
    </div>
    <div class="cards">
      <div>
        <Card style="width: 6rem">
          <template #content>
            <div class="card1">
              <Button class="btn" label="Basic info" />
              <Button
                @click="getWeatherForecast(searchQuery)"
                class="btn"
                label="Details"
              />
              <Button class="btn" label="Submit" />
            </div>
          </template>
        </Card>
      </div>
      <div>
        <Card class="card" style="width: 30rem">
          <template #content>
            <div class="flex">
              {{ today }}
              <p v-if="loader">{{ searchQuery }}</p>
              <p>{{ description }}</p>
              <img v-if="loader" class="icon" :src="`/icons/${icon}.svg`" />
              <p v-if="loader">{{ basicInfo.temp }}℃</p>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
let loader = false
const now = new Date()
var months = now.getMonth() + 1
if (months < 11) {
  months = '' + now.getMonth() + 1
}
const today = now.getDate() + '.' + months + '.' + now.getFullYear()

const searchQuery = ref('')
const weatherData = ref('')
const basicInfo = ref('')
const description = ref('')
const icon = ref('')

const currentWeather = async (query) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=11f8ef5fb876de2d2394104040969315`

  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      weatherData.value = data
    })
  loader = true
  description.value = weatherData.value.weather[0].description
  basicInfo.value = weatherData.value.main
  icon.value = weatherData.value.weather[0].icon

  //console.log(basicInfo.value)
}

const getWeatherForecast = async (query) => {
  const forecast = `http://api.openweathermap.org/data/2.5/forecast?q=${query}&cnt=8&appid=11f8ef5fb876de2d2394104040969315`

  const weatherForecast = await axios.get(forecast)
  console.log(weatherForecast.data.list[0].dt_txt)
}
</script>

<style scoped>
.searchbox {
  width: 520px;
}
</style>
