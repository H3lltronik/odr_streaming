<template>
    <v-container grid-list-xs>
        <v-layout row wrap justify-center>
            <v-flex xs12 md10>
                <v-card>
                    <v-container grid-list-xs>
                        <v-layout row wrap text-sm-center justify-space-between>
                            <v-flex xs12 md6>
                                <v-layout row wrap justify-center>
                                    <div class="headline">Content Information</div>
                                    <v-flex xs12>
                                        <v-container grid-list-xs style="max-height: 70vh" class="scroll-y">
                                            <v-layout column>
                                                <!-- Formulario de subida de imagenes -->
                                                <form class="mt-2">
                                                    <!-- Separacion -->
                                                    <v-layout row justify-center>
                                                        <v-subheader>Content type</v-subheader>
                                                        <v-divider class="my-4"></v-divider>
                                                    </v-layout>
                                                    <v-flex xs12>
                                                        <v-radio-group v-model="contentType" row>
                                                            <v-layout row wrap fill-height align-center justify-space-between>
                                                                <v-radio label="label" value="0" >
                                                                    <div slot="label">Image</div>
                                                                </v-radio>
                                                                <v-radio label="label" value="1">
                                                                    <div slot="label">Video</div>
                                                                </v-radio>
                                                                <v-radio label="label" value="2">
                                                                    <div slot="label">Music</div>
                                                                </v-radio>
                                                            </v-layout>
                                                        </v-radio-group>
                                                    </v-flex>
                                                    <!-- Separacion -->
                                                    <v-layout row justify-center>
                                                        <v-subheader>Saga selector</v-subheader>
                                                        <v-divider class="my-4"></v-divider>
                                                    </v-layout>
                                                    <v-layout row wrap justify-space-between="">
                                                        <v-flex xs12 lg7 xl8>
                                                            <v-select
                                                                :items="loadedData.sagas"
                                                                item-text="tituloSaga"
                                                                v-model="newBook.saga"
                                                                label="Sagas"
                                                                single-line
                                                                box
                                                                return-object
                                                            ></v-select>
                                                        </v-flex>
                                                        <v-flex xs12 lg4 xl4>
                                                          <v-layout row wrap justify-center>
                                                            <create-saga-dialog></create-saga-dialog>
                                                          </v-layout>
                                                        </v-flex>
                                                    </v-layout>
                                                    <!-- Separacion -->
                                                    <v-layout row justify-center>
                                                        <v-subheader>Holder selector</v-subheader>
                                                        <v-divider class="my-4"></v-divider>
                                                    </v-layout>
                                                    <v-layout row wrap justify-space-between="">
                                                        <v-flex xs12 md6 lg7 xl8>
                                                            <v-select
                                                                :items="loadedData.holders"
                                                                item-text="titleHolder"
                                                                v-model="newBook.holder"
                                                                label="Holder"
                                                                single-line
                                                                box
                                                                return-object
                                                            ></v-select>
                                                        </v-flex>
                                                        <v-flex xs12 md5 lg4 xl4>
                                                            <v-layout row wrap justify-center>
                                                              <create-holder-dialog></create-holder-dialog>
                                                            </v-layout>
                                                        </v-flex>
                                                    </v-layout>
                                                    <!-- Separacion -->
                                                    <v-layout row justify-center>
                                                        <v-subheader>Book Data</v-subheader>
                                                        <v-divider class="my-4"></v-divider>
                                                    </v-layout>
                                                    <v-text-field
                                                        name="bookTitle"
                                                        label="Titulo del articulo"
                                                        v-model="newBook.title"
                                                        id="bookTitle"
                                                        box
                                                        required>
                                                        </v-text-field>
                                                    <v-textarea
                                                        name="bookDescription"
                                                        label="Descripcion del articulo"
                                                        id="bookDescription"
                                                        v-model="newBook.description"
                                                        box
                                                        required>
                                                    </v-textarea>
                                                    <v-layout row wrap>
                                                        <v-flex xs12>
                                                            <v-select
                                                                :items="loadedData.genres"
                                                                v-model="newBook.genres"
                                                                label="Genero"
                                                                box
                                                                multiple
                                                                chips
                                                                persistent-hint>
                                                            </v-select>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            <v-select
                                                                :items="loadedData.categorys"
                                                                v-model="newBook.category"
                                                                label="Categoria"
                                                                box
                                                            ></v-select>
                                                        </v-flex>
                                                    </v-layout>
                                                    <!-- Separacion -->
                                                    <v-layout row justify-center>
                                                        <v-subheader>Additional Information</v-subheader>
                                                        <v-divider class="my-4"></v-divider>
                                                    </v-layout>
                                                    <!-- Separacion -->
                                                    <v-layout row justify-center>
                                                        <v-subheader>Images Upload</v-subheader>
                                                        <v-divider class="my-4"></v-divider>
                                                    </v-layout>
                                                </form>
                                            </v-layout>
                                        </v-container>
                                    </v-flex>
                                </v-layout>
                                <v-divider></v-divider>
                            </v-flex>
                            <v-divider class="hidden-xs-only" vertical></v-divider>
                            <v-flex xs12 md5>
                                <v-divider class="hidden-sm-and-up mb-3"></v-divider>
                                <div class="headline">{{typeOfContent[contentType]}} Preview</div>
                                <v-flex xs12>
                                    <v-btn raised block color="primary" @click="onPickFile">Choose Files</v-btn>
                                    <input multiple type="file" ref="fileInput" style="display: none;" accept="image/*" @change="onFilePicked">
                                </v-flex>
                                <v-layout row wrap justify-center fill-height>
                                    <v-flex xs12 class="my-auto">
                                        <v-img
                                            :src="coverPic"
                                            contain
                                            :max-height="preMaxHeight">
                                        </v-img>
                                    </v-flex>
                                    <v-flex xs12 :class="{'pb-4': $vuetify.breakpoint.smAndDown}">
                                        <v-carousel :cycle="false" hide-delimiters
                                            interval="9999999" :height="carouselHeight" light
                                            class="mt-2" v-if="selected">
                                            <v-carousel-item v-for="i in paginas" :key="i">
                                                <v-layout row>
                                                    <v-flex xs4 v-for="aux in itemsPerPage" :key="aux">
                                                        <v-img :src="getImageByIndex(aux, i).src"
                                                        :height="carouselHeight" :max-height="carouselHeight" min-width="150" @click="changeCover(getImageByIndex(aux, i))">
                                                            <v-layout column fill-height>
                                                                <v-layout row justify-center>
                                                                    <v-tooltip bottom v-if="(getImageByIndex(aux, i).src.length > 0)" >
                                                                        <v-btn fab small color="error" slot="activator"
                                                                        @click="removeImage (getImageByIndex(aux, i))">
                                                                            <v-icon small>remove</v-icon>
                                                                        </v-btn>
                                                                        <span>Remove</span>
                                                                    </v-tooltip>
                                                                    <v-tooltip bottom v-if="(getImageByIndex(aux, i).src.length > 0)">
                                                                        <v-btn fab small :color="imagesIndexModel[getImageIndex(aux, i)].color"
                                                                        slot="activator" @click="setAsThumbnail (getImageIndex(aux, i))">
                                                                            <v-icon small>star</v-icon>
                                                                        </v-btn>
                                                                        <span>Set as cover</span>
                                                                    </v-tooltip>
                                                                </v-layout>
                                                                <v-layout row wrap justify-center align-content-start v-if="hasSource(aux, i)" class="">
                                                                    <v-flex xs12 >
                                                                        <v-text-field
                                                                            solo
                                                                            background-color="rgba(0,0,0,0.6)"
                                                                            dark
                                                                            :mask="getMaskNumbers()"
                                                                            @change="checkTypedIndex(aux, i, $event)"
                                                                            class="centered-input"
                                                                            style="margin-top: 0px; height: 20px;"
                                                                            v-model="imagesIndexModel[getImageIndex(aux, i)].index">
                                                                        </v-text-field>
                                                                    </v-flex>
                                                                </v-layout>
                                                            </v-layout>
                                                        </v-img>
                                                    </v-flex>
                                                </v-layout>
                                            </v-carousel-item>
                                        </v-carousel>
                                        <v-layout row wrap justify-center>
                                          <v-btn color="error" @click="resetImages()" v-if=(selected)>Remove all images</v-btn>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>

                            </v-flex>
                            <v-layout row wrap justify-center class="mt-3">
                                <v-flex xs12 md6>
                                    <v-btn color="success" block :disabled="!readyToUpload" @click="uploadContent ()">Upload Content</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            selectedHolders: [],
            imgsIndex: 0,
            readyToUpload: false,
            selected: false,
            defaultCover: 'https://images-na.ssl-images-amazon.com/images/I/51kPrArqxML._SX330_BO1,204,203,200_.jpg',
            coverPic: 'https://images-na.ssl-images-amazon.com/images/I/51kPrArqxML._SX330_BO1,204,203,200_.jpg',
            newBook: {
                // Selected shit
                saga: '',
                genres: [],
                category: '',
                title: '',
                description: '',
                images: [],
                imagesNoHeader: [],
                holder: ''
            },
            // v-model for v-text indexs
            imagesIndexModel: [
            ],
            loadedData: {
                // Loaded shit
                holders: [],
                sagas: [],
                genres: [],
                categorys: [
                    'Book',
                    'Manga',
                    'Comic',
                    'Magazine'
                ]
            },
            IPLocalHost: 'localhost',
            typeOfContent: ['Image', 'Video', 'Music'],
            // Este sera el index, 0, 1 o 2, va en los radiobutton
            contentType: '0',
        }
    },
    methods: {
        onPickFile () {
            this.$refs.fileInput.click()
        },
        onFilePicked (event) {
            this.selected = true
            console.log("Selected")
            var files = event.target.files
            let context = this
            for(let i = 0; i < files.length; i++) {
                let fileReader = new FileReader ()
                // Las imagenes no se cargaban en orden, a veces una cargaba mas rapido que otra y asi
                // cambia el orden de las imagenes
                // Se crea el array de tamaño "files.length" primero y luego cuando cargue una imagen se va
                // a colocar donde deberia con el iterador del for "i"
                this.newBook.images.push(
                    { src: '', index: 0 }
                )
                // color sera para el color individual de cada boton de "set as thumbnail"
                this.imagesIndexModel.push({ index: 0, color: 'warning'})

                fileReader.addEventListener ('load', () => {
                    //Metodo asincrono?
                    //Cuando termine se ejecuta esto, si es asincrono
                    let result = fileReader.result
                    this.changeCover ({ src: result })

                    this.newBook.images[context.imgsIndex] = {
                        src: result,
                        index: context.imgsIndex,
                    }
                    this.imagesIndexModel[context.imgsIndex].index = context.imgsIndex
                    context.imgsIndex++
                })
                //Se ejecuta esto y cuando termine...
                fileReader.readAsDataURL(files[i])
            }
        },
        getImageByIndex (index, outerLoop) {
            index = this.getLoopIndex(index, outerLoop)
            if(this.newBook.images[index-1] !== null && this.newBook.images[index-1] !== undefined){
                return this.newBook.images[index-1]
            }else{
                return {src: ''}
            }
        },
        getImageIndex (index, outerLoop) {
            index = this.getLoopIndex(index, outerLoop)
            return this.newBook.images[index-1].index
        },
        getLoopIndex (index, outerLoop) {
            let aux = (this.itemsPerPage*(outerLoop-1))
            index += aux
            return index
        },
        changeCover (selectedImg) {
            this.coverPic = selectedImg.src
        },
        loadUploadingInfo () {
            // Getting sagas
            this.axios.get('http://'+this.IPLocalHost+'/Odr/connections/getSaga.php').then(response => {
                response.data.forEach(element => {
                    this.loadedData.sagas.push(element)
                });
                console.log(this.loadedData)
            }).catch(error => {
                console.log(error)
            })
            // Getting genres
            this.axios.get('http://'+this.IPLocalHost+'/Odr/connections/getGenres.php').then(response => {
                response.data.forEach(element => {
                    this.loadedData.genres.push(element.nombreTag)
                });
            }).catch(error => {
                console.log(error)
            })
        },
        removeImage (element) {
            console.log("Eliminar")
            let index = this.newBook.images.indexOf(element)
            this.newBook.images.splice(index, 1)
            this.imagesIndexModel.splice(index, 1)

            for (let i = index; i < this.newBook.images.length; i++) {
                this.newBook.images[i].index--
                this.imagesIndexModel[i].index--
            }
            console.log('imgsIndex A', this.imgsIndex)
            this.imgsIndex--
            console.log('imgsIndex D', this.imgsIndex)
        },
        getHolders (idSaga) {
          let bodyFormData = new FormData()
          this.axios.post('http://'+this.IPLocalHost+'/Odr/connections/getHolders.php', bodyFormData).then(response => {
            console.log(response.data);
          }).catch(error => {

          })
        },
        hasSource (index, outerLoop) {
            index = this.getLoopIndex(index, outerLoop)
            if(this.newBook.images[index-1] !== null && this.newBook.images[index-1] !== undefined){
                let img = this.newBook.images[index-1]

                return (img.src !== null && img.src !== undefined && img.src !== '')
            } else
                return false
        },
        restartCoverPic () {
            this.coverPic = this.defaultCover
            this.selected = false
        },
        uploadContent () {
            var bodyFormData = new FormData();
            //Reset array
            this.newBook.imagesNoHeader = []
            //Quitar header del base64
            this.newBook.images.forEach(element => {
                this.newBook.imagesNoHeader.push(this.removeBase64Headers(element.src))
            });

            let thumbnail = this.newBook.images.find((element) => {
                return (element.thumbnail === true)
            })

            bodyFormData.set('Scans', JSON.stringify(this.newBook.imagesNoHeader))
            bodyFormData.set('idSaga', this.newBook.saga.idSaga)
            bodyFormData.set('tituloScans', this.newBook.title)
            bodyFormData.set('descripcionScans', this.newBook.description)
            bodyFormData.set('category', this.newBook.category)
            bodyFormData.set('tags', this.newBook.genres)
            bodyFormData.set('nPaginas', this.newBook.images.length)
            bodyFormData.set('idScanHolder', this.newBook.holder.idScanHolder)
            bodyFormData.set('thumbnailScans', this.removeBase64Headers(thumbnail.src))
            for (var pair of bodyFormData.entries()) {
                console.log(pair[0], pair[1]);
            }

            this.axios.post('http://'+this.IPLocalHost+'/Odr/connections/saveScans.php', bodyFormData).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        },
        setReadyToUpload (val) {
            this.readyToUpload = val
        },
        removeBase64Headers (base64) {
            return base64.substr(base64.indexOf(',') + 1)
        },
        getMaskNumbers () {
            let mask = ''
            //For de cantidad de digitos de numero de imagenes que hay, para mascara
            for (let i = 0; i < this.newBook.images.length.toString().length ; i++) {
                mask += '#'
            }
            return mask
        },
        checkTypedIndex (index, outerLoop, newValue) {
            console.log('imgsIndex', this.imgsIndex)
            console.log('newValue', newValue)
            console.log('index', index)
            index = this.getLoopIndex(index, outerLoop) - 1
            let oldValue = this.newBook.images[index].index
            if (newValue > this.imgsIndex-1) {
                console.log('Way too big', oldValue, newValue, this.imagesIndexModel)
                this.imagesIndexModel[index].index = oldValue
                console.log('Way too big', oldValue, newValue, this.imagesIndexModel)
                // this.$set(this.imagesIndexModel, index, oldValue)
            } else {
                console.log('Ok')
                let auxImage = {
                    ...this.newBook.images[index]
                }
                this.newBook.images[index] = this.newBook.images[newValue]
                this.newBook.images[newValue] = {...auxImage}

                // Para este punto ya ha sido cambiado el arreglo asi que los indices tambien
                this.imagesIndexModel[index].index = index
                // this.$set(this.imagesIndexModel, index, index)
                this.imagesIndexModel[newValue].index = newValue
                // this.$set(this.imagesIndexModel, newValue, newValue)
                this.newBook.images[index].index = index
                this.newBook.images[newValue].index = newValue
            }
        },
        resetImages () {
            this.newBook.images = []
            this.newBook.imagesNoHeader = []
            this.imgsIndex = 0
            this.imagesIndexModel = []
            this.selected = false
        },
        setAsThumbnail (index) {
            this.imagesIndexModel.forEach(element => {
                element.color = 'warning'
            });
            this.imagesIndexModel[index].color = 'success'

            this.newBook.images.forEach(element => {
                element.thumbnail = false
            });
            this.newBook.images[index].thumbnail = true

            console.log(this.imagesIndexModel)
            console.log(this.newBook.images)
        }
    },
    computed: {
        paginas () {
            return Math.ceil((this.newBook.images.length / this.itemsPerPage))
        },
        imagesLength () {
            return this.newBook.images.length
        },
        itemsPerPage () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 3
                case 'sm': return 3
                case 'md': return 3
                case 'lg': return 3
                case 'xl': return 4
            }
        },
        carouselHeight () {
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 100
            case 'sm': return 100
            case 'md': return 100
            case 'lg': return 100
            case 'xl': return 140
          }
        },
        preMaxHeight () {
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 200
            case 'sm': return 200
            case 'md': return 200
            case 'lg': return 260
            case 'xl': return 300
          }
        },
        // Cuando se usa deep en un watch, el value viejo y el nuevo son iguales asi que es necesario
        // Usar un computed y que regrese un objeto nuevo
        computedNewBookModel () {
          return Object.assign({}, this.newBook)
        }
    },
    created () {
        this.loadUploadingInfo ()
        // Si no se han cargado los datos de las sagas (solamente datos basicos)
        if (this.$store.getters.getSagas.length == 0) {
            this.$store.dispatch('loadSagasInfo')
        }
        // Si no se han cargado las categorias
        if (this.$store.getters.getCategorys.length == 0) {
            this.$store.dispatch('loadCategorys')
        }
    },
    watch: {
        imagesLength: function (val) {
            if (val == 0) {
                this.restartCoverPic()
            }
        },
        computedNewBookModel: {
            handler: function (val, old) {
              console.log("cambio", val, old)
              if (val.saga.idSaga !== old.saga.idSaga) {
                  this.loadedData.holders = []
                let bodyFormData = new FormData()
                bodyFormData.set('idSaga', val.saga.idSaga)
                this.axios.post('http://'+this.IPLocalHost+'/Odr/connections/getHolders.php', bodyFormData).then(response => {
                  response.data.forEach(element => {
                    this.loadedData.holders.push(element)
                  });
                })
              }
            //   Comprobar que todos los campos hayan sido llenados para poder subir el contenido
                this.setReadyToUpload(true)
                if (val.images.length <= 0)
                    this.selected = false
            },
            deep: true
        },

    }
}
</script>

<style>
    
</style>
