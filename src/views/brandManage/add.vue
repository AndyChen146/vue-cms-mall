<template>
  <div class="con-right">
    <div class="baseInfo-wrap">
      <h2 class="wrap-title">添加/编辑品牌</h2>
      <div class="baseInfo-con">
        <div class="labelItem">
          <div class="item">
            <span class="label must">品牌中文名称：</span>
            <span class="val"><input type="text" placeholder="请输入内容" v-model="params.name"></span>
          </div>
          <div class="item">
            <span class="label must">品牌英文名称：</span>
            <div class="val">
              <input type="text" placeholder="请输入内容" v-model="params.en_name">
            </div>
          </div>
          <div class="item">
            <span class="label must">品牌LOGO：</span>
            <div class="val imgbox">
              <el-upload class="avatar-uploader" name="fileName" action="/set/uploads/upFile" :show-file-list="false" :on-success="handleAvatarSuccess" accept="image/jpg,image/png,image/jpeg" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <div class="tsbox" v-else>
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                  <p>160*160PX</p>
                  <p>仅限上传PNG/JPG/JPEG格式 大小1M以内</p>
                </div>
              </el-upload>
            </div>
          </div>
          <div class="item">
            <span class="label">排序：</span>
            <span class="val">
              <input type="number" placeholder="" v-model="params.sort">
            </span>
          </div>
          <div class="item">
            <span class="label must">是否显示：</span>
            <span class="val">
              <el-switch v-model="switchVal" active-color="#3985fe" @change="isChangeSwitch">
              </el-switch>
              <p class="tip">当品牌下还没有商品的时候，分类页的品牌区将不会显示该品牌。</p>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="other-wrap">
      <!-- <h2 class="wrap-title">相关信息</h2> -->
      <div class="other-con">
        <div class="otehrNav">
          <a href="javascript:;" :class="{current:languageId==1}" @click="selectLanguage(1)">中文</a>
          <a href="javascript:;" :class="{current:languageId==2}" @click="selectLanguage(2)">英文</a>
        </div>
        <div class="otherNav-con">
          <div class="labelItem clearfix">
            <div class="item">
              <span class="label">品牌故事：</span>
              <div class="val" v-for="(item, index) in params['multi-language']" :key="index" v-show="item.language_id == languageId">
                <textarea name="" id="" class="describe" cols="30" rows="10" v-model="item.description"></textarea>
              </div>
            </div>
          </div>
          <a href="javascript:;" class="btn" @click="btnSubmit">提交</a>
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
      params: {
        name: '',
        en_name: '',
        logo: '',
        sort: '',
        status: 1,
        'multi-language': [
          {
            language_id: 1,
            description: ''
          },
          {
            language_id: 2,
            description: ''
          }
        ]
      },
      switchVal: true,
      imageUrl: '',
      languageId: 1
    }
  },
  created () {
    let id = this.$route.query.bid;
    if (id) {
      this.getBrandInfo(id)
    }

  },
  mounted () {

  },
  computed: {
    ...mapState('demo', ['vuexres', 'count'])
  },
  methods: {
    ...mapActions('lyf', ['addBrandInfo', 'editBrandInfo', 'getBrandDetail']),
    //图片上传
    beforeAvatarUpload (file) {
      const isImages = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg'
      const isSize = file.size / 1024 / 1024 < 1
      if (!isImages) {
        this.$message.error('图片只能是png/jpg/jpeg后缀格式')
      }
      if (!isSize) {
        this.$message.error('图片大小不能超过1M')
      }
      return isImages && isSize
    },
    handleAvatarSuccess (res, file) {
      if (res.status == "0") {
        this.imageUrl = res.data.data
        this.params.logo = res.data.data
      } else {
        this.$message.error(res.msg)
      }
    },
    //获取品牌详情
    getBrandInfo (id) {
      let _self = this;
      _self.getBrandDetail({
        id: id
      }).then(res => {
        if (res.status == "0") {
          _self.params.id = id;
          _self.params.name = res.data.name
          _self.params.en_name = res.data.en_name
          _self.imageUrl = res.data.logo
          _self.params.logo = res.data.logo
          _self.params.sort = res.data.sort_order
          _self.params.status = res.data.is_display
          if (res.data.is_display == 0) {
            _self.switchVal = false
          }
          _self.params['multi-language'] = res.data['multi-language']
        }
      })
    },
    //中英文切换
    selectLanguage (type) {
      this.languageId = type
    },
    // 显示状态切换
    isChangeSwitch (status) {
      this.params.status = status ? 1 : 0
    },
    //提交
    btnSubmit () {
      let _self = this;
      if (_self.params.name == '') {
        return this.$message.error("中文名称不能为空")
      } else if (_self.params.en_name == '') {
        return this.$message.error("英文名称不能为空")
      } else if (_self.imageUrl == '') {
        return this.$message.error("请上传品牌LOGO")
      }
      if (this.$route.query.bid) {
        _self.editBrandInfo(_self.params).then(res => {
          if (res.status == "0") {
            this.$message({
              type: 'success',
              message: '编辑成功!',
              customClass: 'toast'
            });
            _self.$router.push({
              path: '/cbrand/list'
            })
          } else {
            this.$message.error({
              message: res.msg,
              customClass: 'toast'
            })
          }
        })
      } else {
        _self.addBrandInfo(_self.params).then(res => {
          if (res.status == "0") {
            this.$message({
              type: 'success',
              message: '新增成功!',
              customClass: 'toast'
            });
            _self.$router.push({
              path: '/cbrand/list'
            })
          } else {
            this.$message.error({
              message: res.msg,
              customClass: 'toast'
            })
          }
        })
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.other-wrap {
  .other-con {
    padding: 20px;
    .otehrNav {
      border-bottom: 1px solid #e8e8e8;
      margin-bottom: 20px;
      padding-left: 78px;
      a {
        display: inline-block;
        line-height: 27px;
        margin-right: 50px;
        &.current {
          color: #0067ed;
        }
      }
    }
    textarea {
      padding: 10px;
      resize: none;
      width: 100%;
      color: #333333;
    }
    .describe {
      height: 160px;
      border: 1px solid rgba(232, 232, 232, 1);
    }
    .keywords {
      height: 70px;
      border: 1px solid rgba(232, 232, 232, 1);
    }
    .item + .item {
      margin-top: 20px;
    }
    .btn {
      width: 220px;
      display: block;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: rgba(57, 133, 254, 1);
      color: #fff;
      font-size: 12px;
      margin-top: 30px;
      margin-bottom: 20px;
      margin-left: 75px;
    }
  }
}
.imgbox {
  width: 160px;
  height: 160px;
  background-color: #f2f2f2;
}
.baseInfo-con {
  padding: 20px 30px;
  color: #666;
  font-size: 12px;
  position: relative;
  .imagesUpdate {
    .img {
      background: #f2f2f2 url("~@/assets/images/icon/default.svg") no-repeat top
        24px center;
      background-size: 20px 20px;
      width: 100px;
      height: 100px;
      line-height: 130px;
      text-align: center;
      color: #999999;
      font-size: 12px;
      margin-bottom: 6px;
    }
  }
  .tip {
    color: #999999;
    font-size: 11px;
    margin-bottom: 2px;
  }
  input {
    width: 260px;
    height: 24px;
    line-height: 24px;
    vertical-align: middle;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(232, 232, 232, 1);
    padding: 0 10px;
  }
  .label {
    text-align: right;
    min-width: 60px;
  }
  .labelItem .item + .item {
    margin-top: 7px;
  }
  .val {
    margin-left: 85px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  .tsbox {
    width: 120px;
    margin: 0 auto;
    text-align: center;
    margin-left: 20px;
    p {
      color: #999999;
      font-size: 13px;
    }
    p:last-child {
      line-height: 20px;
      font-size: 12px;
    }
  }
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 16px;
  width: 20px;
  line-height: 20px;
  text-align: center;
  height: 20px;
  background-color: #3985fe;
  border-radius: 50%;
  color: #ffffff;
  font-weight: bold;
  margin-top: 30px;
}
.avatar {
  width: 160px;
  height: 160px;
  display: block;
}
</style>