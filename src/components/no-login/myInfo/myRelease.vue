<template>
	<div class="my-info-child">
		<my-head :titleConfig="titleConfig"></my-head>
		<!-- container -->
    <div class="container">
      <div class="job-list" ref="wrapper" v-if='true'>
        <mt-loadmore
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded" :auto-fill="false"
        @top-status-change="handleTopChange" ref="loadmore">
          <ul class="wauto">
            <li class="job-list_item com-border-bottom" v-for="(v, k) in partList" :key="k" @click.prevent="jumpDetails(v)">
              <!-- 工作描述 -->
              <div class="job-box">
                <div style="width: 85px; flex-shrink: 0;"><img src="../../../assets/images/icon.jpg" alt="" width="100%"></div>
                <div class="desc grow1">
                  <p class="fz14"><b>{{v.name}}</b></p>
                  <p class="span-msc">
                    <i class="iconfont icon-shizhong mr5 fz12"></i>
                    {{v.type}}
                  </p>
                  <p class="span-msc"><i class="iconfont icon-dizhi mr5"></i>{{v.address}}</p>
                </div>
                <div class="desc-right" style="max-width: 100px; flex-shrink: 0">
                  <div class="fz12"><span class="money">{{v.price}}</span>元/{{v.unit}}</div>
                  <div class="fzcenter renzheng fz12"><i class="iconfont icon-zhengshu"></i><span>认证保障</span></div>
                </div>
              </div>
              <!-- 工作福利 -->
              <div class="job-welfare mt10">
                <span>{{v.sex}}</span>
                <!-- <span>as</span> -->
                <span>学历不限</span>
              </div>
            </li>
            <li class="dixian">下拉刷新</li>
          </ul>
        </mt-loadmore>
        <!-- <h4 class="com-border-bottom">人气兼职</h4> -->
      </div>
      <!-- 测试 v2.0 -->
      <!-- 精彩职位 -->
      <!-- 高薪职位 -->
      <ul
        v-if='false'
			  v-infinite-scroll="loadMore"
			  infinite-scroll-disabled="loading"
			  infinite-scroll-distance="5">
			  <li v-for="(item, k) in list" :key="k"
			  	style="height: 50px; background: #eef; margin-bottom: 5px;">
			  	{{ item }}
			  </li>
			</ul>
    </div>
	</div>
</template>

<script type="text/javascript">
	import myHead from '@/common/head/my-head'
	import { Indicator, Toast } from 'mint-ui'
	import { mapMutations, mapGetters } from 'vuex'
	import { selPartAll } from '@/assets/js/api/axios/apiNoLogin'
	import { createJob } from '@/assets/js/Classjob'
	export default {
		components: {
      myHead
    },
		data() {
			return {
				titleConfig: {
          title: '兼职信息',
          isBack: true
        },
        pageInfo: {
          size: 0, // 当前页数
          arr: [], // 分页数组
          cont: 5 //每页数量
        },
        allLoaded: false,
        partList: [],
        // list: ['1','2','3','1','2','3','12','52','43','xx','xx.','status']
			}
		},
		mounted () {
      this._selPartAll()
    },
		created() {

		},
		methods: {
			// loadMore() {
			//   this.loading = true;
			//   setTimeout(() => {
			//   	let last = this.list[this.list.length - 1];
			//   	console.log(last)
			//     for (let i = 1; i <= 5; i++) {
			//       this.list.push(last + i);
			//     }
			//     this.loading = false;
			//   }, 2500);
			// },
			back () {
        this.$router.back(-1);
      },
      loadBottom() {
        // 上拉加载
        // console.log('xx')
        this.more();// 上拉触发的分页查询
        // this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      more() {
      	let maxend = Math.floor(this.pageInfo.arr.length / this.pageInfo.cont)
        Indicator.open()
        // console.log(maxend)
        this.pageInfo.size >= maxend
          ? (maxend && Toast('没有东西了哦!'))
          : this.pageInfo.size++
        console.log(this.pageInfo)
        let end = this.pageInfo.cont * (this.pageInfo.size + 1) > this.pageInfo.arr.length
          ? this.pageInfo.arr.length
          : this.pageInfo.cont * (this.pageInfo.size + 1)
        console.log(end)
        // console.log(this.pageInfo.arr.length)
        if (end < this.pageInfo.arr.length) {
        	this.partList = this.partList.concat(this.pageInfo.arr.slice(this.pageInfo.cont * this.pageInfo.size, end))
        } else {
        	this.partList = this.pageInfo.arr
        }
        // 调用axios数据
        setTimeout(() => {
          this.$refs.loadmore.onBottomLoaded()
          Indicator.close()
        }, 200)
        // 分页查询
      },
      isHaveMore() {
      	// 是否还有下一页，如果没有就禁止上拉刷新
        this.allLoaded = true; //true是禁止上拉加载
        if(isHaveMore){
          this.allLoaded = false;
        }
      },
      handleTopChange(status) {
        // 监听上啦状态函数
        this.moveTranslate = 1;
        this.topStatus = status;
      },
      jumpDetails (e) {
        this.$router.push({
          name: 'jobDetail',
          query: e
        })
      },
      // 初始查询
      _selPartAll () {
        Indicator.open()
        selPartAll().then(res => {
        	// console.log(res)
          let __Res = res.res.filter(v => v.state === 0)
          if (res) {
            Indicator.close()
          }
          this.pageInfo.arr = this._normalizeJobs(__Res)
          this.partList = this._normalizeJobs(__Res).slice(this.pageInfo.cont * this.pageInfo.size, this.pageInfo.cont * (this.pageInfo.size + 1))
        })
      },
      _normalizeJobs (list) {
        let ret = []
        let merchant_id = localStorage.getItem('token_noid')
        list.forEach(item => {
        	// console.log(item)
        	if (item.merchant_id == merchant_id) {
        		ret.push(createJob(item))
        	}
        });
        return ret
      },
		},
	}
</script>

<style type="text/css">
	.my-info-child{
	  z-index: 300;
	  width: 100%;
	  min-height: 100%;
	  height: auto;
	  background: #eee;
	}
		/* job list */
	.job-list{
	  background: white;
	  overflow: hidden;
	}
	.job-list:not(:first-child){
	  margin-top: 10px;
	}
	.job-list_item:not(:last-child){
	  margin: 10px 0;
	  padding-bottom: 13px;
	}
	.job-box{
	  display: flex;
	}
	.job-box .desc{
	  display: flex;
	  flex-direction: column;
	  justify-content: space-around;
	  margin: 0 3px 0 10px;
	}
	.job-box .desc p{
	  /* max-width: 100px; */
	  overflow: hidden;
	  /* white-space: nowrap; */
	  text-overflow: ellipsis;
	}
	.desc-right{
	  max-width: 100px;
	  display: flex;
	  flex-direction: column;
	  justify-content: space-between;
	}
	.job-box .money{
	  color: #f60;
	  margin-right: 3px;
	  font-weight: bold;
	  font-size: 18px;
	}
	.student-job{
	  padding: 10px 0;
	  background: url('../../../assets/images/manage.jpg');
	  background-size: 100%;
	}
	.student-job h5{
	  text-shadow: 0 0 5px #8a8a8a;
	}
	.student-job .share{
	  color: #808080;
	  text-shadow: 0 0 5px #8a8a8a;
	}
	.job-welfare span{
	  padding: 3px 5px;
	  border-radius: 5px;
	  border: 1px solid #d8d8d8;
	  color: #717171;
	  font-size: 12px;
	}
	.noPart{
	  position: relative;
	  margin-top: 20px;
	  text-align: center;
	}
	.noPart:after{
	  content: "";
	  position: absolute;
	  bottom: -10px;
	  left: 50%;
	  width: 50px;
	  height: 1px;
	  transform: translateX(-25px);
	  background: #f4cb08
	}
	.span-msc{
	  color: #7d7d7d;
	  font-size: 12px;
	}
</style>
