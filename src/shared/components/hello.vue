<template>
  <div class="hello-box">
    <div class="content">
      <!-- <span class="line">———</span> -->
      <span class="msg">
        {{msg}}
      </span>
      <!-- <span class="line">———</span> -->
    </div>

  </div>
</template>

<script>
  module.exports = {
    props: {
      'msg': {
        tyle: String,
        default: ''
      }
    }
  }

</script>
<style lang="stylus">
  @import '../assets/style/common'

  .hello-box
    width 90%
    font-dpr 13px
    margin 0 auto
    color #fff
    .content
      padding 0.2rem 0
      text-align center
      color #fff
      .line
        opacity 0.5
      .msg
        opacity 0.9

</style>
