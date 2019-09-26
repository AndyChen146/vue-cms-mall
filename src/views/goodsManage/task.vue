<template>
  <div class="con_right">
    <h2 class="wrap-title">商品操作任务</h2>
    <div class="con_table">
      <table class="tables">
        <tr>
          <th>任务ID</th>
          <th>提交时间</th>
          <th>类型</th>
          <th>状态</th>
          <th>任务备注</th>
          <th>文件名</th>
          <th>操作</th>
        </tr>
        <tr>
          <td>1</td>
          <td>2020-10-10 10:10:00</td>
          <td>导出</td>
          <td>未完成</td>
          <td>成功上传 1000条数据，其中失败200条</td>
          <td>xxx.xls</td>
          <td>
            <em class="down">下载</em>
            <em class="detail">详情</em>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>2020-10-10 10:10:00</td>
          <td>导出</td>
          <td>未完成</td>
          <td>成功上传 1000条数据，其中失败200条</td>
          <td>xxx.xls</td>
          <td>
            <em class="down">下载</em>
            <em class="detail" @click="detail">详情</em>
          </td>
        </tr>
      </table>
    </div>
    <el-pagination background layout="prev, pager, next" :total="100">
    </el-pagination>
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
    ...mapActions('demo', ['increment', 'decrement', 'getProvince']),
    detail () {

    }
  },
}
</script>
<style lang="scss" scoped>
.con_table {
  .tables {
    width: 100%;
    tr {
      th {
        height: 40px;
        line-height: 40px;
        color: #666666;
        font-size: 12px;
        text-align: center;
      }
      th:first-child {
        padding-left: 10px;
      }
      td {
        height: 54px;
        line-height: 54px;
        color: #333333;
        font-size: 12px;
        text-align: center;
        em {
          color: #0067ed;
          cursor: pointer;
          margin-right: 10px;
        }
        .edit {
          color: #0067ed;
          cursor: pointer;
        }
      }
      td:first-child {
        padding-left: 10px;
      }
    }
    tr.item:hover {
      background-color: #f2f6ff;
      cursor: pointer;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
      opacity: 1;
    }
  }
}
/deep/.el-pagination {
  margin-top: 40px;
  text-align: right;
}
</style>