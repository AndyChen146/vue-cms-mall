<template>
  <div class="con_right">
    <h2 class="wrap-title">查看日志详情内容</h2>
    <div class="con_box" v-loading="loading">
      <table class="tables">
        <tr>
          <th>ID</th>
          <th>字段</th>
          <th>名称</th>
          <th>旧值</th>
          <th>新值</th>
        </tr>
        <tr :class="index%2 != 0 ? 'items' : ''" v-for="(item,index) in lists" :key="index">
          <td>{{item.lc_id}}</td>
          <td>{{item.column_name}}</td>
          <td>{{item.column_desc}}</td>
          <td>{{item.original_value}}</td>
          <td>{{item.current_value}}</td>
        </tr>

      </table>
      <div class="no_data" v-show="nodatashow">
        <img src="@/assets/images/no_data.png" alt="">
        <p class="ts">暂无数据</p>
      </div>
    </div>
    <el-pagination background layout="prev, pager, next" :total="totals" v-if="totals>0" :page-size="params.size" @current-change="currentChange">
    </el-pagination>

  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'home',
  components: {

  },
  data () {
    return {
      lists: [],
      totals: 0,
      params: {
        page: 1,
        size: 20,
        log_id: ''
      },
      loading: false,
      nodatashow: false
    }
  },
  created () {
    if (this.$route.query.log_id) {
      this.params.log_id = this.$route.query.log_id
      this.getList()
    }
  },
  computed: {
    ...mapState('demo', ['vuexres', 'count'])
  },
  methods: {
    ...mapActions('lyf', ['getAccessDetail']),
    getList () {
      let _self = this;
      _self.loading = true
      _self.getAccessDetail(_self.params).then(res => {
        _self.loading = false
        if (res.status == "0") {
          _self.lists = res.data.list
          _self.totals = res.data.total
          if (_self.lists.length <= 0) {
            _self.nodatashow = true
          }
        } else {
          _self.nodatashow = true
        }
      })
    },
    currentChange (e) {
      this.params.page = e
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
.con_right {
  .con_box {
    width: 100%;
    padding: 20px;
    .tables {
      width: 100%;
      tr {
        th {
          height: 40px;
          line-height: 40px;
          color: #999999;
          font-size: 13px;
          background-color: #e9f5ff;
        }

        td {
          height: 54px;
          line-height: 54px;
          color: #666666;
          font-size: 12px;
          text-align: center;
        }
      }
      .items {
        background-color: #e9f5ff;
      }
    }
  }
}
/deep/.el-pagination {
  margin-top: 40px;
  text-align: right;
}
</style>