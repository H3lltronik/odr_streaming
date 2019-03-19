import axios from 'axios'
import * as firebase from 'firebase'

export default({
    state: {
        sagasBuscador: [],
        holdersBuscador: [],
        personajesBuscador: [],
    },
    mutations: {
        setBuscadorSagas (state, payload) {
            state.sagasBuscador = payload
        },
        setBuscadorHolders (state, payload) {
            state.holdersBuscador = payload
        },
        setBuscadorPersonajes (state, payload) {
            state.personajesBuscador = payload
        }
    },
    actions: {
        loadBuscadorData ({commit}) {
            axios.post('http://localhost/Odr/connections/streamingContent/buscador/getAll.php').then(response => {
                console.log("response buscador",response.data)
                let data = response.data
                let sagas = []
                let holders = []
                let personajes = []
                // Añadiendo sagas
                sagas.push({header: 'Sagas'})
                if (Array.isArray(data.sagas)) {
                    data.sagas.forEach(elementSagas => {
                        sagas.push({
                            thumbnail: elementSagas.ThumbnailSaga,
                            titulo: elementSagas.TituloSaga,
                            url: elementSagas.URLSaga,
                            type: 'Saga',
                        })       
                    });
                }
                // Añadiendo holders
                holders.push({header: 'Holders'})
                if (Array.isArray(data.holders)) {
                    data.holders.forEach(elementHolders => {
                        holders.push({
                            thumbnail: 'http://localhost/Odr/' + elementHolders.NombreCategoria + '/' + elementHolders.URLHolder + '/' + 'thumbnail.jpg',
                            titulo: elementHolders.TituloHolder,
                            url: elementHolders.URLSaga + '/' + elementHolders.URLHolder,
                            type: elementHolders.NombreCategoria,
                        })       
                    });
                }
                // Añadiendo personajes
                personajes.push({header: 'Personajes'})
                if (Array.isArray(data.personajes)) {
                    data.personajes.forEach(elementPersonajes => {
                        personajes.push({
                            thumbnail: 'http://localhost/Odr/Characters/' + elementPersonajes.URLPersonaje + '/' + 'profile.jpg',
                            titulo: elementPersonajes.NombrePersonaje,
                            url: elementPersonajes.URLPersonaje,
                            type: 'Character',
                        })       
                    });
                }
                console.log("Buscador data", sagas, holders, personajes)
                commit('setBuscadorSagas', sagas)
                commit('setBuscadorHolders', holders)
                commit('setBuscadorPersonajes', personajes)
            }).catch(error => {

            })
        }
    },
    getters: {
        getBuscadorSagas (state) {
            return state.sagasBuscador
        },
        getBuscadorHolders (state) {
            return state.holdersBuscador
        },
        getBuscadorPersonajes (state) {
            return state.personajesBuscador
        }
    }
})
