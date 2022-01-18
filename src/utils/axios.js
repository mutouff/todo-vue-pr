import Vue from 'vue'
import axios from 'axios'
import {apiUrl} from './url'
import store from '../store/index'

//创建实例
const service = axios.create({
  baseURL: apiUrl, // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  timeout:55000// `timeout` 指定请求超时的毫秒数(0 表示无超时时间)如果请求话费了超过 `timeout` 的时间，请求将被中断
})

service.interceptors.request.use(config=>{
  if(store.state.userInfo.data.token){
    config.headers['authorization'] = store.state.userInfo.data.token  // `headers` 是即将被发送的自定义请求头
  }
  return config
},error=>{
  Promise.reject(error)
})

service.interceptors.response.use(async response=>{
  console.log(response.data)
  if(response.data.code == 401 || response.data.code == 403){
    await store.dispatch('userInfo/logout')
    location.reload()
  }
  return response.data
},async error=>{
  const { status } = error.response
  if(status === 401 || status === 403){
    Vue.prototype.$message.error({
      content: "token失效，或长时间未操作，请重新登录",
      duration: 5
    })
    await store.dispatch('userInfo/logout')
    location.reload()
  }else {
    Vue.prototype.$message.error({
      content: "网络异常，请稍后再试",
      duration: 5
    })
  }
  return Promise.reject(error)
})

export default service

