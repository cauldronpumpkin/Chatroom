import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createProvider } from './vue-apollo'
import vuetify from './plugins/vuetify';
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  apolloProvider: createProvider(),
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
