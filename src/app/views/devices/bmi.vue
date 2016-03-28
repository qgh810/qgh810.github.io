<template>
  <div class="devices-bmi-scale" @click="closeAllModal">
    <div class="devices-header-box">
      <div class="margin-top"></div>
      <div class="content">
        <div class="title" @click.stop="showSelectDeviceModal">
          <div class="device-name">{{selectedDeviceName}}<span class="triangle"></span></div>
        </div>
        <div
        class="more-device-box"
        v-show="showMoreDevices"
        transition="bottom-to-top"
        @click.stop="showMoreDevices=false"
        v-heightauto>
          <div class="device-box iosScrollBug">
            <div class="device-li" v-for="device in deviceList" @click.prevent.stop="selectDevice(device)">
              <div class="device-msg">
                <div class="device-img">
                  <img
                  :src="'static/bmi-gray.png'"
                  width="100%"
                  height="100%">
                </div>
                <div class="device-text">
                  <div class="device-name">
                    {{device.name}}
                  </div>
                </div>
                <div class="device-select-state" v-show="device.selected">
                  <div class="tick"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
        class="left"
        @touchstart.stop="leftClick">
        </div>
        <div
          class="right set"
          @touchend.prevent.stop="rightClick">
          <div class="more-nav-box" v-show="showMoreNav" transition="scale">
            <ul>
              <li class="more-nav-li"  @touchstart.prevent.stop="link('/analysis/history')">
                <span>{{$t('title.history')}}</span>
              </li>
              <li class="more-nav-li"  @touchstart.prevent.stop="link('/analysis/chart')">
                <span>{{$t('title.chart')}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="devices-body" v-heightauto>
      <div class="user-box" @click.prevent.stop="showSelectUserModal">
        <div class="current-user">
          <span>
            hello,{{selectedUser.name}}
          </span>
          <span class="triangle"></span>
        </div>
        <div
        class="more-user-box"
        v-show="showMoreUsers"
        transition="bottom-to-top"
        v-heightauto>
          <div class="user-list-box iosScrollBug">
            <div class="user-li" v-for="user in userList" @click.prevent.stop="selectUser(user)">
              <div class="user-msg">
                <div class="user-img">
                  <img
                  :src="user.headerImg"
                  width="100%"
                  height="100%">
                </div>
                <div class="user-text">
                  <div class="user-name">
                    {{user.name}}
                  </div>
                </div>
                <div class="user-select-state" v-show="user.selected">
                  <div class="tick"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="device-bluetooth-state" v-show="connectedDevices.isConnected"></div>
      <div class="device-main-data-box">
        <div class="weight-box">
          <div class="weight-num">
            <span class="main-num">{{toShowWeight}}</span>
            <div class="other-weight-msg">
              <span class="unit">{{weightUnit}}</span>
              <span class="weight-change" :class="dRecordWeight.class" v-show="dRecordWeight.number-0>0">
                {{dRecordWeight.number}}
                <div class="triangle"></div>
              </span>
            </div>
          </div>
        </div>
        <div class="weight-target-box">
          <div class="weight-targe" v-show="plan.target>0">
            <span class="weight-target-text">
              {{$t('more_weight_messages.target_weight')}}
            </span>
            <span class="weight-target-num">
              {{toShowTargetWeight}}
            </span>
            <span class="weight-target-unit">
              {{weightUnit}}
            </span>
          </div>
        </div>
        <div class="chart-box">
          <div class="bmi-box">
            <div class="color-box"></div>
            <div class="number-box">
              <div class="bmi-number" :style="'color: '+bmiMsg.color">
                <span>{{scaleData.bmi}}</span>
                <div class="title">BMI</div>
              </div>
            </div>
          </div>
          <div class="residual-time-box">
            <div class="svg-box">
              <svg class="svg residual-time">
                <g class="circle1">
                  <circle :cx="svg.x" :cy="svg.y" :r="svg.r" stroke-width="4" fill="none" stroke="rgba(0,0,0,0.2)"></circle>
                </g>
                <g class="circle2">
                  <circle :cx="svg.x" :cy="svg.y" :r="svg.r" stroke-width="4" stroke="#fff" fill="none" :stroke-dashoffset="svg.r*2*3.14*(1-plan.percent)" :stroke-dasharray="+svg.r*2*3.14"></circle>
                </g>
              </svg>
            </div>
            <div class="number-box">
              <div class="bmi-number">
                <span>{{plan.remaining}}</span>
                <div class="title">{{$t('other.rest_time')}}</div>
                <div class="unit">{{$t('other.day')}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="details-box">
        <div class="bmi-scale-details-box">
          <div class="people-icon" :class="bmiMsg.image"></div>
          <div class="text">
            <div class="title">
              {{$t('messages.range_target_weight')}}<span v-text="dTargetWeight.text"></span>
            </div>
            <div class="number-box">
              <div class="num">
                {{dTargetWeight.number}}<span class="unit" v-show="dTargetWeight.number>0">{{weightUnit}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="save-button-box">
      <button class="save-button" type="button" @touchstart="saveData" :disabled="!canSaveData" :class="{'disabled': !canSaveData}">{{$t('common.save')}}</button>
    </div>
  </div>
</template>

<script>
  import SDK from '../../helpers/sdk'
  import api from '../../api'
  // import { isBMI, isFatScale, existsInList } from '../../mixins'
  import decodeBase64 from '../../helpers/decodeBase64'
  import { isBMI, existsInList } from '../../mixins'
  import {showMessage} from '../../store/actions/system'

  module.exports = {
    vuex: {
      actions: {
        showMessage
      }
    },
    data () {
      return {
        canShowMessage: true,
        canSaveData: false,
        showMoreDevices: false, // 选择设备浮层开关
        showMoreUsers: false, // 选择用户浮层开关
        showMoreNav: false, // 更多菜单浮层开关
        weightUnit: window.localStorage.weightUnit || 'kg',
        selectedUserId: window.localStorage.selectedUserId || '',
        scaleData: {
          weight: 0,
          bmi: 0
        },
        connectedDevices: {
          isConnected: false, // 当前是否已经连接设备
          deviceid: ''
        },
        deviceList: [],
        userList: [],
        plan: {
          target: 100,
          remaining: '--',
          percent: 1
        },
        record: {
          weight: '0'
        },
        svg: {}
      }
    },
    computed: {
      bmiMsg () {
        var self = this
        var result = {}
        result.color = bmiColor(self.scaleData.bmi)
        result.image = bmiImage(self.scaleData.bmi)

        return result
        function bmiColor (bmi) {
          var colorArr = ['#8dfdff', '#92ffa4', '#fee185', '#ff9c9c']
          return colorArr[bmiStandard(bmi)]
        }
        function bmiImage (bmi) {
          var maleImageArr = ['male-thin', 'male-normal', 'male-obesity', 'male-more-obesity']
          var femaleImageArr = ['female-thin', 'female-normal', 'female-obesity', 'female-more-obesity']
          var toUserArr = []
          var sex = 'male'
          self.userList.map((item) => {
            if (item.selected) {
              sex = item.sex
            }
          })
          toUserArr = (sex === 'male') ? maleImageArr : femaleImageArr
          return toUserArr[bmiStandard(bmi)]
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
       * 已选择用户
       * @return {[type]} [description]
       */
      selectedUser () {
        var result = {name: this.$t('user_message.no_users'), height: 178, userid: ''}
        this.userList.map((item) => {
          if (item.selected) {
            result.name = item.name
            result.height = item.height
            result.userid = item.userid
          }
        })
        return result
      },

      /**
       * 已选择的设备名字
       * @return {[type]} [description]
       */
      selectedDeviceName () {
        var self = this
        var result = this.$t('device.bmi_scale')
        if (self.connectedDevices.deviceid.length > 0) {
          self.deviceList.map((item) => {
            item.selected = 0
            if (item.deviceid === self.connectedDevices.deviceid) {
              result = item.name
              item.selected = 1
            }
          })
        }
        return result
      },

      /**
       * 用于显示的体重
       * @return {[type]} [description]
       */
      toShowWeight () {
        return this.weightFormula(this.weightUnit, this.scaleData.weight)
      },
      toShowTargetWeight () {
        return this.weightFormula(this.weightUnit, this.plan.target)
      },
      /**
       * 体重和目标体重的差值
       * @return {[type]} [description]
       */
      dTargetWeight () {
        var result = {
          text: this.$t('other.reduce'),
          number: '--'
        }
        if (this.plan.target > 0) {
          result.number = parseInt(Math.abs(this.toShowWeight - this.toShowTargetWeight) * 100) / 100
          result.text = this.scaleData.weight - this.plan.target > 0 ? this.$t('other.reduce') : this.$t('other.add')
        }
        return result
      },
      /**
       * 体重和上次体重的差值
       * @return {[type]} [description]
       */
      dRecordWeight () {
        var result = {
          class: 'down',
          number: 0
        }
        var changeUnitRecordWeight = this.weightFormula(this.weightUnit, (this.record.weight - 0))
        if (this.scaleData.weight > 0 && changeUnitRecordWeight > 0) {
          result.number = parseInt(Math.abs(this.toShowWeight - changeUnitRecordWeight) * 10) / 10
          result.class = this.scaleData.weight - changeUnitRecordWeight > 0 ? 'up' : 'down'
        }
        return result
      }
    },
    route: {
      data () {
        this.getPlan() // 获取计划
        setTimeout(() => {
          this.getDeviceList() // 获取设备列表
        }, 100)
        setTimeout(() => {
          this.getUserList() // 获取用户列表
        }, 200)
        setTimeout(() => {
          this.scanDevice() // 扫描设备
        }, 300)
        setTimeout(() => {
          this.getRecordList() // 获取上一条历史
        }, 1000)
      }
    },
    ready () {
      this.initSVG() // 初始化svg
    },
    methods: {
      /**
       * 保存数据
       * @return {[type]} [description]
       */
      saveData () {
        var self = this
        if (self.scaleData.weight > 0 && self.canSaveData) {
          var record = {
            deviceType: 'bmi',
            deviceid: self.connectedDevices.deviceid,
            userid: window.localStorage.selectedUserId,
            creatTime: new Date().getTime(),
            date: new Date(),
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
            weight: self.scaleData.weight,
            changeUnitWeight: self.toShowWeight,
            weightUnit: self.weightUnit,
            bmi: self.scaleData.bmi,
            bmiType: self.scaleData.bmiType,
            fat: -1,
            moisture: -1,
            bone: -1,
            muscle: -1,
            kcal: -1,
            organs: -1,
            internalage: -1,
            basalMetabolic: -1
          }
          api.addRecord(record).then((r) => {
            if (r.status - 0 === 200) {
              self.canSaveData = false
              self.showMessage(self.$t('messages.save_success'))
            }
          })
        }
      },
      /**
       * 连接设备
       * @param  {[type]} device [description]
       * @return {[type]}        [description]
       */
      connectDevice (device) {
        var self = this
        api.connectDevice(device).then((r) => {
          if (r.status - 0 === 200) {
            self.connectedDevices.isConnected = true
            self.connectedDevices.name = device.name
            self.connectedDevices.deviceid = device.deviceid
          }
        })
      },
      /**
       * 监听扫描结果 若当前未连接设备 会尝试连接
       * @return {[type]} [description]
       */
      listenScaleDate () {
        var self = this
        SDK.on('onScanXDeviceResult', function (r) {
          if (!self.connectedDevices.isConnected && isBMI(r.data) && existsInList(self.deviceList, 'deviceid', r.deviceid)) {
            self.connectDevice(r)
          }
        })
        SDK.on('onRecvXDeviceData', function (r) {
          if (r.deviceid === self.connectedDevices.deviceid) {
            var dataArr = decodeBase64(r.data)
            self.scaleData.weight = parseInt('0x' + dataArr[5] + dataArr[6]) / 100
            self.scaleData.bmi = parseInt(self.scaleData.weight / ((self.selectedUser.height / 100) * (self.selectedUser.height / 100)) * 10) / 10
            if (dataArr[4] === '03' && self.scaleData.weight > 0) {
              self.canSaveData = true
            }
            if (self.canShowMessage) {
              if (dataArr[7] === '01') {
                self.showMessage(self.$t('messages.over_weight'))
              } else if (dataArr[7] === '02') {
                self.showMessage(self.$t('messages.low_power'))
              }
              self.canShowMessage = false
              setTimeout(() => {
                self.canShowMessage = true
              }, 20000)
            }
          }
        })
      },
      /**
       * 切换设备
       * @param  {[type]} user [description]
       * @return {[type]}      [description]
       */
      selectDevice (device) {
        console.log(device)
        this.deviceList.map((item) => {
          item.selected = 0
        })
        this.connectDevice(device)
      },
      /**
       * 切换用户
       * @param  {[type]} user [description]
       * @return {[type]}      [description]
       */
      selectUser (user) {
        this.userList.map((item) => {
          item.selected = 0
        })
        user.selected = 1
        this.selectedUser.userid = user._id
        window.localStorage.selectedUserId = user._id
        this.getRecordList() // 重新获取当前用户的最近一条历史数据
      },
      /**
       * 获取最近一条历史记录
       * @return {[type]} [description]
       */
      getRecordList () {
        var self = this
        var params = {
          'limit': 1,
          'query':
          {
            'userid': {'$in': [window.localStorage.selectedUserId]}
            // 'userid': {'$in': [4]}
          },
          'order': {
            'creatTime': 'desc'
          }
        }
        api.getRecordList(params).then((r) => {
          if (r.status - 0 === 200) {
            if (r.data.list.length > 0) {
              self.record.weight = r.data.list[0].weight - 0
            } else {
              self.record.weight = -1
            }
          }
        })
      },
      /**
       * 获取最近一条计划
       * @return {[type]} [description]
       */
      getPlan () {
        var self = this
        var params = {
          'limit': 1,
          'order': {
            'creatTime': 'desc'
          }
        }
        api.getPlanList(params).then(function (r) {
          // alert(JSON.stringify(r))
          if (r.status - 0 === 200 && r.data.list.length > 0) {
            var plan = {}
            plan.target = r.data.list[0].target - 0
            plan.remaining = date2day(new Date(), r.data.list[0].endDate) + 1
            plan.remaining = plan.remaining > 0 ? plan.remaining : 0
            plan.percent = plan.remaining / date2day(r.data.list[0].startDate, r.data.list[0].endDate)

            self.plan = plan
          }
        })
        /**
         * 求两日期相差多少天
         * @param  {[type]} startDate [description]
         * @param  {[type]} endDate   [description]
         * @return {[type]}           [description]
         */
        function date2day (startDate, endDate) {
          var result = 0
          result = parseInt((new Date(endDate).getTime() - new Date(startDate).getTime()) / (24 * 60 * 60 * 1000))
          return result
        }
      },
      /**
       * 获取设备列表
       * @return {[type]} [description]
       */
      getDeviceList () {
        var self = this
        console.log('获取设备列表')
        api.getDeviceBMIList().then((r) => {
          // alert(JSON.stringify(r))
          if (r.status - 0 === 200) {
            var deviceList = []
            r.data.list.map((item) => {
              var device = {}
              device.name = item.name
              device.deviceid = item.deviceid
              device.selected = 0
              deviceList.push(device)
            })
            self.deviceList = deviceList
          }
        })
      },
      /**
       * 获取用户列表
       * @return {[type]} [description]
       */
      getUserList () {
        var self = this
        var params = {
          'order': {
            'creatTime': 'desc'
          }
        }
        api.getUserList(params).then((r) => {
          if (r.status - 0 === 200) {
            var users = []
            var hasSelectedUser = false
            r.data.list.map((item) => {
              var user = {
                name: 'yonghu11',
                headerImg: 'static/male.png',
                sex: 'female',
                height: 178,
                selected: 0
              }
              user.name = item.name
              user.headerImg = item.headerImg
              user.sex = item.sex
              user.height = item.height
              user._id = item._id
              user.selected = (item._id === window.localStorage.getItem('selectedUserId'))
              if (item._id === window.localStorage.getItem('selectedUserId')) {
                hasSelectedUser = true
              }
              users.push(user)
            })
            if (!hasSelectedUser) {
              users[0].selected = 1
              window.localStorage.setItem('selectedUserId', users[0]._id)
            }
            self.userList = users
          }
        })
      },

      /**
       * 开始扫描设备
       * @return {[type]} [description]
       */
      scanDevice () {
        var self = this
        api.scanDevice().then(function (r) {
          if (r.status - 0 === 200) {
            self.listenScaleDate()
          }
        })
      },

      /**
       * 停止扫描设备
       * @return {[type]} [description]
       */
      stopScanDevice () {
        api.stopScanDevice().then(function (r) {})
      },

      /**
       * 显示切换用户浮层
       * @return {[type]} [description]
       */
      showSelectUserModal () {
        if (this.showMoreUsers) {
          this.closeAllModal()
        } else {
          this.closeAllModal()
          this.showMoreUsers = true
        }
      },
      /**
       * 显示设备选择浮层
       * @return {[type]} [description]
       */
      showSelectDeviceModal () {
        if (this.deviceList.length > 0) {
          if (this.showMoreDevices) {
            this.closeAllModal()
          } else {
            this.closeAllModal()
            this.showMoreDevices = true
          }
        } else {
          this.link('/devices/add/bmi')
        }
      },
      rightClick: function () {
        if (this.showMoreNav) {
          this.closeAllModal()
        } else {
          this.closeAllModal()
          this.showMoreNav = true
        }
      },

      leftClick: function () {
        this.link('/index')
        // this.$dispatch('left-click')
      },

      /**
       * 关闭所有浮层
       * @return {[type]} [description]
       */
      closeAllModal () {
        this.showMoreDevices = false
        this.showMoreUsers = false
        this.showMoreNav = false
      },

      link (path) {
        this.stopScanDevice()
        this.$route.router.go(path)
      },

      initSVG () {
        var svgBox = document.getElementsByClassName('svg-box')[0]
        var boxWidth = svgBox.clientWidth
        var boxHeight = svgBox.clientHeight
        var result = {
          x: boxWidth * 0.5,
          y: boxHeight * 0.5,
          r: boxHeight * 0.35
        }
        this.svg = result
      },

      weightFormula (unit, weight) {
        var resutlt = {
          kg: function (kgWeight) { return kgWeight },
          lb: function (kgWeight) { return (parseInt(kgWeight * 2.2046226 * 100) / 100) },
          stone: function (kgWeight) { return (parseInt(kgWeight * 0.15747312 * 100) / 100) }
        }
        return resutlt[unit](weight)
      }
    }
  }
</script>

<style lang="stylus">
  .devices-bmi-scale
    .devices-body
      .details-box
        padding 0
        .bmi-scale-details-box
          width 100%
          height 7rem
          overflow hidden
          .people-icon
            margin-left 2rem
            width 4rem
            height 100%
            float left
            background-size 100% 100%
            overflow hidden
          .people-icon.male-thin
            background-image url("../../assets/images/icons/male-thin.png")
          .people-icon.male-normal
            background-image url("../../assets/images/icons/male-normal.png")
          .people-icon.male-obesity
            background-image url("../../assets/images/icons/male-obesity.png")
          .people-icon.male-more-obesity
            background-image url("../../assets/images/icons/male-more-obesity.png")
          .people-icon.female-thin
            background-image url("../../assets/images/icons/female-thin.png")
          .people-icon.female-normal
            background-image url("../../assets/images/icons/female-normal.png")
          .people-icon.female-obesity
            background-image url("../../assets/images/icons/female-obesity.png")
          .people-icon.female-more-obesity
            background-image url("../../assets/images/icons/female-more-obesity.png")
          .text
            height 100%
            padding-left 6.5rem
            padding-right 1rem
            padding-top 1rem
            box-sizing border-box
            text-align center
            .title
              font-size 0.7rem
            .number-box
              position relative
              text-align center
              .num
                font-size 3rem
                display inline
                position relative
                white-space nowrap
                .unit
                  font-size 0.8rem
                  position absolute
                  bottom 0.2rem

</style>
