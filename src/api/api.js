import httpService from '@/utils/httpService'
export function getWxJsapiSignature(params){
    return httpService({
        url: '/WeiXin/getWxJsapiSignature',
        method: 'get',
        params,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'token':'73C9D0CECA7B71B00C99FC58364AD79E'
        }
    })
}
export function getShareToken(params) {
    return httpService({
        url: '/auth/getRestoredShareToken',
        method: 'post',
        data:params
    })
}
