<template>
  <Home></Home>
  <Toast />
  <div class="flex">
    <div class="flex margin-10">
      <Card
        class="br-10 bg-third"
        style="width: 12rem; padding: 0; height: 17rem"
      >
        <template #content>
          <div class="tab-menu flex">
            <p class="date margin-0">{{ today }}</p>
            <Button class="btn" label="Basic info" />
            <Button
              @click="getWeatherForecast(searchQuery)"
              class="btn"
              label="Details"
            />

            <Button role="link" class="btn" label="Submit" />
          </div>
        </template>
      </Card>
    </div>
    <div class="cards bg-third br-10">
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
      <div v-if="allData.description!=0" class="flex">
        <Card class="card bg-third" style="width: 20rem; padding: 0">
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
        <Card
          class="card bg-third"
          style="width: 30rem; padding: 0"
        >
          <template #title> </template>

          <template #content>
            <div class="flex cards center">
              <h3>Wind speed: {{ allData.windSpeed }}m/s</h3>
              <h3>Air pressure: {{ allData.pressure }}hPa</h3>
              <h3>Humidity: {{ allData.humidity }}%</h3>
            </div>
          </template>
        </Card>
      </div>

      <!-- <div class="flex details">
        <h2 v-for="time of hourlyWeather.weatherTime">{{ time }}</h2>
      </div> -->
      <div class="bg-sec white margin-10 br-10">
        <h2 class="margin-10" v-if="hourlyWeather.realTime != 0">
        {{
          allData.timezone != 0 ? 'Polish time ' + allData.timezone + 'h' : ''
        }}
      </h2>
      <div class="flex details ">
        <h4 v-for="time of hourlyWeather.realTime">{{ time }}</h4>
      </div>
      <div class="flex details">
        <img
          v-for="icon of hourlyWeather.detailsIcon"
          class="details-img"
          :src="`/icons/${icon}.svg`"
          alt="weather-icon"
        />
      </div>
      <div class="flex details">
        <p v-for="item of hourlyWeather.temp">{{ item }} ℃</p>
      </div>
    </div>
      </div>
      

    <div
      v-if="dailyWeather.temp != 0"
      class="flex margin-10 bg-third padding-10 br-10"
    >
      <p class="margin-0">next:</p>

      <div class="cards-1">
        <div v-for="hours of dailyWeather.timeIntervals" class="daily-item">
          <h2>{{ hours }}h</h2>
        </div>
      </div>
      <div class="cards-1">
        <div class="cards-1">
          <img
            v-for="icon2 of dailyWeather.detailsIcon"
            class="details-img-1"
            :src="`/icons/${icon2}.svg`"
            alt="weather-icon"
          />
        </div>
      </div>

      <div class="cards-1 margin-10">
        <div v-for="desc of dailyWeather.description" class="daily-item">
          <p>{{ desc }}</p>
        </div>
      </div>
      <div class="cards-1 margin-10">
        <div v-for="temp of dailyWeather.temp" class="daily-item">
          <p>{{ temp }} ℃</p>
        </div>
      </div>
      <div class="cards-1 margin-10">
        <div v-for="feelsLike of dailyWeather.feelsLike" class="daily-item">
          <p class="margin-0">{{ feelsLike }} ℃</p>
          <p><i>feels like</i></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios, { all } from 'axios'
import { useToast } from 'primevue/usetoast'
import { RouterLink } from 'vue-router'
import Home from '../components/Home.vue'
const toast = useToast()
const showError = () => {
  toast.add({
    severity: 'error',
    summary: 'Error',
    detail: 'Could not find city!',
    life: 3000,
  })
}
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
  timezone: '',
  windSpeed: '',
  humidity: '',
  pressure: '',
})

const currentWeather = async (query) => {
  clearData()
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=11f8ef5fb876de2d2394104040969315`
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allData.value.mainTemp = data.main.temp
      allData.value.description = data.weather[0].description
      allData.value.icon = data.weather[0].icon
      allData.value.timezone = data.timezone / 3600 - 1
      allData.value.windSpeed = data.wind.speed
      allData.value.humidity = data.main.humidity
      allData.value.pressure = data.main.pressure
      console.log(allData.value)
    })
    .catch(() => {
      console.log('siemanko')
      showError()
      allData.value.mainTemp = 'error'
    })
}
const hourlyWeather = ref({
  temp: [],
  detailsIcon: [],
  weatherDate: [],
  weatherTime: [],
  realTime: [],
})
const dailyWeather = ref({
  temp: [],
  feelsLike: [],
  detailsIcon: [],
  description: [],
  timeIntervals: [24, 48, 72, 96],
})

const getWeatherForecast = async (query) => {
  const apiLink = `http://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=11f8ef5fb876de2d2394104040969315`
  const pogoda = await axios.get(apiLink)
  let forecast = pogoda.data.list
  if (
    hourlyWeather.value.temp.length == 0 &&
    hourlyWeather.value.detailsIcon.length == 0
  ) {
    await forecast.slice(0, 8).forEach((hour) => {
      hourlyWeather.value.temp.push(hour.main.temp)
      hourlyWeather.value.detailsIcon.push(hour.weather[0].icon)
      hourlyWeather.value.weatherDate.push(new Date(hour.dt_txt))
    })
    hourlyWeather.value.weatherDate.forEach((date) => {
      addHours(date, allData.value.timezone)
    })
    hourlyWeather.value.weatherTime.forEach((el) => {
      hourlyWeather.value.realTime.push(el.getHours() + ':00')
    })
    console.log(hourlyWeather.value.realTime)
  }
  if (
    dailyWeather.value.temp.length == 0 &&
    dailyWeather.value.detailsIcon == 0
  ) {
    for (let a = 1; a < forecast.length; a++) {
      if (a % 8 === 0) {
        dailyWeather.value.temp.push(forecast[a].main.temp)
        dailyWeather.value.feelsLike.push(forecast[a].main.feels_like)
        dailyWeather.value.detailsIcon.push(forecast[a].weather[0].icon)
        dailyWeather.value.description.push(forecast[a].weather[0].main)
      }
    }
  }
  console.log(forecast)
}
function addHours(date, hours) {
  date.setHours(date.getHours() + hours)
  hourlyWeather.value.weatherTime.push(date)
}
const clearData = () => {
  for (let i = 0; i < 8; i++) {
    hourlyWeather.value.temp.pop(i)
    hourlyWeather.value.detailsIcon.pop(i)
    hourlyWeather.value.weatherDate.pop(i)
    hourlyWeather.value.weatherTime.pop(i)
    hourlyWeather.value.realTime.pop(i)
  }
  for (let x = 0; x < 9; x++) {
    dailyWeather.value.temp.pop(x)
    dailyWeather.value.feelsLike.pop(x)
    dailyWeather.value.detailsIcon.pop(x)
    dailyWeather.value.description.pop(x)
  }
}
</script>

<style scoped></style>
