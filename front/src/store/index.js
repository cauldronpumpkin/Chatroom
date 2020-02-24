import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: ""
  },
  getters: {
    user(state) {
      return state.name;
    }
  },
  mutations: {
    CHANGE_NAME(state, payload) {
      state.name = payload;
    }
  },
  actions: {
    changeName({commit}, payload) {
      commit('CHANGE_NAME', payload);
    }
  },
  modules: {
  }
})
