// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
