
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/register', component: () => import('pages/RegisterPage.vue') },
      { path: '/login', component: () => import('pages/LoginPage.vue') },
    ]
  },
  {
    path:'/director/',
    component: () => import('layouts/DirectorLayout.vue'),
    children: [
      {path: 'dashboard',component: () => import('pages/Director/DashboardPage.vue')},
      {path: 'role',component: () => import('pages/Director/RolePage.vue')},
      {path: 'notify',component: () => import('pages/Director/NotifyPage.vue')},
      {path: 'RoomAlcohol',component: () => import('pages/Director/RoomAlcoholPage.vue')},
      {path: 'user',component: () => import('pages/Director/ListUserPage.vue')},
      {path: 'profile',component: () => import('pages/Director/ProfilePage.vue')},
      // {path: 'test',component: () => import('pages/Director/TestPage.vue')},
    ]
  },
  {
    path:'/user/',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {path: 'alcohol',component: () => import('pages/User/AlcoholPage.vue')},
      {path: 'profileuser',component: () => import('pages/User/ProfileUserPage.vue')},
    ]
  },
  // {
  //   path:'/test/',
  //   component: () => import('layouts/TestLayout.vue'),
  //   children:[
  //     { path: '/tester', component: () => import('pages/TesterPage.vue') },
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
