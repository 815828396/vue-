<template>
  <!-- 搜索头部 -->
  <div class="search-box" :class="{'white': isNowSearch}">
    <div class="search-inner">
      <span class="fz12 mr5" v-if="isNowSearch" @click="searchclone"><i class="iconfont icon-zuojiantou"></i></span>
      <div class="input-group grow1" :style="isNowSearch ? 'background:#f4f4f4' : ''">
        <i class="iconfont icon-chaxun ml10 fz12"></i>
        <input type="text"
          class="search-input grow1"
          placeholder="请输入关键字"
          @focus="hideIndexModule"
          @keyup.13="searchBtn"
          v-model="texthistory">
        <i class="iconfont icon-htmal5icon21" v-show="!!texthistory" @click="clearInputText"></i>
      </div>
      <router-link tag="i" to="/choosecity" class="iconfont icon-dizhi fz20" v-if="!isNowSearch"></router-link>
      <i class="iconfont icon-chaxun fz12" v-if="isNowSearch" style="font-weight: bold" @click="searchBtn"></i>
    </div>
    <!-- search 模态框 -->
    <div class="search-model-box" v-if="isNowSearch">
      <div class="mt10" style="position: relative">
        <!-- <i class="iconfont icon-htmal5icon21 fr"></i> -->
        <div class="hotsearch mb10 wauto">
          <h4 style="color: #909090;">历史记录<span class="clear-history" @click="clearHistory">清空记录</span></h4>
          <div class="hotsearch-list mt10">
            <span @click='searchHisItem(v)' v-for="(v, k) in searchHistory" :key="k">{{v}}</span>
          </div>
        </div>
        <div class="hotsearch wauto">
          <h4 style="color: #909090;">热门搜索</h4>
          <div class="hotsearch-list mt10">
            <span @click='searchHotItem(v)' v-for="(v, k) in hotHistory" :key="k">
              {{v}}
            </span>
          </div>
        </div>
        <!-- 搜索列表 -->
        <div class="search-res-list">
          <div class="fzcenter" v-if="computedNotSearch">
            <img src="../../../assets/images/nodata.png" alt="" width="100%">
            <p class="fz12">没有搜索到相关内容{{isNotSearch}}</p>
          </div>
          <div class="com-border-bottom" v-for="(v, k) in searchlist" :key="k" @click.prevent="searchListBtn(v)">
            <i class="iconfont icon-chaxun mr10" style="color: #ccc"></i>
            {{v.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { createJob } from '@/assets/js/Classjob'
import { selPartAll } from '@/assets/js/api/axios/apiNoLogin'
import until from '@/assets/js/common/common'
export default {
  data () {
    return {
      isNowSearch: false,
      isNotSearch: false,
      texthistory: '',
      searchlist: [],
      hotHistory: ['快递','发单'],
    }
  },
  computed: {
    computedNotSearch () {
      return this.isNotSearch
    },
    ...mapGetters([
      'searchHistory'
    ])
  },
  mounted () {
    let c = new Date()
    console.log(until.formateDate(c))
  },
  methods: {
    searchclone () {
      this.isNowSearch = false
      this.$emit('hideIndexModule', this.isNowSearch)
      this.texthistory = ''
    },
    hideIndexModule () {
      // 隐藏父组件模块
      this.isNowSearch = true
      this.$emit('hideIndexModule', this.isNowSearch)
    },
    clearInputText () {
      // 清除搜索框内容
      this.texthistory = ''
    },
    searchHisItem (v) {
      this.texthistory = v
    },
    searchHotItem(v) {
      this.texthistory = v
    },
    clearHistory () {
      this.delSearchHisstory()
    },
    searchListBtn (v) {
      this.searchBtn()
      this.$router.push({
        name: 'jobDetail',
        query: v
      })
    },
    searchBtn () {
      if (this.texthistory === '') return
      this.setSearchHistory({
        history: this.texthistory
      })
    },
    _normalizeJobs (list) {
      let ret = []
      list.forEach(item => {
        ret.push(createJob(item))
      });
      return ret
    },
    ...mapMutations({
      setSearchHistory: 'SET_SEARCH_HISTORY',
      delSearchHisstory: 'DEL_SEARCH_HISTORY'
    })
  },
  watch: {
    'texthistory' (nV, oV) {
      if (nV === '') {
        this.searchlist = []
        this.isNotSearch = false
        return
      }
      setTimeout(() => {
        selPartAll({
          name: nV
        }).then(res => {
          let ret = []
          if (res.res.length === 0) {
            this.isNotSearch = true
            console.log(12)
          } else {
            this.isNotSearch = false
          }
          this.searchlist = this._normalizeJobs(res.res).slice(0, 10)

        })
      }, 200)
    }
  }
}
</script>

<style scoped>

/* search */
.search-model-box{
  position: absolute;
  top: 70px;
  left:0;
  z-index: 2000;
  width: 100%;
  height: 100%;
}
.search-box{
  padding: 5px 10px;
  background: #fbcb0f;
  box-shadow: 0 3px 5px #ccc;
}
/* host-search */
.hotsearch-list{
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 5px;
}
.hotsearch-list span{
  padding: 5px 8px;
  margin: 5px 6px 0 0px;
  background: #eee;
  color: #868686;
  border-radius: 5px;
  font-size: 12px;
}
.search-inner{
  display: flex;
  padding: 0 10px;
  border-radius: 5px;
  align-items: center;
  background: #fbfbfb;
}
.input-group{
  display: flex;
  align-items: center;
  margin-right: 10px;
  border-radius: 5px;
}
.search-input{
  /* width: 100%; */
  height: 40px;
  font-size: 12px;
  padding-left: 10px;
  background: transparent;
  border: none;
  outline: none;
}
.clear-history{
  padding: 3px 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 12px;
  float: right;
}
.search-res-list{
  position: absolute;
  top: 0;
  width: 100%;
  background: white;
  z-index: 1000;
}
.search-res-list div{
  padding: 0 10px;
  font-size: 12px;
  line-height: 35px;
}
</style>
