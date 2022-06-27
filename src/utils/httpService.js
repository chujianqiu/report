import axios from 'axios'
import config from '../../config/index'
window.isRefreshing = false


// create an axios instance
const httpService = axios.create({
    baseURL: config.BASE_URL, // api 的 base_url
    timeout: 120000, // request timeout
})

// request interceptor
httpService.interceptors.request.use(
    // Do something before request is sent
    config => {
        if (config.headers['Content-Type'] == 'application/x-www-form-urlencoded') {
            config.headers['Authorization'] = 'Bearer ';
            config.headers['RestoreTokenId'] = localStorage.getItem('accessToken')|| '';

        } else {
            config.headers['Content-Type'] = 'application/json';
            config.headers['RestoreTokenId'] = localStorage.getItem('accessToken')|| '';
        }
        return config
    },
    error => {
        // Do something with request error
        Promise.reject(error)
    }
)

// response interceptor
httpService.interceptors.response.use(
    response => {
        if ((response.status === 200) && (response.data.code === 'refreshTokenExpire')) {
            return response
        } else if (response.status === 200) {
            return response.data
        } else {
            return Promise.reject('error')
        }
    }, (error) => {
        return Promise.reject(error)
    })

export default httpService
