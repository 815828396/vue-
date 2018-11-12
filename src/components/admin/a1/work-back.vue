<template>
  <div class="work-base">
    <!-- head -->
    <my-head :titleConfig="titleConfig"></my-head>
    <!-- filter-box -->
    <zi-filter></zi-filter>
    <!-- 实名制 头部 -->
    <div class="real-head">
      <div class="wauto search-box">
        <div>盈享兼职</div>
        <div class="grow1 real-search">
          <i class="iconfont icon-chaxun ml10 mr10"></i>
          <input class="real-input" type="text" placeholder="输入管理员昵称">
        </div>
      </div>
    </div>
    <!-- list -->
    <div class="job-list">
      <ul class="wauto">
        <li class="job-list_item" v-for="i in 10" @click="jumpDetails(i)">
          <!-- 工作描述 -->
          <div class="job-box">
            <div style="width: 85px;"><img src="../../../assets/images/icon.jpg" alt="" width="100%"></div>
            <div class="desc grow1">
              <p>发传单</p>
              <p>vivo专卖店</p>
              <p>石家庄桥西区</p>
            </div>
            <div class="money">
              <span>100元/天</span>
              <span class="status">删除</span>
              <span class="status">处理</span>
              <!-- <p class="jobdate">3天</p> -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import myHead from '@/common/head/my-head'
  import ziFilter from '@/common/filter/filter'
  export default {
    data() {
      return {
        titleConfig: {
          title: '工作反馈',
          isBack: true
        }
      }
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
</style>