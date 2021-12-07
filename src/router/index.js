// import { info } from 'node-sass'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: ()=>import('@/views/login.vue'),
        meta: {
            title: '登录界面'
        }
    },
    {
        path: '/',
        name: 'home',
        component: ()=>import('@/views/home.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '*',//匹配所有路径
        redirect: '/'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router