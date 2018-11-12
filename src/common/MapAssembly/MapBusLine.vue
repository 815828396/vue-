<!--
	* ()该示例主要流程分为三个步骤
	* 1. 首先调用公交路线查询服务(lineSearch)
	* 2. 根据返回结果解析，输出解析结果(lineSearch_Callback)
	* 3. 在地图上绘制公交线路
 -->
<template>
	<!-- 公交路线组件 -->
	<div class="map-container">
		<transition name="isPanel">
			<div id="panel" @click="closePanel" v-show="isPanel"></div>
		</transition>
		<div style="position: fixed; top: 0; right: 0; z-index: 3000" v-show="!isPanel"><span class="grow1 fz12 fzright" @click="myloaction">我的位置：起始位置可能存在偏差,目前路线为骑行路线</span></div>
		<!-- <p class="fzright fz12"><span style="background:white"><i class="iconfont icon-dizhi fz12"></i>我的位置</span></p> -->
		<!-- 路线搜索框 -->
		<div class="map-search">
			<div class="map-search-inner" v-if="isSearchBox">
				<p class="fzright fz12">我的位置：其实位置可能存在偏差</p>
				<label for="sa" class="map-search-label">
					<span class="fz12">出发点:</span>
					<input id="sa" type="text" class="fz12" placeholder="请输入出发点" v-model="sAddress">
				</label>
				<label for="ea" class="map-search-label">
					<span class="fz12">终止点:</span>
					<input id="ea" type="text" class="grow1 fz12" placeholder="请输入终点" v-model="eAddress">
				</label>
			</div>
			<!-- 指针 -->
			<div class="cycle-box">
				<div class="cycle cycle-me"
					@click="goback"
					:class="{'op-cycle-right': isshow}"><i class="iconfont icon-zuojiantou"></i></div>
				<div class="cycle cycle-search iconfont"
					@click="showMenu">
					<i class="iconfont" :class="isshow ? 'icon-htmal5icon21' : 'icon-ego-menu'"></i>
				</div>
				<div class="cycle cycle-back"
					@click="isPanel = true"
					:class="{'op-cycle-right': isshow}"><i class="iconfont icon-dizhi"></i></div>
			</div>
		</div>
		<div id="mapContainer"></div>
	</div>
</template>

<script>
	import AMap from 'AMap'
	import { Toast } from 'mint-ui'
	import GD from '@/assets/js/mapJS/mapbusLine'
	export default {
		data () {
			return {
				resline: '', // 路线结果集合
				isshow: false,
				isSearchBox: false,
				isPanel: true,
				startAddress: '',
				eAddress: '',
				posi: {}
			}
		},
		mounted () {
			// 用户授权，获取经纬度
			this.getLocationpoint().then(res => {
				// 服务器端地图
				this.posi.lat = res.latitude
				this.posi.lng = res.longitude
				// alert(res.latitude+'；'+res.longitude)
				const map = new AMap.Map('mapContainer', {
					resizeEnable: true,
					center: [res.longitude, res.latitude], // 移动端中心点
					zoom: 14
				})
				// 规划当前用户选择的兼职路线
				this.reverseGeocoder(map, this.posi).then(startAddress => {
					this.ridingRoutemehod(map, startAddress)
				})
			}).catch(error => {
				// PC端地图
				// this.posi.lat = res.latitude
				// this.posi.lng = res.longitude
				const map = new AMap.Map('mapContainer', {
					resizeEnable: true,
					center: [114.466935, 38.033378], // dev web中心点
					zoom: 14
				})
				// 规划当前用户选择的兼职路线
				this.reverseGeocoder(map, {lng: 114.466935, lat: 38.033378}).then(startAddress => {
					this.ridingRoutemehod(map, startAddress)
				})
			})

			// 搜索公交牌号路线
			this.buslineSearch({
				pageSize: 5
			}, 536, this.linesearch_callback)
		},
		methods: {
			/**
			 * 公交路线查询方法
			 * @param  Object{} searchobj 搜索信息
			 * @param  String   bus       公交牌号
			 * @param  Function cb        返回结果处理函数
			 */
			buslineSearch (searchobj, bus, cb) {
				// 默认搜索对象
				let __searchObj = {}
				let __defaultBuslinesearch = {
					pageIndex: 1, // 当前页码
					pageSize: 3, //
					city: '石家庄',
					extensions: 'all'
				}

				// 是否传入 searchobj 对象
				if (typeof searchobj === 'object') {
					searchobj = {}
				} else if (typeof String(searchobj) === 'string') {
					bus = arguments[0]
					cb = arguments[1]
					console.warn('[XING_ZI_DINGYI] arguments[0] linesearch is null')
				}

				Object.assign(__searchObj, __defaultBuslinesearch, searchobj)

				// 公交路线查询
				AMap.service(['AMap.LineSearch'], () => {
					let linesearch = new AMap.LineSearch(__searchObj)
					linesearch.search(String(bus), (status, result) => {
						// 查询成功
						if (status === 'complete' && result.info === 'OK') {
							cb(result)
						}
						// 未查询到相关路线
						if (status === 'no_data') {
							Toast('抱歉未找到相关路线,尝试从新搜索')
						}
					})
				})
			},
			linesearch_callback (d) {
				let {info: isOk, lineInfo: line} = d

				if (isOk === 'OK' && line.length > 0) {
					// Toast('已为您找到相关路线')
				}
			},
			ridingRoutemehod (_map, startAddress) {
				AMap.plugin('AMap.Riding', () => {
					let riding = new AMap.Riding({
		        map: _map,
		        panel: "panel"
			    })
					riding.search([{keyword: startAddress}, {keyword: this.$route.query.endAddress}], (status, result) => {
						// console.log(status)
						// console.log(result)
						Toast({
							position: 'bottom',
							message: '地理位置可能存在偏差'
						})
					})
				})
			},
			closePanel (e) {
				if (e.target.id === 'panel') {
					this.isPanel = false
				}
			},
			getLocationpoint () {
				return new Promise((resolve, reject) => {
					// 仅支持 https
					// 获取经纬度
					if (window.navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(
							posi => {
								// 用户同意获取地理位置
								// Toast(posi)
								resolve(posi.coords)
								console.log(this.posi)
							},
							error => {
								reject(error)
								// console.log(eror)
								// if (error.code === 1) {
								// 	Toast('火星朋友,您已拒绝我们获取您的位置。')
								// }
							}
						)
					} else {
						Toast('抱歉!暂时无法获得您的定位,请确保打开GPS')
					}
				})
			},
			reverseGeocoder (map, lnglat) {
				return new Promise((resolve, reject) => {
					let that = this
					console.log([lnglat.lng, lnglat.lat])
					AMap.plugin('AMap.Geocoder', function () {
						let geocoder = new AMap.Geocoder()
						let lnglatArr = [lnglat.lng, lnglat.lat]
						geocoder.getAddress(lnglatArr, (status, result) => {
							if (status === 'complete' && result.info === 'OK') {
								resolve(result.regeocode.formattedAddress)
								// that.startAddress = result.regeocode.formattedAddress
								// console.log(that.startAddress)
							}
						})
						// console.log(geocoder)
					})
				})
			},
			myloaction () {
				this.getLocationpoint()
			},
			showMenu () {
				this.isshow = !this.isshow
				this.isSearchBox = false
			},
			showSearchBox () {
				this.isSearchBox = !this.isSearchBox
			},
			goback () {
				this.$router.back(-1)
			}
		}
	}
</script>

<style scoped>
@import '../../assets/css/maps';
#panel .plan-nobus {
	max-height: 200px;
	overflow: auto;
}
</style>
