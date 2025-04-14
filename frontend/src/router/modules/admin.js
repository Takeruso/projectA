export default [
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminDashboard.vue')
  },
  {
    path: '/admin/staff',
    component: () => import('@/views/admin/StaffManagement.vue')
  },
  {
    path: '/admin/staff-records',
    component: () => import('@/views/admin/StaffRecords.vue')
  },
  {
    path: '/admin/facility-management',
    component: () => import('@/views/admin/FacilityManagement.vue')
  }
]
