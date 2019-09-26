<template>
  <div class="con-right">
    <div class="filter-wrap">
      <h2 class="wrap-title">筛选查询</h2>
      <div class="filter-con">
        <ul>
          <li>输入搜索：<input type="text" class="inp" placeholder="商品ID/商品K3编码">
          </li>
          <li>商品分类：<el-select v-model="goodsTypeVal" placeholder="请选择商品分类">
              <el-option v-for="item in goodsType" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li>商品品牌：<el-select v-model="brandTypeVal" placeholder="请选择品牌">
              <el-option v-for="item in brandType" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li class="">
            <button type="button" class="k3search"><i class="el-icon-search"></i>查询</button>
          </li>

        </ul>
      </div>
    </div>
    <div class="result-wrap">
      <h2 class="wrap-title">数据列表
        <div class="fr opeat">
          <template>
            <el-select v-model="brandTypeVal" placeholder="显示条数">
              <el-option v-for="item in brandType" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </template>
          <template>
            <el-select v-model="brandTypeVal" placeholder="排序方式">
              <el-option v-for="item in brandType" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </template>
        </div>
      </h2>
      <div class="result-con">
        <div class="public-table">
          <div class="th">
            <span class="span160">商品K3编号</span>
            <span class="span120">商品分类</span>
            <span class="span200">调价前</span>
            <span class="span200">调价后</span>
            <span class="span200">操作信息</span>
          </div>
          <div class="td">
            <span class="span160">SR.0201103J10G</span>
            <span class="span120">贴片电阻</span>
            <span class="span200">
              <p>50+ ￥0.032544/pcs</p>
              <p>1500+ ￥0.028928/pcs</p>
              <p>3000+ ￥0.019526/pcs</p>
              <p>15000+ ￥0.019165/pcs</p>
              <p>30000+ ￥0.018803/pcs</p>
            </span>
            <span class="span200">
              <p>50+ ￥0.032544/pcs</p>
              <p>1500+ ￥0.028928/pcs</p>
              <p>3000+ ￥0.019526/pcs</p>
              <p>15000+ ￥0.019165/pcs</p>
              <p>30000+ ￥0.018803/pcs</p>
            </span>
            <span class="span200">admin<br />2020-07-10 16:58:66</span>
          </div>
          <div class="td">
            <span class="span160">SR.0201103J10G</span>
            <span class="span120">贴片电阻</span>
            <span class="span200">
              <p>50+ ￥0.032544/pcs</p>
              <p>1500+ ￥0.028928/pcs</p>
              <p>3000+ ￥0.019526/pcs</p>
              <p>15000+ ￥0.019165/pcs</p>
              <p>30000+ ￥0.018803/pcs</p>
            </span>
            <span class="span200">
              <p>50+ ￥0.032544/pcs</p>
              <p>1500+ ￥0.028928/pcs</p>
              <p>3000+ ￥0.019526/pcs</p>
              <p>15000+ ￥0.019165/pcs</p>
              <p>30000+ ￥0.018803/pcs</p>
            </span>
            <span class="span200">admin<br />2020-07-10 16:58:66</span>
          </div>
        </div>
        <div class="page right">
          <el-pagination background layout="prev, pager, next" :total="total" :page-size="size" @current-change="currentChange">
          </el-pagination>
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
      showNum: [
        {
          id: 1,
          name: '我是测试'
        },
        {
          id: 2,
          name: '我是测试'
        }
      ],
      showNumVal: '',
      sort: [
        {
          id: 1,
          name: '我是测试'
        },
        {
          id: 2,
          name: '我是测试'
        }
      ],
      sortVal: '',
      goodsType: [
        {
          id: 1,
          name: '我是测试'
        },
        {
          id: 2,
          name: '我是测试'
        }
      ],
      goodsTypeVal: '',
      brandType: [
        {
          id: 1,
          name: '我是测试'
        },
        {
          id: 2,
          name: '我是测试'
        }
      ],
      brandTypeVal: '',
      total: 101,
      size: 10,
      page: 1
    }
  },
  created () {
    this.getListFun()
  },
  mounted () {

  },
  computed: {
    ...mapState('demo', ['vuexres', 'count'])
  },
  methods: {
    ...mapActions('lxr', ['getList']),

    getListFun () {
      let params = {
        token: '525cd65263b04606b5c695465ec22088',
        language_id: '1'
      }
      let rel = this.getList(params)
      console.log(rel)
    },

    //打开审核详情
    openAudit () {
      this.dialogVisible = true
    },
    //关闭审核详情
    handleClose (done) {
      this.dialogVisible = false
    },
    // 更改分页
    currentChange (e) {
      this.page = e
    },
  },
}
</script>
<style lang="scss" scoped>
.k3btn {
  width: 130px;
  height: 24px;
  border: 1px solid #0067ed;
  color: #0067ed;
  background-color: #fff;
  font-size: 12px;
  cursor: pointer;
  i {
    font-size: 16px;
    font-size: 14px;
    margin-right: 5px;
    vertical-align: middle;
    margin-top: -1px;
  }
}
.con_all {
  width: 100%;
  height: 84px;
  border-bottom: 1px solid #dddddd;
  .con_leftAll {
    text-align: right;
    padding-right: 20px;
    padding-top: 28px;
  }
  .text {
    font-size: 12px;
    color: #666666;
    margin: 0 20px 0 5px;
  }
  .checkbox {
    width: 16px;
    height: 16px;
    border: 1px solid #3985fe;
    cursor: pointer;
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
  button {
    width: 120px;
    height: 24px;
    border: none;
    background-color: #3985fe;
    font-size: 12px;
    text-align: center;
    line-height: 24px;
    color: #fff;
    cursor: pointer;
    margin-left: 10px;
  }
}
.k3search {
  width: 60px;
  height: 24px;
  border: 1px solid #0067ed;
  color: #0067ed;
  background-color: #fff;
  font-size: 12px;
  cursor: pointer;
  i {
    font-size: 16px;
    font-size: 14px;
    margin-right: 5px;
    vertical-align: middle;
    margin-top: -1px;
  }
}
.public-table {
  .detail {
    color: #3985fe;
    cursor: pointer;
  }
  .edit {
    color: #3985fe;
    cursor: pointer;
  }
  .log {
    color: #fe3946;
    cursor: pointer;
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
.auditDetail {
}
/deep/.el-pagination {
  margin-top: 40px;
  text-align: right;
}
</style>