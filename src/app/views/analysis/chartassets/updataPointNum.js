import api from '../../../api'
console.log(api)
module.exports = function (self) { // 这个js的功能就是更新self.pointnum;
  var timetype = document.getElementsByClassName('selected')[0].getAttribute('data-name') // month
  var datatype = document.getElementsByClassName('selected')[1].getAttribute('data-name') // weight
  var startDate = document.getElementsByClassName('sed_datetext')[0].getAttribute('data-firstdate') // 起始的日期
  var endDate = document.getElementsByClassName('sed_datetext')[0].getAttribute('data-lastdate') // 最后的日期
  var startTime = new Date(startDate).getTime() // 起始时间的时间戳
  var endTime = new Date(endDate).getTime() // 结束时间的时间戳
  var prevMonthDays = monthmaxday(new Date(endDate).getFullYear(), new Date(endDate).getMonth()) // 上个月的天数
  var selectedUserId = window.localStorage.selectedUserId
  var result = {}
  result.query = {}
  result.query.userid = {
    '$in': [selectedUserId]
  }
  result.query[datatype] = {
    '$gt': 0
  }
  console.log('当前选择的数据类型是：' + datatype)
  console.log('起始时间：' + startDate)
  console.log('上个月的天数是' + prevMonthDays)
  if (timetype === 'week') {
    result.query.creatTime = {
      '$gt': startTime,
      '$lt': endTime + 24 * 60 * 60 * 1000
    }
    result.filter = ['AVG(' + datatype + ') avgValue', 'day', 'month', 'year']
    result.group = ['day']
    var lastday = new Date(endDate).getDate()
    console.log(lastday)
    self.test.a = result
    api.queryRecords(result).then((r) => {
      self.test.b = r
      let arr = [0, 0, 0, 0, 0, 0, 0]
      r.data.list.map((item) => {
        var index = (lastday - item.day) >= 0 ? (lastday - item.day) : (lastday - item.day + prevMonthDays)
        arr[6 - index] = parseInt(item.avgValue * 10) / 10
      })
      self.test.c = arr
      self.pointnum = arr
      self.updataSVG(self)
    })
    /** ****************调试用假数据 start******************/

    // self.pointnum = [1, 2, 1, 1, 6, 5, 7]
    // self.updataSVG(self)

    /** ****************调试用假数据 end******************/
  } else if (timetype === 'month') {
    result.query.creatTime = {
      '$gt': startTime,
      '$lt': endTime + 24 * 60 * 60 * 1000
    }
    result.filter = ['AVG(' + datatype + ') avgValue', '(strftime("%s","now")*1000-creatTime)/5/24/3600/1000 groupIndex']
    result.group = ['(strftime("%s","now")*1000-creatTime)/5/24/3600/1000']
    // result.group = ['day']
    self.test.a = result
    api.queryRecords(result).then((r) => {
      self.test.b = r
      let arr = [0, 0, 0, 0, 0, 0]
      r.data.list.map((item) => {
        arr[5 - item.groupIndex] = parseInt(item.avgValue * 10) / 10
      })
      self.test.c = arr
      self.pointnum = arr
      self.updataSVG(self)
    })
    /** ****************调试用假数据 start***************/

    // self.pointnum = [1, 2, 1, 1, 6, 5]
    // self.updataSVG(self)

    /** ****************调试用假数据 end******************/
  } else if (timetype === 'year') {
    result.query.creatTime = {
      '$gt': startTime,
      '$lt': endTime + 31 * 24 * 60 * 60 * 1000
    }
    result.filter = ['AVG(' + datatype + ') avgValue', 'day', 'month', 'year']
    result.group = ['month']
    self.test.a = result
    var lastMonth = new Date(endDate).getMonth() + 1
    api.queryRecords(result).then((r) => {
      self.test.b = r
      if (r.status - 0 === 200) {
        let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        r.data.list.map((item) => {
          var index = (lastMonth - item.month) >= 0 ? (lastMonth - item.month) : (lastMonth - item.month + 12)
          arr[11 - index] = parseInt(item.avgValue * 10) / 10
        })
        self.test.c = arr
        self.pointnum = arr
        self.updataSVG(self)
      }
    })
    /** ****************调试用假数据 start******************/

    // self.pointnum = [1, 2, 1, 1, 5, 6, 7, 8, 9, 10, 9, 6]
    // self.updataSVG(self)

    /** ****************调试用假数据 end******************/
  }
}

function monthmaxday (year, month) { // 返回某年某月有多少天
  if (month === 2) {
    if (isLeapYear(year)) {
      return 29
    } else {
      return 28
    }
  } else if (month === 4 || month === 6 || month === 9 || month === 11) {
    return 30
  } else {
    return 31
  }
  function isLeapYear (year) { // 判断闰年
    return (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))
  }
}
