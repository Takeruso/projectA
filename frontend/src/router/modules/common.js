export default [
  {
    path: '/',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: '/sample',
    component: () => import('@/views/Sample.vue')
  }
]
