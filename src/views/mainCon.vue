<template>
  <div>
    <!-- 头部组件 -->
    <keepAlive>
      <Header></Header>
    </keepAlive>

    <div class="container">
      <div class="container-wrap">
        <!-- 左侧导航 -->
        <leftNav></leftNav>
        <!-- 主体路由 -->
        <div class="container-right">
          <router-view />
        </div>

      </div>
    </div>
    <!-- 底部组件 -->
    <!-- <keepAlive>
      <Footer></Footer>
    </keepAlive> -->

    <!-- 右侧边栏浮动 -->
    <!-- <keepAlive>
      <rightBar></rightBar>
    </keepAlive> -->
  </div>
</template>
<script>
import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex'
import Header from '@/components/public/header.vue'
import leftNav from '@/components/public/leftNav.vue'
// import Footer from '@/components/public/footer.vue'
// import rightBar from '@/components/public/rightBar.vue'
export default {
  name: 'app',
  components: {
    Header,
    leftNav,
    // Footer,
    // rightBar,
  },
  data () {
    return {}
  },

  created () {
    //this.RefreshTokens()
  },
  computed: {
    // ...mapState('demo', ['vuexres', 'count'])
  },
  methods: {
    ...mapActions('lyf', ['refreshToken']),
    // async RefreshTokens () {
    //   let _self = this;
    //   let res = await _self.refreshToken({
    //     token: localStorage.getItem('token')
    //   })
    //   if (res.code == 0) {
    //     localStorage.setItem("token", res.data.token)
    //     localStorage.setItem("expire", res.data.expire)
    //   } else {
    //     localStorage.removeItem("token")
    //     localStorage.removeItem("expire")
    //     _self.$router.push('/login')
    //   }
    // }
  },
  mounted () {

  },
}
</script>
<style lang="scss">
// @import "~@/assets/css/public.scss";
</style>