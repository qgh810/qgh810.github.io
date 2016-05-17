<template>
  <div class="page-container" @touchstart="clickAnimationEvent($event)">
    <nav-header :navlist="nav"></nav-header>
    <router-view
    class="view"
    transition="view"
    transition-mode="out-in"></router-view>
    <alert :content="message" :show="showAlert"></alert>
    <!-- <div class="test" @touchend="reload"></div> -->
    <div class="animation-dom" v-if="clickAnimation.show" :style="style">
      <div class="circular" v-for="point in clickAnimation.position" :style="'left: ' + point.x + 'px;top:' + point.y + 'px'"></div>
    </div>
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
        ],
        clickAnimation: {
          show: false,
          width: 0,
          height: 0,
          left: 0,
          top: 0,
          borderRadius: '',
          position: [
            {
              x: 0,
              y: 0
            }
          ]
        }
      }
    },
    computed: {
      style () {
        var result = 'width:' + this.clickAnimation.width + 'px;height:' + this.clickAnimation.height + 'px;left:' + this.clickAnimation.left + 'px;top:' + this.clickAnimation.top + 'px;border-radius:' + this.clickAnimation.borderRadius
        return result
      }
    },
    methods: {
      clickAnimationEvent (event) {
        var dom = event.target
        var result = {
          show: true,
          width: dom.clientWidth,
          height: dom.clientHeight,
          left: this.getPosition(dom).left,
          top: this.getPosition(dom).top,
          borderRadius: dom.style.borderRadius,
          position: []
        }
        for (let i = 0; i < event.targetTouches.length; i++) {
          let targetTouch = event.targetTouches[i]
          let obj = {
            x: targetTouch.clientX - this.getPosition(dom).left,
            y: targetTouch.clientY - this.getPosition(dom).top
          }
          result.position.push(obj)
        }
        console.log(JSON.stringify(result))
        this.clickAnimation = result
        clearTimeout(this.tid)
        this.tid = setTimeout(() => {
          this.clickAnimation.show = false
        }, 500)
      },
      getPosition (node) {
        var left = node.offsetLeft
        var top = node.offsetTop
        var parent = node.offsetParent
        while (parent) {
          left += parent.offsetLeft
          top += parent.offsetTop
          parent = parent.offsetParent
        }
        return {left: left, top: top}
      },
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
  .animation-dom
    position fixed
    z-index 999
    overflow hidden
    .circular
      width 0.5rem
      height 0.5rem
      border-radius 0.5rem
      background #fff
      position absolute
      opacity 0
      animation clickAnimation 0.2s
  @keyframes clickAnimation
    from
      transform scale(0)
      opacity 0.3
    to
      transform scale(20)
      opacity 0
</style>
