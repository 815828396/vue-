<template>
  <div class="company-wrap">
    <!-- 头部 -->
    <my-head :titleConfig="titleConfig"></my-head>
    <!-- 公司详情页面 -->
    <div class="company-details" v-if="!isFilter">
      <!-- 公司头部信息 -->
      <zi-swiper class="company-head" :swiperConfig="swiperConfig">
        <div class="swiper-slide">
          <div class="
          flexbox">
            <div class="company-img mr10"><img src="../../../../assets/images/img-head.jpg" alt="" width="60px"></div>
            <div class="company-info">
              <div><h4>{{companyinfo.name}}</h4></div>
              <div class="fz12 ctime"><span class="ctitle">经营时间:</span>{{operateShow(companyinfo.join_time)}}</div>
              <div class="fz12 ctime"><span class="ctitle">注册地址:</span>{{companyinfo.address}}</div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="
          flexbox">
            <div class="company-info">
              <div><h4>审核状态:{{companyinfo.state}}</h4></div>
              <div class="fz12 ctime"><span class="ctitle">城市:</span>{{companyinfo.city}}</div>
              <div class="fz12 ctime"><span class="ctitle">行业类型:</span>{{companyinfo.industry}}</div>
            </div>
          </div>
        </div>
      </zi-swiper>
      <!-- 公司底部详情信息 -->
      <div class="company-bottom">
        <!-- 该公司信息 -->
        <div class="wauto">
          <h4 class="com-border-bottom company_base">公司基本信息</h4>
          <ul class="mt10 wauto com-base-list">
            <li class="clearfix">
              <span class="ctitle fl">企业类型:</span>
              <p class="cont">{{companyinfo.type}}</p>
            </li>
            <li class="clearfix">
              <span class="ctitle fl">经营状态:</span>
              <p class="cont">{{companyinfo.operat}}</p>
            </li>
            <li class="clearfix">
              <span class="ctitle fl">经营期限:</span>
              <p class="cont">{{companyinfo.duration}}年</p>
            </li>
            <li class="clearfix">
              <span class="ctitle fl">经营范围:</span>
              <p class="cont">{{companyinfo.scope}}</p>
            </li>
            <li class="clearfix">
              <span class="ctitle fl">注册资本:</span>
              <p class="cont">{{companyinfo.state}}</p>
            </li>
            <li class="clearfix" v-show="isHeight">
              <span class="ctitle fl">登记机关</span>
              <p class="cont">{{companyinfo.regist}}</p>
            </li>
            <li class="clearfix" v-show="isHeight">
              <span class="ctitle fl">社会信用代码:</span>
              <p class="cont">{{!companyinfo.creditcode ? '未填写' : companyinfo.creditcode}}</p>
            </li>
            <!-- <li class="clearfix" v-show="isHeight">
              <span class="ctitle fl">公司简历:</span>
              <p class="cont">公司作为XXX设计李艳 按时设计李艳 按时设计李艳 按时设计李艳 按时设计李艳
                按时设计李艳 按时设计李艳 按时设计李艳 按时设计李艳 按时设计李艳 按时</p>
            </li> -->
            <li class="fzcenter fz12">
              <span @click="isHeight = true" v-show="!isHeight">
                <span class="com-border-bottom">更多</span><i class="iconfont icon-jiantou9 fz12 ml10"></i>
              </span>
              <span @click="isHeight = false" v-show="isHeight">
                <span class="com-border-bottom">收起</span><i class="iconfont icon-iconfonticontrianglecopy fz12 ml10"></i>
              </span>
            </li>
          </ul>
        </div>
        <div class="mt10" style="height: 10px; background: #faf8ee"></div>
        <!-- 其他招聘公司 -->
        <div class="wauto">
          <div class="flexbox job-info">
            <h4 class="com-border-bottom company_base">其他相关公司信息</h4>
            <span class="fz12 grow1 fzright">更多...</span>
          </div>
          <div v-for="(v, k) in recommondJobList" :key="k" class="flexbox com-border-bottom" style="align-items: center">
            <div class="company-img mr10"><img src="../../../../assets/images/img-head.jpg" alt="" width="60px"></div>
            <h4>{{v.name}}</h4>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出层-没有公司信息 -->
    <transition name="cominfo">
      <div class="filter-company"
        v-if="isFilter">
        <div class="filter-com-inner wauto">
          <h5 class="com-border-bottom fzcenter tcolor">完善用户信息</h5>
          <ul class="filter-com-list wauto mt10">
            <li>1. 因受国家实名制管理，请入驻企业认真填写真实注册信息。我们会在3-5个工作日内审核通过，通过后请提供企业相关证件。</li>
            <li>2. 请尽可能的提供完全,所有相关公司资质</li>
            <li>3. 将于下一版本公司通过审核后，才可以进行信息发布与平台的使用</li>
            <li>4. 公司需要提供真实、准确、即时、完整的注册信息；维护并及时更新注册信息以保持其真实、准确、即时、完整，若您提供的信息不真实、不准确、不即时、不完整，盈享有权暂停或终止对您的服务。</li>
          </ul>
          <div class="fzcenter mt10 flexbox">
          <button class="sureBtn cancelBtn" type="button" name="button" @click="cancelBtn">暂不完善</button>
            <button class="wauto sureBtn" type="button" @click="sureBtn">
              <i class="iconfont icon-xiugai1 mr10"></i>前去完善
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import ziSwiper from '@/common/swiper/slot-swiper'
  import myHead from '@/common/head/my-head'
	import until from '@/assets/js/common/common'
  import { mapGetters } from 'vuex'
  import { selComapnyAll } from '@/assets/js/api/axios/apiCompany'
  import { Indicator } from 'mint-ui'
  export default {
    data () {
      return {
        isFilter: false,
        titleConfig: {
          title: '公司详情',
          isBack: true
        },
        isHeight: false,
        companyinfo: {},
        swiperConfig: {
          effect: 'cube'
        },
        recommondJobList: []
      }
    },
    mounted () {
      this.$nextTick(() => {
        Indicator.open()
        selComapnyAll().then(res => {
          let allList = res.res
          this.recommondJobList = allList.slice(0, 3)
        })
        selComapnyAll({
          merchant_id: this.token
        }).then(res => {
          let result = res.res
          // 没有公司信息
          if (result.length === 0) {
            this.companyinfo = result
            this.isFilter = true
            return
          }
          this.companyinfo = res.res[0]
        })
      })
    },
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    methods: {
      operateShow (date) {
        return until.analyDate(new Date(date))
      },
      // 确认完善信息
      sureBtn () {
        this.$router.push({
          path: '/companyInsert'
        })
      },
      cancelBtn () {
        this.$router.back(-1)
      }
    },
    components: {
      myHead,
      ziSwiper
    }
  }
</script>

<style>
@import '../../../../assets/css/companyDetails.css'
</style>
