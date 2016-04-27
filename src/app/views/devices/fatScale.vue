<template>
  <div class="devices-fat-scale" @click="closeAllModal">
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
              <div class="device-msg">basalMetabolic
                <div class="device-img">
                  <img
                  :src="'static/fat-scale-gray.png'"
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
    <!-- <div class="log-box" style="top: 10rem">
      <div class="log" v-for="log in logs" track-by="$index"> {{log}} </div>
    </div> -->
    <div class="devices-body" v-heightauto>
      <!-- <pre>{{test | json}}</pre> -->
      <!-- <pre>{{apptype}}</pre> -->
      <!-- <pre>{{moreWeightMsg | json}}</pre> -->
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
          <div class="weight-targe">
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
                <div class="title">BMI</div>
                <span>{{scaleData.bmi}}</span>
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
                <div class="title">{{$t('other.rest_time')}}</div>
                <span>{{plan.remaining}}</span>
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
          <div class="details bone" v-show="moreWeightMsg.bone>0">
            <div class="icon bone-icon"></div>
            <div class="text bone-text">
              <div class="name"><span>{{$t('more_weight_messages.bone')}}</span></div>
              <div class="num">
                <span>{{moreWeightMsg.bone>0?moreWeightMsg.bone:'--'}}</span><span class="unit" v-show="moreWeightMsg.bone>0">kg</span>
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
          <!-- <div class="details kcal">
            <div class="icon kcal-icon"></div>
            <div class="text kcal-text">
              <div class="name"><span>{{$t('more_weight_messages.kcal')}}</span></div>
              <div class="num">
                <span>--</span><span class="unit" v-show="moreWeightMsg.kcal>0">%</span>
              </div>
            </div>
          </div> -->
          <div class="details basalMetabolic">
            <div class="icon basalMetabolic-icon"></div>
            <div class="text basalMetabolic-text">
              <div class="name"><span>{{$t('more_weight_messages.basalMetabolic')}}</span></div>
              <div class="num">
                <span>{{moreWeightMsg.basalMetabolic>0?moreWeightMsg.basalMetabolic:'--'}}</span><span class="unit" v-show="moreWeightMsg.basalMetabolic>0">kcal</span>
              </div>
            </div>
          </div>
          <div class="details internalage" v-show="moreWeightMsg.internalage>0">
            <div class="icon internalage-icon"></div>
            <div class="text internalage-text">
              <div class="name"><span>{{$t('more_weight_messages.internalage')}}</span></div>
              <div class="num">
                <span>{{moreWeightMsg.internalage>0?moreWeightMsg.internalage:'--'}}</span><span class="unit" v-show="moreWeightMsg.internalage>0"></span>
              </div>
            </div>
          </div>
          <div class="details organs" v-show="moreWeightMsg.organs>0">
            <div class="icon organs-icon"></div>
            <div class="text organs-text">
              <div class="name"><span>{{$t('more_weight_messages.organs')}}</span></div>
              <div class="num">
                <span>{{moreWeightMsg.organs>0?moreWeightMsg.organs:'--'}}</span><span class="unit" v-show="moreWeightMsg.organs>0"></span>
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
        logs: [],
        test: {},
        apptype: '无',
        isWeixinScale: false,
        canShowMessage: true,
        canSaveData: false,
        showMoreDevices: false, // 选择设备浮层开关
        showMoreUsers: false, // 选择用户浮层开关
        showMoreNav: false, // 更多菜单浮层开关
        weightUnit: window.localStorage.weightUnit || 'kg',
        selectedUserId: window.localStorage.selectedUserId || '',
        scaleData: {
          // weight: 50,
          // bmi: 0,
          // fat: 21.6,
          // moisture: 56.1,
          // muscle: 44.5,
          // basalMetabolic: 1633,
          // bone: 3,
          // organs: 97,
          // internalage: 30
          weight: 0,
          bmi: 0,
          fat: 0,
          moisture: 0,
          muscle: 0,
          basalMetabolic: 0,
          bone: 0,
          organs: 0,
          internalage: 0
        },
        listenDeviceId: '',
        connectedDevices: {
          isConnected: false, // 当前是否已经连接设备
          deviceid: ''
        },
        deviceList: [
          {
            name: 'asdjk2j3k4h',
            selected: 1,
            deviceid: 'asdfbjkaf'
          },
          {
            name: 'asdjk2j3k4h',
            selected: 0,
            deviceid: '453132132sd1f'
          }
        ],
        userList: [
          // {
          //   name: 'yonghu11',
          //   headerImg: 'static/male.png',
          //   sex: 'male',
          //   selected: 0
          // },
          // {
          //   name: 'yonghu11',
          //   headerImg: 'static/female.png',
          //   sex: 'female',
          //   selected: 1,
          //   height: 178,
          //   birthday: '1991-12-25'
          // },
          // {
          //   name: 'yonghu11',
          //   headerImg: 'static/female.png',
          //   sex: 'female',
          //   selected: 0
          // },
          // {
          //   name: 'yonghu11',
          //   headerImg: 'static/female.png',
          //   sex: 'female',
          //   selected: 0
          // }
        ],
        plan: {
          target: '--',
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
        var result = this.$t('placeholders.select_device')
        if (self.connectedDevices.deviceid.length > 0) {
          self.deviceList.map((item) => {
            item.selected = 0
            if (item.deviceid === self.connectedDevices.deviceid) {
              result = item.name
              item.selected = 1
            }
          })
        } else {
          self.deviceList.map((item) => {
            if (item.selected === 1) {
              result = item.name
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
        var result = '--'
        if (this.plan.target > 0) {
          result = this.weightFormula(this.weightUnit, this.plan.target)
        }
        return result
      },

      moreWeightMsg () {
        var self = this
        console.log(self.scaleData.weight)
        console.log(self.selectedUser.height)
        var result = {
          fat: -1,
          moisture: -1,
          muscle: -1,
          basalMetabolic: -1,
          bone: -1,
          organs: -1,
          internalage: -1
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
          result.fat = self.scaleData.fat || parseInt(fat * 10) / 10
          result.moisture = self.scaleData.moisture || parseInt(moisture * 10) / 10
          result.muscle = self.scaleData.muscle || parseInt(muscle * 10) / 10
          result.basalMetabolic = self.scaleData.basalMetabolic || parseInt(basalMetabolic)
          result.bone = self.scaleData.bone
          result.organs = self.scaleData.organs
          result.internalage = self.scaleData.internalage
        }
        // 微信秤的时候一开始不计算出各个信息
        if (!(self.scaleData.fat > 0)) {
          result.fat = -1
          result.moisture = -1
          result.muscle = -1
          result.basalMetabolic = -1
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
            kcal: self.moreWeightMsg.basalMetabolic || -1, // kcal就是基础代谢
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
        var serviceUUID
        self.apptype = '尝试连接设备'
        // 微信秤时调用另外一个连接函数
        if (device.serviceUUIDs && device.serviceUUIDs.join) {
          serviceUUID = device.serviceUUIDs.join('').replace(/\W/g, '')
        } else {
          serviceUUID = device.serviceUUIDs.replace(/\W/g, '')
        }
        if (!device.data) {
          device.data = ''
        }
        // alert(decodeBase64(device.data) && decodeBase64(device.data).slice(5, 7).join('').toLowerCase() === 'e7fe')
        // self.log('当前是否微信秤？' + (decodeBase64(device.data) && decodeBase64(device.data).slice(5, 7).join('').toLowerCase() === 'e7fe'))
        self.log(JSON.stringify(device))
        if (/fee7/i.test(serviceUUID) || (decodeBase64(device.data) && decodeBase64(device.data).slice(5, 7).join('').toLowerCase() === 'e7fe') || self.isWeixinScale) {
          self.isWeixinScale = true
          // alert('当前是微信秤')
          self.log('尝试连接微信设备')
          // alert(JSON.stringify(device))
          api.connectWXDevice(device).then((r) => {
            if (r.status - 0 === 200) {
              self.apptype = '已经发出连接设备请求'
              self.connectedDevices.name = device.name
              self.connectedDevices.deviceid = device.deviceid
            }
          })
        } else {
          self.log('尝试连接普通设备')
          self.isWeixinScale = false
          api.connectDevice(device).then((r) => {
            if (r.status - 0 === 200) {
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
        self.log('监听扫描结果 若当前未连接设备 会尝试连接')
        // 扫描结果
        SDK.on('onScanXDeviceResult', function (r) {
          // var dataArr = decodeBase64(r.data)
          // if (r.serviceUUIDs) {
          //   alert(JSON.stringify(r.serviceUUIDs))
          // }
          // alert(dataArr)
          // self.apptype = '当前设备未连接？' + Boolean(!self.connectedDevices.isConnected)
          if (!r.serviceUUIDs) {
            r.serviceUUIDs = ''
          }
          // self.apptype = 'serviceUUIDs?' + r.serviceUUIDs.join && r.serviceUUIDs.join('').replace(/\W/g, '')
          // self.log('当前秤是微信秤？' + isFatScale(r.data, r.serviceUUIDs))
          // self.apptype = '当前秤不再列表中？' + Boolean(existsInList(self.deviceList, 'deviceid', r.deviceid))
          if (!self.connectedDevices.isConnected && isFatScale(r.data, r.serviceUUIDs) && existsInList(self.deviceList, 'deviceid', r.deviceid)) {
            self.log('扫描到符合条件的设备 尝试连接设备' + r.name)
            // alert(JSON.stringify(r))
            // var dataArr = decodeBase64(r.data)
            if (self.listenDeviceId.length > 0) {
              self.log('当前监听设备' + self.listenDeviceId)
              if (r.deviceid === self.listenDeviceId) {
                self.connectDevice(r)
                setTimeout(() => {
                  self.connectDevice(r)
                }, 5000)
              }
            } else {
              self.log('当前无监听设备 尝试连接' + r.name)
              self.connectDevice(r)
              setTimeout(() => {
                self.connectDevice(r)
              }, 5000)
            }
          }
        })
        // 设备状态改变
        SDK.on('onXDeviceStateChange', function (r) {
          // self.apptype = '设备状态改变 1为已连接' + r.state
          self.log('设备状态改变 1为已连接 当前为' + r.state)
          // alert(JSON.stringify(r))
          // r.state  0是正在连接 1是已连接 2是断开 3是扫描中
          // alert('设备状态改变' + r.state)
          if (r.state - 0 === 1) {
            self.connectedDevices.isConnected = true
            // alert('设备已连接,当前是微信秤？' + self.isWeixinScale)
            if (self.isWeixinScale) {
              setTimeout(() => {
                self.log('判断当前是微信秤 即将向微信秤设置个人信息')
                self.setWXFatScaleMsg()
              }, 1000)
            }
          } else if (r.state - 0 === 2) {
            self.connectedDevices.isConnected = false
          }
          // self.connectedDevices.isConnected = true
        })
        // 设备上报数据
        SDK.on('onRecvXDeviceData', function (r) {
          self.apptype = JSON.stringify(r)
          var dataArr = decodeBase64(r.data)

          if (dataArr[0] === '0d' && dataArr[1] === 'ff') {
            dataArr.shift()
            dataArr.shift()
          }

          // alert(dataArr)
          if (r.deviceid === self.connectedDevices.deviceid) {
            self.log('当前设备上报数据：' + dataArr + '\n当前是微信秤？' + self.isWeixinScale)

            // alert('设备返回数据： ' + dataArr)
            if (self.isWeixinScale) {
              // 微信秤逻辑
              self.onWeixinFatScale(dataArr)
            } else {
              // 非微信秤逻辑
              // var dataArr = decodeBase64(r.data)
              var coefficient = 10
              if (dataArr[10] === '5a') {
                coefficient = 100
              }
              self.scaleData.weight = parseInt('0x' + dataArr[5] + dataArr[6]) / coefficient
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
      setWXFatScaleMsg () { // debug
        var self = this
        self.log('向微信秤设置个人信息')
        console.log(self.selectedUser.name)
        console.log(self.selectedUser.height)
        console.log(self.selectedUser.sex)
        console.log(self.selectedUser.birthday)
        var age = new Date().getFullYear() - new Date(self.selectedUser.birthday).getFullYear()
        console.log(age)
        var deviceParams = {
          deviceid: self.connectedDevices.deviceid,
          serviceUUID: 'FFB0',
          charUUID: 'FFB2'
        }
        var data = []
        data[0] = '0xFA' // 固定头
        data[1] = '0x85' // 用于指示设置个人信息
        data[2] = '0x04' // 指令长度 固定为04
        data[3] = '0x00' // 用户号码
        data[4] = self.selectedUser.sex === 'male' ? '0x01' : '0x00' // 性别 00女性 01男性
        data[5] = '0x' + to16(age) // 年龄
        data[6] = '0x' + to16(self.selectedUser.height) // 身高
        var middleData = [].concat(data) // 克隆一个新数组
        middleData.shift()
        data[7] = '0x' + to16(middleData.reduce(function (prev, next) {
          return prev ^ next
        }))
        // alert('向设备' + deviceParams.deviceid + '发送数据' + JSON.stringify(deviceParams) + 'data为' + JSON.stringify(data))
        api.sendXDeviceData(deviceParams, data).then((r) => {
          // alert(JSON.stringify(r))
        })
        function to16 (data) {
          return data.toString(16)
        }
      },
      /**
       * 解析微信秤返回数据
       * @return {[type]} [description]
       */
      onWeixinFatScale (dataArr) {
        var self = this
        self.log('解析微信秤返回数据:' + dataArr)
        // alert(JSON.stringify(dataArr))
        if (dataArr[1] === '01') {
          self.apptype = JSON.stringify(dataArr)
          // alert('微信秤未稳定返回数据： ' + JSON.stringify(dataArr))
          // alert('微信秤未稳定返回数据： ' + (dataArr[5] === '00'))
        }
        if (dataArr[5] === '00') {
          // alert('微信秤的返回数据：' + dataArr)
          // self.test = self.scaleData
          // self.test.data4 = dataArr[4]
          // self.test.data3 = dataArr[3]
          // self.test.fat = '脂肪：' + parseInt('0x' + (dataArr[7] + dataArr[6])) / 10
          // self.test.moisture = '水分：' + parseInt('0x' + (dataArr[9] + dataArr[8])) / 10
          // self.test.muscle = '肌肉：' + parseInt('0x' + (dataArr[10] + dataArr[11])) / 10
          // self.test.basalMetabolic = '基础代谢：' + parseInt('0x' + (dataArr[13] + dataArr[12])) / 10
          // self.test.bone = '骨骼：' + parseInt('0x' + (dataArr[14])) / 10
          // // self.test.bmi = 'bmi：' + parseInt('0x' + (dataArr[16] + dataArr[15])) / 10
          // self.test.organs = '内脏脂肪：' + parseInt('0x' + (dataArr[18] + dataArr[17])) / 10
          // self.test.internalage = '体内年龄：' + parseInt('0x' + (dataArr[19])) / 10
          self.scaleData.fat = parseInt('0x' + (dataArr[7] + dataArr[6])) / 10
          self.scaleData.moisture = parseInt('0x' + (dataArr[9] + dataArr[8])) / 10
          self.scaleData.muscle = parseInt('0x' + (dataArr[11] + dataArr[10])) / 10
          self.scaleData.basalMetabolic = parseInt('0x' + (dataArr[13] + dataArr[12])) // 这个也是kcal
          self.scaleData.bone = parseInt('0x' + (dataArr[14])) / 10
          // self.scaleData.bmi = 'bmi：' + parseInt('0x' + (dataArr[16] + dataArr[15])) / 10
          self.scaleData.organs = parseInt('0x' + (dataArr[18] + dataArr[17]))
          self.scaleData.internalage = parseInt('0x' + (dataArr[19]))
        // } else {
        //   self.showMessage('error')
        }
        if ((dataArr[1] === '01') || (dataArr[1] === '02')) {
          if (dataArr[4] || dataArr[3]) {
            self.scaleData.weight = parseInt('0x' + dataArr[4] + dataArr[3]) / 10

            self.test.dataArr = '0x' + dataArr[4] + dataArr[3]
            self.scaleData.bmi = parseInt(self.scaleData.weight / ((self.selectedUser.height / 100) * (self.selectedUser.height / 100)) * 10) / 10
            // // 当数据稳定时且测的体重>0候允许保存
            // if (dataArr[1] === '02' && self.scaleData.weight > 0) {
            //   self.canSaveData = true
            // }
            // 当测的体重>0候允许保存
            if ((self.scaleData.weight > 0) && (dataArr[1] === '02')) {
              self.canSaveData = true
            }
          }
        }
      },
      /**
       * 切换设备
       * @param  {[type]} user [description]
       * @return {[type]}      [description]
       */
      selectDevice (device) {
        console.log(device)
        var oldDevice = {
          deviceid: this.connectedDevices.deviceid
        }
        this.showMoreDevices = false
        this.deviceList.map((item) => {
          item.selected = 0
        })
        device.selected = 1
        this.connectedDevices.deviceid = ''
        this.connectedDevices.isConnected = false
        this.listenDeviceId = device.deviceid
        this.isWeixinScale = false
        // var oldDevice = {
        //   deviceid: ''
        // }
        api.disconnectDevice(oldDevice).then((r) => {
          this.connectDevice(device)
        })
        this.connectDevice(device)
      },
      /**
       * 切换用户
       * @param  {[type]} user [description]
       * @return {[type]}      [description]
       */
      selectUser (user) {
        this.showMoreUsers = false
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
              device.serviceUUIDs = item.serviceUUIDs
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
              user.selected = (item._id - 0 === window.localStorage.getItem('selectedUserId') - 0)
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
        self.log('扫描设备')
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
       * 断开已连接设备
       * @return {[type]} [description]
       */
      disconnectDevice () {
        api.disconnectDevice()
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
        var self = this
        // self.disconnectDevice()
        setTimeout(() => {
          self.stopScanDevice()
        }, 500)
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
      },
      log (text) {
        this.logs.push(text)
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../../shared/assets/style/common'

  .devices-fat-scale
  .devices-bmi-scale
    .devices-header-box
      width 100%
      background none
      font-dpr 18px
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
          font-dpr 22px
          .device-name
            display inline
            position relative
            font-dpr 18px
            text-overflow ellipsis
            .triangle
              absolute top 50%
              triangle #FFF rem(18) down
              margin-left 0.2rem
        .more-device-box
          width 100%
          background rgba(0,0,0,0.3)
          .device-box
            max-height rem(600)
            background #fff
            overflow-x hidden
            overflow-y auto
            box-shadow 0 0.2rem 0.5rem rgba(0,0,0,0.2)
            .device-li
              height rem(160)
              box-sizing border-box
              border-bottom 1px solid rgba(0,0,0,0.2)
              .device-msg
                width 100%
                height 100%
                position relative
                .device-img
                  position absolute
                  left rem(50)
                  top 50%
                  transform translate3d(0,-50%,0)
                  size rem(64)
                  background #fff
                .device-text
                  absolute left rem(170) top
                  size 5rem 100%
                  .device-name
                    height 100%
                    line-height 2rem
                    font-dpr 18px
                    color #000
                    text-overflow 100%
                .device-select-state
                  size rem(30)
                  absolute right rem(40) top 50%
                  transform translate3d(0,-50%,0)
                  background no-repeat url('../../../shared/assets/images/icons/tick-yellow.png') center /100%
                  background-size rem(36)
        .left
          width 15%
          height 100%
          position absolute
          left 0
          top 0
          background url("../../../shared/assets/images/icons/icon_leftArrow.png") no-repeat center
          background-size rem(26) rem(42)
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
            border-radius rem(10)
            &:before
              triangle #FFF rem(30) up
              absolute right rem(20) top rem(-30)
              content ''
            ul
              li.more-nav-li
                height rem(90)
                line-height rem(90)
                padding 0 rem(40)
                box-sizing border-box
                border-bottom 1px solid rgba(0,0,0,0.2)
                color #ffa96f
                white-space nowrap
                font-dpr 16px
        .set
          background url("../../../shared/assets/images/icons/icon-set.png") no-repeat center
          background-size rem(50)
    .devices-body
      width 100%
      .user-box
        height rem(54)
        position relative
        z-index  2
        margin-bottom rem(20)
        .current-user
          /*height rem(54)*/
          font-dpr 18px
          padding-left rem(40)
          .triangle
            relative top left
            triangle #FFF rem(18) down
        .more-user-box
          width 100%
          background rgba(0,0,0,0.3)
          .user-list-box
            max-height 8rem
            background #fff
            overflow-x hidden
            overflow-y auto
            box-shadow 0 0.2rem 0.5rem rgba(0,0,0,0.2)
            .user-li
              height rem(160)
              box-sizing border-box
              border-bottom 1px solid rgba(0,0,0,0.2)
              .user-msg
                width 100%
                height 100%
                position relative
                .user-img
                  absolute left rem(36) top 50%
                  transform translate3d(0,-50%,0)
                  size rem(100)
                  border rem(3) solid #CFCFCF
                  box-sizing border-box
                  background #fff
                  border-radius 50%
                  overflow hidden
                .user-text
                  position absolute
                  left rem(170)
                  top 0
                  height 100%
                  width 5rem
                  .user-name
                    width 80%
                    height 100%
                    line-height rem(160)
                    overflow hidden
                    font-dpr 18px
                    color #000
                    text-overflow ellipsis
                .user-select-state
                  size rem(36)
                  position absolute
                  right rem(40)
                  top 50%
                  transform translate3d(0,-50%,0)
                  background no-repeat url('../../../shared/assets/images/icons/tick-yellow.png') center /100%
                  background-size rem(36)
      .device-bluetooth-state
        size rem(50)
        background url("../../../shared/assets/images/icons/bluetooth.png") center /100%
        position absolute
        left rem(30)
      .device-main-data-box
        width 100%
        .weight-box
          margin 0 auto
          width 100%
          height rem(160)
          text-align center
          .weight-num
            text-align center
            position relative
            display inline
            .main-num
              font-dpr 70px
              line-height rem(160)
              letter-spacing -1px
            .other-weight-msg
              display inline
              position absolute
              bottom 0
              width 4.5rem
              text-align left
            .unit
              font-dpr 20px
              position relative
              top rem(10)
            .weight-change
              font-dpr 20px
              display inline-block
              position relative
              .triangle
                triangle #FFF rem(18) down
                absolute left 50%
                transform translate3d(-50%,0,0)
              &.down
                color #92ff00
                .triangle
                  triangle #92ff00 rem(18) down
              &.up
                color #ff9c9c
                .triangle
                  border-top 0 solid transparent
                  border-bottom 0.35rem solid #ff9c9c
        .weight-target-box
          width 100%
          line-height rem(50)
          text-align center
          padding-left rem(30)
          box-sizing border-box
          .weight-target-text
            font-dpr 14px
          .weight-target-num
            font-dpr 18px
          .weight-target-unit
            font-dpr 12px
        .chart-box
          width 100%
          height rem(240)
          .bmi-box
            float left
            width 50%
            height rem(240)
            position relative
            .color-box
              size rem(180)
              border-top rem(12) solid #8cfeff
              border-right rem(12) solid #90fda2
              border-bottom rem(12) solid #ffe083
              border-left rem(12) solid #ff9b99
              border-radius 50%
              position absolute
              left 50%
              top 50%
              transform translate3d(-50%,-50%,0) rotate(-45deg)
            .number-box
              size rem(180)
              position absolute
              left 50%
              top 50%
              transform translate3d(-50%,-50%,0)
              .bmi-number
                text-align center
                position relative
                margin-top rem(30)
                font-dpr 30px
                line-height 1
                .title
                  font-dpr 14px
                  width 100%
                  text-align center
          .residual-time-box
            float left
            width 50%
            height rem(240)
            position relative
            .svg-box
              width 100%
              height 100%
              .residual-time
                size 100%
              .circle2
                circle
                  transform-origin 50% 50%
                  transform rotate(90deg)
            .number-box
              absolute left 50% top rem(30)
              transform translate3d(-50%, 0, 0)
              size rem(180)
              .bmi-number
                position absolute
                left 50%
                top 50%
                transform translate3d(-50%,-50%,0)
                text-align center
                /*position relative*/
                font-dpr 20px
                line-height 1.2
                .title
                  /*position absolute*/
                  /*top 0.2rem*/
                  font-dpr 11px
                  width 100%
                  text-align center
                  /*height 1.6rem*/
                  /*line-height 2rem*/
                .unit
                  /*position absolute*/
                  /*top 2.6rem*/
                  font-dpr 12px
                  width 100%
                  text-align center
                  /*height 1.6rem*/
                  /*line-height 2rem*/
      .details-box
        max-height 5.5rem
        width 100%
        overflow-x hidden
        overflow-y auto
        padding 0 0 0.5rem 1rem
        box-sizing border-box
        .fat-scale-details-box
          width 100%
          height 100%
          clearfix()
          .details
            width 33.33%
            height rem(120)
            float left
            padding-right 0.2rem
            box-sizing border-box
            line-height 1.2
            position relative
            .icon
              size rem(40)
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
            .icon.organs-icon
              background-image url("../../assets/images/icons/organs.png")
            .text
              position absolute
              top 50%
              transform translate3d(0,-50%,0)
              /*height 2rem*/
              width 100%
              font-dpr 12px
              padding-left rem(60)
              box-sizing border-box
              span
                text-overflow 100%
                display inline-block
              .num
                font-dpr 18px
                span
                  display inline
                .unit
                  font-dpr 12px
    .save-button-box
      position fixed
      bottom rem(45)
      width 100%
      height rem(94)
      padding 0 0.5rem
      text-align center
      box-sizing border-box
      .save-button
        width 45%
        height rem(94)
        background #ffa96f
        border rem(3) solid #fff
        border-radius 1rem
        font-dpr 18px
        &.disabled
          background #C3C3C3
</style>
