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
      <div class="modal-content enhanced-container">
        <span class="close" @click="closeModal('bookModal')">&times;</span>
        <h2>Book Appointment</h2>
        <form id="bookForm" @submit.prevent="bookAppointment">
          <label for="reason">Reason:</label>
          <input
            type="text"
            id="reason"
            v-model="newAppointment.reason"
            placeholder="E.g., Consultation, Check-up, etc."
            required
          />

          <label for="department">Department:</label>
          <select
            id="department"
            v-model="newAppointment.department"
            @change="updateDoctors"
            required
          >
            <option value="" disabled selected>Select Department</option>
            <option
              v-for="(doctors, department) in departments"
              :key="department"
              :value="department"
            >
              {{ department }}
            </option>
          </select>

          <label for="doctor">Select Doctor:</label>
          <select id="doctor" v-model="newAppointment.doctor" required>
            <option value="" disabled selected>Select Doctor</option>
            <option
              v-for="doctor in availableDoctors"
              :key="doctor"
              :value="doctor"
            >
              {{ doctor }}
            </option>
          </select>

          <label for="date">Date:</label>
          <input type="date" id="date" v-model="newAppointment.date" required />

          <label for="time">Time:</label>
          <input type="time" id="time" v-model="newAppointment.time" required />

          <button type="submit" class="cta">Book</button>
        </form>
      </div>
    </div>

    <div id="viewModal" class="modal">
      <div class="modal-content enhanced-container">
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
              <p>Doctor: {{ appt.doctor }}</p>
              <p>Department: {{ appt.department }}</p>
              <span>Status: Confirmed</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div id="cancelModal" class="modal">
      <div class="modal-content enhanced-container">
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
          <button type="submit" class="cta">Cancel</button>
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

<script>
export default {
  data() {
    return {
      appointments: [],
      newAppointment: {
        reason: '',
        department: '',
        doctor: '',
        date: '',
        time: ''
      },
      selectedAppointment: null,
      availableDoctors: [],
      notificationMessage: '',
      notificationType: '',
      departments: {
        Cardiology: ['Dr. John Smith', 'Dr. Emily Clark'],
        Dermatology: ['Dr. Rachel Adams', 'Dr. Michael Brown'],
        Physiotherapy: ['Dr. Sarah Lee', 'Dr. Chris Pine'],
        Neurology: ['Dr. Alan Grant', 'Dr. Ellie Sattler'],
        Pediatrics: ['Dr. Jane Doe', 'Dr. Mark Green'],
        Orthopedics: ['Dr. Sophia Black', 'Dr. Ethan Gray'],
        Gastroenterology: ['Dr. Lisa White', 'Dr. Kevin Blue'],
        Oncology: ['Dr. Paul Red', 'Dr. Clara Pink'],
        Radiology: ['Dr. George Grey', 'Dr. Susan Violet'],
        Endocrinology: ['Dr. Andrew Yellow', 'Dr. Olivia Orange']
      }
    }
  },
  methods: {
    showModal(modalId) {
      document.getElementById(modalId).style.display = 'block'
    },
    closeModal(modalId) {
      document.getElementById(modalId).style.display = 'none'
    },
    bookAppointment() {
      this.appointments.push({ ...this.newAppointment })
      this.showNotification('Appointment booked successfully!', 'success')
      this.closeModal('bookModal')
      this.clearForm()
    },
    cancelAppointment() {
      this.appointments.splice(this.selectedAppointment, 1)
      this.showNotification('Appointment canceled successfully!', 'danger')
      this.closeModal('cancelModal')
    },
    updateDoctors() {
      this.availableDoctors =
        this.departments[this.newAppointment.department] || []
    },
    showNotification(message, type) {
      this.notificationMessage = message
      this.notificationType = type
      const notification = document.getElementById('notification')
      notification.style.display = 'block'
      setTimeout(() => {
        notification.style.display = 'none'
      }, 3000)
    },
    clearForm() {
      this.newAppointment = {
        reason: '',
        department: '',
        doctor: '',
        date: '',
        time: ''
      }
    }
  }
}
</script>

<style scoped>
/* General and Button Styling */
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

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
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

/* Appointments Section */
.appointments-section {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
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
  align-items: center;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.1);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
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

.cta {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-light);
  color: white;
  text-align: center;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta:hover {
  background-color: var(--primary);
}

/* Modal Styling */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: white;
  margin: 10% auto;
  padding: 2rem;
  border-radius: 10px;
  width: 80%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.enhanced-container {
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  box-shadow:
    4px 4px 6px rgba(0, 0, 0, 0.1),
    -4px -4px 6px rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  padding: 2rem;
}

.close {
  float: right;
  font-size: 1.5rem;
  cursor: pointer;
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
}

.notification.danger {
  background-color: var(--danger);
}
</style>
