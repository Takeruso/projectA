export default [
  {
    path: '/resident',
    component: () => import('@/views/resident/ResidentDashboard.vue')
  },
  {
    path: '/resident/bill',
    component: () => import('@/views/resident/billing.vue')
  },
  {
    path: '/resident/appointments',
    component: () => import('@/views/resident/appointments.vue')
  },
  {
    path: '/resident/medications',
    component: () => import('@/views/resident/medications.vue')
  },
  {
    path: '/resident/reports',
    component: () => import('@/views/resident/reports.vue')
  }
]
