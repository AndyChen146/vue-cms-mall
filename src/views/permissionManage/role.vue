<template>
  <div class="con-right">
    <div class="role-wrap">
      <h2 class="wrap-title">数据列表<a href="javascript:;" class="addRole">添加角色</a></h2>
      <div class="role-con">
        <template>
          <el-table :data="tableData" style="width: 100%;" align="center">
            <el-table-column prop="role" label="角色" width="120">
            </el-table-column>
            <el-table-column prop="desc" label="描述">
            </el-table-column>
            <el-table-column prop="creator" label="创建者" width="120">
            </el-table-column>
            <el-table-column prop="time" label="创建时间" width="160">
            </el-table-column>
            <el-table-column label="操作" width="150">
              <a class="edit optio" href="javascript:;">编辑</a>
              <a class="delete optio" href="javascript:;">删除</a>
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
  name: 'role',
  components: {
  },
  data () {
    return {
      tableData: [{
        role: '运营',
        desc: '产品运营',
        creator: 'admin',
        time: '2020-10-10 10:10:10',
      }, {
        role: '运营',
        desc: '产品运营',
        creator: 'admin',
        time: '2020-10-10 10:10:10',
      }, {
        role: '运营',
        desc: '产品运营',
        creator: 'admin',
        time: '2020-10-10 10:10:10',
      }, {
        role: '运营',
        desc: '产品运营',
        creator: 'admin',
        time: '2020-10-10 10:10:10',
      }, {
        role: '运营',
        desc: '产品运营',
        creator: 'admin',
        time: '2020-10-10 10:10:10',
      },]
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
.role-con {
  padding: 20px;
}
.addRole {
  width: 68px;
  height: 24px;
  background: white;
  border: 1px solid #0067ed;
  color: #0067ed;
  font-size: 12px;
  text-align: center;
  display: block;
  float: right;
  line-height: 24px;
  margin-top: 8px;
  margin-right: 20px;
  border-radius: 2px;
  font-weight: 400;
}
.optio {
  font-size: 12px;
  & + .optio {
    margin-left: 10px;
  }
}
.edit {
  color: #0067ed;
}
.delete {
  color: #ff2348;
}

/deep/.el-table {
  font-size: 12px;
  line-height: 20px;
  color: #333333;
}
/deep/.el-table .cell {
  text-align: center;
  line-height: 20px;
}
/deep/.el-table td,
.el-table th {
  padding: 10px 0;
}
</style>