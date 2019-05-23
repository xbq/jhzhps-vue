import axios from 'axios'
import qs from 'querystring'
import {getlocalStorageItm,savelocalStorageItem} from './common'
import router from '../router';

axios.defaults.timeout = 5000; //设置请求超时
axios.defaults.baseURL = "http://122.225.120.146:8159/jhzhps-back/";

//http request拦截器
axios.interceptors.request.use(
    config=>{
        const token = getlocalStorageItm('access-token');
        config.headers = {
            'Content-Type':'application/x-www-form-urlencoded'
        }
        if(token){
            config.params = {'login-token':token}
        }
        if(config.method === 'post') {
            config.data = qs.stringify(config.data);
          }
          return config;
    },
    err=>{
        return Promise.reject(err);
    }
)

//http response 拦截器
axios.interceptors.response.use(
    response=>{
        if(response.data.errCode == 2){
            router.push({
                path:'/login',
                query:{redirect:router.currentRoute.fullPath}
            })
        }
        return response;
    },
    err=>{
        return Promise.reject(err)
    }
)

/**
 * get请求方法
 *
 * @param {*} url
 * @param {*} [params={}]
 * @returns new Promise
 */
export function get(url,params={}){
    return new Promise((resolve,reject)=>{
        axios.get(url,{params:params}).then(res=>{
            resolve(res);
        })
    }).catch(err=>{
        reject(err)
    });
}

/**
 *post请求方式
 *
 * @param {*} url
 * @param {*} [data={}]
 * @returns
 */
export function post(url,data={}){
    return new Promise((resolve,reject)=>{
        axios.post(url,data).then(res=>{
            resolve(res);
        },err=>{
            reject(err);
        })
    })
}


/**
 *patch请求
 *
 * @param {*} url
 * @param {*} [data={}]
 * @returns
 */
export function patch(url,data={}){
    return new Promise((resolve,reject)=>{
        axios.patch(url,data).then(res=>{
            resolve(res);
        },err=>{
            reject(err);
        })
    })
}


/**
 *put请求
 *
 * @param {*} url
 * @param {*} [data={}]
 * @returns
 */
export function put(url,data={}){
    return new Promise((resolve,reject)=>{
        axios.put(url,data).then(res=>{
            resolve(res);
        },err=>{
            reject(err);
        })
    })
}



