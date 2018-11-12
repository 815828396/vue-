<template>
  <div class="real">
    <!-- head -->
    <my-head :titleConfig="titleConfig"></my-head>
    <!-- 实名制 头部 -->
    <div class="real-head">
      <div class="wauto search-box">
        <div>盈享兼职</div>
        <div class="grow1 real-search">
          <i @click='searchUser' class="iconfont icon-chaxun ml10 mr10"></i>
          <input class="real-input" type="search" v-model='usersName' refs='input1' placeholder="输入用户昵称" @keyup.13=searchUser()>
        </div>
      </div>
    </div>
    <!-- 用户列表 -->
    <div class="real-list mb20">
      <h5 class="wauto mb10">审批列表</h5>
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="1"
      >
        <li class="real-list-item wauto" v-for="(v,i) in usersInfo">
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
            <!-- <span class="sure" @click='delUser(v)'>删除</span> -->
            <span class="cant" @click='getBlack(v)'>拉黑</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 添加 -->
    <div class="manage-add" @click="showDialog" v-if='false'>
      <i class="iconfont icon--jia" style="font-size: 22px; color: white;"></i>
    </div>

    <!-- 添加模态框框 -->
    <Dialog :dialogConfig="dialogConfig" @sure="sureBlack" @cancel="sd" v-if="isDialog">
      <div class="">
        <div class="fzcenter"><img src="../../../assets/images/img-head.jpg" alt="" width="100px;"></div>
        <div class="input-group wauto">
          <div class="input-item"><span class="mr10 ml10 fz12">姓名:</span><input type="text" v-model="userInfo.name" disabled="disabled"></div>
          <div class="input-item"><span class="mr10 ml10 fz12">电话:</span><input type="number" v-model="userInfo.tel" disabled="disabled"></div>
          <div class="input-item"><span class="mr10 ml10 fz12">原因:</span><input type="text" v-model="userInfo.reason" placeholder="请输入拉黑原因"></div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
  import myHead from '@/common/head/my-head'
  import {Toast, Lazyload, InfiniteScroll, Indicator} from 'mint-ui'
  export default {
    data () {
      return {
        titleConfig: {
          title: '用户管理',
          isBack: true
        },
        dialogConfig: {
          sureText: '确认',
          cancelText: '取消'
        },
        as: 0,
        isDialog: false,
        usersInfo: [],
        usersName: '',
        userInfo: {
          noid: '',
          name: 'xx',
          tel: '',
          reason: ''
        },
        pageInfo: {
          current: 0,   // 当前页
          arr: [],      // 总数组
          count: 3,     // 每页个数
          end: '',      // 最后一条数据的下标+1
        }
      }
    },
    created() {
      this.showUser()
    },
    methods: {
      loadMore() {
        this.loading = true;
        
        let maxend = Math.floor(this.pageInfo.arr.length / this.pageInfo.count)
        // console.log(maxend)
        this.pageInfo.current >= maxend
            ? (maxend && Toast('没有东西了哦!'))
            : this.pageInfo.current++
          console.log(this.pageInfo)
          this.pageInfo.end = 
            this.pageInfo.count * (this.pageInfo.current + 1) 
            > this.pageInfo.arr.length
            ? this.pageInfo.arr.length
            : this.pageInfo.count * (this.pageInfo.current + 1)
          console.log(this.pageInfo.end)
          let addData = this.pageInfo.end < this.pageInfo.arr.length
            ? this.usersInfo 
              = this.usersInfo.concat(this.pageInfo.arr.slice(
                  this.pageInfo.count * this.pageInfo.current, 
                  this.pageInfo.end
                ))
            : this.usersInfo
              = this.pageInfo.arr
        Indicator.open()
        // 再次运行加载,data在内setTimeout 不可控 this指向变化
        setTimeout(() => {
          
          // if (this.pageInfo.end < this.pageInfo.arr.length) {
          //   this.usersInfo = this.usersInfo.concat(this.pageInfo.arr.slice(
          //     this.pageInfo.count * this.pageInfo.current, 
          //     this.pageInfo.end
          //   ))
          // } else {
          //   this.usersInfo = this.pageInfo.arr
          // }
          this.loading = false;
          Indicator.close()
        }, 500);
      },
      showUser(name) {
        this.$axios({
          method: 'get',
          url: 'user/selA',
          params: {
            state: '1',
            name: '' || name
          }
        }).then((res) => {
          // console.log(res)
          if (res.code == 0) {
            this.usersInfo = res.res
            // console.log(this.usersInfo)
            this.pageInfo.arr = this.usersInfo
            console.log(this.pageInfo.arr)
            this.usersInfo = this.pageInfo.arr.slice(
              this.pageInfo.count * this.pageInfo.current,
              this.pageInfo.count * (this.pageInfo.current + 1)
            )
            console.log(this.usersInfo)
            let instance = Toast('查询成功!');
            setTimeout(() => {
              instance.close();
            }, 2000);
          }else if (res.code == 1) {
            let instance = Toast('无法查询!');
            setTimeout(() => {
              instance.close();
            }, 2000);
          }else {
            console.log('error')
          }
        })
      },
      searchUser() {
        console.log(this.usersName)
        this.showUser(this.usersName)
        this.$refs.input1.blur()
      },
      delUser(e) {
        console.log(e)
      },
      getBlack(e) {
        console.log(e)
        this.userInfo.name = e.name
        this.userInfo.tel = e.tel
        this.userInfo.noid = e.noid
        this.isDialog = true
      },
      sureBlack() {
        console.log(this.userInfo)
        this.$axios({
          method: 'put',
          url: 'user/updS',
          params: {
            noid: this.userInfo.noid,
            state: 0,
            info: this.userInfo.reason
          }
        }).then((res) => {
          console.log(res)
          if (res.code == 0) {
            this.isDialog = false
            if (!this.isDialog) {
              this.userInfo.reason = ''
            }
            Toast({
              message: '用户已拉黑!'
            })
          } else {
            Toast({
              message: '拉黑失败!'
            })
          }
        })
      },
      sd (a) {
        this.isDialog = false
      },
      showDialog () {
        this.isDialog = true
      },
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
.input-item{
  display: flex;
  align-items: center;
  margin: 10px 0;
  /*border: 1px solid #ccc;*/
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