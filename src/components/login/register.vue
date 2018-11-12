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
      <div><img src="../../assets/images/register.jpg" alt="" width="100%"></div>
    </div>
    <div class="ragister-form" ref="form">
      <h3 class="fzcenter mt10 mb10"><i class="iconfont icon-touxiang"></i> 盈享注册</h3>
      <div class="ragister-input_group">
        <div class="input-item">
          <i class="iconfont icon-wode"></i>
          <input type="text" class="input ml10" placeholder="昵称" v-model="userInfo.name">
        </div>
        <div class="input-item">
          <i class="iconfont icon-dianhua"></i>
          <input type="number" class="input ml10" placeholder="手机号" v-model="userInfo.tel">
        </div>
        <div class="input-item">
          <i class="iconfont icon-iconmm"></i>
          <input type="password" class="input ml10" placeholder="密码" v-model="userInfo.pwd">
          <span class="fz12 reg_tip" v-show="reg_tip_first">推荐英文+数字6-10位</span>
        </div>
        <div class="input-item">
          <i class="iconfont icon-yanzhengma"></i>
          <input type="text" v-model="code" class="input ml10" placeholder="请输入验证码">
          <span class="getCode" @click="getqrcode">更新验证码</span>
        </div>
        <!-- <div class=""> -->
          <canvas id="qrcode"></canvas>
        <!-- </div> -->
      </div>
      <div class="button mt20">
        <span class="register-btn" @click="registerUser">注册</span>
      </div>
      <router-link class="hasUser mt20" tag="div" to="/login"><span class="tcolor">已有账号?立即登录</span></router-link>
    </div>
  </div>
</template>

<script>
  import { Toast, Indicator } from 'mint-ui'
  import { addUser } from '@/assets/js/api/axios/apiNoLogin'
  import CanvasQRcode from '@/assets/js/common/canvasQRcode'
  export default {
    data() {
      return {
        reg_tip_first: false,
        canvasqrcode: '',
        qrcode: '',
        code: '',
        userInfo: {
          name: '',
          pwd: '',
          tel: ''
        }
      }
    },
    mounted () {
      this.setFormAuto()
      this.getqrcode()
    },
    methods: {
      getqrcode (){
        this.canvasqrcode = new CanvasQRcode('qrcode', {
          width: 130,
          height: 50
        })
        this.canvasqrcode.clearRect()
        this.qrcode = this.canvasqrcode._initCanvasWidth()
      },
      registerUser () {
        if (!/^1[3|4|5|7|8]\d{9}$/.test(this.userInfo.tel)) {
          Toast({
            message: '请输入正确的电话号码'
          })
          return
        }
        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/.test(this.userInfo.pwd)) {
          Toast({
            message: '密码规则可能存在问题!不允许出现空格'
          })
          return
        }
        if (this.userInfo.tel === '' || this.userInfo.name === '' || this.userInfo.pwd === '') {
          Toast({
            message: '请正确填写信息'
          })
          return
        }
        if (this.code.toLowerCase() !== this.qrcode.toLowerCase()) {
          Toast({
            message: '验证码错误'
          })
          return
        }
        Indicator.open()
        addUser(this.userInfo).then(res => {
          if (res.code === 0) {
            Toast({
              message: '注册成功'
            })
            setTimeout(() => {
              this.$router.push({path: '/login'})
            })
          } else {
            Toast({
              message: '该手机号，已被注册'
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
      }
    },
    watch: {
      'userInfo.pwd' (n, o) {
        // 英文+数字 6-10位
        const REGpwdStrong = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/
        setTimeout(() => {
          if (!REGpwdStrong.test(n)) {
            this.reg_tip_first = true
          } else {
            this.reg_tip_first = false
          }
        }, 200)
      }
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
  position: relative;
  display: flex;
  align-items: center;
  margin: 10px 0;
  border-bottom: 1px solid #ccc;
}
.reg_tip{
  position: absolute;
  top: 8px;
  right: 0;
  color: white;
  padding: 3px;
  border-radius: 3px;
  background: rgba(0, 0, 0, .3);
}
.input-item i{
  margin: 0 10px;
  font-size: 20px;
  font-weight: bold;
}
.input-item .input{
  flex-grow: 1;
  height: 40px;
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
.hasUser{
  font-size: 12px;
}
</style>
