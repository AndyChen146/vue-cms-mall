<template>
  <div class="con-right">
    <div class="nav-wrap">
      <a href="javascript:;" :class="auditCurrentVal == 3 ? 'current' : ''" @click="auditTab(3)">全部商品(<span>{{auditVal.total_3}}</span>)</a>
      <a href="javascript:;" :class="auditCurrentVal == 0 ? 'current' : ''" @click="auditTab(0)">待审核(<span>{{auditVal.total_0}}</span>)</a>
      <a href="javascript:;" :class="auditCurrentVal == 2 ? 'current' : ''" @click="auditTab(2)">未通过(<span>{{auditVal.total_2}}</span>)</a>
    </div>
    <div class="filter-wrap">
      <h2 class="wrap-title">筛选查询<button type="button" class="addimport fr"><i class="el-icon-circle-plus-outline"></i>导入</button></h2>
      <div class="filter-con">
        <ul>
          <li>输入搜索：<input type="text" class="inp" v-model="params.keyword" placeholder="商品ID/商品K3编码">
          </li>
          <li>商品分类：<el-select v-model="goodsTypeVal" placeholder="请选择商品分类" @change="goodsTypeChange">
              <el-option v-for="item in goodsType" :key="item.category_id" :label="item.name" :value="item.category_id">
              </el-option>
            </el-select>
          </li>
          <li>商品品牌：<el-select v-model="brandTypeVal" placeholder="请选择品牌" @change="brandChange">
              <el-option v-for="item in brandType" :key="item.brand_id" :label="item.name" :value="item.brand_id">
              </el-option>
            </el-select>
          </li>
          <li class="searchBox">
            <button type="button" class="search" @click="search"><i class="el-icon-search"></i>查询</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="result-wrap">
      <h2 class="wrap-title">数据列表
        <div class="fr opeat">
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
      <div class="result-con" v-loading="loading">
        <div class="public-table">
          <div class="th">
            <span class="span40"></span>
            <span class="span60">商品ID</span>
            <span class="span60">商品图片</span>
            <span class="span120">商品标题</span>
            <span class="span140">销售价格</span>
            <span class="span130">K3编码</span>
            <span class="span70">库存(PCS)</span>
            <span class="span60">销量</span>
            <span class="span90">分类</span>
            <span class="span60">规格书</span>
            <span class="span60">审核状态</span>
            <span class="span80">操作</span>
          </div>
          <div v-show="!nodatashow">
            <div class="td" v-for="(item,index) in list" :key="index">
              <span class="span40">
                <div class="check-box"></div>
              </span>
              <span class="span60">{{item.product_id}}</span>
              <span class="span60">
                <img class="goods-img" v-if="item.image == ''" src="@/assets/images/goods_default_img.png" alt="">
                <img class="goods-img" v-else :src="item.image" alt="">
              </span>
              <span class="span120">{{item.product_name}}</span>
              <span class="span140" v-if="item.product_price_info.length>0">
                <p v-for="(vx,index2) in item.product_price_info" :key="index2">{{vx.left_right}} ￥{{vx.price}}/pcs</p>
              </span>
              <span class="span130">{{item.material_ksn}}</span>
              <span class="span70">{{item.quantity}}</span>
              <span class="span60">{{item.sales}}</span>
              <span class="span90">{{item.cate_name}}</span>
              <span class="span60" v-if="item.manual_url == ''">无</span>
              <span class="span60" v-else :data-url="item.manual_url">{{item.manual_name}}</span>
              <span class="span60">
                <p v-if="item.is_audit == 0">待审核</p>
                <p v-else-if="item.is_audit == 1">审核通过</p>
                <p v-else>未通过</p>
                <a href="javascript:;" class="C0067ED" @click="openAudit(item.product_id)">审核详情</a>
              </span>
              <span class="span80">
                <p>
                  <router-link :to="{path:'/goods/list/edit',query:{'product_id':item.product_id}}" class="edit C0067ED">编辑</router-link>
                  <a href="javascript:;" class="delete" @click="del(item.product_id)">删除</a>
                </p>
                <a href="javascript:;" class="log C0067ED">日志</a>
              </span>
            </div>
            <div class="page right">
              <el-pagination background layout="prev, pager, next" :total="total" :page-size="params.size" @current-change="currentChange">
              </el-pagination>
            </div>
          </div>

          <div class="no_data" v-show="nodatashow">
            <img src="@/assets/images/no_data.png" alt="">
            <p class="ts">暂无数据</p>
          </div>
        </div>

      </div>
    </div>
    <el-dialog class="auditDetail" title="审核详情" :visible.sync="dialogVisible" width="708" :before-close="handleClose">
      <div class="box">
        <table>
          <tr>
            <th>审核时间</th>
            <th>审核人员</th>
            <th>审核结果</th>
            <th>反馈详情</th>
          </tr>
          <tr v-for="(item,index) in auditList" :key="item.audit_id">
            <td>{{item.create_time}}</td>
            <td>admin</td>
            <td>{{item.status}}</td>
            <td>{{item.description}}</td>
          </tr>
          <tr v-if="auditList.length <= 0">
            <td colspan="4" style="color:crimson">暂无审核信息！！！</td>
          </tr>
        </table>
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
      list: [],
      nodatashow: false,
      total: 0,
      loading: false,
      params: {
        page: 1,
        size: 5,
        recycle_bin: 0,
        is_audit: 3,
        order: 1,
        keyword: '',
        c_id: '',
        b_id: ''
      },
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
          id: 2,
          name: '倒序'
        }
      ],
      sortVal: '',
      auditVal: '',
      auditCurrentVal: 3,
      auditList: [],

      goodsType: [],
      goodsTypeVal: '',
      brandType: [],
      brandTypeVal: '',
      dialogVisible: false,

    }
  },
  created () {
    this.getLanguages()
    this.getCountList()
    this.getProductLists()
    this.getCategory()
    this.getBrand()
  },
  mounted () {

  },
  computed: {
    // ...mapState('demo', ['vuexres', 'count'])
  },
  methods: {
    ...mapActions('lxr', ['getLanguage']),
    ...mapActions('lyf', ['getProductList', 'getProductCounts', 'getCategoryList', 'getBrandList', 'getProductAuditDetail', 'deleteProductId']),

    getLanguages () {
      let language = this.getLanguage();
    },
    getCountList () {
      var _self = this;
      _self.getProductCounts({
        recycle_bin: 0,
      }).then(res => {
        if (res.status == "0") {
          _self.auditVal = res.data
        }
      })
    },
    //获取商品分类
    getCategory () {
      var _self = this;
      // _self.goodsType
      _self.getCategoryList({
        page: 1,
        size: 100
      }).then(res => {
        if (res.status == "0") {
          var rs = res.data.list;
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              if (rs[i].children && rs[i].children.length > 0) {
                _self.goodsType = _self.goodsType.concat(rs[i].children)
              }
            }
          }
        }
      })
    },
    //获取商品品牌
    getBrand () {
      var _self = this;
      _self.getBrandList({
        page: 1,
        size: 100,
        keyword: ''
      }).then(res => {
        if (res.status == "0") {
          _self.brandType = res.data.list
        }
      })
    },
    //审核状态切换
    auditTab (type) {
      if (this.auditCurrentVal == type) return;
      this.params.is_audit = type
      this.auditCurrentVal = type
      this.getProductLists()
    },
    //获取商品列表
    getProductLists () {
      var _self = this;
      _self.loading = true
      _self.getProductList(_self.params).then(res => {
        _self.loading = false
        _self.nodatashow = false
        if (res.status == "0") {
          _self.list = res.data.list
          _self.total = res.data.total
          if (res.data.list.length <= 0) {
            _self.nodatashow = true
          }
        }
      })
    },
    //搜索查询
    search () {
      var _self = this;
      _self.getProductLists()
    },
    //选择分类
    goodsTypeChange (res) {
      this.params.c_id = res;
    },
    //选择品牌
    brandChange (res) {
      this.params.b_id = res;
    },
    //排序方式选择
    sortchange (res) {
      this.params.order = res
      this.getProductLists()
    },
    //显示条数选择
    sizechange (res) {
      this.params.size = res
      this.getProductLists()
    },
    //打开审核详情
    openAudit (id) {
      var _self = this;
      _self.getProductAuditDetail({
        product_id: id
      }).then(res => {
        if (res.status == "0") {
          _self.auditList = res.data.list
          this.dialogVisible = true
        } else {
          this.$message.error({
            message: res.msg,
            customClass: 'toast'
          })
        }
      })
    },
    //删除
    del (id) {
      var _self = this;

      _self.deleteProductId({
        product_id: id,
        del_type: 1
      }).then(res => {
        if (res.status == "0") {
          this.$message({
            type: 'success',
            message: '商品放置在回收站',
            customClass: 'toast'
          });
          _self.getProductLists()
          _self.getCountList()
        } else {
          this.$message.error({
            message: res.msg,
            customClass: 'toast'
          })
        }
      })
    },
    //关闭审核详情
    handleClose (done) {
      this.dialogVisible = false
    },
    // 更改分页
    currentChange (e) {
      this.params.page = e
      this.getProductLists()
    },
  },
}
</script>
<style lang="scss" scoped>
.auditDetail {
  table {
    width: 100%;
  }
  td,
  th {
    height: 40px;
    text-align: center;
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
.addimport {
  width: 60px;
  border: 1px solid #0067ed;
  background-color: #fff;
  color: #0067ed;
  height: 24px;
  cursor: pointer;
  line-height: 24px;
  border-radius: 2px;
  margin-right: 20px;
  margin-top: 8px;
  i {
    font-size: 15px;
    margin-right: 4px;
    vertical-align: middle;
    margin-top: -2px;
  }
}
.searchBox {
  .search {
    width: 60px;
    border: 1px solid #0067ed;
    background-color: #fff;
    color: #0067ed;
    height: 24px;
    cursor: pointer;
    line-height: 24px;
    border-radius: 2px;
    margin-right: 20px;
    i {
      font-size: 15px;
      margin-right: 4px;
      vertical-align: middle;
      margin-top: -2px;
    }
  }
}
.delete {
  color: crimson;
}
/deep/.el-pagination {
  margin-top: 40px;
  text-align: right;
  padding-bottom: 60px;
}
</style>