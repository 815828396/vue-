<template>
  <div class="news">
    <!-- 头部 -->
    <my-head :titleConfig="titleConfig"></my-head>
    <div class="news-tab">
      <div class="wauto tab-list">
        <router-link tag="div" to="" class="tab-list_item">
          <div class="bgimg b-baoming"></div>
          <span class="mt10">已报名</span>
        </router-link>
        <router-link tag="div" to="" class="tab-list_item">
          <div class="bgimg b-luyong"></div>
          <span class="mt10">已录用</span>
         </router-link>
        <router-link tag="div" to="" class="tab-list_item">
          <div class="bgimg b-daogang"></div>
          <span class="mt10">已到岗</span>
         </router-link>
        <router-link tag="div" to="" class="tab-list_item">
          <div class="bgimg b-jiesuan"></div>
          <span class="mt10">已结算</span>
         </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import myHead from '@/common/head/my-head'
  export default {
    data () {
      return {
        titleConfig: {
          title: '消息',
          isBack: false
        }
      }
    },
    components: {
      myHead
    }
  }
</script>

<style scoped>
.news{
  min-height: 100%;
  background: #eee;
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
</style>