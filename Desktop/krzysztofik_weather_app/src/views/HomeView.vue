<template>
  <div class="container">
    <div class="flex">
      <Card style="width: 12rem; padding: 0; height: 17rem">
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
      <div class="flex">
        <Card
          v-if="allData.mainTemp != 0"
          class="card"
          style="width: 20rem; padding: 0"
        >
          <template #title>
            <div class="flex">
              <p class="margin-0">Current weather in {{ searchQuery }}</p>
              <img class="icon" :src="`/icons/${allData.icon}.svg`" />
            </div>
          </template>
          <template #content>
            <div class="flex main-info">
              <p class="main-temp margin-0">{{ allData.mainTemp }} ℃</p>
              <div>
                <p class="margin-0">{{ allData.description }}</p>
              </div>
            </div>
          </template>
        </Card>
        <Card class="card" style="width: 35rem; padding: 0"> </Card>
      </div>

      <div class="details-grid">
        <div v-for="item of hourlyWeather.temp" class="details-item">
          <h1>3h</h1>
          <p>{{ item }} ℃</p>
        </div>
        <img
          v-for="icon of hourlyWeather.detailsIcon"
          class="details-img"
          :src="`/icons/${icon}.svg`"
          alt="weather-icon"
        />
      </div>
    </div>
    <div class="cards-1">
      <div v-for="item2 of dailyWeather.temp" class="daily-item">
        <h1>3h</h1>
        <p>{{ item2 }} ℃</p>
      </div>
      
    </div>
    <div class="cards-1">
      <div class="cards">
        <img  v-for="icon2 of dailyWeather.detailsIcon"
          class="details-img-1"
          :src="`/icons/${icon2}.svg`"
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

let now = new Date()
var months = now.getMonth() + 1
if (months < 11) {
  months = '' + now.getMonth() + 1
}

const today = ref(now.getDate() + '.' + months + '.' + now.getFullYear())
const searchQuery = ref('')
const allData = ref({
  mainTemp: '',
  description: '',
  icon: '',
})
console.log(allData.value.openingHours)
const currentWeather = async (query) => {
  clearData()
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=11f8ef5fb876de2d2394104040969315`
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allData.value.mainTemp = data.main.temp
      allData.value.description = data.weather[0].description
      allData.value.icon = data.weather[0].icon
      console.log(allData.value.icon)
    })
}
const hourlyWeather = ref({
  temp:[],
  detailsIcon:[],
  weatherTime:[]
})
const dailyWeather = ref({
  temp: [],
  detailsIcon: [],
  weatherTime: []
})
const getWeatherForecast = async (query) => {
  const apiLink = `http://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=11f8ef5fb876de2d2394104040969315`
  const pogoda = await axios.get(apiLink)
  let forecast = pogoda.data.list

  if (hourlyWeather.value.temp.length == 0 && hourlyWeather.value.detailsIcon.length == 0) {
    await forecast.slice(0, 8).forEach((hour) => {
      hourlyWeather.value.temp.push(hour.main.temp)
      hourlyWeather.value.detailsIcon.push(hour.weather[0].icon)
      hourlyWeather.value.weatherTime.push(hour.dt_txt);
    })
  }
  if (dailyWeather.value.temp.length == 0 && dailyWeather.value.detailsIcon == 0) {
    for (let a = 1; a < forecast.length; a++) {
      if (a % 4 === 0) {
        dailyWeather.value.temp.push(forecast[a].main.temp)
        dailyWeather.value.detailsIcon.push(forecast[a].weather[0].icon)
        dailyWeather.value.weatherTime.push(forecast[a].dt_txt);
      }
    }
  }
  console.log(forecast,hourlyWeather.value.weatherTime,dailyWeather.value.weatherTime)
}

const clearData = () => {
  for (let i = 0; i < 8; i++) {
    hourlyWeather.value.temp.pop(i)
    hourlyWeather.value.detailsIcon.pop(i)
  }
  // for (let x = 0; x < 8; x++) {
  //   dailyTemp.value.temp.pop(x)
  //   dailyTemp.value.detailsIcon.pop(x)
  // }
}
</script>

<style scoped></style>
