import * as types from './mutations-types'

/*
  @parmes:
    search: 搜索结果
    love: 关注
  @setMymodel: 控制 '我的模块'
*/
export const setMymodel = function ({commit, state}, {username, love, history}) {
  commit(types.SET_LOGIN, state)
  commit(types.SET_USER_INFO, {username, love, history})
  commit(types.SET_USER_INFO, {username, love, history})
}
