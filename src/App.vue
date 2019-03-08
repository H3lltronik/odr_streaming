<template>
  <v-app style='background-color: #f2d5d0;'>
    <v-navigation-drawer v-model="drawer" app fixed temporary class='clothing'>
      <v-list subheader>
        <v-subheader>Descubrir</v-subheader>

        <v-list-tile avatar @click="gotoToPage('')">
          <v-list-tile-avatar>
            <img src="https://66.media.tumblr.com/3a3c059a676ef5ff516f84f155422429/tumblr_ol4548ZaNP1uylzwto1_250.png">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Manga</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>

        <v-subheader>Añadir</v-subheader>

        <v-list-tile avatar @click="gotoToPage('uploadImageContent')">
          <v-list-tile-avatar>
            <img src="https://66.media.tumblr.com/3a3c059a676ef5ff516f84f155422429/tumblr_ol4548ZaNP1uylzwto1_250.png">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Manga</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar color='primary' fixed app>
      <v-toolbar-side-icon class='white--text' @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-avatar
          size='40px'>
          <img src='../static/logo.svg' alt='logo'>
        </v-avatar>
        <v-toolbar-title class='text-sm-right white--text font-weight-thin headline'>HomuApp!</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>

        <v-btn flat class="white--text" @click="gotoToPage('profileConfiguration')" v-if="isUserLogged"> 
          <v-layout row wrap fill-height justify-center align-center class="mr-2">
            <v-avatar
              size="40"
              color="red">
              <img :src="userData.imagen" alt="alt">
            </v-avatar>
          </v-layout>
          {{userData.nickname}}
        </v-btn>
        
        <v-btn flat class="white--text" @click="logout" v-if="isUserLogged"> 
          Logout <v-icon>exit_to_app</v-icon>
        </v-btn>

        <v-btn flat class="white--text" @click="gotoToPage('login')" v-if="!isUserLogged">
          Sign in <v-icon>input</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return  {
      drawer: false
    }
  },
  name: 'App',
  methods: {
    setFontLoaded () {
      this.$emit('font-loaded')
    },
    gotoToPage (page) {
      this.$router.replace('/' + page)
    },
    logout () {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    isUserLogged () {
      let id = this.$store.getters.getUserData.id
      if (id !== '' && id !== undefined) {
        return true
      } else {
        return false
      }
    },
    userData () {
      let data = this.$store.getters.getUserConfig
      console.log("weewewewe", data)
      if (data)
        return data
      else 
        return ""
    }
  }
}
</script>
