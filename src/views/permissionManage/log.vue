<template>
  <div class="con_right">
    <h2 class="wrap-title">筛选查询
      <!-- <span class="fr state">收起<i class="el-icon-caret-bottom"></i></span> -->
    </h2>
    <div class="brand_search">
      <span>操作人员：</span>

      <el-select v-model="opearVal" placeholder="请选择" class="search_sel">
        <el-option v-for="item in opearlist" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker v-model="value2" type="daterange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" @change="changeTime" value-format="yyyy-MM-dd">
      </el-date-picker>
      <button type="button" @click="search"><i class="el-icon-search"></i>查询结果</button>
    </div>
    <h2 class="wrap-title">数据列表
      <div class="fr opeat">
        <template>
          <el-select v-model="showNumVal" placeholder="显示条数" @change="sizechange">
            <el-option v-for="item in showNum" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </template>
      </div>
    </h2>
    <div class="con_table">
      <table class="tables" v-loading="loading">
        <tr>
          <th class="span340">操作</th>
          <th class="span80">操作类型</th>
          <th class="span200">路由</th>
          <th class="span80">数据ID</th>
          <th class="span80">操作人</th>
          <th class="span180">日期</th>
          <th class="span60">操作</th>
        </tr>
        <tr class="item" v-for="(item,index) in lists" :key="item.log_id">
          <td class="span340">{{item.type_name}}</td>
          <td class="span80">{{item.comment}}</td>
          <td class="span200">{{item.operator_addr}}</td>
          <td class="span80">400</td>
          <td class="span80">{{item.operator_name}}</td>
          <td class="span180">{{formatDate[index]}}</td>
          <td class="span60">
            <router-link :to="{path:'/permission/log/detail',query: {'log_id': item.log_id}}">
              <em class="look">查看</em>
            </router-link>
          </td>
        </tr>
      </table>
      <div v-show="!nodatashow">
        <el-pagination background layout="prev, pager, next" :total="totals" v-if="totals>0" :page-size="params.size" @current-change="currentChange">
        </el-pagination>
      </div>
      <div class="no_data" v-show="nodatashow">
        <img src="@/assets/images/no_data.png" alt="">
        <p class="ts">暂无数据</p>
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
      state: true,
      loading: false,
      nodatashow: false,
      showNum: [
        {
          id: 5,
          name: 5
        },
        {
          id: 10,
          name: 10
        },
        {
          id: 20,
          name: 20
        }
      ],
      showNumVal: '',
      opearlist: [],
      opearVal: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value2: '',
      params: {
        operator_id: '',
        product_id: '',
        b_time: '',
        e_time: '',
        page: 1,
        size: 5
      },
      lists: [],
      totals: '',
      formatDate: []
    }
  },
  created () {
    this.getLogsList()
    //this.getorders()
  },
  mounted () {

  },
  computed: {
    // ...mapState('demo', ['vuexres', 'count'])
  },
  methods: {
    ...mapActions('lyf', ['getAccessList', 'getOrder']),
    //获取日志list
    getLogsList () {
      let _self = this;
      _self.loading = true;
      _self.getAccessList(_self.params).then(res => {
        _self.loading = false;
        _self.nodatashow = false;
        if (res.status == "0") {
          _self.lists = res.data.list
          _self.totals = res.data.total
          if (res.data.list.length <= 0) {
            _self.nodatashow = true
          }
          for (var i in res.data.list) {
            _self.formatDate.push(this.$iBox.timeFormat(res.data.list[i].create_time, 'yyyy-MM-dd'))
          }

        }
      })
    },
    // getorders () {
    //   this.getOrder({}).then(res => {
    //     console.log(res)
    //   })
    // },

    //显示条数
    sizechange (res) {
      this.params.size = res
      this.getLogsList()
    },
    //选择时间
    changeTime (value) {
      if (value == null) {
        this.params.b_time = ''
        this.params.e_time = ''
      } else {
        this.params.b_time = value[0]
        this.params.e_time = value[1]
      }
    },
    //查询
    search () {
      this.getLogsList()
    },
    //翻页
    currentChange (e) {
      this.params.page = e
      this.getLogsList()
    },

  }
}
</script>
<style lang="scss" scoped>
.con_right {
  .search_sel {
    /deep/.el-input__inner {
      height: 24px;
      line-height: 24px;
      width: 100px;
      border-radius: 0;
      padding: 0 10px;
      font-size: 12px;
      margin-right: 10px;
    }
    /deep/.el-input__icon {
      line-height: 24px;
      vertical-align: middle;
      margin-right: 6px;
    }
  }
  span.state {
    font-size: 12px;
    color: #3985fe;
    padding-right: 20px;
    font-weight: 300;
    cursor: pointer;
    i {
      font-size: 20px;
      margin-left: 2px;
      vertical-align: middle;
      margin-top: -4px;
    }
  }
  .brand_search {
    width: 100%;
    height: 44px;
    line-height: 44px;
    padding: 0 12px;
    span {
      color: #666666;
      font-size: 12px;
    }
    input {
      width: 180px;
      height: 24px;
      border: 1px solid #dddddd;
      font-size: 12px;
      text-indent: 10px;
    }
    button {
      border: 1px solid #0067ed;
      width: 86px;
      height: 24px;
      background-color: #fff;
      margin-left: 20px;
      cursor: pointer;
      font-size: 12px;
      color: #0067ed;
      i {
        font-size: 14px;
        vertical-align: middle;
        margin-top: -2px;
        margin-right: 5px;
      }
    }
  }
  .opeat {
    button {
      height: 24px;
      background-color: #fff;
      border: 1px solid #0067ed;
      font-size: 12px;
      color: #0067ed;
      cursor: pointer;
      margin-right: 10px;
    }
    /deep/.el-input__inner {
      height: 24px;
      line-height: 24px;
      width: 100px;
      border-radius: 0;
      padding: 0 10px;
      font-size: 12px;
      margin-right: 10px;
    }
    /deep/.el-input__icon {
      line-height: 24px;
      vertical-align: middle;
      margin-right: 6px;
    }
    button.add {
      width: 80px;
    }
    button.zsearch {
      width: 104px;
    }
  }
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
        .look {
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
/deep/.el-input__inner {
  height: 24px;
  line-height: 24px;
}
/deep/.el-date-editor .el-range__icon {
  line-height: 15px !important;
}
/deep/.el-date-editor .el-range-separator {
  line-height: 18px;
  padding: 0 1px;
}
/deep/.el-date-editor .el-range__close-icon {
  line-height: 16px;
}
</style>