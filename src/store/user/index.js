import axios from 'axios'
import * as firebase from 'firebase'

export default({
    state: {
        user: {
            id: '',
            email: '',
            configuration: {
                nombre: '',
                nickname: '',
                descripcion: '',
                sexo: '',
                ubicacion: '',
                imagen: 'https://homuapp.000webhostapp.com/Imagenes/4-1-2019-22-24-45.jpg',
                edad: '',
                notificaciones: false,
                idioma: '0',
            }
        }
    },
    mutations: {
        setUserData (state, payload) {
            state.user.id = payload.id
            state.user.email = payload.email
        }
    },
    actions: {
        googleSignIn ({commit, getters}) {
            var provider = new firebase.auth.GoogleAuthProvider();
            let bodyFormData = new FormData ()
            firebase.auth().signInWithPopup(provider).then(response => {
                console.log("user email", response.user.email)
                console.log("user id", response.user.uid) 
                //Asignar a user sus variables
                let user = {
                    id: '',
                    email:''
                }
                user.id = response.user.uid
                user.email = response.user.email

                commit('setUserData', user.id)
                commit('setUserData', user.email)

                bodyFormData.set('userId', user.id)
                bodyFormData.set('userEmail', user.email)

                axios.post("http://localhost/Odr/connections/userConnections/saveUser.php", bodyFormData).then(response => {
                    console.log("Response", response)
                })
            }).catch(error => {
                console.log(error)
            })
        }
    },
    getters: {
        getUrlBase (state) {
            return state.urlBase
        },
        getUserData (state) {
            return state.user
        }
    }
})
