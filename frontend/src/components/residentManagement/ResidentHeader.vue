<template>
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h2 class="text-dark">
      <i class="fas fa-person-cane text-primary me-2"></i>
      Resident Management
    </h2>
    <span class="badge bg-secondary">{{ count }} Residents</span>
  </div>
</template>

<script setup>
defineProps({
  count: Number
})
</script>
