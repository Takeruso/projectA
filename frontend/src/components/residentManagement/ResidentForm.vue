<template>
  <section class="bg-white rounded shadow-sm p-4 mt-4">
    <!-- Form Title OMG -->
    <h5 class="mb-3 text-dark">
      <i class="fas fa-user-plus text-primary me-2"></i>
      Add New Resident
    </h5>

    <!-- Form -->
    <form class="row g-3" @submit.prevent="handleSubmit">
      <!-- Name -->
      <div class="col-md-4">
        <input
          v-model="local.name"
          type="text"
          class="form-control"
          placeholder="Name"
          required
        />
      </div>

      <!-- Age -->
      <div class="col-md-2">
        <input
          v-model.number="local.age"
          type="number"
          class="form-control"
          placeholder="Age"
          min="0"
          required
        />
      </div>

      <!-- Room -->
      <div class="col-md-2">
        <input
          v-model="local.room"
          type="text"
          class="form-control"
          placeholder="Room"
          required
        />
      </div>

      <!-- Floor -->
      <div class="col-md-2">
        <select v-model="local.floor" class="form-select" required>
          <option disabled value="">Floor</option>
          <option value="1F">1F</option>
          <option value="2F">2F</option>
        </select>
      </div>

      <!-- Status -->
      <div class="col-md-3">
        <select v-model="local.status" class="form-select" required>
          <option disabled value="">Status</option>
          <option value="present">Present</option>
          <option value="hospitalized">Hospitalized</option>
          <option value="on_leave">On Leave</option>
        </select>
      </div>

      <!-- Approval -->
      <div class="col-md-3">
        <select v-model="local.approval" class="form-select" required>
          <option disabled value="">Approval</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="admitted">Admitted</option>
        </select>
      </div>

      <!-- Submit Button -->
      <div class="col-12 text-center mt-3">
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
  resident: {
    type: Object,
    default: () => ({
      name: '',
      age: 0,
      room: '',
      floor: '',
      status: '',
      approval: 'pending'
    })
  }
})

const emit = defineEmits(['add'])

const local = reactive({ ...props.resident })

watch(
  () => props.resident,
  (newVal) => Object.assign(local, newVal),
  { deep: true, immediate: true }
)

const handleSubmit = () => {
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
