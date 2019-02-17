<template>
    <v-layout row wrap fill-height style="background-color: #1a1325">
        <v-flex xs12>
            <v-layout row wrap justify-center class="my-5" v-touch="{left: () => swipe('left'),right: () => swipe('right')}" v-if="isScan">
                <v-flex xs10>
                    <v-img :src="imageUrl"></v-img>
                </v-flex>
            </v-layout>
            <v-layout row wrap justify-center class="my-5" v-if="isVideo">
                <v-flex xs10>
                    <video controls style="width: 100%" :src="imageUrl"></video>
                </v-flex>
            </v-layout>
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
            idSaga: '',
            idHolder: '',
            idScan: '',
            nPagina: '',
            eventAdded: false,
            rutaBase: 'http://localhost/Odr/'
        }
    },
    created () {
        //Parametros del url
        this.idHolder = this.$route.params.idHolder
        this.idSaga = this.$route.params.idSaga
        this.idScan = this.$route.params.idScan
        this.nPagina = this.$route.params.nPagina

        // Comprobar que ya se haya cargado una saga y que esta tenga la misma id que a la que se entro
        if (Object.keys(this.saga).length === 0 && this.saga.constructor === Object) {
            console.log('No se tenia ninguna saga cargada')
            this.$store.dispatch('loadSagaData', this.idSaga)
        } else {
            if (this.$store.getters.getSagaData.idSaga !== this.idSaga) {
                this.$store.dispatch('loadSagaData', this.idSaga)
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
            if (this.saga.content){
                console.log("Current Content",this.saga.content.find((element) => {
                    return element.idHolder === this.idHolder
                }))
                return this.saga.content.find((element) => {
                    return element.idHolder === this.idHolder
                })
            }
            else
                return []
        },
        isScan () {
            return (this.currentContent.type === 'Manga')
        },
        isVideo () {
            return (this.currentContent.type === 'Anime')
        },
        imageUrl () {
            if (this.saga.content) {
                if (this.isScan) {
                    return this.rutaBase + 'Manga/' + this.idHolder + "/" + this.currentScan.folder + "/" + this.nPagina + ".jpg"
                } else if (this.isVideo) {
                    return this.rutaBase + 'Anime/' + this.idHolder + "/" + this.currentScan.folder + "/" + this.nPagina + ".mp4"
                }
            } else {
                return ''
            }
        },
        currentScan () {
            return this.currentContent.scans.find((aux) => {
                return aux.idScan === this.idScan
            })
        },
        totalPages () {
            return this.currentScan.nPages
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
