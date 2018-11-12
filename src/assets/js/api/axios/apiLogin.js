/**
 * @name needLogin-url
 * @author xing
 * @desc 验证登陆接口
 */
import axios from 'axios'
import qs from 'qs'

// 管理员
const _AddAdmin = 'admin/add'
const _selAllAdmin = 'admin/selA'
const _ownAdmin = 'admin/selO'
const _upAdmin = 'admin/upd'
const _upPwd ='admin/updPwd'

// 报名信息
const _addBaoming = 'enroll/add'
const _selBaoming = 'enroll/selO'
const _cancelBaoming = 'enroll/del'
const _selBaomingDetails = 'enroll/selO'

// 查看当前工作进度
const _selWorksheet = 'worksheet/selA'
const _selWorksheetState = 'worksheet/selS'
const _updWorkState = 'worksheet/updState'

export const addAdmin = (data) => http({url: baseAddAdmin, data, methods: 'POST'})
export const selAdminAll = (data) => http({url: sellAlAdmin, data})
export const addBaoming = data => http({url: _addBaoming, data, methods: 'POST'})
export const selBaoming = data => http({url: _selBaoming, data})
export const cancelBaoming = data => http({url: _cancelBaoming, data})
export const selDetailsByUser = data => http({url: _selBaomingDetails, data})
export const ownAdmin = (data) => http({url: _ownAdmin, data})
export const upAdmin = (data) => http({url: _upAdmin, data, methods: 'POST'})
export const upPwd = (data) => http({url: _upPwd, data, methods: 'POST'})


// 工作状态
export const selWorksheet = data => http({url: _selWorksheet, data})
export const selWorksheetState = data => http({url: _selWorksheetState, data})
export const updWorksheetState = data => http({url: _updWorkState, data, methods: 'put'})
/*
  axios 请求
*/

async function http (opts) {
  let {url, data, methods} = opts
  // 默认配置
  
  const axiosDefaultHeader = {
    url,
    params: data,
    data: qs.stringify(data),
    method: methods || 'get',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }
  // console.log(axiosDefaultHeader)
  if (methods && methods.toLowerCase() === 'post') {
    axiosDefaultHeader.headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    axiosDefaultHeader.params = null
  }
  return await axios(axiosDefaultHeader)
}