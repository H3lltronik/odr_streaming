import axios from 'axios'
import * as firebase from 'firebase'

export default({
    state: {
        sagas: [],
        saga: {},
        categorys: []
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
        }
    },
    actions: {
        loadSagasInfo ({commit}) {
            axios.post("http://localhost/Odr/connections/streamingContent/getSaga.php").then(response => {
                commit('setSagas', response.data)
            })
        },
        loadCategorys ({commit}) {
            axios.post("http://localhost/Odr/connections/getCategorys.php").then(response => {
                commit('setCategorys', response.data)
            })
        },
        loadSagaData ({commit, getters}, idSaga) {
            let bodyFormData = new FormData()
            let saga = {
                idSaga: idSaga,
                name: '',
                photoInfo: {},
                categorys: [],
                content: []
            }
            bodyFormData.set('idSaga', idSaga)
            console.log(idSaga)
            axios.post('http://localhost/Odr/connections/streamingContent/getSagaContent.php', bodyFormData).then(response => {
                let data = response.data
                console.log("Data ACA XD", data)
                saga.name = data.TituloSaga
                saga.photoInfo = {thumbnail: data.ThumbnailSaga, background: data.BackgroundSaga}

                //Obtener categorias
                let categs = []
                data.categorias.forEach(elementCategs => {
                    categs.push(elementCategs.NombreCategoria)
                });
                saga.categorys = categs
                console.log("categs", categs)

                if (Array.isArray(data.holders)) {
                    data.holders.forEach(element => {
                        let rutaBase = 'http://localhost/Odr/';
                        let rutaThumbnail = '';
                        rutaThumbnail = rutaBase + element.NombreCategoria + '/' + element.URLHolder + '/thumbnail.jpg'
                        //obtener tags
                        let tagsT = []
                        element.tags.forEach(elementTag => {
                            tagsT.push(elementTag.NombreTag)
                        });
                        //Obtener scans
                        let contenidos = []
                        let contContenidos = 0
                        element.contenidos.forEach(elementContenidos => {
                            elementContenidos.thumbnail = rutaBase + element.NombreCategoria + "/" + 
                                element.URLHolder + "/" + elementContenidos.URLContenido + "/thumbnail.jpg"
                            contenidos.push(elementContenidos)
                        });

                        // Obtener personajes
                        let personajes = []
                        element.personajes.forEach(elementPersonajes => {
                            elementPersonajes.thumbnail = rutaBase + "/Characters/" + elementPersonajes.urlpersonaje + "/profile.jpg"
                            personajes.push(elementPersonajes)
                        });

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
    }
})
