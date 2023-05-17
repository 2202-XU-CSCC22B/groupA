
const routes = [
  {
    path: '/',
    component: () => import('pages/IndexPage.vue'),
    children: [
      
    //  path: '/profile', component: () => import('pages/ProfilePage.vue'),
        {path: '/dashboard', component: () => import('layouts/MainLayout.vue')},
        {path: '/track', component: () => import('components/TrackBox.vue')},
        {path: '/verify', component: () => import('components/VerifyBox.vue')}
    //  path: '/logout', component: () => import('pages/LogoutPage.vue'),
      
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }

]

export default routes
