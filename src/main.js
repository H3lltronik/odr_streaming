// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { store } from './store'
import * as firebase from 'firebase'
import moment from 'moment'

import 'vuetify/dist/vuetify.min.css'

//Importar componentes
import contentTabItem from './components/contentTabItem.vue'
import CreateHolderDialog from './components/dialogs/createHolder.vue'
import CreateSagaDialog from './components/dialogs/createSaga.vue'
import CreateCharacterDialog from './components/dialogs/createCharacter.vue'
import ImagesInformation from './components/uploadContent/components/imagesInfo.vue'
import ImagesSelector from './components/uploadContent/components/imagesSelector.vue'

import SelectImage from './components/common/selectImage.vue'
import './registerServiceWorker'

//Implementar componentes
Vue.component('content-tab-item', contentTabItem)
Vue.component('create-holder-dialog', CreateHolderDialog)
Vue.component('create-saga-dialog', CreateSagaDialog)
Vue.component('create-character-dialog', CreateCharacterDialog)
Vue.component('select-image', SelectImage)
Vue.component('images-selector-carousel', ImagesSelector)
Vue.component('images-information', ImagesInformation)

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.prototype.moment = moment

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

firebase.initializeApp({
  apiKey: "AIzaSyCt8KOVPcyBES6-vVSBIZQgedl7fBPfR_w",
  authDomain: "odr-streaming.firebaseapp.com",
  databaseURL: "https://odr-streaming.firebaseio.com",
  projectId: "odr-streaming",
  storageBucket: "odr-streaming.appspot.com",
  messagingSenderId: "50680997374"
});

firebase.auth().onAuthStateChanged(user => {
  /* eslint-disable no-new */
  if (user){
    console.log("el user we")
    store.dispatch('autoSignIn', user)
  } else {
    console.log("No u,u")
    store.dispatch('autoSignIn', null)
  }
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    mounted () {

    }
  })


})



