 <template>
  <div class="plan-index">
    <header-nav
      :title="$t('title.plan')"
      :showleft="false"
      :rightstyle="'add'"
      :showright="true"
      @right-click="addPlan">
    </header-nav>
    <div class="plan-box iosScrollBug" v-heightauto>
      <div class="have-plan" v-if="havePlan">
        <ul>
          <li class="plan-button" v-for="plan in plans" @click.prevent.stop="editPlan(plan.id)">
            <div class="plan" :class="{'show-delete':n===2}">
              <div class="plan-name">{{plan.name}}</div>
              <div class="plan-details-box">
                <div class="details plan-day">
                  <span class="small-text">{{$t('title.plan')}}</span>
                  <span class="day-number">{{plan.time}}{{$t('plan.unit_day')}}</span>
                </div>
                <div class="details target">
                  <span class="small-text">{{$t('plan.target')}}</span>
                  <span class="day-number">{{kg2otherUnit(plan.target)}}{{weightUnit}}</span>
                </div>
              </div>
              <i class="more"></i>
              <div class="delete-box" @touchstart="deleteButtonDown(plan)">
                <span>{{$t('common.del')}}</span>
              </div>
              <div class="touch"></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="no-plan" v-if="!havePlan">
        <div class="img">
          <img src="../../assets/images/icons/no-plan.png" width="100%">
        </div>
        <div class="text">
          <p>{{$t('messages.add_plan')}}</p>
        </div>
      </div>
    </div>
    <modal class="delete-modal" :show.sync="showDeleteModal">
      <div slot="body">
        <div class=modal-body-text-box>
          {{$t('messages.del_plan')}}
        </div>
      </div>
      <div slot="footer">
        <div class="actions">
          <div class="btn cancel-button" @touchend="cancel">{{$t('common.cancel')}}</div>
          <div class="btn delete-button" @touchend="deletePlan">{{$t('common.del')}}</div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  var Header = require('../../../shared/components/header.vue')
  var Modal = require('../../../shared/components/modal.vue')
  import api from '../../api'
  export default {
    components: {
      'header-nav': Header,
      'modal': Modal
    },

    data () {
      return {
        showDeleteModal: false,
        weightUnit: window.localStorage.weightUnit,
        plans: [
          // {
          //   name: '计划123',
          //   time: '3',
          //   target: 60,
          //   id: 'absasdakl'
          // },
          // {
          //   name: '计划121233',
          //   time: '3',
          //   target: 60,
          //   id: 'absasdakl'
          // },
          // {
          //   name: '计划112323',
          //   time: '3',
          //   target: 60,
          //   id: 'absasdakl'
          // }
        ],
        toDeletePlan: {}
      }
    },

    computed: {
      havePlan () {
        return this.plans.length > 0
      }
    },

    route: {
      data () {
        var params = {
          'order': {'creatTime': 'desc'} // asc
        }
        this.getPlanList(params)
      }
    },

    ready () {
      this.listenTouch()// 监听手势事件
    },

    methods: {
      /**
       * 获取计划列表
       * @param  {[type]} params [description]
       * @return {[type]}        [description]
       */
      getPlanList (params) {
        var self = this
        api.getPlanList(params).then(function (r) {
          if (r.status - 0 === 200) {
            var plans = []
            r.data.list.map(function (item) {
              var plan = {}
              plan.name = item.name
              plan.target = item.target
              plan.id = item._id
              plan.time = date2day(item.startDate, item.endDate)
              plans.push(plan)
            })
            self.plans = [].concat(plans)
          }
        })
        /**
         * 求两日期相差多少天
         * @param  {[type]} startDate [description]
         * @param  {[type]} endDate   [description]
         * @return {[type]}           [description]
         */
        function date2day (startDate, endDate) {
          var result = 0
          result = parseInt((new Date(endDate).getTime() - new Date(startDate).getTime()) / (24 * 60 * 60 * 1000))
          return result
        }
      },

      /**
       * 取消事件
       * @return {[type]} [description]
       */
      cancel () {
        var self = this
        var touchDoms = document.getElementsByClassName('touch')
        for (var i = 0; i < touchDoms.length; i++) {
          touchDoms[i].parentElement.style.webkitTransform = 'translate3d(0,0,0)'
        }
        self.showDeleteModal = false
      },

      /**
       * 编辑计划
       * @param  {[type]} planid [description]
       * @return {[type]}        [description]
       */
      editPlan (planid) {
        console.log(planid)
        this.$route.router.go('/plan/' + planid)
      },

      /**
       * 删除当前计划
       * @return {[type]} [description]
       */
      deletePlan () {
        var self = this
        var params = {
          query: {
            '_id': {'$in': [self.toDeletePlan.id]}
          }
        }
        api.deletePlan(params).then(function (r) {
          if (r.status - 0 === 200) {
            self.showDeleteModal = false
            self.plans.$remove(self.toDeletePlan)
          }
        })
      },

      /**
       * 将体重转化为当前单位
       * @param  {[type]} unit   [description]
       * @param  {[type]} weight [description]
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
       * 显示删除弹窗
       * @return {[type]} [description]
       */
      deleteButtonDown (plan) {
        var self = this
        self.toDeletePlan = plan
        self.showDeleteModal = true
      },
      /**
       * 添加计划
       */
      addPlan () {
        console.log('添加计划')
        this.$route.router.go('/plan/add')
      },

      /**
       * 监听手势事件
       * @return {[type]} [description]
       */
      listenTouch () {
        var touchDoms = document.getElementsByClassName('touch')
        // touch.on(touchDoms, 'touchstart', function (ev) {
        //   ev.preventDefault()
        // })
        window.touch.on(touchDoms, 'swiperight', function (ev) {
          ev.preventDefault()
          for (var i = 0; i < touchDoms.length; i++) {
            touchDoms[i].parentElement.style.webkitTransform = 'translate3d(0,0,0)'
          }
          this.parentElement.style.webkitTransform = 'translate3d(0,0,0)'
        })
        window.touch.on(touchDoms, 'swipeleft', function (ev) {
          ev.preventDefault()

          for (var i = 0; i < touchDoms.length; i++) {
            touchDoms[i].parentElement.style.webkitTransform = 'translate3d(0,0,0)'
          }
          this.parentElement.style.webkitTransform = 'translate3d(-3rem,0,0)'
        })
      }
    }
  }
</script>

<style lang="stylus">
  .plan-index
    .plan-box
      margin-top 0.2rem
      padding-bottom 2.8rem
      box-sizing border-box
      padding-left 0.6rem
      overflow-x hidden
      overflow-y auto
      .have-plan
        padding-bottom 3rem
        ul
          .plan-button
            position relative
            height 3rem
            line-height 3rem
            padding-left 0.2rem
            font-size 0.8rem
            border-bottom 1px solid rgba(255,255,255,0.4)
            &:first-child
              border-top 1px solid rgba(255,255,255,0.4)
            .plan
              position relative
              transition transform ease 0.2s
              transform translate3d(0,0,0)
              .plan-name
                width 6rem
                height 3rem
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
              .plan-details-box
                height 2rem
                margin-top 0.5rem
                position absolute
                right 2rem
                top 0
                .details
                  height 1rem
                  line-height 1rem
                  .small-text
                    font-size 0.6rem
                .plan-day
                  color #fffda2
              .more
                display block
                width 0.8rem
                height 0.8rem
                position absolute
                right 0.8rem
                top 50%
                transform translate3d(0,-50%,0)
              .delete-box
                position absolute
                left 100%
                top 0
                width 3rem
                height 100%
                line-height 3rem
                text-align center
                background #fd3830
                font-size 0.7rem
              .touch
                width 100%
                height 100%
                position absolute
                top 0
                left 0
            .show-delete
              transform translate3d(-3rem,0,0)
      .no-plan
        position absolute
        left 0
        width 60%
        left 50%
        top 20%
        transform translate3d(-50%,0,0)
        .img
          width 100%
        .text
          width 100%
          text-align center
          p
            margin 0
            font-size 0.85rem
    .modal
      background rgba(0,0,0,0.4)
      .modal-header
        h3
          font-size 1rem
          color #484848
      .modal-body
        .modal-body-text-box
          width 100%
          padding 0
          overflow hidden
          word-break break-all
          text-align center
          font-size 0.8rem
      .modal-footer
        .btn.cancel-button
          color #999
          font-size 0.8rem
        .btn.delete-button
          color #fd3830
          font-size 0.8rem
</style>
