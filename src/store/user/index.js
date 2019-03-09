import axios from 'axios'
import router from '../../router'
import * as firebase from 'firebase'
import moment from 'moment'

export default({
    state: {
        user: {},
        manualLogin: false,
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
        },
        setManualLogin (state, payload) {
          state.manualLogin = payload
        }
    },
    actions: {
        googleSignIn ({commit, getters}) {
            commit ('setManualLogin', true)
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

            }).catch(error => {
                console.log(error)
                commit ('setLoading', false)
            })
        },
        facebookSignIn ({commit, getters, state}) {
          commit ('setManualLogin', true)
            let provider = new firebase.auth.FacebookAuthProvider()
            provider.setCustomParameters({
                'display': 'popup'
            });

            firebase.auth().signInWithPopup(provider).then(response => {
                console.log("Facebook login")
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

                // Aqui estaba el query a saveUser.php pero por el estado del auth firebase lo puse en donde
                // este cambia
            }).catch(error => {

            })
        },
        autoSignIn ({commit, dispatch, state}, payload) {
            if (payload) {
                let bodyFormData = new FormData ()
                commit ('clearCurrUser')
                //Asignar a user sus variables
                let user = {
                    id: '',
                    email:''
                }
                user.id = payload.uid
                user.email = payload.email
                commit('setUserData', user)

                let hora = moment().format('YYYY-MM-DD')
                bodyFormData.set('hora', hora)

                bodyFormData.set('userId', user.id)
                bodyFormData.set('userEmail', user.email)

                // Como siempre al iniciar sesion manualmente o al cerrar y abrir la pestaña cambia el estado
                // del auth firebase pues llamo aca al metodo de save
                axios.post("http://localhost/Odr/connections/userConnections/saveUser.php", bodyFormData).then(response => {
                    dispatch('fetchUserConfiguration')
                    commit ('setLoading', false)
                }).catch(error => {
                    console.log(error)
                    dispatch('fetchUserConfiguration')
                    router.push('/')
                    commit ('setLoading', false)
                })
                console.log("STATE",state.user)
            }
        },
        // Llena el objeto configuration de user
        fetchUserConfiguration ({getters, commit}) {
            console.log("SI PUSE USER, MIERDA")
            let bodyFormData = new FormData ()

            let user = getters.getUserData
            bodyFormData.set('userId', user.id)
            axios.post("http://localhost/Odr/connections/userConnections/getUserConfig.php", bodyFormData).then(response => {
                let data = response.data
                commit('setUserConfig', data)
                console.log("DATA USER", data)
                if (data.response == "error" || data.ConfiguracionInicial == '0') {
                    router.push("/profileConfiguration")
                } else if (data.response != "error" && data.ConfiguracionInicial != '0' && getters.getManualLogin){
                    router.push("/")
                }
                commit ('setManualLogin', false)
            }).catch(error => {

                console.log(error)
            })
        },
        saveUserConfiguration ({commit, getters}) {
            let bodyFormData = new FormData ()
            commit ('setLoading', true)

            let user = {...getters.getUserData}
            let image = user.configuration.imagen
            user.configuration.id = user.id
            user.configuration.configInicial = 1

            user.configuration.base64 = image.substr(image.indexOf(',') + 1)

            console.log('user', user.configuration)
            bodyFormData.set('configuration', JSON.stringify(user.configuration))

            axios.post("http://localhost/Odr/connections/userConnections/saveConfiguration.php", bodyFormData).then(response => {
                alert("Actualizado correctamente")
                commit ('setLoading', false)
            }).catch(error => {
                commit ('setLoading', false)
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
        },
        getUserConfig (state) {
            return state.user.configuration
        },
        getManualLogin (state){
          return state.manualLogin
        }

    }
})
