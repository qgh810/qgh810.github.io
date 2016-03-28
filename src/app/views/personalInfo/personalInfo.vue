<template>
  <div class="personalInfo-index">
    <header-nav
      :showleft="false"
      :title="$t('title.my_message')"
      :showright="true"
      :righttext="$t('common.next')"
      @right-click="next">
    </header-nav>
    <hello :msg="$t('welcome.p1')"></hello>
    <div class="personalInfo-box" v-heightauto>
      <div class="header-img-box" :class="personalInfomation.sex" @touchstart="selectHeaderImg">
        <img v-show="personalInfomation.headerImg" :src="personalInfomation.headerImg" alt="" width="100%" height="100%" class="header-img">
      </div>
      <div class="sex-box">
        <span class="text">{{$t('user_message.sex')}}</span>
        <div class="button-box male" :class="{'selected':personalInfomation.sex==='male'}" @touchstart="selectSex('male')"></div>
        <div class="button-box female" :class="{'selected':personalInfomation.sex==='female'}" @touchstart="selectSex('female')"></div>
      </div>
      <div class="other-information-box">
        <div class="other-information name-box">
          <i class="icon name-icon"></i>
          <input class="name-input" type="text" name="name" v-model="personalInfomation.name" placeholder="{{$t('placeholders.user_name_length')}}">
        </div>
        <div class="other-information birthday-box">
          <i class="icon birthday-icon"></i>
          <span class="birthday-text">
            {{birthday.year}} - {{birthday.month}}
          </span>
          <i class="more"></i>
          <input class="birthday-input" type="date" name="birthday" v-model="personalInfomation.birthday">
        </div>
        <div class="other-information height-box" @touchend="showHeightPicker">
          <i class="icon height-icon"></i>
          <span class="height-text">{{personalInfomation.height}}</span>
          <span class="unit">cm</span>
          <i class="more"></i>
        </div>
        <div class="other-information weight-box" @touchend="showWeightPicker">
          <i class="icon weight-icon"></i>
          <span class="weight-text">{{personalInfomation.weight}}</span>
          <span class="unit">kg</span>
          <i class="more"></i>
        </div>
      </div>
    </div>
    <div class="canvas-box">
      <canvas id="picture-canvas" width="100" height="100"></canvas>
    </div>
  </div>
</template>

<script>
  var Header = require('../../../shared/components/header.vue')
  var Hello = require('../../../shared/components/hello.vue')
  import {showMessage} from '../../store/actions/system'
  import SDK from '../../helpers/sdk'
  import api from '../../api'
  export default {
    components: {
      'header-nav': Header,
      'hello': Hello
    },

    vuex: {
      actions: {
        showMessage
      }
    },

    data () {
      return {
        selectingHeight: false,
        selectingWeight: false,
        personalInfomation: {
          headerImg: '',
          sex: 'male',
          name: '',
          birthday: '1990-10-01',
          height: 178.0,
          weight: 80.0
        }
      }
    },

    computed: {
      birthday () {
        var self = this
        var birthdayStr = self.personalInfomation.birthday
        var result = {}
        result.year = new Date(birthdayStr).getFullYear()
        result.month = new Date(birthdayStr).getMonth() + 1
        return result
      }
    },

    ready () {
    },
    methods: {
      /**
       * 图片选择的回调事件
       * @return {[type]} [description]
       */
      onPhotoPickerResult () {
        var self = this
        SDK.on('onPhotoPickerResult', (r) => {
          var imgPath = r.path.split('html/')[1]
          self.personalInfomation.headerImg = imgPath
        })
      },
      /**
       * 监听选择器回调
       * @return {[type]} [description]
       */
      onSelectPicker () {
        var self = this
        if (this.selectingHeight) {
          this.selectingHeight = false
          SDK.on('onPickerResult', (r) => {
            var height = r.selectedData.join('').replace(/[^\d.]/g, '') - 0
            self.personalInfomation.height = Math.round(height * 10) / 10
          })
        }
        if (this.selectingWeight) {
          this.selectingWeight = false
          SDK.on('onPickerResult', (r) => {
            var weight = r.selectedData.join('').replace(/[^\d.]/g, '') - 0
            self.personalInfomation.weight = Math.round(weight * 10) / 10
          })
        }
      },

      /**
       * 保存个人信息
       * ！！！！！！！！！！保存成功后记得将window.localStorage.firstEntry = true
       * @return {[type]} [description]
       */
      saveInfo () {
        var self = this
        console.log(self.personalInfomation)
        self.personalInfomation.creatTime = new Date().getTime()
        self.personalInfomation.selected = 1
        if (!self.personalInfomation.headerImg) {
          self.personalInfomation.headerImg = self.personalInfomation.sex === 'male' ? 'static/male.png' : 'static/female.png'
        }
        api.addUser(self.personalInfomation).then(function (r) {
          if (r.status - 0 === 200) {
            window.localStorage.firstEntry = true
            self.showMessage(self.$t('messages.setting_success'))
            self.$route.router.go('/index')
          }
        })
      },

      /**
       * 下一步事件
       * @return {Function} [description]
       */
      next () {
        var self = this
        if (self.personalInfomation.name.length < 1 || self.personalInfomation.name.length > 16) {
          this.showMessage(self.$t('messages.user_name_length'))
        } else {
          self.saveInfo()
        }
      },

      /**
       * 选择头像函数
       * @return {[type]} [description]
       */
      selectHeaderImg () {
        var self = this
        var params = {}
        params.saveImgName = 'userImg-' + new Date().getTime()
        api.showPhotoPicker(params).then((r) => {
          if (r.status - 0 === 200) {
            self.onPhotoPickerResult()
          }
        })
      },

      /**
       * 显示身高选择器
       * @return {[type]} [description]
       */
      showHeightPicker () {
        var self = this
        var params = {}
        params.title = '身高'
        params.datasource = [[], []]
        params.selectRow = [parseInt(self.personalInfomation.height) - 50, Math.round((self.personalInfomation.height - parseInt(self.personalInfomation.height)) * 10)]
        for (let i = 50; i <= 250; i++) {
          params.datasource[0].push(i + '')
        }
        for (let i = 0; i < 10; i++) {
          params.datasource[1].push('.' + i + 'cm')
        }
        api.showPicker(params).then((r) => {
          if (r.status - 0 === 200) {
            self.selectingHeight = true
            this.onSelectPicker()
          }
        })
      },

      /**
       * 显示体重选择器
       * @return {[type]} [description]
       */
      showWeightPicker () {
        var self = this
        var params = {}
        params.title = '体重'
        params.datasource = [[], []]
        params.selectRow = [parseInt(this.personalInfomation.weight) - 5, Math.round((this.personalInfomation.weight - parseInt(this.personalInfomation.weight)) * 10)]
        for (let i = 5; i <= 399; i++) {
          params.datasource[0].push(i + '')
        }
        for (let i = 0; i < 10; i++) {
          params.datasource[1].push('.' + i + 'kg')
        }
        api.showPicker(params).then((r) => {
          if (r.status - 0 === 200) {
            self.selectingWeight = true
            this.onSelectPicker()
          }
        })
      },
      /**
       * 选择性别函数
       * @param  {[type]} sex [description]
       * @return {[type]}     [description]
       */
      selectSex (sex) {
        this.personalInfomation.sex = sex
        if (this.personalInfomation.headerImg) {
          this.personalInfomation.headerImg = sex === 'male' ? 'static/male.png' : 'static/female.png'
        }
      }
    }
  }
</script>

<style lang="stylus">

  ::-webkit-input-placeholder
    color rgba(0,0,0,0.25)
  .personalInfo-index
    .personalInfo-box
      width 100%
      position relative
      .header-img-box
        width 6rem
        height 6rem
        line-height 6rem
        text-align center
        overflow hidden
        margin 1rem auto
        border 0.3rem solid #83ddde
        border-radius 10rem
        box-shadow 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.2)
        background center /101%
        position relative
      .header-img-box.male
        background-image url('../../assets/images/icons/male.png')
      .header-img-box.female
        background-image url('../../assets/images/icons/female.png')

      .sex-box
        width 100%
        height 2.6rem
        line-height 2.6rem
        box-sizing border-box
        padding-left 2rem
        margin 0.5rem 0
        .text
          font-size 0.9rem
          float left
        .button-box
          float left
          width 2.2rem
          height 2.2rem
          background-image url('../../assets/images/icons/sex.png')
          background-size 258% 200%
          margin-left 1rem
        .male
          background-position top left
        .female
          background-position top right
        .selected
          background-position-y bottom
      .other-information-box
        width 100%
        padding-left 2rem
        box-sizing border-box
        .other-information
          width 100%
          position relative
          height 2rem
          line-height 2rem
          border-top 1px solid rgba(255,255,255,0.8)
          box-sizing border-box
          padding-left 0.2rem
          font-size 0.75rem
          i.icon
            display block
            position absolute
            left -1.8rem
            width 1.8rem
            height 1.6rem
            padding-top 0.3rem
            background-size 100% 360%
            background-image url('../../assets/images/icons/information-icon.png')
          i.icon.name-icon
            background-position center 0
          i.icon.birthday-icon
            background-position center 31%
          i.icon.height-icon
            background-position center 64%
          i.icon.weight-icon
            background-position center 100%
          i.more
            display block
            width 1rem
            height 1rem
            position absolute
            right 1rem
            top 50%
            transform translate3d(0,-50%,0)
          .name-input
            background none
            border 0
          .birthday-input
            position absolute
            top 0
            left 0
            height 90%
            width 100%
            opacity 0
          &:last-child
            border-bottom 1px solid rgba(255,255,255,0.8)
      /*.fat-scale
        background-image url('../../assets/images/devices/fat-scale.png')*/
</style>
