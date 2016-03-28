<template>
  <div v-show="body!==''" transition="modal" class="alert">
    <div class="alert-box">
      <div class="header-box">
        <h3>{{header}}</h3>
      </div>
      <div class="body-box">
        <p>{{body}}</p>
      </div>
      <div class="footer-box" @touchend.prevent.stop="close">
        <span :style="'color:'+buttoncolor">{{footer}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: {
      header: {
        type: String,
        default: '提示'
      },
      body: {
        type: String,
        default: ''
      },
      footer: {
        type: String,
        default: '确定'
      },
      buttoncolor: {
        type: String,
        default: '#111'
      }
    },

    ready: function () {
      this.$dispatch('alert-created', this)
    },

    methods: {
      close: function () {
        this.show = false
        this.$dispatch('close')
      }
    }
  }
</script>

<style lang="stylus">
  .alert
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background rgba(0,0,0,0.5)
    z-index 1000
    color #999
    .alert-box
      width 70%
      heihgt auto
      position absolute
      left 50%
      top 50%
      transform translate3d(-50%,-50%,0)
      text-align center
      background #fff
      border-radius 3%
      box-sizing border-box
      box-shadow 0.2rem 0.2rem 0.2rem 0.1rem rgba(0,0,0,0.3)
      .header-box
        height 1.6rem
        margin 0.5rem 0
        h3
          height 1.6rem
          line-height 1.6rem
          margin 0
          color #222
      .body-box
        max-height 12rem
        overflow auto
        margin 0.5rem 0
        color #333
        p
          margin 0
          padding 0
          padding 0 0.5rem
          font-size 0.7rem
      .footer-box
        border-top 1px solid #ccc
        height 2rem
        line-height 2rem
        font-size 0.9rem
        span
          background transparent
          border 0
          height 100%
          width 100%
</style>
