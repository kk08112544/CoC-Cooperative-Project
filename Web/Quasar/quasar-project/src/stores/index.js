// import { createStore } from 'vuex';

// export default createStore({
//   state: {
//     user: null,
//   },
//   mutations: {
//     setUser(state, userData) {
//       state.user = userData;
//     },
//     clearUser(state) {
//       state.user = null;
//     },
//   },
//   actions: {
//     loginUser({ commit }, userData) {
//       commit('setUser', userData);
//     },
//     logoutUser({ commit }) {
//       commit('clearUser');
//     },
//   },
//   modules: {},
// });
import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {
  const pinia = createPinia()

  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  return pinia
})
