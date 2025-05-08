<template>
  <div class=".calendar-section">
    <div class="schedule-header">
      <h2>Next Schedules</h2>
      <span class="small-date">{{ currentMonth }}</span>
      <div class="calendar">
        <div class="calendar-header">
          <div class="day" v-for="day in daysOfWeek" :key="day">{{ day }}</div>
        </div>
        <div class="calendar-body">
          <div
            class="calendar-day"
            v-for="(date, index) in weekDates"
            :key="index"
          >
            <div class="date">{{ date.getDate() }}</div>
            <div class="appointments">
              <!-- <div v-if="index === 3">
                <div class="appointment clickable" @click="highlightTask">
                  <div class="appointment-title">Morning Medication Rounds</div>
                  <div class="appointment-location">All Resident Rooms</div>
                  <div class="appointment-time">8:00am - 9:00am</div>
                </div>
                <div class="appointment clickable" @click="highlightTask">
                  <div class="appointment-title">Wound Care Checkup</div>
                  <div class="appointment-location">Medical Wing, Room 12</div>
                  <div class="appointment-time">2:00pm - 2:30pm</div>
                </div>
              </div>
              <div v-if="index === 4">
                <div class="appointment clickable" @click="highlightTask">
                  <div class="appointment-title">
                    Routine Health Assessments
                  </div>
                  <div class="appointment-location">Common Area</div>
                  <div class="appointment-time">9:30am - 11:00am</div>
                </div>
                <div class="appointment clickable" @click="highlightTask">
                  <div class="appointment-title">Family Visit Coordination</div>
                  <div class="appointment-location">Front Desk</div>
                  <div class="appointment-time">2:00pm - 3:00pm</div>
                </div> -->
              <!-- <div
                v-for="item in assignmentsByDate[
                  date.toISOString().split('T')[0]
                ] || []"
                :key="item.id"
                class="appointment clickable"
                @click="highlightTask"
              >
                <div class="appointment-title">
                  {{ shiftMap[item.shift_id] }}
                </div>
              </div> -->
              <div
                v-for="item in enrichedAssignmentsByDate[
                  date.toISOString().split('T')[0]
                ] || []"
                :key="item.id"
                class="appointment"
                :style="{ backgroundColor: shiftColors[item.shift_id] }"
              >
                <div class="appointment-location">{{ item.location }}</div>
                <div class="appointment-time">
                  {{ shiftMap[item.shift_id] }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const currentDate = ref(new Date())
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const currentMonth = computed(() => {
  return currentDate.value.toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  })
})

const getWeekDates = () => {
  const weekDates = []
  const startOfWeek = new Date(currentDate.value)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    weekDates.push(date)
  }
  return weekDates
}

const weekDates = computed(() => getWeekDates())

const assignments = ref([])

async function fetchAssignments() {
  try {
    const res = await axios.get('/api/assignment/1')
    assignments.value = res.data
  } catch (error) {
    console.error('Error fetching assignments:', error)
  }
}

onMounted(() => {
  fetchAssignments()
})

const assignmentsByDate = computed(() => {
  const map = {}
  assignments.value.forEach((a) => {
    if (!map[a.date]) {
      map[a.date] = []
    }
    map[a.date].push(a)
  })
  return map
})

const enrichedAssignmentsByDate = computed(() => {
  const map = {}
  let dummyIndex = 0

  assignments.value.forEach((a) => {
    if (!map[a.date]) {
      map[a.date] = []
    }
    const dummy = dummyDetails[dummyIndex % dummyDetails.length]
    map[a.date].push({
      ...a,
      title: dummy.title,
      location: dummy.location
    })
    dummyIndex++
  })

  return map
})

const shiftMap = {
  shift1: '00:00 - 06:00',
  shift2: '06:00 - 12:00',
  shift3: '12:00 - 18:00',
  shift4: '18:00 - 24:00'
}

const dummyDetails = [
  { title: 'Morning Medication Rounds', location: 'All Resident Rooms' },
  { title: 'Wound Care Checkup', location: 'Medical Wing, Room 12' },
  { title: 'Routine Health Assessments', location: 'Common Area' },
  { title: 'Family Visit Coordination', location: 'Front Desk' },
  { title: 'Physical Therapy Session', location: 'Rehab Room' },
  { title: 'Nutritional Monitoring', location: 'Dining Hall' },
  { title: 'Laundry Collection', location: 'Resident Rooms' },
  { title: 'Cleaning Duty', location: 'Common Bathrooms' },
  { title: 'Doctor Visit', location: 'Consultation Room' },
  { title: 'Vitals Check', location: 'Nursing Station' },
  { title: 'Night Shift Rounds', location: 'All Wards' },
  { title: 'Bedside Assistance', location: 'Wing B' },
  { title: 'Recreational Activity', location: 'Activity Room' },
  { title: 'Resident Transport', location: 'Main Entrance' },
  { title: 'Supply Restocking', location: 'Storage Room' },
  { title: 'Discharge Preparation', location: 'Admin Office' },
  { title: 'Patient Education', location: 'Education Room' },
  { title: 'Emergency Drill', location: 'All Areas' },
  { title: 'Maintenance Check', location: 'Facility Grounds' },
  { title: 'Volunteer Coordination', location: 'Reception Desk' }
]
const shiftColors = {
  shift1: '#FF4C61', // 濃いピンク（Appointments と統一）
  shift2: '#56CCF2', // 明るめのブルー（Medical Reports と統一）
  shift3: '#6FCF97', // グリーン（Facility Checkup と統一）
  shift4: '#BB6BD9' // ラベンダー（Submit Availability と統一）
}
</script>

<!-- <script setup>
import { ref, computed } from 'vue'

const currentDate = ref(new Date())
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const currentMonth = computed(() => {
  return currentDate.value.toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  })
})

const getWeekDates = () => {
  const weekDates = []
  const startOfWeek = new Date(currentDate.value)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    weekDates.push(date)
  }
  return weekDates
}

const weekDates = computed(() => getWeekDates())

function highlightTask() {
  alert('Task highlighted or detailed view triggered.')
}
</script> -->

<style scoped>
.calendar-section {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  color: var(--dark);
  margin-bottom: 1rem;
}

.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(120px, auto);
  gap: 1rem;
}

.calendar-day {
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 10px;
}

.date {
  font-size: 1.2rem;
  font-weight: bold;
}
.appointments {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
}

.appointment {
  background-color: var(--primary-light);
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  word-break: break-word;
  white-space: normal;
}

.appointment[data-shift='shift1'] {
  top: 10px;
}
.appointment[data-shift='shift2'] {
  top: 70px;
}
.appointment[data-shift='shift3'] {
  top: 140px;
}
.appointment[data-shift='shift4'] {
  top: 210px;
}

.appointment-title,
.appointment-location {
  text-align: center;
  word-break: break-word;
}

.appointment-title {
  font-size: 1rem;
  font-weight: bold;
}

.appointment-time {
  font-size: 0.85rem;
  color: #fff;
  margin-top: 0.25rem;
}
</style>
