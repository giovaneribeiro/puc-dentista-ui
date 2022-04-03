import Vue from 'vue'
import Vuex from 'vuex'

import snackbar from '@/store/modules/snackbar'
import auth from '@/store/modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { snackbar, auth }
})
