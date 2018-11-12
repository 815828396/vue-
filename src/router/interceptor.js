/**
 * @name router-interceptor
 * @author xig
 * @desc 路由拦截器
 */
import router from './index'
import store from '../store'


export default (interceptor) => {
  router.beforeEach((to, from, next) => {
    let vuexIsLogin = store.getters.login
    let vuexIsMLogin = store.getters.mLogin

    const _path = to.path.slice(1) // 当前路由地址 裁切 '/'
    const _need_login = to.meta === 'login' ? true : false // 判断当前路由是否需要 验证登陆
    const m_need_login = to.meta === 'mLogin' ? true : false

    // 判断当前 路由是否需要拦截
    if (_need_login && !vuexIsLogin) {
        next({ path: '/login' })
    } else if (m_need_login && !vuexIsMLogin) {
        next({ path: '/managerLogin' })
    } else {
        next()
    }
  })
  return router
}
