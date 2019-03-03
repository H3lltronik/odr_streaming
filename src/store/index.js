import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as firebase from 'firebase'

import Content from './content'
import User from './user'
import Shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        content: Content,
        user: User,
        shared: Shared
    }
})
