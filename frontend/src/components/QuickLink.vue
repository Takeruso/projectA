<template>
  <div class="col-md-6 col-lg-3">
    <div class="card h-100 shadow-sm hover-shadow" @click="handleClick">
      <div :class="['card-body d-flex flex-column', `text-${color}`]">
        <div class="mb-3 fs-3">
          <i :class="icon"></i>
        </div>
        <h5 class="card-title text-dark">{{ title }}</h5>
        <p class="card-text text-muted flex-grow-1">{{ description }}</p>
        <button class="btn btn-sm" :class="`btn-${color}`">
          {{ btnText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: String,
  title: String,
  description: String,
  btnText: String,
  color: String
})

const handleClick = () => {
  // placeholder for navigation
  alert(`Clicked: ${props.title}`)
}
</script>
