<template>
  <div class="add-device-list">
    <header-nav
    :title="title">
    </header-nav>
    <div class="device-list-box iosScrollBug" v-heightauto>
      <div class="device-ul">
        <div v-show="devices.length>0" class="device-li" v-for="device in devices">
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
        <div class="noDevices" v-show="devices.length==0">
          {{$t('device.no_devices')}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var Header = require('../../../shared/components/header.vue')
  import api from '../../api'
  import SDK from '../../helpers/sdk'
  import { isBMI, isFatScale, existsInList } from '../../mixins'
  // import { existsInList } from '../../mixins'

  module.exports = {
    components: {
      'header-nav': Header
      // 'modal':Modal
    },

    data: function () {
      return {
        devices: [
          // {
          //   name: 'NAME1',
          //   deviceid: 'asd21ad1asd21ad',
          //   isBound: false
          // },
          // {
          //   name: 'NAME2',
          //   deviceid: 'asd21ad1',
          //   isBound: true
          // },
          {
            name: 'NAME3',
            deviceid: 'asd21ad1',
            isBound: false
          }
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
        return self.devices
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
        return this.$t('title.device_list')
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
          if (r.status - 0 === 200) {
            var deviceArr = []
            r.data.list.map((item) => {
              var device = {}
              device.name = item.name
              device.deviceid = item.deviceid
              device.isBound = item.isBound
              deviceArr.push(device)
            })
            self.devices = deviceArr
            // 监听新扫描到的设备
            SDK.on('onScanXDeviceResult', function (r) {
              // alert('不在列表中？' + !existsInList(self.devices, 'deviceid', r.deviceid))
              // alert('是当前需要的秤？' + self.isThisScale(r.data))
              // alert(JSON.stringify(r))
              if (!existsInList(self.devices, 'deviceid', r.deviceid) && self.isThisScale(r.data, r.name)) {
                var device = {}
                device.name = r.name
                device.deviceid = r.deviceid
                device.isBound = false
                self.devices.splice(0, 0, device)
              }
            })
          }
        })
      }
    },

    ready () {
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
      isThisScale (data, name) {
        var result = {
          bmi: isBMI,
          fat: isFatScale
        }
        return result[this.deviceType](data, name)
      }
    }
  }
</script>
<style lang="stylus">
  .add-device-list
    .device-list-box
      width 100%
      margin-top 0.6rem
      overflow-y auto
      overflow-x hidden
      .device-ul
        padding-left 0.6rem
        border-top 1px solid rgba(255,255,255,0.5)
        padding-bottom 4rem
        min-height 1000px
        .device-li
          height 3rem
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
              width 1.8rem
              height 1.8rem
            .device-text
              position absolute
              left 2.8rem
              top 0
              height 100%
              width 8rem

              .device-name
                width 80%
                height 1.5rem
                line-height 2rem
                overflow hidden
                font-size 0.8rem
              .device-code
                width 100%
                height 1.5rem
                line-height 0.8rem
                word-break break-all
                font-size 0.7rem
                opacity 0.8
                color #ccffff
                overflow hidden
                white-space nowrap
                text-overflow ellipsis
            .device-bind-box
              position absolute
              right 1rem
              top 50%
              transform translate3d(0,-50%,0)
              height 1.2rem
              line-height 1.1rem
              box-sizing border-box
              background #ffa970
              border 0.09rem solid #fff
              border-radius 2rem
              text-align center
              font-size 0.6rem
              padding 0 0.6rem
              max-width 5rem
              &.bound
                background #AFAAAA
              .button-box
                width 100%
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
      .noDevices
        text-align center
        padding 5rem 0
</style>
