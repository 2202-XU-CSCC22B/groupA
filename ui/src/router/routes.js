
const routes = [
  {
    path: '/',
    component: () => import('pages/IndexPage.vue'),
  },

  {path: '/track', component: () => import('components/TrackBox.vue')},
  {path: '/verify', component: () => import('components/VerifyBox.vue')},
  {path: '/dashboard', component: () => import('layouts/MainLayout.vue')},
  

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }

]

export default routes
