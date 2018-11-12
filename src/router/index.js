import Vue from 'vue'
import Router from 'vue-router'
import Error from '@/components/error/error'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/components/index'], resolve),
      redirect: '/index',
      children: [{
        path: '/index',
        name: 'index',
        meta: 'keepAlive',
        component: resolve => require(['@/components/no-login/index'], resolve)
      }, { // 兼职
        path: '/partJob',
        name: 'index',
        meta: 'keepAlive',
        component: resolve => require(['@/components/no-login/partJob/jobIndex'], resolve)
      }, {
        path: '/insBaoming',
        name: 'insBaoming',
        meta: 'login',
        component: resolve => require(['@/components/no-login/partJob/insBaoming'], resolve)
      }, {
        path: '/jobDetail',
        name: 'jobDetail',
        component: resolve => require(['@/components/no-login/partJob/jobDetail'], resolve)
      }, { // 公司详细信息
        path: '/companyDetails',
        name: 'companyDetails',
        component: resolve => require(['@/components/admin/manage/partmanage/companyDetails'], resolve)
      }, { // 添加公司信息
        path: '/companyInsert',
        name: 'companyInsert',
        component: resolve => require(['@/components/admin/manage/partmanage/companyInsert'], resolve)
      }, {
        path: '/publishJob',
        name: 'publishJob',
        meta: 'login',
        component: resolve => require(['@/components/no-login/partJob/publishJob'], resolve)
      }, {
        path: '/publishJobSum',
        name: 'publishJobSum',
        meta: 'login',
        component: resolve => require(['@/components/no-login/partJob/publishJobSum'], resolve)
      }, {
        path: '/workBack',
        name: 'workBack',
        component: resolve => require(['@/components/admin/a1/work-back.vue'], resolve)
      }, {
        path: '/newsIndex',
        name: 'news',
        meta: 'login',
        component: resolve => require(['@/components/no-login/news/newsIndex'], resolve)
      }, { // 我的信息
        path: '/myIndex',
        name: 'index',
        component: resolve => require(['@/components/no-login/myInfo/myIndex'], resolve),
        children: [{ // 子路由
          path: 'myInfo',
          name: 'wallet',
          meta: 'login',
          component: resolve => require(['@/components/no-login/myInfo/myInfo'], resolve)
        }, { // 我的钱包
          path: 'myWallet',
          name: 'wallet',
          meta: 'login',
          component: resolve => require(['@/components/no-login/myInfo/myWallet'], resolve)
        }, {
          path: 'myBase',
          name: 'baseInfo',
          meta: 'login',
          component: resolve => require(['@/components/no-login/myInfo/mybase'], resolve)
        }, {
          path: 'myApply',
          name: 'myApply',
          meta: 'login',
          component: resolve => require(['@/components/no-login/myInfo/myApply'], resolve)
        }]
      }, {
        path: '/myBase',
        name: 'baseInfo',
        meta: 'login',
        component: resolve => require(['@/components/no-login/myInfo/mybase'], resolve)
      }, {
          path: '/myRelease',
          name: 'myRelease',
          meta: 'login',
          component: resolve => require(['@/components/no-login/myInfo/myRelease'], resolve)
      }]
    }, {
      path: '/updPwd',
      name: 'updPwd',
      meta: 'login',
      component: resolve => require(['@/components/login/updPwd'], resolve)
    }, {
      path: '/inspart',
      name: 'inspart',
      meta: 'login',
      component: resolve => require(['@/components/admin/manage/partmanage/ins-part'], resolve),
    }, { // 注册页面
      path: '/register',
      name: 'register',
      component: resolve => require(['@/components/login/register'], resolve)
    }, { // 登陆页面
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login/login'], resolve)
    }, { // 登陆验证页面
      path: '/adminIndex',
      name: 'adminIndex',
      meta: 'mLogin',
      component: resolve => require(['@/components/admin/index'], resolve),
      children: [{
        path: 'adminManage',
        name: 'adminManage',
        meta: 'mLogin',
        component: resolve => require(['@/components/admin/manage/admin'], resolve)
      }, {
        path: 'shoper',
        name: 'shoper',
        meta: 'mLogin',
        component: resolve => require(['@/components/admin/manage/shoper'], resolve)
      }, {
        path: 'realName',
        name: 'realName',
        meta: 'mLogin',
        component: resolve => require(['@/components/admin/a1/real-name'], resolve)
      }, {
        path: 'userManage',
        name: 'userManage',
        meta: 'mLogin',
        component: resolve => require(['@/components/admin/a1/user-manage'], resolve)
      }, {
        path: 'userBl',
        name: 'userBl',
        meta: 'mLogin',
        component: resolve => require(['@/components/admin/a1/black-list'], resolve)
      }, {
        path: 'jobDetails',
        name: 'jobDetails',
        meta: 'mLogin',
        component: resolve => require(['@/components/admin/a1/job-details'], resolve)
      }]
    }, {
      path: '/registerManage',
      name: 'registerManage',
      component: resolve => require(['@/components/login/registerManage'], resolve)
    }, {
      path: '/insManage',
      name: 'insManage',
      component: resolve => require(['@/components/admin/manage/partmanage/ins-manage'], resolve)
    },{
      path: '/jobManage',
      name: 'jobManage',
      meta: 'mLogin',
      component: resolve => require(['@/components/admin/a1/job-manage'], resolve)
  }, { // 管理员登录
      path: '/managerLogin',
      name: 'managerLogin',
      component: resolve => require(['@/components/login/manager-login'], resolve)
    }, { // 管理导航
      path: '/navManage',
      name: 'navManage',
      meta: 'mLogin',
      component: resolve => require(['@/components/admin/nav-manage'], resolve)
    }, { // 公交号牌规划
      path: '/mapBusline',
      name: 'mapContainer',
      component: resolve => require(['@/common/MapAssembly/MapBusLine'], resolve)
    }, { // 工作地点规划
      path: '/mapWorkLine',
      name: 'mapWorkLine',
      component: resolve => require(['@/common/MapAssembly/MapWorkLine'], resolve)
    }, { // 选择城市
      path: '/choosecity',
      name: 'choosecity',
      component: resolve => require(['@/common/city/city'], resolve)
    }, { // 关于系统
      path: '/aboutsystem',
      name: 'aboutsystem',
      component: resolve => require(['@/common/aboutYX/aboutsystem'], resolve)
    }, { // 404
      path: '/*',
      name: 404,
      component: Error
    }
  ]
})
