export default {
  state: {
    visible: false,
    type: null,
    message: null,
    multiline: false
  },
  mutations: {
    showSnackbar (state, { type, message }) {
      state.visible = true
      state.type = type
      state.message = message
      state.multiline = message.length > 100
    },
    closeSnackbar (state) {
      state.visible = false
      state.type = null
      state.message = null
      state.multiline = false
    },
    showError (state, { error, message }) {
      let type = 'error'

      if (message === undefined) {
        message = 'Houve um problema ao realizar esta ação.'
      }

      message += ' Favor contatar o suporte técnico'

      if (error.response !== undefined && error.response.status < 500 && error.response.data.message !== undefined) {
        type = 'warning'
        message = error.response.data.message
      }

      state.visible = true
      state.type = type
      state.message = message
      state.multiline = message.length > 100
    }
  }
}
