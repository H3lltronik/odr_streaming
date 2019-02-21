<template>
  <v-dialog
    v-model="dialog" persistent
        scrollable max-width="800px" transition="dialog-transition">
    <v-btn color="info" flat outline block slot="activator">CREATE SAGA</v-btn>
    <v-card>
      <v-card-title primary-title>
        <v-layout row wrap style="margin-bottom: -20px;">
          <v-flex xs12>
            <v-layout row wrap justify-space-between fill-height align-center>
              <div class="headline">Create Saga</div>
              <v-btn color="red" small fab flat @click="dialog = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-layout row wrap >
          <v-flex xs12>
            <v-layout row wrap fill-height align-center style="margin-top: -20px;">
              <v-flex xs4 md2>
                <v-subheader>Saga title</v-subheader>
              </v-flex>
              <v-flex xs8 md10>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              box
              label="Title saga"
              v-model="newSaga.title"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap fill-height align-center style="margin-top: -20px;">
              <v-flex xs5 md2>
                <v-subheader>Saga images</v-subheader>
              </v-flex>
              <v-flex xs7 md10>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 md6>
            <v-btn color="gem" class="white--text" block flat outline @click="onCoverSelect">SELECT COVER</v-btn>
            <input type="file" ref="coverFileInput" style="display: none;" accept="image/*" @change="onCoverPicked">
          </v-flex>
          <v-flex xs12 md6>
            <v-btn color="gem" class="white--text" block flat outline @click="onBGSelect">SELECT BACKGROUND</v-btn>
            <input type="file" ref="bgFileInput" style="display: none;" accept="image/*" @change="onBGPicked">
          </v-flex>
          <v-flex xs12>
            <!-- Parte del preview de la saga -->
            <v-card>
              <v-layout row wrap class justify-center>
                  <v-flex xs12>
                      <v-img
                      :src="newSaga.bgPic"
                      max-height="450" style="min-height: 240px;" ref="imagen">
                      <!--  -->
                      <v-layout row wrap justify-center fill-height align-end>
                          <v-flex xs12>
                              <v-layout row wrap>
                                  <v-flex xs12>
                                      <v-layout row wrap justify-center fill-height align-end>
                                          <v-flex xs6 sm4 md4 xl4>
                                              <v-card class="pa-2">
                                                  <v-layout row wrap>
                                                      <v-flex xs12>
                                                          <v-img contain
                                                              :src="newSaga.coverPic">
                                                          </v-img>
                                                      </v-flex>
                                                  </v-layout>
                                              </v-card>
                                          </v-flex>
                                      </v-layout>
                                  </v-flex>
                                  <v-flex xs12 style="margin-bottom: -5px; margin-top: -5px;">
                                      <v-layout row wrap justify-center fill-height align-end text-xs-center>
                                          <v-flex xs12 md4 lg10>
                                              <v-card>
                                                  <div :class="{'headline': !$vuetify.breakpoint.xsOnly, 'subheading': $vuetify.breakpoint.xsOnly}">
                                                      {{ newSaga.title }}
                                                  </div>
                                              </v-card>
                                          </v-flex>
                                      </v-layout>
                                  </v-flex>
                              </v-layout>
                          </v-flex>
                      </v-layout>
                      </v-img>
                  </v-flex>
              </v-layout>
          </v-card>
          </v-flex>
          <v-flex xs12>
            <v-btn color="success" block @click="saveHolder">CREATE HOLDER</v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      newSaga: {
        title: 'Titulo Vacio',
        coverPic: 'http://localhost/Odr/resources/55225.jpg',
        bgPic: 'http://localhost/Odr/resources/15-1-2019-2-20-45.jpg'
      }
    }
  },
  methods: {
    onCoverSelect () {
      this.$refs.coverFileInput.click()
    },
    onBGSelect () {
      this.$refs.bgFileInput.click()
    },
    onBGPicked (event) {
      var files = event.target.files
        for(let i = 0; i < files.length; i++) {
            let fileReader = new FileReader ()

            fileReader.addEventListener ('load', () => {
                //Metodo asincrono?
                //Cuando termine se ejecuta esto, si es asincrono
                let result = fileReader.result
                this.changeBG (result)
            })
            //Se ejecuta esto y cuando termine...
            fileReader.readAsDataURL(files[i])
        }
    },
    onCoverPicked (event) {
        var files = event.target.files
        for(let i = 0; i < files.length; i++) {
            let fileReader = new FileReader ()

            fileReader.addEventListener ('load', () => {
                //Metodo asincrono?
                //Cuando termine se ejecuta esto, si es asincrono
                let result = fileReader.result
                this.changeCover (result)
            })
            //Se ejecuta esto y cuando termine...
            fileReader.readAsDataURL(files[i])
        }
    },
    changeCover (src) {
      this.newSaga.coverPic = src
    },
    changeBG (src) {
      this.newSaga.bgPic = src
    },
    saveHolder () {
        let bodyFormData = new FormData()
        bodyFormData.set('tituloSaga', this.newSaga.title)
        bodyFormData.set('coverPic', this.removeBase64Headers(this.newSaga.coverPic))
        bodyFormData.set('bgPic', this.removeBase64Headers(this.newSaga.bgPic))

        this.axios.post('http://localhost/Odr/connections/createSaga.php', bodyFormData).then(response => {
            console.log(response)
        })
    },
    removeBase64Headers (base64) {
        return base64.substr(base64.indexOf(',') + 1)
    }
  }
}
</script>

<style>

</style>
