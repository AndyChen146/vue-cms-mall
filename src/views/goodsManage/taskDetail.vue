<template>
  <div class="con_right">
    <h2 class="wrap-title">商品操作任务</h2>
    <div class="con_box">
      <div class="labelItem">
        <div class="item">
          <span class="label">任务编号ID：</span>
          <div class="val">1</div>
        </div>
        <div class="item">
          <span class="label">提交时间：</span>
          <div class="val">2020-10-10 10:10:10</div>
        </div>
        <div class="item">
          <span class="label">类型：</span>
          <div class="val">导入</div>
        </div>
        <div class="item">
          <span class="label">状态：</span>
          <div class="val">完成</div>
        </div>
        <div class="item">
          <span class="label">文件名：</span>
          <div class="val">xxx.xls</div>
        </div>
        <div class="item">
          <span class="label">任务备注：</span>
          <div class="val">成功上传 1000 条数据，其中失败 500 条，分别对应行数为：</div>
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