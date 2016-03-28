/**
 * 英文翻译文件
 * @return {Object}
 */
export default {
  common: {
    add: 'Add', // 新增
    save: 'Save', // 保存
    confirm: 'Confirm', // 确定
    skip: 'Skip', // 跳过
    cancel: 'Cancel', // 取消
    del: 'Delete', // 删除
    tips: 'Reminder', // 提示
    today: 'Today', // 今天
    yesterday: 'Yesterday', // 昨天
    total: 'Total', // 累计
    next: 'Next', // 下一步
    ok: 'OK' // 好
  },

  // 用户信息
  user_message: {
    name: 'Name', // 名称
    sex: 'Gender', // 性别
    no_users: '未选择用户', // 未选择用户
    hasnot_users: '未选择用户' // 未选择用户
  },

  // 标题
  title: {
    my_message: 'My information', // 我的信息
    device: 'Device', // 设备
    device_list: 'Device list', // 设备列表
    analysis: 'Analysis', // 分析
    plan: 'Plan', // 计划
    setting: 'Setting', // 设置
    user: 'User', // 用户
    add_user: 'Add user', // 新增用户
    edit_user: 'Edit user', // 编辑用户
    add_device: 'Add device', // 添加设备
    history: 'History record', // 历史记录
    chart: 'Chart Analysis', // 图表分析
    data_analysis: 'Data analysis', // 数据分析
    date: 'Date', // 日期
    add_plan: '添加计划', // 添加计划
    edit_plan: '编辑计划', // 编辑计划
    setting_unit: '单位设置' // 单位设置
  },

  // 输入框提示
  placeholders: {
    user_name_length: '1-16 charaters', // 用户名 1～16个字符
    plan_name_length: '1-16 charaters', // 1～16个字符
    select_device: 'select device' // 请选择设备
  },

  messages: {
    setting_success: '设置成功', // 设置成功
    save_success: 'save successed', // 保存成功
    add_success: '添加成功', // 添加成功
    over_weight: '重量超重', // 重量超重
    low_power: '电池电量低', // 电池电量低
    user_name_length: '用户名必须是2～6个字符', // 用户名必须是2～6个字符
    open_Bluetooth: 'Turn on the bluetooth and allow“YiLai Scale” to be connected with the device ', // 打开蓝牙来允许“YiLai Scales”连接到配件
    range_target_weight: '距离您的目标体重还需', // 距离您的目标体重还需
    plan_name_length: '名称必须是2～8个字符', // 名称必须是2～8个字符
    target_weight: '目标体重必须是大于0的数字', // 目标体重必须是大于0的数字
    end_date: '结束日期必须大于开始日期', // 结束日期必须大于开始日期
    add_plan: 'You have no plan presently, add one now!', // 您还没有计划,赶紧新增一个计划吧！
    del_plan: 'Are you sure to delete plan?', // 确定要删除这个计划吗？
    del_user: '确定要删除', // 确定要删除
    del_device: '确定要删除该设备吗？' // 确定要删除该设备吗？
  },

  // 更多体重信息
  more_weight_messages: {
    fat: 'Fat', // 脂肪
    moisture: 'Water', // 水分
    bone: 'Bone', // 骨骼
    muscle: 'Muscle', // 肌肉
    kcal: 'Calorie', // 卡路里
    basalMetabolic: '基础代谢', // 基础代谢
    internalage: '体内年龄', // 体内年龄
    organs: '内脏脂肪', // 内脏脂肪
    target_weight: 'Goal', // 目标
    weight: 'Zielgewicht', // 体重
    year: '岁' // 岁 （单位）
  },

  // 星期
  weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // ['日', '一', '二', '三', '四', '五', '六']

  device: {
    bmi_scale: 'BMI scale', // bmi秤
    fat_scale: 'Body fat scale', // 脂肪秤
    bind: 'Binding', // 绑定
    bound: 'bindinged', // 已绑定
    rename: 'rename', // 重命名
    unbind: 'Unbound', // 解绑
    no_devices: '暂无设备', // 暂无设备
    rename_modal: {
      title: 'rename' // 重命名
    }
  },

  record: {
    title: {
      list: 'History record', // 历史记录
      sum: 'Total', // 累计
      total_nutri: '总营养', // 总营养
      nutri_list: '营养列表' // 营养列表
    },
    fields: {
      name: 'Name' // 名称
    },
    date: 'Date', // 日期
    no_data: 'no data', // 暂无数据
    weight: 'Weight' // 体重
  },

  // 曲线分析
  chart: {
    week: 'Week', // 周
    month: 'Month', // 月
    year: 'Year' // 年
  },

  plan: {
    unit_day: 'Day', // 天
    target: 'Goal', // 目标
    name: 'Name', // 名称
    start_date: 'Start date', // 开始日期
    end_date: 'End date', // 结束日期
    remind: 'Sport reminder', // 运动提醒
    start_time: 'Start time', // 开始时间
    end_time: 'End time', // 结束时间
    target_weight: 'Target weight' // 目标体重
  },

  setting: {
    user: 'User', // 用户
    device: 'Device', // 设备
    unit: 'Unit', // 单位
    weight_unit: 'Weight unit', // 体重单位
    height_unit: 'Height unit' // 身高单位
  },
  welcome: {
    p1: ' Hi,as a new comer/new friend/nice to meet you,please give a brief self-introduction.', // Hi～ 初次见面，请简单介绍下自己
    p2: 'Select one kind of scale to add' // 选择一款秤来添加吧
  },

  other: {
    rest_time: 'Remain', // 剩余
    day: 'Day', // 天
    add: 'Add', // 增加
    reduce: 'Reduzieren' // 减少
  }
}
