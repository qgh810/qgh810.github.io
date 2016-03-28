// 去除换行
function ClearBr (key) {
  key = key.replace(/<\/?.+?>/g, '')
  key = key.replace(/[\r\n]/g, '')
  key = key.replace(/[\n]/g, '')
  return key
}

export default function (strIn) {
  strIn = ClearBr(strIn)
  if (!strIn.length || strIn.length % 4) {
    return null
  }
  if (!strIn.length) {
    return null
  }
  var str64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  var index64 = []
  for (let j = 0; j < str64.length; j++) {
    index64[str64.charAt(j)] = j
  }
  var c0, c1, c2, c3, b0, b1, b2
  var len = strIn.length
  var len1 = len
  if (strIn.charAt(len - 1) === '=') {
    len1 -= 4
  }
  var result = []
  for (var i = 0; i < len1; i += 4) {
    c0 = index64[strIn.charAt(i)]
    c1 = index64[strIn.charAt(i + 1)]
    c2 = index64[strIn.charAt(i + 2)]
    c3 = index64[strIn.charAt(i + 3)]
    b0 = (c0 << 2) | (c1 >> 4)
    b1 = (c1 << 4) | (c2 >> 2)
    b2 = (c2 << 6) | c3
    result.push(b0 & 0xff)
    result.push(b1 & 0xff)
    result.push(b2 & 0xff)
  }
  if (len1 !== len) {
    c0 = index64[strIn.charAt(i)]
    c1 = index64[strIn.charAt(i + 1)]
    c2 = strIn.charAt(i + 2)
    b0 = (c0 << 2) | (c1 >> 4)
    result.push(b0 & 0xff)
    if (c2 !== '=') {
      c2 = index64[c2]
      b1 = (c1 << 4) | (c2 >> 2)
      result.push(b1 & 0xff)
    }
  }
  /* **********将数据转成16进制 start***********/
  var arr = result
  var newArr = arr.map(function (item) {
    var centeritem = item.toString(16)
    return centeritem.length > 1 ? centeritem : '0' + centeritem
  })
  result = newArr
  /* ***********将数据转成16进制 end***************/
  return result
}
