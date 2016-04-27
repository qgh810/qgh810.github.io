<template>
<div class="main-content history-box daydata-box">
  <div class="header-box1">
    <div class="margin-top"></div>
    <div class="content">
      <div class="title" @touchstart="showDatePicker=true">
        {{date}}
        <span class="more"></span>
      </div>
      <div
      class="left"
      @touchend="leftClick">
      </div>
    </div>
  </div>
  <div class="scrollDiv iosScrollBug">
    <ul class="first_ul history_ul">
      <li v-for="record in records" class="date_msg">
        <ul @mousedown="openthis($index ,record.fat)" class="sed_ul">
          <li class="time_msg">
            <div class="time_number">{{record.date.split(" ")[1].slice(0,5)}}</div>
            <div v-bind:data-open="0" class="thistime_information">
              <div class="base-information">
                <div class="base-information-title">
                  {{$t('more_weight_messages.weight')}}
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
                <div class="more-information" v-show="record.fat>0" v-show="record.fat>0">
                  <div class="more-information-title">
                    {{$t('more_weight_messages.fat')}}
                  </div>
                  <div class="more-information-number">
                    {{record.fat}}%
                  </div>
                </div>
                <div class="more-information" v-show="record.moisture>0">
                  <div class="more-information-title">
                    {{$t('more_weight_messages.moisture')}}
                  </div>
                  <div class="more-information-number">
                    {{record.moisture}}%
                  </div>
                </div>
                <div class="more-information" v-show="record.muscle>0">
                  <div class="more-information-title">
                  {{$t('more_weight_messages.muscle')}}
                  </div>
                  <div class="more-information-number">
                    {{record.muscle}}%
                  </div>
                </div>
                <div class="more-information" v-show="record.bone>0">
                  <div class="more-information-title">
                  {{$t('more_weight_messages.bone')}}
                  </div>
                  <div class="more-information-number">
                    {{record.bone}}kg
                  </div>
                </div>
                <div class="more-information" v-show="record.organs>0">
                  <div class="more-information-title">
                  {{$t('more_weight_messages.organs')}}
                  </div>
                  <div class="more-information-number">
                    {{record.organs}}
                  </div>
                </div>
                <div class="more-information" v-show="record.internalage>0">
                  <div class="more-information-title">
                  {{$t('more_weight_messages.internalage')}}
                  </div>
                  <div class="more-information-number">
                    {{record.internalage}}{{$t('more_weight_messages.year')}}
                  </div>
                </div>
                <div class="more-information" v-show="record.basalMetabolic>0">
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
  </div>
  <date-picker :show.sync="showDatePicker" :hasdatadates="hasDataDates" @day-click="selectDate" @monthchange="monthchange" transition="scale"></date-picker>
</div>

</template>

<script>
  var DatePicker = require('../../../shared/components/datePicker.vue')
  import api from '../../api'
  // var Header = require('../../../../shared/components/header.vue')

  module.exports = {
    components: {
      'date-picker': DatePicker
    },
    data: function () {
      return {
        date: this.$route.params.date,
        showDatePicker: false,
        canload: true, // 是否允许加载
        hasDataDates: ['2016-3-25'],
        records: [
          // {
          //   date: '2016-03-10 00:00:00',
          //   weight: 2000,
          //   unit: 'kg',
          //   bmi: 23,
          //   fat: 13,
          //   moisture: 4,
          //   bone: 5,
          //   muscle: 456,
          //   organs: 4,
          //   internalage: 5
          // }
        ]
      }
    },

    computed: {
      year () {
        return this.date.split('-')[0]
      },
      month () {
        return this.date.split('-')[1]
      },
      day () {
        return this.date.split('-')[2]
      }
    },

    route: {
      data () {
        this.getRecordList()
      }
    },
    ready () {
      setTimeout(() => {
        this.getHasDataDate()
      }, 300)
    },
    methods: {
      getRecordList (params) {
        var self = this
        if (!params) {
          params = {
            'query':
            {
              'userid': {'$in': [window.localStorage.selectedUserId]},
              'year': {'$in': [self.year]},
              'month': {'$in': [(self.month - 0) + '']}
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
              var record = {}
              var hours = new Date(item.date).getHours() > 9 ? new Date(item.date).getHours() + '' : '0' + new Date(item.date).getHours()
              var minutes = new Date(item.date).getMinutes() > 9 ? new Date(item.date).getMinutes() + '' : '0' + new Date(item.date).getMinutes()
              record.date = item.year + '-' + item.month + '-' + item.day + ' ' + hours + ':' + minutes + ':00'
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
            })
            self.records = records
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
       * 组件上报的月份改变
       * @param  {[type]} year  [description]
       * @param  {[type]} month [description]
       * @return {[type]}       [description]
       */
      monthchange (year, month) {
        this.getHasDataDate(year, month)
      },

      /**
       * 日期控件选择的日期函数
       * @param  {date} selectedDate   已选择的日期
       * @param  {boolean} hasdate      是否含有数据
       * @return {[type]}              [description]
       */
      selectDate (selectedDate, hasdate) {
        if (hasdate) {
          this.showDatePicker = false
          this.date = selectedDate
          this.getRecordList()
        }
      },
      /**
       * 获取数据列表
       * @return {[type]} [description]
       */
      getBatchXData (params) {
        // var self = this
        console.log(params)
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

      leftClick: function () {
        window.history.go(-1)
        // this.$dispatch('left-click')
      }
    }
  }

</script>


<style lang="stylus">
  .history-box.daydata-box
    .header-box1
      .content
        .title
          position relative
          .more
            position absolute
            width 1rem
            height 95%
            color transparent
            background-size .8rem .8rem
    .first_ul.history_ul
      padding-top 0.1rem
      padding-left 0.5rem
      .sed_ul
        .time_msg
          .time_number
            position relative
            left auto
            float left
            text-align left

</style>
