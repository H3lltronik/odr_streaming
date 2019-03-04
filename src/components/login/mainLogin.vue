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
        let user = this.$store.getters.getUserData
        if (user.id) {
            this.$router.push('/profileConfiguration')
        }
    }
}
</script>

<style>
    
</style> 

