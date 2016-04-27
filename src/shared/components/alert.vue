<template>
  <div class="alert">
    <div v-show="show" class="alert-msg" transition="alert-msg" transition-mode="out-in">
      <slot>{{content}}</slot>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { hideMessage } from '../../app/store/actions/system'

  module.exports = {
    name: 'Alert',

    props: {
      show: {
        type: Boolean,
        default: false
      },

      content: {
        type: String,
        default: ''
      }
    },

    vuex: {
      actions: {
        hideMessage
      }
    },

    created () {
      Vue.transition('alert-msg', {
        afterLeave () {
          this.hideMessage()
        }
      })
    }
  }
</script>

<style lang="stylus">
  @import '../assets/style/common'

  .alert
    absolute left bottom rem(140)
    width 100%
    text-align center

    .alert-msg
      position relative
      display inline-block
      margin 0 auto
      max-width 80%
      background rgba(0, 0, 0, .3)
      border-radius rem(20)
      color #FFF
      font-dpr 16px
      padding rem(30) rem(50)

    // 吐司
  .alert-msg
    transition transform .2s ease, opacity .2s ease

  .alert-msg-enter
  .alert-msg-leave
    opacity 0
    transform translate3d(0, rem(10), 0)
</style>
