import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/base.css'
import './styles/theme.css'
import './styles/responsive.css'

Vue.config.productionTip = false

Vue.prototype.$message = {
  success: (msg) => window.alert(`✅ ${msg}`),
  error: (msg) => window.alert(`❌ ${msg}`),
  warning: (msg) => window.alert(`⚠️ ${msg}`)
}
Vue.prototype.$notify = Vue.prototype.$message
Vue.prototype.$confirm = (msg) => Promise.resolve(window.confirm(msg))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
