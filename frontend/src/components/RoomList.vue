<!-- RoomList.vue -->
<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="mb-0">Room Inventory</h2>
      <select v-model="filter" class="form-select w-auto">
        <option value="">All</option>
        <option value="Available">Available</option>
        <option value="Occupied">Occupied</option>
        <option value="Under Maintenance">Under Maintenance</option>
      </select>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Room</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="room in filteredRooms" :key="room.id">
          <td>{{ room.name }}</td>
          <td>
            <span
              class="badge"
              :class="{
                'bg-success': room.status === 'Available',
                'bg-danger': room.status === 'Occupied',
                'bg-warning text-dark': room.status === 'Under Maintenance'
              }"
            >
              {{ room.status }}
            </span>
          </td>
          <td>
            <button
              v-if="room.status === 'Available'"
              class="btn btn-primary btn-sm"
              @click="bookRoom(room)"
            >
              Book
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { mockRooms } from '../data/mockRooms.js'

const rooms = ref([...mockRooms])
const filter = ref('')

const filteredRooms = computed(() => {
  return filter.value
    ? rooms.value.filter((room) => room.status === filter.value)
    : rooms.value
})
const bookRoom = (room) => {
  const target = rooms.value.find((r) => r.id === room.id)
  if (target) {
    target.status = 'Occupied'
  }
}
</script>
