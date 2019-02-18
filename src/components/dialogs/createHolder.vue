<template>
    <v-dialog
        v-model="dialog" persistent
        scrollable max-width="500px" transition="dialog-transition">
        <v-btn color="info" flat outline block slot="activator">
            CREATE HOLDER
        </v-btn>
        <v-card>
            <v-card-title primary-title>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-layout row wrap fill-height align-center>
                            <div class="headline">Create a Holder</div>
                            <v-spacer></v-spacer>
                            <v-btn color="red" fab flat small @click="dialog = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-layout>
                    </v-flex>
                    <v-flex xs12>
                        <v-divider class="mt-2" style="margin-bottom: -10px;"></v-divider>
                    </v-flex>
                </v-layout>
            </v-card-title>
            <v-card-text style="margin-top: -10px;">
                <v-layout row wrap justify-center>
                    <v-flex xs12 lg6 class="pr-1">
                        <v-select
                            
                            label="Saga">
                        </v-select>
                    </v-flex>
                    <v-flex xs12 lg6 class="pl-1">
                        <v-select
                            
                            label="Category">
                        </v-select>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field box name="name" id="id" label="Titulo del Holder">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-textarea box name="name" id="id" label="Descripcion del Holder">
                        </v-textarea>
                    </v-flex>
                    <v-flex xs12>
                        <v-btn block color="gem" flat outline class="white--text">Select Cover</v-btn>
                        <v-img src="http://rs293.pbsrc.com/albums/mm45/Kaminara/404.jpg~c200"
                        max-height="400" contain>
                        </v-img>
                    </v-flex>
                    <v-flex xs12>
                        <v-divider class="my-2"></v-divider>
                    </v-flex>
                    <v-btn color="success" block>CREATE HOLDER</v-btn>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false
      }
    }
  }
</script>

<style>
    
</style>