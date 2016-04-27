<template>
  <div class="header-container">
    <div class="container">
      <div class="header-box">
        <div class="menu-button-box" @click="openNavEvent">
          <div class="menu-button" :class="{'open': open}">
            <div class="path path1"></div>
            <div class="path path2"></div>
            <div class="path path3"></div>
          </div>
        </div>
        <div class="menu-list-box" :class="{'open': open}">
          <ul class="menu-ul">
            <!-- <li class="filter"></li> -->
            <li class="menu-li" v-for="nav in list" :class="{'touchDown': nav.touchDown}" @touchstart="touchDown(nav)" @touchend="selctedNav(nav)">
              <div class="menu">
                <span class="menu-name">{{nav.name}}</span>
              </div>
            </li>
            <li class="touch"></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: {
      navlist: {
        type: Array,
        default: [ // 格式如下  不要超过8个
          {
            name: '菜单1',
            fn () {
              alert('菜单1回调')
            }
          }
        ],
        required: true
      }
    },
    data: function () {
      return {
        open: false,
        list: []
      }
    },
    ready: function () {
      this.initNav()
    },
    methods: {
      initNav: function () {
        var result = []
        this.navlist.map((item) => {
          var obj = item
          obj.touchDown = false
          result.push(obj)
        })
        this.list = result
      },
      selctedNav: function (nav) {
        var self = this
        self.list.map(function (item) {
          item.touchDown = false
        })
        nav.fn()
      },
      touchDown: function (nav) {
        var self = this
        self.list.map(function (item) {
          item.touchDown = false
        })
        nav.touchDown = true
      },
      openNavEvent: function () {
        var self = this
        self.open = !self.open
        var menuListBox = document.getElementsByClassName('menu-list-box')[0]
        if (self.open) {
          var touchDom = document.getElementsByClassName('touch')[0]
          menuListBox.style.webkitTransform = 'translate3d(0,0,0)'
          touch.on(touchDom, 'touchstart', function (ev) {
            ev.preventDefault()
          })
          touch.on(touchDom, 'drag', function (ev) {
            menuListBox.style.webkitTransition = '0s'
            if (ev.x > -30) {
              menuListBox.style.webkitTransform = 'translate3d(' + ev.x + 'px, 0,0)'
            }
          })
          touch.on(touchDom, 'dragend', function (ev) {
            var menuListBoxWidth = menuListBox.clientWidth
            menuListBox.style.webkitTransition = 'transform cubic-bezier(0.175, 0.885, 0.470, 1.1) 0.5s'
            if (ev.x > menuListBoxWidth / 3) {
              menuListBox.style.webkitTransform = 'translate3d(120%,0,0)'
              self.open = false
            } else {
              menuListBox.style.webkitTransform = 'translate3d(0,0,0)'
              self.open = true
            }
          })
        } else {
          menuListBox.style.webkitTransform = 'translate3d(120%,0,0)'
          self.open = false
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "../assets/style/common"

  .header-container
    z-index 100
    height 1.6rem
  .container {
    width: 100%;
    height: 100%;
  }
  .container .header-box {
    width: 100%;
    height: 1.6rem;
    background: rgba(0,0,0,0.3);
  }
  .container .header-box .menu-button-box {
    width: 1.6rem;
    height: 1.6rem;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.4rem;
    box-sizing: border-box;
    z-index: 101;
  }
  .container .header-box .menu-button-box .menu-button {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .container .header-box .menu-button-box .menu-button .path {
    width: 100%;
    height: 20%;
    border-radius: 5rem;
    background: #fff;
    margin: 0 auto 20%;
    transition: transform cubic-bezier(0.175, 0.885, 0.470, 1.4) 0.5s, width ease 0.4s;
  }
  .container .header-box .menu-button-box .menu-button .path:last-child {
    margin-bottom: 0;
  }
  .container .header-box .menu-button-box .menu-button .path1 {
    transform-origin:left;
  }
  .container .header-box .menu-button-box .open .path1 {
    transform: translate3d(15%,0,0) rotate(45deg);
    width: 115%;
  }
  .container .header-box .menu-button-box .open .path2 {
    width: 0;
  }
  .container .header-box .menu-button-box .menu-button .path3 {
    transition: transform cubic-bezier(0.175, 0.885, 0.470, 1.4) 0.5s 0.1s;
    transform-origin:left;
  }
  .container .header-box .menu-button-box .open .path3 {
    transform: translate3d(15%,0,0) rotate(-45deg);
    width: 115%;
  }
  .container .header-box .menu-list-box {
    width: 80%;
    height: 100%;
    padding-top: 2.6rem;
    box-sizing: border-box;
    z-index: 100;
    position: fixed;
    top: 0;
    right: 0;
    background: rgba(51,51,51,1);
    color: #fff;
    box-shadow: -0.2rem 0 0.3rem rgba(0,0,0,0.3);
    transform: translate3d(120%,0,0);
    transition: transform cubic-bezier(0.175, 0.885, 0.470, 1.2) 0.5s;
  }
  .container .header-box .menu-list-box:after {
    content: '';
    display: block;
    width: 5rem;
    height: 100%;
    position: absolute;
    left: 99%;
    top: 0;
    background: rgba(51,51,51,1);
  }
  .container .header-box .menu-list-box.open {
    transform: translate3d(0,0,0);
  }
  .container .header-box .menu-list-box .menu-ul {
    width: 100%;
    height: 100%;
    overflow: visible;
    /*-webkit-filter: url("#goo");*/
    /*filter: url("#goo");*/
  }
  .container .header-box .menu-list-box .menu-ul .menu-li {
    /*background: #333;*/
    transition: transform cubic-bezier(0.175, 0.885, 0.4700, 1.3) 0.5s;
    transform: translate3d(16rem,0,0)
  }
  .container .header-box .menu-list-box .menu-ul .menu-li:nth-child(1) {
    transition: transform cubic-bezier(0.175, 0.885, 0.4700, 1.1) 0.4s;
  }
  .container .header-box .menu-list-box .menu-ul .menu-li:nth-child(2) {
    transition: transform cubic-bezier(0.175, 0.885, 0.4700, 1.1) 0.3s;
  }
  .container .header-box .menu-list-box .menu-ul .menu-li:nth-child(3) {
    transition: transform cubic-bezier(0.175, 0.885, 0.4700, 1.1) 0.5s;
  }
  .container .header-box .menu-list-box .menu-ul .menu-li:nth-child(4) {
    transition: transform cubic-bezier(0.175, 0.885, 0.4700, 1.1) 0.4s;
  }
  .container .header-box .menu-list-box .menu-ul .menu-li:nth-child(5) {
    transition: transform cubic-bezier(0.175, 0.885, 0.4700, 1.1) 0.3s;
  }
  .container .header-box .menu-list-box .menu-ul .menu-li:nth-child(6) {
    transition: transform cubic-bezier(0.175, 0.885, 0.4700, 1.1) 0.5s;
  }
  .container .header-box .menu-list-box .menu-ul .menu-li:nth-child(7) {
    transition: transform cubic-bezier(0.175, 0.885, 0.4700, 1.1) 0.4s;
  }
  .container .header-box .menu-list-box .menu-ul .menu-li:nth-child(8) {
    transition: transform cubic-bezier(0.175, 0.885, 0.4700, 1.1) 0.3s;
  }
  .container .header-box .menu-list-box .menu-ul .menu-li .menu{
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 0.6rem;
    padding-left: 0.5rem;
  }
  .container .header-box .menu-list-box .menu-ul .menu-li.touchDown {
    background: rgba(255,255,255,0.1)
  }
  .container .header-box .menu-list-box .menu-ul .touch {
    width: 1.5rem;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .container .header-box .menu-list-box .menu-ul .filter {
    width: 100%;
    height: 100%;
    background: #333;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .container .header-box .menu-list-box.open .menu-li {
    transform: translate3d(0,0,0)
  }
</style>
