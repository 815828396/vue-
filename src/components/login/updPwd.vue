<template>
  <div class="register">
    <div class="head-wrap">
      <div class="head wauto">
        <i class="iconfont icon-zuojiantou" @click="back"></i>
        <div class="grow1 fzcenter">盈享兼职</div>
      </div>
    </div>
    <!-- s 注册头部 -->
    <div class="ragister-form" ref="form">
      <h3 class="fzcenter mt10 mb10 indown"><i class="iconfont icon-touxiang"></i>修改密码</h3>
      <div class="ragister-input_group">
        <!-- <div class="input-item">
          <i class="iconfont icon-dianhua"></i>
          <input type="text" class="input ml10" placeholder="手机号" v-model="userInfo.tel">
        </div> -->
        <div class="input-item">
          <i class="iconfont icon-iconmm"></i>
          <input type="password" class="input ml10" placeholder="旧密码" v-model="userInfo.pwd">
        </div>
        <div class="input-item">
          <i class="iconfont icon-iconmm"></i>
          <input type="password" class="input ml10" placeholder="新密码" v-model="userInfo.npwd">
          <span class="fz12">推荐密码为字母+数字6-10位</span>
        </div>
      </div>
      <div class="button mt20">
        <span class="register-btn inup" @click="updUser">修改</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { Toast, Indicator } from 'mint-ui'
  import { updPwd } from '@/assets/js/api/axios/apiNoLogin'
  export default {
    data() {
      return {
        userInfo: {
          npwd: '',
          pwd: '',
          tel: ''
        }
      }
    },
    mounted () {
      this.setFormAuto()
    },
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    methods: {
      updUser () {
        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/.test(this.userInfo.npwd)) {
          Toast({
            message: '密码规则可能存在问题!不允许出现空格'
          })
          return
        }
        if (this.userInfo.npwd === '' || this.userInfo.pwd === '') {
          Toast({
            message: '请正确填写信息'
          })
          return
        }
        Indicator.open()
        updPwd({
          noid: this.token,
          pwd: this.userInfo.npwd,
          oldpwd: this.userInfo.pwd
        }).then(res => {
          if (res.code === 0) {
            Toast({
              message: '修改成功'
            })
            this.$router.back(-1)
          } else {
            Toast({
              message: '抱歉!密码修改失败'
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
  }
</script>

<style scoped>
.indown {
  animation: bounceInDown .5s
}
.inup {
  animation: bounceInUp .5s
}
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
  background: #fff;
}
.ragister-form{
  position: absolute;
  top: 0;
  /* left: 50%; */
  /* transform: translateX() */
  width: 80%;
  padding: 10px;
  background: white;
  /*box-shadow: 0 0 15px #bababa;*/
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
