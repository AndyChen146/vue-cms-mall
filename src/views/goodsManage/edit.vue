<template>
  <div class="con-right">
    <!-- <div class="nav-wrap">
      <a href="javascript:;" class="current">全部商品(<span>1000</span>)</a>
      <a href="javascript:;">待审核(<span>1000</span>)</a>
      <a href="javascript:;">未通过(<span>1000</span>)</a>
    </div> -->
    <div v-loading="loading" style="min-height:500px;">
      <template v-if="productDetail.category_id">
        <div class="baseInfo-wrap">
          <h2 class="wrap-title">基本信息</h2>
          <div class="baseInfo-con">
            <div class="labelItem">
              <div class="item">
                <span class="label must">商品分类：</span>
                <span class="val">{{productDetail.cate_path}}</span>
              </div>
              <div class="item">
                <span class="label must">商品品牌：</span>
                <div class="val">
                  <el-select v-model="brandListVal" placeholder="请选择品牌" class="brandType">
                    <el-option v-for="item in brandList" :key="item.brand_id" :label="item.name" :value="item.brand_id">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="item">
                <span class="label">参数规格：</span>
                <span class="val">
                  <input type="text" placeholder="" v-model.trim="productDetail.spec_param">
                </span>
              </div>
              <div class="item">
                <span class="label">物料编码：</span>
                <span class="val">
                  <input type="text" placeholder="" v-model.trim="productDetail.material_sn">
                </span>
              </div>
              <div class="item">
                <span class="label must">商品名称：</span>
                <span class="val">
                  <input type="text" placeholder="" v-model.trim="productDetail.product_name">
                </span>
              </div>
              <div class="item">
                <span class="label">K3编码：</span>
                <span class="val">
                  <input type="text" placeholder="" v-model.trim="productDetail.material_ksn">
                </span>
              </div>
              <div class="item">
                <span class="label">封装规格：</span>
                <span class="val">
                  <input type="text" placeholder="" v-model.trim="productDetail.spec_package">
                </span>
              </div>
              <div class="item">
                <span class="label">包装数量：</span>
                <span class="val">
                  <input type="text" placeholder="" v-model.trim="productDetail.quantity">
                </span>
              </div>
            </div>
            <div class='update-con'>
              <div class="imagesUpdate">
                <el-upload class="avatar-uploader" name="fileName" action="/set/uploads/upFile" :show-file-list="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" accept="image/jpg,image/png,image/jpeg">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <!-- <i  class="el-icon-plus avatar-uploader-icon"></i> -->
                  <div v-else class="img">点击添加图片</div>
                </el-upload>
                <p class="tip">*支持格式*.jpg、*.png、*.bmp 文件少于1M</p>
              </div>
              <div class="fileUpdate">
                <div class="btn">上传数据手册</div>
                <p class="tip">*支持格式*.jpg、*.png、*.bmp 文件少于1M</p>
                <p class="fileName">ChipCapacitor_MLCC_HKT.jpg</p>
              </div>
            </div>
          </div>
        </div>

        <div class="params-wrap" v-if="productDetail.attribute.length>0">
          <h2 class="wrap-title">参数信息</h2>
          <div class="params-con">
            <div class="labelItem clearfix">
              <div class="item" v-for="(item, index) in productDetail.attribute" :key="index">
                <span class="label">{{item.name}}</span>
                <span class="val"><input type="text" placeholder="" v-model.trim="item.attr_value"></span>
              </div>
            </div>
          </div>
        </div>

        <div class="other-wrap">
          <h2 class="wrap-title">相关信息</h2>
          <div class="other-con">
            <div class="otehrNav">
              <a href="javascript:;" :class="{current:languageId==1}" @click="selectLanguage(1)">中文</a>
              <a href="javascript:;" :class="{current:languageId==2}" @click="selectLanguage(2)">英文</a>
              <a href="javascript:;" :class="{current:languageId==3}" @click="selectLanguage(3)">日文</a>
            </div>
            <div class="otherNav-con">
              <div class="labelItem clearfix">
                <div class="item">
                  <span class="label">商品描述</span>
                  <div class="val" v-for="(item, index) in productDetail.description" :key="index" v-show="item.language_id==languageId">
                    <textarea name="" class="describe" cols="30" rows="10" v-model.trim="item.description"></textarea>
                  </div>
                </div>
                <div class="item">
                  <span class="label">关键词</span>
                  <div class="val" v-for="(item, index) in productDetail.description" :key="index" v-show="item.language_id==languageId">
                    <textarea name="" class="keywords" cols="30" rows="10" v-model.trim="item.meta_keyword"></textarea>
                  </div>
                </div>
              </div>
              <a href="javascript:;" class="btn" @click="submit">保存</a>
            </div>
          </div>
        </div>
      </template>

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
      product_id: '',
      productDetail: {},
      loading: false,
      languageId: 1,
      imageUrl: '',
      brandList: [],
      brandListVal: '',
    }
  },
  created () {
    this.product_id = this.$route.query.product_id
    this.getProductDetail()
  },
  mounted () {

  },
  computed: {
    ...mapState('demo', ['vuexres', 'count'])
  },
  methods: {
    ...mapActions('lxr', ['get_product_detail', 'productEditSave']),
    ...mapActions('lyf', ['getBrandList']),

    //获取商品详情
    async getProductDetail () {
      let params = { product_id: this.product_id }
      this.loading = true
      let res = await this.get_product_detail(params)
      if (res.state == "success") {
        this.loading = false
        this.productDetail = res.data
        this.brandListVal = this.productDetail.brand_id
        this.getBrandListFun()
      }
    },

    //获取品牌列表
    async getBrandListFun () {
      let params = { page: 1, size: 10000, keyword: '' }
      let res = await this.getBrandList(params)
      if (res.state == "success") {
        this.brandList = res.data.list
      }
    },

    async submit () {
      this.productDetail.image = this.imageUrl
      this.productDetail.brand_id = this.brandListVal
      let res = await this.productEditSave(this.productDetail)
      if (res.state == "success") {
        this.$message.success("保存成功");
      } else {
        this.$message.success(res.msg);
      }
    },

    selectLanguage (type) {
      this.languageId = type
    },
    handleAvatarSuccess (res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.imageUrl = res.data.data;
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
  },
}
</script>
<style lang="scss" scoped>
/deep/.el-upload-list__item:first-child {
  margin-top: 0;
}
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
      }
      .current {
        color: #3985fe;
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
.params-wrap {
  .params-con {
    padding: 20px 0 20px 20px;
  }

  .labelItem .item + .item {
    margin-top: 0;
  }
  .item {
    float: left;
    margin-bottom: 10px;
    margin-right: 20px;
  }
  .label {
    line-height: 24px;
    color: #666;
    position: relative;
    float: left;
  }
  .val {
    line-height: 24px;
    margin-left: 4px;
    float: left;
  }
  input {
    width: 100px;
    line-height: 22px;
    display: block;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(232, 232, 232, 1);
    opacity: 1;
    font-size: 12px;
    color: #333333;
    text-align: center;
  }
}
.baseInfo-con {
  padding: 20px 30px;
  color: #666;
  font-size: 12px;
  position: relative;
  .brandType {
    /deep/input {
      width: 260px;
      height: 24px;
      line-height: 24px;
      vertical-align: middle;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(232, 232, 232, 1);
      padding: 0 10px;
    }
    /deep/.el-input__icon {
      line-height: 28px;
    }
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
    margin-left: 68px;
  }
  .update-con {
    position: absolute;
    left: 450px;
    top: 65px;
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
    img {
      width: 100px;
      height: 100px;
    }
    .tip {
      color: #999999;
      font-size: 11px;
      margin-bottom: 2px;
    }
    .fileName {
      font-size: 11px;
      color: #3985fe;
    }
    .btn {
      width: 92px;
      line-height: 24px;
      color: #fff;
      height: 24px;
      background: rgba(0, 103, 237, 1);
      text-align: center;
      margin-top: 7px;
      margin-bottom: 6px;
      cursor: pointer;
    }
  }
}
</style>