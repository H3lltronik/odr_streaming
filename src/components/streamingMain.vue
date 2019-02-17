<template>
  <v-container grid-list-xs>
    <v-layout row wrap justify-center>
      <v-flex xs10>
        <v-layout column>
          <v-flex xs12>
            <div class="title black--text font-weight-light my-2">Sagas</div>
            <v-layout row wrap text-sm-center justify-center="" v-if="sagasLength >= 0">
              <v-img height="160" max-width="200" v-for="aux in 6" :key="aux" class="mr-3 boxContent"
              @click="goToSaga (sagas[aux-1].idSaga)"
              :src="sagas[aux-1].thumbnailSaga">
                <v-layout row wrap fill-height align-end>
                  <div style="background-color: rgba(0, 0, 0, 0.5); width: 100%;">
                    <div class="title white--text font-weight-bold ml-2">
                      {{sagas[aux-1].tituloSaga}}
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
    }
  },
  created () {
    if (this.sagasLength === 0) {
      this.$store.dispatch('loadSagasInfo')
    }
  },
  methods: {
    goToSaga (idSaga) {
      if (idSaga !== '')
        this.$router.push("sagas/" + idSaga)
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
    }
  }
}
</script>

<style lang="">
  .boxContent {
    border-radius: 5px;
    cursor: pointer;
  }
</style>