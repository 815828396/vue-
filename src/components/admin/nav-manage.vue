<template>
  <div>
    <!-- 这是管理页面 -->
    <!-- <router-view></router-view> -->
    <!-- <transition :name="transitionName" mode="in-out">
      <keep-alive>
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition> -->

    <div v-if='offIndex' class="homepage">
	    <img src="../../assets/images/banner.jpg" class="img1">
	    <div class="homepage-name">
	      <img src="../../assets/images/me.png" class="img2">
	      <p class="homepage-p">盈享兼职</p>
	    </div>
	    <div v-if='isShowa' class="a clearfix">
	      <div @click='off' class="green color1">
	      	<router-link tag='div' to='/adminIndex/adminManage'>
		        <img src="../../assets/images/guanli.png" class="img3">
		        <p>管理员管理</p>
	        </router-link>
	      </div>
	      <div @click='off' class="blue color2">
		      <router-link tag='div' to='/adminIndex'>
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
		      <router-link tag='div' to='/adminIndex/'>
		        <img src="../../assets/images/guanli.png" class="img3">
		        <p>反馈管理</p>
		      </router-link>
	      </div>
	      <div @click='off' class="blue color6">
		      <router-link tag='div' to='/adminIndex/blackList'>
		        <img src="../../assets/images/guanli.png" class="img3">
		        <p>黑名单管理</p>
		      </router-link>
	      </div>
	    </div>
	    <div v-if='isShowb' class="a clearfix own">
	    	<h4>个人信息展示</h4>
	    	<div>
	    		{{admin.name}}
	    	</div>
	    </div>

	    <div style="height:80px;"></div>
	    <div style="position:fixed;bottom:0;left:0;width:100%">
	      <mt-navbar style="border-top:1px solid #ccc;margin-top:20px;">
	      <!-- @click="tabTwo" -->
	        <mt-tab-item id="1" style="border-right:1px solid #ccc;">
	          <i class="iconfont icon-caidan ml10" style="font-size: 22px;"></i>
	          <span class="fz16" @click="tabTwoa">功能</span>
	        </mt-tab-item>
	        <mt-tab-item id="2">
	          <i class="iconfont icon-wode ml10" style="font-size: 22px;"></i>
	          <span class="fz16" @click="tabTwob">我的</span>
	        </mt-tab-item>
	      </mt-navbar>
	    </div>

	  </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        transitionName: '',
        offIndex: true,
        isShowa: true,
      	isShowb: false,
      	admin: {
      		name: 'xx',
      		tel: '000'
      	}
      }
    },
    created() {
    	this.showManage()
    },
    methods: {
    	showManage() {
    		let mid = localStorage.getItem('mid')
    	},
    	off() {
    		// this.offIndex = false
    	},
	    tabTwoa() {
	      this.isShowa = true
	      this.isShowb = false      
	    },
	    tabTwob() {
	      this.isShowa = false
	      this.isShowb = true
	    },
	}
  }
</script>

<style scoped>
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

.img1{
  width:100%;
  height: 170px;
}
.homepage-name{
height: 120px;
width: 90px;
text-align: center;
position:absolute;
top: 130px;
left: 50%;
margin-left: -45px;
}
.img2{
  height: 90px;
  width: 90px;
}
.homepage{
position:relative;
}
.green{
  width: 42%;
  float: left;
  margin-left: 5%;
  border-radius:5px;
  color:white;
  text-align: center;
  font-size: 14px;
  padding-bottom: 6%;
  padding-top: 2%;
}
.img3{
  width: 50%;
}
.blue{
  float: left;
  width: 42%;
  margin-left: 6%;
  border-radius:5px;
  color:white;
  text-align: center;
  font-size: 14px;
  padding-bottom: 6%;
  padding-top: 2%;

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
.a{
  margin-top: 70px;
}
.a div{
  margin-top: 20px;
}
</style>
