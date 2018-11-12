<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination mt10" style="text-align: right">
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    props: {
      'swiperConfig': {
        type: Object,
        default: function () {
          return {
            scrollbar: false
          }
        }
      }
    },
    data() {
      return {
      }
    },
    mounted () {
      var swiper = new Swiper('.swiper-container', {
        effect: this.swiperConfig.effect || 'slide',
        pagination: {
          el: '.swiper-pagination',
        }
      })
      console.log(this.swiperConfig)
    }
  }
</script>

<style scoped>

</style>
