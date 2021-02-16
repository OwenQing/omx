import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

// UI 框架
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  // 初始化 Vuetify
  vuetify: new Vuetify(),
  template: '<App/>'
}).$mount('#app')
