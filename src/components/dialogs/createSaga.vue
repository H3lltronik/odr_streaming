<template>
  <v-dialog
    v-model="dialog" persistent
        scrollable max-width="500px" transition="dialog-transition">
    <v-btn color="info" flat outline block slot="activator">CREATE SAGA</v-btn>
    <v-card>
      <v-card-title primary-title>
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout row wrap justify-space-between fill-height align-center>
              <div class="headline">Create Saga</div>
              <v-btn color="red" small fab flat @click="dialog = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-divider class="my-2"></v-divider>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              box
              label="Title saga"
              v-model="newSaga.title"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-btn color="gem" class="white--text" block flat outline>SELECT COVER</v-btn>
          </v-flex>
          <v-flex xs12>
            <v-btn color="gem" class="white--text" block flat outline>SELECT BACKGROUND</v-btn>
          </v-flex>
          <v-flex xs12>
            <v-card>
              <v-layout row wrap class justify-center>
                  <v-flex xs12>
                      <v-img
                      src="http://localhost/Odr/resources/15-1-2019-2-20-45.jpg"
                      max-height="450" style="min-height: 240px;" ref="imagen">
                      <!--  -->
                      <v-layout row wrap justify-center fill-height align-end>
                          <v-flex xs12>
                              <v-layout row wrap>
                                  <v-flex xs12>
                                      <v-layout row wrap justify-center fill-height align-end>
                                          <v-flex xs6 sm4 md5 xl2>
                                              <v-card class="pa-2">
                                                  <v-layout row wrap>
                                                      <v-flex xs12>
                                                          <v-img contain
                                                              src="http://localhost/Odr/resources/55225.jpg">
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
                                                      {{ newSaga.title }}
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
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      newSaga: {
        title: ''
      }
    }
  }
}
</script>

<style>

</style>
