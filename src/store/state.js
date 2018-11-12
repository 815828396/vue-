/**
 * @name state-asd
 * @author xing
 * @desc 登陆信息的状态存储
 */
const state = {
  login: JSON.parse(localStorage.getItem('login')) || false,
  mLogin: localStorage.getItem('mLogin') || false,
  token: localStorage.getItem('token_noid') || '',
  type:　JSON.parse(localStorage.getItem('type')) || '',
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {
    tel: '',
    img: '', 
    ctime: '', 
    intg: '',
    vip: '', 
    state: '', 
    noid: '', 
    name: ''
  },
  searchHistory: ['计算机', '兼职', '劳务', '帮贡']
}

export default state
