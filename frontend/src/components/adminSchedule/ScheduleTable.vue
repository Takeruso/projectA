<template>
  <div class="table-responsive mb-4">
    <table
      class="table align-middle shadow-sm rounded overflow-hidden"
      style="background-color: white"
    >
      <thead style="background-color: var(--primary); color: white">
        <tr>
          <th class="text-center">Date</th>
          <th class="text-center">Time</th>
          <th class="text-center">Requested By</th>
          <th class="text-center">Role</th>
          <th class="text-center">Assignment</th>
          <th class="text-center">Staff</th>
          <th class="text-center">Status</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(shift, index) in shifts" :key="index">
          <td class="text-center">{{ shift.date }}</td>
          <td class="text-center">{{ shift.time }}</td>
          <td class="text-center">{{ shift.requester }}</td>
          <td class="text-center">{{ shift.role }}</td>

          <!-- Assignment (editable if pending) -->
          <td class="text-center">
            <div v-if="shift.status === 'pending'">
              <select
                :value="shift.assignment"
                @change="$emit('update-assignment', index, $event.target.value)"
                class="form-select form-select-sm"
              >
                <option disabled value="">Select Room</option>
                <option
                  v-for="room in assignmentOptions"
                  :key="room"
                  :value="room"
                >
                  {{ room }}
                </option>
              </select>
            </div>
            <div v-else>{{ shift.assignment }}</div>
          </td>

          <!-- Staff (editable if pending) -->
          <td class="text-center">
            <div v-if="shift.status === 'pending'">
              <select
                :value="shift.assignedStaff"
                @change="$emit('update-staff', index, $event.target.value)"
                class="form-select form-select-sm"
              >
                <option disabled value="">Select Staff</option>
                <option
                  v-for="staff in staffOptions"
                  :key="staff"
                  :value="staff"
                >
                  {{ staff }}
                </option>
              </select>
            </div>
            <div v-else>{{ shift.assignedStaff }}</div>
          </td>

          <!-- STATUS -->
          <td class="text-center">
            <span
              class="badge rounded-pill px-3 py-2"
              :class="{
                'bg-warning text-dark': shift.status === 'pending',
                'bg-success': shift.status === 'confirmed',
                'bg-danger': shift.status === 'rejected'
              }"
            >
              {{ capitalize(shift.status) }}
            </span>
          </td>

          <!-- ACTION -->
          <td class="text-center">
            <div class="d-flex justify-content-center gap-2 flex-wrap">
              <!-- PENDING -->
              <template v-if="shift.status === 'pending'">
                <button
                  class="btn btn-success btn-sm rounded-pill"
                  @click="$emit('approve', index)"
                >
                  Approve
                </button>
                <button
                  class="btn btn-danger btn-sm rounded-pill"
                  @click="$emit('reject', index)"
                >
                  Reject
                </button>
              </template>

              <!-- CONFIRMED -->
              <template v-else-if="shift.status === 'confirmed'">
                <button
                  class="btn btn-warning btn-sm rounded-pill"
                  @click="$emit('mark-pending', index)"
                >
                  Pending
                </button>
                <button
                  class="btn btn-danger btn-sm rounded-pill"
                  @click="$emit('reject', index)"
                >
                  Reject
                </button>
              </template>

              <!-- REJECTED -->
              <template v-else-if="shift.status === 'rejected'">
                <button
                  class="btn btn-warning btn-sm rounded-pill"
                  @click="$emit('mark-pending', index)"
                >
                  Mark as Pending
                </button>
                <button
                  class="btn btn-outline-danger btn-sm rounded-pill"
                  @click="$emit('remove', index)"
                >
                  Remove
                </button>
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  shifts: Array,
  staffOptions: Array,
  assignmentOptions: Array
})
const emit = defineEmits([
  'approve',
  'reject',
  'remove',
  'update-assignment',
  'update-staff',
  'update-status'
])

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '')
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
  text-align: center;
}

.table tbody td {
  padding: 0.75rem;
  vertical-align: middle;
  text-align: center;
}

.table tbody tr:nth-child(even) {
  background-color: #f8f8f8;
}

.table tbody tr:hover {
  background-color: var(--gray);
}
</style>
