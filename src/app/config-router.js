
var configRouter = function (router) {
  router.map({

    // 404页面
    '*': {
      component: require('../shared/views/not-found.vue')
    },

    // 主界面 设备选择页
    '/index': {
      component: require('./views/devices/index.vue')
    },
    // 添加设备
    'devices/add': {
      component: require('./views/devices/add.vue')
    },
    // 添加设备的列表页
    'devices/add/:deviceType': {
      component: require('./views/devices/addDeviceList.vue')
    },
    // 体脂秤主页
    'devices/fatScale': {
      component: require('./views/devices/fatScale.vue')
    },
    // bmi秤主页
    'devices/bmi': {
      component: require('./views/devices/bmi.vue')
    },

    // 分析
    '/analysis': {
      component: require('./views/analysis/analysis.vue')
    },
    // 历史
    '/analysis/history': {
      component: require('./views/analysis/history.vue')
    },
    // 单日数据
    '/analysis/history/:date': {
      component: require('./views/analysis/daydata.vue')
    },
    // 图表分析
    '/analysis/chart': {
      component: require('./views/analysis/chart.vue')
    },

    // 计划
    '/plan': {
      component: require('./views/plan/plan.vue')
    },
    // 添加计划
    '/plan/add': {
      component: require('./views/plan/add.vue')
    },
    // 编辑计划
    '/plan/:id': {
      component: require('./views/plan/edit.vue')
    },

    // 设置
    '/setting': {
      component: require('./views/setting/setting.vue')
    },
    // 单位设置
    '/setting/unit': {
      component: require('./views/setting/unit.vue')
    },
    // 用户设置
    '/setting/user': {
      component: require('./views/setting/user.vue')
    },
    // 新增用户
    '/setting/user/add': {
      component: require('./views/setting/adduser.vue')
    },
    // 编辑用户
    '/setting/user/:id': {
      component: require('./views/setting/edituser.vue')
    },
    // 设备列表
    '/setting/devices': {
      component: require('./views/setting/devices.vue')
    },

    // 个人信息
    '/personalInfo': {
      component: require('./views/personalInfo/personalInfo.vue')
    }

  })
  if (window.localStorage.firstEntry) {
    router.redirect({
      '/': '/index'
      // '/': '/personalInfo'
    })
  } else {
    router.redirect({
      '/': '/personalInfo'
    })
  }

  // router.beforeEach(function (transition) {
  //   console.log(router.redirect)
  //   transition.next()
  // })
}

module.exports = configRouter
