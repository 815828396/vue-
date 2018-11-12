<template>
	<div class="register-wrap">
    <!-- s back -->
    <div class="back">
      <div class="wauto back-inner">
        <div class="icon" @click="back" v-if="titleConfig.isBack"><i class="iconfont icon-zuojiantou fz12"></i><span class="fz12">返回</span></div>
        <div class="title grow1 fzcenter">{{titleConfig.title}}</div>
        <i class="iconfont" :class="titleConfig.icon"></i>
      </div>
    </div>
		<!-- 商户banner -->
		<div class="manage-banner">
			<img src="../../assets/images/manage.jpg" alt="" width="100%">
			<div class="manage-group">
				<div class="manage-g-item">
					<p class="manage-g-num">105</p>
					<p class="fz12">商户入驻</p>
				</div>
				<div class="manage-g-item">
					<p class="manage-g-num">3</p>
					<p class="fz12">覆盖城市</p>
				</div>
			</div>
		</div>
		<!-- 注册成为商户 -->
		<div class="register form-wrap">
			<div class="com-border-bottom">
				<h5 class="p-title wauto">如何成为商户</h5>
			</div>
			<ul class="manage-list wauto">
				<li>1. 提供营业资质</li>
				<li>2. 确保公司的资质符合</li>
			</ul>
		</div>
		<div class="register form-wrap">
			<div class="com-border-bottom">
				<h5 class="p-title wauto">平台规则</h5>
			</div>
			<ul class="manage-list wauto">
				<li>1. 保证您所发布的兼职信息<span class="tcolor">真实、</span><span class="tcolor">有效</span></li>
				<li>2. 保证兼职信息的<span class="tcolor">合法</span>原则</li>
				<li>3. 禁止向用户收取任何无关费用.</li>
				<li>4. 商户应该遵守国家法律、行政法规、部门规章等规性文件。对任何涉嫌违反国家法律、行政法规、部门规章等规范性文件的行为，本规定已经有规定的，适用本规则；本规定尚未规定的，盈享平台有权酌情处理。但是盈享平台对商户的处理不排除其应尽的法律责任。</li>
				<li>5. 盈享平台有权对违法商户的兼职信息进行下架,严重者对商户取消使用资格</li>
			</ul>
		</div>
		<!-- 同意规则 -->
		<div class="sure-rules">
			<div class="rules-footer">
				<button class="agree-btn" @click="popupVisible = true"><i class="iconfont icon-yanzhengma2 mr10"></i>同意入驻</button>
			</div>
		</div>

		<!-- 弹出框 -->
		<mt-popup
			class="agree-prop"
		  v-model="popupVisible"
		  position="bottom">
		  	<h5 class="fzcenter">当您看到此消息时,表示您已同意我们的入驻规则.</h5>
		  	<p class="agree-desc">是否确定入住平台,成为商户</p>
		  	<div class="flexbox" style="padding: 0 10px">
		  		<!-- <button class="agree-btn" style="background: #c7c7c7">取消</button> -->
		  		<button class="agree-btn" @click="jumpInertManage" style="background: #fbcb0f">确定</button>
		  	</div>
		</mt-popup>
	</div>
</template>

<script>
  import myHead from '@/common/head/my-head'
	export default {
		data () {
			return {
				titleConfig: {
					title: '如何成为商户',
					isBack: true
				},
				popupVisible: false
			}
		},
		methods: {
			jumpInertManage () {
				this.$router.push({
					path: '/insManage'
				})
			},
      back () {
        this.$router.back(-1)
      }
		}
	}
</script>

<style scoped>
.back{
  height: 40px;
	margin-bottom: 7px;
	box-shadow: 0 3px 5px #ccc;
  line-height: 40px;
	font-weight: bold;
  /* color: white; */
  /* background: #fbcb0f; */
	/* background: radial-gradient(#ccc, #989898); */
}
.back-inner{
  display: flex;
}
/*商户banner*/
.manage-banner{
	position: relative;
}
.manage-group{
	position: absolute;
	bottom: 3px;
	display: flex;
	width: 100%;
	background: rgba(0,0,0,.2);
}
.manage-g-item{
	text-align: center;
	flex-grow: 1;
	line-height: 20px;
	color: #e0e0e0;
	border-right: 1px dotted white;
}
.manage-g-num{
	font-weight: bold;
	/* color: #fbcb0f; */
	color: #cecece;
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
  /* background: #fbcb0f; */
	background: #cecece;
}
.manage-list li{
	padding-left: 10px;
	margin: 5px 0;
	font-size: 12px;
	color: #676767
}
/*同意入住*/
.agree-btn{
	width: 100%;
	padding: 10px 0;
	border: none;
	color: white;
	/* background: #fbcb0f; */
	background: radial-gradient(#ccc, #a2a2a2);
}
.agree-prop{
	width: 100%;

}
.agree-desc{
	text-indent: 2em;
	color: #5a5a5a;
	margin: 10px 0;
}
</style>
