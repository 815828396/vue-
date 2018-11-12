import Vue from 'vue'
const vm = new Vue()

// 简单的进行过滤
// 根据指定值过滤
function sortArr (obj) {
  let {arr = [], s = ''} = obj

  return [...arr.sort((a, b) => {
    let _prev = a[s],
        _next = b[s]
    return _prev < _next ? -1 : 1
  })]
}

// loading 加载图
// * 仅限使用 Element-ui 组件
function Loading (flag) {
  const loading = vm.$loading({
    lock: true,
    text: '加载中。。。',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  return loading
}

// 转换时间
function analyDate (val) {
  if (!val) {
    throw new Error('没有传入时间')
  }
  let year = val.getFullYear()
  let mounth = Number(val.getMonth()) + 1 >= 10 ? Number(val.getMonth()) + 1 : `0${Number(val.getMonth()) + 1}`
  let day = val.getDate() >= 10 ? val.getDate() : `0${val.getDate()}`
  let hours = val.getHours() >= 10 ? val.getHours() : `0${val.getHours()}`
  let minutes = val.getMinutes() >= 10 ? val.getMinutes() : `0${val.getMinutes()}`
  return `${year}-${mounth}-${day} ${hours}:${minutes}`
}
// 格式化时间
// @params _date       : 被转化时间
// @params connectLine : 连接符号 YYYY-mm-dd
// @params datetime    : 时间类型
//          --- datetime YYYY-mm-dd hh:mm  默认
//          --- date YYYY-mm-dd
//          --- time hh:mm
function formateDate (_date, {type: dt = 'datetime', connectLine: cl = '-'} = {}) {
  let date = null
  let ret = null

  if ( typeof _date === 'string' ) { // 判断是否为字符串类型
    date = new Date(Date.parse(_date))
  } else if ( typeof _date === 'object' ) {
    date = _date
  }

  let _y = date.getFullYear()
  let _m = repairLength(date.getMonth() + 1)
  let _d = repairLength(date.getDate())
  let _h = repairLength(date.getHours())
  let _mi = repairLength(date.getMinutes())

  switch (dt) {
    case 'datetime':
      ret = `${_y}${cl}${_m}${cl}${_d} ${_h}:${_m}`
      break;
    case 'date':
      ret = `${_y}${cl}${_m}${cl}${_d}`
      break;
    case 'time':
      ret = `${_h}:${_m}`
      break;
  }
  return ret
}
// 日期补0
function repairLength (num, limit = 10) {
  return ( num >= limit )
       ? ( '' + num )
       : ( '0' + num )
}


export default {
  sortArr,
  Loading,
  analyDate,
  formateDate
}
