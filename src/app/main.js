import Vue from 'vue'
import VueRouter from 'vue-router'
import configRouter from './config-router'
import * as directives from './directives'
import i18n from 'vue-i18n'
import browser from './helpers/browser'
import locales from './consts/locales/index'
var App = Vue.extend(require('./App.vue'))
// // 加载路由插件
Vue.use(VueRouter)
Vue.config.debug = true

// 加载多语言插件
// 详见：https://github.com/kazupon/vue-i18n
console.log(browser)
Vue.use(i18n, {
  // 根据浏览器语言自动进行语言切换
  lang: browser.language.slice(0, 2),
  locales: locales
})

// 加载自定义指令
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
