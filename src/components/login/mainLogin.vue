<template>
    <v-layout row wrap :justify-center="1">
        <v-btn color="success" @click="googleLogIn">Login with Google</v-btn>
    </v-layout>
</template>

<script>
export default {
    data () {
        return {
            currTab: '',
        }
    },
    methods: {
        googleLogIn () {
            this.$store.dispatch('googleSignIn')
            let userconfig = this.$store.getters.getUserData.configuration
        }
    },
    created () {
    }
}
</script>

<style>

</style>

