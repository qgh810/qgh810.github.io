// 基本配置
// ==============================

// 语言类型
export const languageTypes = {
  'zh': 'chinese', // 中文
  'en': 'english', // 英文
  'it': 'italian', // 意大利文
  'es': 'spanish', // 西班牙文
  'fr': 'french', // 法文
  'nl': 'dutch', // 荷兰文
  'de': 'german' // 德文
}

// 营养成分
export const nutri = [
  'calories', // 热量
  'fat', // 脂肪
  'protein', // 蛋白质
  'carbohydrate', // 糖
  'cholesterol', // 胆固醇
  'fiber', // 纤维素
  'sodium' // 钠
]

export const units = {
  'calories': 'kcal', // 热量
  'fat': 'g', // 脂肪
  'protein': 'g', // 蛋白质
  'carbohydrate': 'g', // 糖
  'cholesterol': 'mg', // 胆固醇
  'fiber': 'g', // 纤维素
  'sodium': 'mg' // 钠
}

export default {
  // 每次获取记录条数
  limit: 20,

  // 通知持续时间
  noticeDuration: 1000,

  // 设备默认名称
  defaultDeviceName: 'TJLSCALE'
}
