<template>
    <div>
        <v-layout row wrap justify-center>
            <v-btn color="success" @click="loadUserData">Load User Data</v-btn>
        </v-layout>
        <v-layout row wrap justify-center class="mt-3">
            <unity src="static/Build/Avatar.json" width="1000" height="600" unityLoader="static/Build/UnityLoader.js" ref="unityAvatar"></unity>
        </v-layout>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    methods: {
        loadUserData () {
            let userId = this.$store.getters.getUserData.id
            console.log(userId)
            this.$refs.unityAvatar.message("Screenshot", "setProfileFolder", userId)
        }
    }
}
</script>