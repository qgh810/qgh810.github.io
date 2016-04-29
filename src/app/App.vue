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
            name: '菜单1', // 首页
            fn () {
              console.log(111)
            }
          },
          {
            name: '菜单2', // 笔记
            fn () {
              console.log(333)
            }
          },
          {
            name: '菜单3', // 收藏
            fn () {
              console.log(333)
            }
          },
          {
            name: '菜单4', // 生活
            fn () {
              console.log(333)
            }
          },
          {
            name: '菜单5', // 关于
            fn () {
              console.log(222)
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
    background no-repeat url('../shared/assets/images/bj.jpg') fixed center top
    background-size 100% 100%
    position relative
    .view
      width 100%
      height 100%
      overflow hidden
      position relative
</style>
