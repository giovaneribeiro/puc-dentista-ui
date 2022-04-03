import Vue from 'vue'
import VueCurrencyFilter from 'vue-currency-filter'

Vue.use(VueCurrencyFilter, {
  symbol: 'R$',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})
