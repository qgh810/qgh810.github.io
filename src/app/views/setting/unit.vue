<template>
  <div class="setting-unit">
    <header-nav
     :title="$t('title.setting_unit')">
    </header-nav>
    <div class="unit-box">
      <div class="title weight-title">{{$t('setting.weight_unit')}}</div>
      <div class="unit-contents-box weight-unit">
        <div class="unit-content" @touchstart="weightUnit='kg'">
          <span class="key">kg</span>
          <i v-show="weightUnit==='kg'" class="tick"></i>
        </div>
        <div class="unit-content" @touchstart="weightUnit='lb'">
          <span class="key">lb</span>
          <i v-show="weightUnit==='lb'" class="tick"></i>
        </div>
        <div class="unit-content" @touchstart="weightUnit='stone'">
          <span class="key">stone</span>
          <i v-show="weightUnit==='stone'" class="tick"></i>
        </div>
      </div>
      <div class="title height-title">{{$t('setting.height_unit')}}</div>
      <div class="unit-contents-box height-unit">
        <div class="unit-content" @touchstart="heightUnit='cm'">
          <span class="key">cm</span>
          <i v-show="heightUnit==='cm'" class="tick"></i>
        </div>
        <div class="unit-content" @touchstart="heightUnit='inch'">
          <span class="key">inch</span>
          <i v-show="heightUnit==='inch'" class="tick"></i>
        </div>
      </div>
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
        weightUnit: window.localStorage.weightUnit || 'kg',
        heightUnit: window.localStorage.heightUnit || 'cm'
      }
    },

    watch: {
      weightUnit () {
        window.localStorage.weightUnit = this.weightUnit
      },
      heightUnit () {
        window.localStorage.heightUnit = this.heightUnit
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../../shared/assets/style/common'

  .setting-unit
    width 100%
    height 100%
    .unit-box
      margin-top 0.2rem
      font-dpr 16px
      .title
        padding-left 0.6rem
        height rem(110)
        line-height rem(110)
        font-dpr 16px
      .height-title
        margin-top 1.5rem
      .unit-contents-box
        border-top 1px solid #fff
        border-bottom 1px solid #fff
        padding-left rem(50)
        box-sizing border-box
        .unit-content
          height rem(110)
          line-height rem(110)
          border-bottom 1px solid rgba(255,255,255,0.5)
          position relative
          .key
            display inline-block
            width 4rem
          .tick
            display block
            size rem(36)
            background no-repeat url('../../../shared/assets/images/icons/tick.png') center /100%
            position absolute
            top 50%
            right 1rem
            transform translate3d(0,-50%,0)
      .weight-unit
      .height-unit
        .unit-content
          &:last-child
            border-bottom 0
</style>
