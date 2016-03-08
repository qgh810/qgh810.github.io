import browser from './shared/js/browser'

console.log(browser)

var configRouter = function (router) {
  router.map({

    // 404页面
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

  router.redirect({
    '/': '/index'
  })

  // router.beforeEach(function (transition) {
  //   console.log(router.redirect)
  //   transition.next()
  // })
}

module.exports = configRouter
