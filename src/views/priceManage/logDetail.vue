<template>
  <div class="con_right">
    <h2 class="wrap-title">价格日志详情</h2>
    <div class="con_box">
      <div class="labelItem">
        <div class="item">
          <span class="label">商品K3编号：</span>
          <div class="val">SR.0201103J10G</div>
        </div>
        <div class="item">
          <span class="label">商品分类：</span>
          <div class="val">贴片电阻</div>
        </div>
        <div class="item">
          <span class="label">调价前：</span>
          <div class="val">
            <p>50+ ￥0.032544/pcs</p>
            <p>1500+ ￥0.028928/pcs</p>
            <p>3000+ ￥0.019526/pcs</p>
            <p>15000+ ￥0.019165/pcs</p>
            <p>30000+ ￥0.018803/pcs</p>
          </div>
        </div>
        <div class="item">
          <span class="label">调价后：</span>
          <div class="val">
            <p>50+ ￥0.032544/pcs</p>
            <p>1500+ ￥0.028928/pcs</p>
            <p>3000+ ￥0.019526/pcs</p>
            <p>15000+ ￥0.019165/pcs</p>
            <p>30000+ ￥0.018803/pcs</p>
          </div>
        </div>
        <div class="item">
          <span class="label">操作信息：</span>
          <div class="val">
            <p>admin</p>
            <p>2020-07-07 16:58:11</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
    }
  },
  created () {

  },
  mounted () {

  },
  computed: {
    ...mapState('demo', ['vuexres', 'count'])
  },
  methods: {
    ...mapActions('demo', ['increment', 'decrement', 'getProvince'])
  },
}
</script>
<style lang="scss" scoped>
.con_box {
  padding: 30px;
  .labelItem {
    .item {
      .val {
        margin-left: 86px;
      }
    }
  }
}
</style>