import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({

    // not really sure if we need this persisted state 
    // plugin but we'll leave it for now
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
  state: {
    user: {username: '', sessionID: null, userRole: [] },
  },
  mutations: {
    setSessionID (state, sessionID) {
      state.user.sessionID = sessionID;
    },
    setUsername (state, username) {
      state.user.username = username;
    },
    setUserRole (state, userRole) {
      state.user.userRole = userRole;
    },
    logoutUser(state){
      state.user.sessionID = null;
      state.user.username = '';
      state.user.userRole = [];

    }
  }
})
