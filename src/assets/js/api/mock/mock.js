/*
  @name: mock.js数据模拟
	@desc: 最终可以删除
*/
const Mock = require('mockjs')
const Random = Mock.Random

let success = {
  code: 1,
  msg: '操作成功'
}
let err = {
  code: 0,
  msg: '抱歉,出现错误'
}

// 物业数据
// GET
const companyData = (req) => {
	let limit = 30
  let i = 0
  let a = {}
  let ret = []

	for (; i < limit; i++) {
    let obj = Mock.mock({
      id: Random.natural(1),
      company_name: Random.csentence(5),
      company_address: Random.city() + '' + Random.county(),
      person: Random.cname(),
      phone: '0311-' + Random.natural(5, 6),
      merchant_pid: '2088' + Random.natural(12),
      'spread_id|10000-11000': 1,
      'state|1': ['签约', '已解约']
    })
    ret.push(obj)
  }
  Object.assign(a, success, {ret})
  return a
}

// 小区数据
// GET
const villageData = (req) => {
  
  let limit = 30
  let i = 0
  let a = {}
  let ret = []

  for (; i < limit; i++) {
    let obj = Mock.mock({
      id: Random.natural(1),
      company_name: Random.csentence(5),
      village_address: Random.city() + '' + Random.county(),
      village_name: Random.csentence(5),
      person: Random.cname(),
      phone: '0311-' + Random.natural(5, 6),
      merchant_pid: '2088' + Random.natural(12),
      'spread_id|10000-11000': 1,
      'state|1': ['签约', '已解约']
    })
    ret.push(obj)
  }
  Object.assign(a, success, {ret})
  return a
}

// 账单数据
// GET
const billData = (req) => {
  
  let limit = 30
  let i = 0
  let a = {}
  let ret = []

  for (; i < limit; i++) {
    let obj = Mock.mock({
      'group|1': ['一期', '二期', '三期'],
      'building|1': ['1栋', '2栋', '3栋', '4栋'],
      'unit|1': ['1单元', '2单元', '3单元'],
      'room|1': ['101', '102', '103'],
      bill_id: '03111' + Random.natural(5, 6),
      'release_day|1': ['2017-03-21', '2017-01-21', '2017-11-21', '2017-10-21'],
      'deadline|1': ['2019-03-21', '2019-01-21', '2019-11-21', '2019-10-21'],
      'bill_date|1': ['2019-03-21', '2019-01-21', '2019-11-21', '2019-10-21'],
      'bill_entry_amount|100-200': 1,
      'status|1': ['线下缴费', '待缴费', '线上缴费']
    })
    ret.push(obj)
  }
  Object.assign(a, success, {ret})
  return a
}



// POST 参数转化
// a=1&b=2   =>  {a: 1, b: 2}
// url => data
function params (str) {
  let obj = {}
  let _arr = str.split('&').map(v => {
    let a = v.split('=')
    obj[a[0]] = a[1]
  })
  return obj
}

export default {
  companyData,
  villageData,
  billData
}
