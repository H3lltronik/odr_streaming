<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12>
                <div class="title black--text font-weight-light my-2">{{titulo}}</div>
                <v-layout row text-xs-center :justify-center="0"
                class="verticalSlider" v-if="Length >= 0">
                <v-img :height="ItemHeight" :width="ItemWidth" max-width="300"
                v-for="aux in CantItems" :key="aux" class="mr-3 boxContent"
                @click="goToSaga (Items[aux-1].url)"
                :src="Items[aux-1].thumbnail">
                    <v-layout row wrap fill-height align-end>
                    <div style="background-color: rgba(0, 0, 0, 0.5); width: 100%;">
                        <div class="title white--text font-weight-bold ml-2">
                        {{Items[aux-1].titulo}}
                        </div>
                    </div>
                    </v-layout>
                </v-img>
                </v-layout>
                <v-btn color="primary" flat class="mt-3">Mostrar Mas</v-btn>
                <v-divider class="my-2 "></v-divider>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    props: {
        titulo: {
            type: String,
            default: 'Titulo'
        },
        Length: {
            type: Number
        },
        ItemHeight: {
            type: Number
        },
        ItemWidth: {
            type: Number
        },
        CantItems: {
            type: Number
        },
        Items: {
            type: Array
        }
    },
    data () {
        return {
        }
    },
    methods: {
        goToSaga (URLSaga) {
            if (URLSaga !== '' && URLSaga !== undefined)
                this.$router.push("sagas/" + URLSaga)
        }
    }
}
</script>

<style>
    
</style>