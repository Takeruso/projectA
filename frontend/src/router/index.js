// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import adminRoutes from './modules/admin.js'
import staffRoutes from './modules/staff.js'
import residentRoutes from './modules/resident.js'
import commonRoutes from './modules/common.js'

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
