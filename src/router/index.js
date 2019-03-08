import Vue from 'vue'
import Router from 'vue-router'
import SysUploadImage from '@/components/sysUpIm.vue'
import holderBase from '@/components/holderBase.vue'
import sagaBase from '@/components/sagaBase.vue'
import mediaPlayer from '@/components/mediaPlayer.vue'
import StreamingMainPage from '@/components/streamingMain.vue'
import PersonajeBase from '@/components/personajeBase.vue'
import MainLogin from '@/components/login/mainLogin.vue'
import { store } from '../store'
// Profile
import Configuration from '@/components/profile/configuration.vue'

import firebase from 'firebase'
import AuthGuard from './auth-guard'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Main page',
      component: StreamingMainPage
    },
    {
      path: '/uploadImageContent',
      name: 'Upload Image',
      component: SysUploadImage
    },
    {
      path: '/sagas/:urlSaga',
      name: 'Selected Saga',
      component: sagaBase
    },
    {
      path: '/sagas/:urlSaga/:urlHolder',
      name: 'Holder',
      component: holderBase
    },
    {
      path: '/sagas/:urlSaga/:urlHolder/:urlContenido/:nPagina',
      name: 'Media player',
      component: mediaPlayer
    },
    {
      path: '/characters/:urlChar',
      name: 'Character information',
      component: PersonajeBase
    },
    {
      path: '/login',
      name: 'Login',
      component: MainLogin,
      beforeEnter: (to, from, next) => {
        if (store.getters.getUserData.id) {
            console.log("si hay user")
            next ('/')
        } else {
            console.log("no hay user")
            next()
        }
      }
    },
    {
      path: '/profileConfiguration',
      name: 'Configuration',
      component: Configuration,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})


export default router
