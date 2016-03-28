<template>
<div class="main-content history-box">
  <header-nav
    :title="$t('title.history')"
    :righttext="$t('title.date')"
    :showright="true"
    @right-click="showDatePicker=true">
  </header-nav>
  <div v-scrollbottom="scrollbottom" v-heightauto class="scrollDiv iosScrollBug">
    <ul class="first_ul history_ul">
      <li v-for="record in records" class="date_msg">
        <span v-if="istoday(record.oldDate)" class="data_number">{{$t('common.today')}}</span>
        <span v-if="isyesterday(record.oldDate)" class="data_number">{{$t('common.yesterday')}}</span>
        <span v-if="!istoday(record.oldDate)&&!isyesterday(record.oldDate)" class="data_number">{{record.month}}-{{record.day}}</span>
        <ul  @click="openthis($index,record.fat)" class="sed_ul">
          <li class="time_msg">
            <div class="time_number">{{record.date.split(" ")[1].slice(0,5)}}</div>
            <div v-bind:data-open="0" class="thistime_information">
              <div class="base-information">
                <div class="base-information-title">
                  {{$t('record.weight')}}
                </div>
                <div class="base-information-number">
                   {{record.showWeight}}{{record.unit}}
                </div>
              </div>
              <div class="base-information" :style="'color:'+returnBmiColor(Math.round(record.bmi*10)/10)">
                <div class="base-information-title">
                  BMI
                </div>
                <div class="base-information-number">
                  {{Math.round(record.bmi*10)/10}}
                </div>
              </div>
              <i class="more" v-show="record.fat>0"></i>
              <div class="more-information-box">
                <div class="more-information" v-show="record.fat>0">
                  <div class="more-information-title">
                    {{$t('more_weight_messages.fat')}}
                  </div>
                  <div class="more-information-number">
                    {{record.fat}}%
                  </div>
                </div>
                <div class="more-information"  v-show="record.moisture>0">
                  <div class="more-information-title">
                    {{$t('more_weight_messages.moisture')}}
                  </div>
                  <div class="more-information-number">
                    {{record.moisture}}%
                  </div>
                </div>
                <div class="more-information"  v-show="record.muscle>0">
                  <div class="more-information-title">
                  {{$t('more_weight_messages.muscle')}}
                  </div>
                  <div class="more-information-number">
                    {{record.muscle}}%
                  </div>
                </div>
                <div class="more-information"  v-show="record.bone>0">
                  <div class="more-information-title">
                  {{$t('more_weight_messages.bone')}}
                  </div>
                  <div class="more-information-number">
                    {{record.bone}}kg
                  </div>
                </div>
                <div class="more-information"  v-show="record.organs>0">
                  <div class="more-information-title">
                  {{$t('more_weight_messages.organs')}}
                  </div>
                  <div class="more-information-number">
                    {{record.organs}}
                  </div>
                </div>
                <div class="more-information"  v-show="record.internalage>0">
                  <div class="more-information-title">
                  {{$t('more_weight_messages.internalage')}}
                  </div>
                  <div class="more-information-number">
                    {{record.internalage}}{{$t('more_weight_messages.year')}}
                  </div>
                </div>
                <div class="more-information"  v-show="record.basalMetabolic>0">
                  <div class="more-information-title">
                  {{$t('more_weight_messages.basalMetabolic')}}
                  </div>
                  <div class="more-information-number">
                    {{record.basalMetabolic}}
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <div v-if="records.length==0" class="nodata">{{$t('record.no_data')}}</div>
  </div>
  <date-picker :show.sync="showDatePicker" :hasdatadates="hasDataDates" @day-click="selectDate" @monthchange="monthchange" transition="scale"></date-picker>
</div>

</template>

<script>
  var Header = require('../../../shared/components/header.vue')
  var DatePicker = require('../../../shared/components/datePicker.vue')
  // var Header = require('../../../../shared/components/header.vue')
  import api from '../../api'

  module.exports = {
    components: {
      'header-nav': Header,
      'date-picker': DatePicker
    },
    data: function () {
      return {
        selectedUserId: window.localStorage.selectedUserId,
        showDatePicker: false,
        count: 999, // 最大加载次数
        canload: true, // 是否允许加载
        offset: 0, // 默认偏移量
        firGetCount: 29, // 首次加载的数量 不要超过30
        reGetCount: 29, // 每次拉到底部加载的数量
        hasDataDates: ['2016-3-25'],
        records: [
          // {
          //   date: '2016-03-10 00:00:00',
          //   showWeight: 2000,
          //   unit: 'kg',
          //   bmi: 23,
          //   fat: -1,
          //   moisture: 4,
          //   bone: 5,
          //   muscle: 456,
          //   organs: 4,
          //   internalage: 5
          // },
          {
            date: '2016-03-24 00:00:00',
            month: '7',
            day: '13',
            oldDate: 1458805687387,
            showWeight: 2000,
            unit: 'kg',
            bmi: 13,
            fat: 13,
            moisture: 4,
            bone: 5,
            muscle: 456,
            organs: 4,
            internalage: 5
          },
          {
            date: '2016-03-23 12:00:00',
            oldDate: '2016-03-23 12:00:00',
            month: '7',
            day: '13',
            showWeight: 2000,
            unit: 'kg',
            bmi: 23,
            fat: -1,
            moisture: 4,
            bone: 5,
            muscle: 456,
            organs: 4,
            internalage: 5
          }
        ]
      }
    },

    computed: {
      offset () {
        return this.records.length
      }
      // deviceid () {
      //   return window.localStorage.deviceid
      // }
    },

    route: {
      data () {
        this.getRecordList()
        // var params = {
        //   'count': self.firGetCount,
        //   'offset': 0
        // }
        // this.getRecordList(params) // 获取数据列表
      }
    },
    ready () {
      this.getHasDataDate()
    },
    methods: {
      getRecordList (params) {
        var self = this
        if (!params) {
          params = {
            'query':
            {
              'userid': {'$in': [window.localStorage.selectedUserId]}
              // 'userid': {'$in': [4]}
            },
            'order': {
              'creatTime': 'desc'
            }
          }
        }
        api.getRecordList(params).then((r) => {
          if (r.status - 0 === 200) {
            console.log(self.records)
            var records = []
            r.data.list.map((item) => {
              if (item.userid === self.selectedUserId) {
                var record = {}
                var hours = new Date(item.date).getHours() > 9 ? new Date(item.date).getHours() + '' : '0' + new Date(item.date).getHours()
                var minutes = new Date(item.date).getMinutes() > 9 ? new Date(item.date).getMinutes() + '' : '0' + new Date(item.date).getMinutes()
                var month = item.month - 0 > 9 ? item.month : ('0' + item.month)
                var day = item.day - 0 > 9 ? item.day : ('0' + item.day)
                record.date = item.year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':00'
                record.oldDate = item.date
                record.weight = item.weight
                record.bmi = parseInt(item.bmi * 10) / 10
                record.fat = parseInt(item.fat * 10) / 10
                record.moisture = parseInt(item.moisture * 10) / 10
                record.bone = parseInt(item.bone * 10) / 10
                record.muscle = parseInt(item.muscle * 10) / 10
                record.organs = parseInt(item.organs * 10) / 10
                record.internalage = parseInt(item.internalage * 10) / 10
                record.basalMetabolic = parseInt(item.basalMetabolic * 10) / 10
                record.day = item.day
                record.month = item.month
                record.year = item.year
                record.deviceid = item.deviceid
                record.deviceType = item.deviceType
                record._id = item._id
                record.unit = item.weightUnit
                record.showWeight = item.changeUnitWeight
                records.push(record)
              }
            })
            self.records = records
          }
        })
      },

      /**
       * 组件上报的月份改变
       * @param  {[type]} year  [description]
       * @param  {[type]} month [description]
       * @return {[type]}       [description]
       */
      monthchange (year, month) {
        this.getHasDataDate(year, month)
      },

      /**
       * 获取有数据的日期
       * @param  {[type]} year  [description]
       * @param  {[type]} month [description]
       * @return {[type]}       [description]
       */
      getHasDataDate (year, month) {
        var self = this
        if (arguments.length < 2) {
          year = (new Date().getFullYear()) + ''
          month = (new Date().getMonth() + 1) + ''
        }
        console.log(year + '-' + month)
        var params = {
          'query':
          {
            'userid': {'$in': [window.localStorage.selectedUserId]},
            'year': {'$in': [year]},
            'month': {'$in': [month]}
            // 'userid': {'$in': [4]}
          },
          'order': {
            'creatTime': 'desc'
          }
        }
        api.getRecordList(params).then((r) => {
          if (r.status - 0 === 200) {
            var hasDataDates = []
            r.data.list.map((item) => {
              var date = ''
              date = item.year + '-' + (item.month - 0 > 9 ? item.month : '0' + item.month) + '-' + (item.day - 0 > 9 ? item.day : '0' + item.day)
              if (hasDataDates.indexOf(date) === -1) {
                hasDataDates.push(date)
              }
            })
            self.hasDataDates = hasDataDates
          }
        })
      },

      /**
       * 根据bmi返回对应的颜色
       * @param  {[type]} bmiNum [description]
       * @return {[type]}        [description]
       */
      returnBmiColor (bmiNum) {
        return bmiColor(bmiNum)
        function bmiColor (bmi) {
          var colorArr = ['#8dfdff', '#92ffa4', '#fee185', '#ff9c9c']
          return colorArr[bmiStandard(bmi)]
        }
        function bmiStandard (bmi) {
          if (bmi < 18.5) {
            return 0
          } else if (bmi <= 24) {
            return 1
          } else if (bmi <= 28) {
            return 2
          } else {
            return 3
          }
        }
      },

      /**
       * 日期控件选择的日期函数
       * @param  {date} selectedDate   已选择的日期
       * @param  {boolean} hasdate      是否含有数据
       * @return {[type]}              [description]
       */
      selectDate (selectedDate, hasdate) {
        if (hasdate) {
          this.$route.router.go('/analysis/history/' + selectedDate)
        }
      },

      /**
       * 展开当前这条历史数据
       * @param  {number} num 当前第几条
       * @return {[type]}     [descript ion]
       */
      openthis (num, fat) {
        if (fat > 0) {
          var thistime_information = document.getElementsByClassName('thistime_information')[num]
          if (thistime_information.getAttribute('data-open') === '1') {
            thistime_information.setAttribute('data-open', '0')
          } else {
            thistime_information.setAttribute('data-open', '1')
          }
        }
      },

      /**
       * 判断传进来的日期是不是今天
       * @param  {[type]} date [description]
       * @return {[type]}      [description]
       */
      istoday (date) {
        console.log(new Date(date))
        if ((new Date().getFullYear() === new Date(date).getFullYear()) && (new Date().getMonth() === new Date(date).getMonth()) && (new Date().getDate() === new Date(date).getDate())) {
          return true
        } else {
          return false
        }
      },

      /**
       * 判断是不是昨天
       * @param  {date} date 日期
       * @return {[type]}      [description]
       */
      isyesterday (date) {
        if (this.istoday((new Date(date).getTime() - 0) + 86400000)) {
          return 1
        } else {
          return 0
        }
      },

      /**
       * 滚动条滚动到底部
       * @return {void} [description]
       */
      scrollbottom () {
        // var self = this
        // if (self.canload) {
        //   self.canload = false
        //   if (self.count > 0) {
        //     self.count --
        //     var params = {
        //       count: self.firGetCount,
        //       offset: self.offset
        //     }
        //     self.getRecordList(params)
        //   }
        // }
      }
    }
  }

</script>


<style lang="stylus">
  /*@import '../../../shared/assets/stylus/common'*/
  .history-box
    color #fff
    .scrollDiv
      height 100%
      padding-bottom 3.7rem
      box-sizing border-box
      overflow-x hidden
      overflow-y auto
    ul.first_ul
      padding-top 0.5rem
      padding-left 3rem
      box-sizing border-box
      li.date_msg
        clearfix()
        width:100%
        line-height 3rem
        border-bottom 1px solid #d6d6d6
        position relative
        transition all ease 0.5s
        &:first-child
           border-top 1px solid #d6d6d6
        //overflow hidden
        .data_number
          width 3rem
          height 1rem
          line-height 1rem
          padding-right 0.2rem
          font-size 0.65rem
          text-align right
          position absolute
          left 0
          top 0
          transform translate3d(-100%,-50%,0)
        ul.sed_ul
          li.time_msg
            position relative
            .time_number
              width 3rem
              line-height 3rem
              padding-right 10px
              font-size 0.8rem
              text-align right
              position absolute
              left -3rem
              box-sizing border-box
            .thistime_information
              overflow hidden
              height 3rem //点击变成auto
              box-sizing border-box
              clearfix()
              .base-information
                width 45%
                padding-top 0.5rem
                float left
                .base-information-title
                .base-information-number
                  width 100%
                  line-height 1rem
                  padding 0 10px
                  font-size 0.6rem
                  white-space nowrap
                  text-overflow ellipsis
                  overflow hidden
                .base-information-number
                  font-size 0.8rem
              .more
                display inline-block
                height 1rem
                line-height 1rem
                width 1rem
                position absolute
                right 1rem
                top 1.1rem
                transition all ease 0.3s
                transform rotate(0deg) //点击变成90deg
                text-align center
                color #dadada
                font-size 0.7rem
              .more-information-box
                float left
                padding-bottom 0.5rem
                .more-information
                  width 45%
                  padding-top 0.5rem
                  float left
                  .more-information-title
                  .more-information-number
                    width 100%
                    line-height 1rem
                    padding 0 10px
                    font-size 0.6rem
                  .more-information-number
                    font-size 0.8rem
                span
                  width 100%
                  line-height 2rem
                  font-size 0.6rem
                  position relative
                  box-sizing border-box
                  .type
                    display inline-block
                    position absolute
                    right 2rem
                    background #ff8314
                    font-size 0.6rem
                    color #fff
                    height 1rem
                    line-height 1rem
                    margin-top 0.4rem
                    padding 0 15px
                    border-radius 100px
                .foodRecommend
                  color #ff8314
            [data-open="1"]
               height auto
               .more
                 transform rotate(-90deg)
    .nodata
      text-align center
      font-size 0.8rem
      opacity 0.8
</style>
