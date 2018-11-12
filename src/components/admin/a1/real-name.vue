<template>
  <div class="real">
    <!-- head -->
    <my-head :titleConfig="titleConfig"></my-head>
    <!-- 实名制 头部 -->
    <div class="real-head">
      <div class="wauto search-box">
        <div>盈享兼职</div>
        <div class="grow1 real-search">
          <i class="iconfont icon-chaxun ml10 mr10"></i>
          <input class="real-input" type="text" placeholder="输入昵称" v-model="username" @keyup.13=searchUser()>
        </div>
      </div>
    </div>
    <div class="filter">
      <span v-for="(v,i) in realFilter" data-index='i' @click="filterState(v)"
        :class="{'state-active':  isState == i }">{{v.name}}</span>
      <!-- <span>已实名</span>
      <span>未实名</span>
      <span>待审核</span>
      <span>其他</span> -->
    </div>
    <!-- 实名列表 -->
    <div class="">
      <h5 class="wauto mb10">审批列表</h5>
      <ul>
        <li class="real-list-item wauto" v-for="(v, k) in users" :key="k">
          <div class="real-img"><img src="../../../assets/images/img-head.jpg" alt="" width="50px;"></div>
          <div class="grow1 ml20 real-desc">
            <p class="mb10">
              <i class="iconfont icon-dianhua mr10"></i><span >{{v.name}}</span>
            </p>
            <p class="mb10">
              <i class="iconfont icon-dianhua mr10"></i><span >{{v.email}}</span>
            </p>
            <p class="mb10">
              <i class="iconfont icon-dianhua mr10"></i><span >{{v.idnumb}}</span>
            </p>
          </div>
          <div class="real-btn-group" v-if="false">
            <span class="sure" @click="sure">通过</span>
            <span class="cant" @click="cant">未通过</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import myHead from '@/common/head/my-head'
  import {MessageBox, Toast} from 'mint-ui'
  export default {
    data () {
      return {
        titleConfig: {
          title: '实名制',
          isBack: true
        },
        realFilter:[
          {name: '已实名',state: '0'},
          {name: '未实名',state: '1'},
          {name: '待审核',state: '2'},
          {name: '其他',state: '3'},
        ],
        isState: null,
        as: 3,
        allUsers: [],
        users: [],
        username: ''
      }
    },
    created() {
      this.showUsers()
    },
    methods: {
      showUsers(name){
        this.$axios({
          url: 'userinfo/selA',
          method: 'get',
          params:{
            name: '' || name
          }
        }).then(res => {
          console.log(res)
          if(res.code == 0){
            if(res.res.length !== 0){
              this.users = res.res
              this.allUsers = this.users
              Toast('正在为您加载数据!')
            } else {
              Toast({
                message: '该数据为空'
              })
            }
          }else{
            Toast('获取数据失败!')
          }
        })
      },
      searchUser(){
        this.showUsers(this.username)
      },
      filterState(e) {
        // console.log(e)
        this.isState = e.state
        // console.log(this.isState)
        // let __userArr = this.allUsers.filter(v => v.state == this.isState)
        // console.log(__userArr)
        // let _users = []
        let user_state = this.allUsers.filter(v => {
        return v.state == this.isState
          // if(v.state == this.isState){
          //   // console.log(v)
          //   _users.push(v)
          // }
        })
        this.users = user_state
      },
      sure () {
        MessageBox.confirm('确认执行此操作?').then(res => {
          console.log(res)
          if (res) {
            console.log('实名通过')
          }
        })
      },
      cant () {
        MessageBox.confirm('确认执行此操作?').then(res => {
          console.log(res)
          if (res) {
            console.log('实名未通过')
          }
        })
      }
    },
    components: {
      myHead
    }
  }
</script>

<style scoped>
@import url('../../../assets/css/user-manage.css');
.real{
  width: 100%;
  min-height: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background: #fff;
}
.filter{
  width: 100%;
  height: auto;
  display: flex;
}
.filter span{
  padding: 10px 0;
  font-size: 15px;
  display: inline-block;
  flex: 1;
  text-align: center;
  border-bottom: 3px solid #fff;
}
.filter span.state-active{
  color: #f4cb08;
  border-bottom: 3px solid #f4cb08;
}
</style>