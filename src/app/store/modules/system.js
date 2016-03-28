import {
  RECEIVE_MESSAGE,
  REMOVE_MESSAGE
} from '../mutation-types'

// 状态初始化
var state = {
  message: '', // 系统信息
  after: null
}

// 状态变化
const mutations = {

  [RECEIVE_MESSAGE] (state, msg, fn) {
    state.message = msg
    if (fn) {
      state.after = fn
    } else {
      state.after = null
    }
  },

  [REMOVE_MESSAGE] (state) {
    state.message = ''
    state.after && state.after()
  }
}

export default {
  state,
  mutations
}
