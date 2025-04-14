// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import adminRoutes from './modules/admin'
import staffRoutes from './modules/staff'
import residentRoutes from './modules/resident'
import commonRoutes from './modules/common'

const routes = [
  ...commonRoutes,
  ...adminRoutes,
  ...staffRoutes,
  ...residentRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
