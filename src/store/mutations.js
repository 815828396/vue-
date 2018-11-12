import * as types from './mutations-types'

const mutations = {
  [types.SET_LOGIN] (state, flag) {
    state.login = flag
  },
  [types.SET_MLOGIN] (state, flag) {
    state.mLogin = flag
  },
  [types.SET_TOKEN] (state, str) {
    state.token = str
  },
  [types.SET_TYPE] (state, str) {
    state.type = str
  },
  [types.SET_USER_INFO] (state, userInfo) {
    // state.userInfo.username = username
    // state.userInfo.love = love
    // state.userInfo.history = history
    state.userInfo = userInfo
    console.log(state.userInfo)
  },
  [types.SET_SEARCH_HISTORY] (state, {history}) {
    let exists = state.searchHistory.findIndex(v => v === history)
    if (exists < 0) {
      // 不存在搜索历史添加
      state.searchHistory.push(history)
    }
  },
  [types.DEL_SEARCH_HISTORY] (state) {
    // 清空搜索历史
    state.searchHistory = []
  }
}

export default mutations
