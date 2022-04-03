// import axios from 'axios'

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
      // TODO: realizar chamada backend
      // const response = await axios.post('https://rh-liax.herokuapp.com/rh/api/auth/api/login', user)
      // await dispatch('attempt', response.data.token)
      await dispatch('attempt', 'TOKEN')
    },
    async attempt ({ commit, state }, token) {
      if (token) {
        commit('SET_TOKEN', token)
      }

      if (!state.token) {
        return
      }

      try {
        // TODO: realizar chamada backend
        // const response = await axios.get('https://rh-liax.herokuapp.com/rh/api/auth/api/auth/getUserInfoByToken?token=' + token)
        // commit('SET_USER', response.data)
        commit('SET_USER', { name: 'Giovane Ribeiro', cnes: '12313-BA', permissions: ['NIVEL_2'] })
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
