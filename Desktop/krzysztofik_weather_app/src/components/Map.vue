<template>
  <div class="siema">
    <div class="container">
      <div class="side-bar">
        <Card style="width: 12rem; padding: 0">
          <template #content>
            <div class="tab-menu flex">
              <p class="date margin-0">{{ time }}</p>
              <p class="date margin-0">{{ today }}</p>
              <Button class="btn" label="Basic info" />
              <Button
                
                @click="$emit()"
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
    </div>
      <HomeView></HomeView>
    
  </div>
</template>

<script>
import { provide } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'
import { ref } from 'vue'
// export default {
//   data() {
//     return {
//       interval: null,
//       time: null,
//     }
//   },
//   beforeDestroy() {
//     // prevent memory leak
//     clearInterval(this.interval)
//   },
//   created() {
//     // update the time every second
//     this.interval = setInterval(() => {
//       // Concise way to format time according to system locale.
//       // In my case this returns "3:48:00 am"
//       this.time = Intl.DateTimeFormat(navigator.language, {
//         hour: 'numeric',
//         minute: 'numeric',
//         second: 'numeric',
//       }).format()
//     }, 1000)
//   },
// }
// export default defineComponent({
//   components: { GoogleMap, Marker },
//   setup() {
//     const center = { lat: 40.689247, lng: -74.044502 };

//     return { center };
//   },
// });

// let time=ref('')
// function watch() {
//   setInterval(updateTime, 1000);
// }
// watch()
//  function  updateTime() {
//     var cd = new Date();
//     time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
//     return time;
// };

// function zeroPadding(num, digit) {
//     var zero = '';
//     for(var i = 0; i < digit; i++) {
//         zero += '0';
//     }
//     return (zero + num).slice(-digit);
// }
</script>
