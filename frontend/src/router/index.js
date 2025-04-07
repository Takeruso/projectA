// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import SamplePage from '../views/sample.vue'
import StaffDashboard from '../views/staff/staffDashboard.vue'
import ResidentDashboard from '../views/resident/ResidentDashboard.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import Billing from '../views/resident/billing.vue'
import ResidentAppointment from '../views/resident/appointments.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/sample', component: SamplePage },
  { path: '/staff', component: StaffDashboard },
  { path: '/admin', component: AdminDashboard },
  { path: '/resident', component: ResidentDashboard },
  { path: '/resident/bill', component: Billing },
  { path: '/resident/ResidentAppointment', component: ResidentAppointment }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
