<template>
  <!-- 添加公司信息 -->
  <div class="company-inert">
    <div class="company-form">
      <div class="img-box">
        <img src="../../../../assets/images/manage.jpg" width="100%" alt="">
        <marquee class="img-tip">tip：平台将于下一版本进行,公司信息审核,请尽快完善用户信息</marquee>
      </div>
      <!-- 必须值 -->
      <div class="">
        <h5 class="fzcenter mtb5"><span class="fccc ml10">*</span>公司基本信息</h5>
        <p class="fz12 mb10 fzcenter">以下信息为平台必要</p>
        <div class="form-lable">
          <mt-field label="公司名称" placeholder="公司名称" v-model="companyinfo.name"></mt-field>
          <mt-field label="公司类型" placeholder="公司类型" v-model="companyinfo.type"></mt-field>
          <mt-field label="所在城市" placeholder="如: 石家庄" v-model="companyinfo.city"></mt-field>
          <mt-field label="经营期限" placeholder="如：3" type="number" v-model="companyinfo.duration"></mt-field>
          <mt-field label="经营范围" placeholder="如:日常用品销售" v-model="companyinfo.scope"></mt-field>
          <div class="form-item com-border-bottom flexbox" @click="openDate">
            注册日期
            <span class="grow1 fzright">{{companyinfo.time}}</span>
          </div>
          <!-- <mt-field label="成立日期" placeholder="请输入用户名" v-model="companyinfo.join_time"></mt-field> -->
          <mt-field label="注册地址" placeholder="地址" v-model="companyinfo.address"></mt-field>
        </div>
      </div>
      <!-- 选填 -->
      <div class="">
        <h5 class="fzcenter mtb5" @click="isShowBaseInfo = !isShowBaseInfo">默认信息<i class="iconfont fz12 ml10" :class="!isShowBaseInfo ? 'icon-jiantou9' : 'icon-iconfonticontrianglecopy'"></i></h5>
        <p class="fz12 mb10 fzcenter">以下信息可以不填写</p>
        <div class="form-lable" v-show="isShowBaseInfo">
          <!-- <mt-field label="注册资本" placeholder="请输入用户名" v-model="username"></mt-field>
          <mt-field label="行业类型" placeholder="请输入用户名" v-model="username"></mt-field>
          <mt-field label="登记机关" placeholder="请输入用户名" v-model="username"></mt-field>
          <mt-field label="经营状态" placeholder="默认：经营中" v-model="companyinfo.operat"></mt-field>
          <mt-field label="社会信用代码" placeholder="请输入用户名" v-model="username"></mt-field>
          <mt-field label="组织机构代码" placeholder="请输入用户名" v-model="username"></mt-field> -->
        </div>
      </div>
    </div>
    <!-- 确定按钮 -->
    <div class="btn-wrap fzcenter">
      <button class="wauto sureBtn"
        type="button"
        name="button"
        @click="saveCompanyinfo">确定</button>
    </div>
		<mt-datetime-picker
			ref="pickerS"
			type="date"
      :startDate="sDate"
      @confirm="choseDate">
		</mt-datetime-picker>
  </div>
</template>

<script>
  // import {addCompanyInfo} from '@/assets/js/api/axios/apiNoLogin'
	import until from '@/assets/js/common/common'
  import {mapGetters} from 'vuex'
  import {Toast} from 'mint-ui'
  import qs from 'qs'
  export default {
    data () {
      return {
        isShowBaseInfo: false,
        companyinfo: {
          name: '',
          type: '',
          city: '',
          address: '',
          duration: '',
          scope: '',
          time: ''
        }
      }
    },
    computed: {
      sDate () {
        return new Date(1988, 0, 1)
      },
      ...mapGetters([
        'token'
      ])
    },
    methods: {
      choseDate (e, v) {
        this.companyinfo.time = until.analyDate(new Date(Date.parse(e))).slice(0, 10)
      },
      openDate () {
        this.$refs.pickerS.open()
      },
      saveCompanyinfo () {
        // 添加公司信息
        
        this.addCompanyInfo(this.companyinfo)
      },
      addCompanyInfo (data) {
        if (!this.valiteData(data)) {
          Toast('填写信息完整')
          return
        }
        let a = {}
        const _defaultData = {
          operat: '经营中', // 经营状态
          capital: 0,
          industry: '未填写',
          regist: '',
          creditcode: '',
          code: '',
          merchant_id: this.token
        }
        Object.assign(a, _defaultData, data)
        this.$axios.post('companyinfo/add', qs.stringify(a)).then(res => {
          let { code } = res
          if ( code === 0 ) {
            Toast('保存成功')
          } else {
            Toast('信息已经存在')
          }
          console.log(res)
        })
      },
			valiteData (obj) {
				let ret = false
				for (let i in obj) {
					if (obj[i] === '') {
						return false
					}
				}
				return true
			}
    }
  }
</script>

<style scoped>
/* img 盒子 */
.img-box{
  position: relative;
}
.img-tip{
  position: absolute;
  bottom: 10px;
  right: 0px;
  left: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px;
  font-size: 12px;
  color: #ffc524;
  background: rgba(0, 0, 0, 0.13);
}
.btn-wrap{
  margin-bottom: 55px;
}
.sureBtn{
  padding: 10px 0;
  background: #fbcb0f;
  border: none;
  outline: none;
}
.form-item{
  padding: 10px;
  background: white;
}
</style>
