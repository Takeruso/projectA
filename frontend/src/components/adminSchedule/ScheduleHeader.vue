<template>
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h2 class="text-dark">
      <i class="fas fa-calendar-check text-primary me-2"></i>
      Staff Shift Schedule
    </h2>
    <span class="badge bg-secondary">{{ count }} Shifts</span>
  </div>
</template>

<script setup>
defineProps({
  count: Number
})
</script>
