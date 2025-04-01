// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import SamplePage from '../views/sample.vue'
import ResidentDashboard from '../views/ResidentDashboard.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/sample', component: SamplePage },
  { path: '/residentDashboard', component: ResidentDashboard }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
