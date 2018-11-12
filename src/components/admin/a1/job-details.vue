<template>
  <!-- 后台管理 控制兼职情况 -->
  <div class="jobDetails sec-page">
    <!-- s header -->
    <my-head :titleConfig="titleConfig"></my-head>
    <!--  -->
    <div class="job-box wauto mt10" v-if='false'>
      <div style="width: 85px;"><img src="../../../assets/images/icon.jpg" alt="" width="100%"></div>
      <div class="desc grow1">
        <p>发传单</p>
        <p>vivo专卖店</p>
        <p>石家庄桥西区</p>
      </div>
      <div class="money">
        <span>100元/天</span>
      </div>
    </div>

    <div class="real-head">
      <div class="wauto search-box">
        <div>盈享兼职</div>
        <div class="grow1 real-search">
          <i @click='searchPart' class="iconfont icon-chaxun ml10 mr10"></i>
          <input class="real-input" type="search" v-model='partName' refs='input1' placeholder="输入兼职信息" @keyup.13=searchPart()>
        </div>
      </div>
    </div>
    <zi-filter @showFilterData="showFilterData" @filterState="judgeState"></zi-filter>
    <div class="job-list" ref="wrapper">
      <mt-loadmore 
      :top-method="loadTop" 
      @top-status-change="handleTopChange" ref="loadmore">
        <ul class="wauto">
          <li class="job-list_item com-border-bottom" v-for="(v, k) in as" :key="k" @click="jumpDetails(v)">
            <!-- 工作描述 -->
            <div class="job-box">
              <div style="width: 85px; flex-shrink: 0"><img src="../../../assets/images/icon.jpg" alt="" width="100%"></div>
              <div class="desc grow1">
                <p class="fz14"><b>{{v.name}}</b></p>
                <p class="span-msc">
                  <i class="iconfont icon-shizhong mr10 fz12"></i>
                  {{v.type}}
                </p>
                <p class="span-msc"><i class="iconfont icon-dizhi mr10"></i>{{v.address}}</p>
              </div>
              <div class="desc-right" style="max-width: 100px; flex-shrink: 0;">
                <div class="fz12"><span class="money">{{v.price}}</span>元/天</div>
                <div v-if='false' class="fzcenter renzheng fz12">
                  <i class="iconfont icon-zhengshu"></i><span>认证保障</span>
                </div>
              </div>
            </div>
            <!-- 工作福利 -->
            <div class="job-welfare mt10">
              <span>{{v.sex}}</span>
              <!-- <span>as</span> -->
              <span>学历不限</span>
            </div>
          </li>
        </ul>
      </mt-loadmore>
      <!-- <h4 class="com-border-bottom">人气兼职</h4> -->
    </div>
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
    data() {
      return {
        titleConfig: {
          title: '兼职管理',
          isBack: true
        },
        pageInfo: {
          size: 0, // 当前页数
          arr: [], // 分页数组
          cont: 6 //每页数量
        },
        list: 2,
        transitionName: '',
        partList: [],
        bottomStatus: '',
        wrapperHeight: 0,
        topStatus: '',
        //wrapperHeight: 0,
        translate: 0,
        moveTranslate: 0,
        partName: ''
      }
    },
    computed: {
      as () {
        return this.partList
      }
    },
    components: {
      myHead,
      ziFilter
    },
    created() {
      this._selPartAll()
    },
    methods: {
      judgeState(e) {
        console.log(e)
        this.partList = this._normalizeJobs(e)
      },
      showFilterData (a) {
        // console.log(a)
        this.partList = this._normalizeJobs(a)
      },
      handleTopChange(status) {
        // 监听上啦状态函数
        this.moveTranslate = 1;
        this.topStatus = status;
        console.log(this.topStatus)
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
          name: 'jobManage',
          query: e
        })
      },
      searchPart() {
        console.log(this.partName)
        selPartAll({name:this.partName}).then(res => {
          console.log(res)
          let s_part = res.res.filter(v => v.state === 0)
          console.log(s_part)
          this.partList = this._normalizeJobs(s_part)
        })
      },
      // 初始查询
      _selPartAll () {
        Indicator.open()
        selPartAll().then(res => {
          let __Res = res.res.filter(v => v.state === 0)
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
      clearHistory () {
        this.delSearchHisstory()
      },
      ...mapMutations({
        setSearchHistory: 'SET_SEARCH_HISTORY',
        delSearchHisstory: 'DEL_SEARCH_HISTORY'
      })
    },
  }
</script>

<style scoped>
@import url('../../../assets/css/user-manage.css');
.jobDetailds{
 
}
/* job list */
.job-list{
  padding-bottom: 70px;
}
.job-list_item:not(:last-child){
  margin: 10px 0;
  padding-bottom: 13px;
  border-bottom: 1px solid #ccc;
}
.job-box{
  display: flex;
}
.job-box .desc{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;
}
.job-box .money{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fbcb0f;
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
.span-msc{
  font-size: 12px;
  color: #7d7d7d;
}
</style>