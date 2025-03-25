<template>
    <div class="container mt-5">
      <h1>Dashboard</h1>
      <button @click="fetchHello" class="btn btn-primary">Get Hello</button>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import api from '../api'
  
  const message = ref('')
  
  const fetchHello = async () => {
    const res = await api.get('/api/hello')
    message.value = res.data.message
  }
  </script>
  