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
            <span class="alert-count">3</span>
          </button>
          <div class="user-name">Martha Johnson</div>
          <div class="user-avatar">MJ</div>
        </div>
      </div>
    </header>

    <main class="container">
      <div class="appointments-section">
        <h1>Manage Your Appointments</h1>
        <p>
          Here you can book, view, and manage your appointments with doctors,
          specialists, and staff.
        </p>
        <div class="dashboard-grid">
          <div class="card card-book-appointment">
            <div class="card-icon">📅</div>
            <h2>Book Appointment</h2>
            <p>
              Schedule a new appointment with our medical professionals at your
              convenience.
            </p>
            <button class="cta" @click="showModal('bookModal')">
              Book Now
            </button>
          </div>
          <div class="card card-view-appointments">
            <div class="card-icon">🗓️</div>
            <h2>View Appointments</h2>
            <p>
              Check your upcoming and past appointments, including details and
              reminders.
            </p>
            <button class="cta" @click="showModal('viewModal')">
              View Appointments
            </button>
          </div>
          <div class="card card-cancel-appointment">
            <div class="card-icon">❌</div>
            <h2>Cancel Appointment</h2>
            <p>
              Cancel any upcoming appointments if you cannot make it or need to
              reschedule.
            </p>
            <button class="cta" @click="showModal('cancelModal')">
              Cancel Appointment
            </button>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <div class="container footer-container">
        <div class="copyright">© 2025 Swin Care. All rights reserved.</div>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Contact Us</a>
          <a href="#">Feedback</a>
        </div>
      </div>
    </footer>

    <!-- Modals for Booking, Viewing, and Canceling Appointments -->
    <div id="bookModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal('bookModal')">&times;</span>
        <h2>Book Appointment</h2>
        <form id="bookForm" @submit.prevent="bookAppointment">
          <label for="reason">Reason:</label>
          <input
            type="text"
            id="reason"
            v-model="newAppointment.reason"
            required
          />
          <label for="date">Date:</label>
          <input type="date" id="date" v-model="newAppointment.date" required />
          <label for="time">Time:</label>
          <input type="time" id="time" v-model="newAppointment.time" required />
          <button type="submit">Book</button>
        </form>
      </div>
    </div>

    <div id="viewModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal('viewModal')">&times;</span>
        <h2>View Appointments</h2>
        <ul>
          <li
            v-for="(appt, index) in appointments"
            :key="index"
            class="appointment-item"
          >
            <div class="appointment-details">
              <h3>{{ appt.reason }}</h3>
              <p>{{ appt.date }} at {{ appt.time }}</p>
              <span>Status: Confirmed</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div id="cancelModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal('cancelModal')">&times;</span>
        <h2>Cancel Appointment</h2>
        <form id="cancelForm" @submit.prevent="cancelAppointment">
          <label for="appointment">Select Appointment to Cancel:</label>
          <select id="appointment" v-model="selectedAppointment" required>
            <option
              v-for="(appt, index) in appointments"
              :key="index"
              :value="index"
            >
              {{ appt.reason }} - {{ appt.date }} - {{ appt.time }}
            </option>
          </select>
          <button type="submit">Cancel</button>
        </form>
      </div>
    </div>

    <div
      id="notification"
      class="notification"
      :class="{
        danger: notificationType === 'danger',
        success: notificationType === 'success'
      }"
    >
      {{ notificationMessage }}
    </div>
  </div>
</template>

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

main {
  padding: 2rem 0;
}

.appointments-section {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.appointments-section h1 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: var(--dark);
}

.appointments-section p {
  color: #666;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.card {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.1);
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: white;
}

.card-book-appointment .card-icon {
  background-color: var(--primary);
}

.card-view-appointments .card-icon {
  background-color: var(--secondary);
}

.card-cancel-appointment .card-icon {
  background-color: var(--danger);
}

.card h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--dark);
}

.card p {
  color: #666;
  margin-bottom: 1rem;
  font-size: 1rem;
  flex-grow: 1;
}

.card .cta {
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
}

.card .cta:hover {
  background-color: var(--primary);
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.appointment-item {
  background-color: var(--light);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.appointment-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.appointment-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.appointment-details h3 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--dark);
  font-weight: bold;
}

.appointment-details p {
  margin: 0;
  font-size: 1.1rem;
  color: #555;
  font-weight: 500;
}

.appointment-details span {
  display: inline-block;
  background-color: var(--primary-light);
  color: white;
  font-size: 0.9rem;
  padding: 0.25rem 0.75rem;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 0.5rem;
}

form label {
  display: block;
  margin-top: 10px;
}

form input,
form select,
form button {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
}

form button {
  background-color: var(--primary-light);
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: var(--primary);
}

.notification {
  display: none;
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 2rem;
  background-color: var(--success);
  color: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: opacity 0.3s ease;
}

.notification.danger {
  background-color: var(--danger);
}

.notification.success {
  background-color: var(--success);
}
</style>

<script>
export default {
  data() {
    return {
      appointments: [],
      newAppointment: {
        reason: '',
        date: '',
        time: ''
      },
      selectedAppointment: null,
      notificationMessage: '',
      notificationType: ''
    }
  },
  methods: {
    showModal(modalId) {
      document.getElementById(modalId).style.display = 'block'
      if (modalId === 'viewModal') {
        this.updateAppointmentList()
      } else if (modalId === 'cancelModal') {
        this.updateCancelOptions()
      }
    },
    closeModal(modalId) {
      document.getElementById(modalId).style.display = 'none'
    },
    bookAppointment() {
      this.appointments.push({ ...this.newAppointment })
      this.showNotification('Appointment booked successfully!', 'success')
      this.closeModal('bookModal')
      this.updateAppointmentList()
    },
    cancelAppointment() {
      this.appointments.splice(this.selectedAppointment, 1)
      this.showNotification('Appointment canceled successfully!', 'danger')
      this.closeModal('cancelModal')
      this.updateAppointmentList()
    },
    updateAppointmentList() {
      // This method updates the appointment list
    },
    updateCancelOptions() {
      // This method updates the cancel options
    },
    showNotification(message, type) {
      this.notificationMessage = message
      this.notificationType = type
      const notification = document.getElementById('notification')
      notification.style.display = 'block'
      setTimeout(() => {
        notification.style.display = 'none'
      }, 3000)
    }
  }
}
</script>
