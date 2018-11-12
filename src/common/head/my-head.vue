<template>
  <div class="my-head">
    <!-- s back -->
    <div class="back">
      <div class="wauto back-inner">
        <div class="icon" @click="back" v-if="titleConfig.isBack"><i class="iconfont icon-zuojiantou fz12"></i><span class="fz12">返回</span></div>
        <div class="title grow1 fzcenter">{{titleConfig.title}}</div>
        <i class="iconfont" :class="titleConfig.icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      'titleConfig': {
        default: {
          title: '',
          icon: '',
          isBack: true
        }
      }
    },
    created () {
      // console.log(this.titleConfig)
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
  background: #fbcb0f;
}
.back-inner{
  display: flex;
}
</style>
