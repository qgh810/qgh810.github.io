/**
 * 当前div的滚动条滚动到底部事件
 * @param  {Function} fn 到底的回调时间
 * @return {[type]}      [description]
 */
export var scrollbottom = function (fn) {
  this.el.addEventListener('scroll', function (e) {
    var box = this
    var doms = box.childNodes
    var domsHeight = 0
    for (var i = 0; i < doms.length; i++) {
      if (doms[i].nodeName !== '#text') {
        domsHeight += doms[i].clientHeight
      }
    }
    if (box.scrollTop >= domsHeight - box.clientHeight) {
      fn()
    }
  }, false)
}

/**
 * 当前dom高度自动变化 下方剩余多少空间高度自动撑满
 * 注意次dom下面不能再有文档流中的dom 否则将被挤到页面可视区域的下方
 * @param  {Function} fn 到底的回调时间
 * @return {[type]}      [description]
 */
export var heightauto = function () {
  var dom = this.el
  setTimeout(function () {
    dom.style.height = (window.innerHeight - dom.offsetTop) + 'px'
  }, 0)
}
