<template>
  <div class="allwindow">
    <my-head :titleConfig="titleConfig"></my-head>
    <!-- 路由模块 -->
    <div class="sub-route_list mt10">
      <div class="box">
        <div class="wauto">
          <h6 class="mktitle">个人信息</h6>
          <div   to="/myInfo/myWallet" class="route_item">
            <div class="grow1">简历头像</div>
            <div>
              <i class="iconfont icon-youjiantou"></i>
            </div>
          </div>
          <div class="route_item">
            <div class="grow1">姓名</div>
            <div>
              <input type="text" class="updInput" v-model="info.name" :placeholder="!info.name ? '未填写' : info.name">
              <i class="iconfont icon-youjiantou"></i>
            </div>
          </div>
          <div class="route_item" @click="SexVisible = true">
            <div class="grow1">性别</div>
            <div>
              <span class="fz12">{{!info.sex ? '未填写' : info.sex}}</span>
              <i class="iconfont icon-youjiantou"></i>
            </div>
            <!-- <div>
              <mt-radio
                title="单选框列表"
                v-model="value"
                :options="['男', '女', '未填写']">
              </mt-radio>
              <mt-switch v-model="info.sex" class="fz12" @change="handleSex">{{info.sex}}</mt-switch>
            </div> -->
          </div>
          <div class="route_item">
            <div class="grow1">所在城市</div>
            <div>
              <span class="fz12">{{!info.county ? '未填写' : info.county}}</span>
              <i class="iconfont icon-youjiantou"></i>
            </div>
          </div>
          <div class="route_item" @click="openBirthday">
            <div class="grow1">生日</div>
            <div>
              <span class="fz12">{{!info.birth ? '未填写' : showBirth(info.birth)}}</span>
              <i class="iconfont icon-youjiantou"></i>
            </div>
          </div>
          <div class="route_item">
            <div class="grow1">身高</div>
            <div>
              <input type="text" class="updInput" v-model="info.height" :placeholder="!info.height ? '未填写' : info.height">
              <!-- <span class="fz12">{{!info.height ? '未填写' : info.height}}</span> -->
              <i class="iconfont icon-youjiantou"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="box mt10">
        <div class="wauto">
          <h6 class="mktitle">联系方式</h6>
          <div class="route_item" @click="popupVisible = true">
            <div class="grow1">教育状态</div>
            <div style="overflow: hidden">
              <!-- <input type="text" v-model="info.edu" style="border: none; outline: none; text-align:right"> -->
              <span class="fz12">{{!info.edu ? '未填写' : info.edu}}</span>
              <i class="iconfont icon-youjiantou"></i>
            </div>
          </div>
          <div class="route_item">
            <div class="grow1">手机号</div>
            <div>
              <input type="text" class="updInput" :placeholder="userInfo.tel">
              <i class="iconfont icon-youjiantou"></i>
            </div>
          </div>
          <div class="route_item">
            <div class="grow1">邮箱</div>
            <div>
              <input type="text" class="updInput" v-model="info.email" :placeholder="!info.email ? '未填写' : info.email">
              <!-- <span class="fz12">{{!userInfo.email ? '未填写' : userInfo.email}}</span> -->
              <i class="iconfont icon-youjiantou"></i>
            </div>
          </div>
          <div class="route_item">
            <div class="grow1">QQ</div>
            <div>
              <input type="text" class="updInput" v-model="info.qq" :placeholder="!info.qq ? '未填写' : info.qq">
              <!-- <span class="fz12">{{!userInfo.qq ? '未填写' : userInfo.qq}}</span> -->
              <i class="iconfont icon-youjiantou"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- 保存按钮 -->
      <div class="save mt10">
        <button class="save-btn" @click="saveBtn">保存</button>
      </div>

      <!-- 教育状态 -->
      <mt-popup
        v-model="popupVisible"
        position="bottom"
        popup-transition="popup-fade"
        style="width:100%">
          <mt-picker :slots="edu" @change="onValuesChange"></mt-picker>
      </mt-popup>
      <!-- 性别 -->
      <mt-popup
        v-model="SexVisible"
        position="bottom"
        popup-transition="popup-fade"
        style="width:100%">
          <mt-picker :slots="sex" @change="onSexChange"></mt-picker>
      </mt-popup>
      <!-- 生日 -->
      <mt-datetime-picker
        ref="pickerBirsthday"
        type="date"
        :startDate="sDate"
        :endDate="eDate"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirm">
      </mt-datetime-picker>

    </div>
  </div>
</template>

<script>
  import myHead from '@/common/head/my-head'
  import until from '@/assets/js/common/common'
  import { mapGetters, mapMutations } from 'vuex'
  import { updUserInfo, seluser } from '@/assets/js/api/axios/apiNoLogin'
  import { Toast, Indicator } from 'mint-ui'
  export default {
    data () {
      return {
        edu: [{values: ['在校生', '待业', '工作中']}],
        sex: [{values: ['男', '女']}],
        sDate: new Date('1980'),
        eDate: new Date('2018'),
        titleConfig: {
          title: '基础信息',
          isBack: true
        },
        info: {},
        popupVisible: false,
        SexVisible: false,
        slots: [
          {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot1',
            textAlign: 'right'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot3',
            textAlign: 'left'
          }
        ]
      }
    },
    computed: {
      value () {
        return this.info.sex === false ? '男' : '女'
      },
      ...mapGetters([
        'userInfo',
        'token'
      ])
    },
    created () {
      console.log(this.info)
      seluser({
        noid: this.token
      }).then(res => {
        this.info = res.res
        this.info.sex = res.res.sex === 0 ? '男' : '女'
      })
    },
    methods: {
      onValuesChange(picker, values) {
        this.info.edu = values[0]
      },
      onSexChange (e, v) {
        this.info.sex = v[0]
      },
      openSex () {
        this.SexVisible = true
      },
      openBirthday () {
        this.$refs.pickerBirsthday.open()
      },
      handleConfirm (e) {
        let result = until.analyDate(e)
        this.info.birth = result
        console.log(this)
        // console.log(new Date(e))
      },
      handleSex (e) {
        console.log(e)
        // 选择性别
        // this.info.sex = e
        this.value = e ? '男' : '女'
      },
      saveBtn () {
        // Indicator.open()
        this.info.birth = this.info.birth.substr(0, 10).replace(/-/g, '')
        this.info.sex = this.info.sex === '男' ? 0 : 1
        this.info.user_id = ''
        // this.$axios.put('userInfo/')
        console.log(this.info)
        updUserInfo(this.info).then(res => {
          if (res.code === 0) {
            Toast('修改成功')
            window.location.reload()
          }
        })
      },
      showBirth (birth) {
        if (birth.indexOf('-') > 0) return birth.substr(0, 10)
        return birth.substr(0, 4) + '-' + birth.substr(4, 2) + '-' + birth.substr(6, 8)
        // return birth
      }
    },
    components: {
      myHead
    }
  }
</script>

<style scoped>
/* 路由 list */
.sub-route_list{
  min-height: 300px;
  overflow: auto;
  box-shadow: 0 2px 5px #ccc;
}

.route_item{
  display: flex;
  height: 50px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  overflow: hidden;
  color: #7b7b7b;
}
.route_item:last-child{
  border-bottom: none;
}
.mktitle{
  margin: 10px 0;
}
.box{
  background: white;
  overflow: hidden;
}
.save{
  height: 50px;
  line-height: 50px;
  margin: 20px 0;
  background: white;
  text-align: center;
}
.save-btn{
  width: 50%;
  height: 30px;
  background: #f4cb08;
  border: none;
  border-radius: 10px;
}
.updInput{
  outline: none;
  border: none;
  text-align: right;
  font-size: 12px;
  color: #3c3c3c;
}
</style>
