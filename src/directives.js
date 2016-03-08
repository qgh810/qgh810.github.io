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
