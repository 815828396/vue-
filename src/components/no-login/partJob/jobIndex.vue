<template>
  <div style="padding-bottom: 50px;">
    <!-- head -->
    <my-head :titleConfig="titleConfig"></my-head>
    <!-- filter -->
    <zi-filter @showFilterData="showFilterData"></zi-filter>
    <div class="job-list" ref="wrapper">
      <mt-loadmore
      :top-method="loadTop"
      @top-status-change="handleTopChange" ref="loadmore">
        <ul class="wauto">
          <li class="job-list_item com-border-bottom" v-for="(v, k) in as" :key="k" @click="jumpDetails(v)">
            <!-- 工作描述 -->
            <div class="job-box">
              <!-- <div style="width: 85px; flex-shrink: 0"><img src="../../../assets/images/icon.jpg" alt="" width="100%"></div> -->
              <div class="job-box-time">{{filterMonth(v.stime)}}:</div>
              <div class="desc grow1">
                <p class="fz14"><b>{{v.name}}</b></p>
                <p class="span-msc">
                  <i class="iconfont icon-shizhong mr10 fz12"></i>
                  {{v.type}}
                </p>
                <p class="span-msc"><i class="iconfont icon-dizhi mr10"></i>{{v.address}}</p>
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
      </mt-loadmore>
      <div v-if="as.length === 0" class="wauto mt10 fzcenter">
        <img src="../../../assets/images/nodata.png" alt="" width="100%">
        <p class="fz12">抱歉没有找到相关信息</p>
        <button class="wauto" @click="resetGetall">重新获取</button>
      </div>
      <!-- <h4 class="com-border-bottom">人气兼职</h4> -->
    </div>

    <!-- 自路由 -->
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
  import myHead from '@/common/head/my-head'
  import ziFilter from '@/common/filter/filter'
  import { Indicator, Toast } from 'mint-ui'
  import { mapMutations, mapGetters } from 'vuex'
  import { selPartAll } from '@/assets/js/api/axios/apiNoLogin'
  import { createJob } from '@/assets/js/Classjob'
  export default {
    data () {
      return {
        pageInfo: {
          size: 0, // 当前页数
          arr: [], // 分页数组
          cont: 6 //每页数量
        },
        titleConfig: {
          title: '兼职',
          isBack: false
        },
        list: 2,
        transitionName: '',
        partList: [],
        bottomStatus: '',
        wrapperHeight: 0,
        topStatus: '',
        //wrapperHeight: 0,
        translate: 0,
        moveTranslate: 0
      }
    },
    computed: {
      as () {
        return this.partList
      }
    },
    created () {
      this._selPartAll()
    },
    methods: {
      showFilterData (a) {
        this.partList = this._normalizeJobs(a)
      },
      handleTopChange(status) {
        // 监听上啦状态函数
        this.moveTranslate = 1;
        this.topStatus = status;
      },
      loadTop() {
        let maxend = Math.floor(this.pageInfo.arr.length / this.pageInfo.cont)
        Indicator.open()
        this.pageInfo.size >= maxend
          ? (maxend && Toast('没有东西了哦!'))
          : this.pageInfo.size++
        let end = this.pageInfo.cont * (this.pageInfo.size + 1) > this.pageInfo.arr.length ? this.pageInfo.arr.length : this.pageInfo.cont * (this.pageInfo.size + 1)
        this.partList = this.pageInfo.arr.slice(this.pageInfo.cont * this.pageInfo.size, end)
        // 调用axios数据
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded()
          Indicator.close()
        }, 200)
      },
      jumpDetails (e) {
        this.$router.push({
          path: '/jobDetail',
          query: e
        })
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
          this.partList = this._normalizeJobs(__Res).slice(this.pageInfo.cont * this.pageInfo.size, this.pageInfo.cont * (this.pageInfo.size + 1))
          // console.log(this.partList)
        })
      },
      _normalizeJobs (list) {
        let ret = []
        list.forEach(item => {
          ret.push(createJob(item))
        });
        return ret
      },
      searchBtn () {
        this.setSearchHistory({
          history: this.texthistory
        })
      },
      resetGetall () {
        // 重新获取数据
        window.location.reload()
      },
      clearHistory () {
        this.delSearchHisstory()
      },
      // 筛选出月份
      filterMonth (str) {
        return str.slice(5, 10).replace('-', '/')
      },
      ...mapMutations({
        setSearchHistory: 'SET_SEARCH_HISTORY',
        delSearchHisstory: 'DEL_SEARCH_HISTORY'
      })
    },
    components: {
      myHead,
      ziFilter
    }
  }
</script>

<style scoped>

/* job list */
.job-list{
  /* padding-bottom: 70px; */
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
  transform: scale(1.3);
}
.job-list_item:nth-child(2n) .job-box-time {
  color: #ea7028;
}
.job-box .desc{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;
}
.job-box .money{
  color: #f60;
  font-size: 18px;
  font-weight: bold;
  margin-right: 3px;
}
.job-welfare span{
  padding: 3px 5px;
  border-radius: 5px;
  border: 1px solid #d8d8d8;
  color: #717171;
  font-size: 12px;
}
.jobdate{
  font-size: 12px;
  text-align: right;
  color: #ccc;
}
.child-view{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
.desc-right{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.span-msc{
  font-size: 12px;
  color: #7d7d7d;
}
</style>
