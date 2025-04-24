<template>
  <div class="table-responsive mb-4">
    <table
      class="table align-middle shadow-sm rounded overflow-hidden"
      style="background-color: white"
    >
      <thead style="background-color: var(--primary); color: white">
        <tr>
          <th class="text-center">Room ID</th>
          <th class="text-center">Type</th>
          <th class="text-center">Floor</th>
          <th class="text-center">Capacity</th>
          <th class="text-center">Occupied</th>
          <th class="text-center">Status</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(room, index) in rooms" :key="index">
          <td class="text-center">{{ room.id }}</td>

          <!-- Type -->
          <td class="text-center">
            <div v-if="editingIndex === index">
              <select v-model="room.type" class="form-select">
                <option value="single">Single</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div v-else>{{ room.type }}</div>
          </td>

          <!-- Floor -->
          <td class="text-center">
            <div v-if="editingIndex === index">
              <select v-model="room.floor" class="form-select">
                <option value="1F">1F</option>
                <option value="2F">2F</option>
              </select>
            </div>
            <div v-else>{{ room.floor }}</div>
          </td>

          <!-- Capacity (readonly) -->
          <td class="text-center">
            <input
              class="form-control text-center"
              :value="room.capacity"
              readonly
              style="border: none; background: transparent"
            />
          </td>

          <!-- Occupied -->
          <td class="text-center">
            <div v-if="editingIndex === index">
              <input
                type="number"
                class="form-control text-center"
                v-model.number="room.occupied"
                :max="room.capacity"
                min="0"
              />
            </div>
            <div v-else>{{ room.occupied }}</div>
          </td>

          <!-- Status -->
          <td class="text-center">
            <div v-if="editingIndex === index">
              <select v-model="room.status" class="form-select">
                <option value="vacant">Vacant</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
                <option value="cleaning">Cleaning</option>
              </select>
            </div>
            <div v-else>
              <span
                class="badge rounded-pill px-3 py-2"
                :class="{
                  'bg-success': room.status === 'vacant',
                  'bg-danger': room.status === 'occupied',
                  'bg-warning text-dark': room.status === 'reserved',
                  'bg-secondary': room.status === 'cleaning'
                }"
              >
                {{ capitalize(room.status) }}
              </span>
            </div>
          </td>

          <!-- Action -->
          <td class="text-center">
            <button
              v-if="editingIndex !== index"
              class="btn btn-outline-primary btn-sm rounded-pill px-3"
              @click="editRoom(index)"
            >
              <i class="fas fa-edit me-1"></i> Edit
            </button>
            <button
              v-else
              class="btn btn-success btn-sm rounded-pill px-3"
              @click="saveRoom"
            >
              <i class="fas fa-check me-1"></i> Save
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

import { onMounted } from 'vue'
import api from '@/api'

onMounted(async () => {
  try {
    const response = await api.get('/rooms')
    response.data.forEach((room) => {
      rooms.push(room)
    })
  } catch (err) {
    console.error('Failed to fetch rooms:', err)
  }
})

const editingIndex = ref(null)
const rooms = reactive([])

// const rooms = reactive([
//   {
//     id: '101',
//     type: 'shared',
//     floor: '1F',
//     capacity: 2,
//     occupied: 2,
//     status: 'reserved'
//   },
//   {
//     id: '102',
//     type: 'shared',
//     floor: '1F',
//     capacity: 2,
//     occupied: 1,
//     status: 'vacant'
//   },
//   {
//     id: '201',
//     type: 'single',
//     floor: '2F',
//     capacity: 1,
//     occupied: 0,
//     status: 'reserved'
//   },
//   {
//     id: '202',
//     type: 'shared',
//     floor: '2F',
//     capacity: 2,
//     occupied: 2,
//     status: 'cleaning'
//   }
// ])

const editRoom = (index) => {
  editingIndex.value = index
}

const saveRoom = () => {
  editingIndex.value = null
}

watch(
  () => rooms.map((r) => r.type),
  (newTypes, oldTypes) => {
    newTypes.forEach((type, i) => {
      if (type !== oldTypes[i]) {
        rooms[i].capacity = type === 'single' ? 1 : 2
        if (rooms[i].occupied > rooms[i].capacity) {
          rooms[i].occupied = rooms[i].capacity
        }
      }
    })
  },
  { deep: true }
)

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
