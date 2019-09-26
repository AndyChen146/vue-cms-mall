<template>
  <div class="con_right">
    <h2 class="wrap-title">筛选查询</h2>
    <div class="con_box">
      <h3>提示区</h3>
      <div class="cache_wait">缓存中请耐心等待</div>
      <div class="cache_box">
        <ul class="cache_ul" v-if="cacheList.length>0">
          <li v-for="(item, index) in cacheList" :key="index">
            <span>{{item.cate_name}}</span>
            <span>{{item.msg}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template><script>
// @ is an alias to /src
import { mapState, mapActions, mapMutations } from 'vuex'
import { clearInterval } from 'timers';
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      params: {
        dosubmit: 1,
        page: 0
      },
      cacheList: [],
      Interval: '',
    }
  },
  created () {
    this.systeCacheFun()
  },
  mounted () {

  },
  computed: {
  },
  methods: {
    ...mapActions('lxr', ['systemCache']),
    //系统缓存
    systeCacheFun () {
      let _this = this
      _this.Interval = setInterval(() => {
        _this.systemCache(_this.params).then(res => {
          if (res.state == "success") {
            _this.cacheList.push(res.data)
            if (res.data.page != '') {
              _this.params.page = res.data.page
              $(".cache_box").animate({ scrollTop: 20000 }, 0);
            } else {
              window.clearInterval(this.Interval)
            }
          } else {
            _this.$message.success(res.msg);
          }
        })
      }, 2000);

    },
  },
  beforeRouteLeave (to, from, next) {
    window.clearInterval(this.Interval)
    next()
  }
}
</script>
<style lang="scss" scoped>
.con_box {
  padding: 10px 20px;
  h3 {
    height: 40px;
    line-height: 40px;
    width: 100%;
    border-bottom: 1px solid #dddddd;
    color: #3985fe;
    font-size: 13px;
    font-weight: bold;
  }
  .cache_wait {
    line-height: 46px;
    font-size: 12px;
    color: #666666;
  }
  .cache_box {
    overflow: auto;
    height: 520px;
    // height: 120px;
    border: 1px solid #dddddd;
    padding: 20px;
    overflow: auto;
    .cache_ul {
      li {
        clear: both;
        font-size: 12px;
        color: #333333;
        span {
          width: 300px;
          display: block;
          float: left;
          height: 25px;
          font-size: 12px;
          color: #333333;
        }
      }
    }
  }
}
</style>