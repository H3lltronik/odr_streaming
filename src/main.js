// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { store } from './store'

import 'vuetify/dist/vuetify.min.css'

//Importar componentes
import contentTabItem from './components/contentTabItem.vue'
import CreateHolderDialog from './components/dialogs/createHolder.vue'

//Implementar componentes
Vue.component('content-tab-item', contentTabItem)
Vue.component('create-holder-dialog', CreateHolderDialog)

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

Vue.use(Vuetify, { theme: {
  primary: '#53435c',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107',
  skin: '#f2d5c0',
  gem: '#482648',
  darkergem: '#1a1325',
  clothing: '#e3d0db',
  blush: '#e5b1c1'
}})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
