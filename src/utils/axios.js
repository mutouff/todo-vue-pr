import Vue from 'vue'
import axios from 'axios'
import {apiUrl} from './url'
import store from '../store/index'

//创建实例
const service = axios.create({
  baseURL: apiUrl, // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  timeout:55000// `timeout` 指定请求超时的毫秒数(0 表示无超时时间)如果请求话费了超过 `timeout` 的时间，请求将被中断
})