<template>
	<div class="shoper">
		<!-- head -->
    <my-head :titleConfig="titleConfig"></my-head>
    <!-- 商户 头部 -->
    <div class="real-head">
      <div class="wauto search-box">
        <div>盈享兼职</div>
        <div class="grow1 real-search">
          <i @click='searchUser' class="iconfont icon-chaxun ml10 mr10"></i>
          <input class="real-input" type="search" v-model='shoperName' refs='input1' placeholder="输入用户昵称" @keyup.13=searchUser()>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="m-con" ref='searchBox'>
      <div class="m-con mb20">
        <div class="real-list">
          <h5 class="wauto mb10">审批列表</h5>
          <ul>
            <li class="real-list-item wauto" v-for="(v,i) in shopers"
            	:class="{'over-shoper': v.state == 1}"
            >
              <div class="real-img"><img src="../../../assets/images/img-head.jpg" alt="" width="50px;"></div>
              <div class="grow1 ml20 real-desc">
                <p>
                  <i class="iconfont icon-dianhua mr10"></i><span >{{v.tel}}</span>
                </p>
                <p>
                  <i class="iconfont icon-wode mr10"></i><span >{{v.name}}</span>
                </p>
              </div>
              <div class="real-btn-group">
                <span class="sure" v-if="v.state == 0" 
                	:class="{'s-inline': v.state == 0 }"
                	@click.prevent='overShop(v)'>下线</span>
                <span class="sure" v-if="v.state == 1" @click.prevent='onlineShop(v)'>上线</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
	</div>
</template>

<script type="text/javascript">
  import myHead from '@/common/head/my-head'
  import {Toast, Indicator, MessageBox} from 'mint-ui'
	export default{
		components: {
			myHead
		},
		data() {
			return {
				titleConfig: {
	        title: '商户管理',
	        isBack: true,
	      },
	      dialogConfig: {
	        sureText: '确认',
	        cancelText: '取消'
	      },
	      shoperName: '',
	      shopers: []
			}
		},
		created() {
			this.showShoper()
		},
		methods: {
			showShoper(name) {
				this.$axios({
					url: 'merchant/selA',
					method: 'get',
					params: {
						name: '' || name
					}
				}).then((res) => {
					console.log(res)
					if (res.code == 0) {
						// Toast({
						// 	message: '查询成功!'
						// })
						this.shopers = res.res
					} else {
						Toast({
							message: '查询失败!'
						})
					}
				})
			},
			searchUser() {
				// console.log('xx')
				this.showShoper(this.shoperName)
				// this.$refs.input1.blur()
			},
			overShop(e) {
				MessageBox.confirm('确认执行此操作?').then(res => {
					if (res) {
						this.$axios({
							url: 'merchant/upd',
							method: 'PUT',
							params: {
								noid: e.noid,
								state: '1'
							}
						}).then(res => {
							console.log(res)
							if (res.code == 0) {
								Toast({
									message: '商户已下架！'
								})
								this.showShoper()
							}else{
								Toast({
									message: '用户操作失败！'
								})
							}
						})
					}
				}).catch(res => {
					if (res) {
						console.log(res)
					}
				})
			},
			onlineShop(e) {
				MessageBox.confirm('确认执行此操作?').then(res => {
					if (res) {
						this.$axios({
							url: 'merchant/upd',
							method: 'PUT',
							params: {
								noid: e.noid,
								state: '0'
							}
						}).then(res => {
							console.log(res)
							if (res.code == 0) {
								Toast({
									message: '通过审核！'
								})
								this.showShoper()
							}else{
								Toast({
									message: '用户操作失败！'
								})
							}
						})
					}
				}).catch(res => {
					if (res) {
						console.log(res)
					}
				})	
			}
		}
	}
</script>

<style type="text/css">
@import url('../../../assets/css/user-manage.css');
.shoper{
  width: 100%;
  height: auto;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background: #fff;
}
.over-shoper{
	background: hsla(0,0%,95%,.5) no-repeat 60% 0;
	background-image: url('../../../assets/images/Unaudited.jpg');
	background-size: 90px 65px;
}
.s-inline{
	background: #fb2f20 !important;
}
</style>