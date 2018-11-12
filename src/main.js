// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import interceptor from './router/interceptor'
import FastClick from 'fastclick'
import Mint from 'mint-ui'
import axios from '@/assets/js/api/axios'
import store from './store'
import dialog from './common/model'
import 'mint-ui/lib/style.css'
import 'swiper/dist/css/swiper.css';
import '@/assets/css/base.css'
import '@/assets/css/iconfont.css'

Vue.use(Mint)
Vue.use(dialog)
Vue.prototype.$axios = axios
// 引入问题导致 input框双击
// @click 事件问题
// FastClick.attach(document.body)

// 引入 mock.js 数据
// require('@/assets/js/api/mock')
// console.log(as)
interceptor('myBase')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
