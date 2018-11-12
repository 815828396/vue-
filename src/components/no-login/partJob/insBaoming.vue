<template>
  <div class="enroll">
    <!-- head -->
    <div class="details1">
      <div class="baoming-box wauto flexbox">
        <h5 class="baoming-myself fzcenter" @click="back"><i class="iconfont icon-zuojiantou mr10 fz12"></i> 自我推荐：</h5>
        <span class="fz12 js_baoming" @click="jsBaoming">报名</span>
      </div>
      <textarea class="textarea wauto" placeholder="快来填写自己的优势吧,让HR更加欣赏你呦!" autofocus="autofocus" v-model="youshi"></textarea>
    </div>
  </div>
</template>

<script>
  import myHead from '@/common/head/my-head'
  import {addBaoming} from '@/assets/js/api/axios/apiLogin'
  import {mapGetters} from 'vuex'
  import { Popup, Toast, Indicator } from 'mint-ui'
  export default {
    data () {
      return {
        titleConfig: {
          title: '报名',
          isBack: true
        },
        youshi: ''
      }
    },
    computed: {
      partid () {
        return this.$route.query.partid
      },
      ...mapGetters([
        'userInfo',
        'token'
      ])
    },
    methods: {
      back () {
        this.$router.back(-1)
      },
      jsBaoming () {
        Indicator.open()
        addBaoming({
          part_id: this.partid,
          user_id: this.token,
          advantage: this.youshi
        }).then(res => {
          if (!res.res) {
            Toast('您已报过名')
            return
          }
          Toast('报名成功')
          this.$router.push({
            path: '/'
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
@import '../../../assets/css/keyframes';
/* 报名头部 */
.baoming-box{
  line-height: 50px;
  align-items: center;
}
.baoming-myself{
  animation: slideInLeft .5s
}
.js_baoming{
  flex-grow: 1;
  text-align: right;
  animation: slideInRight .5s;
}
.enroll{
  height: 600px;
  background-color: #eee;
}
.details{
  background-color: white;
  margin-top: 6px;
  padding: 10px 15px;
  box-sizing: border-box;
}
.details-div{
  border:1px solid #eee;
  padding:15px 15px;
  box-sizing: border-box;
  background:white;
  border-radius:8px;
  font-size: 12px;
}
.details1{
  position: relative;
  background-color: white;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  margin-top: 6px;
}
.textarea{
  display: block;
  margin: 0 auto;
  min-height: 500px;
  background:white;
  border: none;
  outline: none;
}
.release{
  background: white;
  width: 100%;
  margin-top: 8px;
  text-align: center;
  line-height: 50px;
}
.button {
  background-color: #fbcb0f;
  border: none;
  color: black;
  padding: 10px 80px;
  text-align: center;
  font-size: 13px;
  margin: 4px 2px;
  border-radius:5px;
}
.details-span{
  font-size: 12px;
}
.details-span1{
  font-size: 12px;
  float: right;
  margin-right: 0px;
}
</style>
