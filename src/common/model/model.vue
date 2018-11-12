<template>
  <div class="model-filter">
    <div class="model-box">
      <slot></slot>
      <div class="btn-group">
        <button class="isOk" @click="sure" v-if="dialogConfig.sureText">{{dialogConfig.sureText}}</button>
        <button class="cancel" @click="cancel" v-if="dialogConfig.cancelText">{{dialogConfig.cancelText}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      'dialogConfig': {
        default: {
          sureText: '确认',
          cancelText: '取消'
        }
      }
    },
    mounted () {
      // console.log(this.dialogConfig)
    },
    methods: {
      sure () {
        this.$emit('sure', 1)
      },
      cancel () {
        this.$emit('cancel', 0)
      }
    }
  }
</script>

<style scoped>
.model-filter{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
}
.model-box{
  width: 80%;
  padding: 10px 0;
  margin: 200px auto 0;
  background: white;
}
.btn-group{
  display: flex;
  justify-content: space-around;
}
.btn-group button{
  padding: 5px 20px;
  border: none;
  color: #353535;
  border-radius: 3px;
}
.btn-group .isOk{
  background: #fbcb0f;
}
.btn-group .cancel{
  background: black;
  color: white;
}
</style>