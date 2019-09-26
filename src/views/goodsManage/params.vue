<template>

  <div class="con_right">
    <h2 class="wrap-title">商品参数管理</h2>
    <div class="con_table">
      <table class="tables">
        <tr>
          <th class="one" width="60">商品ID</th>
          <th width="150">分类名称</th>
          <th>参数项</th>
          <th>参与选型</th>
          <th width="60">操作</th>
        </tr>
        <tr v-show="loading">
          <td colspan="5" v-loading="loading" style="position: relative; height:200px;"></td>
        </tr>
        <tr class="item" v-for="(item, index) in paramsList" :key="index">
          <td>{{item.category_id}}</td>
          <td>{{item.cate_name}}</td>
          <td>{{item.attribute}}</td>
          <td>{{item.attribute_display}}</td>
          <td><em class="edit" @click="productParamsEditFun(item.category_id)">编辑</em></td>
        </tr>
      </table>
    </div>
    <el-dialog title="参数管理" :visible.sync="dialogVisible" width="370px" :before-close="handleClose">
      <div class="box">
        <p class="box-title">
          <span>参数类型</span>
          <span>参与选型</span>
          <span>排序</span>
        </p>
        <ul class="box-ul">
          <li v-for="(item, index) in ParamsEditList" :key="index">
            <span>{{item.name}}</span>
            <span><input type="checkbox" v-model="checkVal" :value="item.attribute_id"></span>
            <span><input type="text" v-model.trim="item.sort_order"></span>
          </li>
        </ul>
        <ul class="box-addli">
          <li>
            <div class="sdiv">
              <!-- <i class="el-icon-delete"></i> -->
              <el-select v-model="AddModelValue" placeholder="请选择">
                <el-option v-for="item in AddModel" :key="item.name" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </div>
            <span><input type="checkbox" checked></span>
            <span><input type="text" ref="AddModelOrder" value="0"></span>
          </li>
        </ul>
        <h3 class="addType"><span @click="AddModelBtn">添加类型</span></h3>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="saveParamsFun">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// @ is an alias to /src
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      dialogVisible: false,
      AddModelValue: '',
      loading: false,
      paramsList: [],
      ParamsEditList: [],
      checkVal: [],
      AddModel: [],
      c_id: '',
      saveParams: {
        category_id: '',
        attr: []
      }
    }
  },
  created () {
    this.productParamsFun()
    this.productAddModel()
  },
  mounted () {

  },
  computed: {
    ...mapState('demo', ['vuexres', 'count'])
  },
  methods: {
    ...mapActions('lxr', ['productParams', 'productParamsEdit', 'product_addModel', 'product_editSave']),
    //获取商品参数列表
    async productParamsFun () {
      this.loading = true
      let res = await this.productParams()
      if (res.state == "success") {
        this.loading = false
        this.paramsList = res.data.list
      } else {
        this.$message.error(res.msg);
      }
    },

    //获取参数选型
    async productAddModel () {
      let res = await this.product_addModel('')
      if (res.state == "success") {
        this.AddModel = res.data.list
      } else {
        this.$message.error(res.msg);
      }
    },

    //商品参数编辑
    async productParamsEditFun (c_id) {
      this.c_id = c_id
      this.ParamsEditList = []
      this.checkVal = []
      this.dialogVisible = true
      let params = {
        c_id: c_id
      }
      let res = await this.productParamsEdit(params)
      if (res.state == "success") {
        this.ParamsEditList = res.data.list
        if (this.ParamsEditList.length > 0) {
          this.ParamsEditList.forEach(item => {
            if (item.is_display == 1) {
              this.checkVal.push(item.attribute_id)
            }
            this.saveParams.attr.push({ attribute_id: item.attribute_id, name: item.name, is_display: item.is_display, sort_order: item.sort_order, is_special: 0 })
          });
        }
      } else {
        this.$message.error(res.msg);
      }
    },

    AddModelBtn () {
      if (this.AddModelValue == '') {
        this.$message.error('请选择参数类型');
        return
      }
      console.log(this.$refs.AddModelOrder.value)
      if (this.$refs.AddModelOrder.value == '') {
        this.$message.error('请输入排序');
        return
      }
      let attribute_id = 0;
      this.ParamsEditList.push({ attribute_id: attribute_id, category_id: this.c_id, name: this.AddModelValue, is_display: 1, sort_order: this.$refs.AddModelOrder.value })
      this.saveParams.attr.push({ attribute_id: attribute_id, name: this.AddModelValue, is_display: 1, sort_order: this.$refs.AddModelOrder.value, is_special: 1 })
      this.checkVal.push(attribute_id)
      this.AddModelValue = ''
      this.$refs.AddModelOrder.value = 0
    },
    async saveParamsFun () {
      this.saveParams.category_id = this.c_id
      if (this.saveParams.attr.length <= 0) {
        this.$message.error('请先添加类型');
        return
      } else {
        this.saveParams.attr.forEach(item => {
          if (this.checkVal.indexOf(parseInt(item.attribute_id)) >= 0) {
            item.is_display = 1
          } else {
            item.is_display = 0
          }
        });
      }
      let res = await this.product_editSave(this.saveParams)
      if (res.state == "success") {
        this.paramsList = []
        this.productParamsFun()
        this.saveParams = {
          category_id: '',
          attr: []
        }
        this.dialogVisible = false
      } else {
        this.$message.error(res.msg);
      }
    },

    //关闭编辑框
    handleClose () {
      this.dialogVisible = false
    }
  },
}
</script>
<style lang="scss" scoped>
.con_table {
  .tables {
    width: 100%;
    tr {
      th {
        height: 40px;
        // line-height: 40px;
        color: #666666;
        font-size: 12px;
        text-align: center;
      }
      td {
        height: 40px;
        // line-height: 40px;
        color: #333333;
        font-size: 12px;
        text-align: center;
        .edit {
          color: #0067ed;
          cursor: pointer;
        }
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
.con_right {
  .box {
    .box-title {
      display: flex;
      height: 40px;
      line-height: 40px;
      span {
        width: 31%;
        text-align: center;
        color: #666666;
      }
      span:first-child {
        width: 36%;
      }
    }
    .box-ul {
      width: 100%;
      max-height: 400px;
      overflow-y: auto;
      li {
        display: flex;
        justify-content: space-around;
        height: 40px;
        line-height: 40px;
        span {
          width: 31%;
          text-align: center;
          color: #333;
        }
        span:first-child {
          width: 36%;
        }
        input[type="checkbox"] {
          width: 14px;
          height: 14px;
          cursor: pointer;
        }
        input[type="text"] {
          width: 40px;
          height: 24px;
          border: 1px solid #dddddd;
          color: #333333;
          font-size: 12px;
          text-align: center;
        }
      }
    }
    .addType {
      width: 100%;
      border-top: 1px solid #dddddd;
      padding: 10px 0;
      span {
        display: block;
        width: 80%;
        height: 28px;
        text-align: center;
        line-height: 28px;
        font-size: 12px;
        margin: 0 auto;
        cursor: pointer;
        background-color: #3985fe;
        color: #ffffff;
      }
    }
    .box-addli {
      width: 100%;
      max-height: 400px;
      overflow-y: auto;
      li {
        display: flex;
        justify-content: space-around;
        height: 40px;
        line-height: 40px;
        span {
          width: 31%;
          text-align: center;
          color: #333;
          input[type="checkbox"] {
            width: 14px;
            height: 14px;
            cursor: pointer;
          }
          input[type="text"] {
            width: 40px;
            height: 24px;
            border: 1px solid #dddddd;
            color: #333333;
            font-size: 12px;
            text-align: center;
          }
        }
        .sdiv {
          width: 36%;
          text-align: center;
          i {
            color: #fe3946;
            margin: 0 10px;
            cursor: pointer;
          }
        }
        /deep/.el-select {
          .el-input__inner {
            width: 90px;
            height: 24px;
          }
        }
      }
    }
  }
}
</style>