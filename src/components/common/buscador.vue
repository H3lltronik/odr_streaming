<template>
    <div>
        <v-autocomplete :items="buscadorData" item-text="titulo" prepend-inner-icon="search"
        color="black" background-color="white" label="Buscar" clearable v-model="selected">
            <template slot="item" slot-scope="data">
                <v-list-tile-avatar  @click="goToRoute(data.item.type, data.item.url)">
                    <img :src="data.item.thumbnail">
                </v-list-tile-avatar>
                <v-list-tile-content @click="goToRoute(data.item.type, data.item.url)">
                    <v-list-tile-title v-html="data.item.titulo"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="data.item.type"></v-list-tile-sub-title>
                </v-list-tile-content>
            </template>
        </v-autocomplete>
    </div>
</template>

<script>
export default {
    data () {
        return {
            selected: '',
        }
    },
    created () {
        this.$store.dispatch('loadBuscadorData')
    },
    methods: {
        goToRoute (type, route) {
            switch (type) {
                case 'Saga': {
                    this.$nextTick(() => {
                        this.$router.push('/sagas/' + route)
                    })
                    break;
                }
                case 'Character': {
                    this.$nextTick(() => {
                        this.$router.push('/characters/' + route)
                    })
                    break;
                }
                // Si no es ninguna de las anteriores entonces es un holder
                default: {
                    this.$nextTick(() => {
                        this.$router.push('/sagas/' + route)
                    })
                    break;
                }
            }
        },
    },
    computed: {
        sagasLength () {
        },
        sagas () {
            return this.$store.getters.getBuscadorSagas
        },
        holders () {
            return this.$store.getters.getBuscadorHolders
        },
        personajes () {
            return this.$store.getters.getBuscadorPersonajes
        },
        buscadorData () {
            let aux = []
            this.sagas.forEach(elementSagas => {
                aux.push(elementSagas)
            });
            this.holders.forEach(elementHolders => {
                aux.push(elementHolders)
            });
            this.personajes.forEach(elementPersonajes => {
                aux.push(elementPersonajes)
            });
            return aux
        }
    }
    
}
</script>

<style>
    /* <v-autocomplete :items="characters" item-text="name"
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
        </v-autocomplete> */
</style>