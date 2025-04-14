<template>
  <section class="bg-white rounded shadow-sm p-4 mt-4">
    <!-- Form Title -->
    <h5 class="mb-3 text-dark">
      <i class="fas fa-door-open text-primary me-2"></i>
      Add New Room
    </h5>

    <!-- Form -->
    <form class="row g-3" @submit.prevent="handleSubmit">
      <!-- Room ID -->
      <div class="col-md-2">
        <input
          v-model="local.id"
          class="form-control"
          placeholder="Room ID"
          required
        />
      </div>

      <!-- Type -->
      <div class="col-md-2">
        <select v-model="local.type" class="form-select" required>
          <option disabled value="">Type</option>
          <option value="Single">Single</option>
          <option value="Shared">Shared</option>
        </select>
      </div>

      <!-- Floor -->
      <div class="col-md-2">
        <select v-model="local.floor" class="form-select" required>
          <option disabled value="">Floor</option>
          <option>1F</option>
          <option>2F</option>
          <option>3F</option>
        </select>
      </div>

      <!-- Capacity -->
      <div class="col-md-2">
        <select v-model.number="local.capacity" class="form-select" required>
          <option disabled value="">Capacity</option>
          <option :value="1">1</option>
          <option :value="2">2</option>
        </select>
      </div>

      <!-- Occupied -->
      <div class="col-md-2">
        <select
          v-model.number="local.occupied"
          class="form-select"
          :disabled="!local.capacity"
          required
        >
          <option disabled value="">Occupied</option>
          <option v-for="n in local.capacity" :key="n" :value="n - 1">
            {{ n - 1 }}
          </option>
          <option :value="local.capacity">{{ local.capacity }}</option>
        </select>
      </div>

      <!-- Status -->
      <div class="col-md-2">
        <select v-model="local.status" class="form-select" required>
          <option disabled value="">Status</option>
          <option value="Vacant">Vacant</option>
          <option value="Occupied">Occupied</option>
          <option value="Reserved">Reserved</option>
          <option value="Cleaning">Cleaning</option>
        </select>
      </div>

      <!-- Submit Button -->
      <div class="col-12 justify-content-center mt-3">
        <button type="submit" class="btn pink px-4">
          <i class="fas fa-paper-plane me-1"></i> Submit
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  room: {
    type: Object,
    default: () => ({
      id: '',
      type: '',
      floor: '',
      capacity: 1,
      occupied: 0,
      status: ''
    })
  }
})

const emit = defineEmits(['add'])

const local = reactive({ ...props.room })

watch(
  () => props.room,
  (newVal) => Object.assign(local, newVal),
  { deep: true, immediate: true }
)

const handleSubmit = () => {
  // occupied > capacity を防ぐためのガード
  if (local.occupied > local.capacity) {
    alert('Occupied cannot exceed Capacity')
    return
  }

  emit('add', { ...local })
}
</script>

<style scoped>
form {
  background-color: white;
}

input::placeholder,
select {
  font-size: 0.95rem;
}

/* .row {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.col {
  flex: 1;
  min-width: 160px;
} */

.form-control {
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 0.5rem;
  font-size: 0.95rem;
}

.btn.pink {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.btn.pink:hover {
  background-color: var(--primary-light);
}
</style>
