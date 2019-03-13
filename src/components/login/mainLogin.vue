<template>
    <v-layout row wrap :justify-center="1">
        <v-btn color="success" @click="googleLogIn">Login with Google</v-btn>
        <v-btn color="blue" @click="facebookLogIn">Login with Facebook</v-btn>
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
        },
        facebookLogIn () {
            this.$store.dispatch('facebookSignIn')
        }
    },
    created () {
    }
}
</script>

<style>

</style>

