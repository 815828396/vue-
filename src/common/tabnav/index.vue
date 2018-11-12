<template>
  <div class="tabnav" v-show="isclearTab">
    <div class="tab-inner wauto">
      <router-link tag="div" to="/index" class="tab-item">
        <div class="tab-item_box">
          <i class="iconfont icon-shouye fz26"></i>
          <span class="fz12">首页</span>
        </div>
      </router-link>
      <router-link tag="div" to="/partJob" class="tab-item">
        <div class="tab-item_box">
          <i class="iconfont icon-clock fz26"></i>
          <span class="fz12">兼职</span>
        </div>
      </router-link>
      <!-- 判断用户是否为商户，商户显示该tab -->
      <router-link tag="div" to="/publishJob" class="tab-item" v-if="type === '商户'">
        <div class="tab-item_box">
          <i class="iconfont icon-clock fz26"></i>
          <span class="fz12">录用情况</span>
        </div>
      </router-link>
      <router-link tag="div" to="/myIndex" class="tab-item">
        <div class="tab-item_box">
          <i class="iconfont icon-wode fz26"></i>
          <span class="fz12" v-if="login">我的</span>
          <span class="fz12" v-else>未登录</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
 import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        isclearTab: true,
        bodyHeight: '',
        changeBodyHeight: ''
      }
    },
    computed: {
      ...mapGetters([
        'login',
        'userInfo',
        'type'
      ])
    },
    mounted () {
      this.bodyHeight = document.body.clientHeight
      // window.onresize = (e) => {
      //   setTimeout(() => {
      //     this.changeBodyHeight = document.body.clientHeight
      //   }, 100)
      // }
    },
    watch: {
      '$route' (to, from) {
        let _path = to.path.substr(1).toLowerCase()
        let hidetab = ['insbaoming', 'myindex/myapply', 'jobdetail']

        if (hidetab.indexOf(_path) >= 0) {
          this.isclearTab = false
        } else {
          this.isclearTab = true
        }
      }
    }
  }
</script>

<style scoped>
.router-link-active{
  color: #fbcb0f;
  /* border-bottom: 2px solid #fbcb0f; */
}
.tabnav{
  position: fixed;
  bottom: 0;
  z-index: 200;
  width: 100%;
  padding: 5px 0;
  box-shadow: 0px -1px 5px #e8e8e8;
  background: white;
}
.tab-inner{
  height: 100%;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  line-height: 20px;
}
.tab-item{
  flex-grow: 1;
  height: 100%;
  text-align: center;
}
.tab-item_box{
  display: flex;
  flex-direction: column;
  line-height: 20px;
}
</style>
