
const routes = [
  {path: '/', component: () => import('pages/IndexPage.vue')},
  {path: '/dashboard', component: () => import('layouts/MainLayout.vue')},
  {path: '/form', component: () => import('components/FormPage.vue')},
  {path: '/logout', component: () => import('pages/IndexPage.vue')},


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }

]

export default routes
