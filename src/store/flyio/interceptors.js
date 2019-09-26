const Fly = require('flyio/dist/npm/fly')
const request = new Fly()
import {
    MessageBox,
    Message
} from 'element-ui';
import router from '../../router'

request.interceptors.request.use((request) => {
    // if (window.localStorage.getItem('token') && window.localStorage.getItem('token_type')) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    //   request.headers.Authorization = window.localStorage.getItem('token_type') + ' ' + window.localStorage.getItem('token')
    // } else {
    //   request.headers.Authorization = ''
    // }
    if (window.localStorage.getItem('token')) { //给已登录的所有请求加上  token 及  language_id
        request.headers['x-token'] = window.localStorage.getItem('token')
        request.headers.language_id = '1'
    }
    return request
})

request.interceptors.response.use(
    (response, promise) => {
        // console.log('1')
        return promise.resolve(response.data)
    },
    (err, promise) => {
        // console.log(err)
        if (err.response) {
            switch (err.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    localStorage.removeItem('RECRUIT');
                    localStorage.removeItem('token');
                    // console.log('身份过期')

                    // MessageBox.alert('身份信息已过期，请重新登录', '提示', {
                    //   confirmButtonText: '确定',
                    //   callback: action => {
                    //     router.replace({
                    //       path: '/login'
                    //       // query: {
                    //       //   redirect: router.currentRoute.fullPath
                    //       // }
                    //     })
                    //   }
                    // });
                    Message({
                        showClose: true,
                        message: '身份信息已过期，请重新登录',
                        type: 'warning'
                    });
                    router.replace({
                        path: '/login'
                    })
            }
        }
        return promise.reject(err)
    }
)
export default request