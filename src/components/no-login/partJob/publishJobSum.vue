<template>
  <div class="personsum">
    <!-- <my-head :titleConfig="titleConfig"></my-head> -->
    <!-- <p class="mb10 mt10 fz12" style="color: #ccc"><span>左滑动拒绝用户</span><span>右滑动拒绝用户</span></p>
    <p class="mb10 mt10 fz12" style="color: #ccc"><span>拨打电话了解详情</span></p> -->
    <!-- s back -->
    <div class="back">
      <div class="wauto back-inner flexbox">
        <div class="icon" @click="back"><i class="iconfont icon-zuojiantou fz12"></i></div>
        <div class="title grow1 fzcenter">消息</div>
        <i class="iconfont"></i>
      </div>
    </div>

    <!-- input kuang -->
    <div class="input-wrap">
      <div class="flexbox input-wrap-inner">
        <i class="iconfont icon-chaxun"></i>
        <input class="input-box" type="text" name="" value="">
      </div>
    </div>
    <div class="flexbox bix-wrap">
      <div class="bix" v-for="(v, k) in PersonsumList" :key="k">
        <h4>
          <span>{{v.userInfoModel.name}}</span>
          <a :href="'tel:' + v.tel" class="fz12 mtb10">{{v.tel}}</a>
        </h4>
        <p class="youshi">{{v.youshi}}</p>
        <!-- 时间 - 报名 -->
        <div class="bix-time" v-if="stateid == 0">
          <span class="bix-no" @click="swipeBtn(v, 'refuse')">拒绝</span>
          <span>{{v.create_time}}</span>
          <span class="bix-yes" @click="swipeBtn(v, 'sure')">录用</span>
        </div>
        <!-- 时间 - 录用 -->
        <div class="bix-time" v-if="stateid == 1">
          <span>{{v.create_time}}</span>
          <span class="bix-yes" @click="swipeBtn(v, 'finished')">确认完工</span>
        </div>
      </div>
    </div>

    <!-- 当前工作的报名数量 -->
    <!-- {{PersonsumList}} -->
  </div>
</template>

<script>
  import myHead from '@/common/head/my-head'
  import until from '@/assets/js/common/common'
  import { Indicator, Toast } from 'mint-ui'
  import { selWorksheet, selDetailsByUser, updWorksheetState } from '@/assets/js/api/axios/apiLogin'
  import { seluser, seluserinfo } from '@/assets/js/api/axios/apiNoLogin'
  export default {
    data() {
      return {
        PersonsumList: [],
        titleConfig: {
          title: '消息',
          isBack: true
        }
      }
    },
    computed: {
      partid () {
        return this.$route.query.id
      },
      stateid () {
        return this.$route.query.stateid
      }
    },
    created () {
      this._initMypublishJob(this.partid, this.$route.query.stateid)
    },
    methods: {
      back () {
        this.$router.back(-1)
      },
      swipeBtn (v, is) {
        // 点击拒绝按钮
        // if (is === 'refuse') {
        //   // state: 拒绝
        //   this.UPDWorksheetState({
        //     part_id: this.$route.query.id,
        //     userinfo_id: v.noid,
        //     state: 1
        //   }, is)
        // }
        // 点击录用按钮
        if (is === 'sure') {
          // state: 1录用
          this.UPDWorksheetState({
            part_id: this.$route.query.id,
            userinfo_id: v.noid,
            state: 1
          }, is)
        }
        // 点击完工按钮
        if (is === 'finished') {
          // state: 3 完工
          this.UPDWorksheetState({
            part_id: this.$route.query.id,
            userinfo_id: v.noid,
            state: 3
          }, is)
        }
      },
      _initMypublishJob (s, __Stateid) {
        // 审核用户tab框
        Indicator.open()
        // console.log(__Stateid)
        // 根据兼职Id查询当前报名的所用用户
        selWorksheet({
          part_id: s
        }).then(res => {
          // 返回
          return res.res
        }).then(userList => {
          // Indicator.open()
          // 遍历获取到的报名用户列表
          // 筛选出报名用户信息
          userList.filter(v => v.state == __Stateid).forEach((item, k) => {
            // 查询用户报名的所有兼职信息
            selDetailsByUser({
              noid: item.userinfo_id
            }).then(res => {
              Indicator.open()
              // 筛选出和当前part_id一样的对象
              let enrollResult = res.res.filter(v => v.part_id === this.$route.query.id)[0]
              return enrollResult
            }).then(enrollResult => {
              // 查出当前用户的信息
              // console.log(enrollResult)
              seluserinfo({
                noid: enrollResult.userinfo_id
              }).then(res => {
                let _res = {}
                let ctime = until.analyDate(new Date(Date.parse(enrollResult.create_time)))
                Object.assign(_res, res.res, {youshi: enrollResult.advantage, create_time: ctime})
                this.PersonsumList.push(_res)
                // console.log(_res)
              })
            })
          })
        })
      },
      UPDWorksheetState (data, _is) {
        updWorksheetState(data).then(res => {
          let { code } = res
          if ( code === 0 ) {
            // 录用状态
            // if ( _is === 'sure' ) {
              Toast('修改成功')
              this.PersonsumList = [] // 赋值为空,从新获取
              this._initMypublishJob(this.$route.query.id, this.$route.query.stateid)
            // }
          } else {
            Toast('抱歉发生未知错误')
          }
          // if (res.code === 0 && _is === 'sure') {
          //   Toast('修改成功')
          //   this.PersonsumList = [] // 赋值为空,从新获取
          //   this._initMypublishJob(this.$route.query.id, this.$route.query.stateid)
          // } else {
          //   Toast('抱歉发生错误')
          // }
        })
      }
    },
    watch: {
      partid (newVal, old) {
        this.PersonsumList = []
        if (old) return
        this._initMypublishJob(newVal, this.$route.query.stateid)
      }
    },
    components: {
      myHead
    }
  }
</script>

<style scoped>
.back{
  height: 40px;
  line-height: 40px;
  color: black;
  font-weight: bold;
}
.back-inner{
  display: flex;
}
.input-wrap{
  line-height: 40px;
  padding: 0 5px;
  margin: 10px 0;
}
.input-wrap-inner {
  border: 1px solid #e8e8e8;
  padding: 0 5px;
  background: white;
}
.input-box {
  flex-grow: 1;
  border: none;
  outline: none;
  margin-left: 5px;
}
/* 列表块级 */
.bix-wrap {
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 5px;
}
.bix-yes {
  color: #1d00f1;
}
.bix-no {
  color: black;
}
.bix {
  position: relative;
  flex-grow: 1;
  width: 150px;
  height: 150px;
  padding: 5px;
  overflow: auto;
  border: 1px solid #e8e8e8;
  background: white;
  box-shadow: 0 0 3px #eee;
}
.bix:before{
  position: absolute;
  top: -5px;
  left: 0;
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid #ccc;
}
.bix:nth-child(2n) {
  margin-left: 7px;
}
.bix-time {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  color: #ccc;
  font-size: 12px;
  padding: 5px;
  /* background: #ccc; */
}
.bix .youshi {
  font-size: 14px;
  text-indent: 1em;
  color: #7b7b7b;
}
/* 列表竖行 */
.personsum{
  min-height: 100%;
  padding-bottom: 50px;
  background: rgba(229, 229, 229, 0.3);
}
.usertop{
  align-items: center;
}
.advantage-wrap{
  padding: 12px;
  background: rgba(229, 229, 229, 0.3);
}
</style>
