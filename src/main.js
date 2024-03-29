import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify';
Vue.prototype.$axios = axios
Vue.config.productionTip = false
window.axios= axios
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
