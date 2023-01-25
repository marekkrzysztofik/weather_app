<template>
  <div class="container">
    <div>
      <Card style="width: 12rem; padding: 0">
        <template #content>
          <div class="tab-menu flex">
            <p class="date margin-0">{{ today }}</p>
            <Button class="btn" label="Basic info" />
            <Button
              @click="getWeatherForecast(searchQuery)"
              class="btn"
              label="Details"
            />
            <RouterLink to="/mapa" v-slot="{ navigate }" >
              <Button @click="navigate" role="link" class="btn" label="Submit" /> 
            </RouterLink>
            
          </div>
        </template>
      </Card>
    </div>
    <div class="cards">
      <div class="search-box">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="searchQuery"
            class="input-box"
            type="text"
            placeholder="Search"
          />
        </span>
        <Button @click="currentWeather(searchQuery)" label="Submit" />
      </div>
      <div>
        <Card class="card" style="width: 50rem; padding: 0">
          <template #title>
            <div class="flex">
              <p class="margin-0" v-if="loader">
                Current weather in {{ searchQuery }}
              </p>
              <img v-if="loader" class="icon" :src="`/icons/${icon}.svg`" />
            </div>
          </template>
          <template #content>
            <div class="flex main-info">
              <p class="main-temp margin-0" v-if="loader">
                {{ basicInfo.temp }} ℃
              </p>
              <div>
                <p class="margin-0">{{ description }}</p>
              </div>
            </div>
          </template>
        </Card>
      </div>
      
        <div class="details-grid">
            <div v-for="item of temp" class="details-item">
              <h1>3h</h1>
              <p>{{ item }} ℃</p>
            </div>
              <img
              v-for="item2 of detailsIcon"
              class="details-img"
              :src="`/icons/${item2}.svg`"
              alt="weather-icon"
              />
        </div>
            
        
      
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'
let loader = false
let now = new Date()
var months = now.getMonth() + 1
if (months < 11) {
  months = '' + now.getMonth() + 1
}

const today = ref(now.getDate() + '.' + months + '.' + now.getFullYear())
const searchQuery = ref('')
const weatherData = ref('')
const basicInfo = ref('')
const description = ref('')
const icon = ref('')

const currentWeather = async (query) => {
  clearData()
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
}

const temp = ref([])
const detailsIcon = ref([])

const getWeatherForecast = async (query) => {
  const apiLink = `http://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&cnt=8&appid=11f8ef5fb876de2d2394104040969315`
  const pogoda = await axios.get(apiLink)
  let forecast = pogoda.data.list
  if (temp.value.length == 0 && detailsIcon.value.length == 0) {
    await forecast.forEach((hour) => {
      temp.value.push(hour.main.temp)
      detailsIcon.value.push(hour.weather[0].icon)
    })
  }
  console.log(temp.value.length)
}

const clearData = () => {
  for (let i = 0; i < 8; i++) {
  temp.value.pop(i);
  detailsIcon.value.pop(i);
}
  console.log(temp);
}


</script>

<style scoped></style>
