import { route } from '/node_modules/.q-cache/vite/spa/deps/quasar_wrappers.js?v=cdbea60f'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from '/node_modules/.q-cache/vite/spa/deps/vue-router.js?v=cdbea60f'
import routes from '/src/router/routes.js?t=1713750597309'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const isAuthenticated = /* ตรวจสอบว่าผู้ใช้ลงทะเบียนหรือเข้าสู่ระบบแล้วหรือไม่ */ false; // ให้เปลี่ยนค่าตรงนี้ตามการตรวจสอบของคุณเอง

    // รายการหน้าที่ต้องการตรวจสอบสถานะการเข้าสู่ระบบ
    const securePages = ['dashboard', 'alcohol', 'role', 'user', 'profile','RoomAlcohol','profileuser'];

    if (securePages.includes(to.name) && !isAuthenticated) {
      next({ name: 'Login', query: { redirect: 'login' } }); // ถ้าไม่ใช่หน้า Login หรือ Register และไม่มีการลงทะเบียนหรือเข้าสู่ระบบ ให้เปลี่ยนเส้นทางไปยังหน้า Login
    } else {
      next(); // อนุญาตให้ผู้ใช้เข้าถึงหน้า
    }
  })

  return Router
})

