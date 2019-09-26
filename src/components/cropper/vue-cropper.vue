<template>
  <div class="cropper-win">
    <div class="custom-cropper-box">
      <vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :original="option.original" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox"></vueCropper>
    </div>
    <div class="btns-box">
      <button type="button" class="btn btn-outline" @click="cancel()">取消</button>
      <button type="button" class="btn" @click="uploadImgOss()">确定</button>
    </div>
  </div>

</template>

<script>
import OSS from 'ali-oss'
import { VueCropper } from 'vue-cropper'
export default {

  props: {
    imgNav: {},  //负责接收父组件传回来的上传文件参数
  },
  data () {
    return {
      headImg: '',
      //剪切图片上传
      crap: false,
      previews: {},
      option: {
        img: '',
        outputSize: 1, //剪切后的图片质量（0.1-1）
        full: false,//输出原图比例截图 props名full
        outputType: 'png',
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: this.imgNav.cWidth,
        autoCropHeight: this.imgNav.cHeight,
        fixedBox: true,
      },
      eventObj: '',
      fileName: '',  //本机文件地址
      downImg: '#',
      imgFile: '',
      uploadImgRelaPath: '', //上传后的图片的地址（不带服务器域名）
    }
  },
  components: {
    VueCropper,
  },

  mounted () {
    this.option.img = this.imgNav.optionImg
    this.fileName = this.imgNav.fileName
    this.eventObj = this.imgNav.eventObj
  },
  methods: {
    /* 关闭所有弹出层 */
    cancel: function () {
      this.$emit('returnCropper', false)
    },

    //截图上传OSS
    uploadImgOss () {
      this.$refs.cropper.getCropData(data => {
        //设置图片名称
        let name = Math.floor(Math.random() * 1000000)
        //将显示图片地址情况，防止重复上传
        this.option.img = ''
        //将裁剪的base64图片转换成file格式
        let file = this.dataURLtoFile(data, name)
        //将图片上传到OSS
        this.uploadImage(file)
      })
    },
    //将base64转换为file格式
    dataURLtoFile (dataurl, filename) {
      //将base64转换为文件
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      /* return new File([u8arr], filename, {
        type: mime,
      }); */
      return new File([u8arr], this.eventObj.target.files[0].name, {
        type: this.eventObj.target.files[0].type,
      });
    },
    // 将裁剪完图片上传oss
    async uploadImage (event) {
      this.imgUrl = await this.getFile(event)
    },


    getFile (event) {
      let _this = this;
      // //oss 基本配置
      var client = new OSS({
        region: process.env.VUE_APP_IMAGE_URL_PRIFIX,
        endpoint: process.env.VUE_APP_ENDPOINT,
        accessKeyId: process.env.VUE_APP_AliyunAccessKeyID,
        accessKeySecret: process.env.VUE_APP_AliyunAccessKeySecret,
        bucket: process.env.VUE_APP_BUCKET_PRIVATE,
      })
      //进度
      this.percentage = 0;
      const file = event
      let randomName = this.random_string(6) + '_' + file.name
      /* 上传 */
      client.put(randomName, file, {
        progress: function* (percentage, cpt) {
          vthis.percentage = percentage
        }
      }).then(async (results) => {
        /* 上传成功操作 */
        console.log(results)
        this.$emit('returnCropper', false)
        this.$emit('returnCropperOssVal', results.url)
        this.$refs.cropper.clearCrop()
      }).catch((err) => {
        console.log(err)
      })
    },
    //随机字符串
    random_string (len) {
      len = len || 32
      var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      var maxPos = chars.length
      var pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },

  }


  /* <vueCropper :imgNav="imgNav" v-if="vueCropperShow" v-on:returnCropper="returnCropper" v-on:returnCropperOssVal="returnCropperOssVal"></vueCropper> */
  /* 图片上传所需 */
  /* vueCropperShow: false,  //显示组件
  imgNav: {
    eventObj: '',
    fileName: '',  //本机文件地址
    optionImg: '',
    example2Img: '',
    cWidth: 300, //裁剪框的宽
    cHeight: 300,//裁剪框的高
  } */
  /* components: {
    vueCropper,
  }, */

  /*       //返回关闭状态
      returnCropper () {
        this.vueCropperShow = false
        this.$refs.uploads.value = ''
      },
      //返回Oss上传成功的URL
      returnCropperOssVal (url) {
        console.log(url)
        this.$refs.uploads.value = ''
        this.$refs.avatar.src = url
      }, */

  /* 图片上传 */
  //选择本地图片
  /*     uploadImg (e, num) {
        console.log(1);
        var _this = this;
        _this.imgNav.eventObj = e
        //上传图片 
        var file = e.target.files[0]
        _this.imgNav.fileName = file.name;
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader();
        reader.onload = (e) => {
          let data;
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要 
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          }
          else {
            data = e.target.result
          }
          if (num === 1) {
            _this.imgNav.optionImg = data
          } else if (num === 2) {
            _this.imgNav.example2Img = data
          }
          this.vueCropperShow = true
        }
        reader.readAsArrayBuffer(file);
      }, */
};
</script>
<style lang="scss" scoped>
.cropper-win {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  .btns-box {
    position: absolute;
    left: 0;
    top: calc(90% + 10px);
    text-align: center;
    width: 100%;
    .btn {
      margin-right: 20px;
      min-width: auto;
    }
    .btn-outline {
      border-color: #5dd5c8;
      background-color: #fff;
      color: #5dd5c8;
    }
  }
  .custom-cropper-box /deep/ .cropper-modal {
    background: none;
  }
  /deep/ .cropper-view-box {
    outline: 3px solid #39f;
  }
}
.custom-cropper-box {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 60%;
  height: 80%;
  z-index: 999;
  transform: translateX(-50%) translateY(-50%);
  background: #fff;
  .vue-cropper {
    background: none;
  }
}
</style>

