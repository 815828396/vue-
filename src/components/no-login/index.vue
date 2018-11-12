<template>
  <div class="">
    <!-- 搜索头部 -->
    <search-box
      @hideIndexModule="hideIndexModule"></search-box>
    <!-- banner -->
    <div class="banner" v-if="!isNowSearch">
      <zi-swiper class="banner-box">
        <div class="swiper-slide">
          <img src="../../assets/images/manage.jpg" alt="" width="100%">
        </div>
        <div class="swiper-slide">
          <img src="../../assets/images/manage.jpg" alt="" width="100%">
        </div>
        <div class="swiper-slide">
          <img src="../../assets/images/manage.jpg" alt="" width="100%">
        </div>
      </zi-swiper>
    </div>
    <!-- 分类模块 -->
    <div class="model-class swiper-model" v-if="!isNowSearch" >
      <!-- <div class="flexbox mtb10 com-border-bottom" style="justify-content: space-around">
          <span class="fz12">商业合作</span>
          <span class="fz12">商业合作</span>
          <span class="fz12">商业合作</span>
          <span class="fz12">商业合作</span>
          <span class="fz12">商业合作</span>
          <span class="fz12">商业合作</span>
      </div> -->
      <div class="model-inner  swiper-model-inner init_animate">
        <router-link tag="div" to="/partJob" class="model-box"
          v-for="(v, k) in modelArr" :key="k">
          <div><img src="../../assets/images/model_pingtai.png" alt="" width="30px"></div>
          <span class="fz12">{{v.name}}</span>
        </router-link>
      </div>
      <!-- 成为商户 -->
      <router-link to="/registerManage" tag="div" class="com-border-top student-job fzcenter">
        <h5>如何成为盈享商户?</h5>
        <p class="share">享受一站式服务平台</p>
      </router-link>
    </div>
    <!-- container -->
    <div class="container" v-if="!isNowSearch">
      <div class="title fzcenter">
        <span class="title-love">猜你喜欢</span>
      </div>
      <!-- 置顶职位 -->
      <div class="job-list" ref="wrapper">
        <p class="p-title wauto">今日置顶</p>
          <ul class="wauto pb5">
            <li class="job-list_item com-border-bottom" v-for="(v, k) in topPartList" :key="k" @click.prevent="jumpDetails(v)">
              <!-- 工作描述 -->
              <div class="job-box">
                <!-- <div style="width: 85px; flex-shrink: 0;"><img src="../../assets/images/icon.jpg" alt="" width="100%"></div> -->
                <div class="job-box-time">{{filterMonth(v.stime)}}:</div>
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
                  <div class="fzcenter renzheng fz12"
                    v-show="v.merchantinfo.vip === 0"><i class="iconfont icon-zhengshu"></i><span>认证保障</span></div>
                </div>
              </div>
              <!-- 工作福利 -->
              <div class="job-welfare mt10">
                <span>性别:{{v.sex}}</span>
              </div>
            </li>
          </ul>
        <!-- <h4 class="com-border-bottom">人气兼职</h4> -->
      </div>
      <!-- 每日推荐 -->
      <div class="job-list" ref="wrapper">
        <p class="p-title wauto">每日推荐<em>(s-0906:该工作的开始时间)</em></p>
        <mt-loadmore
        :top-method="loadTop" :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded" :auto-fill="false"
        @top-status-change="handleTopChange" ref="loadmore">
          <ul class="wauto">
            <li class="job-list_item com-border-bottom" v-for="(v, k) in partList" :key="k" @click.prevent="jumpDetails(v)">
              <!-- 工作描述 -->
              <div class="job-box">
                <!-- <div style="width: 85px; flex-shrink: 0;"><img src="../../assets/images/icon.jpg" alt="" width="100%"></div> -->
                <div class="job-box-time">{{filterMonth(v.stime)}}:</div>
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
                  <div class="fzcenter renzheng fz12"
                    v-show="v.merchantinfo.vip === 0"><i class="iconfont icon-zhengshu"></i><span>认证保障</span></div>
                </div>
              </div>
              <!-- 工作福利 -->
              <div class="job-welfare mt10">
                <span>性别:{{v.sex}}</span>
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
    </div>
    <!-- s footer -->
    <div class="footer mt10" v-if="!isNowSearch">
      <div class="fzcenter">
        <p class="fz12">©版权所有 盈享™ 石家庄协盈网络科技有限公司</p>
        <p class="fz12">冀ICP备18008827号</p>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchBox from '@/components/no-login/partJob/searchPartBox'
  import ziSwiper from '@/common/swiper/slot-swiper'
  import { Indicator, Toast } from 'mint-ui'
  import { mapMutations, mapGetters } from 'vuex'
  import { selPartAll } from '@/assets/js/api/axios/apiNoLogin'
  import { createJob } from '@/assets/js/Classjob'
  export default {
    data() {
      return {
        pageInfo: {
          size: 0, // 当前页数
          arr: [], // 分页数组
          cont: 6, //每页数量
          end: ''
        },
        modelArr: [
          { name: '更多职位' },
          { name: '附近职位' },
          { name: '平台担保' },
          { name: '会员企业' }
        ],
        allLoaded: false,
        texthistory: '',
        searchlist: [],
        source: null,
        isNotSearch: false,
        isNowSearch: false,
        partList: [],
        topPartList: [],
        bottomStatus: '',
        wrapperHeight: 0,
        topStatus: '',
        translate: 0,
        moveTranslate: 0,
        hotHistory: ['快递','发单'],
      }
    },
    mounted () {
      this._selPartAll()
    },
    computed: {
      ...mapGetters([
        'searchHistory'
      ])
    },
    methods: {
      hideIndexModule (hidestate) {
        this.isNowSearch = hidestate
      },
      handleTopChange(status) {
        // 监听上啦状态函数
        this.moveTranslate = 1;
        this.topStatus = status;
      },
      sliceList() {
        let maxend = Math.floor(this.pageInfo.arr.length / this.pageInfo.cont)
        Indicator.open()
        this.pageInfo.size >= maxend
          ? (maxend && Toast('没有东西了哦!'))
          : this.pageInfo.size++
        this.pageInfo.end = this.pageInfo.cont * (this.pageInfo.size + 1) > this.pageInfo.arr.length
          ? this.pageInfo.arr.length
          : this.pageInfo.cont * (this.pageInfo.size + 1)
        // return end
      },
      loadTop() {
        this.sliceList()
        this.partList = this.pageInfo.arr.slice(this.pageInfo.cont * this.pageInfo.size, this.pageInfo.end)
        // 调用axios数据
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded()
          Indicator.close()
        }, 200)
      },
      loadBottom() {
        this.sliceList()
        if (this.pageInfo.end < this.pageInfo.arr.length) {
          this.partList = this.partList.concat(this.pageInfo.arr.slice(this.pageInfo.cont * this.pageInfo.size, this.pageInfo.end))
        } else {
          this.partList = this.pageInfo.arr
        }
        // 调用axios数据
        setTimeout(() => {
          this.$refs.loadmore.onBottomLoaded()
          Indicator.close()
        }, 200)
      },
      jumpDetails (e) {
        this.$router.push({
          path: '/jobDetail',
          query: e
        })
      },
      // 筛选出月份
      filterMonth (str) {
        return str.slice(5, 10).replace('-', '/')
      },
      // 初始查询
      _selPartAll () {
        Indicator.open()
        selPartAll().then(res => {
          let __Res = res.res.filter(v => v.state !== 1)
          if (res) {
            Indicator.close()
          }
          this.pageInfo.arr = this._normalizeJobs(__Res)
          this.topPartList = this.pageInfo.arr.filter(v => v.colligate === 1).slice(0, 6)
          this.partList = this._normalizeJobs(__Res).slice(this.pageInfo.cont * this.pageInfo.size, this.pageInfo.cont * (this.pageInfo.size + 1))
        })
      },
      _normalizeJobs (list) {
        let ret = []
        list.forEach(item => {
          ret.push(createJob(item))
        });
        return ret
      }
    },
    components: {
      ziSwiper,
      SearchBox
    }
  }
</script>

<style scoped>
.init_animate{
  animation: bounce 1.3s
}
/* s banner */
.banner-box{
  height: 168px;
}
.swiper-slide{
  background: #ccc;
}
.container .title{
  position: relative;
  padding: 8px 0;
  background: #eee;
}
.container .title-love{
  position: relative;
  font-weight: bold;
}
.container .title-love:before,
.container .title-love:after{
  content: '';
  position: absolute;
  width: 61px;
  height: 1px;
  background: #ababab;
}
.container .title-love:before{
  top: 8px;
  left: -68px;
}
.container .title-love:after{
  top: 8px;
  right: -68px;
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
.job-box-time{
  color: #fb0;
  width: 60px;
  height: 75px;
  line-height: 75px;
  text-align: center;
  flex-shrink: 0;
  font-weight: bold;
  white-space: nowrap;
  transform: scale(1.3);
}
.job-list_item:nth-child(2n) .job-box-time {
  color: #ea7028;
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
  background: url('../../assets/images/manage.jpg');
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
.model-class{
  overflow: hidden;
}
.model-inner{
  display: flex;
  justify-content: space-between;
}
.model-box{
  width: 200px !important;
  padding: 10px 0;
  text-align: center;
  /*margin-left: 20px;*/
}
.footer {
  padding: 30px 0 10px 0;
  margin: 10px 0 50px 0;
  background: #eee;
}
.p-title{
  position: relative;
  padding-left: 10px;
  margin-top: 5px;
  height: 20px;
  line-height: 20px;
  box-sizing: border-box;
  font-size: 12px;
}
.p-title:before{
  position: absolute;
  top: 4px;
  left: 0;
  content: "";
  width: 5px;
  height: 12px;
  background: #fbcb0f;
}
.white{
  background: white !important;
}
</style>
