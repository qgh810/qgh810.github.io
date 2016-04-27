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
    (arr.slice(2, 6).join('').toLowerCase() === 'b400b101') && (arr.slice(10, 12).join('').toLowerCase() === 'ffff')
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
export const isFatScale = (frame, serviceUUIDs) => {
  var arr = decodeBase64(frame)
  var result = false
  var serviceUUID = serviceUUIDs.join && serviceUUIDs.join('').replace(/\W/g, '') // 服务id
  // debug 条件目前是不正确的  等待解决
  // 满足一下条件其中一个即可认为該秤是脂肪秤
  var conditionArr = [
    // ios条件
    (arr.slice(0, 4).join('').toLowerCase() === 'b400b101') && (arr.slice(8, 10).join('').toLowerCase() === '01f4'),
    // /fee7ffb0/i.test(serviceUUID),
    /fee7/i.test(serviceUUID),
    // 安卓条件
    (arr.slice(2, 6).join('').toLowerCase() === 'b400b101') && (arr.slice(10, 12).join('').toLowerCase() === '01f4'),
    arr.slice(5, 7).join('').toLowerCase() === 'e7fe'
    // 公共条件
  ]
  conditionArr.map((condition) => {
    if (condition) {
      result = true
    }
  })
  return result
}

export const isWXFatScale = (frame, serviceUUIDs) => {
  var arr = decodeBase64(frame)
  var result = false
  var serviceUUID = serviceUUIDs.join && serviceUUIDs.join('').replace(/\W/g, '') // 服务id
  // debug 条件目前是不正确的  等待解决
  // 满足一下条件其中一个即可认为該秤是脂肪秤
  var conditionArr = [
    // ios条件
    /fee7/i.test(serviceUUID),
    // 安卓条件
    arr.slice(5, 7).join('').toLowerCase() === 'e7fe'
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
