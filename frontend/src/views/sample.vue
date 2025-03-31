<template>
  <div class="container mt-5">
    <h1 class="text-primary">
      <i class="fas fa-user-circle me-2"></i>
      Welcome to Example Page
    </h1>

    <p>This page uses:</p>
    <ul class="list-group">
      <li class="list-group-item">
        <i class="fab fa-vuejs text-success me-2"></i> Vue 3 (via script setup)
      </li>
      <li class="list-group-item">
        <i class="fas fa-bold text-info me-2"></i> Bootstrap 5
      </li>
      <li class="list-group-item">
        <i class="fas fa-icons text-warning me-2"></i> Font Awesome
      </li>
    </ul>

    <button class="btn btn-success mt-3" @click="count++">
      <i class="fas fa-plus-circle me-1"></i>
      Clicked {{ count }} times
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
