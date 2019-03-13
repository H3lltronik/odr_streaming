<template>
  <v-container grid-list-xs v-resize="onResize">
    <v-layout row wrap justify-center>
      <v-flex xs12 md11>
        <v-layout column>
          <v-flex xs12>
            <div class="title black--text font-weight-light my-2">Sagas</div>
            <v-layout row text-xs-center :justify-center="0"
              class="verticalSlider" v-if="sagasLength >= 0">
              <v-img :height="sagaItemHeight" :width="sagaItemWidth" max-width="300"
              v-for="aux in sagaItems" :key="aux" class="mr-3 boxContent"
              @click="goToSaga (sagas[aux-1].URLSaga)"
              :src="sagas[aux-1].ThumbnailSaga">
                <v-layout row wrap fill-height align-end>
                  <div style="background-color: rgba(0, 0, 0, 0.5); width: 100%;">
                    <div class="title white--text font-weight-bold ml-2">
                      {{sagas[aux-1].TituloSaga}}
                    </div>
                  </div>
                </v-layout>
              </v-img>
            </v-layout>
            <v-btn color="primary" flat class="mt-3">Mostrar Mas</v-btn>
            <v-divider class="my-2 "></v-divider>
          </v-flex>

        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      xsOnly: this.$vuetify.breakpoint.xsOnly,
      // Elementos del scroll horizontal donde se muestran las sagas
      sagaItemWidth: 200,
      sagaItemHeight: 160,
      sagaItems: 6,
      windowSize: {
        x: 0,
        y: 0
      },
    }
  },
  created () {
    if (this.sagasLength === 0) {
      this.$store.dispatch('loadSagasInfo')
    }
  },
  methods: {
    goToSaga (URLSaga) {
      if (URLSaga !== '')
        this.$router.push("sagas/" + URLSaga)
    },
    //Para obtener las medidas de la ventana
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    }
    },
  computed: {
    sagasLength () {
      return this.$store.getters.getSagas.length
    },
    sagas () {
      let aux = []
      for (let i = 0; i < 6; i++){
        aux.push({
          tituloSaga: "",
          idSaga: "",
          thumbnailSaga: "",
          backgroundSaga: ""
        })
      }
      let loadedArray = this.$store.getters.getSagas
      if (this.sagasLength > 0){
        for (let i = 0; i < this.sagasLength; i++){
          aux[i] = {...loadedArray[i]}
          console.log(aux)
        }
        return aux
      }else{
        return aux
      }
    },
    // Si el tamaño de la ventana es menor al del total del tamaño de todas las sagas
    sagasJustifyCenter () {
      // el tamaño del horizontal slide es de flex10 asi que al tamaño del windows.x se le resta
      // flex2
      let flex1 = (this.windowSize.x / 12)
      let sagaSlide = (this.windowSize.x - (flex1*2))
      if (sagaSlide < (this.sagaItems * this.sagaItemWidth)) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {

  }
}
</script>

<style>
  .boxContent {
    border-radius: 5px;
    cursor: pointer;
  }

  .verticalSlider {
    overflow-x: auto;
    overflow-y: hidden;
  }
</style>
