<template>
    <v-dialog
        v-model="dialog" persistent
        scrollable max-width="800px" transition="dialog-transition">
        <v-btn color="info" flat outline block slot="activator">
            CREATE HOLDER
        </v-btn>
        <v-card>
            <v-card-title primary-title>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-layout row wrap fill-height align-center>
                            <div class="headline">Create a Holder</div>
                            <v-spacer></v-spacer>
                            <v-btn color="red" fab flat small @click="dialog = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-layout>
                    </v-flex>
                    <v-flex xs12>
                        <v-divider class="mt-2" style="margin-bottom: -10px;"></v-divider>
                    </v-flex>
                </v-layout>
            </v-card-title>
            <v-card-text style="margin-top: -10px;">
                <v-layout row wrap justify-center>
                    <v-flex xs12>
                      <v-layout row wrap fill-height align-center style="margin-top: -10px;">
                        <v-flex xs5 md3>
                          <v-subheader>Holder connection</v-subheader>
                        </v-flex>
                        <v-flex xs7 md9>
                          <v-divider></v-divider>
                        </v-flex>
                      </v-layout>
                    </v-flex>

                    <v-flex xs12 lg6 class="pr-1">
                        <v-select
                          :items="loadedSagas"
                          item-text="tituloSaga"
                          label="Saga">
                        </v-select>
                    </v-flex>
                    <v-flex xs12 lg6 class="pl-1">
                        <v-select

                            label="Category">
                        </v-select>
                    </v-flex>
                    <v-flex xs12>
                      <v-layout row wrap fill-height align-center style="margin-top: -20px;">
                        <v-flex xs4 md3>
                          <v-subheader>Holder information</v-subheader>
                        </v-flex>
                        <v-flex xs8 md9>
                          <v-divider></v-divider>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field box name="name" id="id" label="Titulo del Holder" v-model="newHolder.title">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-textarea box name="name" id="id" label="Descripcion del Holder" v-model="newHolder.description">
                        </v-textarea>
                    </v-flex>
                    <v-flex xs12>
                      <v-layout row wrap fill-height align-center style="margin-top: -20px;">
                        <v-flex xs4 md2>
                          <v-subheader>Holder cover</v-subheader>
                        </v-flex>
                        <v-flex xs8 md10>
                          <v-divider></v-divider>
                        </v-flex>
                      </v-layout>
                    </v-flex>

                    <v-flex xs12>
                        <v-btn block color="gem" flat outline class="white--text" @click="onCoverSelect">Select Cover</v-btn>
                        <input type="file" ref="coverFileInput" style="display: none;" accept="image/*" @change="onCoverPicked">

                        <v-card class="py-5 vCardStyle elevation-10 mt-4">
                          <v-layout row wrap :justify-center="smAndDown" text-xs-center>
                              <v-flex xs10 sm10 md4>
                                  <v-img contain max-height="500" :class="{'mx-5' : !xsOnly}"
                                  :src="newHolder.coverPic"></v-img>
                              </v-flex>
                              <v-flex xs10 md7 >
                                  <v-layout row wrap :justify-center="smAndDown" :class="{'mt-4' : xsOnly}">
                                      <div :class="{'headline': !xsOnly, 'title': xsOnly}">
                                          {{ newHolder.title }}</div>
                                  </v-layout>
                                  <v-divider class="mt-2 mb-1" style="background: #000"></v-divider>
                                  <v-layout row wrap align-center>
                                          <v-flex xs12 class="mt-1">
                                              <v-layout row wrap align-center>
                                                  <div class="body-1 font-weight-medium" >Type: </div>
                                                  <v-chip class="ml-1" :small="xsOnly">XD</v-chip>
                                              </v-layout>
                                          </v-flex>
                                          <v-flex xs12 class="mt-1">
                                              <v-layout row wrap align-center>
                                                  <div class="body-1 font-weight-medium">Tags:</div>
                                                  <v-chip class="" :small="xsOnly" v-for="(aux, index) in 4" :key="index">
                                                      XD
                                                  </v-chip>
                                              </v-layout>
                                          </v-flex>
                                          <v-flex xs12 class="mt-1">
                                              <v-layout row wrap align-center>
                                                  <div class="body-1 font-weight-medium mr-1">Description: </div>
                                                  <div class="body-1"> {{ newHolder.description }} </div>
                                              </v-layout>
                                          </v-flex>
                                  </v-layout>
                              </v-flex>
                          </v-layout>
                      </v-card>
                    </v-flex>


                    <v-flex xs12>
                        <v-divider class="my-2"></v-divider>
                    </v-flex>
                    <v-btn color="success" block>CREATE HOLDER</v-btn>
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
        xsOnly: this.$vuetify.breakpoint.xsOnly,
        smAndDown: this.$vuetify.breakpoint.smAndDown,
        newHolder: {
          title: 'Titulo vacio',
          description: 'Descripcion vacia',
          coverPic: 'https://homuapp.000webhostapp.com/Imagenes/24-11-2018-14-54-14.jpg'
        }
      }
    },
    methods: {
      onCoverSelect () {
        this.$refs.coverFileInput.click()
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
        this.newHolder.coverPic = src
      }
    },
    computed: {
      loadedSagas () {
        let aux = this.$store.getters.getSagaData
        console.log(aux.sagas)
        if (aux !== undefined)
          return this.$store.getters.getSagaData.sagas
        else
          return aux
      }
    }
  }
</script>

<style>

</style>
