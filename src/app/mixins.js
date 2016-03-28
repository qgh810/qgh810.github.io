import decodeBase64 from './helpers/decodeBase64'

/**
 * 通过广播包数据帧判断是否bmi秤
 * @param  {[type]} frame [description]
 * @return {[type]}       [description]
 */
export const isBMI = (frame) => {
  var arr = decodeBase64(frame)
  var result = false
  // debug 条件目前是不正确的  等待解决
  // 满足一下条件其中一个即可认为該秤是bmi秤
  var conditionArr = [
    // ios判断0到4位
    // arr.slice(0, 4).join('').toLowerCase() === 'b400b018',
    (arr.slice(0, 4).join('').toLowerCase() === 'b400b101') && (arr.slice(8, 10).join('').toLowerCase() === 'ffff'),

    // 安卓判断2到6位
    arr.slice(2, 6).join('').toLowerCase() === 'b400b018'
  ]

  conditionArr.map((condition) => {
    if (condition) {
      result = true
    }
  })
  return result
}
/**
 * 通过广播包数据帧判断是否脂肪秤
 * @param  {[type]} frame [description]
 * @return {[type]}       [description]
 */
export const isFatScale = (frame, name) => {
  var arr = decodeBase64(frame)
  var result = false

  // debug 条件目前是不正确的  等待解决
  // 满足一下条件其中一个即可认为該秤是脂肪秤
  var conditionArr = [
    // ios条件
    (arr.slice(0, 4).join('').toLowerCase() === 'b400b101') && (arr.slice(8, 10).join('').toLowerCase() === '01f4'),
    // 安卓条件
    arr.slice(2, 6).join('').toLowerCase() === 'b400b101',
    // 公共条件
    /weixin/i.test(name) // 判断是否含有weixin字眼 有的话说明是微信脂肪秤
  ]
  conditionArr.map((condition) => {
    if (condition) {
      result = true
    }
  })
  return result
}

/**
 * 判断列表中是否有元素的指定键为指定值
 * @param  {String}  deviceid 待检验设备ID
 * @return {Boolean}
 */
export const existsInList = (list, key, val) => {
  var result = false
  list.forEach((item) => {
    if (val === item[key]) {
      result = true
      return
    }
  })
  return result
}
