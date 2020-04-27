// 备注：兼容替换fetch封装的http请求
import axios from 'axios'
import qs from 'qs'


const http = (function (self) {
    return {
        CancelToken: axios.CancelToken,
        interceptors: axios.interceptors,
        GET: function (url, params = {}, options) {
            // 处理请求配置
            let newOptions = {
                url,
                // `params` 是即将与请求一起发送的 URL 参数
                // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
                params,
                method: 'get'
            }
            if (typeof options !== 'undefined') {
                newOptions = {
                    ...newOptions,
                    ...options
                }
            }
            return new Promise((resolve, reject) => {
                axios.request(newOptions).then(response => {
                    // 模拟fetch请求返回结果的json()方法
                    response.json = function () {
                        return new Promise((resolve, reject) => {
                            if (response.status > 400) {
                                reject(response)
                            } else {
                                resolve(response.data)
                            }
                        })
                    }
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        POST: function (url, params = {}, options) {
            // 处理请求配置
            let newOptions = {
                url,
                // `data` 是作为请求主体被发送的数据
                data: params,
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            if (typeof options !== 'undefined') {
                // 根据请求头的改变修改传参的数据格式
                if (options['headers'] && options['headers']['Content-Type'] === 'application/x-www-form-urlencoded;charset=utf-8') {
                    newOptions.data = qs.stringify(newOptions.data)
                }
                newOptions = {
                    ...newOptions,
                    ...options
                }
            }
            return new Promise((resolve, reject) => {
                axios.request(newOptions).then(response => {
                    // 模拟fetch请求返回结果的json()方法
                    response.json = function () {
                        return new Promise((resolve, reject) => {
                            if (response.status > 400) {
                                reject(response)
                            } else {
                                resolve(response.data)
                            }
                        })
                    }
                    resolve(response)
                }).catch(err => {
                    console.error(err)
                    reject(err)
                })
            })
        },
        ALL: function (axioss) {
            return new Promise((resolve, reject) => {
                axios.all(axioss).then(response => {
                    resolve()
                }).catch(err => {
                    console.error(err)
                    reject(err)
                })
            })
        }
    }
})(this);


export default http;