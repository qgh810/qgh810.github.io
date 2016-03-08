<template lang="jade">
.modal(v-show="show", transition="modal")
  .modal-wrapper
    .modal-dialog
      .modal-header
        slot(name="header")
          h3 提示
      .modal-body
        slot(name="body")
      .modal-footer
        slot(name="footer")
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

  methods: {
    dismiss: function () {
      this.show = false;
      this.$dispatch('close');
    },

    ready: function () {
      this.$dispatch('modal-created', this);
    }
  }
};
</script>

<style lang="stylus">

.modal
  fixed left top
  size 100%
  background transparent
  z-index 1000
  display table
  transition opacity .3s ease

  .modal-wrapper
    display table-cell
    vertical-align middle

  .modal-dialog
    position relative
    background #FFF
    margin 0 auto
    width 80%
    max-width rem(600)
    border-radius rem(20)
    box-shadow 0 2px 8px rgba(0, 0, 0, .3)
    transition all .3s ease

    .tips
      font-size rem(36)
      text-align center

  .modal-header
    padding rem(40) rem(40) 0

    h3
      font-weight normal
      color gray-darker
      margin 0
      text-align center
      font-size rem(48)

  .modal-body
    padding rem(40)

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

      &:last-child
        border-right none
</style>
