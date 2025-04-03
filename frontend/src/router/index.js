// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import SamplePage from '../views/sample.vue'
import StaffDashboard from '../views/staff/staffDashboard.vue'
import ResidentDashboard from '../views/resident/ResidentDashboard.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/sample', component: SamplePage },
  { path: '/staff', component: StaffDashboard },
  { path: '/admin', component: AdminDashboard },
  { path: '/resident', component: ResidentDashboard }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
