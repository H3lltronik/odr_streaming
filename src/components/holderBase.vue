<template>
    <v-container grid-list-xs>
        <v-layout row wrap justify-center>
            <v-flex xs12 sm12 md10>
                <v-card class="py-5 vCardStyle elevation-10">
                    <v-layout row wrap :justify-center="smAndDown" text-xs-center>
                        <v-flex xs10 sm10 md4>
                            <v-img contain max-height="500" :class="{'mx-5' : !xsOnly}"
                            :src="currentContent.thumbnail"></v-img>
                        </v-flex>
                        <v-flex xs10 md7 >
                            <v-layout row wrap :justify-center="smAndDown" :class="{'mt-4' : xsOnly}">
                                <div :class="{'display-1': !xsOnly, 'title': xsOnly}">
                                    {{ saga.name }}</div>
                            </v-layout>
                            <v-divider class="mt-2 mb-1" style="background: #000"></v-divider>
                            <v-layout row wrap align-center>
                                    <v-flex xs12 class="mt-1">
                                        <v-layout row wrap align-center>
                                            <div class="body-1 font-weight-medium" >Type: </div>
                                            <v-chip class="ml-1" :small="xsOnly">{{currentContent.type}}</v-chip>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex xs12 class="mt-1">
                                        <v-layout row wrap align-center>
                                            <div class="body-1 font-weight-medium">Tags:</div>
                                            <v-chip class="" :small="xsOnly" v-for="(aux, index) in currentContent.tags" :key="index">
                                                {{ aux }}
                                            </v-chip>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex xs12 class="mt-1">
                                        <v-layout row wrap align-center>
                                            <div class="body-1 font-weight-medium mr-1">Description: </div>
                                            <div class="body-1"> {{currentContent.description}} </div>
                                        </v-layout>
                                    </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>

            <v-flex xs12 md10>
                <v-card class="vCardStyle mt-3 elevation-10">
                    <!-- Si son scans -->
                    <v-layout row wrap class="pa-3" justify-center v-if="isScan">
                        <v-flex xs5 sm4 md3 xl2 v-for="(aux, index) in currentContent.scans" :key="index">
                            <v-layout row wrap align-center fill-height @click="goToScan (aux.idScan)">
                                <v-img :height="heightHolderItems" class="ma-1"  :src="aux.urlThumbnail + '/thumbnail.jpg'">
                                    <v-layout row wrap fill-height align-end>
                                        <v-flex xs12>
                                            <v-layout row wrap style="background-color: rgba(0,0,0,0.5);" justify-center>
                                                <div :class="{'headline': !smAndDown, 'body-1': smAndDown, 'white--text': 1}">{{aux.title}}</div>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>
                                </v-img>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="pa-3" justify-center v-if="isVideo">
                        <v-flex xs5 sm4 md3 xl3 v-for="(aux, index) in currentContent.scans" :key="index">
                            <v-layout row wrap align-center fill-height @click="goToScan (aux.idScan)">
                                <v-img :height="heightHolderItems" class="ma-1"  src="https://homuapp.000webhostapp.com/Imagenes/15-1-2019-2-20-45.jpg">
                                    <v-layout row wrap fill-height align-end>
                                        <v-flex xs12>
                                            <v-layout row wrap style="background-color: rgba(0,0,0,0.5);" justify-center>
                                                <div :class="{'headline': !smAndDown, 'body-1': smAndDown, 'white--text': 1}">{{aux.title}}</div>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>
                                </v-img>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    data () {
        return {
            xsOnly: this.$vuetify.breakpoint.xsOnly,
            smAndDown: this.$vuetify.breakpoint.smAndDown,
            idSaga: '',
            idHolder: '',
            videos: ['Anime']
        }
    },
    created () {
        this.idHolder = this.$route.params.idHolder
        this.idSaga = this.$route.params.idSaga
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
        heightHolderItems () {
            if (this.isScan) {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs': return '220px'
                    case 'sm': return '400px'
                    case 'md': return '220px'
                    case 'lg': return '300px'
                    case 'xl': return '320px'
                }
            } else if (this.isVideo) {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs': return '100px'
                    case 'sm': return '200px'
                    case 'md': return '200px'
                    case 'lg': return '150px'
                    case 'xl': return '200px'
                }
            }
        },
        isScan () {
            return (this.currentContent.type === 'Manga')
        },
        isVideo () {
            return (this.currentContent.type === 'Anime')
        }
    },
    methods: {
        goToScan (idScan) {
            this.$router.push(this.idHolder + "/" + idScan + "/1")
        }
    }
}
</script>

<style>
    .vCardStyle {
        border-radius: 30px;
    }
</style>