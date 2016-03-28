<template>
  <div class="devices-index">
    <header-nav
      :title="$t('title.device')"
      :showleft="false"
      :rightstyle="'add'"
      :showright="true"
      @right-click="addDevices">
    </header-nav>
    <div class="devices-box" v-heightauto>
      <div class="device bmi" @touchstart="link('/devices/bmi')">{{$t('device.bmi_scale')}}</div>
      <div class="device fat-scale" @touchstart="link('/devices/fatScale')">{{$t('device.fat_scale')}}</div>
    </div>
  </div>
</template>

<script>
  var Header = require('../../../shared/components/header.vue')
  import api from '../../api'

  export default {
    components: {
      'header-nav': Header
    },

    data () {
      return {
        msg: '主页面'
      }
    },
    ready () {
      if (!window.localStorage.selectedUserId || window.localStorage.selectedUserId === 'undefined') {
        this.setLocalSelectedUser()
      }
      if (!window.localStorage.weightUnit || window.localStorage.weightUnit === 'undefined') {
        window.localStorage.weightUnit = 'kg'
      }
      if (!window.localStorage.heightUnit || window.localStorage.heightUnit === 'undefined') {
        window.localStorage.heightUnit = 'cm'
      }
    },
    methods: {
      /**
       * 设置本地存储的当前用户id
       */
      setLocalSelectedUser () {
        var params = {
          'limit': 1,
          'order': {
            'creatTime': 'desc'
          }
        }
        api.getUserList(params).then((r) => {
          if (r.status - 0 === 200) {
            window.localStorage.selectedUserId = r.data.list[0]._id
          }
        })
      },
      /**
       * 右上角添加按钮事件 添加设备
       */
      addDevices () {
        this.$route.router.go('/devices/add')
      },

      link (path) {
        this.$route.router.go(path)
      }
    }
  }
</script>

<style lang="stylus">
  .devices-index
    .devices-box
      height 75%
      padding 20%
      box-sizing border-box
      .device
        height 50%
        padding-top 4.5rem
        box-sizing border-box
        background no-repeat center 0 /4rem
        text-align center
        font-size 0.8rem
      .bmi
        background-image url('../../assets/images/devices/bmi.png')

      .fat-scale
        background-image url('../../assets/images/devices/fat-scale.png')
</style>
