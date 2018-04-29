import axios from 'axios'
import qs from 'qs'
import md5 from 'md5'
import {createAPI} from './config-server.js'

let  api={
    post(url, data) {
        const key = md5(url + JSON.stringify(data))
        if (createAPI.cached && createAPI.cached.has(key)) {
            return Promise.resolve(createAPI.cached.get(key))
        }
        return axios({
            method: 'post',
            url: createAPI.api + url,
            data: qs.stringify(data),
        }).then(res => {
            if (createAPI.cached && data.cache) createAPI.cached.set(key, res)
            return res
        })
    }
}
export default api;