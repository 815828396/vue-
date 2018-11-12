/**
 * @name noLogin-urls
 * @author xing
 * @desc 不需要验证登陆接口
 */
import axios from './index'
import qs from 'qs'
// part-job 兼职 接口
const _addPart = 'part/add'
const _delPart = 'part/del'
const _selPart = 'part/selA'
const _selPartO = 'part/selO'
const _selPartPaix = 'part/selZ'

export const selPartPaix = (data) => http({url: _selPartPaix, data})
export const selPartAll = (data) => http({url: _selPart, data})
export const selPartOnly = (data) => http({url: _selPartO, data})
export const addPart = (data) => {
  let assobj = {}
  const _defaultData = {
    name: '',
    salary: '',
    type: '兼职', // 兼职 全职
    labour: '',
    setcycle: '',
    hirnumb: '',
    sex: '2', // 2 不限
    content: '',
    times: '',
    timee: '',
    job_address: '',
    state: ''
  }
  Object.assign(assobj, _defaultData, data)
  // console.log(assobj)
  return http({
    url: _addPart,
    data: assobj,
    methods: 'post'
  })
}

// 添加商户
const _addMerchant = 'merchant/add'
// 注册用户
const _addUser = 'user/add'
const _updPwd = 'user/updPwd'
const _loginUser = 'user/checklogin'
const _loginShoper = 'merchant/checklogin'
const _selUserInfo = 'user/selA'
const _updUserInfo = 'userinfo/upd'
const _seluser = 'userinfo/selO'
const _seluserinfo = 'userinfo/selInfo'
export const addUser = data => http({url: _addUser, data, methods: 'post'})
export const addMerchant = data => http({url: _addMerchant, data, methods: 'post'})
export const updPwd = data => http({url: _updPwd, data, methods: 'post'})
export const loginUser = (data, _type) => {
  // 登陆用户
  if (_type === 'user') return http({url: _loginUser, data})
  if (_type === 'shoper') return http({url: _loginShoper, data})
}
// export const loginUser = data => http({url: _loginUser, data})
export const loginShoper = data => http({url: _loginShoper, data})
export const selUserInfo = data => http({url: _selUserInfo, data})
export const seluser = data => http({url: _seluser, data})
export const updUserInfo = data => {
  const _default = {
    name: '',
    sex: '',
    birth: '',
    idnumb: '',
    county: '',
    address: '',
    height: '',
    weight: '',
    qq: '',
    email: '',
    info: ''
  }
  return http({
    url: _updUserInfo,
    data: Object.assign({}, _default, data),
    methods: 'put'
  })
}
export const seluserinfo = data => http({url: _seluserinfo, data})


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

    if (methods && methods.toLowerCase() === 'post') {
      axiosDefaultHeader.headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
      axiosDefaultHeader.params = null
    }
    return await axios(axiosDefaultHeader)
  }