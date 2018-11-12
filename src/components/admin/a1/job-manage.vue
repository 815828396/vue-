<template>
  <div class="details">
    <!-- head -->
    <my-head :titleConfig="titleConfig"></my-head>
    <!-- 兼职详情 -->
    <div class="details-box mt10">
      <div class="inner">
        <!-- 兼职详情  -->
        <div class="box part-details">
          <div class="wauto">
            <div class="part-img fzcenter">
              <img src="../../../assets/images/part-job.jpg" alt="" width="200px;">
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
                    <i class="iconfont icon-clock icolor"></i>
                    <span class="fix_title">工作时间:</span>
                    <span class="js_desc">{{jobdetail.stime}}至{{jobdetail.etime}}</span>
                  </li>
                  <li class="list-item">
                    <i class="iconfont icon-dizhi icolor"></i>
                    <span class="fix_title">工作地点:</span>
                    <span class="js_desc">{{jobdetail.address}}</span>
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
              <div class="work-map mr10" @click="map">
                <img src="../../../assets/images/bgmap.jpg" alt="" width="100%">
                <span class="work-look fz12">路线</span>
              </div>
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
              <p style="color: #808080">{{jobdetail.content}}</p>
            </div>
            <!-- 平台提示 -->
            <div class="pingtai-tip">
              <div class="tcolor mt20" style="display: flex;">
                <div><img src="../../../assets/images/laba.png" alt=""></div>
                <!-- <i class="iconfont icon-tongzhi fz20"></i> -->
                <span class="ml10 fz12">温馨提示：以任何名义收取费用/缴纳押金的企业均有 欺诈嫌疑，请警惕。</span>
              </div>
              <div class="work-bottom">
                <div class="love" @click="clove"><i class="iconfont icon-xin2 icolor" style="font-size: 30px;"></i><span class="fz12">收藏</span></div>
                <button class="baoming mr10" v-if="jobState == 1 || jobState == 2" @click="onJob">上架</button>
                <button class="baoming mr10" v-if="jobState == 0 || jobState == 2" @click="underJob">下架</button>
                <button class="baoming mr10" v-if="jobState == 3 || jobState == 2" @click="underJob">过期</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import myHead from '@/common/head/my-head'
  import {Toast, Indicator, MessageBox} from 'mint-ui'
  export default {
    data () {
      return {
        titleConfig: {
          title: '兼职管理',
          isBack: true
        },
        // jobdetail: {}
        jobid: '',
        jobState: '2'
      }
    },
    computed: {
      jobdetail () {
        return this.$route.query
      }
    },
    mounted () {
      // this.jobState = this.$route.query.state
      // console.log(this.jobState)
      console.log(this.jobdetail)
    },
    created() {
      this.getPartState()
    },
    methods: {
      map () {
        this.$router.push({
          path: '/mapBusline'
        })
      },
      getPartState(){
        this.$axios({
          url:'part/selO',
          method: 'get',
          params:{
            noid: this.jobdetail.noid
          }
        }).then(res => {
          console.log(res)
          this.jobState = res.res.state
          console.log(this.jobState)
        })

      },
      updState(state) {
        this.jobid = this.jobdetail.noid
        this.$axios({
          url: 'part/upd',
          method: 'put',
          params: {
            noid: this.jobid,
            state: state
          },
        }).then(res => {
          console.log(res)
        })
      },
      onJob () {
        console.log(this.jobdetail)
        this.updState(0)
        // this.$router.push({
        //   name: 'insBaoming',
        //   query: {partid: this.jobdetail.noid}
        // })
      },
      underJob() {
        // console.log(this.jobdetail)
        this.updState(1)
      },
      clove () {
        console.log('啊我')
      }
    },
    components: {
      myHead
    }
  }
</script>

<style scoped>
.details{
  background: #eee;
  /*padding-bottom: 50px;*/
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
</style>
