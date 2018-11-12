<template>
	<div class="ins-manage">
		<!-- 商户注册 -->
    <div class="head-wrap">
      <div class="head wauto">
        <i class="iconfont icon-zuojiantou" @click="back"></i>
        <div class="grow1 fzcenter">盈享兼职</div>
      </div>
    </div>
    <!-- s 注册头部 -->
    <div class="ragister-form" ref="form">
      <h3 class="fzcenter mt10 mb10"><i class="iconfont icon-touxiang"></i>盈享商户注册</h3>
      <div class="ragister-input_group">
        <div class="input-item com-border-bottom">
          <i class="iconfont icon-touxiang"></i>
          <input type="text" class="input ml10" placeholder="昵称" v-model="manageInfo.name">
        </div>
        <div class="input-item com-border-bottom">
          <i class="iconfont icon-weibiaoti-1"></i>
          <input type="number" class="input ml10" placeholder="电话" v-model="manageInfo.tel">
        </div>
        <div class="input-item com-border-bottom">
          <i class="iconfont icon-iconmm"></i>
          <input type="password" class="input ml10" placeholder="密码" v-model="manageInfo.pwd">
          <span class="fz12 reg_tip" v-show="reg_tip_first">推荐英文+数字6-10位</span>
        </div>
        <div class="input-item">
          <i class="iconfont icon-yanzhengma"></i>
          <input type="text" v-model="code" class="input ml10" placeholder="请输入验证码">
          <span class="getCode" @click="getqrcode">更新验证码</span>
        </div>
      </div>
			<canvas id="qrcode"></canvas>
      <div class="button mt20">
        <span class="register-btn" @click="addMerchantBtn">注册</span>
      </div>

      <!-- 注册消息 -->
			<div class="register form-wrap mt20">
				<div class="com-border-bottom">
					<h5 class="p-title wauto">平台小消息</h5>
				</div>
				<ul class="manage-list wauto">
					<li>1. 请之前的商户完善个人信息,以及商户信息，并提供相关的公司资质证明.平台将于下次版本更新,进行商户审核。</li>
					<li>2. 更新后,将不合格的商户进行整改</li>
				</ul>
			</div>
    </div>
  </div>
	</div>
</template>

<script>
	import {Toast, Indicator} from 'mint-ui'
	import {addMerchant} from '@/assets/js/api/axios/apiNoLogin'
	import CanvasQRcode from '@/assets/js/common/canvasQRcode'
	export default {
		data () {
			return {
        reg_tip_first: false,
				canvasqrcode: '',
				qrcode: '',
				code: '',
				manageInfo: {
					tel: '',
					pwd: '',
					name: '',
				}
			}
		},
		mounted () {
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
				console.log(this.qrcode)
      },
      back () {
        this.$router.back(-1)
      },
			addMerchantBtn () {
        if (!/^1[3|4|5|7|8]\d{9}$/.test(this.manageInfo.tel)) {
          Toast({
            message: '请输入正确的电话号码'
          })
          return
        }
        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/.test(this.manageInfo.pwd)) {
          Toast({
            message: '密码规则可能存在问题!不允许出现空格'
          })
          return
        }
        if (this.code.toLowerCase() !== this.qrcode.toLowerCase()) {
          Toast({
            message: '验证码错误'
          })
          return
        }
				if (!this.valiteData(this.manageInfo)) {
					Toast('请保证信息完整')
					return
				}
				Indicator.open()
				addMerchant(this.manageInfo).then(res => {
					if (res.code === 0) {
						Toast('注册成功')
            setTimeout(() => {
              this.$router.push({path: '/login'})
            }, 1000)
					}else{
            Toast({
              message: '该手机号，已被注册'
            })
          }
				})
			},
			valiteData (obj) {
				let ret = false
				for (let i in obj) {
					if (obj[i] === '') {
						return false
					}
				}
				return true
			}
		},
    watch: {
      'manageInfo.pwd' (n, o) {
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
  background: rgb(241, 204, 15)
}
.head{
  display: flex;
  padding: 10px 0;
  color: white;
  text-align: center;
}
.ragister-form{
  margin-top: 50px;
}
.input-item{
  display: flex;
  align-items: center;
  margin: 10px 0;
  background: white;
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
.register-wrap{
	position: relative;
	min-height: 100%;
	background: #f9f9f9;
}
.register{
	background: white
}
.p-title{
  position: relative;
  padding-left: 10px;
  margin-top: 5px;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
}
.p-title:before{
  position: absolute;
  top: 8px;
  left: 0;
  content: "";
  width: 5px;
  height: 12px;
  background: #fbcb0f;
}
.manage-list li{
	padding-left: 10px;
	margin: 5px 0;
	font-size: 12px;
	color: #676767
}
</style>
