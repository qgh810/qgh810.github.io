import apiCore from './helpers/api-core'
import * as tables from './consts/tables'

export default {
  /** ------------------------------------------------
   * 系统部分
   */
  /**
   * 获取系统信息 包括蓝牙信息
   * @return {[type]} [description]
   */
  getSystemInfo () {
    return apiCore.getSystemInfo()
  },

  /**
   * 显示图像选择器
   * @return {[type]} [description]
   */
  showPhotoPicker (params) {
    return apiCore.showPhotoPicker(params)
  },

  showPicker (params) {
    return apiCore.showPicker(params)
  },

  /** ------------------------------------------------
   * 设备部分
   */
  /**
   * 扫描蓝牙设备
   * @return {[type]} [description]
   */
  scanDevice () {
    return apiCore.scanDevice()
  },
  /**
   * 停止扫描设备
   * @return {[type]} [description]
   */
  stopScanDevice () {
    return apiCore.stopScanDevice()
  },
  /**
   * 添加脂肪秤
   * @param {[type]} plan [description]
   */
  addDeviceFatScale (device) {
    return apiCore.insertData(tables['BOUND_DEVICES_FAT'], device)
  },
  /**
   * 添加bmi
   * @param {[type]} plan [description]
   */
  addDeviceBMI (device) {
    return apiCore.insertData(tables['BOUND_DEVICES_BMI'], device)
  },
  /**
   * 获取脂肪秤列表
   * @param  {[type]} param [description]
   * @return {[type]}       [description]
   */
  getDeviceFatScaleList (param) {
    return apiCore.queryData(tables['BOUND_DEVICES_FAT'], param)
  },
  /**
   * 获取BMI秤列表
   * @param  {[type]} param [description]
   * @return {[type]}       [description]
   */
  getDeviceBMIList (param) {
    return apiCore.queryData(tables['BOUND_DEVICES_BMI'], param)
  },
  /**
   * 删除脂肪秤
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  deleteFatScale (param) {
    return apiCore.removeData(tables['BOUND_DEVICES_FAT'], param)
  },
  /**
   * 删除bmi秤
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  deleteBMI (param) {
    return apiCore.removeData(tables['BOUND_DEVICES_BMI'], param)
  },
  /**
   * 编辑脂肪秤
   * @param  {[type]} params [description]
   * @param  {[type]} query  [description]
   * @return {[type]}        [description]
   */
  editFatScale (param, query) {
    return apiCore.updateData(tables['BOUND_DEVICES_FAT'], param, query)
  },
  /**
   * 编辑bmi秤
   * @param  {[type]} params [description]
   * @param  {[type]} query  [description]
   * @return {[type]}        [description]
   */
  editBMI (param, query) {
    return apiCore.updateData(tables['BOUND_DEVICES_BMI'], param, query)
  },

  /**
   * 假连接蓝牙设备
   * @return {[type]} [description]
   */
  connectDevice (device) {
    return apiCore.connectDevice(device)
  },
  /**
   * 连接微信蓝牙设备 需要连接设备
   * @return {[type]} [description]
   */
  connectWXDevice (device) {
    return apiCore.connectDevice(device, true)
  },

  /**
   * 断开已连接的设备
   * @return {[type]} [description]
   */
  disconnectDevice (device) {
    return apiCore.disconnectDevice(device)
  },

  /**
   * 向设备发送数据
   * @param  {object} device 包含设备deviceid的对象
   * @param  {array} data   要发送给设备的数据
   * @return {[type]}        [description]
   */
  sendXDeviceData (device, data) {
    return apiCore.sendXDeviceData(device, data)
  },
  /** -------------------------------------------------
   * 记录部分
   */
  /**
   * 添加记录
   * @param  {object} record 记录内容
   * @return {[type]}      [description]
   */
  addRecord (record) {
    return apiCore.insertData(tables['RECORDS'], record)
  },
  /**
   * 获取记录列表
   * @param  {[type]} param [description]
   * @return {[type]}       [description]
   */
  getRecordList (param) {
    return apiCore.queryData(tables['RECORDS'], param)
  },
  /**
   * 删除记录
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  deleteRecord (param) {
    return apiCore.removeData(tables['RECORDS'], param)
  },
  /**
   * 编辑记录
   * @param  {[type]} params [description]
   * @param  {[type]} query  [description]
   * @return {[type]}        [description]
   */
  editRecord (param, query) {
    return apiCore.updateData(tables['RECORDS'], param, query)
  },

  /**
   * 图表分析用的查询记录
   * @param  {[type]} condition [description]
   * @return {[type]}           [description]
   */
  queryRecords (condition) {
    return apiCore.queryData(tables['RECORDS'], condition)
  },

  /** -------------------------------------------------
   * 计划部分
   */
  /**
   * 添加计划
   * @param  {object} plan 计划内容
   * @return {[type]}      [description]
   */
  addPlan (plan) {
    return apiCore.insertData(tables['PLANS'], plan)
  },
  /**
   * 获取计划列表
   * @param  {[type]} param [description]
   * @return {[type]}       [description]
   */
  getPlanList (param) {
    return apiCore.queryData(tables['PLANS'], param)
  },
  /**
   * 删除计划
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  deletePlan (param) {
    return apiCore.removeData(tables['PLANS'], param)
  },
  /**
   * 编辑计划
   * @param  {[type]} params [description]
   * @param  {[type]} query  [description]
   * @return {[type]}        [description]
   */
  editPlan (param, query) {
    return apiCore.updateData(tables['PLANS'], param, query)
  },

  /** -----------------------------------------------
   * 用户部分
   */
  /**
   * 用户
   */
  /**
  * 获取单个用户信息
  * @return {[type]} [description]
  */
  getUserInfo () {
    return apiCore.getData(tables['USERS_INFOMATION'], 'users')
  },
  /**
   * 保存单个用户信息
   */
  setUserInfo (userInfo) {
    return apiCore.putData(tables['USERS_INFOMATION'], 'users', userInfo)
  },
  /**
   * 添加用户
   * @param  {object} plan 用户内容
   * @return {[type]}      [description]
   */
  addUser (user) {
    return apiCore.insertData(tables['USERS'], user)
  },
  /**
   * 获取用户列表
   * @param  {[type]} param [description]
   * @return {[type]}       [description]
   */
  getUserList (param) {
    return apiCore.queryData(tables['USERS'], param)
  },
  /**
   * 删除用户
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  deleteUser (param) {
    return apiCore.removeData(tables['USERS'], param)
  },
  /**
   * 编辑用户
   * @param  {[type]} params [description]
   * @param  {[type]} query  [description]
   * @return {[type]}        [description]
   */
  editUser (param, query) {
    return apiCore.updateData(tables['USERS'], param, query)
  }

}
