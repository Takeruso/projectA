<template>
  <section class="bg-white rounded shadow-sm p-4 mt-4">
    <h5 class="mb-3 text-dark">
      <i class="fas fa-user-plus text-primary me-2"></i>
      Add New Resident
    </h5>

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

      <!-- Room ID -->
      <div class="col-md-2">
        <input
          v-model="local.room_id"
          type="text"
          class="form-control"
          placeholder="Room ID"
          required
        />
      </div>

      <!-- Gender -->
      <div class="col-md-2">
        <select v-model="local.gender" class="form-select">
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <!-- Date of Birth -->
      <div class="col-md-3">
        <input
          v-model="local.dob"
          type="date"
          class="form-control"
          placeholder="Date of Birth"
        />
      </div>

      <!-- Nationality -->
      <div class="col-md-3">
        <input
          v-model="local.nationality"
          type="text"
          class="form-control"
          placeholder="Nationality"
        />
      </div>

      <!-- Resident Type -->
      <div class="col-md-4">
        <select v-model="local.resident_type" class="form-select">
          <option value="">Resident Type</option>
          <option value="Short Term">Short Term</option>
          <option value="Long Term">Long Term</option>
          <option value="Palliative Care">Palliative Care</option>
        </select>
      </div>

      <!-- Medical Notes -->
      <div class="col-md-12">
        <textarea
          v-model="local.medical_notes"
          class="form-control"
          placeholder="Medical Notes"
          rows="2"
        ></textarea>
      </div>

      <!-- Allergies -->
      <div class="col-md-6">
        <input
          v-model="local.allergiesInput"
          type="text"
          class="form-control"
          placeholder="Allergies (comma-separated)"
        />
      </div>

      <!-- Medications -->
      <div class="col-md-6">
        <input
          v-model="local.medicationsInput"
          type="text"
          class="form-control"
          placeholder="Medications (comma-separated)"
        />
      </div>

      <!-- Care Plan Morning -->
      <div class="col-md-6">
        <input
          v-model="local.carePlanMorning"
          type="text"
          class="form-control"
          placeholder="Morning Tasks (comma-separated)"
        />
      </div>

      <!-- Care Plan Evening -->
      <div class="col-md-6">
        <input
          v-model="local.carePlanEvening"
          type="text"
          class="form-control"
          placeholder="Evening Tasks (comma-separated)"
        />
      </div>

      <!-- Previous Medical History -->
      <div class="col-md-12">
        <textarea
          v-model="local.previous_medical_history"
          class="form-control"
          placeholder="Previous Medical History"
          rows="2"
        ></textarea>
      </div>

      <!-- Emergency Contact -->
      <div class="col-md-6">
        <input
          v-model="local.emergency_contact"
          type="text"
          class="form-control"
          placeholder="Emergency Contact"
        />
      </div>

      <!-- Notes for Caregivers -->
      <div class="col-md-12">
        <textarea
          v-model="local.caregiver_notes"
          class="form-control"
          placeholder="Notes for Caregivers"
          rows="2"
        ></textarea>
      </div>

      <!-- Photo Upload (frontend only) -->
      <div class="col-md-6">
        <input
          type="file"
          class="form-control"
          @change="handlePhotoUpload"
          accept="image/*"
        />
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
      room_id: '',
      medical_notes: '',
      allergies: [],
      medications: [],
      care_plan: {},
      emergency_contact: ''
    })
  }
})

const emit = defineEmits(['add'])

const local = reactive({
  ...props.resident,
  allergiesInput: '',
  medicationsInput: '',
  carePlanMorning: '',
  carePlanEvening: '',
  gender: '',
  dob: '',
  nationality: '',
  resident_type: '',
  caregiver_notes: '',
  photo: null
})

watch(
  () => props.resident,
  (newVal) => Object.assign(local, newVal),
  { deep: true, immediate: true }
)

const handleSubmit = () => {
  const formattedResident = {
    name: local.name,
    age: local.age,
    room_id: local.room_id,
    medical_notes: local.medical_notes,
    allergies: local.allergiesInput.split(',').map((a) => a.trim()),
    medications: local.medicationsInput.split(',').map((m) => m.trim()),
    care_plan: {
      Morning: local.carePlanMorning.split(',').map((t) => t.trim()),
      Evening: local.carePlanEvening.split(',').map((t) => t.trim())
    },
    emergency_contact: local.emergency_contact
  }

  emit('add', formattedResident)
}

const handlePhotoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    local.photo = file
  }
}
</script>

<style scoped>
form {
  background-color: white;
}

input::placeholder,
textarea::placeholder,
select {
  font-size: 0.95rem;
}

.form-control,
.form-select {
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
