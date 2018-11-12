<template>
  <div class="myInfo">
    <my-head :titleConfig="titleConfig"></my-head>
    <!-- 个人信息头部 -->
    <div class="my-head">
      <div class="info_img">
        <div><img src="../../../assets/images/img-head.jpg" alt="" width="100%"></div>
      </div>
      <div @click="updInfo">
        <div class="info_number">
          <span><i class="iconfont icon-Group-"></i></span>
          <strong>{{userInfo.tel}}</strong>
        </div>
        <div class="info_grade">
          <span class="info_grade_lv">
            <i class="iconfont icon-dengji"></i>
            <strong>{{userInfo.vip === 0 ? '用户' : '会员'}}</strong>
          </span>
          <span class="info_grade_fen">
            <i class="iconfont icon-yuandianxiao"></i>
            <span class="fz12">
              <b class="intg">{{userInfo.intg}}</b>分
            </span>
          </span>
        </div>
      </div>
    </div>
    <!-- 商户路由模块不同 -->
    <div class="sub-route_list mt10" v-if="userInfo.type === 'shoper'">
      <div class="wauto">
        <router-link tag="div" to="/myInfo/myWallet" class="route_item">
          <div class="bgimg bg1"></div>
          <div class="grow1 ml10">公司资质</div>
          <div><i class="iconfont icon-youjiantou"></i></div>
        </router-link>
        <router-link tag="div" to="/myInfo/myWallet" class="route_item">
          <div class="bgimg bg2"></div>
          <div class="grow1 ml10">团队管理</div>
          <div><i class="iconfont icon-youjiantou"></i></div>
        </router-link>
      </div>
    </div>
    <!-- 普通用户路由模块 -->
    <div class="sub-route_list mt10" v-else>
      <div class="wauto">
        <router-link tag="div" to="/myInfo/myWallet" class="route_item">
          <div class="bgimg bg1"></div>
          <div class="grow1 ml10">教育背景</div>
          <div><i class="iconfont icon-youjiantou"></i></div>
        </router-link>
        <router-link tag="div" to="/myInfo/myWallet" class="route_item">
          <div class="bgimg bg2"></div>
          <div class="grow1 ml10">工作经历</div>
          <div><i class="iconfont icon-youjiantou"></i></div>
        </router-link>
        <router-link tag="div" to="/myInfo/myWallet" class="route_item">
          <div class="bgimg bg3"></div>
          <div class="grow1 ml10">工作期望</div>
          <div><i class="iconfont icon-youjiantou"></i></div>
        </router-link>
        <router-link tag="div" to="/myInfo/myWallet" class="route_item">
          <div class="bgimg bg4"></div>
          <div class="grow1 ml10">技能/证书</div>
          <div><i class="iconfont icon-youjiantou"></i></div>
        </router-link>
        <router-link tag="div" to="/myInfo/myWallet" class="route_item">
          <div class="bgimg bg5"></div>
          <div class="grow1 ml10">个人评价</div>
          <div><i class="iconfont icon-youjiantou"></i></div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { selUserInfo } from '@/assets/js/api/axios/apiNoLogin'
  import { mapGetters, mapMutations } from 'vuex'
  import myHead from '@/common/head/my-head'
  export default {
    data () {
      return {
        titleConfig: {
          title: '编辑简历',
          isBack: true
        },
        info: {
          tel: '',
          intg: '',
          vip: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    created () {
      this.initsellUserInfo()
    },
    methods: {
      initsellUserInfo () {
        selUserInfo({
          noid: localStorage.getItem('token_noid')
        }).then(result => {
          let {tel, intg, vip, name, create_time: ctime, head_img: img, state} = result.res[0]
          this.setUserInfo(result.res[0])
          this.info.tel = tel
          this.info.intg = intg
          this.info.vip = vip === 0 ? '会员' : '用户'
          localStorage.setItem('userInfo', JSON.stringify(result.res[0]))
        })
      },
      updInfo () {
        this.$router.push({
          path: '/myBase'
        })
      },
      ...mapMutations({
        setUserInfo: 'SET_USER_INFO'
      })
    },
    components: {
      myHead
    }
  }
</script>

<style scoped>
.btn{
  display: block;
  width: 80%;
  margin: 0 auto;
  padding: 10px 0;
  text-align: center;
  background: #fbcb0f;
  font-size: 12px;
  color: white;
  border-radius: 10px;
}
.myInfo{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;
  width: 100%;
  height: 100%;
  background: #eee;
}
.my-head{
  padding-bottom: 10px;
  background: white;
}
.info_img{
  width: 50%;
  margin: 0 auto;
}
.info_grade,
.info_number{
  text-align: center;
}
.info_number{
  margin: 10px 0;
}
.info_grade_lv{
  margin-right: 20px;
  font-weight: bold;
}
.sub-route_list{
  min-height: 300px;
  background: white;
}
.route_item{
  display: flex;
  height: 50px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  color: #7b7b7b;
}

.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
  transition: all 1.3s;
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
  transition: all 1.3s;
}
.bgimg{
  width: 27px;
  height: 27px;
  background: url('../../../assets/images/icon-group.jpg');
  background-size: 228px;
}
.bg1{
  background-position: 0px -178px;
}
.bg2{
  background-position: -25px -178px;
}
.bg3{
  background-position: -45px -178px;
}
.bg4{
  background-position: -65px -178px;
}
.bg5{
  background-position: -86px -178px;
}
.intg{
  font-size: 18px;
  font-weight: bold;
  margin-right: 3px;
  color: #f60;
}
</style>