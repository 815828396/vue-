/*
	@desc： mock对外提供路由文件
  @author: xing
*/
import mock from './mock'

const Mock = require('mockjs')

// 查询所有物业
Mock.mock('/company/selcompany', 'get', req => mock.companyData(req))

// 查询所有小区
Mock.mock('/village/selvillage', 'get', req => mock.villageData(req))

// 查询所有账单
Mock.mock('/bill/selbill', 'get', req => mock.billData(req))
