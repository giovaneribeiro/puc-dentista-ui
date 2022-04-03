import Vue from 'vue'
import axios from 'axios'

Vue.use({
  install (Vue) {
    Vue.prototype.$http = axios.create({
      baseURL: (process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BACKEND_URL : '') + '/',
      headers: {
        'Content-type': 'application/json'
      }
    })
  }
})
