<template>
    <v-layout row wrap fill-height style="background-color: #1a1325" justify-center>
        <v-flex xs12>
            <v-layout row wrap justify-center class="my-5" v-touch="{left: () => swipe('left'),right: () => swipe('right')}" v-if="isScan">
                <v-flex xs10>
                    <v-img :src="imageUrl"></v-img>
                </v-flex>
            </v-layout>
            <v-layout row wrap justify-center class="my-5" v-if="isVideo">
                <v-flex xs10>
                    <video controls style="width: 100%; max-height: 700px;" :src="imageUrl"></video>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 md10>
            <comments></comments>
        </v-flex>
    </v-layout>
</template>

<script>
// style="background-color: rgba(0,0,0,0.8)"
export default {
    data () {
        return {
            xsOnly: this.$vuetify.breakpoint.xsOnly,
            smAndDown: this.$vuetify.breakpoint.smAndDown,
            urlSaga: '',
            urlHolder: '',
            urlContenido: '',
            nPagina: '',
            eventAdded: false,
            rutaBase: 'http://localhost/Odr/'
        }
    },
    created () {
        //Parametros del url
        this.urlHolder = this.$route.params.urlHolder
        this.urlSaga = this.$route.params.urlSaga
        this.urlContenido = this.$route.params.urlContenido
        this.nPagina = this.$route.params.nPagina

        // Comprobar que ya se haya cargado una saga y que esta tenga la misma id que a la que se entro
        if (Object.keys(this.saga).length === 0 && this.saga.constructor === Object) {
            console.log('No se tenia ninguna saga cargada')
            this.$store.dispatch('loadSagaData', this.urlSaga)
        } else {
            if (this.$store.getters.getSagaData.urlSaga !== this.urlSaga) {
                this.$store.dispatch('loadSagaData', this.urlSaga)
                console.log('Se tenia cargada otra saga')
            } else
                console.log('La misma saga cargada')
        }
    },
    mounted () {

    },
    computed: {
        saga () {
            
            return this.$store.getters.getSagaData
        },
        currentContent () {
            console.log("QUE PEDO", this.saga.content)
            if (this.saga.content){
                console.log("Current Content",this.saga.content.find((element) => {
                    return element.url === this.urlHolder
                }))
                return this.saga.content.find((element) => {
                    return element.url === this.urlHolder
                })
            }
            else
                return []
        },
        isScan () {
            return (this.currentContent.type === 'Manga')
        },
        isVideo () {
            console.log("IS VIDEOOO")
            return (this.currentContent.type === 'Anime')
        },
        imageUrl () {
            if (this.saga.content) {
                if (this.isScan) {
                    return this.rutaBase + 'Manga/' + this.urlHolder + "/" + this.urlContenido + "/" + this.nPagina + ".jpg"
                } else if (this.isVideo) {
                    return this.rutaBase + 'Anime/' + this.urlHolder + "/" + this.urlContenido + "/" + this.nPagina + ".mp4"
                }
            } else {
                return ''
            }
        },
        currentScan () {
            console.log("CURRENT CONTEEEENT", this.currentContent)
            return this.currentContent.content.find((aux) => {
                return aux.URLContenido === this.urlContenido
            })
        },
        totalPages () {
            return this.currentScan.NumeroElemento
        }
    },
    methods: {
        swipe (dir) {
            if (dir === 'left') {
                console.log("Izquieda")
                if (this.nPagina < this.totalPages){
                    this.$router.replace(++this.nPagina + '')
                }
            } else if (dir === 'right') {
                console.log("Derecha")
                if (this.nPagina > 1) {
                    this.$router.replace(--this.nPagina + '')
                }
            }
        }
    },
    watch: {
        currentContent: function (val) {
            if (!this.eventAdded) {
                if (this.currentContent.type === 'Manga') {
                    let context = this;
                    window.addEventListener('keydown', function(event) {
                        if(event.keyCode === 37){
                            if (context.nPagina > 1) {
                                context.$router.replace(--context.nPagina + '')
                            }
                        }else if(event.keyCode === 39) {
                            console.log("derecha", context.nPagina, context.totalPages, context.currentScan)
                            if (context.nPagina < context.totalPages){
                                context.$router.replace(++context.nPagina + '')
                            }
                        }
                        context.eventAdded
                    })
                }
            }
        }
    }
}
</script>

<style>

</style>
