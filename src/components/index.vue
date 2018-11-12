<template>
  <!-- 总首页 -->
  <div class="index">
    <keep-alive>
      <router-view v-if="$route.meta === 'keepAlive'" class="child-view swiper-views" id="remove_filter"></router-view>
    </keep-alive>
    <router-view v-if="$route.meta !== 'keepAlive'" class="child-view swiper-views" id="remove_filter"></router-view>
    <!-- 底部导航 -->
    <tab-nav></tab-nav>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import {mapGetters} from 'vuex'
  import tabNav from '@/common/tabnav'
  import Touch from '@/assets/js/common/touchmove'
  export default {
    mounted () {
      let touch = new Touch('.a', '.swiper-views')
      // touch.initElementMove()
    },
    data () {
      return {
        transitionName: ''
      }
    },
    computed: {
      ...mapGetters([
        'login',
        'userInfo'
      ])
    },
    components: {
      tabNav
    }
  }
</script>

<style scoped>
</style>
