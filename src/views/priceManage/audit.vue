<template>
  <div class="con-right">
    <div class="nav-wrap">
      <a href="javascript:;" class="current">全部商品(<span>1000</span>)</a>
      <a href="javascript:;">待审核(<span>1000</span>)</a>
      <a href="javascript:;">未通过(<span>1000</span>)</a>
      <button type="button" class="fr k3btn"><i class="el-icon-search"></i>同步K3计算价格</button>
    </div>
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
            <span class="span180">商品现价</span>
            <span class="span180">K3计算价格</span>
            <span class="span130">审核状态</span>
            <span class="span160">操作</span>
          </div>
          <div class="td">
            <span class="span160">SR.0201103J10G</span>
            <span class="span120">贴片电阻</span>
            <span class="span180">
              <p>50+ ￥0.032544/pcs</p>
              <p>1500+ ￥0.028928/pcs</p>
              <p>3000+ ￥0.019526/pcs</p>
              <p>15000+ ￥0.019165/pcs</p>
              <p>30000+ ￥0.018803/pcs</p>
            </span>
            <span class="span180">
              <p>50+ ￥0.032544/pcs</p>
              <p>1500+ ￥0.028928/pcs</p>
              <p>3000+ ￥0.019526/pcs</p>
              <p>15000+ ￥0.019165/pcs</p>
              <p>30000+ ￥0.018803/pcs</p>
            </span>
            <span class="span130">未审核<br /></span>
            <span class="span160">
              <em class="edit">审核</em>
            </span>
          </div>
          <div class="td">
            <span class="span160">SR.0201103J10G</span>
            <span class="span120">贴片电阻</span>
            <span class="span180">
              <p>50+ ￥0.032544/pcs</p>
              <p>1500+ ￥0.028928/pcs</p>
              <p>3000+ ￥0.019526/pcs</p>
              <p>15000+ ￥0.019165/pcs</p>
              <p>30000+ ￥0.018803/pcs</p>
            </span>
            <span class="span180">
              <p>50+ ￥0.032544/pcs</p>
              <p>1500+ ￥0.028928/pcs</p>
              <p>3000+ ￥0.019526/pcs</p>
              <p>15000+ ￥0.019165/pcs</p>
              <p>30000+ ￥0.018803/pcs</p>
            </span>
            <span class="span130">未审核<br /></span>
            <span class="span160">
              <em class="edit">审核</em>
            </span>
          </div>
        </div>
        <div class="page right">
          <el-pagination background layout="prev, pager, next" :total="total" :page-size="size" @current-change="currentChange">
          </el-pagination>
        </div>
      </div>

    </div>

    <el-dialog class="auditCheck" title="商品审核" :visible.sync="dialogVisible" width="708" :before-close="handleClose">
      <div class="box">
        <div class="labelItem">
          <div class="item">
            <span class="label">商品名称：</span>
            <div class="val">0402 121KΩ(1213) ±1%</div>
          </div>
          <div class="item">
            <span class="label">商品审核：</span>
            <div class="val">
              <a href="javascript:;" class="current">审核通过</a>
              <a href="javascript:;">审核不通过</a>
            </div>
          </div>
          <div class="item">
            <span class="label">反馈详情：</span>
            <div class="val">
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      page: 1,
      dialogVisible: true
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