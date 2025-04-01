<template>
  <div class="container py-4">
    <!-- Header -->
    <header class="sticky-top bg-white shadow-sm py-3 mb-4">
      <div class="d-flex justify-content-between align-items-center">
        <div class="h4 text-primary fw-bold">
          <i class="fas fa-clinic-medical me-2"></i>Swin Care
        </div>
        <div class="d-flex align-items-center gap-3">
          <button class="btn position-relative" @click="showNotifications">
            <i class="fas fa-bell fa-lg"></i>
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              3
            </span>
          </button>
          <div class="fw-bold">Martha Johnson</div>
          <div
            class="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
            style="width: 40px; height: 40px"
          >
            MJ
          </div>
        </div>
      </div>
    </header>

    <!-- Welcome Banner -->
    <div class="bg-white p-4 rounded shadow-sm mb-4">
      <h2 class="mb-2">Welcome back, Martha!</h2>
      <p class="text-muted">
        Today is Tuesday, April 1, 2025. You have 2 appointments scheduled this
        week.
      </p>
    </div>

    <!-- Dashboard Cards -->
    <div class="row g-4">
      <DashboardCard
        icon="fas fa-calendar-alt"
        title="Appointments"
        description="Book or view your upcoming appointments with doctors, specialists, and staff."
        btnText="Book Appointment"
        color="primary"
      />
      <DashboardCard
        icon="fas fa-file-invoice"
        title="Billing & Payments"
        description="View your current bills, payment history, and make new payments securely."
        btnText="View Bills"
        color="warning"
      />
      <DashboardCard
        icon="fas fa-notes-medical"
        title="Medical Reports"
        description="Access your medical history, test results, and health assessments."
        btnText="View Reports"
        color="success"
      />
      <DashboardCard
        icon="fas fa-pills"
        title="Medication"
        description="Track your medications, view schedule, and request refills when needed."
        btnText="Manage Medications"
        color="danger"
      />
    </div>

    <!-- Upcoming Schedule -->
    <div class="bg-white p-4 mt-5 rounded shadow-sm">
      <h3 class="mb-3">Upcoming Schedule</h3>
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex align-items-center">
          <div
            class="text-center bg-light p-2 rounded me-3"
            style="min-width: 80px"
          >
            <strong>Apr 3</strong><br />9:30 AM
          </div>
          <div>
            <h6 class="mb-1">Dr. Williams - Regular Checkup</h6>
            <p class="mb-0 text-muted">Location: Medical Wing, Room 102</p>
          </div>
        </li>
        <li class="list-group-item d-flex align-items-center">
          <div
            class="text-center bg-light p-2 rounded me-3"
            style="min-width: 80px"
          >
            <strong>Apr 5</strong><br />2:00 PM
          </div>
          <div>
            <h6 class="mb-1">Physical Therapy Session</h6>
            <p class="mb-0 text-muted">Location: Therapy Center, Room 210</p>
          </div>
        </li>
        <li class="list-group-item d-flex align-items-center">
          <div
            class="text-center bg-light p-2 rounded me-3"
            style="min-width: 80px"
          >
            <strong>Apr 7</strong><br />11:00 AM
          </div>
          <div>
            <h6 class="mb-1">Community Garden Club</h6>
            <p class="mb-0 text-muted">Location: Garden Area, East Wing</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- Quick Access -->
    <div class="mt-5">
      <h3 class="mb-3">Quick Access</h3>
      <div class="row g-3">
        <QuickLink icon="fas fa-utensils" text="Meal Menu" color="danger" />
        <QuickLink icon="fas fa-walking" text="Activities" color="success" />
        <QuickLink icon="fas fa-phone" text="Contact Staff" color="primary" />
        <QuickLink icon="fas fa-comments" text="Family Chat" color="warning" />
        <QuickLink
          icon="fas fa-question-circle"
          text="Help & FAQ"
          color="info"
        />
        <QuickLink icon="fas fa-cogs" text="Settings" color="secondary" />
      </div>
    </div>
  </div>
</template>

<script setup>
import DashboardCard from '../components/DashboardCard.vue'
import QuickLink from '../components/QuickLink.vue'

const showNotifications = () => {
  alert(
    'You have 3 notifications:\n' +
      '- Medication refill ready for pickup\n' +
      '- New medical report available\n' +
      '- Your bill payment is due in 5 days'
  )
}
</script>

<style scoped></style>
