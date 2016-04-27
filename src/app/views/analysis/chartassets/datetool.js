module.exports = {
  updatecoordinateXs: {
    week: function updatecoordinateXsweek (self, date) { // date的格式为
      var today
      if (date) {
        today = new Date(date)
      } else {
        today = new Date()
      }

      if (today.getDate() >= 7) {
        self.coordinateXs = []
        for (let i = today.getDate() - 6; i <= today.getDate(); i++) {
          self.coordinateXs.push(i)
        }
      } else {
        var prevmonth
        var prevmonthlength
        var thisyear = today.getFullYear()
        if (today.getMonth() > 0) {
          prevmonth = today.getMonth()
        } else {
          prevmonth = 12
        }
        prevmonthlength = monthmaxday(thisyear, prevmonth)
        self.coordinateXs = []
        for (let i = prevmonthlength - (7 - today.getDate()) + 1; i <= prevmonthlength; i++) {
          self.coordinateXs.push(i)
        }
        for (let i = 1; i <= today.getDate(); i++) {
          self.coordinateXs.push(i)
        }
      }
    },
    month: function updatecoordinateXsmonth (self, date) {
      var valuelength = 5
      var today
      if (date) {
        today = new Date(date)
      } else {
        today = new Date()
      }
      var day = today.getDate()
      var month = today.getMonth() + 1
      var year = today.getFullYear()

      self.coordinateXs = []
      for (let i = 0; i < 30 / valuelength; i++) {
        var text = day - 30 + monthmaxday(year, month - 1) + 1 + (i * valuelength)
        if (text > monthmaxday(year, month - 1)) {
          text = text - monthmaxday(year, month - 1)
        }
        var textfirst = text
        var textlast = text + valuelength - 1
        if (textlast > monthmaxday(year, month - 1)) {
          textlast -= monthmaxday(year, month - 1)
        }
        self.coordinateXs.push(textfirst + '~' + textlast)
      }
    },
    year: function updatecoordinateXyear (self, date) {
      var lastmonth = new Date().getMonth() + 1
      if (date) {
        lastmonth = new Date(date).getMonth() + 1
      }
      self.coordinateXs = []
      for (let i = lastmonth - 11; i <= lastmonth; i++) {
        if (i > 0) {
          self.coordinateXs.push(i)
        } else {
          self.coordinateXs.push(i + 12)
        }
      }
    }
  },
  updateSedDate: {
    week: function (self, date) {
      var today
      if (date) {
        today = new Date(date)
      } else {
        today = new Date()
      }

      var day = today.getDate()
      var month = today.getMonth() + 1
      var year = today.getFullYear()
      var prevmonth = month - 1 > 0 ? month - 1 : month - 1 + 12
      var firmonth = day > 6 ? month : prevmonth
      var firday = day > 6 ? day - 6 : day - 6 + monthmaxday(year, month - 1)
      self.showseddate = firmonth + '-' + firday + ' ~ ' + month + '-' + day

      var firstday = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 6)
      setSedDateTextAttr(firstday.getFullYear() + '-' + ((firstday.getMonth() + 1) > 9 ? (firstday.getMonth() + 1) : ('0' + (firstday.getMonth() + 1))) + '-' + (firstday.getDate() > 9 ? firstday.getDate() : ('0' + firstday.getDate())), today.getFullYear() + '-' + ((today.getMonth() + 1) > 9 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))) + '-' + (today.getDate() > 9 ? today.getDate() : ('0' + today.getDate())))
    },

    month: function (self, date) {
      var today
      if (date) {
        today = new Date(date)
      } else {
        today = new Date()
      }
      var firstday = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 29)
      self.showseddate = (firstday.getMonth() - 0 + 1) + '-' + firstday.getDate() + ' ~ ' + (today.getMonth() - 0 + 1) + '-' + today.getDate()

      setSedDateTextAttr(firstday.getFullYear() + '-' + ((firstday.getMonth() + 1) > 9 ? (firstday.getMonth() + 1) : ('0' + (firstday.getMonth() + 1))) + '-' + (firstday.getDate() > 9 ? firstday.getDate() : ('0' + firstday.getDate())), today.getFullYear() + '-' + (((today.getMonth() + 1) > 9) ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))) + '-' + ((today.getDate() > 9) ? today.getDate() : ('0' + today.getDate())))
    },

    year: function (self, date) {
      var today
      if (date) {
        today = new Date(date)
      } else {
        today = new Date()
      }
      var thisyear = today.getFullYear()
      var month = today.getMonth() + 1
      var firstyear = month === 12 ? thisyear : thisyear - 1
      var firstmonth = month === 12 ? 1 : month + 1
      self.showseddate = firstyear + '-' + firstmonth + ' ~ ' + thisyear + '-' + month

      setSedDateTextAttr(firstyear + '-' + (firstmonth > 9 ? firstmonth : ('0' + firstmonth)) + '-01', thisyear + '-' + (month > 9 ? month : ('0' + month)) + '-01')
    }
  }
}

function setSedDateTextAttr (firstdate, lastdate) {
  var sed_datetext = document.getElementsByClassName('sed_datetext')[0]
  sed_datetext.setAttribute('data-firstdate', firstdate)
  sed_datetext.setAttribute('data-lastdate', lastdate)
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
