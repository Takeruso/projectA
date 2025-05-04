import path from 'path'

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
  },
  {
    path: '/staff/reports',
    component: () => import('@/views/staff/staffMedicalReport.vue')
    // component: () => import('@/views/staff/testMed.vue'),
  },
  {
    path: '/staff/medication',
    component: () => import('@/views/staff/staffMedications.vue')
  },
  {
    path: '/staff/facilityCheckup',
    component: () => import('@/views/staff/facilityCheckup.vue')
  },
  {
    path: '/staff/availability',
    component: () => import('@/views/staff/staffSchedule.vue')
  }
]
