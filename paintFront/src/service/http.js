/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import jsonParse from '@/jsonParse'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = '';


// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (sessionStorage.user) {
             config.headers.authorization = `Basic ${jsonParse.parse(sessionStorage.user).authorization }`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // if (error.response) {
        //     switch (error.response.status) {
        //         case 401:
        //             // 401 清除token信息并跳转到登录页面
        //             router.replace({
        //                 path: 'login',
        //                 query: {redirect: router.currentRoute.fullPath}
        //             })
        //     }
        // }
        // console.log(JSON.stringify(error));
        // console.log(error);
        //console : Error: Request failed with status code 402
        // return Promise.reject(error.response.data)
        // console.log(error)
        return Promise.reject(error.response);
        // console.log(error)
        // return Promise.reject({
        //     ret: 0,
        //     msg: '网络错误'
        // });
    });

export default axios;
