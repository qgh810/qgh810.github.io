<template>
  <div class="main-content data-picker" v-show="show">
    <div class="contentBox">
      <div @touchend="show=false" class="mask"></div>
      <div class="header">
        <div class="monthBox">
          <div class="title color_theme">{{year}} - {{month}}</div>
          <div @touchstart="prev" class="prev"></div>
          <div @touchstart="next" class="next"></div>
        </div>
        <div class="weekBox">
          <ul>
            <li v-for="week in weeks" class="week"><span>{{week}}</span></li>
          </ul>
        </div>
      </div>
      <div id="touchBox" v-bind:style="'-webkit-transform:rotateY('+angle+'deg);'+'transform:rotateY('+angle+'deg)'" class="date_body">
        <div class="dayBox">
          <ul class="ul1">
            <li v-for="n in firstDayWeek" class="opacity"></li>
            <li v-for="n in monthLength" class="day"><span :class="{'today':istoday(year,month,n+1),'hasData':hasData(year,month,n+1)}" @click.prevent.stop="selectDate(n+1)">{{n+1}}</span></li>
          </ul>
          <ul class="ul2">
            <li v-for="n in firstDayWeek" class="opacity"></li>
            <li v-for="n in monthLength" class="day"><span :class="{'today':istoday(year,month,n+1),'hasData':hasData(year,month,n+1)}" @click.prevent.stop="selectDate(n+1)">{{n+1}}</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    // dispatch:
    // this.$dispatch('day-click', selectedDate, hasdate)
    // self.$dispatch('monthchange', self.year, self.month)
    props: {
      'hasdatadates': { // 含有数据的日期数组
        type: Array,
        default: ['2016-03-10', '2016-03-09']
      },
      'show': {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        weeks: [this.$t('weeks[0]'), this.$t('weeks[1]'), this.$t('weeks[2]'), this.$t('weeks[3]'), this.$t('weeks[4]'), this.$t('weeks[5]'), this.$t('weeks[6]')],
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        angle: 0
        // hasdatadates:[]
      }
    },

    computed: {
      firstDayWeek () { // 第一天星期X(0-6,0代表星期天)
        var self = this
        var centerDate = new Date(self.year + '/' + self.month + '/01')
        return centerDate.getDay()
      },
      monthLength () { // 返回月份天数
        var self = this
        return monthmaxday(self.year, self.month)
      }
    },

    ready () {
      var self = this
      setTimeout(function () {
        self.listenTouch()
      }, 1000)
    },

    methods: {
      listenTouch () {
        var self = this
        var touchBox = document.getElementById('touchBox')
        // window.touch.on(touchBox, 'touchstart', function (ev) {
        //   ev.preventDefault()
        // })
        window.touch.on(touchBox, 'swipeleft', function (ev) { // 监听左滑动
          ev.preventDefault()
          self.next()
        })
        window.touch.on(touchBox, 'swiperight', function (ev) { // 监听右滑动
          ev.preventDefault()
          self.prev()
        })
      },

      selectDate (day) { // 选中日期函数
        var self = this
        console.log(123)
        var selectedDate = self.year + '-' + ((self.month - 0) > 9 ? self.month : ('0' + self.month)) + '-' + ((day - 0) > 9 ? day : ('0' + day))
        var hasdate = self.hasData(self.year, self.month, day)
        console.log(selectedDate)
        console.log('hasdate?' + hasdate)
        this.$dispatch('day-click', selectedDate, hasdate)
      },

      prev () {
        var self = this
        self.angle += 180
        setTimeout(function () {
          if (self.month === 1) {
            self.month = 12
            self.year -= 1
          } else {
            self.month -= 1
          }
          self.$dispatch('monthchange', self.year, self.month)
        }, 300)
      },
      next () {
        var self = this
        self.angle -= 180
        setTimeout(function () {
          if (self.month === 12) {
            self.month = 1
            self.year += 1
          } else {
            self.month += 1
          }
          self.$dispatch('monthchange', self.year, self.month)
        }, 300)
      },
      istoday (year, month, day) { // 判断是不是今天
        var centerDate = new Date(year + '/' + month + '/' + day)
        var result = (centerDate.toLocaleDateString() === new Date().toLocaleDateString())
        return result
      },
      hasData (year, month, day) { // 判断是否有数据
        var self = this
        for (var i = 0; i < self.hasdatadates.length; i++) {
          var hasdatadate = new Date(self.hasdatadates[i]).toLocaleDateString()
          var date = new Date(year + '/' + month + '/' + day).toLocaleDateString()
          if (hasdatadate === date) {
            return true
          }
        }
        return false
      }

    }
  }
  function monthmaxday (year, month) { // 返回某年某月有多少天
    if (month === 2) {
      // var today = new Date()
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
      return year === 0 % 4 && ((year % 100 !== 0) || (year % 400 === 0))
    }
  }
</script>
<style lang="stylus">
  /*@import '../assets/stylus/common'*/


  .color_theme
    color #ffa96f
  .color_gray
    color #cccccc

  .data-picker
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    font-family '黑体'
    z-index 99
    background rgba(0,0,0,0.4)
    .contentBox
      width 100%
      height auto
      margin 0 auto
      text-align center
      color #5c656e
      font-size 0.7rem
      position relative
      perspective 30rem
      .mask
        width 100%
        height 40rem
        position fixed
        top 0
        left 0
        //background rgba(0,0,0,0.5)
        z-index -1
      .header
        background #fff
        .monthBox
          height 1.8rem
          line-height 1.8rem
          overflow hidden
          position relative
          .title
            font-size 0.8rem
          .prev
            position absolute
            top 0
            left 0
            width 2rem
            height 100%
            background url('../assets/images/icons/left-yellow.png') no-repeat center
            background-size 1rem 1rem
          .next
            position absolute
            top 0
            right 0
            width 2rem
            height 100%
            background url('../assets/images/icons/right-yellow.png') no-repeat center center
            background-size 1rem 1rem
        .weekBox
          border-bottom 1px solid #ffa96f
          font-size 0.65rem
          ul
            li.week
              width 14.286%
              height 1.5rem
              line-height 1.5rem
              display inline-block
              span
                width 100%
      .date_body
        background #fff
        transition all ease 0.8s
        transform-style: preserve-3d
        .dayBox
          text-align left
          padding 0.1rem 0
          ul
            background #fff
            li
              width 14.286%
              height 1.6rem
              line-height 1.6rem
              float left
              overflow hidden
              color #cccccc
              text-align center
              span
                display inline-block
                width 1.4rem
                height 1.4rem
                line-height 1.4rem
                border-radius 50%
              .today
                background #ffa96f
                color #fff
              .hasData
                color #5c656e
          .ul1
            position absolute
            transform rotateY(180deg) translateZ(0.05rem)
          .ul2
            height 9.6rem
            transform rotateY(0deg) translateZ(0.05rem)
</style>
