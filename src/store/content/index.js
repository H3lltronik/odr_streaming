import axios from 'axios'
import * as firebase from 'firebase'

export default({
    state: {
        sagas: [],
        saga: {},
        categorys: [],
        tags: [],
    },
    mutations: {
        setSagaData (state, payload) {
            state.saga = {...payload}
            console.log("state.saga", state.saga)
        },
        setSagas (state, payload) {
            payload.forEach(element => {
                state.sagas.push(element)
            });
        },
        setCategorys (state, payload) {
            payload.forEach(element => {
                state.categorys.push(element)
            });
        },
        setTags (state, payload) {
            state.tags = payload
        },
        clearSagas (state) {
            state.sagas = []
        }
    },
    actions: {
        loadSagasInfo ({commit}) {
            commit('clearSagas')
            axios.post("http://localhost/Odr/connections/streamingContent/getSaga.php").then(response => {
                commit('setSagas', response.data)
            })
        },
        loadCategorys ({commit}) {
            axios.post("http://localhost/Odr/connections/streamingContent/getCategorys.php").then(response => {
                commit('setCategorys', response.data)
            })
        },
        loadSagaData ({commit, getters}, urlSaga) {
            commit('clearSagas')
            let bodyFormData = new FormData()
            let saga = {
                urlSaga: urlSaga,
                name: '',
                photoInfo: {},
                categorys: [],
                content: []
            }
            bodyFormData.set('urlSaga', urlSaga)
            console.log('idSaga', urlSaga)
            axios.post('http://localhost/Odr/connections/streamingContent/getSagaContent.php', bodyFormData).then(response => {
                let data = response.data
                console.log("Data ACA XD", data)
                saga.name = data.TituloSaga
                saga.photoInfo = {thumbnail: data.ThumbnailSaga, background: data.BackgroundSaga}

                //Obtener categorias
                let categs = []
                if (Array.isArray(data.categorias)) {
                    data.categorias.forEach(elementCategs => {
                        categs.push(elementCategs.NombreCategoria)
                    });
                }
                saga.categorys = categs
                console.log("categs", categs)

                if (Array.isArray(data.holders)) {
                    data.holders.forEach(element => {
                        let rutaBase = 'http://localhost/Odr/';
                        let rutaThumbnail = '';
                        rutaThumbnail = rutaBase + element.NombreCategoria + '/' + element.URLHolder + '/thumbnail.jpg'
                        //obtener tags
                        let tagsT = []
                        if (Array.isArray(element.tags)) {
                            element.tags.forEach(elementTag => {
                                tagsT.push(elementTag.NombreTag)
                            });
                        }
                        //Obtener scans
                        let contenidos = []
                        let contContenidos = 0
                        
                        if (Array.isArray(element.contenidos)) {
                            element.contenidos.forEach(elementContenidos => {
                                elementContenidos.thumbnail = rutaBase + element.NombreCategoria + "/" + 
                                    element.URLHolder + "/" + elementContenidos.URLContenido + "/thumbnail.jpg"
                                contenidos.push(elementContenidos)
                            });
                        }

                        // Obtener personajes
                        let personajes = []
                        if (Array.isArray(element.personajes)) {
                            element.personajes.forEach(elementPersonajes => {
                                elementPersonajes.thumbnail = rutaBase + "/Characters/" + elementPersonajes.urlpersonaje + "/profile.jpg"
                                personajes.push(elementPersonajes)
                            });
                        }

                        // Incluir todo los elementos sacados anteriormente
                        saga.content.push({
                            IdHolder: element.IdHolder,
                            name: element.TituloHolder,
                            Descripcion: element.DescripcionHolder,
                            content: contenidos,
                            thumbnail: rutaThumbnail,
                            type: element.NombreCategoria,
                            url: element.URLHolder,
                            Tags: tagsT,
                            Personajes: personajes
                        })
                    });
                }

                console.log("Contenido:", saga)
                commit('setSagaData', saga)
            })
        },loadTags ({commit}) {
            axios.post('http://localhost/Odr/connections/streamingContent/creating/getAllTags.php').then(response => {
                let data = response.data
                let tags = []
                data.forEach(element => {
                    tags.push(element)
                });
                commit('setTags', tags)
            }).catch(error => {
                console.log(error)
            })
        }
    },
    getters: {
        getSagaData (state) {
            return state.saga
        },
        getSagas (state) {
            return state.sagas
        },
        getCategorys (state) {
            return state.categorys
        },
        getTags (state) {
            return state.tags
        },
    }
})
