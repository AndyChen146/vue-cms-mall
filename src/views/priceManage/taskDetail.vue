<template>
  <div class="con-right">
    <div class="priceTask-wrap">
      <h2 class="wrap-title">商品操作任务详情</h2>
      <div class="priceTask-con">
        <template>
          <el-table :data="tableData" stripe style="width: 100%;" align="center">
            <el-table-column prop="id" label="任务编号ID">
            </el-table-column>
            <el-table-column prop="time" label="提交时间">
            </el-table-column>
            <el-table-column prop="type" label="类型">
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>
            <el-table-column prop="note" label="任务备注" width="500" align="left">
            </el-table-column>
          </el-table>
        </template>
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
      tableData: [{
        id: '1',
        time: '2020-10-10 10:10:10',
        type: '同步K3价格',
        status: '完成',
        note: '任务备注：成功同步1000条数据，其中500条失败，条价格发生变行，分别对应K3号为：SR.0201103J10G、SR.0201103J10G、SR.0201103J10G、SR.0201103J10G、SR.0201103J10GSR.0201103J10G、SR.0201103J10G',
      }]
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
/deep/.el-table {
  font-size: 12px;
  line-height: 20px;
  color: #333333;
}
.priceTask-con {
  padding: 20px;
}
.linkDetail {
  color: #0067ed;
}
/deep/.el-table .cell {
  text-align: center;
  line-height: 20px;
}
/deep/.el-table th {
  background: #e9f5ff;
}
/deep/.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #e9f5ff;
}
/deep/.el-table td,
.el-table th {
  padding: 10px 0;
}
</style>