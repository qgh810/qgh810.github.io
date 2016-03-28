/**
 * 检测当前浏览器的内核、语言等
 * @type {Object}
 */

export default {
  // 浏览器的内核
  versions: (function () {
    var ua = navigator.userAgent
    return {
      trident: ua.indexOf('Trident') > -1, // IE内核
      presto: ua.indexOf('Presto') > -1, // opera内核
      webKit: ua.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!ua.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, // android终端或者uc浏览器
      iPhone: ua.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: ua.indexOf('iPad') > -1, // 是否iPad
      webApp: ua.indexOf('Safari') === -1, // 是否web应用程序，没有头部与底部
      weixin: ua.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
      qq: ua.match(/\sQQ/i) === ' qq' // 是否QQ
    }
  })(),

  // 浏览器语言
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
