<template>
  <div class="header-box1">
    <div class="margin-top"></div>
    <div class="content">
      <div class="title">
        {{title}}
      </div>
      <div
      class="left"
      v-if="showleft"
      @touchend="leftClick">
      </div>
      <div
        class="right"
        v-if="showright"
        @touchend="rightClick"
        :class="rightstyle">
        <span class="rightText">
          {{righttext}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: {
      'title': {
        tyle: String,
        default: ''
      },
      'righttext': {
        tyle: String,
        default: ''
      },
      'rightstyle': {
        tyle: String,
        default: ''
      },
      'showright': {
        tyle: Boolean,
        default: true
      },
      'showleft': {
        tyle: Boolean,
        default: true
      }
    },

    methods: {
      rightClick: function () {
        this.$dispatch('right-click')
      },

      leftClick: function () {
        window.history.go(-1)
        // this.$dispatch('left-click')
      }
    }
  }

</script>
<style lang="stylus">
  /*@import '../assets/stylus/common'*/
  .header-box1
    width 100%
    background none
    font-size 0.8rem
    .margin-top
      height 0.7rem

      color #fff
    .content
      width 100%
      height 2rem
      position relative
      .title
        width 70%
        height 100%
        line-height 2rem
        margin 0 auto
        text-align center
        overflow hidden
        text-overflow ellipsis
        color #fff
      .left
        width 15%
        height 100%
        position absolute
        left 0
        top 0
        background url("../assets/images/icons/icon_leftArrow.png") no-repeat center
        background-size 20% 40%
      .right
        width 15%
        height 100%
        position absolute
        right 0
        top 0
        overflow hidden
        .rightText
          font-size 0.7rem
          line-height 2rem
      .add
        background url("../assets/images/icons/icon-add.png") no-repeat center
        background-size 40% 42%
      .set
        background url("../assets/images/icons/icon-set.png") no-repeat center
        background-size 60% 62%
</style>
