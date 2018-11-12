<template>
	<div class="ins_part">
    <!-- 头部 -->
    <my-head :titleConfig="titleConfig"></my-head>
		<div class="form-wrap">
			<div class="form-wrap-box">
				<h6 class="com-border-bottom">基本兼职信息</h6>
				<mt-field label="名称:" v-model="partInfo.name" placeholder="请输入兼职名称"></mt-field>
				<mt-field class="com-border-bottom" label="人数:" v-model="partInfo.hirnumb" type="number" placeholder="人数"></mt-field>
				<!-- <mt-field label="工作时间" v-model="partInfo.labour" type="date" placeholder="请输入兼职名称"></mt-field> -->
				<div class="com-border-bottom flex-box" style="align-items: center" @click="changeType">
					<p class="sex-title" style="width: 105px;">结算周期：</p>
					<span class="color">{{partInfo.setcycle}}</span>
				</div>
				<mt-field label="薪资:" v-model="partInfo.salary" type="number" placeholder="元"><span class="fz12">/{{priceState}}</span></mt-field>
				<div class="com-border-bottom" style="display: flex">
					<p class="sex-title">要求：</p>
					<mt-radio v-model="partInfo.sex"
						:options="['男', '女', '不限']">
					</mt-radio>
				</div>
				<mt-field class="com-border-bottom" label="工作内容" type="textarea" rows="4" v-model="partInfo.content" placeholder="描述发布信息"></mt-field>
			</div>
			<div class="form-wrap-box">
				<h6 class="com-border-bottom">默认信息</h6>
				<div class="com-border-bottom" style="display: flex">
					<p class="sex-title">类型：</p>
					<mt-radio v-model="partInfo.type"
						:options="['兼职', '全职']">
					</mt-radio>
				</div>
				<mt-field label="地点" v-model="partInfo.job_address" placeholder="工作地点"></mt-field>
				<div class="mt10">
					<p class="sex-title com-border-bottom" @click="choseDatestart">开始时间:<span class="ml10">{{partInfo.times}}</span></p>
					<p class="sex-title com-border-bottom" @click="choseDateend">结束时间:<span class="ml10">{{partInfo.timee}}</span></p>
				</div>
			</div>
			<div class="mt10" style="background: white; padding: 10px 0;"><span class="release" @click="releaseBtn">发布</span></div>
		</div>
		<mt-datetime-picker
			ref="pickerS"
			type="datetime"
			@confirm="surestime">
		</mt-datetime-picker>
		<mt-datetime-picker
			ref="pickerE"
			type="datetime"
			@confirm="sureetime">
		</mt-datetime-picker>
		<!-- 结算周期 -->
		<mt-popup
			v-model="typeVisible"
			position="bottom"
			class="w100">
			<mt-picker class="grow1" :slots="slots" @change="typeChange"></mt-picker>
		</mt-popup>

	</div>
</template>

<script>
	import { addPart } from '@/assets/js/api/axios/apiNoLogin'
	import until from '@/assets/js/common/common'
	import myHead from '@/common/head/my-head'
	import { mapGetters } from 'vuex'
	import { Toast, Indicator } from 'mint-ui'
	export default {
		data () {
			return {
				typeVisible: false,
		        titleConfig: {
		          title: '添加职位',
		          isBack: true
				},
				slots: [
					{
						className: 'grow1',
						values: ['日结', '周结', '月结'],
						defaultIndex: 1
					}
				],
				slotsWork: [
					{
						className: 'grow1',
						values: [ '2017-03-05', '2018-03-05', '2019-03-05'],
						defaultIndex: 1
					}, {
						divider: true,
						content: '-',
						className: 'slot2'
					}, {
						className: 'grow1',
						values: [ '2017-03-05', '2018-03-05', '2019-03-05'],
						defaultIndex: 1
					}
				],
				partInfo: {
					name: '',
					salary: '日结',
					type: '兼职', // 兼职 全职
					// labour: '', // 工作天数，目前没有涉及到工资问题，没有传入
					setcycle: '',
					hirnumb: '',
					sex: '不限',
					content: '',
					times: '',
					timee: '',
					job_address: '',
					unit: '' // 天数
					// state: ''
				},
				sex: '男'
			}
		},
		computed: {
			priceState () {
				let ret = ''
				if (this.partInfo.setcycle === '日结') 	ret = '日'
				if (this.partInfo.setcycle === '周结') 	ret = '周'
				if (this.partInfo.setcycle === '月结') 	ret = '月'
				return ret
			},
			...mapGetters([
				'token'
			])
		},
		methods: {
			choseDatestart () {
				this.$refs.pickerS.open()
			},
			choseDateend () {
				this.$refs.pickerE.open()
			},
			surestime (e) {
				let analy_date = until.analyDate(new Date(Date.parse(e)))
				this.partInfo.times = analy_date
			},
			sureetime (e) {
				let analy_date = until.analyDate(new Date(Date.parse(e)))
				this.partInfo.timee = analy_date
			},
			typeChange (picker, values) {
				this.partInfo.setcycle = values[0]
			},
			timesChange(picker, values) {
				if (values[0] > values[1]) {
					picker.setSlotValue(1, values[0]);
				}
				this.partInfo.times = values[0]
				this.partInfo.timee = values[1]
			},
			releaseBtn () {
				this.partInfo.unit = this.priceState === '日'
					? '1'
					: (this.priceState === '周'
						? '2'
						: this.priceState === '月'
							? '3'
							: '0')
				if (!this.valiteData(this.partInfo)) {
					Toast('请保证填写完全!')
					return
				}
				this.partInfo.sex = this.partInfo.sex === '男'
					? '0'
					: (this.partInfo.sex === '女' ? '1' : '2')
				this.partInfo.setcycle = this.partInfo.setcycle === '日结'
					? '0'
					: (this.partInfo.setcycle === '周结' ? '1' : '2')
				this.partInfo.salary = this.partInfo.salary
				this.partInfo.type = this.partInfo.type === '兼职' ? '0' : '1'
				this.partInfo.merchant_id = this.token
				console.log(this.partInfo)
				Indicator.open()
				addPart(this.partInfo).then(res => {
					console.log(res)
					if (res.code === 0) {
						Toast('添加成功')
						this.$router.back(-1)
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
			},
			changeType () {
				this.typeVisible = true
			}
		},
		components: {
			myHead
		}
	}
</script>

<style scoped>
.form-wrap{
	background: #efefef;
}
.form-wrap-box{
	margin-top: 10px;
	background: white;
}
.form-wrap-box h6{
	padding: 5px 10px;
	box-sizing: border-box;
}
.release{
  display: block;
  width: 80%;
  line-height: 40px;
  margin: 10px auto 0;
  text-align: center;
  border-radius: 5px;
  background: #fbcb0f;
}
.sex-title{
	color: #757675;
	padding: 10px;
}
.mint-cell{
	color: #757675;
}
.form-wrap-box .mint-radiolist{
	display: flex;
}
.form-wrap-box .mint-cell-wrapper{
	background: none;
}
.color{
	color: #757675;
}
</style>
