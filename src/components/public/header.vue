<template>
  <div class="headerbody">
    <div class="head-wrap clearfix">
      <a href="javascript:;" class="fl">
        <img class="logo" src="@/assets/images/logo.png" />
      </a>
      <a href="javascript:;" class="importFile fl">{{public_name}}</a>
      <div class="fr headRightCon clearfix">
        <span class="user fl">Admin</span>
        <a href="javascript:;" class="fl refresh" @click="refresh"><i></i>刷新</a>
        <a href="javascript:;" class="fl exit" @click="loginout"><i></i>退出</a>
        <!-- <el-select v-model="value" placeholder="请选择" @change="selected">
          <el-option v-for="item in languageType" :key="item.code" :label="item.val" :value="item.code">
          </el-option>
        </el-select> -->
        <div ref="languageBox" class="dropdown-wrap languageBox fl" :class="{'dropdown-menu-open':languageFlag}">
          <!-- dropdown-menu-open -->
          <span class="dropdown-select" @click.stop="menuOpenLanguage()" v-clickoutside="handleClose">
            <img src="@/assets/images/language_1.png" alt="">
          </span>
          <div class="dropdown-menu">
            <ul>
              <li v-for="(item, index) in languageType" :key="index" :data-code="item.code" @click.stop="">{{item.val}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'



export default {
  name: 'Header',
  components: {},
  data () {
    return {
      languageFlag: false,
      languageType: [{
        code: '1',
        val: '中文'
      }, {
        code: '2',
        val: '英文'
      },
      ],
      value: ''
    }
  },
  created () {

  },
  computed: {
    ...mapState('lxr', [
      'public_name'
    ])
  },
  methods: {
    selected (code) {
      alert(code)
    },
    menuOpenLanguage (event) {
      this.languageFlag = !this.languageFlag;
    },
    handleClose (e) { // 关闭下拉框
      this.languageFlag = false;
    },
    //刷新
    refresh () {
      this.$router.go(0)
    },
    //退出
    loginout () {
      localStorage.removeItem("token")
      localStorage.removeItem("expire")
      this.$router.push('/login')
    }
  },
  mounted () {

  },
}
</script>
<style lang="scss" scoped>
.headerbody {
  width: 100%;
  height: 80px;
  background: #3985fe;
  box-shadow: 0px 2px 4px rgba(234, 238, 247, 1);

  .head-wrap {
    width: 1200px;
    margin: 0 auto;
    .logo {
      display: block;
    }
    .importFile {
      height: 25px;
      font-size: 18px;
      font-weight: bold;
      line-height: 25px;
      color: rgba(255, 255, 255, 1);
      margin-left: 30px;
      margin-top: 28px;
      display: block;
    }
    .user {
      height: 25px;
      font-size: 18px;
      font-weight: bold;
      line-height: 25px;
      color: rgba(255, 255, 255, 1);
      margin-right: 50px;
      margin-top: 28px;
    }
    .headRightCon {
      a {
        width: 77px;
        height: 28px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(57, 133, 254, 1);
        border-radius: 4px;
        color: #3985fe;
        font-size: 12px;
        line-height: 28px;
        margin-top: 26px;
        display: block;
        text-align: center;
        & + a {
          margin-left: 10px;
          margin-right: 40px;
        }
        i {
          width: 18px;
          height: 18px;
          display: inline-block;
          margin-right: 6px;
          position: relative;
          top: -2px;
          vertical-align: middle;
        }
      }
      .refresh {
        i {
          background: url("~@/assets/images/icon/refresh.png");
          background-size: 18px 18px;
        }
      }
      .exit {
        i {
          background: url("~@/assets/images/icon/exit.png");
          background-size: 18px 18px;
        }
      }
      .dropdown-wrap {
        margin-top: 30px;
        width: 31px;
        height: 20px;
        img {
          display: block;
          cursor: pointer;
        }
      }
      .dropdown-select {
        background-color: unset;
        &:after {
          position: absolute;
          background: unset;
          top: 8px;
          right: -14px;
          font-size: 0;
          height: 0;
          width: 0;
          border-width: 4px 5px 0;
          border-style: solid dashed;
          border-color: #fff transparent transparent;
          overflow: hidden;
          -webkit-transition: all 0.4s ease 0s;
          transition: all 0.4s ease 0s;
        }
      }
    }
  }
}
</style>