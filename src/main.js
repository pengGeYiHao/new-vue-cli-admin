import Vue from 'vue'
import ElementUI from 'element-ui'
import { sync } from 'vuex-router-sync'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import ViserVue from 'viser-vue'
import '../theme/index.css'
// import App from './App.vue'
import App from './app.js'
import router from './router'
import store from './store/index.js'

sync(store.store,router)

Vue.use(ElementUI)
Vue.use(ViserVue)
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store: store.store,
  render: h => h(App)
}).$mount('#app')
