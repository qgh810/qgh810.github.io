<template>
  <div class="setting-device-list">
    <header-nav
    :title="$t('title.device')"
    :rightstyle="'add'"
    :showright="true"
    @right-click="addDevice">
    </header-nav>
    <div class="device-list-box iosScrollBug" v-heightauto>
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
        <span>{{$t('device.no_devices')}}</span>
      </div>
    </div>
    <modal class="delete-modal" :show.sync="showDeleteModal">
      <div slot="body">
        <div class=modal-body-text-box>
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
          <div class="btn delete-button" @touchend="renameDevice">{{$t('common.confirm')}}</div>
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
          // {
          //   name: 'fat2',
          //   deviceid: 'ashdlkahlkfjsdbg234h23kj4',
          //   deviceType: 'fat'
          // },
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
            api.getDeviceBMIList().then((r2) => {
              if (r2.status - 0 === 200) {
                bmiScaleList = r2.data.list
                bmiScaleList.map((itemBMI) => {
                  itemBMI.deviceType = 'bmi'
                })
                self.devices = fatScaleList.concat(bmiScaleList)
              }
            })
          }
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
            }
          })
        } else if (self.toDeleteDevice.deviceType === 'fat') {
          api.deleteFatScale(params).then((r) => {
            if (r.status - 0 === 200) {
              self.showDeleteModal = false
              self.devices.$remove(self.toDeleteDevice)
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
          api.editFatScale(params).then((r) => {
            if (r.status - 0 === 200) {
              success(self)
            }
          })
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
  .setting-device-list
    .device-list-box
      width 100%
      margin-top 0.6rem
      overflow-y auto
      overflow-x hidden
      .device-ul
        min-height 10px
        padding-left 0.6rem
        border-top 1px solid rgba(255,255,255,0.5)
        padding-bottom 4rem
        .device-li
          height 3rem
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
              width 1.8rem
              height 1.8rem
            .device-text
              position absolute
              left 2.8rem
              top 0
              height 100%
              width 10rem

              .device-name
                width 80%
                height 1.5rem
                line-height 2rem
                overflow hidden
                font-size 0.8rem
                text-overflow ellipsis
              .device-code
                width 100%
                height 1.5rem
                padding-top 0.1rem
                line-height 0.8rem
                word-break break-all
                font-size 0.7rem
                opacity 0.8
                color #ccffff
                overflow hidden
                white-space nowrap
                text-overflow ellipsis
            .device-button-box
              position absolute
              left 100%
              height 100%
              width 7rem
              .device-button
                padding 0 0.8rem
                height 100%
                line-height 3rem
                float left
                text-align center
                font-size 0.72rem
                white-space nowrap
                box-sizing border-box
              .device-rename
                width 4rem
                background #0090ff
              .device-delete
                width 3rem
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
        padding 5rem 2rem
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
          .rename-box
            width 90%
            margin 0 auto
            padding 0.2rem
            position relative
            .rename-input
              width 100%
              height 1.6rem
              border 1px solid #c9c9c9
              box-sizing border-box
              padding 0 1rem
              border-radius 1rem
            .clear-text
              width 2rem
              height 2rem
              background no-repeat url('../../../shared/assets/images/icons/icon_delete_gray.png') center /50%
              position absolute
              right 0.2rem
              top 50%
              transform translate3d(0,-50%,0)
      .modal-footer
        .btn.cancel-button
          color #999
          font-size 0.8rem
        .btn.delete-button
          color #fd3830
          font-size 0.8rem

</style>
