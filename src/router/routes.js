const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/register',
    component: () => import('pages/RegisterPage.vue')
  },
  {
    path: '/contact',
    component: () => import('pages/ContactPage.vue')
  },
  {
    path: '/services',
    component: () => import('pages/ServicesPage.vue')
  },
  {
    path: '/pricing',
    component: () => import('pages/PricingPage.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
