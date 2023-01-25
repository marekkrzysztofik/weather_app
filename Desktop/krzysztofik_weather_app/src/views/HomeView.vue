<template>
  <div class="container">
    <div class="flex">
      <Card style="width: 12rem; padding: 0; height: 17rem;">
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
        <Card v-if="allData.mainTemp!=0" class="card" style="width: 20rem; padding: 0">
          <template #title>
            <div class="flex">
              <p class="margin-0">
                Current weather in {{ searchQuery }}
              </p>
              <img class="icon" :src="`/icons/${allData.icon}.svg`" />
            </div>
          </template>
          <template #content>
            <div class="flex main-info">
              <p class="main-temp margin-0">
                {{ allData.mainTemp }} ℃
              </p>
              <div>
                <p class="margin-0">{{ allData.description }}</p>
              </div>
            </div>
          </template>
        </Card>
        <Card class="card" style="width: 35rem; padding: 0">
          
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
    <div class="cards">
      <div v-for="item3 of dailyTemp.temp">
        elo
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
  mainTemp:'',
  description:'',
  icon:''
})
console.log(allData.value.openingHours)
const currentWeather = async (query) => {
  clearData()
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=11f8ef5fb876de2d2394104040969315`
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
     allData.value.mainTemp=data.main.temp
     allData.value.description=data.weather[0].description
     allData.value.icon=data.weather[0].icon
     console.log(allData.value.icon)
    })
}

const temp = ref([])
const detailsIcon = ref([])

const dailyTemp = ref({
  temp:[],
  detailsIcon:[]
})
const getWeatherForecast = async (query) => {
  const apiLink = `http://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=11f8ef5fb876de2d2394104040969315`
  const pogoda = await axios.get(apiLink)
  let forecast = pogoda.data.list
  
  if (temp.value.length == 0 && detailsIcon.value.length == 0) {
    await forecast.slice(0,8).forEach((hour) => {
        temp.value.push(hour.main.temp)
      detailsIcon.value.push(hour.weather[0].icon)
    })
  } 
  if (dailyTemp.value.temp.length == 0 && dailyTemp.value.detailsIcon == 0) {
    for (let a = 0; a < forecast.length; a++) {
      if(a%4===0) {
        dailyTemp.value.temp.push(forecast[a].main.temp)
        dailyTemp.value.detailsIcon.push(forecast[a].weather[0].icon)
      }
    }
  }
  console.log(dailyTemp.value)
}

const clearData = () => {
  for (let i = 0; i < 8; i++) {
    temp.value.pop(i)
    detailsIcon.value.pop(i)
  }
  console.log(temp)
}
</script>

<style scoped></style>
