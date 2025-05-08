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
      <!-- Welcome Section -->
      <div class="row align-items-center">
        <div class="welcome-banner col-8 mx-2">
          <h1>Welcome back, Serena!</h1>
          <p>
            Today is {{ todayDate }}. You have
            {{ totalAppointment }} appointments scheduled this week.
          </p>
        </div>
        <div class="welcome-banner col-3">
          <p><b>Total Patients</b></p>
          <p>Female: 10 Male: 17</p>
        </div>
      </div>

      <!-- Dashboard Cards -->
      <div class="dashboard-grid">
        <div class="card card-appointments">
          <div class="card-icon"><i class="fa-solid fa-phone"></i></div>
          <h2>Appointments</h2>
          <p>
            Upcoming appointments with doctors, specialists, and therapy
            sessions.
          </p>
          <router-link to="/staff/appointment" class="cta"
            >Check Appointment</router-link
          >
        </div>

        <div class="card card-bills">
          <div class="card-icon"><i class="fa-solid fa-address-book"></i></div>
          <h2>Resident Info</h2>
          <p>
            View resident personal information, including contact details and
            emergency contacts.
          </p>
          <router-link to="/staff/residentInfo" class="cta"
            >View Resident Details</router-link
          >
        </div>

        <div class="card card-medical">
          <div class="card-icon"><i class="fa-solid fa-house-medical"></i></div>
          <h2>Facility Checkup</h2>
          <p>
            View facility status, including cleanliness, safety, and maintenance
            issues.
          </p>
          <router-link to="/staff/facilityCheckup" class="cta"
            >View Reports</router-link
          >
        </div>

        <div class="card card-medical">
          <div class="card-icon">🏥</div>
          <h2>Medical Reports</h2>
          <p>
            Access your medical history, test results, and health assessments.
          </p>
          <router-link to="/staff/reports" class="cta"
            >View Reports</router-link
          >
        </div>

        <div class="card card-medication">
          <div class="card-icon">💊</div>
          <h2>Medication</h2>
          <p>
            Track medications inventory, view schedule, and refills when needed.
          </p>
          <router-link to="/staff/medication" class="cta"
            >View Medication</router-link
          >
        </div>
        <div class="card card-availability">
          <div class="card-icon">📅</div>
          <h2>Submit Availability</h2>
          <p>
            Submit your weekly availability so managers can schedule shifts
            accordingly.
          </p>
          <router-link to="/staff/availability" class="cta">
            Submit Now
          </router-link>
        </div>
      </div>

      <div class="calendar-wrapper">
        <CalendarSection />
      </div>

      <!-- <div class="schedule-header">
        <h2>Next Schedules</h2>
        <span class="small-date"> April 2025 </span>
        <div class="calendar">
          <div class="calendar-header">
            <div class="day">Sun</div>
            <div class="day">Mon</div>
            <div class="day">Tue</div>
            <div class="day">Wed</div>
            <div class="day">Thu</div>
            <div class="day">Fri</div>
            <div class="day">Sat</div>
          </div>
          <div class="calendar-body">
            <div
              class="calendar-day"
              v-for="(date, index) in weekDates"
              :key="index"
            >
              <div class="date">{{ date.getDate() }}</div>
              <div class="appointments">
                <div v-if="index === 3">
                  <div class="appointment clickable" @click="highlightTask">
                    <div class="appointment-title">
                      Morning Medication Rounds
                    </div>
                    <div class="appointment-location">All Resident Rooms</div>
                    <div class="appointment-time">8:00am - 9:00am</div>
                  </div>
                  <div class="appointment clickable" @click="highlightTask">
                    <div class="appointment-title">Wound Care Checkup</div>
                    <div class="appointment-location">
                      Medical Wing, Room 12
                    </div>
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
                    <div class="appointment-title">
                      Family Visit Coordination
                    </div>
                    <div class="appointment-location">Front Desk</div>
                    <div class="appointment-time">2:00pm - 3:00pm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <!-- Staff Checklist Table Section -->
      <section class="mt-10 bg-white p-6 rounded shadow">
        <h2 class="text-xl font-semibold mb-4 text-pink-700 checklist-title">
          📝 Staff Shift Duties & Checklist
        </h2>

        <table class="table checklist-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Task</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in checklist" :key="index">
              <td>{{ task.time }}</td>
              <td>{{ task.task }}</td>
              <td class="text-center">
                <input type="checkbox" v-model="task.completed" />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Quick Access Section -->
      <div class="quick-access">
        <h2>Quick Access</h2>
        <div class="quick-links">
          <a href="#" class="quick-link">
            <div class="quick-link-icon" style="background-color: #e57373">
              🍽️
            </div>
            <span>Meal Menu</span>
          </a>
          <a href="#" class="quick-link">
            <div class="quick-link-icon" style="background-color: #81c784">
              🚶
            </div>
            <span>Activities</span>
          </a>
          <a href="#" class="quick-link">
            <div class="quick-link-icon" style="background-color: #64b5f6">
              📞
            </div>
            <span>Contact Staff</span>
          </a>
          <a href="#" class="quick-link">
            <div class="quick-link-icon" style="background-color: #ff8a65">
              💬
            </div>
            <span>Family Chat</span>
          </a>
          <a href="#" class="quick-link">
            <div class="quick-link-icon" style="background-color: #9575cd">
              ❓
            </div>
            <span>Help & FAQ</span>
          </a>
          <a href="#" class="quick-link">
            <div class="quick-link-icon" style="background-color: #4db6ac">
              ⚙️
            </div>
            <span>Settings</span>
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CalendarSection from '@/components/CalendarSection.vue'

const currentDate = ref(new Date())

const todayDate = computed(() => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return new Date().toLocaleDateString('en-US', options)
})

const totalAppointment = computed(() => 3)

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

onMounted(() => {
  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => {
    card.addEventListener('click', function (e) {
      if (!e.target.classList.contains('cta')) {
        const cta = this.querySelector('.cta')
        if (cta) window.location.href = cta.getAttribute('href')
      }
    })
  })

  const notificationsBtn = document.querySelector('.notifications-btn')
  if (notificationsBtn) {
    notificationsBtn.addEventListener('click', function () {
      alert(
        'You have 3 notifications:\n- Medication refill ready for pickup\n- New medical report available\n- Your bill payment is due in 5 days'
      )
    })
  }
})

const checklist = ref([
  { time: '08:00 AM', task: 'Morning Wake-up Assistance', completed: false },
  {
    time: '08:00 AM',
    task: 'Assist residents to attend their upcoming appointments or activities',
    completed: false
  },
  {
    time: '08:30 AM',
    task: 'Help with toileting & hygiene (bathing, brushing, grooming)',
    completed: false
  },
  {
    time: '08:45 AM',
    task: 'Assist with dressing (according to weather & preference)',
    completed: false
  },
  {
    time: '09:00 AM',
    task: 'Breakfast Service or assist with feeding',
    completed: false
  },
  {
    time: '09:30 AM',
    task: 'Administer or assist with medications',
    completed: false
  },
  {
    time: '10:00 AM',
    task: 'Record vital signs (if required)',
    completed: false
  },
  { time: '10:15 AM', task: 'Medication Round 1', completed: false },
  {
    time: '11:45 PM',
    task: 'Lunch Service and assist with feeding',
    completed: false
  },
  { time: '12:30 PM', task: 'Break time', completed: false },
  { time: '01:30 PM', task: 'Keep common areas tidy', completed: false },
  { time: '01:45 PM', task: 'Medication Round 2', completed: false },
  { time: '02:00 PM', task: 'Facility Checkup', completed: false },
  {
    time: '03:35 PM',
    task: 'Support mobility like help residents walk/stretch/exercise',
    completed: false
  },
  {
    time: '04:00 PM',
    task: 'Record fluid/food intake for required residents',
    completed: false
  },
  { time: '04:15 PM', task: 'Check tasks before end', completed: false },
  { time: '04:30 PM', task: 'End shift', completed: false }
])
</script>

<style scoped>
.schedule-header {
  margin-top: 3rem; /* Adds space above the Next Schedules section */
}
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

:deep(.resident-page *) {
  all: unset;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
}

:deep(.resident-page body) {
  background-color: var(--light);
  color: var(--dark);
  line-height: 1.6;
}

/* :deep(.resident-page header) {
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
  } */

.resident-page main {
  padding: 2rem 0;
}

/* .resident-page :deep(footer) {
    background-color: white;
    padding: 1.5rem 0;
    margin-top: 3rem;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  } */

.resident-page header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.resident-page footer {
  background-color: white;
  padding: 1.5rem 0;
  margin-top: 3rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.container {
  width: 80vw;
  max-width: none;
  margin: 0;
  padding: 0 20px;
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

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.card {
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
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
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: white;
}

.card-appointments .card-icon {
  background-color: var(--primary);
}

.card-bills .card-icon {
  background-color: var(--secondary);
}

.card-medical .card-icon {
  background-color: var(--success);
}

.card-medication .card-icon {
  background-color: var(--danger);
}
.card-availability .card-icon {
  background-color: var(--primary-light);
}

.card h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--dark);
}

.card p {
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  flex-grow: 1;
}

.cta {
  display: inline-block;
  background-color: var(--primary);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  margin-top: 1rem;
  text-decoration: none;
  font-weight: bold;
}

.cta:hover {
  background-color: var(--primary-light);
}
/* 
.calendar-section {
  margin-top: 2rem;
} */

/* .calendar-header {
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
  gap: 1rem;
}

.calendar-day {
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 10px;
} */

.calendar-wrapper {
  margin: 2rem;
}

.date {
  font-size: 1.2rem;
  font-weight: bold;
}

.appointments {
  margin-top: 1rem;
}

.appointment {
  background-color: var(--primary-light);
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.appointment-title {
  font-size: 1rem;
  font-weight: bold;
}

.appointment-time {
  font-size: 0.9rem;
}
.quick-access {
  margin-top: 2rem;
}

.quick-access h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: var(--dark);
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.quick-link {
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  color: var(--dark);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.quick-link:hover {
  transform: translateY(-3px);
}

.quick-link-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.9rem;
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

.checklist-title {
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 0.5 rem;
  color: #d81b60;
  border-left: 6px solid #f06292;
  padding-left: 0px;
}

.checklist-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  background-color: white;
}

.checklist-table th,
.checklist-table td {
  border: 1px solid #ccc;
  padding: 10px 15px;
  text-align: left;
}

.checklist-table th {
  background-color: #ffe4ec;
  color: #880e4f;
}

.checklist-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.checklist-table tr:hover {
  background-color: #fff3f6;
}

.upcoming-section {
  margin-top: 2rem;
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.upcoming-section h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: var(--dark);
}

.upcoming-list {
  list-style-type: none;
}

.upcoming-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--gray);
}

.upcoming-item:last-child {
  border-bottom: none;
}

.upcoming-date {
  min-width: 80px;
  text-align: center;
  padding: 0.5rem;
  background-color: var(--gray);
  border-radius: 5px;
  font-weight: bold;
}

.upcoming-details {
  flex: 1;
}

.upcoming-details h3 {
  font-size: 1rem;
  margin-bottom: 0.3rem;
}
@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr 1fr;
  }

  .calendar-header,
  .calendar-body {
    grid-template-columns: 1fr 1fr 1fr;
    .quick-links {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 480px) {
    .dashboard-grid {
      grid-template-columns: 1fr;
    }

    .calendar-header,
    .calendar-body {
      grid-template-columns: 1fr;
    }

    .quick-links {
      grid-template-columns: 1fr;
    }
  }
}
</style>
