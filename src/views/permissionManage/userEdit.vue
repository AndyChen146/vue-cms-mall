<template>
  <div class="con-right">
    <div class="user-wrap">
      <h2 class="wrap-title">添加/编辑用户</h2>
      <div class="user-con">
        <div class="labelItem">
          <div class="item">
            <div class="label">
              <span class="must">角色名称：</span>
            </div>
            <div class="val">
              <input type="text">
            </div>
          </div>
          <div class="item">
            <div class="label"><span class="must">用户名：</span></div>
            <div class="val">
              <input type="text">
            </div>
          </div>
          <div class="item">
            <div class="label"><span class="must">密码：</span></div>
            <div class="val">
              <input type="text">
            </div>
          </div>
          <div class="item">
            <span class="label">角色：</span>
            <div class="val">
              <el-checkbox v-model="checked">运营</el-checkbox>
              <el-checkbox v-model="checked">市场</el-checkbox>
              <el-checkbox v-model="checked">销售</el-checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="footerBtn">
        <a href="javascript:;">保存</a>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'userEdit',
  components: {
  },
  data () {
    return {
      checked: false
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
    ...mapActions('demo', ['increment', 'decrement', 'getProvince'])
  },
}
</script>
<style lang="scss" scoped>
.user-wrap {
  .user-con {
    width: 340px;
    margin: 100px auto 60px;
  }
  .label {
    width: 70px;
    text-align: right;
    span {
      position: relative;
      display: inline-block;
    }
  }
  .val {
    input {
      width: 260px;
      height: 24px;
      line-height: 24px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(221, 221, 221, 1);
      padding: 0 10px;
    }
  }
}
.footerBtn {
  text-align: center;
  padding: 20px 85px;
  a {
    display: inline-block;
    width: 120px;
    height: 26px;
    line-height: 26px;
    background: rgba(57, 133, 254, 1);
    text-align: center;
    font-size: 12px;
    color: #fff;
    border-radius: 2px;
  }
}
</style>