<template>
  <div class="register">
    <div class="head-wrap">
      <div class="head wauto">
        <i class="iconfont icon-zuojiantou" @click="back"></i>
        <div class="grow1 fzcenter">盈享兼职</div>
      </div>
    </div>
    <!-- s 注册头部 -->
    <div class="register-header">
      <div><img src="../../assets/images/login.jpg" alt="" width="100%"></div>
    </div>
    <div class="ragister-form" ref="form">
      <h3 class="fzcenter mt10 mb10"><span class="login-active">管理员登录</span></h3>
      <!-- <h3 class="fzcenter mt10 mb10" @click="showBox">
        <span :class="{'login-active': !isShop}" data-box="putong">
          盈享登录
        </span>
        /
        <span :class="{'login-active': isShop}" data-box="shanghu">
          商户登录
        </span>
      </h3> -->
      <div class="manage-login">
        <div>
          <div class="input-item">
            <i class="iconfont icon-wode"></i>
            <input type="text" class="input ml10" placeholder="用户" v-model="managerInfo.name">
          </div>
          <div class="input-item">
            <i class="iconfont icon-iconmm"></i>
            <input type="password" class="input ml10" placeholder="密码" v-model="managerInfo.pwd">
          </div>
          <div class="button mt20">
            <span class="register-btn" @click="mLogin">登录</span>
          </div>
        </div>
      </div>

      <div class="ragister-input_group" v-if='false'>
        <!-- 普通用户 -->
        <div v-if="!isinputBox">
          <div class="input-item">
            <i class="iconfont icon-wode"></i>
            <input type="number" class="input ml10" placeholder="手机号" v-model="userInfo.tel">
          </div>
          <div class="input-item">
            <i class="iconfont icon-iconmm"></i>
            <input type="password" class="input ml10" placeholder="密码" v-model="userInfo.pwd">
          </div>
          <div class="button mt20">
            <span class="register-btn" @click="sureBtn">登录</span>
          </div>
          <div class="user">
            <router-link class="noUser mt20" tag="div" to="/register">还没有账户?<span class="tcolor">去注册</span></router-link>
            <router-link class="noUser mt20" tag="div" to="/login"><span>忘记密码</span></router-link>
          </div>
        </div>
        <!-- 商户 -->
        <div v-else>
          <div class="input-item">
            <i class="iconfont icon-wode"></i>
            <input type="text" class="input ml10" placeholder="商户账号" v-model="shoperInfo.tel">
          </div>
          <div class="input-item">
            <i class="iconfont icon-iconmm"></i>
            <input type="password" class="input ml10" placeholder="密码" v-model="shoperInfo.pwd">
          </div>
          <div class="button mt20">
            <span class="register-btn" @click="shopLogin">login</span>
          </div>
          <div class="user">
            <router-link class="noUser mt20" tag="div" to="/register">如何成为商户?<span class="tcolor">了解</span></router-link>
            <router-link class="noUser mt20" tag="div" to="/login"><span>忘记密码</span></router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { loginUser, loginShoper } from '@/assets/js/api/axios/apiNoLogin'
  import {mapMutations} from 'vuex'
  import { Popup, Toast, Indicator } from 'mint-ui'
  export default {
    data() {
      return {
        isShop: false,
        userInfo: {
          tel: '',
          pwd: ''
        },
        shoperInfo: {
          tel: '',
          pwd: ''
        },
        managerInfo: {
          name: '',
          pwd: '',
        }
      }
    },
    computed: {
      isinputBox () {
        return this.isShop
      }
    },
    mounted () {
      this.setFormAuto()
    },
    methods: {
      mLogin() {
        // this.$router.push({
        //   path: '/adminIndex'
        // })
        // 
        // console.log(this.managerInfo)
        if (this.managerInfo.name === '' || this.managerInfo.pwd === '') {
          // 加载若提示
          Toast({
            position: 'center',
            message: '请输入账号或密码'
          })
          return
        } else {
          this.$axios({
            url: 'admin/checklogin',
            method: 'post',
            params: this.managerInfo
          }).then( res => {
            if (res.code == 0) {
              Toast({
                position: 'center',
                message: '登陆成功'
              })
              // console.log(res.res.User.noid)
              this.setMLogin(true)
              localStorage.setItem('mLogin', true)
              localStorage.setItem('mid', res.res.User.noid)
              this.$router.push({
                path: '/adminIndex'
              })
            }else if(res.code == 1){
              let instance = Toast({
                position: 'center',
                message: '登陆失败'
              })
              setTimeout(() => {
                instance.close()
              }, 1000)
            }
          })
        }
        
      },
      showBox (ev) {
        let _is = ev.target.dataset.box
        if (_is === 'putong') {
          this.isShop = false
        } else {
          this.isShop = true
        }
      },
      sureBtn () {
        if (this.userInfo.tel === '' || this.userInfo.pwd === '') {
          // 加载若提示
          Toast({
            position: 'center',
            message: '请输入账号或密码'
          })
          return
        }
        this._login(this.userInfo, 'user')
      },
      shopLogin () {
        if (this.shoperInfo.tel === '' || this.shoperInfo.pwd === '') {
          // 加载若提示
          Toast({
            position: 'center',
            message: '请输入商户账号或密码'
          })
          return
        }
        this._login(this.shoperInfo, 'shoper')
      },
      _login (data, t) {
        loginUser(data, t).then(res => {
          if (res.code === 0) {
            this.setLogin(true)
            this.setUserInfo(res.res.User)
            this.setToken(res.res.User['noid'])
            this.setType(res.res.Login)
            localStorage.setItem('login', true)
            localStorage.setItem('type', JSON.stringify(res.res.Login))
            localStorage.setItem('token_noid', res.res.User['noid'])
            localStorage.setItem('userInfo', JSON.stringify(res.res.User))
            this.$router.push({
              path: '/'
            })
            // console.log(res)
          } else {
            // 加载若提示
            Toast({
              position: 'top',
              message: '账号或密码不正确',
              iconClass: 'iconfont icon-htmal5icon21'
            })
          }
        })
      },
      back () {
        this.$router.back(-1)
      },
      setFormAuto () {
        let clientW = document.body.offsetWidth
        let formW = this.$refs.form.offsetWidth
        let clientH = document.body.offsetHeight
        let formH = this.$refs.form.offsetHeight
        this.$refs.form.style.left = (clientW - formW) / 2 + 'px'
        this.$refs.form.style.top = (clientH - formH) / 2 + 'px'
      },
      ...mapMutations({
        setMLogin: 'SET_MLOGIN',
      })
    }
  }
</script>

<style scoped>
.head-wrap{
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, .3)
}
.head{
  display: flex;
  padding: 10px 0;
  color: white;
  text-align: center;
}
.register{
  position: relative;
  width: 100%;
  height: 100%;
  /* background: #eee; */
}
.ragister-form{
  position: absolute;
  top: 0;
  /* left: 50%; */
  /* transform: translateX() */
  width: 80%;
  padding: 10px;
  background: white;
  box-shadow: 0 0 15px #bababa;
  border-radius: 5px;
}
.input-item{
  display: flex;
  align-items: center;
  margin: 10px 0;
  border-bottom: 1px solid #ccc;
}
.input-item i{
  margin: 0 10px;
  font-size: 20px;
  font-weight: bold;
}
.input-item .input{
  flex-grow: 1;
  height: 50px;
  border: none;
  outline: none;
}
.getCode{
  /* display: block; */
  height: 30px;
  padding: 0px 5px;
  line-height: 30px;
  background: #fbcb0f;
  font-size: 12px;
  color: white;
  border-radius: 10px;
}
.register-btn{
  display: block;
  width: 80%;
  margin: 0 auto;
  padding: 10px 0;
  text-align: center;
  background: #fbcb0f;
  font-size: 12px;
  color: white;
  border-radius: 10px;
}
.user{
  display: flex;
  justify-content: space-between;
}
.noUser{
  font-size: 12px;
}
.login-active{
  color: #f60;
}
</style>