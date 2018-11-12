<template>
  <div class="manage-box">
    <!-- 头部 -->
    <div class="head" :class="{ 'headScroll': headScroll}">
      <my-head :titleConfig="titleConfig"></my-head>
      <div class="real-head">
        <div class="wauto search-box">
          <div>盈享兼职</div>
          <div class="grow1 real-search">
            <i class="iconfont icon-chaxun ml10 mr10" @click='searchAdmin'></i>
            <input class="real-input" v-model='adminName' type="search" placeholder="输入管理员昵称" ref="input1" @keyup.13=searchAdmin()>
          </div>
          <!-- <input type="search" value="search" class="search-admin"  /> -->
        </div>
      </div>
    </div>
    <div style="height: 100px" v-if='headScroll'></div>
    <!-- 内容 -->
    <div class="m-con" ref='searchBox'>
      <div class="m-con mb20">
        <div class="real-list">
          <h5 class="wauto mb10">审批列表</h5>
          <ul>
            <li class="real-list-item wauto" v-for="(v,i) in admins">
              <div class="real-img"><img src="../../../assets/images/img-head.jpg" alt="" width="50px;"></div>
              <div class="grow1 ml20 real-desc">
                <p>
                  <i class="iconfont icon-dianhua mr10"></i><span >{{v.tel}}</span>
                </p>
                <p>
                  <i class="iconfont icon-wode mr10"></i><span >{{v.name}}</span>
                </p>
              </div>
              <div class="real-btn-group">
                <span class="sure" @click.prevent='deleteA(v)'>删除</span>
                <!-- <span class="cant">拉黑</span> -->
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 添加 -->
    <div class="rightFix">
      <div class="returnTop" v-if='headScroll' @click='returnTop'>
        <span>返回</span>
      </div>
      <div class="manage-add" @click="showDialog">
        <i class="iconfont icon-ego-menu" style="font-size: 22px; color: white;"></i>
      </div>
    </div>
    
    <!-- 添加模态框框 -->
    <Dialog :dialogConfig="dialogConfig" @sure="addAdmin" @cancel="sd" v-if="isDialog">
      <div>
        <div class="fzcenter"><img src="../../../assets/images/img-head.jpg" alt="" width="100px;"></div>
        <div class="input-group wauto">
          <div class="input-item"><span class="mr10 ml10 fz12">姓名:</span><input type="text" placeholder="请输入姓名" v-model='adminInfo.name'></div>
          <div class="input-item"><span class="mr10 ml10 fz12">电话:</span><input type="number" placeholder="请输入电话" v-model='adminInfo.tel'></div>
          <div class="input-item"><span class="mr10 ml10 fz12">密码:</span><input type="password" placeholder="请输入密码" v-model='adminInfo.pwd'></div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
  import myHead from '@/common/head/my-head'
  import all from '@/assets/js/common/common'
  import { Popup, Toast, Indicator } from 'mint-ui'
  export default {
    props: {
      transitionName: {
        type: String,
        default: 'linear'
      },

    },
    data () {
      return {
        headScroll: false,
        titleConfig: {
          title: '管理员管理',
          isBack: true,
        },
        dialogConfig: {
          sureText: '确认',
          cancelText: '取消'
        },
        as: 3,
        isDialog: false,
        adminInfo: {
          tel: '',
          pwd: '',
          name: ''
        },
        admins: [],
        adminName: '',
      }
    },
    created() {
      this.showAdmin()
    },
    mounted() {
      window.addEventListener('scroll', this.handleScoll)
    },
    methods: {
      handleScoll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        // console.log(scrollTop)
        if (scrollTop > 200) {
          this.headScroll = true
        } else {
          this.headScroll = false
        }
      },
      returnTop() {
        // window.pageYOffset = 0
        // document.body.scrollTop = 0
        // document.documentElement.scrollTop = 0
        all.scrollIt(0, 300, this.transitionName);
      },
      showRet(r) {
        console.log(r)
        if (r.code == 0) {
          this.admins = r.res
          let succ = Toast('查询成功!')
          setTimeout(() => {
            succ.close()
          }, 1000)
        }else if (r.code == 1) {
          console.log(r.code)
          let fail = Toast('加载失败!')
          setTimeout(() => {
            fail.close()
          }, 1000)
        }else {
          console.log('error:'+r)
        }
      },
      showAdmin() {
        this.$axios({
          method: 'get',
          url: 'admin/selA',
          // params: {
          //   ss: 'xx'
          // }
        }).then((res) => {
          // console.log(res)
          this.showRet(res)
        })
      },
      searchAdmin() {
        // console.log(this.adminName)
        this.$refs.input1.blur()
        this.$axios({
          method: 'get',
          url: 'admin/selA',
          params: {
            name: this.adminName
          }
        }).then((res) => {
          console.log(res)
          this.admins = res.res
          if (res.code == 0) {
            let instance = Toast('搜索成功!');
            setTimeout(() => {
              instance.close();
            }, 2000);
          }
        })
      },
      deleteA(e) {
        console.log(e)
        console.log(typeof(e.noid))
        this.$axios({
          method: 'delete',
          url: 'admin/del',
          params: {
            noid: e.noid
          }
        }).then((res) => {
          console.log(res)
          if (res.code == 0) {
            let instance = Toast('删除成功!');
            setTimeout(() => {
              instance.close();
              this.showAdmin()
            }, 2000);
            this.showAdmin()
          }else {
            console.log('error')
          }
        })
      },
      sd (a) {
        this.isDialog = false
      },
      showDialog () {
        this.isDialog = true
      },
      addAdmin() {
        // console.log(this.adminInfo)
        if (this.adminInfo.name !== '' &&
        this.adminInfo.tel !== '' &&
        this.adminInfo.pwd !== '' ) {
          this.$axios({
            method: 'post',
            url: 'admin/add',
            params: this.adminInfo
          }).then((res) => {
            console.log(res)
            if (res.code == 0) {
              let instance = Toast('添加成功!');
              setTimeout(() => {
                instance.close();
              }, 2000);
              this.isDialog = false
              this.adminInfo = {}
              this.showAdmin()
            }else if (res.code == 1) {
              let instance = Toast('已添加过!');
              setTimeout(() => {
                instance.close();
              }, 2000);
            }else {
              console.log('error')
            }
          })
        } else {
          let instance = Toast('请输入信息!');
          setTimeout(() => {
            instance.close();
          }, 1000);
        }
      }
    },
    components: {
      myHead
    }
  }
</script>

<style scoped>
@import url('../../../assets/css/user-manage.css');
.headScroll{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.manage-box{
  width: 100%;
  height: auto;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background: #fff;
}
.search-admin{
  border: 0;
  width: 40px;
  height: 42px;
  line-height: 42px;
  /*padding-left: 5px;*/
  float: right;
}
.input-item{
  display: flex;
  align-items: center;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 3px;
  overflow: hidden;
  color: #676767;
}
.input-item input{
  height: 30px;
  border: none;
  background: transparent;
  outline: none;
  color: #676767;
}
</style>