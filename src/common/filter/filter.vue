<template>
  <div class="filter-box">
    <!-- <div class="filter-inner" @click="quyu"> -->
    <div class="fzcenter fz12 mtb5">河北</div>
    <div @click="isShow = true">
      <mt-navbar class="filter-inner" v-model="active">
        <mt-tab-item id="tab-container1" v-if="isManage">兼职状态<i class="iconfont icon-jiantou9 ml10 fz12"></i></mt-tab-item>
        <mt-tab-item id="tab-container2">职位类型<i class="iconfont icon-jiantou9 ml10 fz12"></i></mt-tab-item>
        <mt-tab-item id="tab-container3">{{tuijian}}<i class="iconfont icon-jiantou9 ml10 fz12"></i></mt-tab-item>
        <mt-tab-item id="tab-container4">高级筛选<i class="iconfont icon-jiantou9 ml10 fz12"></i></mt-tab-item>
      </mt-navbar>
    </div>
    <!-- </div> -->
    <transition name="slide-fade">
      <div class="m-filter-wrap" v-if="isShow" @click="closeFilter">
        <div class="m-filter-box" v-if="showFilter">
          <mt-tab-container v-model="active">
            <!-- 兼职状态 -->
            <mt-tab-container-item id="tab-container1">
              <div class="tuijian" @click="filterPartState">
                <div data-index='2' class="com-border-bottom" :class="{'filter-active': true}">
                  待审核<i class="iconfont icon-youjiantou"></i>
                </div>
                <div data-index='0' class="com-border-bottom">已审核<i class="iconfont icon-youjiantou"></i></div>
                <div data-index='1' class="com-border-bottom">已下架<i class="iconfont icon-youjiantou"></i></div>
                <div data-index='3' class="com-border-bottom">已过期<i class="iconfont icon-youjiantou"></i></div>
              </div>
            </mt-tab-container-item>  
            <!-- 职位类型 -->
            <mt-tab-container-item id="tab-container2">
              <div style="padding-bottom: 10px; height: 300px; overflow: scroll">
                <dl class="dl-box" @click="addActive">
                  <dt class="dl-title">服务业</dt>
                  <dd class="dl-content">
                    <span>发单</span>
                    <span>服务员</span>
                    <span>宴会</span>
                    <span>蛋糕</span>
                    <span>休闲|娱乐</span>
                    <span>保健按摩</span>
                    <span>酒店</span>
                  </dd>
                </dl>
                <dl class="dl-box" @click="addActive">
                  <dt class="dl-title">IT</dt>
                  <dd class="dl-content">
                    <span>测试工程师</span>
                    <span>产品经理</span>
                    <span>网站运营</span>
                    <span>WEB前端</span>
                    <span>UI设计</span>
                  </dd>
                </dl>
                <dl class="dl-box" @click="addActive">
                  <dt class="dl-title">教育</dt>
                  <dd class="dl-content">
                    <span>职业培训</span>
                    <span>法律</span>
                    <span>教师</span>
                    <span>翻译</span>
                  </dd>
                </dl>
                <dl class="dl-box" @click="addActive">
                  <dt class="dl-title">管理</dt>
                  <dd class="dl-content">
                    <span>销售</span>
                    <span>客服</span>
                    <span>房产中介</span>
                    <span>淘宝职位</span>
                    <span>超市</span>
                  </dd>
                </dl>
              </div>
            </mt-tab-container-item>
            <!-- 推荐排序 -->
            <mt-tab-container-item id="tab-container3">
              <div class="tuijian" @click="filterPaixu">
                <div data-index='0'
                   data-desc="工资最高"
                   class="com-border-bottom">
                  工资最高<i class="iconfont icon-youjiantou"></i>
                </div>
                <div data-index='1' data-desc="最新发布" class="com-border-bottom">最新发布<i class="iconfont icon-youjiantou"></i></div>
                <!-- <div data-index='2' data-desc="离我最近" class="com-border-bottom">离我最近<i class="iconfont icon-youjiantou"></i></div> -->
              </div>
            </mt-tab-container-item>
            <!-- 高级筛选 -->
            <mt-tab-container-item id="tab-container4">
              <div style="padding-bottom: 10px;">
                <div class="tab-content">
                  <dl class="dl-box" @touchstart="filterActive">
                    <dt class="dl-title">性别要求</dt>
                    <dd class="dl-content" data-name="sex">
                      <span :class="{active: filtersex === '-1'}" data-findex="-1">不限</span>
                      <span :class="{active: filtersex === '0'}" data-findex="0">男</span>
                      <span :class="{active: filtersex === '1'}" data-findex="1">女</span>
                    </dd>
                  </dl>
                  <dl class="dl-box" @touchstart="filterActive">
                    <dt class="dl-title">工作类型</dt>
                    <dd class="dl-content" data-name="type">
                      <span :class="{active: filtertype === '-1'}" data-findex="-1">不限</span>
                      <span :class="{active: filtertype === '0'}" data-findex="0">兼职</span>
                      <span :class="{active: filtertype === '1'}" data-findex="1">全职</span>
                    </dd>
                  </dl>
                  <dl class="dl-box"  @touchstart="filterActive">
                    <dt class="dl-title">结算周期</dt>
                    <dd class="dl-content" data-name="setcycle">
                      <span :class="{active: filtersetcycle === '-1'}" data-findex="-1">不限</span>
                      <span :class="{active: filtersetcycle === '0'}" data-findex="0">日结</span>
                      <span :class="{active: filtersetcycle === '1'}" data-findex="1">周结</span>
                      <span :class="{active: filtersetcycle === '2'}" data-findex="2">月结</span>
                    </dd>
                  </dl>
                </div>
                <!-- div button -->
                <div class="tab-btn-group mt10">
                  <mt-cell title="只看认证企业" class="com-border-bottom">
                    <mt-switch v-model="company"></mt-switch>
                  </mt-cell>
                  <mt-cell title="只看担保兼职">
                    <mt-switch v-model="danbao"></mt-switch>
                  </mt-cell>
                  <div class="filter-btn-group wauto mt10">
                    <button class="filter-btn rest" @click="resetFilterBtn">重置</button>
                    <button class="filter-btn sure grow1" @click="seniorFilterBtn">确定</button>
                  </div>
                </div>
              </div>
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { selPartAll, selPartPaix } from '@/assets/js/api/axios/apiNoLogin'
  import { Toast, Indicator } from 'mint-ui'
  export default {
    data() {
      return {
        dataDesc: '推荐排序',
        filtersex: '-1', // 筛选条件active样式
        filtersetcycle: '-1',
        filtertype: '-1',
        filterData: {
          sex: '',
          setcycle: '',
          type: ''
        }, // 筛选条件内容
        selected: '1',
        active: '',
        isShow: false,
        as: '',
        company: false,
        danbao: true,
        allParts: [],
        isManage: false
      }
    },
    computed: {
      tuijian () {
        return this.dataDesc
      },
      showFilter () {
        return true
      },
      filterBox () {
        let a = false
        let z = false
        let o = false
        let f = false
        if (this.as === 'a') a = true
        if (this.as === 'z') z = true
        if (this.as === 'o') o = true
        if (this.as === 'f') f = true
        return {a, z, o, f}
      }
    },
    created() {
      this.getAll()
      this.getIsManage()
    },
    methods: {
      getIsManage() {
        this.isManage = localStorage.getItem('mLogin')
        console.log(this.isManage)
      },
      getAll() {
        selPartAll().then(res => {
          this.allParts = res.res
        })
      },
      judgeState(state) {
        console.log(state)
        let ret = []
        this.allParts.forEach((v,i,ownArr) => {
          // console.log(v)
          if (v.state == state) {
            // console.log(v)
            ret.push(v)
          }
        })
        // console.log(ret)
        // this.$emit('filterState', ret)
        return ret 
      },
      filterPartState (e) {
        console.log(e)
        let _index = e.target.dataset.index
        // console.log(_index)
        let filterStateData = this.judgeState(_index)
        console.log(filterStateData)
        this.$emit('filterState', filterStateData)
        e.target.parentNode.childNodes.forEach(i => {
          i.className = 'com-border-bottom'
        })
        e.target.className += ' filter-active'
      },
      filterPaixu (e) {
        let _index = e.target.dataset.index
        this.dataDesc = e.target.dataset.desc

        e.target.parentNode.childNodes.forEach(i => {
          i.className = 'com-border-bottom'
        })
        e.target.className += ' filter-active'
        if (_index === '0') this.filterRrecommend('19') // 工资最高-降序
        if (_index === '1') this.filterRrecommend('23') // 最新发布-降序
      },
      quyu (e) {
        // 筛选标题样式
        this.isShow = true
      },
      closeFilter (e) {
        let target = e.target.className
        if (target.toLowerCase().indexOf('m-filter-wrap') > -1) {
          this.isShow = false
          this.as = ''
          this.active = ''
        }
      },
      addActive (e) {
        // 职位类型筛选
        const target = e.target
        let ret = []
        if (target.nodeName.toLowerCase() === 'span') {

          target.parentNode.childNodes.forEach(item => {
            if (item.nodeName.toLowerCase() === 'span') {
              ret.push(item)
            }
          })
          ret.forEach(i => {
            i.className = ''
          })
          target.className='active'
        }

        // 根据name筛选兼职
        selPartAll({
          name: target.innerText
        }).then(res => {
          this.$emit('showFilterData', res.res)
          if (res) {
            this.active = ''
            this.isShow = false
          }
        })
      },
      filterActive (e) {
        const target = e.target
        const datasetName = target.parentNode.dataset.name

        switch (datasetName) {
          case 'sex':
            this.filtersex = target.dataset.findex
            this.filterData.sex = target.dataset.findex
            break
          case 'setcycle' :
            this.filtersetcycle = target.dataset.findex
            this.filterData.setcycle = target.dataset.findex
            break
          case 'type' :
            this.filtertype = target.dataset.findex
            this.filterData.type = target.dataset.findex
            break
        }
      },
      resetFilterBtn () {
        this.filtersex = '-1'
        this.filtersetcycle = '-1'
        this.filtertype = '-1'
        // 数据为空
        this.filterData.sex = '-1'
        this.filterData.setcycle = '-1'
        this.filterData.type = '-1'
      },
      seniorFilterBtn () {
        this.filterData.sex = this.filterData.sex === '-1' ? '' : this.filterData.sex
        this.filterData.setcycle = this.filterData.setcycle === '-1' ? '' : this.filterData.setcycle
        this.filterData.type = this.filterData.type === '-1' ? '' : this.filterData.type
        // console.log(this.filterData)
        Indicator.open()
        selPartAll(this.filterData).then(res => {
          // console.log(res)
          this.$emit('showFilterData', res.res)
            if (res) {
              this.active = ''
              this.isShow = false
            }
          })
      },
      filterSelectFn (data) {
        // 当前页面需要筛选的条件数据
        let {name = '', sex = '', setcycle = '', type = '', } = data

        sex = sex === '男'
					? '0'
					: (sex === '女' ? '1' : '2')
				setcycle = setcycle === '日结'
					? '0'
					: (setcycle === '周结' ? '1' : '2')
				type = type === '兼职' ? '0' : '1'

        return selPartAll({
          name,
          sex,
          setcycle,
          type
        })
      },
      filterRrecommend (recid) {
        // 推荐排序 recid 排序类型
        selPartPaix({
          aaa: recid
        }).then(res => {
          this.$emit("showFilterData", res.res)
          this.isShow = false
          // console.log(res)
        })
      }
    }
  }
</script>

<style scoped>
.filter-btn-group{
  display: flex;
}
.filter-btn-group .rest{
  padding: 10px 20px;
  border: 1px solid #f4cb08;
  color: #f4cb08;
}
.filter-btn-group .sure{
  margin-left: 10px;
  border: 1px solid #f4cb08;
  color: white;
  background: #f4cb08;
}
.filter-btn{
  background: none;
  border: none;
  border-radius: 5px;
}
.filter-active{
  color: #f4cb08;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(100%);
  opacity: 0;
}
.filter-box{
  position: relative;
  height: 100%;
}
.filter-inner{
  display: flex;
  padding-bottom: 3px;
}
.filter-item{
  flex-grow: 1;
  text-align: center;
  font-size: 12px;
  border-right: 1px solid #ccc;
}
.filter-item i{
  margin-left: 10px;
}
.m-filter-wrap{
  position: fixed;
  z-index: 500;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  /* overflow: scroll; */
  -webkit-overflow-scrolling: touch;
  background: rgba(0, 0, 0, .2)
}
.m-filter-box{
  background: white;
}
/* 覆盖mint-ui */
.filter-box .mint-navbar .mint-tab-item{
  padding: 10px 0;
}
/* filter 样式 */
.dl-box{
  width: 93%;
  margin: 20px auto;
}
.dl-title{
  font-weight: bold;
  margin-bottom: 10px;
  color: #696969;
}
.dl-content{
  display: flex;
  flex-wrap: wrap;
}
.dl-content span{
  width: 75px;
  padding: 5px 0;
  margin: 3px 5px;
  text-align: center;
  background: #eee;
  border: 1px solid transparent;
  color: #797979;
  font-size: 12px;
  /* overflow: hidden; */
  -webkit-overflow-scrolling: touch;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dl-content span.active{
  position: relative;
  background: #fff;
  color:#f4cb08;
  border: 1px solid#f4cb08;
}
.dl-content span.active:after{
  content: "";
  position: absolute;
  top: -5px;
  right: -5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  color:#f4cb08;
  border: 1px solid #f4cb08;
}
.tuijian div{
  line-height: 50px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  font-size: 14px;
  color: #585858;
  justify-content: space-between;
}
.tab-content{
  height: 300px;
  overflow-y: scroll;
}
.filter-active{
  color: #f4cb08 !important;
  font-weight: bold;
}
</style>
