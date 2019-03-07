import axios from 'axios'
import router from '../../router'
import * as firebase from 'firebase'


export default({
    state: {
        user: {}
    },
    mutations: {
        setUserData (state, payload) {
            state.user.id = payload.id
            state.user.email = payload.email
        },
        setUserConfig (state, payload) {
            state.user.configuration.nombre = payload.NombreUsuario
            state.user.configuration.nickname = payload.Nickname
            state.user.configuration.descripcion = payload.Descripcion
            state.user.configuration.sexo = payload.Sexo
            state.user.configuration.ubicacion = payload.Ubicacion
            state.user.configuration.imagen = payload.Imagen
            state.user.configuration.edad = payload.Edad
            state.user.configuration.notificaciones = (payload.NotificacionCorreo == 0)? false:true;
            state.user.configuration.idioma = payload.IdiomaPreferido
            state.user.configuration.configInicial = payload.ConfiguracionInicial
        },
        clearCurrUser (state) {
            // Reiniciar el objeto
            state.user = {
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
                    configInicial: false,
                }
            }
        }
    },
    actions: {
        googleSignIn ({commit, getters}) {
            commit ('setLoading', true)

            var provider = new firebase.auth.GoogleAuthProvider();
            provider.setCustomParameters({
                prompt: 'select_account'
            });
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

                commit('setUserData', user)

                bodyFormData.set('userId', user.id)
                bodyFormData.set('userEmail', user.email)

                axios.post("http://localhost/Odr/connections/userConnections/saveUser.php", bodyFormData).then(response => {
                    commit ('setLoading', false)
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                    commit ('setLoading', false)
                })
            }).catch(error => {
                console.log(error)
                commit ('setLoading', false)
            })
        },
        autoSignIn ({commit, dispatch}, payload) {
            if (payload) {
                commit ('clearCurrUser')
                //Asignar a user sus variables
                let user = {
                    id: '',
                    email:''
                }
                user.id = payload.uid
                user.email = payload.email

                commit('setUserData', user)
                dispatch('fetchUserConfiguration')
            }
        },
        // Llena el objeto configuration de user
        fetchUserConfiguration ({getters, commit}) {
            let bodyFormData = new FormData ()

            let user = getters.getUserData
            bodyFormData.set('userId', user.id)

            axios.post("http://localhost/Odr/connections/userConnections/getUserConfig.php", bodyFormData).then(response => {
                let data = response.data
                console.log('data', data)
                commit('setUserConfig', data)
                console.log('getUserData', getters.getUserData)
                //router.push('/profileConfiguration')
                if (getters.getUserData.configuration.configInicial === '0') {

                } else {
                  //router.push('/todoxido')
                }
            }).catch(error => {
                console.log(error)
            })
        },
        saveUserConfiguration ({commit, getters}) {
            let bodyFormData = new FormData ()

            let user = {...getters.getUserData}
            let image = user.configuration.imagen
            user.configuration.id = user.id
            user.configuration.configInicial = 1

            user.configuration.base64 = image.substr(image.indexOf(',') + 1)

            console.log('user', user.configuration)
            bodyFormData.set('configuration', JSON.stringify(user.configuration))

            axios.post("http://localhost/Odr/connections/userConnections/saveConfiguration.php", bodyFormData).then(response => {
                console.log('Response', response)
            }).catch(error => {
                console.log(error)
            })
        },
        logout ({commit}) {
            commit ('setLoading', true)
            console.log('logout')
            firebase.auth().signOut().then(response => {
                router.replace('login')
                commit ('clearCurrUser')
                commit ('setLoading', false)
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
