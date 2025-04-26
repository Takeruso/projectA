<template>
  <div class="staff-page">
    <header>
      <div class="container header-container">
        <router-link to="/staff" class="logo">
          <span>Swin Care</span>
        </router-link>
        <div class="user-info">
          <button class="notifications-btn">
            📋
            <span class="alert-count">3</span>
          </button>
          <div class="user-name">Serena Tr</div>
          <div class="user-avatar">ST</div>
        </div>
      </div>
    </header>

    <main class="container">
      <!-- Appointments View -->
      <div v-if="showAppointments">
        <div class="row align-items-center">
          <div class="welcome-banner col-8 mx-2">
            <h1>Appointments</h1>
            <p>
              Today is {{ todayDate }}. You have
              {{ totalAppoinment }} appointments scheduled this week.
            </p>
          </div>
          <div class="welcome-banner col-3">
            <p><b>Total Patients</b></p>
            <p class="text-2xl font-bold mt-1">
              Count: {{ filteredAppointments.length }}
            </p>
          </div>
        </div>

        <!-- Buttons -->
        <div class="mb-4 text-center">
          <button class="refresh-btn mx-2" @click="toggleView('booking')">
            Book Appointment
          </button>
        </div>

        <div class="flex flex-col items-center gap-4 mb-8">
          <div class="flex items-center gap-2">
            <input
              type="text"
              v-model="search"
              placeholder="Search..."
              class="search-input"
            />
            <button @click="refresh" class="refresh-btn">Refresh🔄</button>
          </div>
        </div>

        <!-- Appointment Table -->
        <div class="overflow-x-auto">
          <table
            class="min-w-full table-auto border rounded shadow bg-pink-800"
          >
            <thead class="bg-pink-500">
              <tr>
                <th class="px-4 py-2 text-left">ID#</th>
                <th class="px-4 py-2 text-left">Patient's Name</th>
                <th class="px-4 py-2 text-left">Visit Type</th>
                <th class="px-4 py-2 text-left">Date/Time</th>
                <th class="px-4 py-2 text-left">Status</th>
                <th class="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="appointment in filteredAppointments"
                :key="appointment.id"
                class="border-t"
              >
                <td class="px-4 py-2">{{ appointment.id }}</td>
                <td class="px-4 py-2">{{ appointment.name }}</td>
                <td class="px-4 py-2">{{ appointment.visitType }}</td>
                <td class="px-4 py-2">{{ appointment.dateTime }}</td>
                <td class="px-4 py-2">
                  <span
                    v-if="appointment.note"
                    class="text-pink-400 font-semibold"
                  >
                    {{ appointment.note }}
                  </span>
                  <span
                    v-else
                    :class="{
                      'text-gray-400 italic': appointment.status === 'Pending',
                      'text-yellow-400 font-semibold':
                        appointment.status === 'Cancel'
                    }"
                  >
                    {{ appointment.status }}
                  </span>
                </td>
                <!-- ✅ Wrap the button inside a table cell -->
                <td class="px-4 py-2">
                  <button
                    class="bg-gray-700 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-600"
                    @click="editNote(appointment)"
                  >
                    ✏️ Add Note
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal for Add Note -->
        <div
          v-if="selectedAppointment"
          class="mt-4 p-4 rounded shadow bg-light"
        >
          <h3 class="text-lg font-semibold mb-2">
            Add Note for {{ selectedAppointment.name }}
          </h3>
          <textarea
            v-model="selectedAppointment.note"
            rows="3"
            class="w-full p-3 border border-gray-700 rounded bg-gray-100 text-black"
            placeholder="Please type the note here."
          ></textarea>
          <div class="mt-2 flex gap-2">
            <button
              class="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-500"
              @click="saveNote"
            >
              Save Note
            </button>
            <button
              class="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-400"
              @click="selectedAppointment = null"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <!-- Booking Form -->
      <div v-if="showBookingForm" class="card shadow p-4 mb-4">
        <h4 class="card-title text-center mb-4" style="color: #e83e8c">
          📅 Book New Appointment
        </h4>
        <form @submit.prevent="submitBooking">
          <div class="mb-3">
            <label for="name" class="form-label fw-bold">Patient's Name</label>
            <input
              type="text"
              v-model="newBooking.name"
              class="form-control"
              id="name"
              required
              placeholder="Enter patient's name"
            />
          </div>

          <div class="mb-3">
            <label for="visitType" class="form-label fw-bold">Visit Type</label>
            <input
              type="text"
              v-model="newBooking.visitType"
              class="form-control"
              id="visitType"
              required
              placeholder="e.g., Follow up visit"
            />
          </div>

          <div class="mb-3">
            <label for="dateTime" class="form-label fw-bold">Date & Time</label>
            <input
              type="datetime-local"
              v-model="newBooking.dateTime"
              class="form-control"
              id="dateTime"
              required
            />
          </div>

          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-pink btn-lg">
              Confirm Booking
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="toggleView('appointments')"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>

    <footer class="mt-10 py-4 text-center bg-gray-900 text-white">
      © 2025 Swin Care - All rights reserved.
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AppointmentCarer',
  data() {
    return {
      showAppointments: true,
      showBookingForm: false,
      selectedAppointment: null,
      search: '',
      newBooking: { name: '', visitType: '', dateTime: '' },
      appointments: [
        {
          id: '00063',
          name: 'Floyd Miles',
          visitType: 'New symptom visit',
          dateTime: '2025-04-26/10:30 am',
          note: '',
          status: 'Pending'
        },
        {
          id: '00645',
          name: 'Devon Lane',
          visitType: 'Follow up visit',
          dateTime: '2025-04-26/10:45 am',
          note: '',
          status: 'Pending'
        },
        {
          id: '00443',
          name: 'Marvin McKinney',
          visitType: 'Follow up visit',
          dateTime: '2025-04-26/10:50 am',
          note: '',
          status: 'Pending'
        },
        {
          id: '00374',
          name: 'Cody Fisher',
          visitType: 'Video Conference',
          dateTime: '2025-04-26/03:15 pm',
          note: '',
          status: 'Pending'
        },
        {
          id: '00985',
          name: 'Cameron Williamson',
          visitType: 'Chronic care visit',
          dateTime: '2025-04-10/04:30 pm',
          note: '',
          status: 'Pending'
        }
      ]
    }
  },
  computed: {
    filteredAppointments() {
      const term = this.search.toLowerCase()
      return this.appointments.filter(
        (a) =>
          a.name.toLowerCase().includes(term) ||
          a.id.includes(term) ||
          a.visitType.toLowerCase().includes(term) ||
          a.dateTime.toLowerCase().includes(term)
      )
    },
    todayDate() {
      return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    totalAppoinment() {
      return this.appointments.length
    }
  },
  methods: {
    toggleView(view) {
      this.showAppointments = view === 'appointments'
      this.showBookingForm = view === 'booking'
      this.selectedAppointment = null
    },
    cancelAppointment(appointment) {
      if (
        confirm(
          `Are you sure you want to cancel appointment for ${appointment.name}?`
        )
      ) {
        appointment.status = 'Cancel'
        alert('Appointment cancelled.')
      }
    },
    editNote(appointment) {
      this.selectedAppointment = appointment
    },
    saveNote() {
      alert('Note saved!')
      this.selectedAppointment = null
    },
    refresh() {
      this.appointments.forEach((appointment) => {
        appointment.note = ''
        appointment.status = 'Pending'
      })
      this.selectedAppointment = null
      alert('All notes/statuses reset.')
    },
    submitBooking() {
      const newId = String(Math.floor(Math.random() * 100000)).padStart(5, '0')
      const formattedDateTime = this.formatDateTime(this.newBooking.dateTime)
      this.appointments.push({
        id: newId,
        name: this.newBooking.name,
        visitType: this.newBooking.visitType,
        dateTime: formattedDateTime,
        note: '',
        status: 'Pending'
      })
      alert('Appointment booked!')
      this.newBooking = { name: '', visitType: '', dateTime: '' }
      this.toggleView('appointments')
    },
    formatDateTime(dateTimeString) {
      const date = new Date(dateTimeString)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      let hours = date.getHours()
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const ampm = hours >= 12 ? 'pm' : 'am'
      hours = hours % 12 || 12
      return `${year}-${month}-${day}/${hours}:${minutes} ${ampm}`
    }
  }
}
</script>

<style scoped>
/* your CSS remains the same */
</style>

<style scoped>
.staff-page {
  --primary: #ff2474;
  --primary-light: #ff5d98;
  --secondary: #f4b942;
  --dark: #2a3950;
  --light: #f9f9f9;
  --danger: #d64045;
  --success: #4caf50;
  --gray: #e5e9f0;
  background-color: var(--light);
  color: var(--dark);
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
}

.btn-pink {
  background-color: #ff5d98;
  color: white;
  border: none;
}

.btn-pink:hover {
  background-color: #d63384; /* slightly darker pink when hover */
  color: white;
}
.container {
  width: 80vw;
  max-width: 1200px; /* Set a max width for larger screens */
  margin: 0 auto; /* Center the container */
  padding: 0 20px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--primary);
  text-decoration: none;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--gray);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: var(--dark);
}

.welcome-banner {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.welcome-banner h1 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: var(--dark);
}

.welcome-banner p {
  color: #666;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.gap-4 {
  gap: 1rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.text-center {
  text-align: center;
}

.text-gray-400 {
  color: #666;
}

.text-2xl {
  font-size: 1.5rem; /* Adjusted for consistency */
}

.table-auto {
  width: 100%;
  border-collapse: collapse;
}

.table-auto th,
.table-auto td {
  padding: 0.75rem;
  border: 1px solid var(--gray);
}

.table-auto th {
  background-color: #ff2474;
  color: white;
}

.table-auto tbody tr:nth-child(even) {
  background-color: var(--light);
}

.table-auto tbody tr:hover {
  background-color: hsl(338, 100%, 87%);
}

.bg-gray-800 {
  background-color: var(--dark);
}

.bg-gray-700 {
  background-color: var(--primary);
}

.bg-pink-600 {
  background-color: #ff6b81; /* Tailwind blue */
}

.bg-blue-500 {
  background-color: #ff6b81; /* Tailwind blue */
}

.rounded {
  border-radius: 0.5rem;
}

.shadow {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.alert-count {
  background-color: var(--danger);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  position: absolute;
  top: -5px;
  right: -5px;
}

.notifications-btn {
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
}

textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--gray);
  border-radius: 0.5rem;
  background-color: #ffebee;
  color: var(--dark);
}

textarea:focus {
  outline: none;
  border-color: var(--primary);
}

@media (max-width: 768px) {
  .welcome-banner {
    margin-bottom: 1rem;
  }

  .header-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .user-info {
    margin-top: 1rem;
  }
}

@media (max-width: 480px) {
  .welcome-banner {
    padding: 1rem;
  }

  .text-2xl {
    font-size: 1.25rem; /* Adjust for smaller screens */
  }
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links a {
  color: var(--primary);
  margin-left: 1rem;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}
/* Search Input Styles */
.search-input {
  background-color: #ff2474; /* Pink background */
  color: white; /* White text color */
  border: 1px solid var(--primary-light); /* Light pink border */
  border-radius: 0.5rem; /* Rounded corners */
  padding: 0.75rem; /* Padding for better spacing */
  width: 250px; /* Fixed width for consistency */
  transition: border-color 0.3s ease; /* Smooth transition for focus */
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7); /* Light white for placeholder text */
}

.search-input:focus {
  outline: none; /* Remove default outline */
  border-color: white; /* Change border color to white on focus */
}

/* Refresh Button Styles */
.refresh-btn {
  background-color: #ff2474; /* Pink background */
  color: white; /* White text */
  padding: 0.75rem 1rem; /* Padding for better spacing */
  border: none; /* Remove default border */
  border-radius: 0.5rem; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s ease; /* Smooth transition for hover */
}

.refresh-btn:hover {
  background-color: var(--primary-light); /* Lighter pink on hover */
}
</style>
