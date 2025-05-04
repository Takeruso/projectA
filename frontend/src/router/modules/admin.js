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
  },
  {
    path: '/admin/resident-management',
    component: () => import('@/views/admin/ResidentManagement.vue')
  },
  {
    path: '/admin/schedule',
    component: () => import('@/views/admin/ScheduleManagement.vue')
  },
  {
    path: '/admin/inventory',
    component: () => import('@/views/admin/Inventory.vue')
  }
]
