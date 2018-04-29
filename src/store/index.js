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
import api from '../api/request'

Vue.use(Vuex)

export function createStore () {
    return new Vuex.Store({
        state: {
            server_text:''
        },
        getters:{
            getText(state){
                return state.server_text;
            }
        },
        actions: {
            getServerData({ commit }) {
                // return api.post('http://127.0.0.1:9999/detail',{cache: true}).then((res) => {
                //缓存问题  没有解决
                return axios.get('http://127.0.0.1:9999/detail').then((res) => {
                    // console.log('cache',res.data.cache);
                    commit('setText', res.data.itemInfo.text);
                })
            }
        },
        mutations: {
            setText (state, text) {
                state.server_text = text;
            }
        }
    })
}
