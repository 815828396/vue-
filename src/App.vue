<template>
  <div id="app">
    <!-- 广告首页 -->
    <Advertise v-if="isfirst"></Advertise>
    <router-view />
  </div>
</template>

<script>
import Advertise from '@/common/aboutYX/firstdeg'
export default {
  name: 'App',
  data () {
    return {
      isfirst: true,
      transitionName: 'slide-left'
    }
  },
  mounted () {
    setTimeout(() => {
      // this.isfirst = false
    }, 3000)
  },
  components: {
    Advertise
  }
}
</script>

<style>
.all_first_deg{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: red;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  /* height: 100%; */
}

#app .mint-navbar .mint-tab-item.is-selected{
  color: #f4cb08;
  border-bottom: 3px solid #f4cb08;
}
.mint-indicator-wrapper{
  z-index: 9999;
}
</style>
