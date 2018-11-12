<template>
  <div class="module-city">
    <!-- 当前城市 -->
    <div class="module-target-city com-border-bottom">
      <div class="wauto flexbox" style="justify-content: space-between; align-items: center">
        <div class="" @click="back">
          <i class="iconfont icon-zuojiantou"></i>
        </div>
        <div class="">
          <i class="iconfont icon-dizhi mr10"></i>
          <span>当前城市：</span>
          <span class="tcolor">石家庄</span>
        </div>
      </div>
      <!-- 未开通 -->
      <p class="fz12 fzcenter" style="padding: 5px 0;">当前模式商未开通</p>
    </div>
    <!-- 城市列表 -->
    <mt-index-list class="mt10">
      <mt-index-section index="B">
          <mt-cell title="北京"></mt-cell>
          <mt-cell title="保定"></mt-cell>
          <mt-cell title="包头"></mt-cell>
      </mt-index-section>
      <mt-index-section index="C">
          <mt-cell title="重庆"></mt-cell>
          <mt-cell title="长沙"></mt-cell>
          <mt-cell title="成都"></mt-cell>
          <mt-cell title="常州"></mt-cell>
          <mt-cell title="常德"></mt-cell>
          <mt-cell title="承德"></mt-cell>
      </mt-index-section>
      <mt-index-section index="D">
          <mt-cell title="东莞"></mt-cell>
          <mt-cell title="大理"></mt-cell>
          <mt-cell title="大连"></mt-cell>
          <mt-cell title="大庆"></mt-cell>
          <mt-cell title="达州"></mt-cell>
          <mt-cell title="德州"></mt-cell>
          <mt-cell title="都江堰市"></mt-cell>
      </mt-index-section>
      <mt-index-section index="E">
          <mt-cell title="鄂州"></mt-cell>
          <mt-cell title="峨眉山市"></mt-cell>
          <mt-cell title="洱源县"></mt-cell>
      </mt-index-section>
      <mt-index-section index="F">
          <mt-cell title="福州"></mt-cell>
          <mt-cell title="福山"></mt-cell>
          <mt-cell title="阜阳"></mt-cell>
      </mt-index-section>
      <mt-index-section index="G">
          <mt-cell title="广州"></mt-cell>
          <mt-cell title="甘孜"></mt-cell>
          <mt-cell title="广安"></mt-cell>
          <mt-cell title="贵阳"></mt-cell>
          <mt-cell title="桂林"></mt-cell>
          <mt-cell title="广元"></mt-cell>
      </mt-index-section>
      <mt-index-section index="H">
          <mt-cell title="杭州"></mt-cell>
          <mt-cell title="合肥"></mt-cell>
          <mt-cell title="哈尔滨"></mt-cell>
          <mt-cell title="海北"></mt-cell>
          <mt-cell title="海口"></mt-cell>
          <mt-cell title="汉源县"></mt-cell>
          <mt-cell title="和田市"></mt-cell>
          <mt-cell title="黑河"></mt-cell>
          <mt-cell title="衡水"></mt-cell>
      </mt-index-section>
      <mt-index-section index="J">
          <mt-cell title="济南"></mt-cell>
          <mt-cell title="嘉兴"></mt-cell>
          <mt-cell title="吉安"></mt-cell>
          <mt-cell title="吉林"></mt-cell>
          <mt-cell title="鸡泽县"></mt-cell>
          <mt-cell title="晋中"></mt-cell>
          <mt-cell title="巨鹿县"></mt-cell>
      </mt-index-section>
      <mt-index-section index="K">
          <mt-cell title="喀什市"></mt-cell>
          <mt-cell title="开封"></mt-cell>
          <mt-cell title="昆明"></mt-cell>
      </mt-index-section>
      <mt-index-section index="L">
          <mt-cell title="拉萨"></mt-cell>
          <mt-cell title="兰陵县"></mt-cell>
          <mt-cell title="兰州"></mt-cell>
          <mt-cell title="廊坊"></mt-cell>
          <mt-cell title="乐山"></mt-cell>
          <mt-cell title="丽江"></mt-cell>
          <mt-cell title="鹿泉区"></mt-cell>
      </mt-index-section>
      <mt-index-section index="M">
          <mt-cell title="马鞍山"></mt-cell>
          <mt-cell title="梅州"></mt-cell>
          <mt-cell title="牡丹江"></mt-cell>
      </mt-index-section>
      <mt-index-section index="N">
          <mt-cell title="南昌"></mt-cell>
          <mt-cell title="南京"></mt-cell>
          <mt-cell title="南宁"></mt-cell>
          <mt-cell title="宁波"></mt-cell>
          <mt-cell title="南充"></mt-cell>
          <mt-cell title="内丘县"></mt-cell>
          <mt-cell title="宁德"></mt-cell>
          <mt-cell title="宁陵县"></mt-cell>
      </mt-index-section>
      <mt-index-section index="P">
          <mt-cell title="攀枝花"></mt-cell>
          <mt-cell title="蓬莱市"></mt-cell>
          <mt-cell title="萍乡"></mt-cell>
      </mt-index-section>
      <mt-index-section index="Q">
          <mt-cell title="青岛"></mt-cell>
          <mt-cell title="泉州"></mt-cell>
          <mt-cell title="齐齐哈尔"></mt-cell>
          <mt-cell title="清河县"></mt-cell>
          <mt-cell title="曲阜市"></mt-cell>
          <mt-cell title="衢州"></mt-cell>
      </mt-index-section>
      <mt-index-section index="R">
          <mt-cell title="任县"></mt-cell>
          <mt-cell title="日照"></mt-cell>
          <mt-cell title="饶河县"></mt-cell>
      </mt-index-section>
      <mt-index-section index="S">
          <mt-cell title="上海"></mt-cell>
          <mt-cell title="深圳"></mt-cell>
          <mt-cell title="石家庄"></mt-cell>
          <mt-cell title="苏州"></mt-cell>
          <mt-cell title="三亚"></mt-cell>
          <mt-cell title="沙河市"></mt-cell>
          <mt-cell title="绍兴"></mt-cell>
          <mt-cell title="沈阳"></mt-cell>
          <mt-cell title="十堰"></mt-cell>
      </mt-index-section>
      <mt-index-section index="T">
          <mt-cell title="天津"></mt-cell>
          <mt-cell title="泰和县"></mt-cell>
          <mt-cell title="太原"></mt-cell>
          <mt-cell title="唐山"></mt-cell>
      </mt-index-section>
      <mt-index-section index="W">
          <mt-cell title="温州"></mt-cell>
          <mt-cell title="武汉"></mt-cell>
          <mt-cell title="无锡"></mt-cell>
          <mt-cell title="潍坊"></mt-cell>
          <mt-cell title="威县"></mt-cell>
          <mt-cell title="汶川县"></mt-cell>
          <mt-cell title="乌鲁木齐"></mt-cell>
      </mt-index-section>
      <mt-index-section index="X">
          <mt-cell title="西安"></mt-cell>
          <mt-cell title="厦门"></mt-cell>
          <mt-cell title="西昌市"></mt-cell>
          <mt-cell title="咸阳"></mt-cell>
          <mt-cell title="新乐市"></mt-cell>
          <mt-cell title="邢台"></mt-cell>
          <mt-cell title="徐州"></mt-cell>
      </mt-index-section>
      <mt-index-section index="Y">
          <mt-cell title="雅安"></mt-cell>
          <mt-cell title="延安"></mt-cell>
          <mt-cell title="盐城"></mt-cell>
          <mt-cell title="烟台"></mt-cell>
          <mt-cell title="义乌市"></mt-cell>
          <mt-cell title="元氏县"></mt-cell>
      </mt-index-section>
      <mt-index-section index="Z">
          <mt-cell title="郑州"></mt-cell>
          <mt-cell title="枣强县"></mt-cell>
          <mt-cell title="张家口"></mt-cell>
          <mt-cell title="赵县"></mt-cell>
          <mt-cell title="遵义"></mt-cell>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    back () {
      this.$router.back(-1)
    }
  }
}
</script>

<style scoped>
.module-target-city{
  padding: 10px 0;
  box-shadow: 0 3px 5px #ccc;
}
</style>
