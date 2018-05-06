// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'

// font awesome icons
import 'vue-awesome/icons/star'
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/chevron-right'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

// 
Vue.config.productionTip = false

//vue moment
Vue.use(require('vue-moment'));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
