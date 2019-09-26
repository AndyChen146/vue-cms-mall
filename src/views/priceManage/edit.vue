<template>
  <div class="con_right">
    <h2 class="wrap-title">价格信息</h2>
    <div class="con_table">
      <table class="tables">
        <tr>
          <th>商品K3编号</th>
          <th>商品分类</th>
          <th>商城现价</th>
        </tr>
        <tr>
          <td>SR.0201103J10G</td>
          <td>贴片电阻</td>
          <td>
            <p>50+ ￥0.032544/pcs</p>
            <p>1500+ ￥0.028928/pcs</p>
            <p>3000+ ￥0.019526/pcs</p>
            <p>15000+ ￥0.019165/pcs</p>
            <p>30000+ ￥0.018803/pcs</p>
          </td>
        </tr>
      </table>
    </div>
    <h2 class="wrap-title">商品调价</h2>
    <div class="con_table">
      <table class="tables">
        <tr>
          <th>请输入阶梯数量</th>
          <th>请输入对应的阶梯价格</th>
          <th>操作</th>
        </tr>
        <tr>
          <td>50+</td>
          <td>
            <input type="text" class="text" value="￥0.131400">
          </td>
          <td>
            <em class="del">删除</em>
          </td>
        </tr>
        <tr>
          <td>1500+</td>
          <td>
            <input type="text" class="text" value="￥0.131400">
          </td>
          <td>
            <em class="del">删除</em>
          </td>
        </tr>
        <tr>
          <td>3000+</td>
          <td>
            <input type="text" class="text" value="￥0.131400">
          </td>
          <td>
            <em class="add">增加</em>
            <em class="del">删除</em>
          </td>
        </tr>
      </table>
    </div>
    <div class="con_btn">
      <button type="button">提交</button>
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
.con_table {
  padding: 20px;
  .tables {
    width: 100%;
    tr {
      th {
        width: 33%;
        height: 40px;
        background-color: #e9f5ff;
        color: #666666;
        font-size: 13px;
        text-align: center;
        line-height: 40px;
      }
      td {
        font-size: 12px;
        color: #333;
        width: 33%;
        text-align: center;
        padding: 10px 0;
        .text {
          width: 150px;
          height: 22px;
          border: 1px solid #e8e8e8;
          text-align: center;
        }
        em.del {
          color: #ff2929;
          cursor: pointer;
        }
        em.add {
          color: #3985fe;
          cursor: pointer;
          margin-right: 10px;
        }
        p {
          line-height: 28px;
        }
      }
    }
    tr:nth-child(odd) {
      background-color: #e9f5ff;
    }
  }
}
.con_btn {
  width: 100%;
  border-top: 1px solid #dddddd;
  padding: 10px 0;
  text-align: right;
  button {
    width: 120px;
    height: 24px;
    background-color: #3985fe;
    font-size: 12px;
    color: #fff;
    text-align: center;
    line-height: 24px;
    border: 1px solid #3985fe;
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>
