<template>
    <div>
    <!-- Separacion -->
    <v-layout row justify-center>
        <v-subheader>Information</v-subheader>
        <v-divider class="my-4"></v-divider>
    </v-layout>
    <v-text-field
        name="bookTitle"
        label="Titulo del articulo"
        v-model="information.titulo"
        id="bookTitle"
        box
        required>
        </v-text-field>
    <v-layout row wrap>
        <v-flex xs12>
            <v-select
                :items="generos"
                v-model="information.generos"
                label="Genero"
                box
                multiple
                chips
                persistent-hint>
            </v-select>
        </v-flex>
    </v-layout>
    </div>
</template>

<script>
export default {
    data () {
        return {
            information: {
                titulo: '',
                generos: [],
            },
            generos: ['Nose'],
        }
    }
}
</script>

<style>
    
</style>