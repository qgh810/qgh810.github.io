
var configRouter = function (router) {
  router.map({
    '*': {
      component: require('./views/no-found.vue')
    },

    '/index': {
      component: require('./views/index.vue')
    },

    // 测试页面1
    '/test1': {
      component: require('./views/test1.vue')
    },

    // 测试页面2
    '/test2': {
      component: require('./views/test2.vue')
    }
  })

  // 重定向
  router.redirect({
    '/': '/index'
  })
}

module.exports = configRouter
