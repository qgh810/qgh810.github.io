<template>
  <div class="analysis-index">
    <header-nav
      :title="$t('title.analysis')"
      :showleft="false"
      :showright="false">
    </header-nav>
    <div class="analysis-box iosScrollBug" v-heightauto>
      <ul>
        <li class="analysis-button" @touchend="link('/analysis/history')">
          <span>{{$t('title.data_analysis')}}</span>
          <i class="more"></i>
        </li>
        <li class="analysis-button"  @touchend="link('/analysis/chart')">
          <span>{{$t('title.chart')}}</span>
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
      }
    },
    methods: {
      /**
       * 添加设备事件
       */
      addDevices () {
        console.log('添加设备')
      },

      /**
       * 页面跳转事件
       * @param  {[type]} path [description]
       * @return {[type]}      [description]
       */
      link (path) {
        this.$route.router.go(path)
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../../shared/assets/style/common'

  .analysis-index
    .analysis-box
      margin-top 0.2rem
      padding-bottom 2.8rem
      box-sizing border-box
      padding-left 0.6rem
      .analysis-button
        position relative
        height 1.5rem
        line-height 1.5rem
        padding-left 0.2rem
        font-dpr 16px
        border-bottom 1px solid rgba(255,255,255,0.4)
        &:first-child
          border-top 1px solid rgba(255,255,255,0.4)
        .more
          display block
          width 0.4rem
          height 0.4rem
          position absolute
          right 0.4rem
          top 50%
          transform translate3d(0,-50%,0)
</style>
