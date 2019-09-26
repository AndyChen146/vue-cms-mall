<template>
  <div class="con_right">
    <div class="search">输入搜索：<input type="text" class="inp" placeholder="商品ID/商品K3编码"></div>
    <h2 class="wrap-title">数据列表</h2>
    <div class="con_table">
      <table class="tables">
        <tr>
          <td>商品ID</td>
          <td>原销售价格</td>
          <td>现销售价格</td>
          <td>商品状态</td>
          <td>商品信息</td>
          <td>审核状态</td>
          <td>操作信息</td>
        </tr>
        <tr class="item">
          <td>1000001</td>
          <td>
            <p class="price">
              <span class="p_num">50+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
            <p class="price">
              <span class="p_num">100+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
            <p class="price">
              <span class="p_num">1000+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
            <p class="price">
              <span class="p_num">50000+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
            <p class="price">
              <span class="p_num">50+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
          </td>
          <td class="price_td">
            <p class="price">
              <span class="p_num">50+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
            <p class="price">
              <span class="p_num">100+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
            <p class="price">
              <span class="p_num">1000+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
            <p class="price">
              <span class="p_num">50000+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
            <p class="price">
              <span class="p_num">50+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
          </td>
          <td>
            <p>原：上架中</p>
            <p>现：上架中</p>
          </td>
          <td>
            <p>原：包装数量：4000pcs</p>
            <p>现：包装数量：4000pcs</p>
          </td>
          <td>
            <p>原：未审核</p>
            <p>现：核审通过</p>
          </td>
          <td>
            <p>admin</p>
            <p>2020-07-07 16:58:00</p>
          </td>
        </tr>
        <tr class="item">
          <td>1000001</td>
          <td>
            <p class="price">
              <span class="p_num">50+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
            <p class="price">
              <span class="p_num">100+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
            <p class="price">
              <span class="p_num">1000+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
            <p class="price">
              <span class="p_num">50000+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
            <p class="price">
              <span class="p_num">50+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
          </td>
          <td class="price_td">
            <p class="price">
              <span class="p_num">50+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
            <p class="price">
              <span class="p_num">100+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
            <p class="price">
              <span class="p_num">1000+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
            <p class="price">
              <span class="p_num">50000+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
            <p class="price">
              <span class="p_num">50+</span>
              <span class="p_pcs">¥0.03256/pcs</span>
            </p>
          </td>
          <td>
            <p>原：上架中</p>
            <p>现：上架中</p>
          </td>
          <td>
            <p>原：包装数量：4000pcs</p>
            <p>现：包装数量：4000pcs</p>
          </td>
          <td>
            <p>原：未审核</p>
            <p>现：核审通过</p>
          </td>
          <td>
            <p>admin</p>
            <p>2020-07-07 16:58:00</p>
          </td>
        </tr>
      </table>
    </div>
    <el-pagination background layout="prev, pager, next" :total="100">
    </el-pagination>
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
.con_right {
  .search {
    width: 100%;
    height: 44px;
    line-height: 44px;
    padding-left: 10px;
    color: #666666;
    font-size: 12px;
    input {
      width: 140px;
      height: 24px;
      border: 1px solid #dddddd;
      text-indent: 10px;
    }
  }
  .tables {
    width: 100%;
    tr {
      th {
        height: 40px;
        line-height: 40px;
        color: #666666;
        font-size: 12px;
        text-align: center;
      }
      th:first-child {
        padding-left: 10px;
      }
      td {
        height: 40px;
        color: #333333;
        font-size: 12px;
        text-align: center;
        .edit {
          color: #0067ed;
          cursor: pointer;
        }
        p {
          line-height: 26px;
          span.p_num {
            padding-right: 10px;
          }
          span.p_pcs {
          }
        }
        &.price_td {
          padding: 10px 0;
        }
      }
      td:first-child {
        padding-left: 10px;
      }
    }
    tr.item:hover {
      background-color: #f2f6ff;
      cursor: pointer;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
      opacity: 1;
    }
  }
}
/deep/.el-pagination {
  margin-top: 40px;
  text-align: right;
}
</style>