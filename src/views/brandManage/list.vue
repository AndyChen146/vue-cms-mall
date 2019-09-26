<template>
  <div class="con_right">
    <h2 class="wrap-title">筛选查询
      <!-- <span class="fr state">收起<i class="el-icon-caret-bottom"></i></span> -->
    </h2>
    <div class="brand_search">
      <span>输入搜索：</span>
      <input type="text" placeholder="商品ID/商品K3编码" v-model="params.keyword" />
      <button type="button" @click="search"><i class="el-icon-search"></i>查询结果</button>
    </div>
    <h2 class="wrap-title">数据列表
      <div class="fr opeat">
        <router-link :to="{path:'/cbrand/list/add'}">
          <button type="button" class="add"><i class="el-icon-plus"></i>添加</button>
        </router-link>

        <button type="button" class="zsearch">生成首字母品牌</button>

        <template>
          <el-select v-model="showNumVal" placeholder="显示条数" class="short" @change="sizechange">
            <el-option v-for="item in showNum" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template>
          <el-select v-model="sortVal" placeholder="排序方式" class="order" @change="sortchange">
            <el-option v-for="item in sort" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </template>

      </div>
    </h2>
    <div class="con_table">
      <table class="tables" v-loading="loading">
        <tr>
          <th>编号</th>
          <th>品牌名称</th>
          <th>排序</th>
          <th>品牌图片</th>
          <th>是否显示</th>
          <th>相关</th>
          <th>操作</th>
        </tr>
        <tr class="item" v-for="(item,index) in blist" :key="item.brand_id">
          <td>{{item.brand_id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.sort_order}}</td>
          <td class="img" v-if="item.logo == ''">
            <img src="" alt="">
          </td>
          <td class="img" v-else>
            <img :src="item.logo" alt="">
          </td>

          <td>
            <el-switch v-model="isBrlist[index]" active-color="#3985FE" @change="isChangeSwitch(isBrlist[index],item.brand_id)">
            </el-switch>
          </td>
          <td>商品：
            <span class="blue" v-if="item.goods_num>0">{{item.goods_num}}</span>
            <span class="blue" v-else>0</span></td>
          <td>
            <router-link :to="{path:'/cbrand/list/add',query: {'bid': item.brand_id}}">
              <em class="edit">编辑</em>
            </router-link>
            <em class="detelt" @click="detel(item.brand_id)">删除</em>
          </td>
        </tr>

      </table>
      <div class="no_data" v-show="nodatashow">
        <img src="@/assets/images/no_data.png" alt="">
        <p class="ts">暂无数据</p>
      </div>
      <div v-show="!nodatashow">
        <el-pagination background layout="prev, pager, next" :total="total" v-if="total>0" :page-size="params.size" @current-change="currentChange">
        </el-pagination>
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
      sort: [
        {
          id: 1,
          name: '更新时间'
        },
        {
          id: 0,
          name: '倒序'
        }
      ],
      sortVal: '',
      params: {
        page: 1,
        size: 5,
        keyword: '',
        order: 0
      },
      blist: [],
      total: 0,
      isBrlist: []
    }
  },
  created () {
    this.getBrand()
  },
  mounted () {

  },
  computed: {
    // ...mapState('demo', ['vuexres', 'count'])
  },
  methods: {
    ...mapActions('lyf', ['getBrandList', 'setBrandState', 'deleteBrandId']),
    //获取商品品牌
    getBrand () {
      var _self = this;
      _self.loading = true
      _self.getBrandList(_self.params).then(res => {
        _self.loading = false
        _self.nodatashow = false
        if (res.status == "0") {
          _self.blist = res.data.list
          _self.total = res.data.total
          if (res.data.list && res.data.list.length > 0) {
            _self.isBrlist = []
            for (let i = 0; i < res.data.list.length; i++) {
              if (res.data.list[i].is_display == 1) {
                res.data.list[i].is_display = true
              } else {
                res.data.list[i].is_display = false
              }
              _self.isBrlist.push(res.data.list[i].is_display)
            }
          } else {
            _self.nodatashow = true
          }
        }
      })
    },
    //设置开关
    isChangeSwitch (flag, id) {
      let _self = this;
      let status = flag ? 1 : 0
      _self.setBrandState({
        id: id,
        status: status
      }).then(res => {
        if (res.status == "0") {
          this.$message({
            type: 'success',
            message: '操作成功!',
            customClass: 'toast'
          });
          _self.getBrand()
        } else {
          this.$message.error({
            message: res.msg,
            customClass: 'toast'
          })
        }
      })
    },
    //显示条数
    sizechange (res) {
      this.params.size = res
      this.getBrand()
    },
    //排序
    sortchange (res) {
      this.params.order = res
      this.getBrand()
    },
    //search
    search () {
      let _self = this;
      _self.getBrand()
    },
    //删除
    detel (id) {
      let _self = this;
      _self.$confirm('此操作将永久删除该品牌，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _self.deleteBrandId({
          id: id
        }).then(res => {
          if (res.status == "0") {
            this.$message({
              type: 'success',
              message: '删除成功!',
              customClass: 'toast'
            });
            _self.getBrand()
          } else {
            this.$message.error({
              message: res.msg,
              customClass: 'toast'
            })
          }
        })
      }).catch(() => {

      })

    },
    //翻页
    currentChange (e) {
      this.params.page = e
      this.getBrand()
    }
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
      width: 62px;
    }
    button.zsearch {
      width: 104px;
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
          .detelt {
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
  text-align: right;
}
</style>