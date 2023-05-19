
const routes = [
  {
    path: '/',
    component: () => import('pages/IndexPage.vue'), 
    
  },

  {path: '/track', component: () => import('components/TrackBox.vue')},
  {path: '/dashboard', component: () => import('layouts/MainLayout.vue')},
  {path: '/form', component: () => import('components/FormPage.vue')},

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }

]

export default routes
