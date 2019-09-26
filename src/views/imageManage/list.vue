<template>
  <div class="con_right">
    <h2 class="wrap-title">筛选查询<span class="fr state">收起<i class="el-icon-caret-bottom"></i></span></h2>
    <div class="photo_search">
      <span>输入搜索：</span>
      <input type="text" placeholder="相册名称" v-model.trim="listParams.keyword" />
      <button type="button" @click="albumListFun"><i class="el-icon-search"></i>开始查询</button>
    </div>
    <h2 class="wrap-title">数据列表
      <div class="fr opeat">
        <!-- <button type="button">新建相册</button> -->
        <router-link to="/images/photo/add" class="zsearch">新建相册</router-link>
        <template>
          <el-select v-model="listParams.size" placeholder="显示条数" @change="albumListFun">
            <el-option v-for="item in pageSize" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template>
          <el-select v-model="listParams.order" placeholder="排序方式" @change="albumListFun">
            <el-option v-for="item in sort" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
      </div>
    </h2>
    <div class="con_table">
      <table class="tables">
        <tr>
          <th width="100">编号</th>
          <th width="150">相册名称</th>
          <th width="120">封面</th>
          <th width="120">图片数量</th>
          <th width="120">排序</th>
          <th>描述</th>
          <th width="150">操作</th>
        </tr>
        <tr v-show="loading">
          <td colspan="7" v-loading="loading" style="position: relative; height:200px;"></td>
        </tr>
        <tr v-for="(item, index) in albumList" :key="index">
          <td>{{listParams.page+index}}</td>
          <td>{{item.album_name}}</td>
          <td class="img">
            <img v-if="item.album_cover" :src="item.album_cover" alt="">
            <div v-else></div>
          </td>
          <td>{{item.picture_num}}</td>
          <td>{{item.sort_order}}</td>
          <td>{{item.description}}</td>
          <td>
            <!-- <em class="look">查看</em> -->
            <!-- <em class="edit">编辑</em> -->
            <router-link :to="{path:'/images/photo',query:{id:item.album_id}}" class="look">查看</router-link>
            <router-link :to="{path:'/images/photo/add',query:{id:item.album_id}}" class="edit">编辑</router-link>
            <em class="del" @click="albumDel(item.album_id)">删除</em>
          </td>
        </tr>
      </table>
      <div v-show="!nodatashow">
        <el-pagination background layout="prev, pager, next" :total="pageTotal" :page-size="listParams.size" @current-change="currentChange">
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
      loading: true,
      nodatashow: false,
      sort: [{
        value: 0,
        label: '默认'
      }, {
        value: 1,
        label: '修改时间'
      }],
      pageSize: [{
        value: 10,
        label: '10'
      }, {
        value: 20,
        label: '20'
      }, {
        value: 50,
        label: '50'
      }, {
        value: 100,
        label: '100'
      }],
      value: '',
      listParams: {
        page: 1,
        size: 20,
        keyword: '',
        order: 1, //0按排序1按修改时间排序
      },
      pageTotal: 0,
      albumList: []
    }
  },
  created () {
    this.albumListFun()
  },
  mounted () {

  },
  computed: {
    // ...mapState('demo', ['vuexres', 'count'])
  },
  methods: {
    ...mapActions('lxr', ['album_list', 'album_del']),
    //图库列表
    async albumListFun () {
      this.loading = true
      this.albumList = []
      let res = await this.album_list(this.listParams)
      this.loading = false
      this.nodatashow = false
      if (res.state == "success") {
        this.albumList = res.data.list
        this.pageTotal = res.data.total
        if (res.data.list.length <= 0) {
          this.nodatashow = true
        }
      } else {
        this.$message.error(res.msg);
        this.nodatashow = true
      }
    },

    //图库删除
    albumDel (_id) {
      this.$confirm('确定删除此图库?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let res = this.album_del({ id: _id }).then((res) => {
          if (res.state == "success") {
            this.albumList = []
            this.$message.success(res.msg);
            this.albumListFun()
          } else {
            this.$message.error(res.msg);
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },


    // 更改分页
    currentChange (e) {
      this.listParams.page = e
      this.albumListFun()
    },

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
  .opeat {
    .zsearch {
      height: 24px;
      background-color: #fff;
      border: 1px solid #0067ed;
      font-size: 12px;
      color: #0067ed;
      cursor: pointer;
      margin-right: 10px;
      display: inline-block;
      line-height: 24px;
      width: 68px;
      text-align: center;
      position: relative;
      top: 1px;
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
      width: 62px;
    }
    button.zsearch {
      width: 104px;
    }
  }
  .photo_search {
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
        td.img {
          img {
            width: 100px;
            height: 50px;
            display: block;
            margin: 0 auto;
          }
          div {
            width: 100px;
            height: 50px;
            background-color: #f8d6d6;
            display: block;
            margin: 0 auto;
          }
        }
        td {
          height: 70px;
          line-height: 70px;
          color: #333333;
          font-size: 12px;
          text-align: center;
          .look {
            color: #3985fe;
            margin-right: 10px;
            cursor: pointer;
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
}
/deep/.el-pagination {
  margin-top: 40px;
  padding-bottom: 60px;
  text-align: right;
}
</style>