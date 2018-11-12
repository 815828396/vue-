/**
 * @name 公司详情 api
*/
import axios from 'axios'
import qs from 'qs'

const _selCompanyAll = 'companyinfo/selA'
const _addCompany = 'companyinfo/add'
const _selCompanyInfo = 'companyinfo/selO'

export const selComapnyAll = data => http({url: _selCompanyAll, data})
export const addComapny = data => http({url: _addCompany, data})
export const selComapnyInfo = data => http({url: _selCompanyInfo, data})

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