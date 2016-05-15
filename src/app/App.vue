<template>
  <div class="page-container">
    <nav-header :navlist="nav"></nav-header>
    <router-view
    class="view"
    transition="view"
    transition-mode="out-in"></router-view>
    <alert :content="message" :show="showAlert"></alert>
    <!-- <div class="test" @touchend="reload"></div> -->
  </div>
</template>

<script>
  import Header from '../shared/components/my-header.vue'
  import Alert from '../shared/components/alert.vue'
  import store from './store/index'
  import { hideMessage } from './store/actions/system'

  export default {
    // 全局用的组件
    components: {
      'nav-header': Header,
      'alert': Alert
    },

    store,

    vuex: {
      getters: {
        message: ({ system }) => system.message,
        showAlert: ({ system }) => system.showAlert
      },
      actions: {
        hideMessage
      }
    },
    data () {
      return {
        debug: process.env.NODE_ENV !== 'production',
        nav: [
          {
            name: '首页', // 首页
            fn () {
              return '/index'
            }
          },
          {
            name: '笔记', // 笔记
            fn () {
              return '/note'
            }
          },
          {
            name: '收藏', // 收藏
            fn () {
              return '/collection'
            }
          },
          {
            name: '生活', // 生活
            fn () {
              return '/life'
            }
          },
          {
            name: '关于', // 关于
            fn () {
              return '/about'
            }
          }
        ]
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
    /*background no-repeat url('../shared/assets/images/bj.png') fixed center top*/
    background black
    background-size auto 100%
    position relative
    .view
      width 100%
      height 100%
      overflow hidden
      position relative
</style>
