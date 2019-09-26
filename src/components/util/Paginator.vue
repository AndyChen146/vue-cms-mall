<template>
  <div class="paging_box">
    <ul class="pagination">
      <li class="active">
        <a title="">1</a>
      </li>
      <li>
        <a title="">2</a>
      </li>
      <li>
        <a title="">3</a>
      </li>
      <li>
        <a title="">...</a>
      </li>
      <li>
        <a title="">9</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Paginator',
  components: {},
  data () {
    return {}
  },
  created () { },
  computed: {},
  methods: {},
  mounted () { },
}
</script>

<style lang="scss" scoped>
.paging_box {
  margin-top: 40px;
  text-align: right;
  margin-right: 20px;
  .pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
    li {
      display: inline;
      a {
        position: relative;
        margin-left: 10px;
        float: left;
        padding: 6px 12px;
        color: #606266;
        text-decoration: none;
        background-color: #f0f2f5;
        border: 1px solid #f0f2f5;
        cursor: pointer;
        border-radius: 2px;
      }
    }
    li.active {
      a {
        background-color: #3985fe;
        color: #ffffff;
        cursor: default;
      }
    }
  }
}
</style>

