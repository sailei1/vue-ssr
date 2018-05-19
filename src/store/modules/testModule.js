/**
 * Created by zhangsailei on 2018/5/18.
 */
import axios from 'axios';
export default {
    namespaced: true,
    state: {
        server_text:'',
        test:0,
    },
    getters:{
        getText(state){
            return state.server_text;
        },
        getTest(state){
            return state.test;
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
        },
        getServerDataByMethod({ commit }) {
            return axios.get('http://127.0.0.1:9999/detail').then((res) => {
                // console.log('cache',res.data.cache);
                commit('setTest', res.data.itemInfo.text);
            })
        }

    },
    mutations: {
        setText (state, text) {
            state.server_text = text;
        },
        setTest (state, test) {
            state.test = test;
        }
    }
}
