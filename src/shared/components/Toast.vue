<template>
  <div class="toast">
    <div v-show="show" class="toast-msg" transition="toast-msg" transition-mode="out-in">
      <slot>{{content}}</slot>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { hideNotice } from '../store/actions/system'

  export default {
    name: 'Toast',

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
        hideNotice
      }
    },

    created () {
      Vue.transition('toast-msg', {
        afterLeave () {
          this.hideNotice()
        }
      })
    }
  }
</script>

<style lang="stylus">
  @import '../assets/style/common'

  .toast
    absolute left bottom rem(140)
    width 100%
    text-align center

    .toast-msg
      position relative
      display inline-block
      margin 0 auto
      background rgba(0, 0, 0, .3)
      border-radius rem(20)
      color #FFF
      font-dpr 16px
      padding rem(30) rem(50)
</style>
