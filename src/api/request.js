import axios from 'axios';
import urls from './urls'


const request = axios.create();

let isRefreshing = false;
let failedQueue = [];

    const processQueue = (error, token = null) => {
        failedQueue.forEach(prom => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        })

        failedQueue = [];
    }

request.interceptors.response.use(function (response) {
        return response;
    }, function (error) {

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {

            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({resolve, reject})
                }).then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return axios(originalRequest);
                }).catch(err => {
                    return err
                })
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = window.localStorage.getItem('refreshToken');
            return new Promise(function (resolve, reject) {
                request.post(urls.refresh_token, { refreshToken })
                    .then(({data}) => {
                        window.localStorage.setItem('token', data.token);
                        window.localStorage.setItem('refreshToken', data.refreshToken);
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
                        originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
                        processQueue(null, data.token);
                        resolve(axios(originalRequest));
                    })
                    .catch((err) => {
                        processQueue(err, null);
                        reject(err);
                    })
                    .then(() => { isRefreshing = false })
            })
        }

        return Promise.reject(error);
    });
export default request;
