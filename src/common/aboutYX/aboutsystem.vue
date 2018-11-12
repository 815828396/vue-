<template>
  <div class="module-system">
    <!-- s back -->
    <div class="back">
      <div class="wauto back-inner">
        <div class="icon" @click="back"><i class="iconfont icon-zuojiantou fz12"></i><span class="fz12">返回</span></div>
        <div class="title grow1 fzcenter">关于盈享兼职</div>
        <div :class="{'system-ali-music': isIcon}" @click="pause">
          <i class="iconfont icon-iconxx2"></i>
        </div>
      </div>
    </div>
    <!-- 头部logo -->
    <div class="system-wrap">
      <div class="fzcenter" style="position: relative">
        <img src="../../assets/images/yx.png" alt="" width="60px">
        <p class="system-title">盈享兼职</p>
        <p class="system-desc">当前版本v1.0.0.0918</p>
        <!-- 支付宝音乐 -->
      </div>
      <!-- 网站联系 -->
      <div class="system-lianxi">
        <div class="system-item com-border-bottom">
          <div class="system-item-inner key_in-out delay3s">
            <div class="system-title">
              服务条款
            </div>
            <span><i class="iconfont icon-youjiantou"></i></span>

          </div>
        </div>
        <div class="system-item">
          <div class="system-item-inner key_in-out delay4s">
            <div class="system-title">
              隐私权政策
            </div>
            <span class="system-desc"><i class="iconfont icon-youjiantou"></i></span>
          </div>
        </div>
        <!-- 网络联系方式 -->
        <div class="system-item com-border-bottom mt10 ">
          <div class="system-item-inner key_in-out delay5s">
            <div class="system-title">
              公司官网
            </div>
            <span class="system-desc">www.xieyingwangluo.com<i class="iconfont icon-youjiantou fz12"></i></span>
          </div>
        </div>
        <div class="system-item com-border-bottom">
          <div class="system-item-inner key_in-out delay5s">
            <div class="system-title">
              新浪微博
            </div>
            <span class="system-desc">weibo.com/u/6493482684<i class="iconfont icon-youjiantou fz12"></i></span>
          </div>
        </div>
        <div class="system-item com-border-bottom ">
          <div class="system-item-inner key_in-out delay6s">
            <div class="system-title">
              微信公众号
            </div>
            <span class="system-desc">xuanmingzhihuo<i class="iconfont icon-youjiantou fz12"></i></span>

          </div>
        </div>
      </div>
      <!-- 各种版权 -->
      <div class="fzcenter system-all-ban">
        <div class="mb10">
          <h5>支付宝特权功能：</h5>
          <p>1. 摇一摇查看支付宝功能特权</p>
          <p>1. 摇一摇查看公司详情</p>
        </div>
        <p>技术公司：石家庄协盈网络科技有限公司</p>
        <p>商业合作联系电话：0311-86770662</p>
        <p>违法商户举报电话：0311-86770662</p>
        <p>@版权所有 '石家庄协盈网络科技有限公司'</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ali_icon_music: true
    }
  },
  computed: {
    isIcon () {
      return this.ali_icon_music
    }
  },
  methods: {
    back () {
      this.$router.back(-1)
    }
  }
}
</script>

<style scoped>
.back{
  height: 40px;
  line-height: 40px;
  color: black;
  font-weight: bold;
  box-shadow: 0 3px 5px #ccc;
  background: white;
}
.back-inner{
  display: flex;
}
/*  */
.module-system {
  min-height: 100%;
  background: #eee;
}
.system-ali-music {
  position: absolute;
  top: 0;
  right: 10px;
  animation: identifierRotate 3s infinite;
}
.system-wrap {
  margin-top: 30px;
}
.system-title {
  font-weight: bold;
}
.system-desc {
  margin-top: 10px;
  color: #868686;
  font-size: 12px;
}
.system-lianxi {
  margin-top: 60px;
}
.system-item {
  padding: 0 10px;
  background: white;
}
.system-item-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
}
.system-all-ban {
  margin-top: 20px;
  color: #ccc;
  font-size: 12px;
}
@keyframes identifierRotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
