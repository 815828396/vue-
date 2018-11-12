<template>
  <div>
    <!-- 这是管理页面 -->
    <!-- <router-view></router-view> -->
    <transition name="transitionRouter" mode="in-out">
      <keep-alive>
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>

    <div v-if='offIndex' class="homepage">
	    <img src="../../assets/images/banner.jpg" class="img1">
	    <div class="homepage-name">
	      <img src="../../assets/images/me.png" class="img2">
	      <p class="homepage-p">盈享兼职</p>
	    </div>
	    <div v-if='isShowa' class="a clearfix manage-box">
	      <div @click='off' class="green color1">
	      	<router-link tag='div' to='/adminIndex/adminManage'>
		        <img src="../../assets/images/guanli.png" class="img3">
		        <p>管理员管理</p>
	        </router-link>
	      </div>
	      <div @click='off' class="blue color2">
		      <router-link tag='div' to='/adminIndex/shoper'>
		        <img src="../../assets/images/guanli.png" class="img3">
		        <p>商户管理</p>
		      </router-link>
	      </div>
	      <div @click='off' class="green color3">
		      <router-link tag='div' to='/adminIndex/userManage'>
		        <img src="../../assets/images/guanli.png" class="img3">
		        <p>普通用户管理</p>
		      </router-link>
	      </div>
	      <div @click='off' class="blue color4">
		      <router-link tag='div' to='/adminIndex/jobDetails'>
		        <img src="../../assets/images/guanli.png" class="img3">
		        <p>兼职管理</p>
		      </router-link>
	      </div>
	      <div @click='off' class="green color5">
		      <router-link tag='div' to='/adminIndex/realName'>
		        <img src="../../assets/images/guanli.png" class="img3">
		        <!-- <p>反馈管理</p> -->
            <p>实名审核</p>
		      </router-link>
	      </div>
	      <div @click='off' class="blue color6">
		      <router-link tag='div' to='/adminIndex/userBl'>
		        <img src="../../assets/images/guanli.png" class="img3">
		        <p>黑名单管理</p>
		      </router-link>
	      </div>
	    </div>
	    <div v-if='isShowb' class="a clearfix own-box">
	    	<h4>个人信息展示</h4>
        <div class="own-item" @click='updateName'>
          <div class="grow1">姓名</div>
          <div>
            <span class="fz14">{{admin.name == '' ? '未填写' : admin.name}}</span>
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <div class="own-item" @click='updateTel'>
          <div class="grow1">电话</div>
          <div>
            <span class="fz14">{{!admin.tel ? '未填写' : admin.tel}}</span>
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <div class="own-item">
          <div class="grow1">状态</div>
          <div>
            <span class="fz14">{{!admin.state ? '未填写' : admin.state}}</span>
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <div class="own-item mb20" @click='onUpdatePwd'>
          <div class="grow1">密码</div>
          <div>
            <span class="fz14">***</span>
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <div class="exit">
          <button class="exit-btn" @click='exitLogin'>退出登录</button>
        </div>
	    </div>

	    <div style="height:60px;"></div>
	    <div style="position:fixed;bottom:0;left:0;width:100%;z-index: 10;">
	      <mt-navbar style="border-top:1px solid #ccc;">
	      <!-- @click="tabTwo" -->
	        <mt-tab-item id="1" style="border-right:1px solid #ccc;"
            :class="{'orange': navDefault }"
          >
	          <i class="iconfont icon-caidan ml10" style="font-size: 22px;"></i>
	          <span class="fz16" @click="tabTwoa">功能</span>
	        </mt-tab-item>
	        <mt-tab-item id="2" :class="{'orange': !navDefault }">
	          <i class="iconfont icon-wode ml10" style="font-size: 22px;"></i>
	          <span class="fz16" @click="tabTwob">我的</span>
	        </mt-tab-item>
	      </mt-navbar>
	    </div>

	  </div>

    <Dialog :dialogConfig="dialogConfig" @sure="updatePwd" @cancel="offUpdatePwd" v-if="isPwdBox">
      <div class="pwd-box">
        <h4 class="center mb20">更改密码</h4>
        <div class="input-group wauto">
          <div class="input-item"><span class="mr10 ml10 fz12">旧密码:</span><input type="password" placeholder="请输入旧密码" v-model='admin.oPwd'></div>
          <div class="input-item"><span class="mr10 ml10 fz12">新密码:</span><input type="password" placeholder="请输入新密码" v-model='admin.nPwd'></div>
          <div class="input-item"><span class="mr10 fz12">确认密码:</span><input type="password" placeholder="确认密码" v-model='admin.cNPwd'></div>
        </div>
      </div>
    </Dialog>
  </div>
</template>


<script>
  import { MessageBox, Toast, Indicator } from 'mint-ui'
  import { ownAdmin, upAdmin, upPwd } from '@/assets/js/api/axios/apiLogin'
  import all from '@/assets/js/common/common'
  export default {
    data () {
      return {
        transitionName: '',
        navDefault: true,
        offIndex: true,
        isShowa: true,
      	isShowb: false,
        admin: {
          name: '',
          tel: '',
          state: '',
          oPwd: '',
          cPwd: '',
          cNPwd: '',
        },
        dialogConfig: {
          sureText: '确认',
          cancelText: '取消'
        },
        isPwdBox: false,
      }
    },
    created() {
      this.showAdmin()
    },
    methods: {
      showAdmin() {
        let mid = localStorage.getItem('mid')
        ownAdmin({
          noid: mid
        }).then(res => {
          if (res.code == 0) {
            this.admin.name = res.res.name
            this.admin.tel = res.res.tel
            this.admin.state = res.res.state
          }
        })
      },
      updateReturn(r) {
        if (r == 0) {
          Toast({
            message: '修改成功',
          });
        } else if (r == 1) {
          Toast({
            message: '修改失败',
          });
        } else {
          Toast({
            message: '修改信息处理异常',
          });
        }
      },
      updateName() {
        MessageBox.prompt('更改你的姓名').then(({ value, action }) => {
          if (value !== null) {
            this.admin.name = value
            upAdmin({
              noid: localStorage.getItem('mid'),
              name: this.admin.name
            }).then((res) => {
              this.updateReturn(res.code)
            })
          }else{
            Toast({
              message: '姓名不能为空!',
            });
          }
        });
      },
      updateTel() {
        MessageBox.prompt('更改你的手机号').then(({ value, action }) => {
          if (value == null) {
            Toast({
              message: '电话不能为空!',
            });
          } else if (!all.isPoneAvailable(value)) {
            Toast({
              message: '您输入的手机号有误!',
            });
          }
          if (value !== null && all.isPoneAvailable(value)) {
            this.admin.tel = value
            upAdmin({
              noid: localStorage.getItem('mid'),
              tel: this.admin.tel
            }).then((res) => {
              this.updateReturn(res.code)
            })
          }
        });
      },
      onUpdatePwd() {
        this.isPwdBox = true
      },
      offUpdatePwd() {
        this.isPwdBox = false
      },
      updatePwd() {
        if (this.admin.oPwd == '' || this.admin.nPwd == '' || this.admin.cNPwd == '') {
          Toast({
            message: '信息不能为空',
          });
        } else if (this.admin.oPwd !== '' && this.admin.nPwd !== this.admin.cNPwd ) {
          Toast({message: '您输入的密码不相同'})
          this.admin.cNPwd = ''
          this.admin.nPwd = ''
        } else if (this.admin.oPwd == this.admin.nPwd) {
          Toast({message: '亲,新旧密码不能相同'})
        }else if (this.admin.oPwd !== '' &&
          this.admin.nPwd !== '' &&
          this.admin.cNPwd !== '' &&
          this.admin.nPwd == this.admin.cNPwd) {
          upPwd({
            noid: localStorage.getItem('mid'),
            pwd: this.admin.nPwd,
            oldpwd: this.admin.oPwd,
          }).then(res => {
            this.updateReturn(res.code)
            if(res.code == 0){
              this.isPwdBox = false
            }
            // if (res.code == 0) {
            //   Toast({message: '更改成功!'})
            // } else {
            //   Toast({message: '更改失败!'})
            // }
          })
        }
        this.admin.oPwd = ''
        this.admin.nPwd = ''
        this.admin.cNPwd = ''
      },
      exitLogin() {
        localStorage.removeItem('mLogin')
        localStorage.removeItem('mid')
        this.$router.push({
          path: '/managerLogin'
        })
      },
    	off() {
    		// this.offIndex = false
    	},
	    tabTwoa() {
	      this.isShowa = true
	      this.isShowb = false
        this.navDefault = true
	    },
	    tabTwob() {
	      this.isShowa = false
	      this.isShowb = true
        this.navDefault = false
	    },
	}
  }
</script>

<style scoped>
.pwd-box{

}
.pwd-box .input-item{
  display: flex;
  align-items: center;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 3px;
  overflow: hidden;
  color: #676767;
}
.pwd-box .input-item input{
  border: 0;
  height: 30px;
  outline: none;
}
.exit{
  width: 80%;
  margin: 0 auto;
}
.exit-btn{
  width: 100%;
  border: 0;
  border-radius: 5px;
  height: 50px;
  line-height: 50px;
  background: #fb3f69;
  color: #fff;
  font-size: 20px;
}
.orange{
  color: orange;
}
.own-box{
  width: 90%;
  margin: 0 auto;
}
.own-item{
  display: flex;
  height: 50px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  overflow: hidden;
  color: #7b7b7b;
}
.own-item:last-child{
  border-bottom: none;
}
.transitionRouter-enter-active,
.transitionRouter-leave-active {
    transition: all 0.4s;
}

.transitionRouter-enter,
.transitionRouter-leave{
    opacity: 0;
    /* transform: translate3d(0, 100%, 0); */
    transform: translateX(100%);
}
.img1{
  width:100%;
  height: 170px;
  margin-bottom: 80px;
}
.homepage-name{
  height: 120px;
  width: 90px;
  text-align: center;
  position:absolute;
  top: 130px;
  left: 50%;
  margin-left: -45px;
  z-index: 10;
}
.img2{
  height: 90px;
  width: 90px;
}
.homepage{
position:relative;
}
.green,.blue{
  width: 42%;
  float: left;
  border-radius:5px;
  color:white;
  text-align: center;
  font-size: 14px;
  padding-bottom: 4%;
  padding-top: 2%;
  margin-bottom: 10px;
}
.green{
  margin-left: 5%;
}
.img3{
  width: 50%;
}
.blue{
  margin-left: 6%;
}
.color1{
  background-color: green;
  background: -webkit-linear-gradient(left bottom, #17ca2d , #67fc79);
  background: -o-linear-gradient(left right, #17ca2d , #67fc79);
  background: -moz-linear-gradient(left right, #17ca2d , #67fc79);
  background: linear-gradient(to top right, #17ca2d , #67fc79);
}
.color2{
  background-color: blue;
  background: -webkit-linear-gradient(left bottom, #166aca , #66d2fc);
  background: -o-linear-gradient(left right, #166aca , #66d2fc);
  background: -moz-linear-gradient(left right, #166aca , #66d2fc);
  background: linear-gradient(to top right, #166aca , #66d2fc);
}
.color3{
  background-color: purple;
  background: -webkit-linear-gradient(left bottom, #aa89bd , #e1b4fb);
  background: -o-linear-gradient(left right, #aa89bd , #e1b4fb);
  background: -moz-linear-gradient(left right, #aa89bd , #e1b4fb);
  background: linear-gradient(to top right, #aa89bd , #e1b4fb);
}
.color4{
  background-color: pink;
  background: -webkit-linear-gradient(left bottom, #f19ec2 , #fbd5e5);
  background: -o-linear-gradient(left right, #f19ec2 , #fbd5e5);
  background: -moz-linear-gradient(left right, #f19ec2 , #fbd5e5);
  background: linear-gradient(to top right, #f19ec2 , #fbd5e5);
}
.color5{
  background-color: red;
  background: -webkit-linear-gradient(left bottom, #f19149 , #f9c196);
  background: -o-linear-gradient(left right, #f19149 , #f9c196);
  background: -moz-linear-gradient(left right, #f19149 , #f9c196);
  background: linear-gradient(to top right, #f19149 , #f9c196);
}
.color6{
  background-color: orange;
  background: -webkit-linear-gradient(left bottom, #fbcb0f , #fdeca9);
  background: -o-linear-gradient(left right, #fbcb0f , #fdeca9);
  background: -moz-linear-gradient(left right, #fbcb0f , #fdeca9);
  background: linear-gradient(to top right, #fbcb0f , #fdeca9);
}


</style>
