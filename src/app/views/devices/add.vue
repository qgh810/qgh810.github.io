<template>
  <div class="devices-index">
    <header-nav
      :title="$t('title.add_device')">
    </header-nav>
    <hello :msg="$t('welcome.p2')"></hello>
    <div class="devices-box">
      <div class="device bmi" @touchend="addBmiScale">{{$t('device.bmi_scale')}}</div>
      <div class="device fat-scale" @touchend="addFatScale">{{$t('device.fat_scale')}}</div>
    </div>
    <modal class="add-device-modal" :show.sync="showBluetoothModal">
      <div slot="body">
        <div class="tips">
          {{$t('messages.open_Bluetooth')}}
        </div>
      </div>
      <div slot="footer">
        <div class="actions">
          <!-- <div class="btn button1" @touchend="setBluetooth">设置</div> -->
          <div class="btn button2" @touchend="showBluetoothModal=false">{{$t('common.ok')}}</div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  var Header = require('../../../shared/components/header.vue')
  var Modal = require('../../../shared/components/modal.vue')
  var Hello = require('../../../shared/components/hello.vue')
  import api from '../../api'

  export default {
    components: {
      'header-nav': Header,
      'hello': Hello,
      'modal': Modal
    },

    data () {
      return {
        isOpenBlueTooth: false, // 存放当前蓝牙状态
        showBluetoothModal: false // 是否显示提示蓝牙打开的弹窗
      }
    },

    route: {
      data () {
        // this.getBlueStatus() // 获取当前蓝牙状态
      }
    },
    methods: {
      /**
       * 添加bmi秤
       */
      addBmiScale () {
        var self = this
        api.getSystemInfo().then(function (r) {
          if (r.status - 0 === 200) {
            if (r.data.blueStatus === 'on') {
              // 在这里跳转到设备添加页面
              self.$route.router.go('/devices/add/bmi')
            } else {
              self.showBluetoothModal = true
            }
          }
        })
      },
      /**
       * 添加营养秤
       */
      addFatScale () {
        var self = this
        api.getSystemInfo().then(function (r) {
          if (r.status - 0 === 200) {
            if (r.data.blueStatus === 'on') {
              // 在这里跳转到设备添加页面
              self.$route.router.go('/devices/add/fat')
            } else {
              self.showBluetoothModal = true
            }
          }
        })
      }
    }
  }
</script>

<style lang="stylus">

</style>
