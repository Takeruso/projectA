<template>
  <div class="staff-schedule-page">
    <HeaderBar />
    <main class="container my-4">
      <ScheduleHeader :count="allShifts.length" />
      <SchedulesTable
        :shifts="allShifts"
        :staffOptions="staffOptions"
        :assignmentOptions="assignmentOptions"
        @update-staff="updateStaff"
        @update-assignment="updateAssignment"
        @approve="approveShift"
        @mark-pending="markPending"
        @reject="updateStatus"
        @remove="removeShift"
      />

      <StaffShiftForm :shift="aShift" @add="addShift" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderBar from '@/components/facility/HeaderBar.vue'
import ScheduleHeader from '@/components/adminSchedule/ScheduleHeader.vue'
import SchedulesTable from '@/components/adminSchedule/ScheduleTable.vue'
// import StaffShiftForm from '@/components/staff/StaffShiftForm.vue'

const aShift = ref({
  date: '',
  time: '',
  name: '',
  role: '',
  assignment: ''
})

const updateStaff = (index, value) => {
  allShifts.value[index].assignedStaff = value
}

const updateAssignment = (index, value) => {
  allShifts.value[index].assignment = value
}

const approveShift = (index) => {
  allShifts.value[index].status = 'confirmed'
}
const markPending = (index) => {
  allShifts.value[index].status = 'pending'
}
const removeShift = (index) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this reservation?'
  )
  if (confirmed) {
    allShifts.value.splice(index, 1)
  }
}

// const rejectShift = (index) => {
//   allShifts.value[index].status = 'rejected'
// }

const updateStatus = (index, value) => {
  allShifts.value[index].status = value
}

const allShifts = ref([
  {
    date: '2025-04-15',
    time: '07:00 - 15:00',
    requester: 'Front Desk',
    role: 'Registered Nurse',
    assignment: '',
    assignedStaff: '',
    status: 'pending'
  },
  {
    date: '2025-04-15',
    time: '15:00 - 23:00',
    requester: 'System',
    role: 'Care Assistant',
    assignment: '101',
    assignedStaff: 'Tom Nguyen',
    status: 'confirmed'
  },
  {
    date: '2025-04-16',
    time: '08:00 - 16:00',
    requester: 'Manager',
    role: 'Physiotherapist',
    assignment: '',
    assignedStaff: '',
    status: 'pending'
  },
  {
    date: '2025-04-16',
    time: '09:00 - 17:00',
    requester: 'Admin',
    role: 'Support Worker',
    assignment: '201',
    assignedStaff: 'Alice Wong',
    status: 'confirmed'
  },
  {
    date: '2025-04-17',
    time: '07:00 - 15:00',
    requester: 'Nurse Station',
    role: 'Registered Nurse',
    assignment: '',
    assignedStaff: '',
    status: 'rejected'
  }
])

const staffOptions = [
  'Tom Nguyen',
  'Alice Wong',
  'Sarah Johnson',
  'Kenta Tanaka',
  'Emma Davis'
]
const assignmentOptions = ['101', '102', '103', '201', '202', '203']

const addShift = (shift) => {
  allShifts.value.push({ ...shift })
  aShift.value = {
    date: '',
    time: '',
    name: '',
    role: '',
    assignment: ''
  }
}
</script>
