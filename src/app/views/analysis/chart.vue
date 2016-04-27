<template>
  <div class="main-content chart_page" style="overflow: auto;">
    <header-nav
      :title="$t('title.chart')"
      :showright="false">
    </header-nav>
    <div class="date_switch">
      <div class="fir_datetype">
        <div id="weekbox" @touchstart.prevent.stop="selectedweek('weekbox')" v-bind:data-name="'week'" class="datetype_box week">{{$t('chart.week')}}</div>
        <div id="monthbox" @touchstart.prevent.stop="selectedmonth('monthbox')" v-bind:data-name="'month'" class="datetype_box month selected">{{$t('chart.month')}}</div>
        <div id="yearbox" @touchstart.prevent.stop="selectedyear('yearbox')" v-bind:data-name="'year'" class="datetype_box year">{{$t('chart.year')}}</div>
      </div>
      <!-- <pre>{{test | json}}</pre> -->
      <div class="sed_datetype"><i @touchstart.prevent.stop="prevdate" class="pointer_left">&lt;</i><span v-bind:firstdate="" v-bind:lastdate="" class="sed_datetext">{{showseddate}}</span><i @touchstart.prevent.stop="nextdate" class="pointer_right">&gt;</i></div>
      <div class="chart_box" :style="'height:'+(svgHeight+1.3)+'rem'">
        <!--y坐标轴-->
        <!--.coordinateY
        li.coordinateYli(v-for="coordinateYtext in coordinateYtexts | orderBy 'coordinateYtext' -1")
          span.coordinateYtext {{coordinateYtext}}
          i.line

        -->
        <div class="chart_canvas" :style="'height:'+svgHeight+'rem'">
          <svg id="svg1" v-bind:width="'100%'" v-bind:height="svgPxHeight" class="svg">
            <defs>
              <linearGradient id="linearGradient-1" v-bind:x1="'0%'" v-bind:y1="'100%'" v-bind:x2="'100%'" v-bind:y2="'100%'">
                <stop v-bind:stop-color="'#f4f4d3'" v-bind:offset="'0%'"></stop>
                <stop v-bind:stop-color="'#87f196'" v-bind:offset="'40%'"></stop>
                <stop v-bind:stop-color="'#f1c587'" v-bind:offset="'78%'"></stop>
                <stop v-bind:stop-color="'#dbdb0b'" v-bind:offset="'100%'"></stop>
              </linearGradient>
              <linearGradient id="linearGradient-2" v-bind:x1="'0'" v-bind:y1="'100%'" v-bind:x2="'0'" v-bind:y2="'0'">
                <stop v-bind:stop-color="'#ffffa4'" v-bind:stop-opacity="0.0" v-bind:offset="'0%'"></stop>
                <!--stop(v-bind:stop-color="'#ffffa4'",v-bind:offset="'33%'")-->
                <!--stop(v-bind:stop-color="'#dbdb0b'",v-bind:offset="'66%'")-->
                <stop v-bind:stop-color="'#ffffa4'" v-bind:stop-opacity="0.3" v-bind:offset="'100%'"></stop>
              </linearGradient>
            </defs>
            <g id="Page_0" stroke="none" stroke-width="5" fill="none">
              <path v-bind:d="acreages" v-bind:fill="'url(#linearGradient-2)'" v-bind:stroke-width="0" class="acreages"></path>
            </g>
            <g id="Page_1" stroke="none" stroke-width="5" fill="none">
              <path id="points_path" v-bind:d="d" v-bind:stroke="'url(#linearGradient-1)'" v-bind:stroke-width="5" v-bind:data-odd="'first'" class="path"></path>
            </g>
            <g id="Page_2" v-bind:stroke="none" v-bind:stroke-width="5" v-bind:fill="'#ffffa4'">
              <circle v-for="point in points" v-bind:cx="point.split(',')[0]-0" v-bind:cy="point.split(',')[1]-0" v-bind:r="6" v-bind:fill="'#ffffa4'" class="point_circle"></circle>
            </g>
          </svg>
          <div class="trigger" :style="'height:'+svgHeight+'rem'">
            <div v-for="point in points" track-by="$index" v-bind:style="'left:'+point.split(',')[0]+'px;top:'+point.split(',')[1]+'px'" @touchstart.prevent.stop="valueshow($index)" class="trigger_box opacity">
              <div class="trigger_circle"></div>
              <div class="value_box"><span class="trigger_value_number"></span><span class="value_unit">{{unit}}</span></div>
            </div>
          </div>
        </div>
        <div class="coordinateX"><span v-for="coordinateX in coordinateXs" track-by="$index" v-bind:style="'width:'+100/coordinateXs.length+'%'" class="coordinateX_date">{{coordinateX}}</span>
        </div>
      </div>
    </div>
    <div class="type_switch">
      <ul class="type_switch_ul">
        <li id="weightbutton" @touchstart.prevent.stop="selectedweight('weightbutton')" v-bind:data-name="'weight'" class="date_type weight selected">
          <div class="divbotton weighticon"><span>{{$t('more_weight_messages.weight')}}</span></div>
        </li>
        <li id="bmibutton" @touchstart.prevent.stop="selectedbmi('bmibutton')" v-bind:data-name="'bmi'" class="date_type bmi">
          <div class="divbotton bmiicon"><span>BMI</span></div>
        </li>
        <li id="fatbutton" @touchstart.prevent.stop="selectedfat('fatbutton')" v-bind:data-name="'fat'" class="date_type fat">
          <div class="divbotton faticon"><span>{{$t('more_weight_messages.fat')}}</span></div>
        </li>
        <li id="bone" @touchstart.prevent.stop="selectedbone('bone')" v-bind:data-name="'bone'" class="date_type bone">
          <div class="divbotton boneicon"><span>{{$t('more_weight_messages.bone')}}</span></div>
        </li>
        <li id="kcal" @touchstart.prevent.stop="selectedkcal('kcal')" v-bind:data-name="'kcal'" class="date_type kcal">
          <div class="divbotton kcalicon"><span>{{$t('more_weight_messages.kcal')}}</span></div>
        </li>
        <li id="moisture" @touchstart.prevent.stop="selectedmoisture('moisture')" v-bind:data-name="'moisture'" class="date_type moisture">
          <div class="divbotton moistureicon"><span>{{$t('more_weight_messages.moisture')}}</span></div>
        </li>
        <li id="muscle" @touchstart.prevent.stop="selectedmuscle('muscle')" v-bind:data-name="'muscle'" class="date_type muscle">
          <div class="divbotton muscleicon"><span>{{$t('more_weight_messages.muscle')}}</span></div>
        </li>
        <li id="organs" @touchstart.prevent.stop="selectedorgans('organs')" v-bind:data-name="'organs'" class="date_type organs">
          <div class="divbotton organsicon"><span>{{$t('more_weight_messages.organs')}}</span></div>
        </li>
        <li id="internalage" @touchstart.prevent.stop="selectedinternalage('internalage')" v-bind:data-name="'internalage'" class="date_type internalage">
          <div class="divbotton internalageicon"><span>{{$t('more_weight_messages.internalage')}}</span></div>
        </li>
      </ul>
    </div>
  </div>


</template>

<style lang="stylus">
  @import '../../../shared/assets/style/common'

  .chart_page
    width 100%
    height 100%
    overflow hidden
    font-dpr 14px
    color #fff
    .date_switch
      width 100%
      position relative
      .fir_datetype
        width 90%
        margin rem(20) auto 0
        border 1px solid #fff
        overflow hidden
        border-radius rem(10)
        clearfix()
        .datetype_box
          float left
          width 33.33%
          height rem(56)
          line-height rem(56)
          background transparent
          border-left 1px solid #FFF
          text-align center
          transition all ease 0.3s
          box-sizing border-box
        .week
          border none
        .selected
          background #fff
          color #03b1c4
      .sed_datetype
        width auto
        height rem(44)
        line-height rem(44)
        position relative
        margin rem(18) auto
        text-align center
        i
          display inline-block
          width 3rem
          height 100%
          transition all ease 0.3s
      .chart_box
        width 100%
        height 219px
        overflow hidden
        .coordinateY
          width 100%
          height 220px
          position absolute
          overflow hidden
          z-index 0
          .coordinateYli
            height 20%
            width 100%
            list-style none
            position relative
            top 10px
            .coordinateYtext
              display inline-block
              width 25px
              height 100%
              font-dpr 12px
              text-align center
              position relative
            i.line
              height 0
              width 100%
              margin-left 25px
              display inline-block
              border-bottom 1px solid #fff
              position relative
              top -50px
              opacity 0.2
        .chart_canvas
          width 100%
          /*height 185.0px*/
          position relative
          #svg1
            perspective 800px
            position absolute
            .acreages
              //transition all ease 0.5s
              transform translateY(20px)
              //opacity 0.3
              animation acreages 0.8s ease forwards
              animation-iteration-count 1
              animation-delay 0s
            .path
              transition all ease 0.3s
              stroke-dasharray 1000
              stroke-dashoffset 2000
              animation dash 1s ease forwards
              animation-iteration-count 1
              animation-delay 0.5s
            [data-odd="true"]
              animation dash 1s ease forwards
              animation-delay 0s
            [data-odd="false"]
              animation dash1 1s ease forwards
              animation-delay 0s
            .point_circle
              ransition all ease 0.3s
              opacity 0
              animation pointcircle 1s ease forwards
              animation-iteration-count 1
              animation-delay 0s
          .trigger
            width 100%
            position absolute
            top 0
            .trigger_box
              transition all ease 0.4s
              size rem(60)
              height rem(60)
              margin rem(-30) 0 0 rem(-30)
              position absolute
              .trigger_circle
                position absolute
                top 50%
                left 50%
                margin rem(-11) 0 0 rem(-11)
                size rem(22)
                border-radius 50%
                background #ffffa4
                box-shadow 0 0 4px 1px rgba(255,255,255,0.5)
              .value_box
                width auto
                height rem(30)
                line-height rem(30)
                padding 0.15rem
                position absolute
                top -100%
                left 50%
                transform translate3d(-50%,0,0)
                background #219d9b
                border-radius 6px
                &:after
                  content " "
                  width 0
                  height 0
                  border-top 0.26rem solid #219d9b
                  border-left 0.26rem solid transparent
                  border-right 0.26rem  solid transparent
                  position absolute
                  left 50%
                  top 90%
                  margin-left -0.26rem
                span
                 color #ffffa4
                 font-dpr 15px
              &:first-child
                .value_box
                  transform translate3d(0,0,0)
                  left 0
                  &:after
                    left 25%
              &:last-child
                .value_box
                  left auto
                  right 0
                  transform translate3d(0,0,0)
                  &:after
                    left auto
                    right 10%
            .opacity
              opacity 0
        .coordinateX
          width 100%
          height rem(64)
          border-top 1px solid #fff
          border-bottom 1px solid #fff
          .coordinateX_date
            display inline-block
            line-height rem(64)
            text-align center
            font-dpr 12px
            width 20%
    .type_switch
      width 100%
      .type_switch_ul
        clearfix()
        .date_type
          float left
          width 33.33%
          height rem(130)
          margin-top rem(20)
          overflow hidden
          transition all ease 0.3s
          font-size 0
          text-align center
          .divbotton
            display inline-block
            size rem(130)
            text-align center
            background-size rem(70)
            background-position center 30%
            background-color transparent
            background-repeat no-repeat
            border-radius rem(10)
            span
              position relative
              top rem(90)
              font-dpr 12px
          .weighticon
            background-image url("./chartassets/images/icon/tizhong.png")
          .bmiicon
            background-image url("./chartassets/images/icon/BMI.png")
          .faticon
            background-image url("./chartassets/images/icon/zhifang.png")
          .boneicon
            background-image url("./chartassets/images/icon/bone.png")
          .kcalicon
            background-image url("./chartassets/images/icon/kcal.png")
          .moistureicon
            background-image url("./chartassets/images/icon/moisture.png")
          .muscleicon
            background-image url("./chartassets/images/icon/muscle.png")
          .organsicon
            background-image url("./chartassets/images/icon/organs.png")
          .internalageicon
            background-image url("./chartassets/images/icon/internalage.png")
        .selected
          .divbotton
            background-color #fff
            color #41b8a1
          .weighticon
            background-image url("./chartassets/images/icon/tizhong_selected.png")
          .bmiicon
            background-image url("./chartassets/images/icon/BMI_selected.png")
          .faticon
            background-image url("./chartassets/images/icon/zhifang_selected.png")
          .boneicon
            background-image url("./chartassets/images/icon/bone_selected.png")
          .kcalicon
            background-image url("./chartassets/images/icon/kcal_selected.png")
          .moistureicon
            background-image url("./chartassets/images/icon/moisture_selected.png")
          .muscleicon
            background-image url("./chartassets/images/icon/muscle_selected.png")
          .organsicon
            background-image url("./chartassets/images/icon/organs_selected.png")
          .internalageicon
            background-image url("./chartassets/images/icon/internalage_selected.png")
    .loadingdiv
      .box
        background none
        padding-top 130px
  pre
    width 100%
    height 10rem
    overflow-y auto
    background #000
  @keyframes dash {

    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes dash1 {

    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes pointcircle {
    to {
      opacity 1
    }
  }
  @keyframes acreages{
      to {
      transform translateY(0)
      //opacity 0.8
    }
  }
</style>
<script>
  var Header = require('../../../shared/components/header.vue')
  var datetools = require('./chartassets/datetool')
  var updataPointNum = require('./chartassets/updataPointNum') // 获取数据，更新self.pointnum

  module.exports = {
    components: {
      'header-nav': Header
    },
    data () {
      return {
        test: {
          a: '',
          b: '',
          c: []
        },
        svgHeight: 3.5, // 单位rem
        d: '', // 存放曲线的路径 是个字符串
        points: [], // 实际渲染的坐标点
        pointnum: ['0', '1', '0', '0', '0', 0], // 画布绘制的根据这里的数字绘制曲线  自动上下居中 自动计算差值 数值为0自动跳过
        showvalues: [], // 手指点击后要显示的数值
        acreages: '', // 存放绘制渐变图案的面的路径，是个字符串
        coordinateXs: ['0~5', '5~15', '15~20', '5~15', '15~20'],
        showseddate: '', // 存放当前可以左右选择的日期内容
        unit: 'kg', // 存放当前的单位
        coordinateYtexts: ['1kg', '7kg', '3kg', '4kg', '5kg'] // 纵坐标内容
      }
    },
    computed: {
      svgPxHeight () {
        return this.svgHeight * window.lib.flexible.rem
      }
    },
    ready () {
      var self = this
      datetools.updatecoordinateXs.month(self) // 更新横坐标
      datetools.updateSedDate.month(self) // 更新可以左右选择的日期的内容
      updataPointNum(self) // 获取数据，更新self.pointnum //debug
    },
    route: {
      data () {
      }
    },
    methods: {
      selectedweek (id) {
        var self = this
        // self.pointnum = ["123",134,255,200,134,127,244]
        datetools.updateSedDate.week(self) // 更新可以左右选择的日期的内容 第二个参数可以输入某一个日期例如"2015-12-10"
        datetools.updatecoordinateXs.week(self) // 更新横坐标函数 第二个参数可以输入某一个日期例如"2015-12-10"  会自动更新横坐标 在这个日期往前推七天

        self.selectcommom(id)
        updataPointNum(self) // 获取数据，更新self.pointnum //debug
        // self.updataSVG(self) //这个函数需要放在数据重置后执行，作用是更新svg曲线
      },
      selectedmonth (id) {
        var self = this
        // self.pointnum = [255,282,134,127,244,300]
        datetools.updateSedDate.month(self) // 更新可以左右选择的日期的内容 第二个参数可以输入某一个日期例如"2015-12-10"
        datetools.updatecoordinateXs.month(self) // 更新横坐标函数 第二个参数可以输入某一个日期例如"2015-12-10"  会自动更新横坐标 在这个日期往前推一个月
        self.selectcommom(id)
        updataPointNum(self) // 获取数据，更新self.pointnum //debug
        // self.updataSVG(self) // 这个函数需要放在数据重置后执行，作用是更新svg曲线
      },
      selectedyear (id) {
        var self = this
        datetools.updateSedDate.year(self) // 更新可以左右选择的日期的内容 第二个参数可以输入某一个日期例如"2015-12-10"
        datetools.updatecoordinateXs.year(self) // 更新横坐标函数 第二个参数可以输入某一个月份作为显示的最后一个月例如"10"  会自动更新横坐标 在这个日期往前推12个月
        // self.pointnum = ["123",2,2,2,2,0,2,244,200,134,127,244]
        self.selectcommom(id)
        updataPointNum(self) // 获取数据，更新self.pointnum //debug
        // self.updataSVG(self) //这个函数需要放在数据重置后执行，作用是更新svg曲线
      },
      selectedweight (id) {
        var self = this
        self.unit = 'kg'
        self.selectcommom(id)
        updataPointNum(self) // 获取数据，更新self.pointnum // debug
      },
      selectedbmi (id) {
        var self = this
        self.unit = ' '
        self.selectcommom(id)
        updataPointNum(self) // 获取数据，更新self.pointnum // debug
      },
      selectedfat (id) {
        var self = this
        self.unit = '%'
        self.selectcommom(id)
        updataPointNum(self) // 获取数据，更新self.pointnum //debug
      },
      selectedbone (id) {
        var self = this
        self.unit = 'kg'
        self.selectcommom(id)
        updataPointNum(self) // 获取数据，更新self.pointnum //debug
      },
      selectedkcal (id) {
        var self = this
        self.unit = 'kcal'
        self.selectcommom(id)
        updataPointNum(self) // 获取数据，更新self.pointnum //debug
      },
      selectedmoisture (id) {
        var self = this
        self.unit = '%'
        self.selectcommom(id)
        updataPointNum(self) // 获取数据，更新self.pointnum //debug
      },
      selectedmuscle (id) {
        var self = this
        self.unit = '%'
        self.selectcommom(id)
        updataPointNum(self) // 获取数据，更新self.pointnum //debug
      },
      selectedorgans (id) {
        var self = this
        self.unit = ''
        self.selectcommom(id)
        updataPointNum(self) // 获取数据，更新self.pointnum //debug
      },
      selectedinternalage (id) {
        var self = this
        self.unit = ''
        self.selectcommom(id)
        updataPointNum(self) // 获取数据，更新self.pointnum //debug
      },
      valueshow (num) {
        var self = this
        var trigger_text = document.getElementsByClassName('trigger_value_number')
        var trigger_box = document.getElementsByClassName('trigger_box')
        var value_box = document.getElementsByClassName('value_box')
        self.showvalues = []
        for (let i = 0; i < self.pointnum.length; i++) {
          if (self.pointnum[i] > 0) {
            self.showvalues.push(self.pointnum[i])
          }
        }
        for (let i = 0; i < self.showvalues.length; i++) {
          trigger_text[i].innerHTML = self.showvalues[i]
        }
        for (let i = 0; i < trigger_box.length; i++) {
          trigger_box[i].style.opacity = 0
          value_box[i].style.display = 'none'
        }
        trigger_box[num].style.opacity = 1
        value_box[num].style.display = 'block'
      },
      prevdate () {
        var self = this
        // var pointer_left = document.getElementsByClassName('pointer_left')[0]
        // var pointer_right = document.getElementsByClassName('pointer_right')[0]
        var selectdatetype = document.getElementsByClassName('selected')[0]
        var sed_datetext = document.getElementsByClassName('sed_datetext')[0]
        var firstdate = sed_datetext.getAttribute('data-firstdate')
        // var lastdate = sed_datetext.getAttribute('data-lastdate')
        let newlastdate = new Date(new Date(firstdate) - 1000 * 60 * 60 * 24)
        document.getElementsByClassName('pointer_right')[0].style.opacity = '1'
        if (selectdatetype.id === 'yearbox') {
          datetools.updateSedDate.year(self, newlastdate) // 更新可以左右选择的日期的内容 第二个参数可以输入某一个日期例如'2015-12-10'
          datetools.updatecoordinateXs.year(self, newlastdate) // 更新横坐标函数 第二个参数可以输入某一个月份作为显示的最后一个月例如'10'  会自动更新横坐标 在这个日期往前推12个月
        } else if (selectdatetype.id === 'monthbox') {
          datetools.updateSedDate.month(self, newlastdate) // 更新可以左右选择的日期的内容 第二个参数可以输入某一个日期例如'2015-12-10'
          datetools.updatecoordinateXs.month(self, newlastdate) // 更新横坐标函数 第二个参数可以输入某一个月份作为显示的最后一个月例如'10'  会自动更新横坐标 在这个日期往前推12个月
        } else if (selectdatetype.id === 'weekbox') {
          datetools.updateSedDate.week(self, newlastdate) // 更新可以左右选择的日期的内容 第二个参数可以输入某一个日期例如'2015-12-10'
          datetools.updatecoordinateXs.week(self, newlastdate) // 更新横坐标函数 第二个参数可以输入某一个月份作为显示的最后一个月例如'10'  会自动更新横坐标 在这个日期往前推12个月
        }
        updataPointNum(self) // 获取数据，更新self.pointnum // debug
      },
      nextdate () {
        var self = this
        // var pointer_left = document.getElementsByClassName('pointer_left')[0]
        // var pointer_right = document.getElementsByClassName('pointer_right')[0]
        var selectdatetype = document.getElementsByClassName('selected')[0]
        var sed_datetext = document.getElementsByClassName('sed_datetext')[0]
        // var firstdate = sed_datetext.getAttribute('data-firstdate')
        var lastdate = sed_datetext.getAttribute('data-lastdate')
        if (selectdatetype.id === 'yearbox') {
          let newlastdate = new Date((new Date(lastdate) - 0) + 1000 * 60 * 60 * 24 * 366)
          if (newlastdate - new Date() > 0) {
            console.log('超过当前日期')
            document.getElementsByClassName('pointer_right')[0].style.opacity = '0'
          } else {
            datetools.updateSedDate.year(self, newlastdate) // 更新可以左右选择的日期的内容 第二个参数可以输入某一个日期例如'2015-12-10'
            datetools.updatecoordinateXs.year(self, newlastdate) // 更新横坐标函数 第二个参数可以输入某一个月份作为显示的最后一个月例如'10'  会自动更新横坐标 在这个日期往前推12个月
            updataPointNum(self) // 获取数据，更新self.pointnum //debug
          }
        } else if (selectdatetype.id === 'monthbox') {
          let newlastdate = new Date((new Date(lastdate) - 0) + 1000 * 60 * 60 * 24 * 30)
          if (newlastdate - new Date() > 0) {
            console.log('超过当前日期')
            document.getElementsByClassName('pointer_right')[0].style.opacity = '0'
          } else {
            datetools.updateSedDate.month(self, newlastdate) // 更新可以左右选择的日期的内容 第二个参数可以输入某一个日期例如'2015-12-10'
            datetools.updatecoordinateXs.month(self, newlastdate) // 更新横坐标函数 第二个参数可以输入某一个月份作为显示的最后一个月例如'10'  会自动更新横坐标 在这个日期往前推12个月
            updataPointNum(self) // 获取数据，更新self.pointnum //debug
          }
        } else if (selectdatetype.id === 'weekbox') {
          let newlastdate = new Date((new Date(lastdate) - 0) + 1000 * 60 * 60 * 24 * 7)
          if (newlastdate - new Date() > 0) {
            console.log('超过当前日期')
            document.getElementsByClassName('pointer_right')[0].style.opacity = '0'
          } else {
            datetools.updateSedDate.week(self, newlastdate) // 更新可以左右选择的日期的内容 第二个参数可以输入某一个日期例如'2015-12-10'
            datetools.updatecoordinateXs.week(self, newlastdate) // 更新横坐标函数 第二个参数可以输入某一个月份作为显示的最后一个月例如'10'  会自动更新横坐标 在这个日期往前推12个月
            updataPointNum(self) // 获取数据，更新self.pointnum //debug
          }
        }
      },
      updataSVG (self) { // 更新svg的内容
        resetAnimation() // 重置动画
        self.d = pointToD(self.pointnum).path // 重置数值 线
        self.points = pointToD(self.pointnum).points // 重置数值  点
        self.acreages = pointToD(self.pointnum).acreages // 重置数值  面
        function resetAnimation () {
          var points_path = document.getElementById('points_path')
          var trigger_box = document.getElementsByClassName('trigger_box')
          var value_box = document.getElementsByClassName('value_box')
          self.showvalues = []
          for (let i = 0; i < trigger_box.length; i++) {
            trigger_box[i].style.opacity = 0
            value_box[i].style.display = 'none'
          }
          if (points_path.getAttribute('data-odd') === 'false') {
            points_path.setAttribute('data-odd', 'true')
          } else {
            points_path.setAttribute('data-odd', 'false')
          }
        }
        function pointToD (pointarr) {
          var svg_slope = 50 // 变化坡度大小 可以选择0到100之间的数字
          var paddingTop = 80 + 50 * window.lib.flexible.dpr // 距上偏移量 不要超过svg的高度
          var newpointarr = []
          console.log(pointarr)
          for (let i = 0; i < pointarr.length; i++) {
            if (pointarr[i] - 0 > 0) {
              var max = pointarr[i] - 0
              var min = pointarr[i] - 0
              for (let i = 1; i < pointarr.length; i++) {
                if (pointarr[i] - 0 > 0) {
                  if (max < pointarr[i] - 0) { max = pointarr[i] - 0 }
                  if (min > pointarr[i] - 0) { min = pointarr[i] - 0 }
                }
              }
            }
          }
          var valueheight = max - min
          for (let i = 0; i < pointarr.length; i++) {
            if (pointarr[i] > 0) {
              newpointarr.push(((pointarr[i] - min) / valueheight * svg_slope) + (100 - svg_slope) / 2)
              if (pointarr[i] === min) {
                newpointarr[i] = (100 - svg_slope) / 2 + 1
              }
            } else {
              newpointarr.push(0)
            }
          }
          var coordinateXlength = newpointarr.length
          var windowWidth = window.innerWidth
          var firstno0 = 0
          var lastno0
          var result = {}
          result.points = []
          result.acreages = []
          for (let i = 0; i < newpointarr.length; i++) {
            if (newpointarr[i] > 0) {
              result.path = 'M' + (windowWidth / coordinateXlength / 2 + windowWidth / coordinateXlength * i) + ', ' + (-newpointarr[i] + paddingTop)
              result.acreages = 'M' + (windowWidth / coordinateXlength / 2 + windowWidth / coordinateXlength * i) + ', ' + (-newpointarr[i] + paddingTop)
              result.points.push((windowWidth / coordinateXlength / 2 + windowWidth / coordinateXlength * i) + ', ' + (-newpointarr[i] + paddingTop))
              firstno0 = i
              break
            }
          }
          for (let i = firstno0 + 1; i < newpointarr.length; i++) {
            if (newpointarr[i] > 0) {
              result.path += ' L' + (windowWidth / coordinateXlength / 2 + windowWidth / coordinateXlength * i) + ', ' + (-newpointarr[i] + paddingTop)
              result.path += ' L' + (windowWidth / coordinateXlength / 2 + windowWidth / coordinateXlength * i) + ', ' + (-newpointarr[i] + paddingTop + 0.001) // 弥补只有两个点的时候不显示线段的问题

              result.acreages += ' L' + (windowWidth / coordinateXlength / 2 + windowWidth / coordinateXlength * i) + ', ' + (-newpointarr[i] + paddingTop)
              lastno0 = i
              result.points.push((windowWidth / coordinateXlength / 2 + windowWidth / coordinateXlength * i) + ', ' + (-newpointarr[i] + paddingTop))
            }
          }
          result.acreages += ' L' + (windowWidth / coordinateXlength / 2 + windowWidth / coordinateXlength * lastno0) + ',253'
          result.acreages += ' L' + (windowWidth / coordinateXlength / 2 + windowWidth / coordinateXlength * firstno0) + ',253'
          result.acreages += ' L' + (windowWidth / coordinateXlength / 2 + windowWidth / coordinateXlength * firstno0) + ', ' + (-newpointarr[firstno0] + paddingTop)
          return result
        }
      },
      selectcommom (id) { // 将某id的class添加点击事件 ，添加class.selected和删除class.selected
        // var self = this
        var selectedbox = document.getElementById(id)
        var parentbox = selectedbox.parentNode
        removeClass(parentbox.getElementsByClassName('selected')[0], 'selected')
        addClass(selectedbox, 'selected')
        function addClass (elements, cName) {
          elements.className += ' ' + cName
        }
        function removeClass (elements, cName) {
          elements.className = elements.className.replace(new RegExp('(\\s|^)' + cName + '(\\s|$)'), '') // replace方法是替换
        }
      }
    }
  }
</script>
