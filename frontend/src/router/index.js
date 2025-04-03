// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import SamplePage from '../views/sample.vue'
import ResidentDashboard from '../views/ResidentDashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import FacilityManagement from '../views/FacilityManagement.vue'
import ServiceManagement from '../views/ServiceManagement.vue'
import Alerts from '../views/Alerts.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/sample', component: SamplePage },
  { path: '/resident/residentDashboard', component: ResidentDashboard },
  { path: '/admin', component: AdminDashboard },
  { path: '/admin/facility', component: FacilityManagement },
  { path: '/admin/service', component: ServiceManagement },
  { path: '/admin/alerts', component: Alerts }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
