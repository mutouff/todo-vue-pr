import Vue from 'vue'
import Vuex from 'vuex'
import userInfo  from './modules/userInfo'
import createPersistedState from 'vuex-persistedstate'
import { setTimeout } from 'core-js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        userInfo
    },
    getters: {
        isLogined: state => {
            return state.userInfo.isLogined
        }
    },
    plugins: [createPersistedState({
        key: 'store',
        storage: window.localStorage
    })]
})