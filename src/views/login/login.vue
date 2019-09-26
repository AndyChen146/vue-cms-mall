<template>
  <div class="login-box">
    <div class="login-wrap">
      <div class="system-name">
        <h3>合晶芯城商品管理系统</h3>
        <p>COMMODITY MANAGEMENT SYSTEM</p>
      </div>
      <div class="login-con clearfix">
        <div class="form-wrap fr">
          <img src="@/assets/images/login-logo.png" alt="">
          <div class="form">
            <input type="text" class="inp user" placeholder="请输入用户名" maxlength="20" v-model="username">
            <input type="password" class="inp pwd" placeholder="请输入用户密码" maxlength="100" v-model="password" @keyup.enter="loginBtn">
          </div>
          <a href="javascript:;" class="loginBtn" @click="loginBtn">登 录</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { mapState, mapActions, mapMutations } from 'vuex'
import md5 from 'js-md5'
export default {
  name: 'login',
  components: {
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {

  },
  mounted () {

  },
  computed: {
    ...mapState('demo', ['vuexres', 'count'])
  },
  methods: {
    ...mapActions('lyf', ['loginIn']),
    loginBtn () {
      const _self = this;
      if (_self.username == '') {
        return this.$message.error({
          message: '用户名不能为空',
          customClass: 'toast'
        })
      } else if (_self.password == '') {
        return this.$message.error({
          message: '密码不能为空',
          customClass: 'toast'
        })
      }
      _self.loginIn({
        username: _self.username,
        pwd: _self.password
      }).then(res => {
        if (res.code == 0) {
          sessionStorage.setItem("token", res.data.token)
          sessionStorage.setItem("expire", res.data.expire)
          _self.$router.push('/goods/list')
        } else {
          this.$message.error({
            message: res.msg,
            customClass: 'toast'
          })
        }
      })
    },

  },
  watch: {
    // username (val) {
    //     console.log(val)
    // }
  }
}
</script>
<style lang="scss" scoped>
.login-box {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(67, 139, 255, 1) 0%,
    rgba(37, 112, 225, 1) 100%
  );
}
.login-wrap {
  width: 1100px;
  margin: 0 auto;
  padding-top: 1px;
  .system-name {
    margin-top: 8%;
    margin-bottom: 10%;
    h3 {
      height: 42px;
      font-size: 29px;
      font-weight: 400;
      line-height: 42px;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 1px;
    }
    p {
      height: 22px;
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      color: rgba(255, 255, 255, 1);
    }
  }
  .login-con {
    background: url("~@/assets/images/loginBg.png") no-repeat left 25px center;
    background-size: 500px auto;
  }
  .form-wrap {
    background: #fff url("~@/assets/images/form-wrap.png") no-repeat center
      bottom;
    width: 440px;
    height: 440px;
    border-radius: 10px;
    padding: 70px;
    img {
      margin-bottom: 30px;
    }
    .inp {
      display: block;
      padding-left: 40px;
      padding-right: 5px;
      height: 40px;
      width: 100%;
      line-height: 40px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid #dddddd;
      transition: 0.5s;
      border-radius: 2px;
      font-size: 16px;
      color: #333333;
      &:focus {
        border-color: #3985fe;
      }
    }
    .user {
      margin-bottom: 16px;
      background: #fff url("~@/assets/images/icon/user.png") no-repeat left 3px
        center;
    }
    .pwd {
      background: #fff url("~@/assets/images/icon/pwd.png") no-repeat left 3px
        center;
      margin-bottom: 40px;
    }
  }
  .loginBtn {
    display: block;
    height: 40px;
    line-height: 40px;
    background: rgba(57, 133, 254, 1);
    border-radius: 2px;
    color: #fff;
    font-size: 16px;
    text-align: center;
  }
}
</style>