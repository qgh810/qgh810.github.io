
var configRouter = function (router) {
  router.map({

    // 404页面
    '*': {
      component: require('../shared/views/not-found.vue')
    },
    // 测试页面
    // '/test': {
      // component: require('./views/test.vue')
    // },

    // 主界面
    '/index': {
      component: require('./views/index/index.vue')
    },

    // 笔记
    '/note': {
      component: require('./views/note/index.vue')
    },

    // 收藏
    '/collection': {
      component: require('./views/collection/index.vue')
    },

    // 生活
    '/life': {
      component: require('./views/life/index.vue')
    },

    // 关于
    '/about': {
      component: require('./views/about/index.vue')
    }

  })
  // alert(window.localStorage.firstEntry)
  router.redirect({
    '/': '/index'
    // '/': '/personalInfo'
  })

  // router.beforeEach(function (transition) {
  //   console.log(router.redirect)
  //   transition.next()
  // })
}

module.exports = configRouter
