<template>
  <div class="setting-user">
    <header-nav
      :title="$t('title.user')"
      :rightstyle="'add'"
      :showright="true"
      @right-click="addUser">
    </header-nav>
    <div class="users-box iosScrollBug" v-heightauto>
      <ul v-show="userList.length">
        <li class="user-li" v-for="user in userList">
          <div class="user-box" @click.prevent.stop="editUser(user)">
            <div class="user-header-img">
              <img :src="usersImg(user)" alt="" width="100%" height="100%">
            </div>
            <div class="user-name">
              <span>{{user.name}}</span>
            </div>
            <i class="more"></i>
            <div class="delete-box" @touchstart="deleteButtonDown(user)">
              <span>{{$t('common.del')}}</span>
            </div>
            <div class="touch"></div>
          </div>
        </li>
      </ul>
      <div v-show="!userList.length" class="noUsers" v-heightauto>
        {{$t('user_message.hasnot_users')}}
      </div>
    </div>
    <modal class="delete-modal" :show.sync="showDeleteModal">
      <div slot="body">
        <div class=modal-body-text-box>
          {{$t('messages.del_user')}} {{toDeleteUser.name}}？
        </div>
      </div>
      <div slot="footer">
        <div class="actions">
          <div class="btn button1" @touchend.prevent.stop="cancel">{{$t('common.cancel')}}</div>
          <div class="btn button2" @touchend.prevent.stop="deleteUser">{{$t('common.del')}}</div>
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
      'modal': Modal,
      'header-nav': Header
    },

    data () {
      return {
        showDeleteModal: false,
        toDeleteUser: {},
        userList: [
          {
            headerImg: '',
            sex: 'female',
            name: '444',
            id: '123123123123'
          },
          {
            headerImg: '',
            sex: 'male',
            name: '123',
            id: '234234234234'
          },
          {
            headerImg: '',
            sex: 'female',
            name: '1',
            id: '5345345345'
          }
        ]
      }
    },

    route: {
      data () {
        var params = {
          'order': {'creatTime': 'desc'} // asc
        }
        this.getUserList(params)
      }
    },
    ready () {
      this.listenTouch()
    },
    methods: {
      getUserList (params) {
        var self = this
        api.getUserList(params).then(function (r) {
          if (r.status - 0 === 200) {
            var users = []
            r.data.list.map(function (item) {
              var user = {}
              user.headerImg = item.headerImg
              user.name = item.name
              user.sex = item.sex
              user.id = item._id
              users.push(user)
            })
            self.userList = [].concat(users)
          }
        })
      },
      /**
       * 删除用户
       * @return {[type]} [description]
       */
      deleteUser () {
        var self = this
        console.log(JSON.stringify(self.toDeleteUser))
        var params = {
          query: {
            '_id': {'$in': [self.toDeleteUser.id]}
          }
        }
        api.deleteUser(params).then(function (r) {
          if (r.status - 0 === 200) {
            self.showDeleteModal = false
            self.userList.$remove(self.toDeleteUser)
          }
        })
      },
      editUser (user) {
        this.$route.router.go('/setting/user/' + user.id)
      },
      /**
       * 生成用户头像
       * @param  {[type]} user [description]
       * @return {[type]}      [description]
       */
      usersImg (user) {
        // var self = this
        var result = 'static/female.png'
        if (user.headerImg.length > 0) {
          result = user.headerImg
        } else {
          if (user.sex === 'male') {
            result = 'static/male.png'
          }
        }
        return result
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
      addUser () {
        console.log('添加用户')
        this.$route.router.go('/setting/user/add')
      },
      deleteButtonDown (user) {
        this.toDeleteUser = user
        this.showDeleteModal = true
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
          if (document.getElementsByClassName('touch').length > 1) {
            this.parentElement.style.webkitTransform = 'translate3d(-3rem,0,0)'
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
  .setting-user
    .users-box
      width 100%
      background #fff
      color #000
      overflow-x hidden
      overflow-y auto
      ul
        padding-top 1rem
        li.user-li
          border-top 1px solid rgba(0,0,0,0.2)
          height 3rem
          width 100%
          .user-box
            width 100%
            height 100%
            position relative
            transition transform 0.3s ease
            transform translate3d(0,0,0)
            .user-header-img
              width 2.5rem
              height 2.5rem
              overflow hidden
              background rgba(0,0,0,0.2)
              position absolute
              top 50%
              left 0.7rem
              transform translate3d(0,-50%,0)
              border-radius 50%
            .user-name
              height 100%
              line-height 3rem
              width 8rem
              text-overflow ellipsis
              overflow hidden
              white-space nowrap
              position absolute
              top 0
              left 4rem
              font-size 0.7rem
            .more
              display block
              width 1rem
              height 1rem
              background no-repeat url('../../../shared/assets/images/icons/graymore.png') center/100%
              position absolute
              top 50%
              right 1rem
              -webkit-transform translate3d(0, -50%, 0)
              transform translate3d(0, -50%, 0)
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
              color #fff
            .touch
              width 100%
              height 100%
              position absolute
              top 0
              left 0
          .user-box.show-delete
            transform translate3d(-3rem, 0, 0)
          &:last-child
            border-bottom 1px solid rgba(0,0,0,0.2)
      .noUsers
        text-align center
        color #999
        padding 3rem
        box-sizing border-box
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
      .btn.button1
        color #999
        font-size 0.8rem
      .btn.button2
        color #fd3830
        font-size 0.8rem
</style>
