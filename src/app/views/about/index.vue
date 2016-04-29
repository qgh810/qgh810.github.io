<template>
  <div class="index">
    <!-- <header-nav></header-nav> -->
    <div class="devices-box">
      关于  这里是个人信息 和联系方式
    </div>
  </div>
</template>

<script>
  // var Header = require('../../../shared/components/my-header.vue')
  // import api from '../../api'

  export default {
    components: {
      // 'header-nav': Header
    },

    data () {
      return {
        msg: '主页面'
      }
    },
    route: {
      data () {
        // alert(window.localStorage.selectedUserId)
      }
    },
    ready () {
    },
    methods: {
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
  @import '../../../shared/assets/style/common'

  .devices-index
    .devices-box
      height 85%
      min-height 10rem
      padding 20%
      box-sizing border-box
      .device
        height 50%
        padding-top 2.2rem
        box-sizing border-box
        background-repeat no-repeat
        background-position center top
        background-size 2.2rem 2.2rem
        text-align center
        font-dpr 18px
      .bmi
        background-image url('../../assets/images/devices/bmi.png')

      .fat-scale
        background-image url('../../assets/images/devices/fat-scale.png')
</style>
