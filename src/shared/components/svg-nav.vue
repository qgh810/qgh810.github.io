<template>
  <div class="svg-nav-box">
    <div class="header-box">
      <div class="box canvas1">
        <svg width="100" height="100" class="svg1" @touchend="open=!open">
          <path d="M 35 40 L 65 40 C 90 40 90 75 60 85 A 40 40 0 0 1 20 20 L 65 65" class="path path1" :class="{'open': open}"></path>
          <path d="M 35 50 L 65 50" class="path path2" :class="{'open': open}"></path>
          <path d="M 65 60 L 30 60 C 10 60 10 20 40 15 A 40 38 0 1 1 20 80 L 65 35" class="path path3" :class="{'open': open}"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    data () {
      return {
        changeNavCount: 0,
        oldTime: 0,
        path: this.$route.path
      }
    },
    computed: {
      showNav () {
        if (this.$route.path === '/index' || this.$route.path === '/analysis' || this.$route.path === '/plan' || this.$route.path === '/setting') {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      selectedNav (path) {
        var downTime = new Date().getTime()
        if (downTime - this.oldTime > 800) {
          this.changeNavCount = 0
        }
        this.oldTime = downTime
        if (this.changeNavCount < 3) {
          this.changeNavCount += 1
          this.path = path
          if (this.changeNavCount === 3) {
            setTimeout(() => {
              this.changeNavCount = 0
            }, 800)
          }
          this.$route.router.replace(path)
        }
      }
    }
  }
</script>

<style lang="stylus">
  .svg-nav-box
    .header-box
      width 100%
      background rgba(0,0,0,0.25)
      position fixed
      top 0
      left 0
    .svg1 {
      fill: none;
    }
    .svg1 .path{
      stroke: #fff;
      stroke-width: 6px;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: transparent;
      transition: all ease 0.3s;
    }
    .svg1 .path1{
      stroke: red;
      stroke-dashoffset: 470;
      stroke-dasharray: 500;
    }
    .svg1 .path1.open{
      stroke: #fff;
      stroke-dashoffset: -220;
      stroke-dasharray: 500;
    }
    .svg1 .path2{
      stroke: blue;
    }
    .svg1 .path2.open{
      opacity: 0
    }
    .svg1 .path3{
      stroke: green;
      stroke-dashoffset: 470;
      stroke-dasharray: 500;
    }
    .svg1 .path3.open{
      stroke: #fff;
      stroke-dashoffset: -280;
      stroke-dasharray: 500;
    }
</style>
