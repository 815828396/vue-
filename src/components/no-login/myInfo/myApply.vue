<template>
  <div class="apply">
    <!-- 头部 -->
    <my-head :titleConfig="titleConfig"></my-head>
    <div class="news-tab">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">
          <router-link tag="div" to="" class="tab-list_item">
            <div class="bgimg b-baoming"></div>
            <span class="mt10">我报名的兼职</span>
          </router-link>
        </mt-tab-item>
        <mt-tab-item id="2">
          <router-link tag="div" to="" class="tab-list_item">
            <div class="bgimg b-luyong"></div>
            <span class="mt10">被录用</span>
          </router-link>
        </mt-tab-item>
        <!-- <mt-tab-item id="3">
          <router-link tag="div" to="" class="tab-list_item">
            <div class="bgimg b-daogang"></div>
            <span class="mt10">工作中</span>
          </router-link>
        </mt-tab-item> -->
        <mt-tab-item id="4">
          <router-link tag="div" to="" class="tab-list_item">
            <div class="bgimg b-jiesuan"></div>
            <span class="mt10">结算</span>
          </router-link>
        </mt-tab-item>
      </mt-navbar>


      <mt-tab-container v-model="selected" class="mt10" :swipeable="true">
        <!-- 已报名 -->
        <mt-tab-container-item id="1">
          <div class="fzcenter" v-if="applyList.length === 0">
            <img src="../../../assets/images/nodata.png" alt="" width="80%">
            <p class="mt10">没有数据</p>
          </div>
          <ul class="wauto" v-else>
            <li class="apply-item com-border-bottom mt10" v-for="(v, k) in applyList" :key="k">
              <h4 @click="jumpDetails(v)">{{v.name}}</h4>
              <p class="span-msc mtb5 pl5">
                <span>
                  <i class="iconfont icon-shizhong mr10 fz12"></i>{{v.type}}
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
                <span class="fz12" style="font-weight: bold" @click="quxiao(v)"><i class="iconfont icon-htmal5icon21 fz12 mr10"></i>取消报名</span>
              </p>
            </li>
          </ul>
        </mt-tab-container-item>
        <!-- 已录用 -->
        <mt-tab-container-item id="2">
          <div class="fzcenter" v-if="luyongList.length === 0">
            <img src="../../../assets/images/nodata.png" alt="" width="80%">
            <p class="mt10">没有数据</p>
          </div>
          <ul class="wauto" v-else>
            <li class="apply-item com-border-bottom mt10" v-for="(v, k) in luyongList" :key="k">
              <h4 @click="jumpDetails(v)">{{v.name}}</h4>
              <p class="span-msc mtb5 pl5">
                <span>
                  <i class="iconfont icon-shizhong mr10 fz12"></i>{{v.type}}
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
              </p>
            </li>
          </ul>
        </mt-tab-container-item>
        <!-- 已结算 - 微信支付或支付宝支付 -->
        <mt-tab-container-item id="4">
          <div class="fzcenter" v-if="jiesuanList.length === 0">
            <img src="../../../assets/images/nodata.png" alt="" width="80%">
            <p class="mt10">没有数据</p>
          </div>
          <ul class="wauto" v-else>
            <li class="apply-item com-border-bottom mt10" v-for="(v, k) in jiesuanList" :key="k">
              <h4 @click="jumpDetails(v)">{{v.name}}</h4>
              <p class="span-msc mtb5 pl5">
                <span>
                  <i class="iconfont icon-shizhong mr10 fz12"></i>{{v.type}}
                </span>
                <span>
                  <i class="iconfont icon-dizhi mr10"></i>{{v.address}}
                </span>
              </p>
              <p class="flexbox">
                <span class="fz12 grow1">
                  <!-- <b class="price-msg">{{v.price}}</b>元/天
                  <span class="ml10"><i class="iconfont icon-shizhong fz12 mr10"></i>{{v.stime}}</span> -->
                </span>
                <span class=""><strong>${{v.price}}.00</strong></span>
                <!-- <p class="loadMore fzcenter mt10" @click="showProgess(v, k)"><strong>查看进度</strong><i class="iconfont icon-youjiantou"></i></p> -->
              </p>
            </li>
          </ul>
        </mt-tab-container-item>
      </mt-tab-container>
      <!-- 工作进度状态 -->
      <mt-popup
        v-model="isProgress"
        position="bottom"
        style="width: 100%">
        <div class="wauto mt10" style="color: #f60">
          <h5>{{workname}}:progress</h5>
          <mt-progress :value="workProgess" class="fz12" style="font-weight: bold">
            <div slot="start">{{workProgess}}%</div>
            <div slot="end">100%</div>
          </mt-progress>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
  import myHead from '@/common/head/my-head'
  import {Indicator, MessageBox} from 'mint-ui'
  import {mapGetters} from 'vuex'
  import { selBaoming, selWorksheet, selWorksheetState, cancelBaoming } from '@/assets/js/api/axios/apiLogin'
  import { selPartOnly, selPartAll } from '@/assets/js/api/axios/apiNoLogin'
  import { createJob } from '@/assets/js/Classjob'
  export default {
    data () {
      return {
        popupVisible: true,
        titleConfig: {
          title: '我的申请',
          isBack: true
        },
        luyongList: [],
        daogangList: [],
        jiesuanList: [],
        isProgress: false,
        workProgess: 0,
        workname: '',
        applyList: [],
        applyListL: [],
        applyListG: [],
        applyListJ: [],
        selected: '1'
      }
    },
    created () {
      this._initBaoming()
      this._initLuyong()
      this._initDaogang()
      this._initJiesuan()
    },
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    mounted () {
      // this.getWebSocket()
    },
    methods: {
      jumpDetails (val) {
        this.$router.push({
          path: '/jobDetail',
          query: val
        })
      },
      quxiao (v) {
        MessageBox({
          title: '提示',
          message: '确认取消',
          showCancelButton: true
        }).then(res => {
          if (res === 'confirm') {
            cancelBaoming({
              noid: this.token,
              part_id: v.noid
            }).then(res => {
              if (res.code === 0) {
                this.applyList = []
                this._initBaoming()
              }
            })
          }
        })
      },
      showProgess (v, k) {
        // this.$refs['isProgress' + k].style.display = 'block'
        // this.$refs['isProgress' + k][0].style.display = 'block'
        this.isProgress = true
        this.workname = v.name
        selWorksheet({
          part_id: v.noid,
          userinfo_id: this.token
        }).then(res => {
          this.workProgess = res.res[0].completion
          console.log(res)
        })
      },
      _initBaoming () {
        Indicator.open()
        this.multipleData({
          noid: this.token,
          state: 0
        }, this.applyList)
      },
      _initLuyong () {
        this.multipleData({
          noid: this.token,
          state: 1
        }, this.luyongList)
      },
      _initDaogang () {
        this.multipleData({
          noid: this.token,
          state: 2
        }, this.daogangList)
      },
      _initJiesuan () {
        this.multipleData({
          noid: this.token,
          state: 3
        }, this.jiesuanList)
      },
      multipleData (obj = {}, resultarr) {
        selWorksheetState({
          noid: obj.noid,
          state: obj.state
        }).then(res => {
          if (res.res.length === 0) {
            return
          } else {
            return res.res
          }
        }).then(partid => {
          partid.forEach((item, k) => {
            (function(i, k, noid){
              selPartAll({
                noid: i
              }).then(res => {
                let _res = {}
                Object.assign(_res, {_id: noid}, createJob(res.res[0]))
                resultarr.push(_res)
              })
            }(item.part_id, k, item.noid))
          })
        })
      }
    },
    components: {
      myHead
    }
  }
</script>

<style scoped>
.apply{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 300;
  width: 100%;
  min-height: 100%;
  background: #fff;
}
.news-tab{
  padding: 10px 0;
  background: white;
}
.tab-list{
  display: flex;
  justify-content: space-between;
}
.tab-list_item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.bgimg{
  width: 56px;
  height: 53px;
  background: url('../../../assets/images/icon-group.jpg');
  background-size: 228px;
}
.b-baoming{
  background-position: 2px -111px;
}
.b-luyong{
  background-position: -55px -111px;
}
.b-daogang{
  background-position: -110px -111px;
}
.b-jiesuan{
  background-position: -166px -111px;
}
.job-list_item:not(:last-child){
  margin: 10px 0;
  padding-bottom: 13px;
  /*border-bottom: 1px solid #ccc;*/
}
/* job-list */
.job-list{
  background: white;
  margin-top: 10px;
  padding: 10px 0;
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
.status{
  padding: 5px 15px;
  background: #fbcb0f;
  color: black;
  font-size: 12px;
  border-radius: 5px;
}
.job-welfare span{
  padding: 3px 5px;
  border-radius: 5px;
  border: 1px solid #d8d8d8;
  color: #717171;
  font-size: 12px;
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
.loadMore{
  font-size: 12px;
}
.apply-item{
  padding-bottom: 5px;
}
</style>
