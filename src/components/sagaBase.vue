<template>
    <v-container grid-list-xs>
        <v-layout row wrap justify-center>
            <v-flex xs12 md10>
                <v-card>
                    <v-layout row wrap class justify-center>
                        <v-flex xs12>
                            <v-img
                            :src="photoInfo.background"
                            max-height="450" style="min-height: 240px;" ref="imagen">
                            <!--  -->
                            <v-layout row wrap justify-center fill-height align-end>
                                <v-flex xs12>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            <v-layout row wrap justify-center fill-height align-end>
                                                <v-flex xs4 sm4 md3 xl2>
                                                    <v-card class="pa-2">
                                                        <v-layout row wrap>
                                                            <v-flex xs12>
                                                                <v-img contain
                                                                    :src="photoInfo.thumbnail">
                                                                </v-img>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-card>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs12 style="margin-bottom: -5px; margin-top: -5px;">
                                            <v-layout row wrap justify-center fill-height align-end text-xs-center>
                                                <v-flex xs12 md4>
                                                    <v-card>
                                                        <div :class="{'display-1': !$vuetify.breakpoint.xsOnly, 'subheading': $vuetify.breakpoint.xsOnly}">
                                                            {{name}}
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
                <div>
                    <v-tabs color="primary" slider-color="blush" grow>
                        <v-tab class="white--text" v-for="(n, index) in categorys" :key="index">{{ n }}</v-tab>
                        <v-tab-item v-for="(n, index) in categorys" :key="index">
                            <v-layout row wrap justify-center>
                                <v-flex xs12>
                                    <content-tab-item :type="n" :content="content"></content-tab-item>
                                </v-flex>
                            </v-layout>
                        </v-tab-item>
                    </v-tabs>
                </div>
            </v-flex>
            <v-flex xs12>
                
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            idSaga: ''
        }
    },
    mounted () {
        this.urlSaga = this.$route.params.urlSaga
        let saga = this.$store.getters.getSagaData
        // Comprobar que ya se haya cargado una saga y que esta tenga la misma id que a la que se entro
        if (Object.keys(saga).length === 0 && saga.constructor === Object) {
            // console.log('No se tenia ninguna saga cargada')
            this.$store.dispatch('loadSagaData', this.urlSaga)
        } else {
            if (this.$store.getters.getSagaData.urlSaga !== this.urlSaga) {
                this.$store.dispatch('loadSagaData', this.urlSaga)
                // console.log('Se tenia cargada otra saga')
            } // else
                // console.log('La misma saga cargada')
        }
    },
    created () {
    },
    computed: {
        categorys () {
            //console.log("CONTENT: ", this.$store.getters.getSagaData.categorys)
            return this.$store.getters.getSagaData.categorys
        },
        photoInfo () {
            //Esto de aqui, usar "aux" es solo porque muestra un error en consola de que las variables
            //Para poner la imagen de la saga y la portada son null al inicio pues no se han cargado todavia
            let aux = this.$store.getters.getSagaData.photoInfo
            if (aux)
                return aux
            else
                return {thumbnail: '', background: ''}
        },
        name () {
            return this.$store.getters.getSagaData.name
        },
        content () {
            console.log("CONTENT: ", this.$store.getters.getSagaData.content)
            return this.$store.getters.getSagaData.content
        }
    },
}
</script>

<style scoped>

@media only screen and (min-width: 800px) {
    .titleHolder {
        width: 100%;
        height: 60px;
        position: absolute;
    }

    #thumbnailSaga {
        min-height: 330px;
    }
}

@media only screen and (max-width: 800px) {
    .titleHolder {
        width: 100%;
        height: 40px;
        position: absolute;
    }

    #thumbnailSaga {
        max-height: 22vh;
    }
}
</style>
