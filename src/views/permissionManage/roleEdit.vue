<template>
  <div class="con-right">
    <div class="role-wrap">
      <h2 class="wrap-title">添加/编辑角色<a href="javascript:;" class="addRole">添加角色</a></h2>
      <div class="role-con">
        <div class="labelItem clearfix">
          <div class="item">
            <span class="label must">角色名称：</span>
            <div class="val">
              <input type="text" class="roleName">
            </div>
          </div>
          <div class="item">
            <span class="label must">角色描述：</span>
            <div class="val">
              <textarea name="" id="" class="describe" cols="30" rows="10"></textarea>
            </div>
          </div>
        </div>
        <div class="selectRole">
          <div class="labelItem clearfix">
            <div class="item">
              <div class="label">
                <el-checkbox v-model="checked">商品管理：</el-checkbox>
              </div>
              <div class="val">
                <ul class="clearfix">
                  <li>商品添加/编辑</li>
                  <li>商品添加/编辑</li>
                  <li>商品添加/编辑</li>
                  <li>商品添加/编辑</li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="label">
                <el-checkbox v-model="checked">商品管理：</el-checkbox>
              </div>
              <div class="val">
                <ul class="clearfix">
                  <li>商品添加/编辑</li>
                  <li>商品添加/编辑</li>
                  <li>商品添加/编辑</li>
                  <li>商品添加/编辑</li>
                </ul>
              </div>
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
  name: 'role',
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
.footerBtn {
  text-align: right;
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
.role-con {
  padding: 30px 85px;
  font-size: 12px;
  border-bottom: 1px solid #dddddd;
  .label {
    color: #666666;
    text-align: right;
  }
  .val {
    margin-left: 65px;
  }
  .describe {
    height: 160px;
    width: 100%;
    resize: none;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(221, 221, 221, 1);
    color: #333;
    padding: 5px;
  }
  .roleName {
    height: 24px;
    width: 100%;
    line-height: 24px;
    vertical-align: middle;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(221, 221, 221, 1);
    color: #333;
    padding: 0 5px;
  }
}
.addRole {
  width: 68px;
  height: 24px;
  background: white;
  border: 1px solid #0067ed;
  color: #0067ed;
  font-size: 12px;
  text-align: center;
  display: block;
  float: right;
  line-height: 24px;
  margin-top: 8px;
  margin-right: 20px;
  border-radius: 2px;
  font-weight: 400;
}
.selectRole {
  font-size: 12px;
  margin-top: 17px;
  .label {
    left: -24px;
  }
  li {
    float: left;
    padding: 0 10px;
    height: 24px;
    margin-top: 3px;
    line-height: 24px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    margin-right: 20px;
    font-size: 12px;
    cursor: pointer;
    color: #999999;
  }
  /deep/.el-checkbox__label {
    font-size: 12px;
  }
  /deep/.el-checkbox__inner {
    width: 15px;
    height: 15px;
  }
}
</style>