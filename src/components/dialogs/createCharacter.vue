<template>
    <v-dialog
        v-model="dialog" max-width="800px"
        scrollable persistent :overlay="false"
        transition="dialog-transition">
        <v-btn color="info" flat slot="activator">Create Character</v-btn>
        <v-card>
            <v-card-title primary-title>
                <v-layout row wrap justify-space-between>
                    <div class="headline">Create character</div>
                    <v-spacer></v-spacer>
                    <v-btn color="red" small fab flat @click="dialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-layout>
                <v-flex xs12>
                    <v-divider></v-divider>
                </v-flex>
            </v-card-title>
            <v-card-text>
                <v-layout row wrap>
                    <!-- Separador -->
                    <v-flex xs12>
                        <v-layout row wrap fill-height align-center style="margin-top: -30px; margin-bottom: -20px;">
                            <v-flex xs4 md3>
                                <v-subheader>Character information</v-subheader>
                            </v-flex>
                            <v-flex xs8 md9>
                                <v-divider></v-divider>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                            v-model="newCharacter.name"
                            name="name"
                            label="Name">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-textarea name="name" label="Description"
                            v-model="newCharacter.description">
                        </v-textarea>
                    </v-flex>
                    <v-flex xs12>
                        <v-layout row wrap fill-height align-center style="margin-top: -10px;">
                            <v-flex xs4 md3>
                                <v-subheader>Character pictures</v-subheader>
                            </v-flex>
                            <v-flex xs8 md9>
                                <v-divider></v-divider>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs12>
                        <v-btn raised block color="primary" @click="onPickFile">Choose Files</v-btn>
                        <input multiple type="file" ref="fileInput" style="display: none;" accept="image/*" @change="onFilePicked">
                    </v-flex>
                    <v-flex xs12>
                        
                        <v-carousel :cycle="false" hide-delimiters
                            interval="9999999" height="130" light
                            :class="auxClass" v-if="selected">
                            <v-carousel-item v-for="i in paginas" :key="i">
                                <v-layout row>
                                    <v-flex xs4 v-for="aux in itemsPerPage" :key="aux">
                                        <v-img :src="getImageByIndex(aux, i).src"
                                        height="130" max-height="130" min-width="150">
                                            <v-layout column fill-height>
                                                <v-layout row justify-center>
                                                    <v-tooltip attach="#btnRemove" bottom v-if="(getImageByIndex(aux, i).src.length > 0)" >
                                                        <v-btn id="btnRemove" fab small color="error" slot="activator"
                                                        @click="removeImage (getImageByIndex(aux, i))">
                                                            <v-icon small>remove</v-icon>
                                                        </v-btn>
                                                        <span>Remove</span>
                                                    </v-tooltip>
                                                    <v-tooltip attach="#btnSetCover" bottom v-if="(getImageByIndex(aux, i).src.length > 0)">
                                                        <v-btn fab small :color="imagesIndexModel[getImageIndex(aux, i)].color"
                                                        slot="activator" id="btnSetCover" @click="setAsThumbnail (getImageIndex(aux, i))">
                                                            <v-icon small>star</v-icon>
                                                        </v-btn>
                                                        <span>Set as cover</span>
                                                    </v-tooltip>
                                                </v-layout>
                                                <v-layout row wrap justify-center align-content-start v-if="hasSource(aux, i)" class="">
                                                    <v-flex xs12 >
                                                        <v-text-field
                                                            solo
                                                            background-color="rgba(0,0,0,0.6)"
                                                            dark
                                                            :mask="getMaskNumbers()"
                                                            @change="checkTypedIndex(aux, i, $event)"
                                                            class="centered-input"
                                                            style="margin-top: 50px;"
                                                            v-model="imagesIndexModel[getImageIndex(aux, i)].index">
                                                        </v-text-field>
                                                    </v-flex>
                                                </v-layout>
                                            </v-layout>
                                        </v-img>
                                    </v-flex>
                                </v-layout>
                            </v-carousel-item>
                        </v-carousel>
                        <v-layout row wrap justify-center>
                            <v-btn color="error" @click="resetImages()" v-if=(selected)>Remove all images</v-btn>
                        </v-layout>
                    </v-flex>
                    <v-flex xs12>
                        <v-btn color="success" block @click="createCharacter">CREATE CHARACTER</v-btn>
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
            // Esta es para ayudarme a actualizar el carousel que parece que no se actualiza hasta que
            // Algo a su alrededor cambia de tamaño
            auxClass: 'mt-2',
            newCharacter: {
                name: '',
                description: '',
                images: [],
                imagesNoHeader: []
            },
            // v-model for v-text indexs
            imagesIndexModel: [
            ],
            imgsIndex: 0,
            selected: false,
            showCoverTooltip: true
        }
    },
    methods: {
        createCharacter () {
            let bodyFormData = new FormData ()
            //Reset array
            this.newCharacter.imagesNoHeader = []
            //Quitar header del base64
            this.newCharacter.images.forEach(element => {
                this.newCharacter.imagesNoHeader.push(this.removeBase64Headers(element.src))
            });

            let cover = this.newCharacter.images.find((element) => {
                return (element.thumbnail === true)
            })

            bodyFormData.set ('charName', this.newCharacter.name)
            bodyFormData.set ('charDesc', this.newCharacter.description)
            bodyFormData.set('charPics', JSON.stringify(this.newCharacter.imagesNoHeader))
            bodyFormData.set('profilePic', this.removeBase64Headers(cover.src))
            bodyFormData.set('nPaginas', this.newCharacter.images.length)

            this.axios.post('http://localhost/Odr/connections/createCharacter.php', bodyFormData).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        },
        removeBase64Headers (base64) {
            return base64.substr(base64.indexOf(',') + 1)
        },
        // De aqui para abajo son puros metodos del carousel
        getImageByIndex (index, outerLoop) {
            index = this.getLoopIndex(index, outerLoop)
            if(this.newCharacter.images[index-1] !== null && this.newCharacter.images[index-1] !== undefined){
                return this.newCharacter.images[index-1]
            }else{
                return {src: ''}
            }
        },
        removeImage (element) {
            console.log("Eliminar")
            let index = this.newCharacter.images.indexOf(element)
            this.newCharacter.images.splice(index, 1)
            this.imagesIndexModel.splice(index, 1)

            for (let i = index; i < this.newCharacter.images.length; i++) {
                this.newCharacter.images[i].index--
                this.imagesIndexModel[i].index--
            }
            this.imgsIndex--
        },
        getImageIndex (index, outerLoop) {
            index = this.getLoopIndex(index, outerLoop)
            return this.newCharacter.images[index-1].index
        },
        setAsThumbnail (index) {
            this.imagesIndexModel.forEach(element => {
                element.color = 'warning'
            });
            this.imagesIndexModel[index].color = 'success'

            this.newCharacter.images.forEach(element => {
                element.thumbnail = false
            });
            this.newCharacter.images[index].thumbnail = true

            console.log(this.imagesIndexModel)
            console.log(this.newCharacter.images)
        },
        hasSource (index, outerLoop) {
            index = this.getLoopIndex(index, outerLoop)
            if(this.newCharacter.images[index-1] !== null && this.newCharacter.images[index-1] !== undefined){
                let img = this.newCharacter.images[index-1]

                return (img.src !== null && img.src !== undefined && img.src !== '')
            } else
                return false
        },
        getMaskNumbers () {
            let mask = ''
            //For de cantidad de digitos de numero de imagenes que hay, para mascara
            for (let i = 0; i < this.newCharacter.images.length.toString().length ; i++) {
                mask += '#'
            }
            return mask
        },
        checkTypedIndex (index, outerLoop, newValue) {
            index = this.getLoopIndex(index, outerLoop) - 1
            let oldValue = this.newCharacter.images[index].index
            if (newValue > this.imgsIndex) {
                this.imagesIndexModel[index].index = oldValue
                // this.$set(this.imagesIndexModel, index, oldValue)
            } else {
                let auxImage = {
                    ...this.newCharacter.images[index]
                }
                this.newCharacter.images[index] = this.newCharacter.images[newValue]
                this.newCharacter.images[newValue] = {...auxImage}

                // Para este punto ya ha sido cambiado el arreglo asi que los indices tambien
                this.imagesIndexModel[index].index = index
                // this.$set(this.imagesIndexModel, index, index)
                this.imagesIndexModel[newValue].index = newValue
                // this.$set(this.imagesIndexModel, newValue, newValue)
                this.newCharacter.images[index].index = index
                this.newCharacter.images[newValue].index = newValue
            }
        },
        onPickFile () {
            this.$refs.fileInput.click()
        },
        onFilePicked (event) {
            this.selected = true
            console.log("Selected")
            var files = event.target.files
            let context = this
            for(let i = 0; i < files.length; i++) {
                let fileReader = new FileReader ()
                // Las imagenes no se cargaban en orden, a veces una cargaba mas rapido que otra y asi
                // cambia el orden de las imagenes
                // Se crea el array de tamaño "files.length" primero y luego cuando cargue una imagen se va
                // a colocar donde deberia con el iterador del for "i"
                this.newCharacter.images.push(
                    { src: '', index: 0 }
                )
                // color sera para el color individual de cada boton de "set as thumbnail"
                this.imagesIndexModel.push({ index: 0, color: 'warning'})

                fileReader.addEventListener ('load', () => {
                    //Metodo asincrono?
                    //Cuando termine se ejecuta esto, si es asincrono
                    let result = fileReader.result

                    this.newCharacter.images[context.imgsIndex] = {
                        src: result,
                        index: context.imgsIndex,
                    }
                    this.imagesIndexModel[context.imgsIndex].index = context.imgsIndex
                    context.imgsIndex++

                    this.auxClass = 'mt-5'
                    // Aca es donde cambio el tamaño de algo del carousel y luego lo devuelvo para que se actualice
                    this.auxClass = 'mt-2'
                })
                //Se ejecuta esto y cuando termine...
                fileReader.readAsDataURL(files[i])
            }
        },
        resetImages () {
            this.newCharacter.images = []
            this.newCharacter.imagesNoHeader = []
            this.imgsIndex = 0
            this.imagesIndexModel = []
            this.selected = false
        },
        getLoopIndex (index, outerLoop) {
            let aux = (this.itemsPerPage*(outerLoop-1))
            index += aux
            return index
        },
        restart () {
            this.selected = false
        }
    },
    computed: {
        paginas () {
            return Math.ceil((this.newCharacter.images.length / this.itemsPerPage))
        },
        imagesLength () {
            return this.newCharacter.images.length
        },
        itemsPerPage () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 3
                case 'sm': return 3
                case 'md': return 3
                case 'lg': return 3
                case 'xl': return 4
            }
        }
    },
    watch: {
        imagesLength: function (val) {
            if (val == 0) {
                this.restart()
            }
        }
    }
}
</script>

<style>
    
</style>
