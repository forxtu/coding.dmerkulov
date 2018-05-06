// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import * as icons from './icons'

// 
Vue.config.productionTip = false

//vue moment
Vue.use(require('vue-moment'));

// vue social sharing
var SocialSharing = require('vue-social-sharing');
Vue.use(SocialSharing);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
