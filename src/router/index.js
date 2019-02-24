import Vue from 'vue'
import Router from 'vue-router'
import SysUploadImage from '@/components/sysUpIm.vue'
import holderBase from '@/components/holderBase.vue'
import sagaBase from '@/components/sagaBase.vue'
import mediaPlayer from '@/components/mediaPlayer.vue'
import StreamingMainPage from '@/components/streamingMain.vue'
import PersonajeBase from '@/components/personajeBase.vue'

Vue.use(Router)

export default new Router({
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
      path: '/sagas/:idSaga',
      name: 'Selected Saga',
      component: sagaBase
    },
    {
      path: '/sagas/:idSaga/:idHolder',
      name: 'Holder',
      component: holderBase
    },
    {
      path: '/sagas/:idSaga/:idHolder/:idScan/:nPagina',
      name: 'Media player',
      component: mediaPlayer
    },
    {
      path: '/characters/:idCharacter',
      name: 'Character information',
      component: PersonajeBase 
    }
  ],
  mode: 'history'
})
