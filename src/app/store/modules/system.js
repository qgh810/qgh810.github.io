import {
  RECEIVE_MESSAGE,
  REMOVE_MESSAGE,
  HIDE_ALERT
} from '../mutation-types'

// 状态初始化
var state = {
  message: '', // 系统信息
  showAlert: false
}

// 状态变化
const mutations = {
  [RECEIVE_MESSAGE] (state, msg) {
    state.message = msg
    state.showAlert = true
  },

  [REMOVE_MESSAGE] (state) {
    state.message = ''
  },

  [HIDE_ALERT] (state) {
    state.showAlert = false
  }
}

export default {
  state,
  mutations
}
