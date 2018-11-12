<template>
  <!-- 首屏渲染 -->
  <div class="first_all_deg swiper-container" v-if="isno">

    <!-- 后期做到swiper动画 -->
    <div class="first_inner swiper-wrapper">
      <!-- logo首页 -->
      <div class="first_all_wrap swiper-slide">
        <div class="slide-inner-white">
          <!--  -->
          <div class="mt10 fzcenter" style="margin-top: 50%; transform: translateY(-50%)">
            <div class="">
              <img src="../../assets/images/yx.png" alt="" width="50">
            </div>
            <span class="zinright">盈</span><span class="zinright delay3s">享</span><span class="zinright delay4s">兼</span><span class="zinright delay5s">职</span>
          </div>
          <p class="fzcenter">《滑动查看平台规则》</p>
        </div>
      </div>
      <!-- 平台原则 -->
      <div class="first_all_wrap swiper-slide">
        <div class="slide-inner-white">
          <!-- 平台可靠 -->
          <div class="wauto" style="margin-top: 30px;">
            <h5 class="rule-title">盈享平台的原则</h5>
            <p>安全</p>
            <p>可靠</p>
            <p>放心</p>
            <h5 class="rule-title">盈享平台对商户的规则</h5>
            <p>保证商户所发布的信息,真实、合法</p>
            <p>禁止向用户收取任何无关费用</p>
            <p style="text-indent: 2em">商户应该遵守国家法律、行政法规、部门规章等规性文件。对任何涉嫌违反国家法律、行政法规、部门规章等规范性文件的行为，本规定已经有规定的，适用本规则；本规定尚未规定的，盈享平台有权酌情处理。但是盈享平台对商户的处理不排除其应尽的法律责任。</p>
            <h5 class="rule-title">用户提醒</h5>
            <p>平台不会以任何形式,向用户收取任何费用</p>
            <p>若某兼职信息存在违法信息,请及时联系我们</p>
          </div>
          <!-- 等待进入 -->
          <div class="fzcenter first_quick_box">
            <span class="first_quick" type="button" @click="quick_enter"><i class="iconfont icon-jiantou9"></i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  props: {
    advertive: {
      default: function () {
        return {
          title: '广告',
          ms: 'ads'
        }
      }
    }
  },
  data () {
    return {
      isno: true
    }
  },
  mounted () {
    if (!localStorage.getItem('yx_first_rule')) {
      this.isno = true
    } else {
      this.isno = false
    }
    let f_swiper = new Swiper('.swiper-container')
  },
  methods: {
    quick_enter () {
      localStorage.setItem('yx_first_rule', false)
      this.isno = false
    }
  }
}
</script>

<style scoped>
.rule-title {
  position: relative;
  padding-left: 10px;
}
.rule-title::before {
  position: absolute;
  top: 4px;
  left: -11px;
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 2px solid #fbcb0f;
}
.first_quick_box {
  position: absolute;
  bottom: 30px;
  width: 100%;
  z-index: 99999;
}
.first_quick {
  display: block;
  width: 50px;
  height: 50px;
  margin: 0 auto;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  color: white;
  background: rgba(0, 0, 0, .2);
  /* background: rgba(255, 255, 255, .5); */
  box-shadow: 0 0 15px #ccc;
  outline: none;
}
.zinright {
  color: #fbcb0f;
  font-size: 20px;
  font-weight: bold;
  display: inline-block;
  opacity: 0;
  animation: firstZi .5s forwards;
}
.first_all_deg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 30px 0;
  box-sizing: border-box;
  z-index: 99999;
  background: url('../../assets/images/first_bg1.png');
  background-size: 100% 100%;
}
.first_inner {
  position: relative;
  height: 100%;
}
.first_all_wrap {
  padding: 0 10px;
  box-sizing: border-box;
}
.first_all_wrap p {
  margin: 10px 0;
  padding-left: 5px;
  color: #e0e0e0;
  /* text-indent: 2em; */
}
/* .first_all_wrap p span {
  display: inline-block;
  opacity: 0;
  animation: firstZi .5s forwards;
} */
.first_all_wrap p:first-child {
  margin-top: 20px;
}
@keyframes firstZi {
  from {
    transform: translateX(100px);
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.slide-inner-white {
  height: 100%;
  color: #fbcb0f;
  overflow: hidden;
  background: rgba(255, 255, 255, .3);
}
.initScale{
  animation: initscale .3s
}
@keyframes initscale {
  from {
    transform: scale(0)
  }
  to {
    transform: scale(1)
  }
}
</style>
