<template lang="jade">
    .pictures-carousel-box
      .container#img-box(v-if="count>0",:style="'width:'+containerWidth+';-webkit-transform:translate3d('+(-containerLeft)+'px,0,0);transform:translate3d('+(-containerLeft)+'px,0,0)'")
        .picture(v-for="picture in toShowPictures",track-by="$index",:style="'width:'+pictureWidth")
          img(:src="picture",width="100%")
      .dot-box(v-if="count>1")
        span.dot(v-for="n in count",:class="{'active':n+1 === index}")

</template>

<script>

  module.exports = {
    props: {
      'pictures':{
        type: Array,
        default: []
      },
      'index': {
        type: Number,
        default: 1
      },//默认显示第几张轮播图片
      'auto': {
        type: Boolean,
        default: true
      },//是否自动播放
      'direct': {
        type: String,
        default: 'right'
      },//自动播放方向 left或 right
      'transitionduration': {
        type: Number,
        default: 0.5
      },//变换一次的时间
      'transitiondelay': {
        type: Number,
        default: 5
      }//默认播放间隔时间
    },
    data: function () {
      return{
        containerLeft: window.innerWidth*(this.index||1),
        canAnimation: true
      }
    },

    computed:{
      count: function () {
        return this.pictures.length;
      },
      toShowPictures: function () {
        var self = this;
        var result = [];
        result.push(self.pictures[self.pictures.length-1]);
        for (var i = 0; i < self.pictures.length; i++) {
          result.push(self.pictures[i]);
        }
        result.push(self.pictures[0]);
        return result;
      },
      containerWidth: function () {
        var self = this;
        return (self.pictures.length+2) * window.innerWidth+'px';
      },
      pictureWidth: function () {
        var self = this;
        return window.innerWidth+'px';
      }
    },
    watch:{
      count:function () {
        var self = this;
        self.canAnimation = self.count>1;//判断当前是否可以执行动画
        setTimeout(function(){self.init()},1000)

      }
    },
    methods:{

      rightClick:function(){
        this.$dispatch('right-click');
      },
      transformLeft: function () {
        var self = this;
        self.animate(window.innerWidth*(self.index+1))
      },
      transformRight: function () {
        var self = this;
        self.animate(window.innerWidth*(self.index-1))
      },
      animate: function (targetOffset) {
        var self = this;

        if(self.canAnimation){
          self.canAnimation = false;
          var dOffset = targetOffset - self.containerLeft;
          var speed = 15

          if(dOffset !== 0){

            (function go () {
              var offset = targetOffset - self.containerLeft;


              if(Math.abs(offset) > Math.abs(speed)){
                self.containerLeft += speed*(offset>0?1:-1);
              }
              else {
                self.containerLeft += offset>0?1:-1;
              }
              if(targetOffset - self.containerLeft !== 0){
                var timeout = setTimeout(go,10)
              }
              else {
                self.index = self.containerLeft/window.innerWidth;
                if(self.index > self.count){
                  self.reSetIndex(1);

                }else if(self.index === 0){
                  self.reSetIndex(self.count);
                }
                self.canAnimation = true;
                clearTimeout(timeout);
              }

            })()



          }
          else {
            return
          }
        }


      },
      reSetIndex: function (index) {
        var self = this;
        self.index = index;
        self.containerLeft = window.innerWidth*index;
      },
      init: function () {
        var self = this;
        if(self.canAnimation){
          var touchBox = document.getElementById("img-box")
          touch.on(touchBox, 'touchstart', function(ev){
            ev.preventDefault();
          });
          touch.on(touchBox, 'swiperight', function(ev){
            self.transformRight();
          });
          touch.on(touchBox, 'swipeleft', function(ev){
            self.transformLeft();
          });
        }


        if(self.canAnimation&&self.auto){
          if(self.direct === 'right'){
            setInterval(function(){self.transformLeft()},self.transitiondelay*1000)
          }
          else if(self.direct === 'left') {
            setInterval(function(){self.transformRight()},self.transitiondelay*1000)
          }
        }
      }
    }




  }

</script>

<style lang="stylus">
  .pictures-carousel-box
    width 100%
    overflow hidden
    position relative
    .container
      position relative
      font-size 0
      .picture
        display inline-block
    .dot-box
      position absolute
      bottom 0
      width 100%
      height 1.2rem
      line-height 1.2rem
      text-align center
      background rgba(0,0,0,0.3)
      span.dot
        display inline-block
        width 0.5rem
        height 0.5rem
        background #fff
        border-radius 50%
        margin-right 0.5rem
        transition color ease 0.3s
        &:last-child
          margin-right 0
      span.active
        background #FF8314
</style>
