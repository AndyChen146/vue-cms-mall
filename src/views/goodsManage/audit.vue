<template>
  <div class="con-right">
    <div class="filter-wrap">
      <h2 class="wrap-title">筛选查询</h2>
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
              <span class="span40"></span>
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
              </span>
              <span class="span80">
                <p>
                  <!-- <a href="javascript:;" class="edit C0067ED">编辑</a> -->
                  <a href="javascript:;" class="audit C0067ED" @click="openAudit(item.product_id,item.product_name)">审核</a>
                </p>
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
    <el-dialog class="auditCheck" title="商品审核" :visible.sync="dialogVisible" width="508" :before-close="handleClose">
      <div class="box">
        <div class="labelItem">
          <div class="item">
            <span class="label">商品名称：</span>
            <div class="val">{{audioSaveName}}</div>
          </div>
          <div class="item">
            <span class="label">商品审核：</span>
            <div class="val">
              <a href="javascript:;" :class="audioSave.status == 1 ? 'current' : ''" @click="audioChange(1)">审核通过</a>
              <a href="javascript:;" :class="audioSave.status == 2 ? 'current' : ''" @click="audioChange(2)">审核不通过</a>
            </div>
          </div>
          <div class="item">
            <span class="label">反馈详情：</span>
            <div class="val">
              <textarea name="" id="" cols="30" rows="10" v-model="audioSave.description"></textarea>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="audioSubmit">确 定</el-button>
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
      total: 0,
      nodatashow: false,
      loading: false,
      audioSaveName: '',
      audioSave: {
        product_id: '',
        description: '',
        status: 1
      },
      params: {
        page: 1,
        size: 5,
        recycle_bin: 0,
        is_audit: 0,
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
      goodsType: [],
      goodsTypeVal: '',
      brandType: [],
      brandTypeVal: '',
      dialogVisible: false
    }
  },
  created () {
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
    ...mapActions('lyf', ['getProductList', 'getCategoryList', 'getBrandList', 'productAudioSava']),
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
    //选择分类
    goodsTypeChange (res) {
      this.params.c_id = res;
    },
    //选择品牌
    brandChange (res) {
      this.params.b_id = res;
    },
    //搜索
    search () {
      var _self = this;
      _self.getProductLists()
    },
    //显示条数选择
    sizechange (res) {
      this.params.size = res
      this.getProductLists()
    },
    //排序方式选择
    sortchange (res) {
      this.params.order = res
      this.getProductLists()
    },
    //商品审核切换
    audioChange (status) {
      this.audioSave.status = status
    },
    //打开审核
    openAudit (id, name) {
      var _self = this;
      if (id) {
        _self.audioSaveName = name
        _self.audioSave.product_id = id;
        _self.audioSave.status = 1
        _self.audioSave.description = ''
        this.dialogVisible = true
      } else {
        this.$message.error({
          message: '商品不存在，加载异常',
          customClass: 'toast'
        })
      }

    },
    //审核提交
    audioSubmit () {
      let _self = this;
      if (_self.audioSave.description == '') {
        return this.$message.error({
          message: '请填写反馈详情',
          customClass: 'toast'
        })
      }
      _self.productAudioSava(_self.audioSave).then(res => {
        if (res.status == "0") {
          this.$message({
            type: 'success',
            message: res.msg,
            customClass: 'toast'
          });
          _self.getProductLists()
          _self.dialogVisible = false
        } else {
          this.$message.error({
            message: res.msg,
            customClass: 'toast'
          })
          _self.dialogVisible = false
        }
      })


    },
    //关闭审核
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
/deep/.el-pagination {
  margin-top: 40px;
  text-align: right;
  padding-bottom: 60px;
}
</style>