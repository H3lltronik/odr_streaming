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
                console.log("Data", data)
                saga.name = data.TituloSaga
                saga.photoInfo = {thumbnail: data.ThumbnailSaga, background: data.BackgroundSaga}

                if (Array.isArray(data.holders)) {
                    console.log("WARD", data.holders)
                    data.holders.forEach(element => {
                        let rutaBase = 'http://localhost/Odr/';
                        let rutaThumbnail = '';
                        rutaThumbnail = rutaBase + element.nomCategoria + '/' + element.idScanHolder + '/thumbnail.jpg'
                        //obtener tags
                        let tagsT = []
                        element.tags.forEach(elementTag => {
                            tagsT.push(elementTag.nombretag)
                        });
                        //Obtener scans
                        let scans = []
                        let contScans = 0
                        element.scans.forEach(elementScan => {
                            let urlThumbnail = rutaBase + elementScan.nomCategoria + "/" + elementScan.idScanHolder + "/" + elementScan.rutaScans
                            scans.push({
                                idHolder: elementScan.idScanHolder,
                                idScan: elementScan.idScans,
                                title: elementScan.tituloScans,
                                folder: elementScan.rutaScans,
                                urlThumbnail: urlThumbnail,
                                tags: [],
                                nPages: elementScan.nPaginas,
                                type: elementScan.nomCategoria
                            })
                            if (elementScan.tags !== undefined && elementScan.tags !== null) {
                              console.log("Element scan", elementScan.tags)
                              if (Array.isArray(elementScan.tags)) {
                                elementScan.tags.forEach(elementTagScan => {
                                  scans[contScans].tags.push(elementTagScan)
                                })
                              }
                            }
                            contScans++;
                        });

                        // Obtener personajes
                        let characters = []
                        element.characters.forEach(elementChar => {
                            characters.push({
                                id: elementChar.idPersonaje,
                                name: elementChar.nomPersonaje,
                                thumbnail: "http://localhost/Odr/Characters/" + elementChar.idPersonaje + "/profile.jpg"
                            })
                        });
                        // Incluir todo los elementos sacados anteriormente
                        saga.content.push({
                            idHolder: element.idScanHolder,
                            type: element.nomCategoria,
                            title: element.titleHolder,
                            description: element.descriptionHolder,
                            scans: scans,
                            characters: characters,
                            tags: tagsT,
                            thumbnail: rutaThumbnail
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
