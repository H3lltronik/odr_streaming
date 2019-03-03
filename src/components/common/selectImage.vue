<template>
    <!-- Para este componente es necesario tener un metodo en el padre que cambie el preview si es que se desea -->
    <!-- Cuando carga la imagen emite un metodo llamado 'getSource' con la base64 de la imagen seleccionada -->
    <!-- Se seleccionan solo imagenes individualmente -->
    <v-layout row wrap>
        <v-btn color="primary" @click="onPickFile">
            <div>{{title}}</div>
        </v-btn>
        <input type="file" ref="fileInput" style="display: none;" accept="image/*" @change="onFilePicked">
    </v-layout>
</template>

<script>
export default {
    props: ['title'],
    data () {
        return {
            image: '',
        }
    },
    methods: {
        onPickFile () {
            this.$refs.fileInput.click()
        },
        onFilePicked (event) {
            this.selected = true
            console.log("Selected")
            var files = event.target.files
            let context = this

            let fileReader = new FileReader ()
            // Las imagenes no se cargaban en orden, a veces una cargaba mas rapido que otra y asi
            // cambia el orden de las imagenes
            // Se crea el array de tamaño "files.length" primero y luego cuando cargue una imagen se va
            // a colocar donde deberia con el iterador del for "i"

            fileReader.addEventListener ('load', () => {
                //Metodo asincrono?
                //Cuando termine se ejecuta esto, si es asincrono
                context.image = fileReader.result
                context.$emit('getSource', context.image)
            })
            //Se ejecuta esto y cuando termine...
            fileReader.readAsDataURL(files[0])
        }
    }
}
</script>

<style>
    
</style>