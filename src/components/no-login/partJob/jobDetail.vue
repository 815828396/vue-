<template>
  <div class="details" :class="init_route">
    <!-- head -->
    <!-- <my-head :titleConfig="titleConfig"></my-head> -->
    <!-- s back -->
    <div class="back">
      <div class="wauto back-inner">
        <div class="icon" @click="back" v-if="titleConfig.isBack"><i class="iconfont icon-zuojiantou fz12"></i><span class="fz12">返回</span></div>
        <div class="title grow1 fzcenter">{{titleConfig.title}}</div>
        <i class="iconfont" :class="titleConfig.icon"></i>
      </div>
    </div>
    <!-- 兼职详情 -->
    <div class="details-box mt10">
      <div class="">
        <!-- 兼职详情  -->
        <div class="box part-details">
          <div class="wauto">
            <div class="part-img fzcenter">
              <img src="../../../assets/images/part-bao.jpg" alt="" width="200px;">
            </div>
            <!-- 工作详情 -->
            <div class="part-list">
              <div class="left">
                <div class="job-name title"><h3>{{jobdetail.name}}</h3></div>
                <ul class="job-list">
                  <li class="list-item">
                    <i class="iconfont icon-zuanshi1 icolor"></i>
                    <span class="fix_title">结算方式:</span>
                    <span class="js_desc">{{jobdetail.type}}</span>
                  </li>
                  <li class="list-item">
                    <i class="iconfont icon-zhaopinqiatan icolor"></i>
                    <span class="fix_title">招聘人数:</span>
                    <span class="js_desc">{{jobdetail.persum}}人</span>
                  </li>
                  <li class="list-item">
                    <i class="iconfont icon-dizhi icolor"></i>
                    <span class="fix_title">工作地点:</span>
                    <span class="js_desc">{{jobdetail.address}}</span>
                  </li>
                  <li class="list-item">
                    <i class="iconfont icon-clock icolor"></i>
                    <span class="fix_title">工作时间:</span>
                    <span class="js_desc">{{jobdetail.stime}}至{{jobdetail.etime}}</span>
                  </li>
                </ul>
              </div>
              <div class="desc-right" style="max-width: 100px;">
                <div class="fz12"><span class="money">{{jobdetail.price}}</span>元/{{jobdetail.unit}}</div>
                <div class="fzcenter renzheng fz12"><i class="iconfont icon-zhengshu"></i><span>认证保障</span></div>
              </div>
            </div>
          </div>
        </div>
        <!-- 工作地点 -->
        <div class="box part-content mt10">
          <div class="wauto">
            <h3 class="work com-border-bottom"><i class="iconfont icon-zhishipai"></i><span class="ml10">工作地点</span></h3>
            <div class="work-desc mt10 flexbox" style="align-items: center">
              <!-- <div class="work-map mr10">
                <img src="../../../assets/images/bgmap.jpg" alt="" width="100%">
                <span class="work-look fz12">路线</span>
              </div> -->
              <router-link tag="div" :to="'/mapBusline?' + 'endAddress=' + jobdetail.address" class="work-map mr10">
                <img src="../../../assets/images/bgmap.jpg" alt="" width="100%">
                <span class="work-look fz12">查看路线</span>
              </router-link>
              <p class="fz12" style="color: #808080;">{{jobdetail.address}}</p>
            </div>
          </div>
        </div>
        <!-- 兼职内容 -->
        <div class="box part-content mt10">
          <div class="wauto">
            <h3 class="work com-border-bottom"><i class="iconfont icon-zhishipai"></i><span class="ml10">职位描述</span></h3>
            <p class="sex-request"><span>性别要求：</span>{{jobdetail.sex}}</p>
            <div class="work-desc mt10">
              <p class="part-content-text" :class="{'mod-flexible-clamp': substr}" v-html="setElementBrXss(jobdetail.content)"></p>
              <p class="fzcenter com-border-bottom fz12" @click="substr = !substr">
                <span v-text="substr ? '更多' : '收起'"></span><i class="iconfont" :class="substr ? 'icon-jiantou9' : 'icon-iconfonticontrianglecopy'"></i>
              </p>
            </div>
            <!-- 平台提示 -->
            <div class="pingtai-tip">
              <div class="tcolor mt20" style="display: flex;">
                <div><img src="../../../assets/images/laba.png" alt=""></div>
                <!-- <i class="iconfont icon-tongzhi fz20"></i> -->
                <span class="ml10 fz12">温馨提示：以任何名义收取费用/缴纳押金的企业均有 欺诈嫌疑，请警惕。</span>
              </div>
              <!-- 如果商户 前去看录用情况 -->
              <div class="work-bottom" v-if="type === '商户'">
                <!-- <div class="love" @click="popupVisible = true"><i class="iconfont icon-xitong1 icolor" style="font-size: 30px;"></i><span class="fz12">联系</span></div> -->
                <button class="baoming mr10" @click="lookMyPart">查看我的录用情况</button>
              </div>
              <!-- 普通用户可以报名 -->
              <div class="work-bottom" v-else>
                <div class="love" @click="popupVisible = true"><i class="iconfont icon-xitong1 icolor" style="font-size: 30px;"></i><span class="fz12">联系</span></div>
                <button class="baoming mr10" @click="baoming">报名</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 联系方式 -->
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      popup-transition="popup-fade"
      class="w100">
      <!-- 发布人联系 -->
      <div class="part-content mt10 phone">
        <div class="wauto">
          <h3 class="com-border-bottom">联系人</h3>
          <div class="flexbox phone-wrap">
            <div class="">
              <div class="">
                <i class="iconfont icon-pinglun1 mr10 fz12"></i>
                <span>{{jobdetail.merchantinfo.name}}</span>
              </div>
              <div class="">
                <i class="iconfont icon-dianhua mr10 fz12"></i>
                <a :href="'tel:' + jobdetail.merchantinfo.tel">{{jobdetail.merchantinfo.tel}}</a>
              </div>
            </div>
            <!-- 商户等级 -->
            <div class="">
              <div class="">
                <i class="iconfont icon-zuanshi mr10" :class="{'green': jobdetail.merchantinfo.vip === 0}"></i>
                {{jobdetail.merchantinfo.vip === 0 ? '会员' : '普通'}}
              </div>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import until from '@/assets/js/common/common'
  import myHead from '@/common/head/my-head'
  import { selPartAll } from '@/assets/js/api/axios/apiNoLogin'
  import { createJob } from '@/assets/js/Classjob'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        substr: true,
        init_route: 'in_right',
        popupVisible: false,
        titleConfig: {
          title: '兼职详情',
          isBack: true
        }
      }
    },
    computed: {
      jobdetail () {
        return this.$route.query
      },
      ...mapGetters([
        'type'
      ])
    },
    methods: {
      back () {
        this.init_route = 'in_left'
        setTimeout(() => {
          this.$router.back(-1)
        }, 250)
      },
      map () {
        this.$router.push({
          path: '/mapBusline'
        })
      },
      baoming () {
        this.$router.push({
          name: 'insBaoming',
          query: {partid: this.jobdetail.noid}
        })
      },
      setElementBrXss (_html) {
        _html = _html.replace(/</g, '&lg;')
        _html = _html.replace(/>/g, '&rg;')
        _html = _html.replace(/\'/g, '&#39;')
        _html = _html.replace(/\"/g, '&quot;')
        _html = _html.replace(/\n/g, '</br>')
        return _html
      },
      time (s) {
        return until.formateDate(s, {type: 'time'})
      },
      lookMyPart () {
        this.$router.push({
          path: '/publishJob'
        })
      }
    },
    components: {
      myHead
    }
  }
</script>

<style scoped>
.in_right{
  animation: fadeInRight .3s
}
.in_left{
  animation: fadeOutRight .3s;
}
.back{
  height: 40px;
  line-height: 40px;
  color: black;
  font-weight: bold;
  background: #fbcb0f;
}
.back-inner{
  display: flex;
}
/* 内容 */
.details{
  background: #eee;
  padding-bottom: 50px;
}
.box{
  padding-bottom: 10px;
  background: white;
}
.part-img{
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
/*  */
.part-list{
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.part-list .right{
  display: flex;
  color: #fbcb0f;
  flex-direction: column;
  justify-content: space-between;
}
.part-list .job-list{
  margin-top: 10px;
  /* display: flex; */
}
.part-list .job-list .list-item{
  display: flex;
  height: 28px;
  line-height: 28px;
  overflow: hidden;
}
.part-content-text {
  color: #808080;
}
.mod-flexible-clamp {
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
}
.title{
  font-size: 16px;
  font-weight: bold;
}
.fix_title,
.js_desc{
  color: #737373;
  flex-shrink: 0;
  font-size: 12px;
}
.fix_title{
  margin: 0 10px;
  font-weight: bold;
}
/* 工作内容 */
.work{
  padding: 10px 0;
}
.work-bottom{
  display: flex;
  justify-content: space-around;
}
.love{
  display: flex;
  flex-direction: column;
}
.baoming{
  padding: 10px 0;
  margin-left: 10px;
  flex-grow: 1;
  background: #fbcb0f;
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 5px;
}
.desc-right{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
}

.money{
  color: #f60;
  font-size: 18px;
  font-weight: bold;
  margin-right: 3px;
}
.work-map{
  position: relative;
}
.work-look{
  position: absolute;
  top: 40%;
  left: 46%;
  padding: 3px 10px;
  background: white;
}
.sex-request{
  padding: 3px;
  background: #eee;
}
.phone{
  background: white;
  line-height: 30px;
}
.phone-wrap{
  justify-content: space-between;
}
.green{
  color: green;
}
</style>
