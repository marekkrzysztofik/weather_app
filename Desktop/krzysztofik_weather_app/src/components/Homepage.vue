<template>
  <Home></Home>
  
    <div class="flex center box bg-sec br-10 white">
    <div>
      <h1>Welcome to WeatherApp </h1>
      <img class="img" src="/icons/1.jpeg" alt="landscape">
    </div>
  

  
  </div>
  
  <footer class="flex cards center" id="footer">
    <div class="flex">
      <a href="https://www.facebook.com"
        ><i class="pi pi-facebook"></i
      ></a>
      <a href="https://www.twitter.com/"
        ><i class="pi pi-twitter"></i
      ></a>
      <a href="https://www.instagram.com/"
        ><i class="pi pi-instagram"></i
      ></a>
      <a href="mailto:name@email.com"><i class="pi pi-envelope"></i></a>
    </div>
      
      <p class="social">© Copyright 2023 WeatherApp</p>
    </footer>

</template>
<script setup>
import Home from '../components/Home.vue'
</script>

<style scoped>
.img {
width: 600px;
}
.pi {
  font-size: 25px;
  margin: 30px 10px 5px;
}
.box {
  width: 1000px;
  margin: auto;
  padding: 20px;
}
</style>