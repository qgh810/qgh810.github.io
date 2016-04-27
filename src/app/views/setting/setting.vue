<template>
  <div class="setting-index">
    <header-nav
      :title="$t('title.setting')"
      :showleft="false">
    </header-nav>
    <div class="setting-box">
      <ul>
        <li class="setting-button" @touchend.prevent.stop="link('/setting/user')">
          <span>{{$t('setting.user')}}</span>
          <i class="more"></i>
        </li>
        <li class="setting-button" @touchend.prevent.stop="link('/setting/devices')">
          <span>{{$t('setting.device')}}</span>
          <i class="more"></i>
        </li>
        <li class="setting-button" @touchend.prevent.stop="link('/setting/unit')">
          <span>{{$t('setting.unit')}}</span>
          <i class="more"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  var Header = require('../../../shared/components/header.vue')

  export default {
    components: {
      'header-nav': Header
    },

    data () {
      return {
        msg: '主页面'
      }
    },
    methods: {
      addDevices () {
        console.log('添加设备')
      },

      link (path) {
        this.$route.router.go(path)
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../../shared/assets/style/common'

  .setting-index
    .setting-box
      margin-top 0.2rem
      box-sizing border-box
      padding-left rem(30)
      border-top 1px solid #fff
      border-bottom 1px solid #fff
      .setting-button
        position relative
        height rem(100)
        line-height rem(100)
        padding-left rem(20)
        font-dpr 16px
        border-bottom 1px solid rgba(255,255,255,0.8)
        &:last-child
          border-bottom 0
        .more
          display block
          size rem(50)
          position absolute
          right rem(50)
          top 50%
          transform translate3d(0,-50%,0)
</style>
