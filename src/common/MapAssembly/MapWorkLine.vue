<!--
	* 路线规划导航
	* 1. 首先调用公交路线查询服务(lineSearch)
	* 2. 根据返回结果解析，输出解析结果(lineSearch_Callback)
	* 3. 在地图上绘制公交线路
-->
<template>
	<div class="map-container">
		
		<!-- 地图wrap -->
		<div id="mapContainer"></div>
	</div>
</template>

<script>
	import AMap from 'AMap'
	export default {
		data () {
			return {
				
			}
		},
		mounted () {
			const map = new AMap.Map('mapContainer', {
				resizeEnable: true,
				center: [114.466935, 38.033378], // dev web中心点
				zoom: 14
			})
		},
		methods: {
			walkLine () {
				// 步行路线
			},
			transferLine () {
				// 公交路线
				// 公交站点查询
			},
			ridingLine () {
				// 骑行路线
			}
		}
	}
</script>

<style scoped>
@import '../../assets/css/maps'
</style>
