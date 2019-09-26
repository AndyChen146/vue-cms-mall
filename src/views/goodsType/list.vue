<template>
  <div class="con_right">
    <h2 class="wrap-title">数据列表<button type="button" class="fr add" @click="editType()">添加分类</button></h2>
    <div class="con_table">
      <div class="goodsTable_th clearfix">
        <span class="span_id">ID</span>
        <span class="span_fl">分类名称</span>
        <span class="span_icon">图标</span>
        <span class="span_sort">排序</span>
        <span class="span_cz">操作</span>
      </div>
      <div class="tableLoading"></div>
      <div class="goodsTable_td" v-loading="tableLoading">
        <div class="list clearfix" v-for="(item, index) in categoryList" :key="index" :class="{open:openChildFalg&&index==idx}">
          <div class="one clear">
            <span class="span_id" @click="openChild(index)">
              <template v-if="item.children">
                <i v-if="item.children.length>0" class="el-icon-caret-right"></i>
              </template>
              {{item.category_id}}</span>
            <span class="span_fl">{{item.name}}</span>
            <span class="span_icon"><img :src="item.image" alt=""></span>
            <span class="span_sort">{{item.sort_order}}</span>
            <span class="span_cz">
              <a href="javascript:;" class="edit" @click="editType(item.category_id,item)">编辑</a>
              <a href="javascript:;" class="remove" @click="categoryDel(item.category_id)">删除</a>
            </span>
          </div>
          <div class="two" v-for="(it, id) in item.children" :key="id">
            <div class="list clear">
              <span class="span_id">{{it.category_id}}</span>
              <span class="span_fl">{{it.name}}</span>
              <span class="span_icon"><img :src="it.image" alt=""></span>
              <span class="span_sort">{{it.sort_order}}</span>
              <span class="span_cz">
                <a href="javascript:;" class="edit" @click="editType(it.category_id,item)">编辑</a>
                <a href="javascript:;" class="remove" @click="categoryDel(it.category_id)">删除</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <el-pagination background layout="prev, pager, next" :total="total" :page-size="params.size" @current-change="currentChange">
    </el-pagination> -->

    <el-dialog title="分类编辑" :visible.sync="dialogVisible" width="34%" :before-close="handleClose">
      <div class="dbox labelItem">
        <div class="item">
          <span class="label">父级分类：</span>
          <span class="val">
            <!-- <input type="text" v-model.trim="editParams.parent_id" /> -->
            <el-select v-model="category_id" :disabled="category_id_flag" placeholder="请选择" v-if="categoryListType.length>0">
              <el-option v-for="item in categoryListType" :key="item.category_id" :label="item.name" :value="item.category_id">
              </el-option>
            </el-select>
          </span>
        </div>
        <div class="item">
          <span class="label must label_px">排序：</span>
          <span class="val"><input type="text" v-model.trim="editParams.sort" /></span>
        </div>
        <div class="item">
          <span class="label icon">分类图标：</span>
          <div class="imgbox val">
            <el-upload class="avatar-uploader" name="fileName" action="/set/uploads/upFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" accept="image/jpg,image/png,image/jpeg">
              <img v-if="editParams.image" :src="editParams.image" class="avatar">
              <template v-else>
                <i class="el-icon-circle-plus"></i>
                <div class="tip">
                  <h4>160*160PX</h4>
                  <p>仅限上传PNG格式<br>大小1M以内</p>
                </div>
              </template>
            </el-upload>
          </div>
        </div>
        <div class="item" v-if="language.length>0">
          <span class="label"></span>
          <div class="val tabs">
            <span class="tab" v-for="(item, index) in language" :key="index" :class="{active:index==languageIdx}" @click="languageSelect(index)">{{item.name}}</span>
          </div>
        </div>
        <div class="item" v-if="language.length>0">
          <span class="label must label_ty">分类名称：</span>
          <span class="val"><input type="text" v-for="(item, index) in editParams['multi-language']" :key="index" v-show="index==languageIdx" v-model.trim="item.name" /></span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
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
      dialogVisible: false,
      categoryList: [],
      categoryListType: [],
      params: {
        page: 1,
        size: 1
      },
      editParams: {
        parent_id: '',
        sort: '100',
        image: '',
        'multi-language': []
      },
      total: 0,
      tableLoading: true,
      openChildFalg: false,
      idx: Number,
      languageIdx: 0,
      language: [],
      category_id: '',
      category_id_flag: false,
      type: ''
    }
  },
  created () {
    this.categoryGetlist()
    this.getLanguageFun()
  },
  mounted () {

  },
  computed: {
  },
  methods: {
    ...mapActions('lxr', ['category_getlist', 'category_del', 'category_add', 'category_edit', 'getLanguage']),
    //获取商品分类列表
    async categoryGetlist () {
      this.categoryListType = []
      let res = await this.category_getlist()
      this.tableLoading = false
      if (res.state == "success") {
        this.categoryList = res.data.list
        this.categoryListType.push({ category_id: 0, name: '顶级' })
        res.data.list.forEach(element => {
          this.categoryListType.push(element)
        });

        this.total = res.data.total
      } else {
        this.$message.error(res.msg);
      }
    },

    //获取语言
    async getLanguageFun () {
      let res = await this.getLanguage()
      if (res.state == "success") {
        this.language = res.data.lsit
        this.language.forEach(item => {
          this.editParams['multi-language'].push({ language_id: item.language_id, name: '' })
        });
      } else {
        this.$message.error(res.msg);
      }
    },

    //商品分类列表-删除
    categoryDel (_id) {
      this.$confirm('确定删除此分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          id: _id
        }
        let res = this.category_del(params).then((res) => {
          if (res.state == "success") {
            this.$message.success('删除成功');
            this.categoryGetlist()
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

    editType (_id, item) {
      this.category_id_flag = false
      this.category_id = ''
      this.editParams = {
        parent_id: '',
        sort: '100',
        image: '',
        'multi-language': []
      }
      if (_id) {//编辑
        this.type = 'edit'
      } else {
        this.type = 'add'
        this.language.forEach(item => {
          this.editParams['multi-language'].push({ language_id: item.language_id, name: '' })
        });
      }
      if (item) {
        this.editParams = {
          id: _id,
          parent_id: item.parent_id,
          sort: item.sort_order,
          image: item.image,
          'multi-language': []
        }
        item['multi-language'].forEach(item => {
          this.editParams['multi-language'].push({ category_id: item.category_id, language_id: item.language_id, name: item.name })
        });
        this.category_id = item.category_id
        this.category_id_flag = true
      }
      this.dialogVisible = true
    },

    //选择语言
    languageSelect (index) {
      this.languageIdx = index
    },

    async submit () {
      this.editParams.parent_id = this.category_id
      let res
      if (this.type == 'add') {
        res = await this.category_add(this.editParams)
      } else {
        res = await this.category_edit(this.editParams)
      }
      if (res.state == "success") {
        this.categoryGetlist()
        this.$message.success(res.msg);
        this.dialogVisible = false
      } else {
        this.$message.error(res.msg);
      }

    },

    openChild (idx) {
      this.openChildFalg = true
      this.idx = idx
    },
    handleClose (done) {
      done()
    },
    handleAvatarSuccess (res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.editParams.image = res.data.data;
    },
    beforeAvatarUpload (file) {
      const isImages = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg'
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isImages) {
        this.$message.error('上传头像图片只能是 jpeg/png/gif 格式!');
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
      }
      return isImages && isLt1M;
    }
    // // 更改分页
    // currentChange (e) {
    //   this.params.page = e
    //   this.categoryGetlist()
    // },
  },
}
</script>
<style lang="scss" scoped>
.con_right {
  .add {
    width: 68px;
    height: 24px;
    font-size: 12px;
    text-align: center;
    line-height: 24px;
    margin: 8px 20px;
    background-color: #fff;
    color: #0067ed;
    border: 1px solid #0067ed;
    cursor: pointer;
  }
  .con_table {
    .goodsTable_th {
      text-align: center;
      font-size: 13px;
      color: #666666;
      background-color: #ffffff;
      span {
        float: left;
        line-height: 40px;
        height: 40px;
        &.span_id {
          width: 110px;
          cursor: pointer;
          user-select: none;
        }
        &.span_fl {
          width: 300px;
        }
        &.span_icon {
          width: 172px;
          overflow: hidden;
        }
        &.span_sort {
          width: 120px;
        }
        &.span_cz {
          width: 260px;
          border-right: none;
          text-align: center;
        }
      }
    }
    .goodsTable_td {
      min-height: 200px;
      .list {
        font-size: 12px;
        text-align: center;
        line-height: 46px;
        &.open {
          .el-icon-caret-right {
            transform: rotate(90deg);
            transition: 0.4s;
          }
          .two {
            display: block;
          }
        }
        .two {
          display: none;
        }
      }
      span {
        float: left;
        line-height: 46px;
        height: 46px;
        &.span_id {
          width: 110px;
          cursor: pointer;
          user-select: none;
          position: relative;
          i {
            font-size: 20px;
            color: #bacfff;
            position: absolute;
            top: 13px;
            left: 20px;
          }
        }
        &.span_fl {
          width: 300px;
        }
        &.span_icon {
          width: 172px;
          overflow: hidden;
          img {
            width: 26px;
            height: 26px;
            // background-color: #f8d6d6;
            display: block;
            margin: 10px auto;
          }
        }
        &.span_sort {
          width: 120px;
        }
        &.span_cz {
          width: 260px;
          border-right: none;
          text-align: center;
          em {
            cursor: pointer;
          }
          .edit {
            color: #0067ed;
            margin-right: 10px;
          }
          .remove {
            color: #fe3946;
          }
        }
      }
    }
  }
  /deep/.el-pagination {
    margin-top: 40px;
    text-align: right;
  }
  .dbox {
    padding: 20px;
    border-bottom: 1px solid #dddddd;
    .item {
      .imgbox {
        width: 160px;
        height: 160px;
        background-color: #f2f2f2;
        text-align: center;
        cursor: pointer;
        i {
          font-size: 24px;
          color: #3985fe;
          margin-top: 40px;
        }
        .tip {
          color: #999999;
          text-align: center;
          h4 {
            line-height: 17px;
            margin-bottom: 3px;
            font-size: 12px;
          }
          p {
            line-height: 16px;
            font-size: 11px;
            color: #b0b0b0;
          }
        }
      }
      /deep/.el-input__inner {
        width: 260px;
        height: 24px;
        border: 1px solid #dddddd;
        font-size: 12px;
        padding: 0 10px;
      }
      /deep/.el-input__icon {
        line-height: 24px;
      }
      .label {
        width: 80px;
        padding-right: 10px;
        font-size: 12px;
        color: #666666;
        text-align: right;
        &.label_px::before {
          left: 20px;
        }
        &.label_ty::before {
          left: -4px;
        }
      }
      .label.icon {
        line-height: 160px;
      }
      .tabs {
        border-bottom: 1px solid #dddddd;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        width: 260px;
        .tab {
          cursor: pointer;
          margin-right: 20px;
          &.active {
            color: #0067ed;
          }
        }
      }
      .val {
        input {
          width: 260px;
          height: 24px;
          border: 1px solid #dddddd;
          font-size: 12px;
          padding: 0 10px;
        }
      }
    }
  }
}
</style>