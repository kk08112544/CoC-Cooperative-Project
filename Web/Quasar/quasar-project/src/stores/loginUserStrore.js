import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, userData) {
      state.user = userData;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    loginUser({ commit }, userData) {
      commit('setUser', userData);
    },
    logoutUser({ commit }) {
      commit('clearUser');
    },
  },
  modules: {},
});