<template>
  <div class="devices-fat-scale" @click="closeAllModal">
    <div class="devices-header-box">
      <!-- <div class="margin-top"></div> -->
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
        <div class="fat-scale-details-box">
          <div class="details fat">
            <div class="icon fat-icon"></div>
            <div class="text fat-text">
              <div class="name"><span>{{$t('more_weight_messages.fat')}}</span></div>
              <div class="num">
                <span>{{moreWeightMsg.fat>0?moreWeightMsg.fat:'--'}}</span><span class="unit" v-show="moreWeightMsg.fat>0">%</span>
              </div>
            </div>
          </div>
          <div class="details moisture">
            <div class="icon moisture-icon"></div>
            <div class="text moisture-text">
              <div class="name"><span>{{$t('more_weight_messages.moisture')}}</span></div>
              <div class="num">
                <span>{{moreWeightMsg.moisture>0?moreWeightMsg.moisture:'--'}}</span><span class="unit" v-show="moreWeightMsg.moisture>0">%</span>
              </div>
            </div>
          </div>
          <div class="details bone">
            <div class="icon bone-icon"></div>
            <div class="text bone-text">
              <div class="name"><span>{{$t('more_weight_messages.bone')}}</span></div>
              <div class="num">
                <span>--</span><span class="unit" v-show="moreWeightMsg.bone>0">kg</span>
              </div>
            </div>
          </div>
          <div class="details muscle">
            <div class="icon muscle-icon"></div>
            <div class="text muscle-text">
              <div class="name"><span>{{$t('more_weight_messages.muscle')}}</span></div>
              <div class="num">
                <span>{{moreWeightMsg.muscle>0?moreWeightMsg.muscle:'--'}}</span><span class="unit" v-show="moreWeightMsg.muscle>0">%</span>
              </div>
            </div>
          </div>
          <div class="details kcal">
            <div class="icon kcal-icon"></div>
            <div class="text kcal-text">
              <div class="name"><span>{{$t('more_weight_messages.kcal')}}</span></div>
              <div class="num">
                <span>--</span><span class="unit" v-show="moreWeightMsg.kcal>0">%</span>
              </div>
            </div>
          </div>
          <div class="details basalMetabolic">
            <div class="icon basalMetabolic-icon"></div>
            <div class="text basalMetabolic  -text">
              <div class="name"><span>{{$t('more_weight_messages.basalMetabolic')}}</span></div>
              <div class="num">
                <span>{{moreWeightMsg.basalMetabolic>0?moreWeightMsg.basalMetabolic:'--'}}</span><span class="unit" v-show="moreWeightMsg.basalMetabolic>0"></span>
              </div>
            </div>
          </div>
          <div class="details internalage">
            <div class="icon internalage-icon"></div>
            <div class="text internalage  -text">
              <div class="name"><span>{{$t('more_weight_messages.internalage')}}</span></div>
              <div class="num">
                <span>{{moreWeightMsg.internalage>0?moreWeightMsg.internalage:'--'}}</span><span class="unit" v-show="moreWeightMsg.internalage>0"></span>
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
  import { isFatScale, existsInList } from '../../mixins'
  import {showMessage} from '../../store/actions/system'

  module.exports = {
    vuex: {
      actions: {
        showMessage
      }
    },
    data () {
      return {
        isWeixinScale: false,
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
        deviceList: [
          {
            name: 'asdjk2j3k4h',
            selected: 1
          },
          {
            name: 'asdjk2j3k4h',
            selected: 0
          }
        ],
        userList: [
          {
            name: 'yonghu11',
            headerImg: 'static/male.png',
            sex: 'male',
            selected: 0
          },
          {
            name: 'yonghu11',
            headerImg: 'static/female.png',
            sex: 'female',
            selected: 1,
            height: 178,
            birthday: '1991-12-25'
          },
          {
            name: 'yonghu11',
            headerImg: 'static/female.png',
            sex: 'female',
            selected: 0
          },
          {
            name: 'yonghu11',
            headerImg: 'static/female.png',
            sex: 'female',
            selected: 0
          }
        ],
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
            result.birthday = item.birthday
            result.sex = item.sex
            result.weight = item.weight
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
        var result = this.$t('device.fat_scale')
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

      moreWeightMsg () {
        var self = this
        console.log(self.scaleData.weight)
        console.log(self.selectedUser.height)
        var result = {
          fat: -1,
          moisture: -1,
          muscle: -1,
          basalMetabolic: -1
        }
        if (self.scaleData.weight > 0) {
          var w = self.scaleData.weight
          var h = self.selectedUser.height
          var age = new Date().getFullYear() - new Date(self.selectedUser.birthday).getFullYear()
          var gender = self.selectedUser.sex === 'male' ? 1 : 0
          var fat = 1.38 * (w / ((h / 100) * (h / 100))) + 0.26 * age - 13.5 * gender - 10 // %
          var moisture = (0.237 * h + 0.246 * w - 0.11 * age + 4.5 * gender - 19.2) / w * 100 // %
          var muscle = (0.107 * h + 0.207 * w - 0.12 * age + 5.1 * gender - 4.5) / w * 100 // %
          var basalMetabolic = calculationBasalMetabolic(gender, age, w, h)
          result.fat = parseInt(fat * 10) / 10
          result.moisture = parseInt(moisture * 10) / 10
          result.muscle = parseInt(muscle * 10) / 10
          result.basalMetabolic = parseInt(basalMetabolic)
        }
        return result
        function calculationBasalMetabolic (gender, age, weight, height) {
          var ageRange = function (age) {
            switch (age) {
              case age < 18:
                return 0
              case age < 30:
                return 1
              case age < 60:
                return 2
              default:
                return 2
            }
          }
          var maleFormula = [
            function (w, h) { return 16.6 * w + 0.77 * h + 572 },
            function (w, h) { return 15.4 * w + 0.27 * h + 717 },
            function (w, h) { return 11.3 * w + 0.16 * h + 901 },
            function (w, h) { return 8.8 * w + 11.28 * h + 1071 }
          ]
          var femaleFormula = [
            function (w, h) { return 7.4 * w + 4.82 * h + 217 },
            function (w, h) { return 13.3 * w + 3.34 * h + 35 },
            function (w, h) { return 8.7 * w + 0.25 * h + 865 },
            function (w, h) { return 9.2 * w + 6.37 * h + 302 }
          ]
          if (gender) { // male
            return maleFormula[ageRange(age)](weight, height)
          } else { // female
            return femaleFormula[ageRange(age)](weight, height)
          }
        }
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
            fat: self.moreWeightMsg.fat || -1,
            moisture: self.moreWeightMsg.moisture || -1,
            bone: self.moreWeightMsg.bone || -1,
            muscle: self.moreWeightMsg.muscle || -1,
            kcal: self.moreWeightMsg.kcal || -1,
            organs: self.moreWeightMsg.organs || -1,
            internalage: self.moreWeightMsg.internalage || -1,
            basalMetabolic: self.moreWeightMsg.basalMetabolic || -1
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
        // 微信秤时调用另外一个连接函数
        if (/weixin/i.test(device.name)) {
          self.isWeixinScale = true
          api.connectWXDevice(device).then((r) => {
            if (r.status - 0 === 200) {
              self.setWXFatScaleMsg(device)
              self.connectedDevices.isConnected = true
              self.connectedDevices.name = device.name
              self.connectedDevices.deviceid = device.deviceid
            }
          })
        } else {
          self.isWeixinScale = false
          api.connectDevice(device).then((r) => {
            if (r.status - 0 === 200) {
              self.connectedDevices.isConnected = true
              self.connectedDevices.name = device.name
              self.connectedDevices.deviceid = device.deviceid
            }
          })
        }
      },
      /**
       * 监听扫描结果 若当前未连接设备 会尝试连接
       * @return {[type]} [description]
       */
      listenScaleDate () {
        var self = this
        SDK.on('onScanXDeviceResult', function (r) {
          // var dataArr = decodeBase64(r.data)
          // alert(JSON.stringify(r))
          // alert(dataArr)
          if (!self.connectedDevices.isConnected && isFatScale(r.data, r.name) && existsInList(self.deviceList, 'deviceid', r.deviceid)) {
            // var dataArr = decodeBase64(r.data)
            self.connectDevice(r)
            setTimeout(() => {
              self.connectDevice(r)
            }, 5000)
          }
        })
        SDK.on('onRecvXDeviceData', function (r) {
          var dataArr = decodeBase64(r.data)
          // alert(dataArr)
          if (r.deviceid === self.connectedDevices.deviceid) {
            if (self.isWeixinScale) {
              // 微信秤逻辑
              self.onWeixinFatScale(dataArr)
            } else {
              // 非微信秤逻辑
              // var dataArr = decodeBase64(r.data)
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
          }
        })
      },

      /**
       * 向微信秤设置个人信息
       * @param {[type]} device [description]
       */
      setWXFatScaleMsg (device) { // debug
        var self = this
        console.log(self.selectedUser.name)
        console.log(self.selectedUser.height)
        console.log(self.selectedUser.sex)
        console.log(self.selectedUser.birthday)
        var data = []
        api.sendXDeviceData(device, data).then((r) => {
          alert(JSON.stringify(r))
        })
      },
      /**
       * 解析微信秤返回数据
       * @return {[type]} [description]
       */
      onWeixinFatScale (dataArr) {
        var self = this
        // alert('微信秤的返回数据：' + dataArr)
        self.scaleData.weight = parseInt('0x' + dataArr[4] + dataArr[3]) / 10
        self.scaleData.bmi = parseInt(self.scaleData.weight / ((self.selectedUser.height / 100) * (self.selectedUser.height / 100)) * 10) / 10
        if (dataArr[1] === '02' && self.scaleData.weight > 0) {
          self.canSaveData = true
        }
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
        api.getDeviceFatScaleList().then((r) => {
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
            // alert(JSON.stringify(r.data.list[0]))
            var users = []
            var hasSelectedUser = false
            r.data.list.map((item) => {
              var user = {
                name: 'yonghu11',
                headerImg: 'static/male.png',
                sex: 'female',
                height: 178,
                selected: 0,
                birthday: '1991-10-12'
              }
              user.name = item.name
              user.headerImg = item.headerImg
              user.sex = item.sex
              user.height = item.height
              user.weight = item.weight
              user.birthday = item.birthday
              user._id = item._id
              user.selected = (item._id === window.localStorage.getItem('selectedUserId'))
              if (user.selected) {
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
          this.link('/devices/add/fat')
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

  .devices-fat-scale
  .devices-bmi-scale
    .devices-header-box
      width 100%
      background none
      font-size 0.8rem
      position relative
      z-index 3
      .margin-top
        height 0.7rem
        color #fff
      .content
        width 100%
        height 2rem
        position relative
        .title
          width 70%
          height 100%
          line-height 2rem
          margin 0 auto
          text-align center
          overflow hidden
          text-overflow ellipsis
          color #fff
          font-size 1rem
          .device-name
            display inline
            position relative
            font-size 0.8rem
            text-overflow ellipsis
            .triangle
              position absolute
              top 50%
              /*left 110%*/
              margin-left 0.2rem
              width 0
              height 0
              border-top 0.3rem solid #fff
              border-left 0.3rem solid transparent
              border-right 0.3rem solid transparent
        .more-device-box
          width 100%
          background rgba(0,0,0,0.3)
          .device-box
            max-height 14rem
            background #fff
            overflow-x hidden
            overflow-y auto
            box-shadow 0 0.2rem 0.5rem rgba(0,0,0,0.2)
            .device-li
              height 4rem
              box-sizing border-box
              border-bottom 1px solid rgba(0,0,0,0.2)
              .device-msg
                width 100%
                height 100%
                position relative
                .device-img
                  position absolute
                  left 1rem
                  top 50%
                  transform translate3d(0,-50%,0)
                  width 2rem
                  height 2rem
                  background #fff
                .device-text
                  position absolute
                  left 4rem
                  top 0
                  height 100%
                  width 10rem
                  .device-name
                    width 80%
                    height 100%
                    line-height 4rem
                    overflow hidden
                    font-size 0.8rem
                    color #000
                    text-overflow ellipsis
                .device-select-state
                  width 1.2rem
                  height 1.2rem
                  position absolute
                  right 1.5rem
                  top 50%
                  transform translate3d(0,-50%,0)
                  background no-repeat url('../../../shared/assets/images/icons/tick-yellow.png') center /100%
        .left
          width 15%
          height 100%
          position absolute
          left 0
          top 0
          background url("../../../shared/assets/images/icons/icon_leftArrow.png") no-repeat center
          background-size 20% 40%
        .right
          width 15%
          height 100%
          position absolute
          right 0
          top 0
          .more-nav-box
            background #fff
            position absolute
            right 0.3rem
            top 100%
            border-radius 0.2rem
            &:before
              content ""
              display block
              position absolute
              bottom 99%
              right 0.3rem
              border-bottom 0.4rem solid #fff
              border-left 0.4rem solid transparent
              border-right 0.4rem solid transparent
            ul
              li.more-nav-li
                height 2.6rem
                line-height 2.6rem
                padding-left 0.5rem
                padding-right 1.5rem
                box-sizing border-box
                border-bottom 1px solid rgba(0,0,0,0.2)
                color #ababab
                white-space nowrap
        .set
          background url("../../../shared/assets/images/icons/icon-set.png") no-repeat center
          background-size 60% 62%
    .devices-body
      width 100%
      .user-box
        height 1.8rem
        position relative
        z-index  2
        .current-user
          height 1.8rem
          line-height 1.8rem
          font-size 0.8rem
          padding-left 0.6rem
          .triangle
            position relative
            top 33%
            left 0
            width 0
            height 0
            border-top 0.25rem solid #fff
            border-left 0.25rem solid transparent
            border-right 0.25rem solid transparent
        .more-user-box
          width 100%
          background rgba(0,0,0,0.3)
          .user-list-box
            max-height 14rem
            background #fff
            overflow-x hidden
            overflow-y auto
            box-shadow 0 0.2rem 0.5rem rgba(0,0,0,0.2)
            .user-li
              height 4rem
              box-sizing border-box
              border-bottom 1px solid rgba(0,0,0,0.2)
              .user-msg
                width 100%
                height 100%
                position relative
                .user-img
                  position absolute
                  left 1rem
                  top 50%
                  transform translate3d(0,-50%,0)
                  width 2.6rem
                  height 2.6rem
                  background #fff
                  border-radius 50%
                  overflow hidden
                .user-text
                  position absolute
                  left 4rem
                  top 0
                  height 100%
                  width 10rem
                  .user-name
                    width 80%
                    height 100%
                    line-height 4rem
                    overflow hidden
                    font-size 0.8rem
                    color #000
                    text-overflow ellipsis
                .user-select-state
                  width 1.2rem
                  height 1.2rem
                  position absolute
                  right 1.5rem
                  top 50%
                  transform translate3d(0,-50%,0)
                  background no-repeat url('../../../shared/assets/images/icons/tick-yellow.png') center /100%
      .device-bluetooth-state
        width 1.2rem
        height 1rem
        background url("../../../shared/assets/images/icons/bluetooth.png") center /100%
        position absolute
        left 0.4rem
      .device-main-data-box
        width 100%
        .weight-box
          margin 0 auto
          width 100%
          height 3.5rem
          line-height 4rem
          text-align center
          overflow hidden
          .weight-num
            text-align center
            position relative
            display inline
            .main-num
              font-size 2.5rem
              letter-spacing -1px
              padding 0.2rem
            .other-weight-msg
              display inline
              position absolute
              /*left 100%*/
              bottom 0
              height 1rem
              line-height 1rem
              width 4.5rem
              text-align left
            .unit
              font-size 0.9rem
              position relative
              top -0.25rem
            .weight-change
              display inline-block
              line-height 1.2rem
              position relative
              top -0.6rem
              .triangle
                width 0
                height 0
                border-left 0.35rem solid transparent
                border-right 0.35rem solid transparent
                position absolute
                left 50%
                transform translate3d(-50%,0,0)
              &.down
                color #92ff00
                .triangle
                  border-top 0.35rem solid #92ff00
                  border-bottom 0 solid transparent
              &.up
                color #ff9c9c
                .triangle
                  border-top 0 solid transparent
                  border-bottom 0.35rem solid #ff9c9c
        .weight-target-box
          margin-top 0.2rem
          width 100%
          height 1rem
          line-height 1rem
          text-align center
          padding-left 0.5rem
          box-sizing border-box
          .weight-target-text
            font-size 0.65rem
          .weight-target-num
            font-size 0.75rem
          .weight-target-unit
            font-size 0.6rem
        .chart-box
          width 100%
          height 6rem
          .bmi-box
            float left
            width 50%
            height 6rem
            position relative
            .color-box
              width 4.5rem
              height 4.5rem
              border-top 0.3rem solid #8cfeff
              border-right 0.3rem solid #90fda2
              border-bottom 0.3rem solid #ffe083
              border-left 0.3rem solid #ff9b99
              border-radius 50%
              position absolute
              left 50%
              top 50%
              transform translate3d(-50%,-50%,0) rotate(-45deg)
            .number-box
              width 4.5rem
              height 4.5rem
              line-height 4.5rem
              position absolute
              left 50%
              top 50%
              transform translate3d(-50%,-50%,0)
              .bmi-number
                text-align center
                position relative
                font-size 1.7rem
                line-height 4.8rem
                .title
                  position absolute
                  top 0
                  font-size 0.8rem
                  width 100%
                  text-align center
                  height 1.4rem
                  line-height 2rem
                  padding-left 0.1rem
          .residual-time-box
            float left
            width 50%
            height 6rem
            position relative
            .svg-box
              width 100%
              height 100%
              .circle2
                circle
                  transform-origin 50% 50%
                  transform rotate(90deg)
            .number-box
              width 4.5rem
              height 4.5rem
              line-height 4.5rem
              position absolute
              left 50%
              top 50%
              transform translate3d(-50%,-50%,0)
              .bmi-number
                text-align center
                position relative
                font-size 1.8rem
                line-height 4.8rem
                .title
                  position absolute
                  top 0.2rem
                  font-size 0.65rem
                  width 100%
                  text-align center
                  height 1.6rem
                  line-height 2rem
                .unit
                  position absolute
                  top 2.6rem
                  font-size 0.7rem
                  width 100%
                  text-align center
                  height 1.6rem
                  line-height 2rem
      .details-box
        max-height 8rem
        width 100%
        overflow-x hidden
        overflow-y auto
        padding 0 0 0 1rem
        box-sizing border-box
        .fat-scale-details-box
          width 100%
          height 100%
          background rgba(0,0,0,0.2)
          .details
            width 33.33%
            height 3rem
            float left
            padding-right 0.2rem
            box-sizing border-box
            position relative
            .icon
              width 1.1rem
              height 1.1rem
              position absolute
              top 50%
              transform translate3d(0,-50%,0)
              background-size 100% 100%
            .icon.fat-icon
              background-image url("../../assets/images/icons/zhifang.png")
            .icon.bone-icon
              background-image url("../../assets/images/icons/bone.png")
            .icon.kcal-icon
              background-image url("../../assets/images/icons/kcal.png")
            .icon.moisture-icon
              background-image url("../../assets/images/icons/moisture.png")
            .icon.muscle-icon
              background-image url("../../assets/images/icons/muscle.png")
            .icon.basalMetabolic-icon
              background-image url("../../assets/images/icons/basalMetabolic.png")
            .icon.internalage-icon
              background-image url("../../assets/images/icons/internalage.png")
            .text
              position absolute
              top 50%
              transform translate3d(0,-50%,0)
              height 2rem
              line-height 0.9rem
              width 100%
              font-size 0.55rem
              padding-left 1.5rem
              box-sizing border-box
              span
                width 100%
                white-space nowrap
                text-overflow ellipsis
                overflow hidden
                display inline-block
              .num
                font-size 0.9rem
                span
                  display inline
                .unit
                  font-size 0.65rem
    .save-button.disabled
      background #C3C3C3
</style>
