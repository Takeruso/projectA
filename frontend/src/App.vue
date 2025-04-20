<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <router-view />
  <Footer />
</template>

<script setup></script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
