<template>
  <div class="footer-nav-box" v-show="selectednav!==0" transition="formBottom">
    <div class="nav device" :class="{'selected':selectednav===1}" @touchstart="selectedNav(1)">
      <span>{{$t('title.device')}}</span>
    </div>
    <div class="nav analysis" :class="{'selected':selectednav===2}" @touchstart="selectedNav(2)">
      <span>{{$t('title.analysis')}}</span>
    </div>
    <div class="nav plan" :class="{'selected':selectednav===3}" @touchstart="selectedNav(3)">
      <span>{{$t('title.plan')}}</span>
    </div>
    <div class="nav setting" :class="{'selected':selectednav===4}" @touchstart="selectedNav(4)">
      <span>{{$t('title.setting')}}</span>
    </div>
  </div>
</template>

<script>
  module.exports = {
    data () {
      return {
        selectednav: 0
      }
    },

    computed: {
      path () {
        var result = 0
        switch (this.$route.path) {
          case '/index':
            result = 1
            break
          case '/analysis':
            result = 2
            break
          case '/plan':
            result = 3
            break
          case '/setting':
            result = 4
            break
          default:
            result = 0
            break
        }
        return result
      }
    },

    watch: {
      path () {
        this.selectednav = this.path
      }
    },

    ready () {
      this.selectednav = this.path
    },
    methods: {
      selectedNav (num) {
        var url = {
          '1': '/index',
          '2': '/analysis',
          '3': '/plan',
          '4': '/setting'
        }
        this.$route.router.go(url[num])
      }
    }
  }
</script>

<style lang="stylus">
  @import "../assets/style/base.styl";

  .footer-nav-box
    width 100%
    height 2.8rem
    background #fff
    position fixed
    bottom 0
    clearfix()
    .nav
      width 25%
      height 100%
      float left
      color #5c656e
      text-align center
      font-size 0.5rem
      padding-top 2rem
      box-sizing border-box
      line-height 0.6rem
      background-size 100% 7.8rem
      background-position center -0.3rem
    .device
      background-image url("../../app/assets/images/icons/footer-nav-device.png")
    .analysis
      background-image url("../../app/assets/images/icons/footer-nav-analysis.png")
    .plan
      background-image url("../../app/assets/images/icons/footer-nav-plan.png")
    .setting
      background-image url("../../app/assets/images/icons/footer-nav-setting.png")
    .selected
      color #219d9b
      background-position -0rem 2.95rem
</style>
