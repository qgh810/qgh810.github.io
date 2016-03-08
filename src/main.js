import Vue from 'vue'
import VueRouter from 'vue-router'
import configRouter from './config-router'
import * as directives from './directives'
var App = Vue.extend({})

// // 加载路由插件
Vue.use(VueRouter)

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})

// 定义路由
var router = new VueRouter({
  // history: true,
  // saveScrollPosition: true
})

configRouter(router)

// 启动路由
router.start(App, '#app')
