// import Vue from 'vue'
// import Vuex from 'vuex'
// import actions from './actions'
// import mutations from './mutations'
// import Category from '../config/category';
//
// Vue.use(Vuex);
//
// const lists = {};
// const rankIndex = {};
// Category.forEach(category => {
//     lists[category.title] = {};
//     rankIndex[category.title] = [];
// });
//
// export function createStore() {
//     return new Vuex.Store({
//         state: {
//             activeType: null,
//             lists: lists,
//             rankIndex: rankIndex
//         },
//         actions,
//         mutations
//     })
// }

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import api from '../api/request'
import test from './modules/testModule'

Vue.use(Vuex);
axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios;

export function createStore () {
    return new Vuex.Store({
        // modules: {test},
    })
}
