<template>
  <div v-show="show" transition="modal" class="modal">
    <div class="modal-wrapper">
      <div class="modal-dialog">
        <div class="modal-header">
          <slot name="header">
            <h3>{{$t('common.tips')}}</h3>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: {
      show: {
        type: Boolean,
        // required: true,
        twoway: true
      }
    },
    ready: function () {
      this.$dispatch('modal-created', this)
    },
    methods: {
      dismiss: function () {
        this.show = false
        this.$dispatch('close')
      }
    }
  }
</script>

<style lang="stylus">
  @import '../assets/style/common'

  .modal
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background transparent
    z-index 1000
    display table
    color #999
    .modal-wrapper
      display table-cell
      vertical-align middle
    .modal-dialog
      position relative
      background #FFF
      margin 0 auto
      width 80%
      max-width 14rem
      box-shadow 0 2px 8px rgba(0, 0, 0, .3)
      transition all .3s ease
      border-radius rem(10)
      .tips
        font-dpr 16px
        text-align center
        color gray-darker
    .modal-header
      padding 0.5rem 0.6rem 0

      h3
        font-weight normal
        color gray-darker
        margin 0
        text-align center
        font-dpr 20px

    .modal-body
      padding rem(30)
      width 100%
      box-sizing border-box
    .modal-footer
      .actions
        border-top 1px solid #CCC
        display flex

        .btn
          background transparent
          border-right 1px solid #CCC
          color orange
          box-sizing border-box
          flex 1
          text-align center
          font-dpr 16px
          &:last-child
            border-right none
</style>
