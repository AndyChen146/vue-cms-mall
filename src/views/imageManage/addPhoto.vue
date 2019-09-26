<template>
  <div class="con_right">
    <h2 class="wrap-title">新建/编辑相册</h2>
    <div class="con_box">
      <div class="labelItem">
        <div class="item">
          <span class="label must">相册名称：</span>
          <span class="val">
            <input type="text" placeholder="" v-model.trim="params.name" />
          </span>
        </div>
        <div class="item">
          <span class="label must icon">相册封面：</span>
          <div class="val imgbox">
            <el-upload class="avatar-uploader" name="fileName" action="/set/uploads/upFile" :show-file-list="false" :on-success="handleAvatarSuccess" accept="image/jpg,image/png,image/jpeg" :before-upload="beforeAvatarUpload">
              <img v-if="params.image" :src="params.image" class="avatar">
              <div class="tsbox" v-else>
                <i class="el-icon-plus avatar-uploader-icon"></i>
                <p>160*160PX</p>
                <p>仅限上传PNG格式 大小1M以内</p>
              </div>
            </el-upload>
          </div>
        </div>
        <div class="item">
          <span class="label">相册描述：</span>
          <span class="val">
            <textarea name="" id="" cols="30" rows="10" v-model.trim="params.description"></textarea>
          </span>
        </div>
        <div class="item">
          <span class="label">排序：</span>
          <span class="val">
            <input type="text" placeholder="" v-model.trim="params.sort" />
          </span>
        </div>
        <div class="item lastbtn">
          <span class="label"></span>
          <span class="val">
            <button type="button" @click="albumAdd">提交</button>
          </span>
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
      imageUrl: '',
      params: {
        name: '',
        image: '',
        description: '',
        sort: '',
      },
      album_id: ''
    }
  },
  created () {
    this.album_id = this.$route.query.id
    if (this.album_id) {
      this.albumDetails(this.album_id)
    }
  },
  mounted () {

  },
  computed: {
    // ...mapState('demo', ['vuexres', 'count'])
  },
  methods: {
    ...mapActions('lxr', ['album_add', 'album_details', 'album_edit']),
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
        this.params.image = res.data.data
      } else {
        this.$message.error(res.msg)
      }
    },
    async albumDetails (_id) {
      let res = await this.album_details({ id: _id })
      if (res.state == "success") {
        this.params = {
          name: res.data.album_name,
          image: res.data.album_cover,
          description: res.data.description,
          sort: res.data.sort_order,
        }
      } else {
        this.$message.error(res.msg);
      }
    },
    async albumAdd () {
      let res
      if (this.album_id) {
        this.params.id = this.album_id
        res = await this.album_edit(this.params)
        if (res.state == "success") {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg);
        }
      } else {
        res = await this.album_add(this.params)
        if (res.state == "success") {
          this.$message.success(res.msg)
          this.params = {
            name: '',
            image: '',
            description: '',
            sort: '',
          }
        } else {
          this.$message.error(res.msg);
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.con_box {
  padding: 20px 40px 60px 40px;
  .labelItem {
    .item {
      .label {
        width: 90px;
        padding-right: 10px;
        font-size: 12px;
        color: #666666;
        text-align: right;
      }
      .must {
        &::before {
          left: 8px;
          top: 4px;
        }
      }
      .imgbox {
        width: 160px;
        height: 160px;
        background-color: #f2f2f2;
      }
      .label.icon {
        line-height: 160px;
      }
      .val {
        margin-left: 100px;
        input {
          width: 260px;
          height: 24px;
          border: 1px solid #dddddd;
          font-size: 12px;
          text-indent: 10px;
        }
        textarea {
          width: 760px;
          height: 110px;
          resize: none;
          border: 1px solid #e8e8e8;
          padding: 10px;
          font-size: 12px;
          font-family: "微软雅黑";
        }
        button {
          width: 220px;
          height: 40px;
          background-color: #3985fe;
          font-size: 12px;
          color: #ffffff;
          text-align: center;
          line-height: 40px;
          border: none;
          cursor: pointer;
        }
      }
      &.lastbtn {
        border-top: 1px solid #e8e8e8;
        padding-top: 20px;
      }
    }
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