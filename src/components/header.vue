<template lang="jade">
    .header-box1
      //- .margin-top
      .content
        .title {{title}}
        .left(@click="leftClick")
        .right.stars(v-if="showright",@click="rightClick") {{rightText}}

</template>


<script>

  module.exports = {
    props: {
      'title':"",
      'rightText':"",
      'showright':true
    },
    data: function () {
      return{
      }
    },

    ready:function(){
      //document.getElementsByClassName("thistime_information")[0].setAttribute("data-open",1);//默认打开第一条
    },

    route:{
      data:function(){




      }
    },

    methods:{
      rightClick:function(){
        this.$dispatch('right-click');
      },
      leftClick:function(){
        window.history.go(-1)
        //this.$dispatch('left-click');
      }
    }




  }

</script>
<style lang="stylus">
  @import '../assets/stylus/common'
  .header-box1
    width 100%
    background #ff8314
    .margin-top
      height 0.7rem

      color #fff
    .content
      width 100%
      height 2rem
      position relative
      .title
        width 70%
        height 100%
        line-height 2rem
        margin 0 auto
        text-align center
        overflow hidden
        text-overflow ellipsis
        color #fff
      .left
        width 15%
        height 100%
        position absolute
        left 0
        top 0
        background url("../assets/images/icon/icon_leftArrow.png") no-repeat center
        background-size 20% 40%
      .right
        width 15%
        height 100%
        position absolute
        right 0
        top 0
      .stars
        background url("../assets/images/icon/icon-stars.png") no-repeat center
        background-size 40% 42%
</style>
