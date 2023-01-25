<template>
  <!-- <GoogleMap api-key="" style="width: 100%; height: 500px" :center="center" :zoom="15">
    <Marker :options="{ position: center }" />
  </GoogleMap> -->
 
 {{time}}
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import {ref} from 'vue'
export default {
  data() {
    return {
      interval: null,
      time: null
    }
  },
  beforeDestroy() {
    // prevent memory leak
    clearInterval(this.interval)
  },
  created() {
    // update the time every second
    this.interval = setInterval(() => {
      // Concise way to format time according to system locale.
      // In my case this returns "3:48:00 am"
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }).format()
    }, 1000)
  }
}
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