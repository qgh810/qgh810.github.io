;(function () {
  // 动作输出方法
  var write = function (str) {
    var output = document.getElementsByClassName('output-container')[0]
    if (!output) return console.warn('找不到输出容器')
    output.innerHTML += str + '<br>'
  }

  // 定义Human类
  function _Human (name) {
    if (!name) return console.warn('名字未定义')
    this.name = name
    this.init()
    this.hi()
  }

  // 初始化
  _Human.prototype.init = function () {
    // 存放动作队列的变量
    this.steps = []
    // 执行完成的回调函数初始化
    this.onEndCallBack = function () {}
  }

  // 执行动作队列
  _Human.prototype.play = function () {
    // 函数节流
    window.clearTimeout(this.tid)
    this.tid = setTimeout(function () {
      // 获取当前第一个动作
      var currentStep = this.steps.shift()
      if (currentStep) {
        // 若动作队列有待执行动作 则执行动作并递归
        return currentStep(this.play.bind(this))
      } else {
        // 若动作队列已清空则调用结束回调函数
        this.onEndCallBack && this.onEndCallBack()
        this.init()
      }
    }.bind(this))
  }

  // 方法: 说你好
  _Human.prototype.hi = function () {
    // 向动作队列添加待执行方法
    this.steps.push(function (fn) {
      write('你好，' + this.name + '！')
      fn()
    }.bind(this))
    this.play()
    return this
  }

  // 方法: 睡觉
  _Human.prototype.sleep = function (s) {
    // 向动作队列添加待执行方法
    this.steps.push(function (fn) {
      write('休息' + s + '秒..')
      setTimeout(fn, s * 1000)
    }.bind(this))
    this.play()
    return this
  }

  // 方法: 吃东西
  _Human.prototype.eat = function (food) {
    // 向动作队列添加待执行方法
    this.steps.push(function (fn) {
      write(this.name + '吃了' + food)
      fn()
    }.bind(this))
    this.play()
    return this
  }

  // 方法: 首次休息
  _Human.prototype.sleepFirst = function (s) {
    // 在动作队列最前面插入待执行方法
    this.steps.unshift(function (fn) {
      write('开始等待' + s + '秒..')
      setTimeout(fn, s * 1000)
    }.bind(this))
    this.play()
    return this
  }

  // 注册结束回调
  _Human.prototype.onEnd = function (fn) {
    if (typeof fn === 'function') this.onEndCallBack = fn
    return this
  }

  window.Human = function (name) { return new _Human(name) }
})();