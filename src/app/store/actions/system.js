import * as types from '../mutation-types'

// 弹出错误提示
export const showMessage = ({ dispatch }, messages, fn) => {
  dispatch(types.RECEIVE_MESSAGE, messages, fn)
}

// 关闭错误提示
export const hideMessage = ({ dispatch }) => {
  dispatch(types.REMOVE_MESSAGE)
}
