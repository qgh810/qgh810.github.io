import SDK from './sdk'
// import browser from './browser'

function apiFactory (name, params) {
  return new Promise((resolve, reject) => {
    var cb = function (obj) {
      // if (browser.versions.io) {
      //   resolve(JSON.parse(obj))
      // } else if (browser.versions.android) {
      //   resolve(obj)
      // }
      resolve(obj)
    }
    if (typeof params === 'object') {
      SDK.fire(name, params, cb)
    } else {
      SDK.fire(name, cb)
    }
  })
}
function encode (data) {
  var str = String.fromCharCode.apply(null, data) // 先转换为二进制
  return window.btoa(str).replace(/.{76}(?=.)/g, '$&\n')
}

export default {
  /**
   * 获取系统信息
   * @return {Promise}
   */
  getSystemInfo () {
    return apiFactory('getXSystemInfo')
  },

  /**
   * 显示图片选择器
   * @return {[type]} [description]
   */
  showPhotoPicker (params) {
    return apiFactory('showPhotoPicker', params)
  },

  showPicker (params) {
    return apiFactory('showPicker', params)
  },
  /**
   * 获取蓝牙状态  这个不用了
   * @return {Promise}
   */
  getBlueStatus () {
    return apiFactory('initDeviceBT')
  },

  /**
   * 扫描蓝牙设备
   * @return {Promise}
   */
  scanDevice () {
    return apiFactory('startScanXDevice')
  },

  /**
   * 停止扫描设备
   * @return {Promise}
   */
  stopScanDevice () {
    return apiFactory('stopScanXDevice')
  },

  /**
   * 连接设备
   * @param  {Object} device 待连接设备
   * @return {Promise}
   */
  connectDevice (device, needConnect) {
    return apiFactory('connectXDevice', {
      deviceid: device.deviceid,
      type: Boolean(needConnect)
    })
  },

  /**
   * 连接设备
   * @param  {Object} device 待连接设备
   * @return {Promise}
   */
  disconnectDevice (device) {
    return apiFactory('disconnectXDevice', {
      deviceid: device.deviceid
    })
  },

  /**
   * 向设备发送数据
   * @param  {object} device 包含设备deviceid的对象
   * @param  {array} data   要发送给设备的数据
   * @return {[type]}        [description]
   */
  sendXDeviceData (device, data) {
    return apiFactory('sendXDeviceData', {
      deviceid: device.deviceid,
      serviceUUID: device.serviceUUID,
      charUUID: device.charUUID,
      data: encode(data)
    })
  },
  /**
   * 获取单个数据
   * @param  {String} table 目标数据表名称
   * @param  {String} key   要获取的键，若不传则返回所有记录
   * @return {Promise}
   */
  getData (table, key) {
    return apiFactory('getXData', {
      table: table,
      key: key
    })
  },

  /**
   * 写入单个数据
   * @param  {String} table 目标数据表名称
   * @param  {String} key   要写入的键
   * @param  {Any}    data  要写入的值
   * @return {Promise}
   */
  putData (table, key, data) {
    return apiFactory('putXData', {
      table: table,
      key: key,
      data: JSON.stringify(data)
    })
  },

  /**
   * 删除数据
   * @param  {String} table 目标数据表名称
   * @param  {String} key   要删除的键
   * @return {Promise}
   */
  deleteData (table, key) {
    return apiFactory('deleteXData', {
      table: table,
      key: key
    })
  },

  /**
   * 插入数据，该数据不转成JSON格式
   * @param  {String} table   目标数据表名称
   * @param  {Object} params  参数
   * @return {Promise}
   */
  insertData (table, params) {
    return apiFactory('insertXData', {
      table: table,
      data: params
    })
  },

  /**
   * 更新数据
   * @param  {String} table   目标数据表名称
   * @param  {Object} params  参数
   * @param  {Object} query   条件(不传条件会更新整个表!!)
   * @return {Promise}
   */
  updateData (table, params, query) {
    return apiFactory('updateXData', {
      table: table,
      data: params,
      query: query
    })
  },

  /**
   * 查询数据
   * @param  {String} table 目标数据表名称
   * @param  {Object} condition 删除条件
   * @return {Promise}
   */
  queryData (table, condition) {
    if (typeof condition === 'undefined') {
      condition = {}
    }
    return apiFactory('queryXData', {
      table: table,
      offset: condition.offset || 0,
      limit: condition.limit || 0,
      filter: condition.filter || [],
      query: condition.query || {},
      group: condition.group || [],
      order: condition.order || {}
    })
  },

  /**
   * 删除数据
   * @param  {String} table 目标数据表名称
   * @param  {Object} condition 删除条件
   * @return {Promise}
   */
  removeData (table, condition) {
    if (typeof condition === 'undefined') {
      condition = {}
    }
    return apiFactory('removeXData', {
      table: table,
      query: condition.query || {}
    })
  }
}
/**
 * {
    "offset":"请求列表的偏移量",
    "limit":"请求数量",
    "filter":["字段A","字段B"],
    "query":
    {
        "filed1":{"$in":["字段值","字段值"]},
        "filed3":{"$lt":"字段值"}
    },
    "order":
    {
        "filed1":"desc",
        "filed2":"asc"
    }
  }

$in：包含于该列表任意一个值

$lt：小于该字段值

$lte：小于或等于字段值

$gt：大于该字段值

$gte：大于或等于该字段值

$eq:等于
 */
