import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.axios = axios

Vue.config.productionTip = false

Vue.filter('setImg',(url) => {
  return url.replace('w.h/','') + '@1l_1e_1c_128w_180h'
})
Vue.filter('setDetailImg',(url) => {
  return url.replace('w.h/','') + '@300w_414h_80q_1e_1c'
})

import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller)

import Loading from '@/components/Loading'
Vue.component('Loading',Loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
