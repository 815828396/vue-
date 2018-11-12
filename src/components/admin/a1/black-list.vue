<template>
	<div class="user-black">
		<!-- head -->
	    <my-head :titleConfig="titleConfig"></my-head>
	    <!-- 黑名单 头部 -->
	    <div class="real-head">
	      <div class="wauto search-box">
	        <div>盈享兼职</div>
	        <div class="grow1 real-search">
	          <i @click='searchUser' class="iconfont icon-chaxun ml10 mr10"></i>
	          <input class="real-input" type="search" v-model='usersName' ref='inputBl' placeholder="输入用户昵称" @keyup.13=searchUser()>
	        </div>
	      </div>
	    </div>
	    <!-- 黑名单 列表 -->
	    <div class="real-list">
	      <h5 class="wauto mb10">审批列表</h5>
	      <ul>
	        <li class="real-list-item wauto" v-for="(v,i) in blackList">
	          <div class="real-img"><img src="../../../assets/images/img-head.jpg" alt="" width="50px;"></div>
	          <div class="grow1 ml20 real-desc">
	            <p>
	              <i class="iconfont icon-dianhua mr10"></i><span>{{v.tel}}</span>
	            </p>
	            <p>
	              <i class="iconfont icon-dianhua mr10"></i><span>{{v.name}}</span>
	            </p>
	            <p>
	              <i class="iconfont icon-dianhua mr10"></i><span>备注：</span><span>{{v.blacklistModel.info}}</span>
	            </p>
	          </div>
	          <div class="real-btn-group">
	            <span class="sure" @click="liftBlack(v)">解除拉黑</span>
	          </div>
	        </li>
	      </ul>
	    </div>

	</div>
</template>

<script type="text/javascript">
  	import myHead from '@/common/head/my-head'
  	import {Toast, Indicator, MessageBox} from 'mint-ui'
	export default {
		components: {
			myHead
		},
		data() {
			return {
				titleConfig: {
          title: '黑名单管理',
          isBack: true
        },
        dialogConfig: {
          sureText: '确认',
          cancelText: '取消'
        },
        blackList: [],
        usersName: '',
        noid: ''
			}
		},
		created() {
			this.showUser()
		},
		methods: {
			showUser(name) {
				// console.log('1')
				this.$axios({
					method: 'get',
					url: 'user/selS',
					params: {
						state: '0',
            name: '' || name
          }
				}).then((res) => {
					console.log(res)
					if (res.code == 0) {
						this.blackList = res.res
						if (this.blackList.length == 0) {
							Toast({
								message: '暂无信息!'
							})
						}
					} else {
						Toast({
							message: '获取信息失败'
						})
					}
				})
			},
			searchUser() {
				console.log(this.usersName)
				this.showUser(this.usersName)
				// this.$ref.inputBl.blur()
			},
			liftBlack(e) {
				console.log(e.noid)
				// this.noid = e.noid
				MessageBox.confirm('确认执行此操作?').then(res => {
          // console.log(res)
          if (res) {
            // console.log('解除拉黑')
            this.$axios({
		          method: 'put',
		          url: 'user/updS',
		          params: {
		            noid: e.noid,
		            state: 1,
		            info: ''
		          }
		        }).then((res) => {
		          // console.log(res)
		          if (res.code == 0) {
		            Toast({
		              message: '用户已解除拉黑!'
		            })
		            this.showUser()
		          } else {
		            Toast({
		              message: '处理信息失败!'
		            })
		          }
		        })
          }
        }).catch(res => {
        	console.log(res)
        })
			},
			sd (a) {
        this.isDialog = false
      },
      showDialog () {
        this.isDialog = true
      },
		},
	}
</script>

<style type="text/css">
	@import url('../../../assets/css/user-manage.css');
	.user-black{
	  width: 100%;
	  min-height: 100%;
	  height: auto;
	  position: absolute;
	  top: 0;
	  left: 0;
	  z-index: 100;
	  background: #fff;
	}
	.real-desc p{
		margin-bottom: 5px;
	}
</style>