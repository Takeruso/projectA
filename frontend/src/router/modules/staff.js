export default [
  {
    path: '/staff',
    component: () => import('@/views/staff/staffDashboard.vue')
  },
  {
    path: '/staff/appointments',
    component: () => import('@/views/staff/appointmentCarer.vue')
  },
  {
    path: '/staff/residents',
    component: () => import('@/views/staff/residentInfo.vue')
  }
]
