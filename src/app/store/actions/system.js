import * as types from '../mutation-types'

// 弹出非中断式提示
export const showMessage = ({ dispatch }, msg) => {
  dispatch(types.RECEIVE_MESSAGE, msg)
  window.setTimeout(() => {
    dispatch(types.HIDE_ALERT)
  }, 2000)
}

// 移除通知信息
export const hideMessage = ({ dispatch }) => {
  dispatch(types.REMOVE_MESSAGE)
}
