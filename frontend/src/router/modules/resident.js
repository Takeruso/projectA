export default [
  {
    path: '/resident',
    component: () => import('@/views/resident/residentDashboard.vue')
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
    path: '/resident/recreation',
    component: () => import('@/views/resident/recreation.vue')
  }
]
