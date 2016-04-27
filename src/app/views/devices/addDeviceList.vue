<template>
  <div class="add-device-list">
    <header-nav
    :title="title">
    </header-nav>
    <div class="device-list-box iosScrollBug">
      <!-- <pre>{{test | json}}</pre> -->
      <!-- <pre>{{testType}}</pre> -->
      <!-- <pre> {{ devices | json}}</pre> -->
      <div class="device-ul">
        <div v-show="devices.length>0" class="device-li" v-for="device in toShowDeivceList">
          <div class="device-msg">
            <div class="device-img">
              <img :src="deviceIcon" alt="" width="100%" height="100%">
            </div>
            <div class="device-text">
              <div class="device-name">
                {{device.name}}
              </div>
              <div class="device-code">
                {{device.deviceid}}
              </div>
            </div>
            <div class="device-bind-box" :class="{'bound': device.isBound}">
              <div class="button-box" @touchend="bindDevice(device)">
                <span v-text="device.isBound?$t('device.bound'):$t('device.bind')"></span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="noDevices" v-show="devices.length==0">
          <img class="noDevices-img" :src="deviceIcon" alt="">
          <p>
            {{$t('device.no_devices')}}
          </p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  var Header = require('../../../shared/components/header.vue')
  import api from '../../api'
  import SDK from '../../helpers/sdk'
  import { isBMI, isFatScale, isWXFatScale, existsInList } from '../../mixins'
  import decodeBase64 from '../../helpers/decodeBase64'
  // import { existsInList } from '../../mixins'

  module.exports = {
    components: {
      'header-nav': Header
      // 'modal':Modal
    },

    data: function () {
      return {
        test: {a: '', b: '', c: ''},
        testType: '12',
        devices: [
          // {
          //   name: 'NAME1',
          //   deviceid: 'asd21ad1asd21ad',
          //   isBound: false,
          //   canShow: true
          // },
          // {
          //   name: 'NAME2',
          //   deviceid: 'asd21ad1',
          //   isBound: true,
          //   canShow: true
          // },
          // {
          //   name: 'NAME3',
          //   deviceid: 'asd21ad1',
          //   isBound: false
          // }
        ]
      }
    },

    computed: {
      /**
       * 显示在页面的设备列表数组
       * @return {[type]} [description]
       */
      toShowDeivceList () {
        var self = this
        var result = []
        self.devices.map((item) => {
          if (item.canShow) {
            result.push(item)
          }
        })
        return result
      },

      /**
       * 返回当前的设备是bmi秤还是脂肪秤
       * @return {[type]} [description]
       */
      deviceType () {
        return this.$route.params.deviceType
      },

      /**
       * 返回页面的标题  根据url上面的设备类型做判断
       * @return {[type]} [description]
       */
      title () {
        // var result = {
        //   'bmi': this.$t('title.scaning_device_bmi'),
        //   'fat': this.$t('title.scaning_device_fat')
        // }
        return this.$t('title.add_device')
      },

      /**
       * 设备icon
       * @return {[type]} [description]
       */
      deviceIcon () {
        var result = {
          'bmi': 'static/bmi.png',
          'fat': 'static/fat-scale.png'
        }
        return result[this.$route.params.deviceType] || 'fat-scale'
      }
    },

    created () {
      window.setTimeout(() => {
        this.scanDevice() // 扫描蓝牙设备
      }, 100)
    },

    route: {
      data () {
        var self = this
        // console.log(self.getDeviceList())
        // 获取设备列表 自动识别当前是bmi秤还是脂肪秤
        self.getDeviceList().then(function (r) {
          self.devices = []
          if (r.status - 0 === 200) {
            var deviceArr = []
            r.data.list.map((item) => {
              var device = {}
              device.name = item.name
              device.deviceid = item.deviceid
              device.isBound = item.isBound
              device.canShow = false
              deviceArr.push(device)
            })
            self.devices = deviceArr
          }
          // 监听新扫描到的设备
          SDK.on('onScanXDeviceResult', function (r) {
            // alert('是当前需要的秤？' + self.isThisScale(r.data))
            // 兼容安卓不返回serviceUUIDs
            if (!r.serviceUUIDs) {
              r.serviceUUIDs = '-1'
              self.test.a = r.serviceUUIDs
            }
            self.test.a = '是当前需要的秤？' + self.isThisScale(r.data, r.serviceUUIDs)
            self.test.a = decodeBase64(r.data).slice(5, 7).join('').toLowerCase()
            if (decodeBase64(r.data).slice(5, 6).join('').toLowerCase() === 'e7fe') {
              self.test.b = decodeBase64(r.data)
            }
            // alert(JSON.stringify(r))
            self.devices.map((item) => {
              if (item.deviceid === r.deviceid) {
                item.canShow = true
              }
            })
            if (!existsInList(self.devices, 'deviceid', r.deviceid) && self.isThisScale(r.data, r.serviceUUIDs)) {
              var device = {}
              device.name = r.name || 'TJSCALE'
              device.deviceid = r.deviceid
              device.isBound = false
              device.serviceUUIDs = r.serviceUUIDs
              device.canShow = true
              if (isWXFatScale(r.data, r.serviceUUIDs)) {
                device.serviceUUIDs = ['fee7']
              }
              self.devices.splice(0, 0, device)
            }
          })
        })
      }
    },

    ready () {
      // var self = this
      // setTimeout(() => {
      //   var obj = {
      //     name: 'NAME2',
      //     deviceid: 'asd21ad1',
      //     isBound: true,
      //     canShow: true
      //   }
      //   self.devices.push(obj)
      // }, 2000)
    },

    methods: {
      /**
       * 获取设备列表
       * @return {[type]} [description]
       */
      getDeviceList (params) {
        var result = {
          bmi: api.getDeviceBMIList,
          fat: api.getDeviceFatScaleList
        }
        return result[this.deviceType](params)
      },
      /**
       * 扫描蓝牙设备
       * @return {[type]} [description]
       */
      scanDevice () {
        api.scanDevice().then(function (r) {})
      },

      /**
       * 停止扫描设备
       * @return {[type]} [description]
       */
      stopScanDevice () {
        api.stopScanDevice().then(function (r) {})
      },
      /**
       * 绑定设备
       * @param  {object} device 当前被点击的设备
       * @return {[type]}        [description]
       */
      bindDevice (device) {
        var self = this
        var fun = {
          fat: 'addDeviceFatScale',
          bmi: 'addDeviceBMI'
        }
        var path = {
          fat: '/devices/fatScale',
          bmi: '/devices/bmi'
        }
        if (!device.isBound) {
          device.selected = 1
          device.isBound = 1
          // alert(JSON.stringify(device))
          api[fun[self.deviceType]](device).then(function (r) {
            if (r.status - 0 === 200) {
              self.$route.router.go(path[self.deviceType])
            } else {
              device.isBound = 0
            }
          })
          // self.stopScanDevice()
        }
      },

      /**
       * 通过广播包判断是否为当前的秤
       * @param  {[type]}  data [description]
       * @return {Boolean}      [description]
       */
      isThisScale (data, serviceUUIDs) {
        var result = {
          bmi: isBMI,
          fat: isFatScale
        }
        return result[this.deviceType](data, serviceUUIDs)
      }
    }
  }
</script>
<style lang="stylus">
  @import '../../../shared/assets/style/common'

  .add-device-list
    .device-list-box
      width 100%
      height 100%
      box-sizing border-box
      padding-bottom 2rem
      margin-top 0.2rem
      overflow-y auto
      overflow-x hidden
      border-top 1px solid rgba(255,255,255,0.5)
      .device-ul
        padding-left rem(30)
        padding-bottom 2rem
        .device-li
          height rem(140)
          box-sizing border-box
          border-bottom 1px solid rgba(255,255,255,0.5)
          .device-msg
            width 100%
            height 100%
            position relative
            transition transform 0.3s ease
            transform translate3d(0,0,0)
            .device-img
              position absolute
              left 0.2rem
              top 50%
              transform translate3d(0,-50%,0)
              size rem(80)
            .device-text
              position absolute
              left rem(130)
              top rem(20)
              width rem(300)
              .device-name
                font-dpr 18px
                text-overflow 100%
              .device-code
                font-dpr 12px
                opacity 0.8
                color #ccffff
                text-overflow 100%
            .device-bind-box
              absolute right rem(20) top 50%
              transform translate3d(0,-50%,0)
              height rem(60)
              line-height rem(60)
              box-sizing border-box
              background #ffa970
              border rem(3) solid #fff
              border-radius 2rem
              text-align center
              font-dpr 14px
              padding 0 rem(40)
              max-width 5rem
              &.bound
                background #AFAAAA
              .button-box
                text-overflow 100%
      .noDevices
        text-align center
        padding rem(200) 0
        font-dpr 15px
        .noDevices-img
          margin-top 2rem
          width 2.2rem
          height 2.2rem
          opacity 0.5
</style>
