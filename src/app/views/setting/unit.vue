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
  .setting-unit
    width 100%
    height 100%
    .unit-box
      margin-top 0.65rem
      font-size 0.7rem
      .title
        padding-left 0.6rem
        height 2rem
        line-height 2.8rem
        font-size 0.75rem
      .height-title
        margin-top 1.5rem
      .unit-contents-box
        border-top 1px solid #fff
        border-bottom 1px solid #fff
        padding-left 0.8rem
        box-sizing border-box
        .unit-content
          height 2.5rem
          line-height 2.5rem
          border-bottom 1px solid rgba(255,255,255,0.5)
          position relative
          .key
            display inline-block
            width 4rem
          .tick
            display block
            width 1.2rem
            height 1.2rem
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
