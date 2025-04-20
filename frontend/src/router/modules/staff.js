export default [
  {
    path: '/staff',
    component: () => import('@/views/staff/staffDashboard.vue')
  },
  {
    path: '/staff/appointment',
    component: () => import('@/views/staff/appointmentCarer.vue')
  },
  {
    path: '/staff/residentInfo',
    component: () => import('@/views/staff/residentInfo.vue')
  }
]
