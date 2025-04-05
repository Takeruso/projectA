// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import SamplePage from '../views/sample.vue'
import StaffDashboard from '../views/staff/staffDashboard.vue'
import ResidentDashboard from '../views/resident/ResidentDashboard.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import StaffManagement from '../views/admin/StaffManagement.vue'
import ViewFilterStaff from '../views/admin/ViewFilterStaff.vue'
import AddStaff from '../views/admin/AddStaff.vue'
import EditStaff from '../views/admin/EditStaff.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/sample', component: SamplePage },
  { path: '/staff', component: StaffDashboard },
  { path: '/admin', component: AdminDashboard },
  { path: '/resident', component: ResidentDashboard },
  { path: '/admin/staff-management', component: StaffManagement },
  { path: '/admin/staff-management/view', component: ViewFilterStaff },
  { path: '/admin/staff-management/add', component: AddStaff },
  { path: '/admin/staff-management/edit', component: EditStaff }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
