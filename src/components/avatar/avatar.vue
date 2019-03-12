<template>
    <div>
        <!--  -->
        <!-- <unity src="static/Build/Avatar.json" width="1000" height="600" unityLoader="static/Build/UnityLoader.js"></unity> -->
        <label>File
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </label>
        <v-btn color="primary" @click="submitFile()">Subir</v-btn>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    methods: {
        /*
        Submits the file to the server
      */
      submitFile(){
            let formData = new FormData();
            formData.append('file', this.file);
            this.axios.post( 'http://localhost/Odr/connections/streamingContent/content/uploadVideo.php',
                formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(response => {
                console.log(response.data)
            }).catch(function(){
                console.log('FAILURE!!');
            });
      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      },        
    },
    created () {
    }
}
</script>