<template>
  <div class="con_right">
    <h2 class="wrap-title">筛选查询<span class="fr state">收起<i class="el-icon-caret-bottom"></i></span></h2>
    <div class="brand_search">
      <span>输入搜索：</span>
      <input type="text" placeholder="用户名/姓名" />
      <button type="button"><i class="el-icon-search"></i>查询结果</button>
    </div>
    <h2 class="wrap-title">数据列表
      <div class="fr opeat">
        <button type="button" class="add"><i class="el-icon-plus"></i>添加用户</button>
        <template>
          <el-select v-model="value" placeholder="显示条数">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template>
          <el-select v-model="value" placeholder="排序方式">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
      </div>
    </h2>
    <div class="con_table">
      <table class="tables">
        <tr>
          <th class="span130">帐号</th>
          <th class="span120">昵称</th>
          <th class="span120">创建者</th>
          <th class="span180">添加时间</th>
          <th class="span100">是否启用</th>
          <th class="span180">最后登录</th>
          <th class="span100">操作</th>
        </tr>
        <tr class="item">
          <td class="span130">hotking01</td>
          <td class="span120">小明</td>
          <td class="span120">admin</td>
          <td class="span180">2020-08-05 15:47:44</td>
          <td class="span100">
            <el-switch v-model="state" active-color="#3985FE">
            </el-switch>
          </td>
          <td class="span180">2020-08-05 15:47:44</td>
          <td class="span100">
            <em class="edit">编辑</em>
            <em class="del">删除</em>
          </td>
        </tr>
        <tr class="item">
          <td class="span130">hotking01</td>
          <td class="span120">小明</td>
          <td class="span120">admin</td>
          <td class="span180">2020-08-05 15:47:44</td>
          <td class="span100">
            <el-switch v-model="state" active-color="#3985FE">
            </el-switch>
          </td>
          <td class="span180">2020-08-05 15:47:44</td>
          <td class="span100">
            <em class="edit">编辑</em>
            <em class="del">删除</em>
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
      state: true,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
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
.con_right {
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
      td.img {
        img {
          width: 80px;
          height: 26px;
          background-color: #f8d6d6;
          display: block;
          margin: 0 auto;
        }
      }
      td {
        height: 54px;
        line-height: 54px;
        color: #333333;
        font-size: 12px;
        text-align: center;
        .blue {
          color: #3985fe;
        }
        .del {
          color: #fe3946;
          cursor: pointer;
          margin-left: 10px;
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