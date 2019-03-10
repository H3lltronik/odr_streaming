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
                                <images-information></images-information>
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
                                <images-selector-carousel :preview="true"></images-selector-carousel>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="info" @click="stepper = 3">Atras</v-btn>
                                <v-btn color="success">Subir</v-btn>
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
            stepper: 4,
            sagasInfo: [],
            categoriasInfo: [],
            newContent: {
                saga: {},
                categoria: {},
            }
        }
    },
    methods: {
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
                elementSaga.Holders.forEach(elementHolders => {
                    let holder = {
                        tituloHolder: elementHolders.TituloHolder,
                        idHolder: elementHolders.IdHolder,
                        IdCategoria: elementHolders.IdCategoria
                    }
                    holders.push(holder)
                })
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

<style>
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
