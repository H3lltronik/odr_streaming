<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card>
                <v-card-title primary-title>
                    <div class="headline">Configuracion</div>
                </v-card-title>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex xs6 md2>
                            <v-img :src="currConfig.imagen"
                                max-height="300" contain>
                            </v-img>
                        </v-flex>
                        <v-flex xs6 md8>
                            <!-- <select-image :title="placeholders.imagen[currConfig.idioma]" v-on:getSource=" changePreview($event)"></select-image> -->
                            <v-btn color="primary" @click="gotoToPage ('avatar')">ABRIR EDITOR DE AVATAR</v-btn>
                        </v-flex>

                        <v-flex xs12>
                            <v-text-field
                                box
                                v-model="currConfig.nombre"
                                name="nombre"
                                :label="placeholders.nombre[currConfig.idioma]"
                                id="id">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                box
                                v-model="currConfig.nickname"
                                name="nombre"
                                :label="placeholders.nickname[currConfig.idioma]"
                                id="id">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                box
                                v-model="currConfig.descripcion"
                                name="nombre"
                                :label="placeholders.descripcion[currConfig.idioma]"
                                id="id">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                box
                                v-model="currConfig.sexo"
                                name="nombre"
                                :label="placeholders.sexo[currConfig.idioma]"
                                id="id">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                box
                                v-model="currConfig.ubicacion"
                                name="nombre"
                                :label="placeholders.ubicacion[currConfig.idioma]"
                                id="id">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                box
                                v-model="currConfig.edad"
                                name="nombre"
                                :label="placeholders.edad[currConfig.idioma]"
                                id="id">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                        </v-flex>

                        <v-flex xs12>
                            <v-switch :label="placeholders.notificaciones[currConfig.idioma]"
                                v-model="currConfig.notificaciones">
                            </v-switch>
                        </v-flex>

                        <v-flex xs12>
                            <v-radio-group v-model="currConfig.idioma">
                                <v-radio :label="placeholders.idioma.ingles[currConfig.idioma]" value="1">
                                </v-radio>
                                <v-radio :label="placeholders.idioma.español[currConfig.idioma]" value="0">
                                </v-radio>
                            </v-radio-group>
                        </v-flex>
                        <v-flex xs12>
                            <v-btn color="success" :loading="loading"
                                @click="saveConfiguration">Guardar configuracion</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data () {
        return {
            placeholders: {
                nombre: ['Nombre real', 'Real name'],
                nickname: ['Nickname', 'Nickname'],
                descripcion: ['Descripcion', 'Description'],
                sexo: ['Sexo', 'Gender'],
                ubicacion: ['Ubicacion', 'Ubication'],
                imagen: ['Imagen de perfil', 'Profile picture'],
                idioma: ['Idioma preferido', 'Prefered Languaje'],
                edad: ['Edad', 'Age'],
                notificaciones: ['Permitir notificaciones por correo', 'Allow email notifications'],
                idioma: {
                    ingles: ['Ingles', 'English'],
                    español: ['Español', 'Spanish']
                }
            },

        }
    },
    methods: {
        changePreview (src) {
            this.currConfig.imagen = src
        },
        saveConfiguration () {
            this.$store.dispatch('saveUserConfiguration')
        },
        gotoToPage (page) {
            this.$router.replace('/' + page)
        },
    },
    computed: {
        currConfig () {
            let data = this.$store.getters.getUserData.configuration
            if (data)
                return data
            else
                return null
        },
        loading () {
            if (this.$store.getters.getLoading) {
                return this.$store.getters.getLoading
            }
        }
    },
    watch: {
      currConfig (newValue){
          console.log(data)
      }
    }
}
</script>

<style>

</style>
