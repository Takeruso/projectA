<template>
  <div class="table-responsive mb-4">
    <table
      class="table align-middle shadow-sm rounded overflow-hidden"
      style="background-color: white"
    >
      <thead style="background-color: var(--primary); color: white">
        <tr>
          <th class="text-center">Name</th>
          <th class="text-center">Age</th>
          <th class="text-center">Room</th>
          <th class="text-center">Floor</th>
          <th class="text-center">Status</th>
          <th class="text-center">Approval</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(resident, index) in residents" :key="index">
          <!-- Name -->
          <td class="text-center">
            <div v-if="editingIndex === index">
              <input v-model="resident.name" class="form-control" />
            </div>
            <div v-else>{{ resident.name }}</div>
          </td>

          <!-- Age -->
          <td class="text-center">
            <div v-if="editingIndex === index">
              <input
                type="number"
                v-model.number="resident.age"
                class="form-control text-center"
                min="0"
              />
            </div>
            <div v-else>{{ resident.age }}</div>
          </td>

          <!-- Room -->
          <td class="text-center">
            <div v-if="editingIndex === index">
              <input v-model="resident.room" class="form-control text-center" />
            </div>
            <div v-else>{{ resident.room }}</div>
          </td>

          <!-- Floor -->
          <td class="text-center">
            <div v-if="editingIndex === index">
              <select v-model="resident.floor" class="form-select">
                <option value="1F">1F</option>
                <option value="2F">2F</option>
              </select>
            </div>
            <div v-else>{{ resident.floor }}</div>
          </td>

          <!-- Status -->
          <td class="text-center">
            <div v-if="editingIndex === index">
              <select v-model="resident.status" class="form-select">
                <option value="present">Present</option>
                <option value="hospitalized">Hospitalized</option>
                <option value="on_leave">On Leave</option>
              </select>
            </div>
            <div v-else>
              <span
                class="badge rounded-pill px-3 py-2"
                :class="{
                  'bg-success': resident.status === 'present',
                  'bg-danger': resident.status === 'hospitalized',
                  'bg-warning text-dark': resident.status === 'on_leave'
                }"
              >
                {{ capitalize(resident.status) }}
              </span>
            </div>
          </td>

          <!-- Approval -->
          <td class="text-center">
            <div v-if="editingIndex === index">
              <select v-model="resident.approval" class="form-select">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="admitted">Admitted</option>
              </select>
            </div>
            <div v-else>
              <span
                class="badge rounded-pill px-3 py-2"
                :class="{
                  'bg-warning text-dark': resident.approval === 'pending',
                  'bg-success': resident.approval === 'approved',
                  'bg-danger': resident.approval === 'rejected',
                  'bg-primary': resident.approval === 'admitted'
                }"
              >
                {{ capitalize(resident.approval) }}
              </span>
            </div>
          </td>

          <!-- Action -->
          <td class="text-center">
            <div class="d-flex justify-content-center gap-2 flex-wrap">
              <button
                v-if="editingIndex !== index"
                class="btn btn-outline-primary btn-sm rounded-pill"
                @click="editResident(index)"
              >
                <i class="fas fa-edit me-1"></i> Edit
              </button>

              <button
                v-else
                class="btn btn-success btn-sm rounded-pill"
                @click="saveResident"
              >
                <i class="fas fa-check me-1"></i> Save
              </button>

              <button
                v-if="editingIndex !== index && resident.approval === 'pending'"
                class="btn btn-success btn-sm rounded-pill"
                @click="approve(index)"
              >
                Approve
              </button>

              <button
                v-if="editingIndex !== index && resident.approval === 'pending'"
                class="btn btn-danger btn-sm rounded-pill"
                @click="reject(index)"
              >
                Reject
              </button>
              <!-- Delete -->
              <button
                class="btn btn-outline-danger btn-sm rounded-pill"
                @click="confirmDelete(index)"
              >
                <i class="fas fa-trash-alt me-1"></i> Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const editingIndex = ref(null)
// const residents = reactive([
//   {
//     name: 'Taro Yamada',
//     age: 82,
//     room: '101',
//     floor: '1F',
//     status: 'present',
//     approval: 'admitted'
//   },
//   {
//     name: 'Hanako Suzuki',
//     age: 85,
//     room: '102',
//     floor: '1F',
//     status: 'on_leave',
//     approval: 'approved'
//   },
//   {
//     name: 'Kenta Tanaka',
//     age: 79,
//     room: '201',
//     floor: '2F',
//     status: 'hospitalized',
//     approval: 'pending'
//   }
// ])
// props
const props = defineProps({
  residents: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['remove'])

const editResident = (index) => {
  editingIndex.value = index
}

const saveResident = () => {
  editingIndex.value = null
}

const approve = (index) => {
  props.residents[index].approval = 'approved'
}

const reject = (index) => {
  props.residents[index].approval = 'rejected'
}

const confirmDelete = (index) => {
  const confirmed = confirm(
    `Are you REALLY sure you want to delete ${props.residents[index].name}?`
  )
  if (confirmed) {
    emit('remove', index)
    if (editingIndex.value === index) {
      editingIndex.value = null
    }
  }
}

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)
</script>

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
</style>
