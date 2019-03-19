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
                          item-text="TituloSaga"
                          v-model="newHolder.saga"
                          return-object
                          label="Saga">
                        </v-select>
                    </v-flex>
                    <v-flex xs12 lg6 class="pl-1">
                        <v-select
                            :items="loadedCategorys"
                            item-text="NombreCategoria"
                            v-model="newHolder.category"
                            return-object
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
                    <!-- Select de tags  -->
                    <!--------------  -------------->
                    <v-flex xs12 class="pb-3">
                        <v-select
                            :items="tags"
                            item-text="NombreTag"
                            v-model="newHolder.tags"
                            return-object
                            label="Tags"
                            multiple
                            chips>
                        </v-select>
                    </v-flex>

                    <v-flex xs12>
                      <v-layout row wrap fill-height align-center style="margin-top: -20px;">
                        <v-flex xs4 md3>
                          <v-subheader>Holder characters</v-subheader>
                        </v-flex>
                        <v-flex xs8 md9>
                          <v-divider></v-divider>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <!-- Autocomplete de personajes  -->
                    <v-flex xs12>
                      <v-layout row wrap justify-space-between fill-height align-center>
                        <v-flex xs12 lg10>
                          <v-autocomplete :items="characters" item-text="name" v-model="selectedChar"
                            return-object single-line prepend-icon="face">
                            <!-- Este slot personaliza la forma en la que se muestran en la barra -->
                            <template slot="selection" slot-scope="data">
                              <v-layout row wrap fill-height align-center>
                                <v-flex xs1>
                                  <v-avatar size="25px">
                                    <img :src="data.item.thumbnail"/>
                                  </v-avatar>
                                </v-flex>
                                <v-flex xs10 class='pl-1'>
                                  {{data.item.name}}
                                </v-flex>
                              </v-layout>
                            </template>
                            <!-- Este slot personaliza los items del select -->
                            <!-- Aparentemente el slot-scope="data" me da acceso a la info del slot item -->
                            <template slot="item" slot-scope="data">
                              <v-list-tile-avatar tile>
                                <img :src="data.item.thumbnail" />
                              </v-list-tile-avatar>
                              <v-list-tile-content>
                                <v-list-tile-title>
                                  {{data.item.name}}
                                </v-list-tile-title>
                              </v-list-tile-content>
                            </template>

                          </v-autocomplete>
                        </v-flex>
                        <v-flex xs12 lg1>
                          <v-btn color="success" fab small flat @click="addNewCharList">
                            <v-icon>add</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <!-- Aca se muestran los personajes que ya se hayan elegido -->
                    <!-- Separador -->
                    <v-flex xs12 v-if="allSelectedChar.length > 0">
                      <v-layout row wrap fill-height align-center style="margin: -10px 0 -10px 0;">
                        <v-flex xs4 md3>
                          <v-subheader>Selected characters</v-subheader>
                        </v-flex>
                        <v-flex xs8 md9>
                          <v-divider></v-divider>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12>
                      <v-list>
                        <v-list-tile avatar v-for="(aux, index) in allSelectedChar" :key="index">
                          <v-layout row wrap style="background-color: rgba(0,0,0,0.2)">
                            <v-flex xs1>
                              <v-list-tile-avatar>
                                <img :src="aux.thumbnail">
                              </v-list-tile-avatar>
                            </v-flex>
                            <v-flex xs5>
                              <v-list-tile-content>
                                <v-list-tile-title>{{ aux.name }}</v-list-tile-title>
                              </v-list-tile-content>
                            </v-flex>
                            <v-spacer></v-spacer>
                            <v-list-tile-action>
                              <v-btn color="red" small fab flat @click="remFromSelected (aux)">
                                <v-icon>remove</v-icon>
                              </v-btn>
                            </v-list-tile-action>
                          </v-layout>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                    <v-flex xs12>
                      <create-character-dialog></create-character-dialog>
                    </v-flex>
                    <v-flex xs12>
                      <v-layout row wrap fill-height align-center style="margin-top: -10px;">
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
                                                  <v-chip class="ml-1" :small="xsOnly">{{ newHolder.category.NombreCategoria }}</v-chip>
                                              </v-layout>
                                          </v-flex>
                                          <v-flex xs12 class="mt-1">
                                              <v-layout row wrap align-center>
                                                  <div class="body-1 font-weight-medium">Tags:</div>
                                                  <v-chip class="" :small="xsOnly" v-for="(aux, index) in newHolder.tags" :key="index">
                                                      {{aux.NombreTag}}
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
                    <v-btn color="success" block @click="saveHolder" :loading="loading">CREATE HOLDER</v-btn>
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
          category: {},
          saga: {},
          tags: [],
          coverPic: 'https://homuapp.000webhostapp.com/Imagenes/24-11-2018-14-54-14.jpg'
        },
        characters: [],
        selectedChar: {},
        allSelectedChar: [],
        loading: false,
      }
    },
    created () {
      this.loadCharacters ()
      this.$store.dispatch('loadSagasInfo')
      this.$store.dispatch('loadCategorys')
      this.$store.dispatch('loadTags')
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
      },
      saveHolder () {
        this.loading = true
        let allSelectedCharIds = []
        this.allSelectedChar.forEach(element => {
          allSelectedCharIds.push(element.idCharacter)
        });

          let bodyFormData = new FormData()
          bodyFormData.set('idSaga', this.newHolder.saga.IdSaga)
          bodyFormData.set('titleHolder', this.newHolder.title)
          bodyFormData.set('descriptionHolder', this.newHolder.description)
          bodyFormData.set('category', this.newHolder.category.IdCategoria)
          bodyFormData.set('nomCategory', this.newHolder.category.NombreCategoria)
          bodyFormData.set('thumbnail', this.removeBase64Headers(this.newHolder.coverPic))
          bodyFormData.set('idChar', JSON.stringify(allSelectedCharIds))
          bodyFormData.set('tags', JSON.stringify(this.newHolder.tags))

          console.log("newHolder", this.newHolder)
          this.axios.post('http://localhost/Odr/connections/streamingContent/creating/createHolder.php', bodyFormData).then(response => {
              console.log(response)
              this.loading = false
              if (response.data.status == "OK")
                alert('Se ha insertado el holder correctamente')
              else {
                alert('Ha ocurrido un error insertando el holder')
              }
          }).catch(error => {
            this.loading = false
            console.log(error)
          })
      },
      removeBase64Headers (base64) {
          return base64.substr(base64.indexOf(',') + 1)
      },
      loadCharacters () {
        this.axios.post('http://localhost/Odr/connections/streamingContent/creating/getAllCharacters.php').then(response => {
              console.log(response)
              response.data.forEach(element => {
                this.characters.push({
                  thumbnail: 'http://localhost/Odr/Characters/' + element.URLPersonaje + "/profile.jpg",
                  idCharacter: element.IdPersonaje,
                  name: element.NombrePersonaje
                })
              });
              console.log("Characters", this.characters)
          })
      },
      // Añadir el personaje seleccionado a un arreglo donde estararn todos los seleccionados
      addNewCharList () {
        let auxChar = this.allSelectedChar.find(aux => aux === this.selectedChar)
        if (auxChar) {
          console.log("Ya elegiste a este, wey")  
        } else {
          this.allSelectedChar.push(this.selectedChar)
        }
        console.log("Selected:",this.selectedChar)
      },
      // Quitar un personaje del arreglo donde estan todos los seleccionados
      remFromSelected (character) {
        this.allSelectedChar.splice(this.allSelectedChar.indexOf(character), 1)
      }
    },
    computed: {
      loadedSagas () {
        let aux = this.$store.getters.getSagas
        console.log("SAGAS?", aux)
        if (aux.length > 0) {
            let result = []
            aux.forEach(element => {
                result.push({IdSaga: element.IdSaga, TituloSaga: element.TituloSaga})
            });
            return result
        }
        else{
            return aux
        }
      },
      loadedCategorys () {
          let aux = this.$store.getters.getCategorys
          console.log("CATEGORYS?", aux)
        if (aux.length > 0) {
            let result = []
            aux.forEach(element => {
                result.push(element)
            });
            return result
        }
        else{
            return aux
        }
      },
      tags () {
        let aux = this.$store.getters.getTags
        if (aux.length > 0) {
          return aux
        } else {
          return []
        }
      }
    }
  }
</script>

<style>

</style>
