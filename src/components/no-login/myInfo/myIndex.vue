<template>
  <div class="my-info">
    <!-- 我的信息顶部 -->
    <div class="info-head">
      <div class="info-head_inner">
        <div class="head-img fzcenter">
          <img src="../../../assets/images/img-head.jpg" alt="" width="100px" height="100px">
        </div>
        <div class="fzcenter">
          <span class="gologin" v-if="!login" @click="jsGologin">请登录</span>
          <span class="has" v-else>{{userInfo.tel}}</span>
        </div>
        <div class="fzcenter mt10"><button class="mkinfo" @click="updInfo">查看资料</button></div>
      </div>
    </div>
    <!-- 路由模块 -->
    <div class="sub-route_list">
      <div class="wauto">
        <router-link tag="div" to="/myIndex/myApply" class="route_item com-border-bottom" v-if="type !== '商户'">
          <div class="bgimg bg1"></div>
          <div class="grow1 ml10">我的申请</div>
          <div><i class="iconfont icon-youjiantou"></i></div>
        </router-link>
        <!-- 商户 -->
        <router-link tag="div" to="/inspart" class="route_item com-border-bottom" v-if="type === '商户'">
          <div class="bgimg bg1"></div>
          <div class="grow1 ml10">发布兼职</div>
          <div><i class="iconfont icon-youjiantou"></i></div>
        </router-link>
        <router-link tag="div" to="/myRelease" class="route_item com-border-bottom" v-if="type === '商户'">
          <div class="bgimg bg1"></div>
          <div class="grow1 ml10">我发布的兼职</div>
          <div><i class="iconfont icon-youjiantou"></i></div>
        </router-link>
        <!-- <div class="route_item com-border-bottom" v-if="isAliClient" @click="openAlipayConcat">
          <div class="bgimg bg1"></div>
          <div class="grow1 ml10">支付宝通讯录</div>
          <div><i class="iconfont icon-youjiantou"></i></div>
        </div> -->
        <!-- <router-link tag="div" to="/myIndex/myWallet" class="route_item com-border-bottom">
          <div class="bgimg bg2"></div>
          <div class="grow1 ml10">我的钱包</div>
          <div>
            <span class="mr10 fzcolor">等待开通</span>
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </router-link> -->
      </div>
    </div>
    <div class="sub-route_list">
      <div class="wauto">
        <router-link tag="div" to="/updPwd" class="route_item com-border-bottom" v-if="type !== '商户'">
          <div class="bgimg bg3"></div>
          <div class="grow1 ml10">更改密码</div>
          <div><i class="iconfont icon-youjiantou"></i></div>
        </router-link>
        <div class="route_item">
          <div class="bgimg bg4"></div>
          <div class="grow1 ml10">联系客服</div>
          <div>
            <a href="tel:13028627735" class="mr10 fzcolor">0311-86770662</a>
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <router-link tag="div" to="/aboutsystem" class="route_item com-border-bottom">
          <div class="bgimg bg5"></div>
          <div class="grow1 ml10">关于系统</div>
          <div>
            <span class="mr10 fzcolor"></span>
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </router-link>
      </div>
    </div>
    <div class=""><span class="loginout" @click="loginOut" v-if="login">退出</span></div>
    <!-- 子路由  -->
    <transition name="transitionRouter" mode="in-out">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import { selUserInfo } from '@/assets/js/api/axios/apiNoLogin'
  import { mapGetters, mapMutations } from 'vuex'
  import { MessageBox } from 'mint-ui'
  export default {
    computed: {
      isAliClient () {
        return window.navigator.appVersion.indexOf('AlipayClient') >= 0
      },
      ...mapGetters([
        'login',
        'userInfo',
        'token',
        'type'
      ])
    },
    created () {
      this.initsellUserInfo()
    },
    methods: {
      initsellUserInfo () {
        if (!this.token) return
        selUserInfo({
          noid: localStorage.getItem('token_noid')
        }).then(res => {
          console.log(res)
        })
      },
      updInfo () {
        if (this.type === '商户') {
          // 如果是商户直接跳转到，公司详情页面
          this.$router.push({
            path: '/companyDetails'
          })
          return
        }
        // console.log()
        this.$router.push({
          path: '/myIndex/myInfo'
        })
      },
      jsGologin () {
        this.$router.push({
          path: '/login'
        })
      },
      openAlipayConcat () {
        ap.chooseAlipayContact(res => {
          // alert(res.contacts[0])
          alert(JSON.stringify(res))
        })
      },
      loginOut () {
        MessageBox({
          title: '提示',
          message: '确认退出?',
          showCancelButton: true
        }).then(res => {
          if (res === 'confirm') {
            this.$axios.get('user/outlogin').then(res => {
              if (res.code === 0) {
                this.setLogin(false)
                this.setType('')
                localStorage.clear()
                this.$router.push('/')
              }
            })
          }
        })
      },
      ...mapMutations({
        setLogin: 'SET_LOGIN',
        setType: 'SET_TYPE'
      })
    }
  }
</script>

<style scoped>
.my-info{
  position: relative;
  /*min-height: 100%;*/
  background: #efefef;
  margin-bottom: 60px;
}
/* 头部信息 */
.info-head{
  height: 200px;
  overflow: hidden;
  background: #fbcb0f;
}
.head-img{
  margin: 10px 0;
}
.head-img img{
  border-radius: 50%;
}
.gologin{
  text-decoration: underline;
  color: #5d5d5d;
}
.mkinfo{
  padding: 5px 22px;
  background: rgba(103, 62, 62, 0.33);
  border: none;
  border-radius: 5px;
  color: white;
  letter-spacing: 2px;
}
/* 路由 list */
.sub-route_list{
  margin-top: 20px;
  background: white;
  /* box-shadow: 0 2px 5px #ccc; */
}

.route_item{
  display: flex;
  height: 50px;
  /* border-bottom: 1px solid #ccc; */
  align-items: center;
  color: #7b7b7b;
}

.transitionRouter-enter-active,
.transitionRouter-leave-active {
    transition: all 0.4s;
}

.transitionRouter-enter,
.transitionRouter-leave{
    opacity: 0;
    /* transform: translate3d(0, 100%, 0); */
    transform: translateY(-100%);
}
.bgimg{
  width: 27px;
  height: 27px;
  background: url('../../../assets/images/icon-group.jpg');
  background-size: 228px;
}
.bg1{
  background-position: 0px 0px;
}
.bg2{
  background-position: -27px 0px;
}
.bg3{
  background-position: -54px 0px;
}
.bg4{
  background-position: -81px 0px;
}
.bg5{
  background-position: -111px 0px;
}
.loginout{
  display: block;
  width: 80%;
  line-height: 40px;
  margin: 10px auto 0;
  text-align: center;
  border-radius: 5px;
  background: #fbcb0f;
}
</style>
