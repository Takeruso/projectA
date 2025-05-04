<template>
  <div>
    <header>
      <div class="container header-container">
        <div class="logo">
          <router-link to="/staff" class="logo">
            <span>Swin Care</span>
          </router-link>
        </div>
        <div class="user-info">
          <button class="notifications-btn">
            📋
            <span v-if="notifications.length > 0" class="alert-count">{{
              notifications.length
            }}</span>
          </button>
          <div class="user-name">{{ currentUser.name }}</div>
          <div class="user-avatar">{{ getInitials(currentUser.name) }}</div>
        </div>
      </div>
    </header>

    <main class="container">
      <div class="availability-section">
        <h1>My Availability</h1>
        <p>
          Submit your availability for upcoming shifts to help our team organize
          the schedule.
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
          <div class="status-badge" :class="submissionStatus.class">
            {{ submissionStatus.text }}
          </div>
        </div>

        <div class="tabs">
          <button class="tab-btn active">My Availability</button>
          <button class="tab-btn" @click="viewMySchedule">My Schedule</button>
        </div>

        <!-- Availability Tab -->
        <div class="tab-content">
          <div class="availability-card">
            <div class="staff-info">
              <div class="staff-avatar">
                {{ getInitials(currentUser.name) }}
              </div>
              <div class="staff-details">
                <h3>{{ currentUser.name }}</h3>
                <p>{{ currentUser.role }}</p>
                <p class="hours-info">
                  Preferred Hours: {{ currentUser.preferredHours }} hrs/week
                </p>
              </div>
              <div class="time-period">
                <h3>{{ formatDateRange() }}</h3>
              </div>
            </div>

            <div class="availability-instructions">
              <p>
                Check the boxes for times when you are available to work. Your
                administrator will use this information to create the final
                schedule.
              </p>
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
                    :key="`${currentUser.id}-${day.date}-${shift.id}`"
                    class="availability-cell"
                  >
                    <input
                      type="checkbox"
                      v-model="currentUser.availability[day.date][shift.id]"
                      @change="updateAvailabilityStatus"
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
            <div class="recurring-preferences">
              <h3>Set Recurring Availability</h3>
              <p>Quick-set your typical weekly availability pattern</p>

              <div class="recurring-options">
                <button @click="applyTemplate('weekdays')" class="template-btn">
                  Weekdays Only
                </button>
                <button @click="applyTemplate('weekends')" class="template-btn">
                  Weekends Only
                </button>
                <button @click="applyTemplate('daytime')" class="template-btn">
                  Day Shifts Only
                </button>
                <button @click="applyTemplate('evening')" class="template-btn">
                  Evening Shifts Only
                </button>
              </div>
            </div>
            <div class="notes-section">
              <h3>Additional Notes</h3>
              <textarea
                v-model="availabilityNotes"
                placeholder="Add any additional information about your availability here..."
                rows="3"
              ></textarea>
            </div>

            <div class="submit-section">
              <button class="submit-btn" @click="submitAvailability">
                Submit Availability
              </button>
              <button class="reset-btn" @click="resetAvailability">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <p>
            Last submitted:
            {{
              lastSubmitted ? formatDate(lastSubmitted) : 'Not yet submitted'
            }}
          </p>
          <p v-if="submissionDeadline">
            Submission deadline: {{ formatDate(submissionDeadline) }}
          </p>
        </div>
      </div>
    </footer>

    <!-- Confirmation Modal -->
    <div id="confirmationModal" class="modal" v-if="showConfirmationModal">
      <div class="modal-content">
        <span class="close" @click="closeConfirmationModal">&times;</span>
        <div class="confirmation-icon">✓</div>
        <h2>Availability Submitted</h2>
        <p>
          Your availability for {{ formatDateRange() }} has been successfully
          submitted.
        </p>
        <p class="confirmation-note">
          You can update your availability any time before the submission
          deadline.
        </p>
        <div class="modal-actions">
          <button class="cta" @click="closeConfirmationModal">Got it</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentUser: {
        id: 101,
        name: 'Serena Tr',
        role: 'Care Assistant',
        preferredHours: 32,
        availability: {}
      },
      selectedWeek: this.getCurrentWeek(),
      weekDays: [],
      shifts: [
        { id: 'shift1', label: '00:00 - 06:00' },
        { id: 'shift2', label: '06:00 - 12:00' },
        { id: 'shift3', label: '12:00 - 18:00' },
        { id: 'shift4', label: '18:00 - 24:00' }
      ],
      availabilityNotes: '',
      hasChanges: false,
      lastSubmitted: null,
      submissionDeadline: '2025-05-10',
      showConfirmationModal: false,
      notifications: [
        {
          id: 1,
          message: 'Your schedule for next week has been published'
        },
        {
          id: 2,
          message: 'Please submit availability for the week of May 11'
        }
      ]
    }
  },
  computed: {
    submissionStatus() {
      if (this.lastSubmitted) {
        return {
          text: 'Submitted',
          class: 'submitted'
        }
      } else if (this.hasChanges) {
        return {
          text: 'Unsaved Changes',
          class: 'unsaved'
        }
      } else {
        return {
          text: 'Not Submitted',
          class: 'not-submitted'
        }
      }
    }
  },
  created() {
    this.updateWeekDays()
    this.initializeAvailability()
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
      this.hasChanges = false
      this.lastSubmitted = null // Reset submission status when changing weeks
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
    formatDateRange() {
      if (this.weekDays.length === 0) return ''

      const startDate = this.formatDate(this.weekDays[0].date)
      const endDate = this.formatDate(this.weekDays[6].date)

      return `${startDate} - ${endDate}`
    },
    initializeAvailability() {
      // Initialize availability for current user for the selected week
      if (!this.currentUser.availability) {
        this.currentUser.availability = {}
      }

      this.weekDays.forEach((day) => {
        if (!this.currentUser.availability[day.date]) {
          this.currentUser.availability[day.date] = {}

          this.shifts.forEach((shift) => {
            // By default, most staff are available during regular hours but not overnight
            const isOvernightShift =
              shift.id === 'shift1' || shift.id === 'shift4'
            const isWeekend = day.name === 'Saturday' || day.name === 'Sunday'

            // Set reasonable defaults - available weekdays during day shifts
            this.currentUser.availability[day.date][shift.id] =
              !isOvernightShift && !isWeekend
          })
        }
      })
    },
    updateAvailabilityStatus() {
      this.hasChanges = true
    },
    getInitials(name) {
      if (!name) return ''
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
    },
    submitAvailability() {
      // This function would typically send data to backend
      console.log('Submitting availability for week:', this.selectedWeek)
      console.log('Availability data:', this.currentUser.availability)
      console.log('Notes:', this.availabilityNotes)

      // Update submission status
      this.lastSubmitted = new Date().toISOString().split('T')[0]
      this.hasChanges = false

      // Show confirmation modal
      this.showConfirmationModal = true
    },
    resetAvailability() {
      this.initializeAvailability()
      this.availabilityNotes = ''
      this.hasChanges = false
    },
    closeConfirmationModal() {
      this.showConfirmationModal = false
    },
    viewMySchedule() {
      // This would navigate to the staff's schedule view
      alert('This would take you to your assigned schedule view')
    },
    applyTemplate(template) {
      // Apply predefined availability templates
      this.weekDays.forEach((day) => {
        this.shifts.forEach((shift) => {
          let available = false

          switch (template) {
            case 'weekdays':
              available = !['Saturday', 'Sunday'].includes(day.name)
              break
            case 'weekends':
              available = ['Saturday', 'Sunday'].includes(day.name)
              break
            case 'daytime':
              available = ['shift2', 'shift3'].includes(shift.id)
              break
            case 'evening':
              available = ['shift3', 'shift4'].includes(shift.id)
              break
          }

          this.currentUser.availability[day.date][shift.id] = available
        })
      })

      this.hasChanges = true
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

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
  text-decoration: none;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  font-weight: 500;
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
  background-color: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
}

main {
  padding: 2rem 0;
  min-height: calc(100vh - 120px);
}

.availability-section {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.availability-section h1 {
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
  color: var(--dark);
}

.availability-section > p {
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

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
}

.status-badge.submitted {
  background-color: rgba(76, 175, 80, 0.2);
  color: var(--success);
}

.status-badge.unsaved {
  background-color: rgba(244, 185, 66, 0.2);
  color: var(--warning);
}

.status-badge.not-submitted {
  background-color: rgba(214, 64, 69, 0.2);
  color: var(--danger);
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

.availability-card {
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  border: 1px solid var(--gray);
}

.staff-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.time-period {
  position: absolute;
  right: 0;
  text-align: right;
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

.availability-instructions {
  background-color: var(--light);
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1.5rem;
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

.notes-section {
  margin-bottom: 1.5rem;
}

.notes-section h3 {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.notes-section textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--gray);
  border-radius: 5px;
  resize: vertical;
  font-family: inherit;
}

.submit-section {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.submit-btn {
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: var(--primary-light);
}

.reset-btn {
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: var(--dark);
  border: 1px solid var(--gray);
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reset-btn:hover {
  background-color: var(--gray);
}

.recurring-preferences {
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--gray);
}

.recurring-preferences h3 {
  margin-bottom: 0.5rem;
}

.recurring-preferences p {
  color: #666;
  margin-bottom: 1rem;
}

.recurring-options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.template-btn {
  padding: 0.5rem 1rem;
  background-color: var(--light);
  border: 1px solid var(--gray);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.template-btn:hover {
  background-color: var(--primary-light);
  color: white;
  border-color: var(--primary-light);
}

.footer {
  background-color: white;
  border-top: 1px solid var(--gray);
  padding: 1rem 0;
  margin-top: 2rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
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
  max-width: 500px;
  padding: 2rem;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
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

.confirmation-icon {
  font-size: 3rem;
  color: var(--success);
  background-color: rgba(76, 175, 80, 0.2);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
}

.confirmation-note {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.modal-actions {
  margin-top: 2rem;
}

.cta {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;
}

.cta:hover {
  background-color: var(--primary-light);
}

@media (max-width: 768px) {
  .grid-header,
  .grid-row {
    grid-template-columns: 80px repeat(7, 1fr);
  }

  .shift-time {
    font-size: 0.8rem;
  }

  .staff-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .time-period {
    position: static;
    margin-top: 1rem;
    text-align: left;
  }

  .submit-section {
    flex-direction: column;
  }

  .submit-btn,
  .reset-btn {
    width: 100%;
  }
}
</style>
