import { createStore } from 'vuex';

const store = createStore({
  state: {
    // Define your state variables here
    historyItems: [],
    loading: true,
    filter: '',
    // Other state variables...
  },
  mutations: {
    // Define mutations to update state variables
    setHistoryItems(state, items) {
      state.historyItems = items;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    // Other mutations...
  },
  actions: {
    // Define actions to perform asynchronous tasks
    // For example, fetching data from the server
    async fetchData(context) {
      // Perform your axios request here
      // Update state using mutations
    },
    // Other actions...
  },
});

export default store;
