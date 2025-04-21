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
        <!-- Staff Management -->
        <div class="card card-appointments">
          <div class="card-icon"><i class="fas fa-user-nurse"></i></div>
          <h2>Staff Management</h2>
          <p>
            View and manage staff profiles, qualifications, schedules, and
            assignments.
          </p>
          <router-link to="/admin/staff-records" class="cta"
            >Manage Staff</router-link
          >
        </div>

        <!-- Resident Management -->
        <div class="card card-appointments">
          <div class="card-icon"><i class="fas fa-procedures"></i></div>
          <h2>Resident Management</h2>
          <p>
            Manage resident profiles, care plans, medical records, and personal
            information securely.
          </p>
          <router-link to="/admin/resident-management" class="cta"
            >Manage Residents</router-link
          >
        </div>

        <!-- Facility Management -->
        <div class="card card-appointments">
          <div class="card-icon"><i class="fas fa-hospital-alt"></i></div>
          <h2>Facility Management</h2>
          <p>
            Check facility status, room availability, and manage utilities and
            reservations.
          </p>
          <router-link to="/admin/facility-management" class="cta"
            >View Facilities</router-link
          >
        </div>

        <!-- Scheduling -->
        <div class="card card-appointments">
          <div class="card-icon"><i class="fas fa-calendar-alt"></i></div>
          <h2>Scheduling</h2>
          <p>
            Assign and manage shifts, view upcoming schedules, and coordinate
            staff availability.
          </p>
          <router-link to="/admin/schedule" class="cta"
            >Manage Schedule</router-link
          >
        </div>

        <!-- Inventory Management -->
        <div class="card card-appointments">
          <div class="card-icon"><i class="fas fa-boxes"></i></div>
          <h2>Inventory Management</h2>
          <p>
            Track inventory levels, manage supplies, and ensure essential goods
            are available.
          </p>
          <router-link to="/admin/inventory" class="cta"
            >View Inventory</router-link
          >
        </div>
      </div>

      <div class="upcoming-section">
        <h2>Upcoming Staff Shifts</h2>
        <ul class="upcoming-list">
          <li class="upcoming-item">
            <div class="upcoming-date">Apr 3<br />7:00 AM - 3:00 PM</div>
            <div class="upcoming-details">
              <h3>Sarah Johnson - Registered Nurse</h3>
              <p>Assigned to: Medical Wing, Room 102</p>
            </div>
          </li>
          <li class="upcoming-item">
            <div class="upcoming-date">Apr 5<br />8:00 AM - 4:00 PM</div>
            <div class="upcoming-details">
              <h3>Tom Nguyen - Care Assistant</h3>
              <p>Assigned to: Residential Unit B</p>
            </div>
          </li>
          <li class="upcoming-item">
            <div class="upcoming-date">Apr 7<br />10:00 AM - 6:00 PM</div>
            <div class="upcoming-details">
              <h3>Alice Wong - Physiotherapist</h3>
              <p>Assigned to: Therapy Center, Room 210</p>
            </div>
          </li>
        </ul>
      </div>
    </main>
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
:deep(.resident-page *) {
  all: unset;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
}
.resident-page main {
  padding: 2rem 0;
}

.resident-page header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
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
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
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
  justify-content: space-between;
  height: 100%;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.dashboard-grid > div {
  height: 100%;
}

.card-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  background-color: #e6e6e6;
  color: #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
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

@media (min-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1199px) {
  .dashboard-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}
</style>
