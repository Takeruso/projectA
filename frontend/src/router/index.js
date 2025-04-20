// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import SamplePage from '../views/sample.vue'
import StaffDashboard from '../views/staff/StaffDashboard.vue'
import ResidentDashboard from '../views/ResidentDashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import StaffAppointment from '../views/staff/appointmentCarer.vue'
import StaffResidentInfo from '../views/staff/residentInfo.vue'
// med report
import StaffMedicalReport from '../views/staff/staffMedicalReport.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/sample', component: SamplePage },
  { path: '/staff', component: StaffDashboard },
  { path: '/residentDashboard', component: ResidentDashboard },
  { path: '/admin', component: AdminDashboard },
  { path: '/staff/appointment', component: StaffAppointment },
  { path: '/staff/residentInfo', component: StaffResidentInfo },
  { path: '/staff/medicalReport', component: StaffMedicalReport }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
