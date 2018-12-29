// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import store from './store'
import router from './router'
import VueLazyload from 'vue-lazyload'
import 'babel-polyfill'
import axios from 'axios'
import style from './static/stylePublic.css'
import 'mint-ui/lib/style.css'
import './assets/iconfont.css'

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.prototype.axios = axios
window.eventBus = new Vue();

Vue.use(VueLazyload, {
  loading: require('./assets/lazyload/lazyload.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
