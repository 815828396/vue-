<template>
  <!-- 我的钱包模块 -->
  <div class="wallet">
    <my-head :titleConfig="titleConfig"></my-head>
    <!-- 数据输出框 -->
    <div class="" id="console" >
        {{out}}
    </div>
    <!-- s wallet head -->
    <div class="wallet-head">
      <button @click="alipay_chooseImg" class="mtb5">支付宝</button>
      <div class="inner wauto mt10 allMoney">
        <div class="grow1 all-box com-border-right">
          <h3 class="line">总收入</h3>
          <p class=""><span class="cell-price">300</span><span class="fz12">/元</span></p>
        </div>
        <div class="grow1 all-box">
          <h3 class="line">总支出</h3>
          <p class=""><span class="cell-price">100</span><span class="fz12">/元</span></p>
        </div>
      </div>
    </div>
    <!-- swiper 选项 -->
    <div class="mt10">
      <mt-navbar v-model="active" style="padding-bottom: 3px">
        <mt-tab-item id="1">收入</mt-tab-item>
        <mt-tab-item id="2">支付</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="active" :swipeable="true" style="background:white">
        <!-- 收入 -->
        <mt-tab-container-item id="1" class="maxHeight wauto">
          <mt-cell v-for="(n, k) in 5" :key="k" title="tab-container 1">
          <span class="">100</span>
          <span class="fz12">/元</span>
          </mt-cell>
        </mt-tab-container-item>
        <!-- 支付 -->
        <mt-tab-container-item id="2" class="maxHeight">
          <mt-cell v-for="(n, k) in 5" :key="k" title="tab-container 2"></mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
      <!-- <zi-swiper :swiperConfig="swiperConfig">
        <div class="swiper-slide" style="max-height: 500px; overflow: scroll; padding-bottom: 20px; background:white">
          <p v-for="i in 50">{{i}}asjkldjasdk</p>
        </div>
        <div class="swiper-slide">
          这是支出的东西
        </div>
      </zi-swiper> -->
    </div>
  </div>
</template>

<script>
  import myHead from '@/common/head/my-head'
  import ziSwiper from '@/common/swiper/slot-swiper'
  export default {
    data () {
      return {
        out: '',
        active: '1',
        titleConfig: {
          title: '我的钱包',
          isBack: true
        },
        swiperConfig: {
          a: 1,
          b: 2
        }
      }
    },
    methods: {
      back () {
        this.$router.back(-1);
      }
    },
    components: {
      ziSwiper,
      myHead
    }
  }
</script>

<style scoped>
.allMoney{
  display: flex;
  text-align: center;
  /*line-height: 100px;*/
}
.allMoney .line{
  line-height: 58px;
}
.allMoney .all-box{
  flex-flow: 1;
}
.back{
  height: 40px;
  /*line-height: 40px;*/
  color: white;
  background: #108ee9;
}
.back-inner{
  display: flex;
}
.title{
  text-align: center;
}
.wallet{
  position: fixed;
  top: 0;
  z-index: 300;
  width: 100%;
  height: 100%;
  background: #eee;
}
.wallet .inner{
  height: 100px;
}
.pay-tab{
  display: flex;
  height: 40px;
  margin-top: 20px;
  align-items: center;
  text-align: center;
  background: #fff;
}
.pay-tab_title{
  border-bottom: 1px solid green;
}
.wallet-head{
  background: #fff;
}
.maxHeight{
  max-height: 500px;
  overflow: scroll;
}
.cell-price{
  font-size: 18px;
  color: #f60;
  margin-right: 3px;
}
</style>
