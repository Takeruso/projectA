export default [
  {
    path: '/',
    component: () => import('@/views/Landing.vue')
  },
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  }
]
