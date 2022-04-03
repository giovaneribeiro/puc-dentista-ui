import axios from 'axios'

export default {
  state: {
    token: null,
    user: null
  },
  getters: {
    isAuth: (state) => !!state.token && !!state.user,
    user: (state) => state.user
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USER (state, user) {
      state.user = user
    }
  },
  actions: {
    async signIn ({ dispatch }, user) {
      const response = await axios.post('https://puc-dentista-api.herokuapp.com/api/usuario/login', user)
      await dispatch('attempt', response.data.token)
    },
    async attempt ({ commit, state }, token) {
      if (token) {
        commit('SET_TOKEN', token)
      }

      if (!state.token) {
        return
      }

      try {
        const response = await axios.get('https://puc-dentista-api.herokuapp.com/api/usuario/' + token)
        commit('SET_USER', response.data)
      } catch (error) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      }
    },
    signOut ({ commit }) {
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
    }
  }
}
