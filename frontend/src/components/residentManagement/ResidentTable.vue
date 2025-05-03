<template>
  <div class="table-responsive mb-4">
    <table
      class="table align-middle shadow-sm rounded overflow-hidden"
      style="background-color: white"
    >
      <thead style="background-color: var(--primary); color: white">
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Room ID</th>
          <th>Medical Notes</th>
          <th>Allergies</th>
          <th>Medications</th>
          <th>Care Plan</th>
          <th>Emergency Contact</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(resident, index) in residents" :key="resident.id">
          <!-- Name -->
          <td>
            <div v-if="editingIndex === index">
              <input v-model="resident.name" class="form-control" />
            </div>
            <div v-else>{{ resident.name }}</div>
          </td>

          <!-- Age -->
          <td>
            <div v-if="editingIndex === index">
              <input
                type="number"
                v-model.number="resident.age"
                class="form-control"
                min="0"
              />
            </div>
            <div v-else>{{ resident.age }}</div>
          </td>

          <!-- Room ID -->
          <td>
            <div v-if="editingIndex === index">
              <input v-model="resident.room_id" class="form-control" />
            </div>
            <div v-else>{{ resident.room_id }}</div>
          </td>

          <!-- Medical Notes -->
          <td>
            <div v-if="editingIndex === index">
              <input v-model="resident.medical_notes" class="form-control" />
            </div>
            <div v-else>{{ resident.medical_notes || '-' }}</div>
          </td>

          <!-- Allergies -->
          <td>
            <div v-if="editingIndex === index">
              <input v-model="resident.allergiesString" class="form-control" />
            </div>
            <div v-else>{{ resident.allergies.join(', ') }}</div>
          </td>

          <!-- Medications -->
          <td>
            <div v-if="editingIndex === index">
              <input
                v-model="resident.medicationsString"
                class="form-control"
              />
            </div>
            <div v-else>
              {{ resident.medications.map((m) => m.name).join(', ') }}
            </div>
          </td>

          <!-- Care Plan -->
          <td>
            <div>
              <ul>
                <li v-for="(tasks, shift) in resident.care_plan" :key="shift">
                  <strong>{{ shift }}:</strong> {{ tasks.length }} tasks
                </li>
              </ul>
            </div>
          </td>

          <!-- Emergency Contact -->
          <td>
            <div v-if="editingIndex === index">
              <input
                v-model="resident.emergency_contact"
                class="form-control"
              />
            </div>
            <div v-else>{{ resident.emergency_contact || '-' }}</div>
          </td>

          <!-- Action -->
          <td>
            <div class="d-flex gap-2">
              <button
                v-if="editingIndex !== index"
                class="btn btn-sm btn-outline-primary"
                @click="editResident(index)"
              >
                Edit
              </button>
              <button
                v-else
                class="btn btn-sm btn-success"
                @click="saveResident"
              >
                Save
              </button>
              <button
                class="btn btn-sm btn-danger"
                @click="confirmDelete(index)"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  residents: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['remove', 'save'])

const editingIndex = ref(null)

const editResident = (index) => {
  const resident = props.residents[index]
  resident.allergiesString = resident.allergies.join(', ')
  resident.medicationsString = resident.medications
    .map((m) => m.name)
    .join(', ')
  editingIndex.value = index
}

const saveResident = () => {
  const index = editingIndex.value
  const resident = props.residents[index]
  // Parse edited strings back into arrays
  resident.allergies = resident.allergiesString.split(',').map((s) => s.trim())
  resident.medications = resident.medicationsString
    .split(',')
    .map((name) => ({ name }))
  editingIndex.value = null
  emit('save', resident)
}

const confirmDelete = (index) => {
  const residentId = props.residents[index].id
  const confirmed = confirm(
    `Are you REALLY sure you want to delete ${props.residents[index].name}?`
  )
  if (confirmed) {
    emit('remove', residentId)
    if (editingIndex.value === index) {
      editingIndex.value = null
    }
  }
}
</script>

<style scoped>
.table {
  margin-top: 1rem;
}
</style>

<style scoped>
.table {
  margin-top: 1rem;
  border-collapse: collapse;
}

.table thead th {
  background-color: var(--primary);
  color: white;
  padding: 0.75rem;
  text-align: left;
}

.table tbody td {
  padding: 0.75rem;
  vertical-align: middle;
}

.table tbody tr:nth-child(even) {
  background-color: #f8f8f8;
}

.table tbody tr:hover {
  background-color: var(--gray);
}
ul {
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
}
</style>
