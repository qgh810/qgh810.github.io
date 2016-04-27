<template>
  <div class="setting-add-user">
    <header-nav
      :title="$t('title.add_user')"
      :righttext="$t('common.save')"
      @right-click="saveInfo">
    </header-nav>
    <div class="info-box">
      <div class="header-img-box" :class="user.sex" @touchstart="selectHeaderImg">
        <img v-show="user.headerImg" :src="user.headerImg" alt="" width="100%" height="100%" class="header-img">
      </div>
      <div class="sex-box">
        <span class="text">{{$t('user_message.sex')}}</span>
        <div class="button-box male" :class="{'selected':user.sex==='male'}" @touchstart="selectSex('male')"></div>
        <div class="button-box female" :class="{'selected':user.sex==='female'}" @touchstart="selectSex('female')"></div>
      </div>
      <div class="other-information-box">
        <div class="other-information name-box">
          <i class="icon name-icon"></i>
          <input class="name-input" type="text" name="name" v-model="user.name"  :placeholder="$t('placeholders.user_name_length')">
        </div>
        <div class="other-information birthday-box" @touchend="showBirthdayPicker">
          <i class="icon birthday-icon"></i>
          <span class="birthday-text">
            {{birthday.year}} - {{birthday.month}}
          </span>
          <i class="more"></i>
          <!-- <input class="birthday-input" type="date" name="birthday" v-model="user.birthday"> -->
        </div>
        <div class="other-information height-box" @touchend="showHeightPicker">
          <i class="icon height-icon"></i>
          <span class="height-text">{{user.height}}</span>
          <span class="unit">cm</span>
          <i class="more"></i>
        </div>
        <div class="other-information weight-box" @touchend="showWeightPicker">
          <i class="icon weight-icon"></i>
          <span class="weight-text">{{user.weight}}</span>
          <span class="unit">kg</span>
          <i class="more"></i>
        </div>
      </div>
    </div>
    <!-- <div class="save-button-box">
      <button class="save-button" type="button" @touchend="saveInfo">{{$t('common.save')}}</button>
    </div> -->
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
        selectingBirthday: false,
        user: {
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
        var birthdayStr = self.user.birthday
        var result = {}
        result.year = new Date(birthdayStr).getFullYear()
        result.month = new Date(birthdayStr).getMonth() + 1
        return result
      }
    },
    route: {
      data () {
        this.initUserInfomation()
      }
    },
    ready () {
    },
    methods: {
      /**
       * 初始化用户信息
       * @return {[type]} [description]
       */
      initUserInfomation () {
        if (this.user.sex === 'male' && this.user.birthday === '1990-10-01') {
          this.user.height = 178
          this.user.weight = 80
        } else if (this.user.sex === 'female' && this.user.birthday === '1990-10-01') {
          this.user.height = 168
          this.user.weight = 50
        }
      },
      /**
       * 保存个人信息
       * ！！！！！！！！！！保存成功后记得将window.localStorage.firstEntry = true
       * @return {[type]} [description]
       */
      saveInfo () {
        var self = this
        self.user.name = self.user.name.trim()
        if (self.user.name.length < 1 || self.user.name.length > 16) {
          this.showMessage(self.$t('messages.user_name_length'))
        } else {
          self.user.creatTime = new Date().getTime()
          self.user.selected = 0
          if (!self.user.headerImg) {
            self.user.headerImg = self.user.sex === 'male' ? 'static/male.png' : 'static/female.png'
          }
          api.addUser(self.user).then(function (r) {
            if (r.status - 0 === 200) {
              self.showMessage(self.$t('messages.add_success'))
              self.$route.router.replace('/setting/user')
            }
          })
        }
      },

      /**
       * 图片选择的回调事件
       * @return {[type]} [description]
       */
      onPhotoPickerResult () {
        var self = this
        SDK.on('onPhotoPickerResult', (r) => {
          var imgPath
          if (/android/i.test(r.path)) {
            imgPath = r.path
          } else {
            imgPath = r.path.split('html/')[1]
          }
          self.user.headerImg = imgPath
        })
      },
      /**
       * 监听身高和体重选择器
       * @return {[type]} [description]
       */
      onSelectPicker () {
        var self = this
        if (this.selectingHeight) {
          this.selectingHeight = false
          SDK.on('onPickerResult', (r) => {
            var height = r.selectedData.join('').replace(/[^\d.]/g, '') - 0
            self.user.height = Math.round(height * 10) / 10
          })
        }
        if (this.selectingWeight) {
          this.selectingWeight = false
          SDK.on('onPickerResult', (r) => {
            var weight = r.selectedData.join('').replace(/[^\d.]/g, '') - 0
            self.user.weight = Math.round(weight * 10) / 10
          })
        }
        if (this.selectingBirthday) {
          this.selectingBirthday = false
          SDK.on('onPickerResult', (r) => {
            var year = r.selectedData[0].replace(/[^\d]/g, '')
            var month = r.selectedData[1].replace(/[^\d]/g, '')
            month = month - 0 > 9 ? month : '0' + month
            self.user.birthday = year + '-' + month + '-01'
            // var birthday = r.selectedData.join('').replace(/[^\d.]/g, '') - 0
            // self.user.birthday = Math.round(weight * 10) / 10
          })
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
       * 显示日期选择器
       * @return {[type]} [description]
       */
      showBirthdayPicker () {
        var self = this
        var params = {}
        params.title = '生日'
        params.datasource = [[], []]
        params.selectRow = [new Date(self.user.birthday).getFullYear() - 1900, new Date(self.user.birthday).getMonth()]
        for (let i = 1900; i <= 2100; i++) {
          params.datasource[0].push(i + '')
        }
        for (let i = 1; i <= 12; i++) {
          params.datasource[1].push(i + '')
        }
        // alert(JSON.stringify(params))
        api.showPicker(params).then((r) => {
          if (r.status - 0 === 200) {
            self.selectingBirthday = true
            this.onSelectPicker()
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
        params.selectRow = [parseInt(self.user.height) - 50, Math.round((self.user.height - parseInt(self.user.height)) * 10)]
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
        params.selectRow = [parseInt(this.user.weight) - 5, Math.round((this.user.weight - parseInt(this.user.weight)) * 10)]
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
        this.user.sex = sex
        if (!/user/.test(this.user.headerImg)) {
          this.user.headerImg = sex === 'male' ? 'static/male.png' : 'static/female.png'
        }
        this.initUserInfomation()
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../../shared/assets/style/common'

  .setting-add-user
  .setting-edit-user
    .info-box
      width 100%
      height 100%
      box-sizing border-box
      position relative
      .header-img-box
        size rem(260)
        text-align center
        overflow hidden
        margin rem(40) auto .5rem
        border rem(15) solid #83ddde
        border-radius 10rem
        /*box-shadow 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.2)*/
        background-position center center
        background-size rem(260)
        position relative
      .header-img-box.male
        background-image url('../../assets/images/icons/male.png')
      .header-img-box.female
        background-image url('../../assets/images/icons/female.png')

      .sex-box
        width 100%
        height rem(84)
        line-height rem(84)
        box-sizing border-box
        padding-left rem(110)
        margin rem(20) 0 rem(40)
        .text
          font-dpr 18px
          float left
        .button-box
          float left
          size rem(84)
          background-image url('../../assets/images/icons/sex.png')
          background-size rem(168) rem(168)
          margin-left rem(45)
        .male
          &.selected
            background-position 0 rem(-84)
        .female
          background-position rem(-84) 0
          &.selected
            background-position rem(-84) rem(-84)
      .other-information-box
        width 100%
        padding-left rem(110)
        box-sizing border-box
        .other-information
          width 100%
          position relative
          height rem(80)
          line-height rem(80)
          border-top 1px solid rgba(255,255,255,0.8)
          box-sizing border-box
          padding-left rem(30)
          font-dpr 16px
          i.icon
            absolute left rem(-80) top rem(8)
            size rem(64)
            background-size rem(64) rem(256)
            background-image url('../../assets/images/icons/information-icon.png')
            background-repeat no-repeat
          i.icon.name-icon
            background-position 0 0
          i.icon.birthday-icon
            background-position 0 rem(-64)
          i.icon.height-icon
            background-position 0 rem(-128)
          i.icon.weight-icon
            background-position 0 rem(-192)
          i.more
            display block
            size rem(50)
            absolute right rem(30) top 50%
            transform translate3d(0,-50%,0)
            back-ground-size rem(50)
          .name-input
            width 100%
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
      .name-box
        padding-right 1rem
      /*.fat-scale
        background-image url('../../assets/images/devices/fat-scale.png')*/
  .canvas-box
    position absolute
    left -999rem

</style>
