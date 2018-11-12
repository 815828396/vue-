/*
	@desc 表单验证
  @auth xing
*/
const REG_ID = /^2088\d{12}$/
const REG_PHONE = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
const REG_SPACE = /\s+/g

// 是否为空
const checkNull = (r, v, cb) => {
  let ret = v ? REG_SPACE.test(v) : v
  switch (ret) {
    case '':
      ret = REG_SPACE.test(v)
      return cb(new Error('请填写内容'))
    case true:
      return cb(new Error('请检查是否存在非法空格'))
    default:
      return cb()
  }
}

// 是否为支付宝ID
const checkPid = (r, v, cb) => {
  let ret = v ? REG_ID.test(v) : v
  switch (ret) {
    case '':
      ret = REG_ID.test(v)
      return cb(new Error('请填写内容注意空格'))
    case false:
      return cb(new Error('请输入正确的支付宝ID,以：2088开头的16为支付宝ID'))
    default:
      return cb()
  }
}

// 电话号码
const checkPhone = (r, v, cb) => {
  let ret = v ? REG_PHONE.test(v) : v
  switch (ret) {
    case '':
      ret = REG_PHONE.test(v)
      return cb(new Error('请填写内容注意空格'))
    case false:
      return cb(new Error('请输入正确的电话,如：0311-87654321'))
    default:
      return cb()
  }
}

export default {
  checkNull,
  checkPhone,
  checkPid
}