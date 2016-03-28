/**
 * 德文翻译文件
 * @return {Object}
 */
export default {
  common: {
    add: 'Hinzufügen', // 新增
    save: 'Speichern', // 保存
    confirm: 'Bestätigung', // 确定
    skip: 'Überspringen', // 跳过
    cancel: 'Abbrechen', // 取消
    del: 'Löschen', // 删除
    tips: 'Erinnerung', // 提示
    today: 'Heute', // 今天
    yesterday: 'Gestern', // 昨天
    total: 'Total', // 累计
    next: 'Weiter', // 下一步
    ok: 'OK' // 好
  },

  // 用户信息
  user_message: {
    name: 'Name', // 名称
    sex: 'Geschlecht', // 性别
    no_users: '未选择用户', // 未选择用户
    hasnot_users: '未选择用户' // 未选择用户
  },

  // 标题
  title: {
    my_message: 'Meine Informationen', // 我的信息
    device: 'Gerät', // 设备
    device_list: 'Geräteliste', // 设备列表
    analysis: 'Analyse', // 分析
    plan: 'Plan', // 计划
    setting: 'Einstellung', // 设置
    user: 'Benutzer', // 用户
    add_user: 'Benutzer hinzufügen', // 新增用户
    edit_user: 'Ändern Benutzer', // 编辑用户
    add_device: 'Gerät hinzufügen', // 添加设备
    history: 'Bisherige Aufzeichnungen', // 历史记录
    chart: 'Chartanalyse', // 图表分析
    data_analysis: 'Datenanalyse', // 数据分析
    date: 'Datum', // 日期
    add_plan: '添加计划', // 添加计划
    edit_plan: '编辑计划', // 编辑计划
    setting_unit: '单位设置' // 单位设置
  },

  // 输入框提示
  placeholders: {
    user_name_length: '1 bis 16 Zeichen', // 用户名 1～16个字符
    plan_name_length: '1 bis 16 Zeichen', // 1～16个字符
    select_device: 'Gerät auswählen' // 请选择设备
  },

  messages: {
    setting_success: '设置成功', // 设置成功
    save_success: 'Speichern erfolgreich', // 保存成功
    add_success: '添加成功', // 添加成功
    over_weight: '重量超重', // 重量超重
    low_power: '电池电量低', // 电池电量低
    user_name_length: '用户名必须是2～6个字符', // 用户名必须是2～6个字符
    open_Bluetooth: 'Aktivieren Sie Bluetooth und erlauben Sie "YiLai Scale", sich mit Ihrem Mobilgerät zu verbinden', // 打开蓝牙来允许“YiLai Scales”连接到配件
    range_target_weight: '距离您的目标体重还需', // 距离您的目标体重还需
    plan_name_length: '名称必须是2～8个字符', // 名称必须是2～8个字符
    target_weight: '目标体重必须是大于0的数字', // 目标体重必须是大于0的数字
    end_date: '结束日期必须大于开始日期', // 结束日期必须大于开始日期
    add_plan: 'Sie haben derzeit keinen Plan, fügen Sie nun einen hinzu!', // 您还没有计划,赶紧新增一个计划吧！
    del_plan: 'Sind Sie sicher, dass Sie Plan löschen möchten?', // 确定要删除这个计划吗？
    del_user: '确定要删除', // 确定要删除
    del_device: '确定要删除该设备吗？' // 确定要删除该设备吗？
  },

  // 更多体重信息
  more_weight_messages: {
    fat: 'Fett', // 脂肪
    moisture: 'Wasser', // 水分
    bone: 'Knochen', // 骨骼
    muscle: 'Muskel', // 肌肉
    kcal: 'Kalorie', // 卡路里
    basalMetabolic: '基础代谢', // 基础代谢
    internalage: '体内年龄', // 体内年龄
    organs: '内脏脂肪', // 内脏脂肪
    target_weight: 'Ziel', // 目标
    weight: 'weight', // 体重
    year: '岁' // 岁 （单位）
  },

  // 星期
  weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // ['日', '一', '二', '三', '四', '五', '六']

  device: {
    bmi_scale: 'BMI-Waage', // bmi秤
    fat_scale: 'Körperanalysewaage', // 脂肪秤
    bind: 'Verbunden', // 绑定
    bound: 'Verbinden', // 已绑定
    rename: 'Umbenennen', // 重命名
    unbind: 'Nicht verbunden', // 解绑
    no_devices: '暂无设备', // 暂无设备
    rename_modal: {
      title: 'Umbenennen' // 重命名
    }
  },

  record: {
    title: {
      list: 'Bisherige Aufzeichnungen', // 历史记录
      sum: 'Total', // 累计
      total_nutri: '总营养', // 总营养
      nutri_list: '营养列表' // 营养列表
    },
    fields: {
      name: 'Name' // 名称
    },
    date: 'Datum', // 日期
    no_data: 'Keine Daten', // 暂无数据
    weight: 'Gewicht' // 体重
  },

  // 曲线分析
  chart: {
    week: 'Woche', // 周
    month: 'Monat', // 月
    year: 'Jahr' // 年
  },

  plan: {
    unit_day: 'Tag', // 天
    target: 'Ziel', // 目标
    name: 'Name', // 名称
    start_date: 'Start Datum', // 开始日期
    end_date: 'End Datum', // 结束日期
    remind: 'Sport Erinnerung', // 运动提醒
    start_time: 'Startzeit', // 开始时间
    end_time: 'Endzeit', // 结束时间
    target_weight: 'Zielgewicht' // 目标体重
  },

  setting: {
    user: 'Benutzer', // 用户
    device: 'Gerät', // 设备
    unit: 'Einheit', // 单位
    weight_unit: 'Gewichtseinheit', // 体重单位
    height_unit: 'Größeneinheit' // 身高单位
  },
  welcome: {
    p1: 'Hallo. Herzlich willkommen als Neuling. Bitte stellen Sie sich kurz vor.', // Hi～ 初次见面，请简单介绍下自己
    p2: 'Wählen Sie den Typ der hinzuzufügenden Waage aus' // 选择一款秤来添加吧
  },

  other: {
    rest_time: 'Verbleibend', // 剩余
    day: 'Tag', // 天
    add: 'Hinzufügen', // 增加
    reduce: 'Reduce' // 减少
  }
}
