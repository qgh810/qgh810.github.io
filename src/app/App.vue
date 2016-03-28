<template>
  <div class="page-container">
    <router-view
    class="view"
    transition="view"
    transition-mode="out-in"></router-view>
    <alert :header="$t('common.tips')" :body="message" :footer="$t('common.confirm')" @close="hideMessage"></alert>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
  import FooterNav from '../shared/components/footer-nav.vue'
  import Alert from '../shared/components/alert.vue'
  import store from './store/index'
  import { hideMessage } from './store/actions/system'

  export default {
    // 全局用的组件
    components: {
      'alert': Alert,
      'footer-nav': FooterNav
    },

    store,

    vuex: {
      getters: {
        message: ({ system }) => system.message
      },
      actions: {
        hideMessage
      }
    },
    data () {
      return {
        debug: process.env.NODE_ENV !== 'production'
      }
    },

    methods: {
      reload () {
        window.location.reload()
      }
    }
  }
</script>

<style lang="stylus">
  @import "../shared/assets/style/base.styl";

  .reload
    width 2rem
    height 2rem
    line-height 2rem
    background #000
    border-radius 50%
    position absolute
    top 0
    left 20%
    text-align center
  .more
    background url(../shared/assets/images/icons/more.png) no-repeat center /100%
  .page-container
    width 100%
    height 100%
    background no-repeat url('../shared/assets/images/bj.jpg') center center
    background-size 100% 100%
    position relative
    .view
      width 100%
      height 100%
      overflow hidden
      position relative
</style>
