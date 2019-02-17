import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        sagas: [],
        saga: {}
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
        }
    },
    actions: {
        loadSagasInfo ({commit}) {
            axios.post("http://localhost/Odr/connections/getSaga.php").then(response => {
                commit('setSagas', response.data)
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
            axios.post('http://localhost/Odr/connections/getSagaData.php', bodyFormData).then(response => {
                let data = response.data
                console.log("Data", data)
                saga.name = data.infoSaga.tituloSaga
                saga.photoInfo = {thumbnail: data.infoSaga.thumbnailSaga, background: data.infoSaga.backgroundSaga}

                if (Array.isArray(data.infoSaga.categoriasSaga)) {
                    data.infoSaga.categoriasSaga.forEach(element => {
                        saga.categorys.push(element.nomCategoria)
                    });
                }

                if (Array.isArray(data.holders)) {
                    data.holders.forEach(element => {
                        let rutaBase = 'http://localhost/Odr/';
                        let rutaThumbnail = '';
                        if (element.thumbnail) {
                            rutaThumbnail = rutaBase + element.nomCategoria + '/' + element.idScanHolder + '/thumbnail.jpg'
                        }
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

                        console.log("Scans", scans)

                    saga.content.push({
                            idHolder: element.idScanHolder,
                            type: element.nomCategoria,
                            title: element.titleHolder,
                            description: element.descriptionHolder,
                            scans: scans,
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
        }
    }
})
