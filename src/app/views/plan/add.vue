<template>
 <div class="plan-edit-add">
   <header-nav
     :title="$t('title.add_plan')">
   </header-nav>
   <div class="plan-box">
    <div class="plan-contents-box">
      <div class="plan-content name">
        <span class="key">{{$t('plan.name')}}</span>
        <span class="value">
          <input type="text" :placeholder="$t('placeholders.plan_name_length')" v-model="plan.name">
          </input>
        </span>
      </div>
      <div class="plan-content target">
        <span class="key">{{$t('plan.target_weight')}}</span>
        <span class="value">
          <input type="number" v-model="userInputWeight">
          <i class="unit">{{weightUnit}}</i>
        </span>
      </div>
      <div class="plan-content start-date">
        <span class="key">{{$t('plan.start_date')}}</span>
        <span class="value">{{plan.startDate}}</span>
        <input type="date" class="value transparent" v-model="plan.startDate">
      </div>
      <div class="plan-content end-date">
        <span class="key">{{$t('plan.end_date')}}</span>
        <span class="value">{{plan.endDate}}</span>
        <input type="date" class="value transparent" v-model="plan.endDate">
      </div>
    </div>
    <div class="plan-contents-box">
      <div class="plan-content prompt">
        <span class="key">{{$t('plan.remind')}}</span>
        <div
        class="value"
        :class="{'on':plan.promptOpen}"
        @touchstart="promptEvent">
          <div class="prompt-box">
            <div class="prompt-background"></div>
          </div>
          <div class="prompt-button"></div>
        </div>
      </div>
    </div>
    <div class="plan-contents-box" v-show="plan.promptOpen">
      <div class="plan-content start-time">
        <span class="key">{{$t('plan.start_time')}}</span>
        <span class="value">{{plan.startTime}}</span>
        <input type="time" class="value transparent" v-model="plan.startTime">
      </div>
      <div class="plan-content end-time">
        <span class="key">{{$t('plan.end_time')}}</span>
        <span class="value">{{plan.endTime}}</span>
        <input type="time" class="value transparent" v-model="plan.endTime">
      </div>
    </div>
   </div>
  <div class="save-button-box">
    <button class="save-button" type="button" @touchend="savePlan">{{$t('common.save')}}</button>
  </div>
 </div>
</template>

<script>
  var Header = require('../../../shared/components/header.vue')
  var Modal = require('../../../shared/components/modal.vue')
  import {showMessage} from '../../store/actions/system'
  import api from '../../api'

  export default {
    components: {
      'header-nav': Header,
      'modal': Modal
    },

    vuex: {
      actions: {
        showMessage
      }
    },

    data () {
      return {
        weightUnit: window.localStorage.weightUnit || 'kg',
        plan: {
          name: '',
          target: '',
          startDate: '',
          endDate: '',
          promptOpen: true,
          startTime: '11:00',
          endTime: '11:00'
        },
        userInputWeight: ''
      }
    },
    watch: {
      userInputWeight () {
        this.plan.target = this.otherUnit2kg(this.userInputWeight)
      }
    },
    route: {
      data () {
        this.initPlanDate() // 初始化日期为当前日期
        this.initPlanTime() // 初始化时间为当前时间
      }
    },

    methods: {
      /**
       * 保存按钮的事件
       * @return {void}
       */
      savePlan () {
        var self = this
        console.log(JSON.stringify(self.plan))
        if (self.plan.name.length < 1 || self.plan.name.length > 16) {
          self.showMessage(self.$t('messages.plan_name_length'))
        } else if (!(self.plan.target - 0)) {
          alert(self.plan.target - 0)
          self.showMessage(self.$t('messages.target_weight'))
        } else if (!(new Date(self.plan.startDate) < new Date(self.plan.endDate))) {
          self.showMessage(self.$t('messages.end_date'))
        } else {
          // 保存数据到容器
          self.plan.creatTime = new Date().getTime()
          self.plan.userid = window.localStorage.selectedUserId
          api.addPlan(self.plan).then(function (r) {
            if (r.status - 0 === 200) {
              self.showMessage(self.$t('messages.add_success'))
              self.$route.router.go('/plan')
            }
          })
        }
      },

      /**
       * 其他单位转成kg
       * @param  {[type]} number [description]
       * @param  {[type]} unit   [description]
       * @return {[type]}        [description]
       */
      otherUnit2kg (number, unit) {
        if (!unit) {
          unit = window.localStorage.weightUnit || 'kg'
        }
        var resutlt = {
          kg: function (number) { return number },
          lb: function (number) { return number * 0.4535924 },
          stone: function (number) { return number * 6.35029318 }
        }
        return resutlt[unit](number)
      },
      /**
       * 计划里面的日期初始化
       * @return {[type]} [description]
       */
      initPlanDate () {
        this.plan.startDate = this.dateTool().date
        this.plan.endDate = this.dateTool(new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)).date
      },

      /**
       * 计划里面的时间初始化
       * @return {[type]} [description]
       */
      initPlanTime () {
        this.plan.startTime = this.dateTool().time.substring(0, 5)
        this.plan.endTime = this.dateTool(new Date(new Date().getTime() + 60 * 60 * 1000)).time.substring(0, 5)
      },

      /**
       * 运动提醒开关被点击
       * @return {[type]} [description]
       */
      promptEvent () {
        if (!this.plan.promptOpen) {
          this.initPlanTime()
        }
        this.plan.promptOpen = !this.plan.promptOpen
      },

      /**
       * 日期处理工具 传入一个日期 固定格式返回一个对象 包含date属性和time属性
       * @param  {[type]} date [description]
       * @return {[type]}      [description]
       */
      dateTool (date) {
        if (!date) {
          date = new Date()
        }
        var result = {}
        result.date = date.getFullYear() + '-' + toLength2(date.getMonth() + 1) + '-' + toLength2(date.getDate())
        result.time = toLength2(date.getHours()) + ':' + toLength2(date.getMinutes()) + ':' + toLength2(date.getSeconds())
        return result
        function toLength2 (num) {
          num = num - 0
          return num > 9 ? num : ('0' + num)
        }
      }
    }
  }
</script>

<style lang="stylus">
  .plan-edit-add
    width 100%
    height 100%
    .plan-box
      margin-top 0.6rem
      font-size 0.7rem
      .plan-contents-box
        border-bottom 1px solid #fff
        padding-left 0.8rem
        box-sizing border-box
        .plan-content
          height 2.5rem
          line-height 2.5rem
          border-bottom 1px solid rgba(255,255,255,0.5)
          position relative
          .key
            display inline-block
            width 4rem
          .value
            display inline-block
            position absolute
            right 1rem
            width 8rem
            height 100%
            text-align right
            overflow hidden
            input[type="text"]
            input[type="number"]
              height 100%
              width 5rem
              background none
              border 0
              text-align right
          .value.transparent
            opacity 0
          &:last-child
            border-bottom 0
        .name
          .value
            input
              width 100%
        .target
          .value
            input
              width 80%
        .prompt
          .value
            .prompt-box
              position absolute
              top 0.6rem
              right 0.3rem
              width 2rem
              height 1.2rem
              border-radius 1.2rem
              border 0.1rem solid #fff
              overflow hidden
              .prompt-background
                position absolute
                top 0
                right 0.79rem
                width 100%
                height 100%
                background #4dd863
                border-radius 1.2rem
                transition left 0.2s ease
            .prompt-button
              position absolute
              top 0.69rem
              right 0.4rem
              width 1.2rem
              height 1.2rem
              border-radius 1.25rem
              background #fff
              box-shadow 0 0 0.5rem rgba(0,0,0,0.3)
              transform translate3d(-0.79rem,0,0)
              transition transform 0.2s ease
          .value.on
            .prompt-box
              .prompt-background
                right 0
            .prompt-button
              transform translate3d(0.05rem,0,0)
        &:first-child
          border-top 1px solid #fff
  .save-button-box
    position fixed
    bottom 0
    width 100%
    height 4rem
    padding 0.5rem
    text-align center
    box-sizing border-box
    .save-button
      width 85%
      height 2rem
      background #ffa96f
      border 0.12rem solid #fff
      border-radius 1rem
      font-size 0.8rem
</style>
