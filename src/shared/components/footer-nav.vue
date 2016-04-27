<template>
  <div class="footer-nav-box" v-show="showNav" transition="formBottom">
    <div class="nav device" :class="{'selected':$route.path==='/index'}" @touchend="selectedNav('/index')">
      <span>{{$t('title.device')}}</span>
    </div>
    <div class="nav analysis" :class="{'selected':$route.path==='/analysis'}" @touchend="selectedNav('/analysis')">
      <span>{{$t('title.analysis')}}</span>
    </div>
    <div class="nav plan" :class="{'selected':$route.path==='/plan'}" @touchend="selectedNav('/plan')">
      <span>{{$t('title.plan')}}</span>
    </div>
    <div class="nav setting" :class="{'selected':$route.path==='/setting'}" @touchend="selectedNav('/setting')">
      <span>{{$t('title.setting')}}</span>
    </div>
  </div>
</template>

<script>
  module.exports = {
    data () {
      return {
        changeNavCount: 0,
        oldTime: 0,
        path: this.$route.path
      }
    },
    computed: {
      showNav () {
        if (this.$route.path === '/index' || this.$route.path === '/analysis' || this.$route.path === '/plan' || this.$route.path === '/setting') {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      selectedNav (path) {
        var downTime = new Date().getTime()
        if (downTime - this.oldTime > 800) {
          this.changeNavCount = 0
        }
        this.oldTime = downTime
        if (this.changeNavCount < 3) {
          this.changeNavCount += 1
          this.path = path
          if (this.changeNavCount === 3) {
            setTimeout(() => {
              this.changeNavCount = 0
            }, 800)
          }
          this.$route.router.replace(path)
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "../assets/style/common"

  .footer-nav-box
    width 100%
    height rem(100)
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
      font-dpr 12px
      padding-top rem(60)
      box-sizing border-box
      line-height 0.6rem
      background-size rem(160) rem(293)
      background-position center rem(-20)
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
      background-position center rem(-190)
</style>
