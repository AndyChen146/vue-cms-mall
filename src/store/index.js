import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
// import * as Cookies from 'js-cookie'
import lyf from './modules/lyf'
import lxr from './modules/lxr'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules: {
        lyf,
        lxr
    },
    //同步store到sessionStorage
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })],
    //方案二，同步到Cookies（测试有问题）
    // plugins: [
    //   createPersistedState({
    //     storage: {
    //       getItem: key => Cookies.get(key),
    //       // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
    //       setItem: (key, value) =>
    //         Cookies.set(key, value, {
    //           expires: 3,
    //           secure: false
    //         }),
    //       removeItem: key => Cookies.remove(key),
    //     },
    //   }),
    // ],
    strict: debug,
})

export default store