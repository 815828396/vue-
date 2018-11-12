import axios from 'axios'
import { Popup, Toast, Indicator } from 'mint-ui'

// 基础设置
// 默认请求头
axios.defaults.baseURL = '/api' // 开发环境
// axios.defaults.baseURL = 'http://192.168.1.100:8080/yxpart/api/v1' // 开发环境
// axios.defaults.baseURL = 'https://www.xieyingwangluo.com/yxpart/api/v1' // 生产环境
// axios.defaults.baseURL = '' // 生产环境
axios.defaults.headers['Accept'] = '*/*'
axios.defaults.timeout = 5000

// request 拦截
axios.interceptors.request.use(
  // 成功
  config => {
    // token
    const token = 'ASCS54ASD5442'
    config.headers.token = token

    // console.log('请求拦截:' + config)
    return config
  },
  // 失败
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response 拦截
axios.interceptors.response.use(
  response => {
    if (response) Indicator.close()
    return response.data
  },
  err => {
    Indicator.close()
    let _err = err.response
    try {
      if (_err.status === 403) {
        Toast({
          message: '抱歉没有权限访问',
          iconClass: 'icon icon-error'
        })
      }
      if (_err.status === 404) {
        Toast({
          message: '抱歉!接口找不到',
          iconClass: 'icon icon-error'
        })
      }
      if (_err.status === 502) {
        Toast({
          message: '服务器已被关闭',
          iconClass: 'icon icon-error'
        })
      }
      if (_err.status === 500) {
        console.log('服务器错误')
      }
    } catch (error) {
      // console.log(error)
      if (error) {
        Toast({
          message: '请求超时!服务器被带到火星去了.'
        })
      }
    }
    return Promise.reject(err)
  }
)

export default axios
