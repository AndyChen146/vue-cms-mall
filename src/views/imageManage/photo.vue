<template>
  <div class="con_right">
    <h2 class="wrap-title clearfix">数据列表
      <div class="fr opeat">
        <button type="button" class="zsearch" @click="uploadDialog"><i class="el-icon-upload"></i>上传图片</button>
        <template>
          <el-select v-model="listParams.size" placeholder="显示条数" @change="albumPictureList">
            <el-option v-for="item in pageSize" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template>
          <el-select v-model="listParams.order" placeholder="排序方式" @change="albumPictureList">
            <el-option v-for="item in sort" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
      </div>
    </h2>
    <div class="con_box">
      <div v-if="no_data" class="no_data">
        <img src="@/assets/images/no_data.png" alt="">
        <p>暂无图片</p>
      </div>
      <ul class="con_ul clearfix" v-loading="loading">
        <template v-if="pictureList.length>0">
          <li class="con_li" v-for="(item, index) in pictureList" :key="index" :p_id="item.picture_id">
            <div class="con_libox" @click="selectedFun(index)">
              <img v-if="item.picture_url" :src="item.picture_url" alt="">
              <div v-else class="img"></div>
              <p>
                <span class="move" @click.stop.self="moveDialog(item.picture_id)">转移图片</span>
                <span class="del" @click.stop.self="albumPictureDel(item.picture_id,index)">删除图片</span>
              </p>
              <!-- selected -->
              <i :class="{selected:selected[index]}"></i>
            </div>
          </li>
        </template>
      </ul>
      <div class="con_all clearfix" v-if="pictureList.length>0">
        <div class="con_leftAll">
          <input type="checkbox" class="checkbox" @click="selectedAll" /><span class="text">全选</span>
          <el-select v-model="batchValue" placeholder="批量操作">
            <el-option v-for="item in batch" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <button class="btn" type="button" @click="batchFun">确定</button>
        </div>
      </div>
      <el-pagination background layout="prev, pager, next" :total="pageTotal" :page-size="listParams.size" @current-change="currentChange" v-if="pictureList.length>0">
      </el-pagination>
    </div>

    <el-dialog title="上传图片" :visible.sync="dialogVisible" width="450px" :before-close="handleClose">
      <div class="dbox labelItem">
        <div class="item">
          <span class="label">选择相册：</span>
          <span class="val">
            <el-select v-model="updateValue" placeholder="请选择上传相册">
              <el-option v-for="item in albumList_state" :key="item.album_id" :label="item.album_name" :value="item.album_id">
              </el-option>
            </el-select>
          </span>
        </div>
        <div class="item">
          <span class="label icon">选择图片：</span>
          <div class="imgbox val">
            <el-upload ref="upload" class="upload-demo" name="fileName" action="/set/uploads/upFile" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="10" :on-success="handleAvatarSuccess" :on-exceed="handleExceed" :on-error="handleError" :file-list="fileList" accept="image/jpg,image/png,image/jpeg" method="get">
              <el-button size="small" type="primary">选择上传文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，按住ctrl可同时批量选择多张图片上传</div>
            </el-upload>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="albumPictureAdd">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="转移图片" :visible.sync="dialogMove" width="450px" :before-close="handleClose">
      <div class="dbox labelItem">
        <div class="item">
          <span class="label">目标相册：</span>
          <span class="val">
            <el-select v-model="moveValue" placeholder="请选择目标相册">
              <el-option v-for="item in albumList_state" :key="item.album_id" :label="item.album_name" :value="item.album_id">
              </el-option>
            </el-select>
          </span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogMove = false">取 消</el-button>
        <el-button type="primary" @click="albumPictureEdit">确 定</el-button>
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
      no_data: false,
      selected: [],
      fileList: [],
      dialogVisible: false,
      dialogMove: false,
      state: true,
      batch: [
        {
          value: '0',
          label: '删除图片'
        }, {
          value: '1',
          label: '转移相册'
        }],
      batchValue: '',
      sort: [
        {
          value: 0,
          label: '默认'
        }, {
          value: 1,
          label: '修改时间'
        }],
      pageSize: [
        {
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
      updateValue: '',
      moveValue: '',
      album_id: '',
      listParams: {
        id: '',
        order: 1,
        size: 18,
        page: 1
      },
      loading: true,
      pictureList: [],
      addParams: {
        id: '',
        images: []
      },
      delParams: {
        id: '',
        pic_id: '',
      },
      editParams: {
        id: '',
        from_id: '',
        pic_id: ''
      },
      pageTotal: 0,
    }
  },
  created () {
    this.album_id = this.$route.query.id
    this.editParams.from_id = this.album_id
    this.delParams.id = this.album_id
    this.albumPictureList()
  },
  mounted () {

  },
  computed: {
    ...mapState('lxr', ['albumList_state'])
  },
  methods: {
    ...mapActions('lxr', ['album_picture_list', 'album_picture_add', 'album_picture_del', 'album_picture_edit']),
    batchFun () {
      let pic_id = '';
      this.selected.forEach((item, idx) => {
        if (item) {
          pic_id += this.pictureList[idx].picture_id + ','
        }
      })
      if (!pic_id) {
        this.$message.error('请选择图片')
        return
      } else {
        pic_id = pic_id.substring(0, pic_id.length - 1)
      }
      if (!this.batchValue) {
        this.$message.error('请选择批量操作类型')
        return
      }
      if (this.batchValue == '0') {
        //删除
        this.albumPictureDel(pic_id)
      } else { //转移
        this.moveDialog(pic_id)
      }
    },
    //选择图片
    selectedFun (idx) {
      if (this.selected[idx]) {
        $('.checkbox').prop("checked", false)
      }
      this.$set(this.selected, idx, !this.selected[idx])
    },

    //全选
    selectedAll () {
      let falg;
      if ($('.checkbox').prop("checked")) {
        falg = true
      } else {
        falg = false
      }
      this.selected.forEach((item, idx) => {
        this.$set(this.selected, idx, falg)
      });
    },

    //图片列表
    async albumPictureList () {
      if (!this.album_id) {
        this.$message.error('ID获取失败，请返回上一级页面')
        return
      }
      this.loading = true
      this.listParams.id = this.album_id
      let res = await this.album_picture_list(this.listParams)
      if (res.state == "success") {
        this.no_data = false
        this.loading = false
        this.pictureList = res.data.list
        this.pageTotal = res.data.total
        if (this.pictureList.length > 0) {
          this.pictureList.forEach(item => {
            this.selected.push(false)
          });
        } else {
          this.no_data = true
        }

      } else {
        this.$message.error(res.msg);
      }
    },

    //图片上传
    async albumPictureAdd () {
      if (!this.updateValue) {
        this.$message.error('请选择上传相册')
        return
      }
      if (this.addParams.images.length <= 0) {
        this.$message.error('请选择上传图片')
        return
      }
      this.addParams.id = this.updateValue
      let res = await this.album_picture_add(this.addParams)
      if (res.state == "success") {
        this.dialogVisible = false
        this.addParams.images = []
        this.$refs.upload.clearFiles()
        this.albumPictureList()
      } else {
        this.$message.error(res.msg);
      }
    },

    //图片转移弹出
    moveDialog (_id) {
      this.dialogMove = true
      this.editParams.pic_id = _id
    },

    //图片转移
    async albumPictureEdit () {
      if (!this.moveValue) {
        this.$message.error('请选择目标相册')
        return
      }
      this.editParams.id = this.moveValue
      let res = await this.album_picture_edit(this.editParams)
      if (res.state == "success") {
        this.$message.success(res.msg);
        this.dialogMove = false
        this.albumPictureList()
      } else {
        this.$message.error(res.msg);
      }
    },

    //图片删除
    albumPictureDel (_id, index) {
      this.$confirm('确定删除此图片？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delParams.pic_id = _id
        let res = this.album_picture_del(this.delParams).then((res) => {
          if (res.state == "success") {
            this.albumPictureList()
            // this.pictureList.splice(index, 1)
            this.$message.success('删除成功')
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
      this.albumPictureList()
    },

    handleClose (done) {
      done()
    },
    handleRemove (file, fileList) {
      //删除后重新给图片数组赋值
      this.addParams.images = []
      fileList.forEach(item => {
        this.addParams.images.push(item.response.data.data)
      });
    },
    handleError (files) {
      this.$message.error(`部分文件上传失败`);
    },
    handlePreview (file) {
      // console.log(file);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`, '提示', {
        type: 'warning'
      })
    },
    handleAvatarSuccess (res, file) {
      if (res.status == '0') {
        this.addParams.images.push(res.data.data)
      }
    },
    uploadDialog () {
      this.dialogVisible = true
    }
  },
}
</script>
<style lang="scss" scoped>
.con_right {
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
      i {
        font-size: 16px;
        vertical-align: middle;
        margin-top: -3px;
        margin-right: 4px;
      }
    }
  }
  .con_box {
    width: 100%;
    // min-height: calc(100vh - 80px - 10px - 50px);
    padding: 0px 10px;
    .con_ul {
      border-bottom: 1px solid #dddddd;
      padding: 14px 0;
      min-height: 200px;
      .con_li {
        width: 158px;
        height: 158px;
        display: block;
        float: left;
        padding: 8px 9px 12px 9px;

        .con_libox {
          width: 100%;
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
          position: relative;
          cursor: pointer;
          &:hover {
            p {
              display: block;
            }
          }
          img {
            width: 100%;
            height: 140px;
            display: block;
          }
          .img {
            width: 100%;
            height: 140px;
            background-color: #f8d6d6;
            display: block;
          }
          i {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 20px;
            height: 20px;
          }
          i.selected {
            background: url("~@/assets/images/icon/selected.png");
          }
          p {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30px;
            background-color: #fff;
            text-align: center;
            line-height: 30px;
            display: none;
            .checkbox {
              cursor: pointer;
              vertical-align: middle;
              margin-right: 4px;
              margin-top: -1px;
            }
            span {
              cursor: pointer;
              font-size: 12px;
            }
            span.move {
              color: #0067ed;
            }
            span.del {
              color: #fe3946;
              margin-left: 10px;
            }
          }
        }
      }
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
  .dbox {
    padding: 10px 40px 20px 40px;
    .item {
      margin-top: 20px;
    }
    /deep/.el-input__inner {
      height: 24px;
      line-height: 24px;
      width: 200px;
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
  }
}
/deep/.el-pagination {
  margin-top: 40px;
  padding-bottom: 60px;
  text-align: right;
}
</style>