import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
import '@/plugins/axios'
import '@/plugins/moment'
import '@/plugins/mask'
import '@/plugins/currency'
import '@/plugins/authorization'

require('@/store/modules/subscriber')

Vue.config.productionTip = false

store.dispatch('attempt', localStorage.getItem('token') || '').then(() => {
  new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
