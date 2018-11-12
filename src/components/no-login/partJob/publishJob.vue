<template>
  <div class="work-base">
    <!-- head -->
    <my-head :titleConfig="titleConfig"></my-head>
    <!-- 模块页面描述 -->
    <div class="wauto module-desc">
      <p class="fz12"><span class="module-title">1. 报名员工: </span>查看所发布的兼职,职位报名情况信息</p>
      <p class="fz12"><span class="module-title">2. 我录用的: </span>职位信息被录用人员信息</p>
      <!-- <p class="fz12"><span class="module-title">3. 完工：</span></p> -->
    </div>
    <!-- filter-box -->
    <div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">报名员工</mt-tab-item>
        <mt-tab-item id="2">我录用的</mt-tab-item>
        <mt-tab-item id="3">完工</mt-tab-item>
        <!--<mt-tab-item id="4">评论</mt-tab-item>-->
      </mt-navbar>
    </div>
    <!-- list -->
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <!-- 审核 -->
      <mt-tab-container-item id="1">
        <div class="job-list">
          <!-- 未获得数据 -->
          <div class="fzcenter mt10" v-if="pulishJobList.length === 0">
            <img src="../../../assets/images/nodata.png" alt="" width="80%">
            <p class="mt10" style="color: #a0a0a0;">抱歉!没有东西喽</p>
          </div>
          <ul class="wauto">
            <li class="apply-item com-border-bottom mt10" v-for="(v, k) in pulishJobList" :key="k">
              <h4>{{v.name}}</h4>
              <p class="span-msc mtb5 pl5">
                <span>
                  <i class="iconfont icon-shizhong mr5 fz12"></i>{{v.type}}
                </span>
                <span>
                  <i class="iconfont icon-dizhi"></i>{{v.address}}
                </span>
              </p>
              <p class="flexbox">
                <span class="fz12 grow1">
                  <b class="price-msg">{{v.price}}</b>元/{{v.unit}}
                  <span class="ml10"><i class="iconfont icon-shizhong fz12 mr10"></i>{{v.stime}}</span>
                </span>
                <!-- 该工作的报名人数 -->
                <span class="fz12 circle" style="font-weight: bold" data-state="0" @click="lookJobDetails(v, $event)">
                  <i class="iconfont icon-xiaoxi fz12"></i>
                  {{v.jobDetails.jobEnrolmentLength}}
                </span>
              </p>
            </li>
          </ul>
        </div>
      </mt-tab-container-item>
      <!-- 录用 -->
      <mt-tab-container-item id="2">
        <!-- 发布兼职头部搜索框 -->
        <!-- <div class="real-head">
          <div class="wauto inner">
            <div>盈享兼职</div>
            <div class="grow1 real-search">
              <i class="iconfont icon-chaxun ml10 mr10"></i>
              <input class="real-input" type="text" placeholder="输入管理员昵称">
            </div>
          </div>
        </div> -->
        <div class="job-list">
          <!-- 未获得数据 -->
          <div class="fzcenter mt10" v-if="luyongJobList.length === 0">
            <img src="../../../assets/images/nodata.png" alt="" width="80%">
            <p class="mt10" style="color: #a0a0a0;">抱歉!没有东西喽</p>
          </div>
          <ul class="wauto">
            <li class="apply-item com-border-bottom mt10" v-for="(v, k) in luyongJobList" :key="k">
              <h4>{{v.name}}</h4>
              <p class="span-msc mtb5 pl5">
                <span>
                  <i class="iconfont icon-shizhong mr5 fz12"></i>{{v.type}}
                </span>
                <span>
                  <i class="iconfont icon-dizhi mr10"></i>{{v.address}}
                </span>
              </p>
              <p class="flexbox">
                <span class="fz12 grow1">
                  <b class="price-msg">{{v.price}}</b>元/{{v.unit}}
                  <span class="ml10"><i class="iconfont icon-shizhong fz12 mr10"></i>{{v.stime}}</span>
                </span>
                <!-- 该工作的报名人数 -->
                <span class="fz12 circle" style="font-weight: bold" data-state="1" @click="lookJobDetails(v, $event)">
                  <!--<i class="iconfont icon-xiaoxi fz12"></i>-->
                  {{v.jobDetails.jobEnrolmentLength}}
                </span>
              </p>
            </li>
          </ul>
        </div>
      </mt-tab-container-item>
      <!-- 完工 -->
      <mt-tab-container-item id="3">
        <div class="job-list">
          <!-- 未获得数据 -->
          <div class="fzcenter mt10" v-if="jiesuanJobList.length === 0">
            <img src="../../../assets/images/nodata.png" alt="" width="80%">
            <p class="mt10" style="color: #a0a0a0;">抱歉!没有东西喽</p>
          </div>
          <ul class="wauto">
            <li class="apply-item com-border-bottom mt10" v-for="(v, k) in jiesuanJobList" :key="k">
              <h4>{{v.name}}</h4>
              <p class="span-msc mtb5 pl5">
                <span>
                  <i class="iconfont icon-shizhong mr5 fz12"></i>{{v.type}}
                </span>
                <span>
                  <i class="iconfont icon-dizhi mr10"></i>{{v.address}}
                </span>
              </p>
              <p class="flexbox">
                <span class="fz12 grow1">
                  <b class="price-msg">{{v.price}}</b>元/{{v.unit}}
                  <span class="ml10"><i class="iconfont icon-shizhong fz12 mr10"></i>{{v.stime}}</span>
                </span>
                <!-- 该工作的报名人数 -->
                <span class="fz12 circle" style="font-weight: bold" data-state="3" @click="lookJobDetails(v, $event)">
                  <!--<i class="iconfont icon-xiaoxi fz12"></i>-->
                  {{v.jobDetails.jobEnrolmentLength}}
                </span>
              </p>
            </li>
          </ul>
        </div>
      </mt-tab-container-item>
      <!-- 评论 -->
      <!--<mt-tab-container-item id="4">-->
        <!--&lt;!&ndash; 没有数据时 错误 &ndash;&gt;-->
        <!--<div class="fzcenter mt10">-->
          <!--<img src="../../../assets/images/nodata.png" alt="没有数据" width="80%">-->
          <!--<p class="mt10" style="color: #a0a0a0;">抱歉!没有东西喽</p>-->
        <!--</div>-->
      <!--</mt-tab-container-item>-->
    </mt-tab-container>
  </div>
</template>

<script>
  import myHead from '@/common/head/my-head'
  import ziFilter from '@/common/filter/filter'
  import { selPartAll } from '@/assets/js/api/axios/apiNoLogin'
  import { selWorksheet } from '@/assets/js/api/axios/apiLogin'
  import { createJob } from '@/assets/js/Classjob'
  import { Indicator, Toast } from 'mint-ui'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        selected: '1',
        titleConfig: {
          title: '工作反馈',
          isBack: true
        },
        pulishJobList: [], // 报名兼职列表
        luyongJobList: [], // 录用兼职列表
        jiesuanJobList: [], // 结算兼职列表
        jobEnrolment: ''
      }
    },
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    mounted () {
      // 审核 0
      this._initMypublishJob(this.pulishJobList, 0)
      // 录用 1
      this._initMypublishJob(this.luyongJobList, 1)
      // 完工 2
      this._initMypublishJob(this.jiesuanJobList, 3)
    },
    methods: {
      lookJobDetails (val, e) {
        if (e.target.nodeName.toLowerCase() === 'i') return
        let stateid = e.target.dataset.state
        console.log(stateid)
        if (val.jobDetails.jobEnrolmentLength === 0) {
          this.$messagebox('抱歉!还没有消息')
          return
        }
        this.$router.push({
          name: 'publishJobSum',
          query: {
            id: val.noid,
            stateid: stateid
          }
        })
      },
      _initMypublishJob (ARG_Data, ARG_State) {
        // console.log(ARG_Data)
        // arguments: _Data
        // 正在审核用户
        Indicator.open()
        selPartAll({
          merchant_id: this.token
        }).then(res => {
          // this.pulishJobList = this._normalizeJobs(res.res)
          // 获取该商户发布的所有兼职
          return res.res
        }).then(partList => {
          // 筛选出审核通过的工作
          let _this = this
          let _passList = partList.filter(v => v.state !== 1)
          _passList.forEach((item, k) => {
            (function (item, k) {
              selWorksheet({
                part_id: item.noid
              }).then(res => {
                // 筛选出状态ARG_State的用户
                let jobEnrolmentLength = (res.res).filter(v => v.state === ARG_State).length
                let _res = {}
                Object.assign(_res, {jobDetails: {jobEnrolmentLength}}, createJob(_passList[k]))
                if (_res.jobDetails.jobEnrolmentLength > 0) {
                  ARG_Data.push(_res)
                }
              })
            }(item, k))
          })
        })
      },
      _normalizeJobs (list) {
        let ret = []
        list.forEach(item => {
          ret.push(createJob(item))
        });
        return ret
      },
      sortArr (_arr) {
        return _arr.sort((a, b) => {
          return (a.jobDetails.jobEnrolmentLength + b.jobDetails.jobEnrolmentLength)
        })
      }
    },
    components: {
      myHead,
      ziFilter
    }
  }
</script>

<style scoped>
/* 模块描述 */
.module-desc {
  padding: 10px 0;
  color: #7d7d7d;
}
.module-desc .module-title{
  color: #585858;
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
  font-size: 12px;
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
/* real-head */
.real-head{
    padding: 10px 0;
    background: white;
    box-shadow: 0 2px 5px #ccc;
}
.inner{
    display: flex;
    align-items: center;
}
.real-search{
    display: flex;
    align-items: center;
    margin: 0 10px;
    background: #eee;
}
.real-input{
    width: 100%;
    height: 40px;
    outline: none;
    background: transparent;
    border: none;
}
.status{
  padding: 5px 15px;
  background: #fbcb0f;
  color: black;
  font-size: 12px;
  border-radius: 5px;
}
.price-msg{
  color: #f60;
  margin-right: 3px;
  font-size: 18px;
}
.span-msc{
  font-size: 12px;
  color: #646464;
}
.apply-item{
  position: relative;
  padding-bottom: 5px;
}
.circle{
  position: absolute;
  top: 30%;
  right: 20px;
  padding: 5px 21px;
  color: white;
  background: #ea792b;
  border: transparent;
  border-radius: 10px;
}
</style>
