<template>
  <div class="setting-device-list">
    <header-nav
    :title="$t('title.device')"
    :rightstyle="'add'"
    :showright="true"
    @right-click="addDevice">
    </header-nav>
    <div class="device-list-box iosScrollBug">
      <!-- <pre>{{devices | json}}</pre> -->
      <div class="device-ul" v-show="devices.length>0">
        <div class="device-li" v-for="device in devices">
          <div class="device-msg">
            <div class="device-img">
              <img :src="device.deviceType==='bmi'?'static/bmi.png':'static/fat-scale.png'" alt="" width="100%" height="100%">
            </div>
            <div class="device-text">
              <div class="device-name">
                {{device.name}}
              </div>
              <div class="device-code">
                {{device.deviceid}}
              </div>
            </div>
            <div class="device-button-box">
              <div class="device-button device-rename" @touchend="showRenameModalEvent(device)">{{$t('device.rename')}}</div>
              <div class="device-button device-delete" @touchend="showDeleteModalEvent(device)">{{$t('common.del')}}</div>
            </div>
            <div class="touch"></div>
          </div>
        </div>
      </div>
      <div class="noDevices" v-show="devices.length===0">
        <img class="noDevices-img" :src="'static/fat-scale.png'" alt="">
        <p>
          {{$t('device.no_devices')}}
        </p>
      </div>
    </div>
    <modal class="delete-modal" :show.sync="showDeleteModal">
      <div slot="header">
        <h3>{{$t('device.unbind_device')}}</h3>
      </div>
      <div slot="body">
        <div class="tips">
          {{$t('messages.del_device')}}
        </div>
      </div>
      <div slot="footer">
        <div class="actions">
          <div class="btn cancel-button" @touchend="deleteCancelButton">{{$t('common.cancel')}}</div>
          <div class="btn delete-button" @touchend="deleteDevice">{{$t('common.del')}}</div>
        </div>
      </div>
    </modal>
    <modal class="rename-modal" :show.sync="showRenameModal">
      <div slot="header">
        <h3>{{$t('device.rename')}}</h3>
      </div>
      <div slot="body">
        <div class="modal-body-text-box">
          <div class="rename-box">
            <input class="rename-input" type="text" v-model="renameModalText">
            <i class="clear-text" v-show="renameModalText.length>0" @touchend="renameModalText=''"></i>
          </div>
        </div>
      </div>
      <div slot="footer">
        <div class="actions">
          <div class="btn cancel-button" @touchend="renameCancelButton">{{$t('common.cancel')}}</div>
          <div class="btn delete-button" :class="{'disabled': !canDelete}" @touchend="renameDevice">{{$t('common.confirm')}}</div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  var Header = require('../../../shared/components/header.vue')
  var Modal = require('../../../shared/components/modal.vue')
  import api from '../../api'

  module.exports = {
    components: {
      'header-nav': Header,
      'modal': Modal
    },
    data: function () {
      return {
        showDeleteModal: false,
        showRenameModal: false,
        devices: [
          // {
          //   name: 'bmi1',
          //   deviceid: 'ashdlkahlkfjsdbg234h23kj4',
          //   deviceType: 'bmi'
          // },
          // {
          //   name: 'bmi2',
          //   deviceid: 'ashdlkahlkfjsdbg234h23kj4',
          //   deviceType: 'bmi'
          // },
          {
            name: 'fat2',
            deviceid: 'ashdlkahlkfjsdbg234h23kj4',
            deviceType: 'fat'
          },
          {
            name: 'fat2',
            deviceid: 'ashdlkahlkfjsdbg234h23kj4',
            deviceType: 'fat'
          }
        ],
        toRenameDevice: {
          name: '',
          deviceid: '',
          modalShow: false
        },
        toDeleteDevice: {
          name: 'fat2',
          deviceid: 'ashdlkahlkfjsdbg234h23kj4',
          deviceType: 'fat'
        },
        renameModalText: ''
      }
    },

    computed: {
      canDelete () {
        return Boolean(this.renameModalText.length !== 0)
      }
    },

    route: {
      data () {
        this.getDeviceList()
      }
    },

    ready () {
      var self = this
      self.listenTouch()
    },
    methods: {
      getDeviceList () {
        var self = this
        var fatScaleList = []
        var bmiScaleList = []
        api.getDeviceFatScaleList().then((r1) => {
          if (r1.status - 0 === 200) {
            fatScaleList = r1.data.list
            fatScaleList.map((itemFat) => {
              itemFat.deviceType = 'fat'
            })
          }
          api.getDeviceBMIList().then((r2) => {
            if (r2.status - 0 === 200) {
              bmiScaleList = r2.data.list
              bmiScaleList.map((itemBMI) => {
                itemBMI.deviceType = 'bmi'
              })
            }
            self.devices = fatScaleList.concat(bmiScaleList)
          })
        })
      },
      /**
       * 删除浮层上面的删除按钮
       * @return {[type]} [description]
       */
      deleteDevice () {
        var self = this
        var params = {
          query: {
            '_id': {'$in': [self.toDeleteDevice._id]}
          }
        }
        if (self.toDeleteDevice.deviceType === 'bmi') {
          api.deleteBMI(params).then((r) => {
            if (r.status - 0 === 200) {
              self.showDeleteModal = false
              self.devices.$remove(self.toDeleteDevice)
              setTimeout(() => {
                self.listenTouch()
              }, 200)
            }
          })
        } else if (self.toDeleteDevice.deviceType === 'fat') {
          api.deleteFatScale(params).then((r) => {
            if (r.status - 0 === 200) {
              self.showDeleteModal = false
              self.devices.$remove(self.toDeleteDevice)
              setTimeout(() => {
                self.listenTouch()
              }, 200)
            }
          })
        }
      },
      /**
       * 重命名浮层上面的确定按钮
       * @return {[type]} [description]
       */
      renameDevice () {
        console.log('重命名')
        var self = this
        if (self.renameModalText.length > 0) {
          var query = {
            '_id': {'$in': [self.toRenameDevice._id]}
          }
          var params = {name: self.renameModalText}
          if (self.toRenameDevice.deviceType === 'bmi') {
            api.editBMI(params, query).then((r) => {
              if (r.status - 0 === 200) {
                success(self)
              }
            })
          } else if (self.toRenameDevice.deviceType === 'fat') {
            api.editFatScale(params, query).then((r) => {
              if (r.status - 0 === 200) {
                success(self)
              }
            })
          }
        }
        function success (self) {
          self.devices[self.devices.indexOf(self.toRenameDevice)].name = self.renameModalText
          self.renameCancelButton()
        }
      },

      deleteCancelButton () {
        var self = this
        var touchDoms = document.getElementsByClassName('touch')
        self.showDeleteModal = false
        for (var i = 0; i < touchDoms.length; i++) {
          touchDoms[i].parentElement.style.webkitTransform = 'translate3d(0,0,0)'
        }
      },

      /**
       * 取消重命名
       * @return {[type]} [description]
       */
      renameCancelButton () {
        var self = this
        var renameInput = document.getElementsByClassName('rename-input')[0]
        var touchDoms = document.getElementsByClassName('touch')
        self.showRenameModal = false
        for (var i = 0; i < touchDoms.length; i++) {
          touchDoms[i].parentElement.style.webkitTransform = 'translate3d(0,0,0)'
        }
        console.log(renameInput)
        renameInput.blur()
      },
      /**
       * 显示重命名浮层
       * @param  {[type]} device [description]
       * @return {[type]}        [description]
       */
      showRenameModalEvent (device) {
        var self = this
        self.showRenameModal = true
        self.toRenameDevice = device
        self.renameModalText = device.name
        setTimeout(() => {
          var renameInput = document.getElementsByClassName('rename-input')[0]
          renameInput.focus()
        }, 1000)
      },
      /**
       * 打开删除提示浮层
       * @param  {[type]} device [description]
       * @return {[type]}        [description]
       */
      showDeleteModalEvent (device) {
        var self = this
        self.showDeleteModal = true
        self.toDeleteDevice = device
      },
      /**
       * 添加事件
       */
      addDevice () {
        this.$route.router.go('/devices/add')
      },
      /**
       * 监听手势事件
       * @return {[type]} [description]
       */
      listenTouch () {
        var touchDoms = document.getElementsByClassName('touch')
        var deviceDuttonBox = document.getElementsByClassName('device-button-box')[0]
        // touch.on(touchDoms, 'touchstart', function (ev) {
        //   ev.preventDefault()
        // })
        window.touch.on(touchDoms, 'swiperight', function (ev) {
          ev.preventDefault()
          console.log('right')
          for (var i = 0; i < touchDoms.length; i++) {
            touchDoms[i].parentElement.style.webkitTransform = 'translate3d(0,0,0)'
          }
          this.parentElement.style.webkitTransform = 'translate3d(0,0,0)'
        })
        window.touch.on(touchDoms, 'swipeleft', function (ev) {
          ev.preventDefault()
          console.log('left')
          for (var i = 0; i < touchDoms.length; i++) {
            touchDoms[i].parentElement.style.webkitTransform = 'translate3d(0,0,0)'
          }
          this.parentElement.style.webkitTransform = 'translate3d(-' + deviceDuttonBox.clientWidth + 'px,0,0)'
        })
      }
    }
  }
</script>
<style lang="stylus">
  @import '../../../shared/assets/style/common'

  .setting-device-list
    .device-list-box
      width 100%
      height 100%
      padding-bottom 2rem
      box-sizing border-box
      margin-top 0.2rem
      overflow-y auto
      overflow-x hidden
      .device-ul
        padding-left rem(30)
        border-top 1px solid rgba(255,255,255,0.5)
        overflow-x hidden
        .device-li
          height rem(140)
          box-sizing border-box
          border-bottom 1px solid rgba(255,255,255,0.5)
          .device-msg
            width 100%
            height 100%
            position relative
            transition transform 0.3s ease
            transform translate3d(0,0,0)
            .device-img
              position absolute
              left 0.2rem
              top 50%
              transform translate3d(0,-50%,0)
              size rem(80)
            .device-text
              position absolute
              left rem(130)
              top rem(20)
              width rem(300)
              .device-name
                font-dpr 18px
                text-overflow 100%
              .device-code
                font-dpr 12px
                opacity 0.8
                color #ccffff
                text-overflow 100%
            .device-button-box
              position absolute
              left 100%
              height 100%
              width rem(300)
              .device-button
                height 100%
                line-height rem(140)
                float left
                text-align center
                font-dpr 14px
                white-space nowrap
                box-sizing border-box
              .device-rename
                width rem(150)
                text-overflow rem(150)
                background #0090ff
              .device-delete
                width rem(150)
                text-overflow rem(150)
                background #fd3830
                float right
                box-shadow -1px 0 0 0 rgba(255,255,255,0.5)
            .touch
              width 100%
              height 100%
              position absolute
              left 0
              top 0
      .noDevices
        text-align center
        padding rem(200) 0
        font-dpr 15px
        .noDevices-img
          margin-top 2rem
          width 2.2rem
          height 2.2rem
          opacity 0.5
  .rename-modal
    // 重命名
    .rename-box
      width 90%
      margin 0 auto
      padding 0.2rem
      position relative
      .rename-input
        width 100%
        height rem(70)
        border 1px solid #c9c9c9
        box-sizing border-box
        padding 0 rem(30)
        border-radius rem(40)
        font-dpr 14px
      .clear-text
        width rem(70)
        height rem(70)
        background no-repeat url('../../../shared/assets/images/icons/icon_delete_gray.png') center /50%
        background-size rem(40)
        position absolute
        right rem(20)
        top 50%
        transform translate3d(0,-50%,0)
  .modal .modal-footer .actions .btn.delete-button.disabled
    color gray-light
</style>
