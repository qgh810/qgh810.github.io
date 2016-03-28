import browser from './browser'

const SDK = {
  // Android 容器暴露给 JSSDK 的对象名称，默认为 Xlink
  androidObjName: 'xLinkBLE',

  // iOS 容器自定义协议名称，默认为 ios
  customProtocolScheme: 'ios',

  /**
   * 配置
   * @param  {Object} params 参数 {[androidObjName], [customProtocolScheme]}
   */
  config (params) {
    params = params || {}
    this.androidObjName = params.androidObjName || 'Xlink'
    this.customProtocolScheme = params.customProtocolScheme || 'ios'
  },

  /**
   * 触发事件
   * @param  {String}   name   事件名称
   * @param  {Object}   params 参数
   * @param  {Function} fn     回调函数
   */
  fire (name, params, fn) {
    var timestamp = new Date().getTime()
    var callbackName = name + '_callback' + timestamp
    if (typeof params === 'function') {
      fn = params
      params = {}
    }
    window[callbackName] = fn

    if (browser.versions.ios) {
      // console.log(this.customProtocolScheme + '://' + name + str + '?' + callbackName)
      if (!Object.keys(params).length) {
        window.location = this.customProtocolScheme + '://' + name + '?' + callbackName
      } else {
        window.location = this.customProtocolScheme + '://' + name + '?' + JSON.stringify(params) + '?' + callbackName
      }
    } else if (browser.versions.android) {
      if (!Object.keys(params).length) {
        window[this.androidObjName][name](callbackName)
      } else {
        window[this.androidObjName][name](JSON.stringify(params), callbackName)
      }
    }
    return this
  },

  /**
   * 监听事件
   * @param  {String}   name   事件名称
   * @param  {Function} fn     回调函数
   */
  on (name, fn) {
    window[name] = fn
    return this
  }
}

export default SDK
