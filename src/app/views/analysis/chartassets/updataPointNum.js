module.exports = function (self) { // 这个js的功能就是更新self.pointnum;
  var timetype = document.getElementsByClassName('selected')[0].getAttribute('data-name') // month
  var datatype = document.getElementsByClassName('selected')[1].getAttribute('data-name') // weight
  // var startdate = document.getElementsByClassName('sed_datetext')[0].getAttribute('data-firstdate') // 起始的日期
  // var enddate = document.getElementsByClassName('sed_datetext')[0].getAttribute('data-lastdate') // 最后的日期

  console.log('当前选择的数据类型是：' + datatype)

  if (timetype === 'week') {
    /** ****************调试用假数据 start******************/

    self.pointnum = [1, 2, 1, 1, 6, 5, 7]
    self.updataSVG(self)

    /** ****************调试用假数据 end******************/
  } else if (timetype === 'month') {
    /** ****************调试用假数据 start***************/

    self.pointnum = [1, 2, 1, 1, 6, 5]
    self.updataSVG(self)

    /** ****************调试用假数据 end******************/
  } else if (timetype === 'year') {
    /** ****************调试用假数据 start******************/

    self.pointnum = [1, 2, 1, 1, 5, 6, 7, 8, 9, 10, 9, 6]
    self.updataSVG(self)

    /** ****************调试用假数据 end******************/
  }
}
