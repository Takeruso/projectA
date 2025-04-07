<template>
  <div class="resident-page">
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
      <div class="welcome-banner">
        <h1>Welcome back, Martha!</h1>
        <p>
          Today is Tuesday, April 1, 2025. You have 2 appointments scheduled
          this week.
        </p>
      </div>

      <div class="dashboard-grid">
        <div class="card card-appointments">
          <div class="card-icon">📅</div>
          <h2>Appointments</h2>
          <p>
            Book or view your upcoming appointments with doctors, specialists,
            and staff.
          </p>
          <a href="#" class="cta">Book Appointment</a>
        </div>

        <div class="card card-bills">
          <div class="card-icon">📜</div>
          <h2>Billing & Payments</h2>
          <p>
            View your current bills, payment history, and make new payments
            securely.
          </p>
          <a href="#" class="cta">View Bills</a>
        </div>

        <div class="card card-medical">
          <div class="card-icon">🏥</div>
          <h2>Medical Reports</h2>
          <p>
            Access your medical history, test results, and health assessments.
          </p>
          <a href="#" class="cta">View Reports</a>
        </div>

        <div class="card card-medication">
          <div class="card-icon">💊</div>
          <h2>Medication</h2>
          <p>
            Track your medications, view schedule, and request refills when
            needed.
          </p>
          <a href="#" class="cta">Manage Medications</a>
        </div>
      </div>

      <div class="upcoming-section">
        <h2>Upcoming Schedule</h2>
        <ul class="upcoming-list">
          <li class="upcoming-item">
            <div class="upcoming-date">Apr 3<br />9:30 AM</div>
            <div class="upcoming-details">
              <h3>Dr. Williams - Regular Checkup</h3>
              <p>Location: Medical Wing, Room 102</p>
            </div>
          </li>
          <li class="upcoming-item">
            <div class="upcoming-date">Apr 5<br />2:00 PM</div>
            <div class="upcoming-details">
              <h3>Physical Therapy Session</h3>
              <p>Location: Therapy Center, Room 210</p>
            </div>
          </li>
          <li class="upcoming-item">
            <div class="upcoming-date">Apr 7<br />11:00 AM</div>
            <div class="upcoming-details">
              <h3>Community Garden Club</h3>
              <p>Location: Garden Area, East Wing</p>
            </div>
          </li>
        </ul>
      </div>

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

    <!-- <footer>
      <div class="container footer-container">
        <div class="copyright">© 2025 Swin Care. All rights reserved.</div>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Contact Us</a>
          <a href="#">Feedback</a>
        </div>
      </div>
    </footer> -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

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
</script>

<style scoped>
/* .resident-page {
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
} */

:deep(.resident-page *) {
  all: unset;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
}

/* :deep(.resident-page body) {
  background-color: var(--light);
  color: var(--dark);
  line-height: 1.6;
} */

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

/* .resident-page footer {
  background-color: white;
  padding: 1.5rem 0;
  margin-top: 3rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
} */

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

.card .cta {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--primary-light);
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  text-align: center;
  margin-top: auto;
}

.card .cta:hover {
  background-color: var(--primary);
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

/* .footer-container {
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
} */

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
</style>
