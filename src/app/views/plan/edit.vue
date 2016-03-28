<template>
 <div class="plan-edit-add">
   <header-nav
     :title="$t('title.edit_plan')">
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
        weightUnit: window.localStorage.weightUnit,
        showDeleteModal: false,
        havePlan: true,
        plan: {
          name: '123',
          target: '23',
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
        var self = this
        self.getPlan(self.$route.params.id)
      }
    },

    methods: {
      /**
       * 根据id获取当前的计划详情
       * @param  {[type]} planId [description]
       * @return {[type]}        [description]
       */
      getPlan (planId) {
        var self = this
        var params = {
          'query':
          {
            '_id': {'$in': [planId]}
          }
        }
        api.getPlanList(params).then(function (r) {
          if (r.status - 0 === 200) {
            self.plan = r.data.list[0]
            self.userInputWeight = self.kg2otherUnit(self.plan.target)
            if (typeof r.data.list[0].promptOpen === 'boolean') {
              self.plan.promptOpen = r.data.list[0].promptOpen
            } else if (r.data.list[0].promptOpen - 0) {
              self.plan.promptOpen = true
            } else {
              self.plan.promptOpen = false
            }
            self.initPlanTime()
          } else {
            self.showMessage(r.msg)
          }
        })
      },
      /**
       * 保存按钮的事件
       * @return {void}
       */
      savePlan () {
        var self = this
        if (self.plan.name.length < 1 || self.plan.name.length > 16) {
          self.showMessage(self.$t('messages.plan_name_length'))
        } else if (!(self.plan.target - 0)) {
          self.showMessage(self.$t('messages.target_weight'))
        } else if (!(new Date(self.plan.startDate) < new Date(self.plan.endDate))) {
          self.showMessage(self.$t('messages.end_date'))
        } else {
          // 保存数据到容器
          var query = {
            '_id': {'$in': [self.$route.params.id]}
          }
          self.plan.creatTime = new Date().getTime()
          api.editPlan(self.plan, query).then(function (r) {
            if (r.status - 0 === 200) {
              self.showMessage(self.$t('messages.add_success'))
              self.$route.router.go('/plan')
            } else {
              self.showMessage(r.msg)
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
          unit = window.localStorage.weightUnit
        }
        var resutlt = {
          kg: function (number) { return number },
          lb: function (number) { return number * 0.4535924 },
          stone: function (number) { return number * 6.35029318 }
        }
        return resutlt[unit](number)
      },

      /**
       * kg转其他单位
       * @param  {[type]} weight [description]
       * @param  {[type]} unit   [description]
       * @return {[type]}        [description]
       */
      kg2otherUnit (weight, unit) {
        if (arguments.length === 1) {
          unit = window.localStorage.weightUnit || 'kg'
        }
        var resutlt = {
          kg: function (kgWeight) { return parseInt(kgWeight * 10) / 10 },
          lb: function (kgWeight) { return (parseInt(kgWeight * 2.2046226 * 10) / 10) },
          stone: function (kgWeight) { return (parseInt(kgWeight * 0.15747312 * 10) / 10) }
        }
        return resutlt[unit](weight)
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

</style>
