<template>
    <v-container grid-list-xs>
            <!-- Tab inicial, seleccion del tipo de contenido -->
            <v-stepper v-model="stepper">
                <v-stepper-header>
                    <v-stepper-step step="1">
                        Select the content type
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="2">
                        Select the container
                        <small>Content connections</small>
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="3">
                        Insert the content information
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="4">
                        Choose files
                    </v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card>
                            <v-card-title primary-title text-xs-center>
                                <div class="headline">Seleccione el tipo de contenido</div>
                            </v-card-title>
                            <v-card-text>
                                <v-radio-group v-model="contentType" row>
                                    <v-layout row wrap fill-height align-center justify-space-between>
                                        <v-radio label="label" value="1" >
                                            <div slot="label">Image</div>
                                        </v-radio>
                                        <v-radio label="label" value="2">
                                            <div slot="label">Video</div>
                                        </v-radio>
                                        <v-radio label="label" value="3">
                                            <div slot="label">Audio</div>
                                        </v-radio>
                                    </v-layout>
                                </v-radio-group>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="success" @click="stepper = 2">Siguiente</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card>
                            <v-card-title primary-title text-xs-center>
                                <div class="headline">Seleccione el contenedor</div>
                            </v-card-title>
                            <v-card-text>
                                <v-layout row justify-center>
                                    <v-subheader>Saga selector</v-subheader>
                                    <v-divider class="my-4"></v-divider>
                                </v-layout>
                                <v-layout row wrap justify-space-between="">
                                    <v-flex xs12 lg7 xl8>
                                        <v-select
                                            :items="sagasInfo"
                                            item-text="tituloSaga"
                                            v-model="newContent.saga"
                                            label="Sagas" single-line box
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
                                    <v-subheader>Category selector</v-subheader>
                                    <v-divider class="my-4"></v-divider>
                                </v-layout>
                                <v-layout row wrap justify-space-between="">
                                    <v-flex xs12 md6 lg7 xl8>
                                        <v-select
                                            :items="categsByType"
                                            item-text="NombreCategoria"
                                            v-model="newContent.categoria"
                                            label="Categoria" single-line box
                                            return-object
                                        ></v-select>
                                    </v-flex>
                                </v-layout>
                                <!-- Separacion -->
                                <v-layout row justify-center>
                                    <v-subheader>Holder selector</v-subheader>
                                    <v-divider class="my-4"></v-divider>
                                </v-layout>
                                <v-layout row wrap justify-space-between="">
                                    <v-flex xs12 md6 lg7 xl8>
                                        <!-- :disabled para que no seleccione holders antes de una saga
                                            ya que saga filtra los holders -->
                                        <v-select :disabled="!selectHolder"
                                            :items="holdersByCateg"
                                            item-text="tituloHolder"
                                            v-model="newContent.holder"
                                            label="Holder" single-line box
                                            return-object
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs12 md5 lg4 xl4>
                                        <v-layout row wrap justify-center>
                                            <create-holder-dialog></create-holder-dialog>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="info" @click="stepper = 1">Atras</v-btn>
                                <v-btn color="success" @click="stepper = 3">Siguiente</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-card>
                            <v-card-title primary-title text-xs-center>
                                <div class="headline">Informacion del contenido</div>
                            </v-card-title>
                            <v-card-text>
                                <images-information v-on:changeTitulo="changeTitulo($event)" 
                                    v-on:changeGenero="changeGenero($event)">
                                </images-information>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="info" @click="stepper = 2">Atras</v-btn>
                                <v-btn color="success" @click="stepper = 4">Siguiente</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="4">
                        <v-card>
                            <v-card-title primary-title text-xs-center>
                                <div class="headline">Elegir archivos</div>
                            </v-card-title>
                            <v-card-text>
                                <images-selector-carousel :preview="true" v-on:passImages="getImages($event)" v-if="contentType == 1">
                                </images-selector-carousel>
                                <video-uploader v-on:refFile="getVideo($event)" v-if="contentType == 2">
                                </video-uploader>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="info" @click="stepper = 3">Atras</v-btn>
                                <v-btn color="success" :disabled="!uploadBtnEnabled" @click="uploadContent">{{btnText}}</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            contentType: '1',
            stepper: 1,
            sagasInfo: [],
            categoriasInfo: [],
            newContent: {
                titulo: '',
                genero: [],
                saga: {},
                categoria: {},
                images: [],
                imagesNoHeader: [],
                video: ''
            },
            uploadBtnEnabled: true,
            btnText: 'Subir contenido'
        }
    },
    methods: {
        getImages ($event) {
            this.newContent.images = $event
        },
        getVideo ($event) {
            this.newContent.video = $event
            console.log("Event", $event)
        },
        uploadContent () {
            this.btnText = "Subiendo"
            this.uploadBtnEnabled = false
            //console.log(this.newContent)
            switch (this.contentType) {
                // Caso de imagenes
                case '1': {
                    this.uploadImages()
                    break;
                }
                // Caso de video
                case '2': {
                    this.uploadVideo()
                    break;
                }
            }
            
        },
        changeGenero ($event) {
            this.newContent.genero = $event
        },
        changeTitulo ($event) {
            this.newContent.titulo = $event
        },
        removeBase64Headers (base64) {
            return base64.substr(base64.indexOf(',') + 1)
        },
        uploadImages () {
            var bodyFormData = new FormData();
            //Reset array
            this.newContent.imagesNoHeader = []
            //Quitar header del base64
            this.newContent.images.forEach(element => {
                this.newContent.imagesNoHeader.push(this.removeBase64Headers(element.src))
            });
            let thumbnail = this.newContent.images.find((element) => {
                return (element.thumbnail === true)
            })

            bodyFormData.set('Scans', JSON.stringify(this.newContent.imagesNoHeader))
            bodyFormData.set('idSaga', this.newContent.saga.idSaga)
            bodyFormData.set('tituloScans', this.newContent.titulo)
            bodyFormData.set('category', JSON.stringify(this.newContent.categoria))
            bodyFormData.set('nPaginas', this.newContent.images.length)
            bodyFormData.set('idScanHolder', this.newContent.holder.idHolder)
            bodyFormData.set('URLHolder', this.newContent.holder.URLHolder)
            bodyFormData.set('thumbnailScans', this.removeBase64Headers(thumbnail.src))
            console.log("Lo del bodyForm")
            for (var pair of bodyFormData.entries()) {
                console.log(pair[0], pair[1]);
            }

            this.axios.post('http://localhost/Odr/connections/streamingContent/content/saveScans.php', bodyFormData).then(response => {
                console.log(response.data)
                alert(response.data)
                this.btnText = "Subido"
            }).catch(error => {
                console.log(error)
                this.btnText = "ERROR!!!"
            })
        },
        uploadVideo () {
            let formData = new FormData();
            formData.append('file', this.newContent.video);
            formData.set('titulo', this.newContent.titulo)
            formData.set('idHolder', this.newContent.holder.idHolder)
            formData.set('category', JSON.stringify(this.newContent.categoria))
            formData.set('URLHolder', this.newContent.holder.URLHolder)

            this.axios.post( 'http://localhost/Odr/connections/streamingContent/content/uploadVideo.php',
                formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(response => {
                console.log("response", response.data)
                alert(response.data)
                this.btnText = "Subido"
            }).catch(function(){
                console.log('FAILURE!!');
                this.btnText = "ERROR!!!"
            });
        }
    },
    computed: {
        // Filtrar holders por categoria
        holdersByCateg () {
            let holders = []
            let currSelected = this.newContent
            if (currSelected.categoria.Idcategoria) {
                currSelected.saga.holders.forEach(elementHolder => {
                    if (elementHolder.IdCategoria == currSelected.categoria.Idcategoria) {
                        holders.push(elementHolder)
                    }
                });
                return holders
            } else 
            return []
        },
        // Filtrar categorias por tipo de contenido
        categsByType () {
            let categorias = []
            this.categoriasInfo.forEach(element => {
                if (element.IdTipo == this.contentType)
                    categorias.push(element)
            });
            return categorias
        },
        // Control para seleccionar holders despues de haber seleccionado una saga y una categoria
        selectHolder () {
            return (this.newContent.saga.tituloSaga !== undefined && this.newContent.categoria.IdTipo !== undefined)
        }
    },
    created () {
        this.axios.post('http://localhost/Odr/connections/streamingContent/creating/getSaga.php').then(response => {
            let data = response.data
            let holders = []

            data.Categorias.forEach(elementCateg => {
                this.categoriasInfo.push(elementCateg)
            });

            data.Sagas.forEach(elementSaga => {
                if (Array.isArray(elementSaga.Holders)) {
                    elementSaga.Holders.forEach(elementHolders => {
                        let holder = {
                            tituloHolder: elementHolders.TituloHolder,
                            idHolder: elementHolders.IdHolder,
                            IdCategoria: elementHolders.IdCategoria,
                            URLHolder: elementHolders.URLHolder
                        }
                        holders.push(holder)
                    })
                }
                
                let saga = {
                    tituloSaga: elementSaga.TituloSaga,
                    idSaga: elementSaga.IdSaga,
                    holders: holders
                } 
                this.sagasInfo.push(saga)
            });
        }).catch(error => {
            console.log(error);
        })
    },
    watch: {
    }
}
</script>

<style scoped>
    .centered-input input {
        text-align: center;
    }

    .centered-input input:focus {
        caret-color: white;
    }

    .v-input--selection-controls .v-input__control {
        width: 1000px !important;
    }
</style>
