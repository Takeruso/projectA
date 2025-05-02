<template>
  <div>
    <header>
      <div class="container header-container">
        <div class="logo">
          <span>Swin Care</span>
        </div>
        <div class="user-info">
          <button class="notifications-btn">
            📋
            <span class="alert-count">2</span>
          </button>
          <div class="user-name">Martha Johnson</div>
          <div class="user-avatar">MJ</div>
        </div>
      </div>
    </header>

    <main class="container">
      <div class="shifts-section">
        <h1>Staff Shift Management</h1>
        <p>
          Manage staff availability and assign shifts to ensure proper coverage
          at all times.
        </p>

        <div class="controls-bar">
          <div class="date-selector">
            <label for="week-selector">Select Week:</label>
            <input
              type="week"
              id="week-selector"
              v-model="selectedWeek"
              @change="updateWeekDays"
            />
          </div>
          <button class="publish-btn" @click="publishSchedule">
            Publish Schedule
          </button>
        </div>

        <div class="tabs">
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'availability' }"
            @click="activeTab = 'availability'"
          >
            Staff Availability
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'shifts' }"
            @click="activeTab = 'shifts'"
          >
            Shift Assignments
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'overview' }"
            @click="activeTab = 'overview'"
          >
            Weekly Overview
          </button>
        </div>

        <!-- Staff Availability Tab -->
        <div v-if="activeTab === 'availability'" class="tab-content">
          <h2>Staff Availability</h2>
          <div class="staff-list">
            <div
              v-for="(staff, index) in staffList"
              :key="index"
              class="staff-card"
            >
              <div class="staff-info">
                <div class="staff-avatar">{{ getInitials(staff.name) }}</div>
                <div class="staff-details">
                  <h3>{{ staff.name }}</h3>
                  <p>{{ staff.role }}</p>
                  <p class="hours-info">
                    Preferred Hours: {{ staff.preferredHours }} hrs/week
                  </p>
                </div>
              </div>
              <div class="availability-grid">
                <div class="grid-header">
                  <span></span>
                  <span v-for="day in weekDays" :key="day.date">{{
                    day.short
                  }}</span>
                </div>
                <div class="grid-body">
                  <div v-for="shift in shifts" :key="shift.id" class="grid-row">
                    <span class="shift-time">{{ shift.label }}</span>
                    <label
                      v-for="day in weekDays"
                      :key="`${staff.id}-${day.date}-${shift.id}`"
                      class="availability-cell"
                    >
                      <input
                        type="checkbox"
                        v-model="staff.availability[day.date][shift.id]"
                        @change="updateAvailability(staff, day.date, shift.id)"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="staff-actions">
                <button class="cta" @click="saveStaffAvailability(staff)">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Shift Assignment Tab -->
        <div v-if="activeTab === 'shifts'" class="tab-content">
          <h2>Shift Assignments</h2>
          <div class="shift-calendar">
            <div class="calendar-header">
              <div class="time-column"></div>
              <div v-for="day in weekDays" :key="day.date" class="day-column">
                <span class="day-name">{{ day.name }}</span>
                <span class="day-date">{{ formatDate(day.date) }}</span>
              </div>
            </div>
            <div class="calendar-body">
              <div v-for="shift in shifts" :key="shift.id" class="shift-row">
                <div class="time-slot">{{ shift.label }}</div>
                <div
                  v-for="day in weekDays"
                  :key="`${day.date}-${shift.id}`"
                  class="assignment-cell"
                  @click="openAssignmentModal(day.date, shift.id)"
                >
                  <div
                    v-if="getAssignedStaff(day.date, shift.id).length > 0"
                    class="assigned-staff"
                  >
                    <div
                      v-for="staffId in getAssignedStaff(day.date, shift.id)"
                      :key="`assigned-${staffId}`"
                      class="assigned-badge"
                      :title="getStaffName(staffId)"
                    >
                      {{ getInitials(getStaffName(staffId)) }}
                    </div>
                  </div>
                  <div v-else class="no-staff">
                    <span>+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Weekly Overview Tab -->
        <div v-if="activeTab === 'overview'" class="tab-content">
          <h2>Weekly Overview</h2>
          <div class="overview-stats">
            <div class="stat-card">
              <div class="stat-icon">👥</div>
              <div class="stat-value">{{ getTotalAssignedShifts() }}</div>
              <div class="stat-label">Total Shifts Assigned</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⚠️</div>
              <div class="stat-value">{{ getUncoveredShifts() }}</div>
              <div class="stat-label">Uncovered Shifts</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⏱️</div>
              <div class="stat-value">{{ getAverageHoursPerStaff() }}</div>
              <div class="stat-label">Avg Hours per Staff</div>
            </div>
          </div>
          <div class="staff-hours-table">
            <h3>Staff Hours This Week</h3>
            <table>
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>Role</th>
                  <th>Assigned Hours</th>
                  <th>Preferred Hours</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(staff, index) in staffList" :key="index">
                  <td>{{ staff.name }}</td>
                  <td>{{ staff.role }}</td>
                  <td>{{ getStaffAssignedHours(staff.id) }}</td>
                  <td>{{ staff.preferredHours }}</td>
                  <td>
                    <span
                      class="hours-status"
                      :class="getHoursStatusClass(staff.id)"
                    >
                      {{ getHoursStatusText(staff.id) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <footer></footer>

    <!-- Staff Assignment Modal -->
    <div id="assignmentModal" class="modal" v-if="showAssignmentModal">
      <div class="modal-content">
        <span class="close" @click="closeAssignmentModal">&times;</span>
        <h2>Assign Staff to Shift</h2>
        <div class="shift-details">
          <p><strong>Date:</strong> {{ formatDate(currentAssignment.date) }}</p>
          <p>
            <strong>Shift Time:</strong>
            {{ getShiftLabel(currentAssignment.shiftId) }}
          </p>
        </div>
        <h3>Available Staff</h3>
        <div class="available-staff-list">
          <div
            v-for="staff in getAvailableStaff(
              currentAssignment.date,
              currentAssignment.shiftId
            )"
            :key="staff.id"
            class="available-staff-item"
            :class="{
              selected: isStaffAssigned(
                staff.id,
                currentAssignment.date,
                currentAssignment.shiftId
              )
            }"
            @click="
              toggleStaffAssignment(
                staff.id,
                currentAssignment.date,
                currentAssignment.shiftId
              )
            "
          >
            <div class="staff-avatar small">{{ getInitials(staff.name) }}</div>
            <div class="staff-details">
              <h4>{{ staff.name }}</h4>
              <p>{{ staff.role }}</p>
              <p class="hours-info">
                Current hours: {{ getStaffAssignedHours(staff.id) }} /
                {{ staff.preferredHours }}
              </p>
            </div>
            <div class="selection-indicator">
              <span
                v-if="
                  isStaffAssigned(
                    staff.id,
                    currentAssignment.date,
                    currentAssignment.shiftId
                  )
                "
                >✓</span
              >
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="cta" @click="saveAssignments">Save Assignments</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeTab: 'availability',
      selectedWeek: this.getCurrentWeek(),
      weekDays: [],
      shifts: [
        { id: 'shift1', label: '00:00 - 06:00' },
        { id: 'shift2', label: '06:00 - 12:00' },
        { id: 'shift3', label: '12:00 - 18:00' },
        { id: 'shift4', label: '18:00 - 24:00' }
      ],
      staffList: [
        {
          id: 1,
          name: 'Serena Tr',
          role: 'Registered Nurse',
          preferredHours: 32,
          availability: {}
        },
        {
          id: 2,
          name: 'Michael Chen',
          role: 'Care Assistant',
          preferredHours: 40,
          availability: {}
        },
        {
          id: 3,
          name: 'Sarah Williams',
          role: 'Registered Nurse',
          preferredHours: 24,
          availability: {}
        },
        {
          id: 4,
          name: 'David Thompson',
          role: 'Care Assistant',
          preferredHours: 36,
          availability: {}
        },
        {
          id: 5,
          name: 'Emily Rodriguez',
          role: 'Care Assistant',
          preferredHours: 20,
          availability: {}
        }
      ],
      shiftAssignments: {},
      showAssignmentModal: false,
      currentAssignment: {
        date: '',
        shiftId: ''
      }
    }
  },
  created() {
    this.updateWeekDays()
    this.initializeAvailability()
    this.initializeAssignments()
  },
  methods: {
    getCurrentWeek() {
      const now = new Date()
      const year = now.getFullYear()
      const month = (now.getMonth() + 1).toString().padStart(2, '0')
      const day = now.getDate().toString().padStart(2, '0')
      const weekNum = this.getWeekNumber(now)

      return `${year}-W${weekNum}`
    },
    getWeekNumber(date) {
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
      const pastDaysOfYear = (date - firstDayOfYear) / 86400000
      return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
    },
    updateWeekDays() {
      this.weekDays = []

      // Parse the selected week
      const [year, week] = this.selectedWeek.split('-W')

      // Get the first day of the week (Monday)
      const firstDay = new Date(year, 0, 1 + (week - 1) * 7)
      const dayOfWeek = firstDay.getDay()
      const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // Adjust when day is Sunday

      const monday = new Date(firstDay)
      monday.setDate(firstDay.getDate() - diff)

      // Generate the 7 days of the week
      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(monday)
        currentDay.setDate(monday.getDate() + i)

        const formattedDate = this.formatDateYMD(currentDay)
        const dayNames = [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ]
        const shortNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

        this.weekDays.push({
          date: formattedDate,
          name: dayNames[i],
          short: shortNames[i]
        })
      }

      this.initializeAvailability()
      this.initializeAssignments()
    },
    formatDateYMD(date) {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')

      return `${year}-${month}-${day}`
    },
    formatDate(dateStr) {
      if (!dateStr) return ''

      const [year, month, day] = dateStr.split('-')
      return `${month}/${day}/${year}`
    },
    initializeAvailability() {
      // Initialize availability for all staff for the current week
      this.staffList.forEach((staff) => {
        if (!staff.availability) {
          staff.availability = {}
        }

        this.weekDays.forEach((day) => {
          if (!staff.availability[day.date]) {
            staff.availability[day.date] = {}

            this.shifts.forEach((shift) => {
              // By default, most staff are available during regular hours but not overnight
              const isOvernightShift =
                shift.id === 'shift1' || shift.id === 'shift4'
              staff.availability[day.date][shift.id] = !isOvernightShift
            })
          }
        })
      })
    },
    initializeAssignments() {
      // Initialize empty assignments for the current week
      this.weekDays.forEach((day) => {
        if (!this.shiftAssignments[day.date]) {
          this.shiftAssignments[day.date] = {}

          this.shifts.forEach((shift) => {
            this.shiftAssignments[day.date][shift.id] = []
          })
        }
      })
    },
    updateAvailability(staff, date, shiftId) {
      // This function would typically save to backend
      console.log(
        `Updated availability for ${staff.name} on ${date} for shift ${shiftId}`
      )
    },
    saveStaffAvailability(staff) {
      // This function would typically save to backend
      alert(`Saved availability for ${staff.name}`)
    },
    getInitials(name) {
      if (!name) return ''
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
    },
    openAssignmentModal(date, shiftId) {
      this.currentAssignment = { date, shiftId }
      this.showAssignmentModal = true
    },
    closeAssignmentModal() {
      this.showAssignmentModal = false
    },
    getShiftLabel(shiftId) {
      const shift = this.shifts.find((s) => s.id === shiftId)
      return shift ? shift.label : ''
    },
    getAvailableStaff(date, shiftId) {
      // Return staff who are available for the specified shift
      return this.staffList.filter(
        (staff) => staff.availability[date] && staff.availability[date][shiftId]
      )
    },
    isStaffAssigned(staffId, date, shiftId) {
      if (
        !this.shiftAssignments[date] ||
        !this.shiftAssignments[date][shiftId]
      ) {
        return false
      }
      return this.shiftAssignments[date][shiftId].includes(staffId)
    },
    toggleStaffAssignment(staffId, date, shiftId) {
      if (!this.shiftAssignments[date]) {
        this.shiftAssignments[date] = {}
      }

      if (!this.shiftAssignments[date][shiftId]) {
        this.shiftAssignments[date][shiftId] = []
      }

      const index = this.shiftAssignments[date][shiftId].indexOf(staffId)

      if (index === -1) {
        // Assign staff to shift
        this.shiftAssignments[date][shiftId].push(staffId)
      } else {
        // Remove staff from shift
        this.shiftAssignments[date][shiftId].splice(index, 1)
      }
    },
    saveAssignments() {
      // This function would typically save to backend
      alert('Shift assignments saved successfully!')
      this.closeAssignmentModal()
    },
    getAssignedStaff(date, shiftId) {
      if (
        !this.shiftAssignments[date] ||
        !this.shiftAssignments[date][shiftId]
      ) {
        return []
      }
      return this.shiftAssignments[date][shiftId]
    },
    getStaffName(staffId) {
      const staff = this.staffList.find((s) => s.id === staffId)
      return staff ? staff.name : ''
    },
    getStaffAssignedHours(staffId) {
      let totalHours = 0

      // Each shift is 6 hours
      const hoursPerShift = 6

      // Count how many shifts the staff is assigned to
      for (const date in this.shiftAssignments) {
        for (const shiftId in this.shiftAssignments[date]) {
          if (this.shiftAssignments[date][shiftId].includes(staffId)) {
            totalHours += hoursPerShift
          }
        }
      }

      return totalHours
    },
    getHoursStatusClass(staffId) {
      const staff = this.staffList.find((s) => s.id === staffId)
      if (!staff) return ''

      const assignedHours = this.getStaffAssignedHours(staffId)
      const preferred = staff.preferredHours

      if (assignedHours < preferred * 0.8) return 'under'
      if (assignedHours > preferred * 1.1) return 'over'
      return 'good'
    },
    getHoursStatusText(staffId) {
      const statusClass = this.getHoursStatusClass(staffId)

      switch (statusClass) {
        case 'under':
          return 'Underutilized'
        case 'over':
          return 'Overutilized'
        case 'good':
          return 'Good'
        default:
          return ''
      }
    },
    getTotalAssignedShifts() {
      let total = 0

      for (const date in this.shiftAssignments) {
        for (const shiftId in this.shiftAssignments[date]) {
          total += this.shiftAssignments[date][shiftId].length
        }
      }

      return total
    },
    getUncoveredShifts() {
      let uncovered = 0

      for (const date in this.shiftAssignments) {
        for (const shiftId in this.shiftAssignments[date]) {
          if (this.shiftAssignments[date][shiftId].length === 0) {
            uncovered++
          }
        }
      }

      return uncovered
    },
    getAverageHoursPerStaff() {
      if (this.staffList.length === 0) return 0

      let totalHours = 0
      this.staffList.forEach((staff) => {
        totalHours += this.getStaffAssignedHours(staff.id)
      })

      return Math.round(totalHours / this.staffList.length)
    },
    publishSchedule() {
      // This function would typically publish the schedule to staff
      alert('Schedule published successfully! Staff have been notified.')
    }
  }
}
</script>
<style scoped>
:root {
  --primary: #ff2474;
  --primary-light: #ff5d98;
  --secondary: #f4b942;
  --dark: #2a3950;
  --light: #f9f9f9;
  --danger: #d64045;
  --success: #4caf50;
  --gray: #e5e9f0;
  --warning: #f4b942;

  .availability-cell input:checked ~ .checkmark {
    background-color: var(--primary);
  }

  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  .availability-cell input:checked ~ .checkmark:after {
    display: block;
  }

  .availability-cell .checkmark:after {
    left: 7px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .staff-actions {
    display: flex;
    justify-content: flex-end;
  }

  .cta {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: var(--primary-light);
    color: white;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    font-size: 1rem;
    transition: background-color 0.3s ease;
    text-align: center;
    margin-top: auto;
    border: none;
    cursor: pointer;
  }

  .cta:hover {
    background-color: var(--primary);
  }

  /* Shift Calendar Styles */
  .shift-calendar {
    border: 1px solid var(--gray);
    border-radius: 10px;
    overflow: hidden;
  }

  .calendar-header {
    display: grid;
    grid-template-columns: 120px repeat(7, 1fr);
    background-color: var(--dark);
    color: white;
  }

  .time-column,
  .day-column {
    padding: 1rem;
    text-align: center;
  }

  .day-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }

  .day-name {
    font-weight: bold;
  }

  .day-date {
    font-size: 0.8rem;
    opacity: 0.8;
  }

  .calendar-body {
    display: flex;
    flex-direction: column;
  }

  .shift-row {
    display: grid;
    grid-template-columns: 120px repeat(7, 1fr);
    border-bottom: 1px solid var(--gray);
  }

  .shift-row:last-child {
    border-bottom: none;
  }

  .time-slot {
    padding: 1.5rem 1rem;
    background-color: var(--light);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    color: var(--dark);
    font-weight: bold;
    border-right: 1px solid var(--gray);
  }

  .assignment-cell {
    padding: 1rem;
    min-height: 100px;
    border-right: 1px solid var(--gray);
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
  }

  .assignment-cell:hover {
    background-color: rgba(255, 36, 116, 0.05);
  }

  .assigned-staff {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }

  .assigned-badge {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--primary);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .no-staff {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px dashed var(--gray);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--gray);
    font-size: 1.5rem;
  }

  /* Overview Tab Styles */
  .overview-stats {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    flex: 1;
    background-color: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .stat-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .stat-value {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: #666;
  }

  .staff-hours-table {
    background-color: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .staff-hours-table h3 {
    margin-bottom: 1rem;
    color: var(--dark);
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid var(--gray);
  }

  th {
    background-color: var(--light);
    font-weight: bold;
    color: var(--dark);
  }

  .hours-status {
    display: inline-block;
    padding: 0.3rem 0.7rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .hours-status.under {
    background-color: rgba(244, 185, 66, 0.2);
    color: var(--warning);
  }

  .hours-status.over {
    background-color: rgba(214, 64, 69, 0.2);
    color: var(--danger);
  }

  .hours-status.good {
    background-color: rgba(76, 175, 80, 0.2);
    color: var(--success);
  }

  /* Modal Styles */
  .modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: white;
    border-radius: 10px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 2rem;
    position: relative;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .close {
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    color: #aaa;
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
  }

  .close:hover {
    color: var(--dark);
  }

  .shift-details {
    background-color: var(--light);
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 1.5rem;
  }

  .available-staff-list {
    max-height: 50vh;
    overflow-y: auto;
    margin-bottom: 1.5rem;
  }

  .available-staff-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    position: relative;
  }

  .available-staff-item:hover {
    background-color: var(--light);
  }

  .available-staff-item.selected {
    background-color: rgba(255, 36, 116, 0.1);
    border: 1px solid var(--primary-light);
  }

  .selection-indicator {
    position: absolute;
    right: 1rem;
    color: var(--primary);
    font-weight: bold;
    font-size: 1.2rem;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: var(--light);
  color: var(--dark);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notifications-btn {
  position: relative;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.alert-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--danger);
  color: white;
  font-size: 0.8rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(160, 160, 160);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
}

.user-avatar.small {
  width: 30px;
  height: 30px;
  font-size: 0.8rem;
}

main {
  padding: 2rem 0;
  min-height: calc(100vh - 120px);
}

.shifts-section {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.shifts-section h1 {
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
  color: var(--dark);
}

.shifts-section > p {
  color: #666;
  margin-bottom: 2rem;
}

.controls-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.date-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.date-selector label {
  font-weight: bold;
}

.publish-btn {
  padding: 0.5rem 1rem;
  background-color: var(--success);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.publish-btn:hover {
  background-color: #3d8b40;
}

.tabs {
  display: flex;
  border-bottom: 1px solid var(--gray);
  margin-bottom: 2rem;
}

.tab-btn {
  padding: 1rem 2rem;
  background: none;
  border: none;
  font-weight: bold;
  color: #666;
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;
}

.tab-btn.active {
  color: var(--primary);
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--primary);
}

.tab-content {
  min-height: 400px;
}

.tab-content h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: var(--dark);
}

/* Staff List Styles */
.staff-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.staff-card {
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid var(--gray);
}

.staff-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.staff-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.staff-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  font-size: 1.2rem;
}

.staff-details h3 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--dark);
}

.staff-details p {
  margin: 0;
  color: #666;
}

.hours-info {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--primary);
}

.availability-grid {
  margin-bottom: 1.5rem;
}

.grid-header {
  display: grid;
  grid-template-columns: 120px repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.grid-header span {
  text-align: center;
  font-weight: bold;
  color: var(--dark);
}

.grid-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.grid-row {
  display: grid;
  grid-template-columns: 120px repeat(7, 1fr);
  gap: 0.5rem;
  align-items: center;
}

.shift-time {
  font-size: 0.9rem;
  color: #666;
}

.availability-cell {
  position: relative;
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.availability-cell input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 20px;
  width: 20px;
  background-color: #eee;
  border-radius: 4px;
}
</style>
