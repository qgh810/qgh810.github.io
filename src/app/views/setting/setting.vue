<template>
  <div class="setting-index">
    <header-nav
      :title="$t('title.setting')"
      :showleft="false">
    </header-nav>
    <div class="setting-box">
      <ul>
        <li class="setting-button" @touchend="link('/setting/user')">
          <span>{{$t('setting.user')}}</span>
          <i class="more"></i>
        </li>
        <li class="setting-button" @touchend="link('/setting/devices')">
          <span>{{$t('setting.device')}}</span>
          <i class="more"></i>
        </li>
        <li class="setting-button" @touchend="link('/setting/unit')">
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
  .setting-index
    .setting-box
      margin-top 0.2rem
      box-sizing border-box
      padding-left 0.6rem
      border-top 1px solid #fff
      border-bottom 1px solid #fff
      .setting-button
        position relative
        height 2.5rem
        line-height 2.5rem
        padding-left 0.2rem
        font-size 0.8rem
        border-bottom 1px solid rgba(255,255,255,0.8)
        &:last-child
          border-bottom 0
        .more
          display block
          width 0.8rem
          height 0.8rem
          position absolute
          right 0.8rem
          top 50%
          transform translate3d(0,-50%,0)
</style>
