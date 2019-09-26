<template>
  <div class="left-nav">
    <div class="nav-list" v-for="(item,index) in leftNav" :key="index" :class="{open:index==navIndex}">
      <h3 @click.stop="goNav(index)">{{item.name}}</h3>
      <ul>
        <!-- :class="{current:$route.path.indexOf(i.path) >= 0}" -->
        <li v-for="(i, x) in item.child" :key="x" @click.stop="goChildNav(index,x)" :class="{current:$route.name == i.name}">
          {{i.text}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'leftNav',
  components: {},
  data () {
    return {
      navIndex: 0,
      childIndex: 0,
      leftNav: [
        {
          type: 'goods',
          name: '商品列表',
          child: [
            {
              name: 'goodsList',
              text: '商品列表',
              path: '/goods/list'
            }, {
              name: 'goodsAudit',
              text: '商品审核',
              path: '/goods/audit'
            }, {
              name: 'goodsParams',
              text: '商品参数管理',
              path: '/goods/params'
            }, {
              name: 'goodsImport',
              text: '批量导入',
              path: '/goods/import'
            }, {
              name: 'goodsTask',
              text: '商品任务操作',
              path: '/goods/task'
            }, {
              name: 'goodsLog',
              text: '商品日志',
              path: '/goods/log'
            }]
        }, {
          type: 'csystem',
          name: '系统',
          child: [
            {
              name: 'systemCache',
              text: '系统缓存',
              path: '/csystem/cache'
            }]
        }, {
          type: 'cbrand',
          name: '商品品牌',
          child: [
            {
              name: 'brandList',
              text: '商品品牌',
              path: '/cbrand/list'
            }, {
              name: 'brandListAdd',
              text: '添加新品牌',
              path: '/cbrand/list/add'
            }]
        }, {
          type: 'recycle',
          name: '商品回收站',
          child: [
            {
              name: 'recycleList',
              text: '商品回收站',
              path: '/recycle/list'
            }]
        }, {
          type: 'type',
          name: '商品分类',
          child: [
            {
              name: 'typeList',
              text: '商品分类',
              path: '/type/list'
            }]
        }, {
          type: 'images',
          name: '图书库管理',
          child: [
            {
              name: 'imagesList',
              text: '图书库管理',
              path: '/images/list'
            }, {
              name: 'imagesPhotoAdd',
              text: '新建相册',
              path: '/images/photo/add'
            }]
        }, {
          type: 'price',
          name: '价格管理',
          child: [
            {
              name: 'priceList',
              text: '价格管理',
              path: '/price/list'
            }, {
              name: 'priceListEdit',
              text: '价格编辑',
              path: '/price/list/edit'
            }, {
              name: 'priceTask',
              text: '商品价格任务',
              path: '/price/task'
            }, {
              name: 'priceTaskDetail',
              text: '价格任务详情',
              path: '/price/task/detail'
            }, {
              name: 'priceAudit',
              text: '价格审核',
              path: '/price/audit'
            }, {
              name: 'priceLog',
              text: '价格日志',
              path: '/price/log'
            }, {
              name: 'priceLogDetail',
              text: '价格日志详情',
              path: '/price/log/detail'
            }]
        }, {
          type: 'permission',
          name: '权限',
          child: [
            {
              name: 'permissionRole',
              text: '角色列表',
              path: '/permission/role'
            }, {
              name: 'permissionRoleEdit',
              text: '添加/编辑角色',
              path: '/permission/role/edit'
            }, {
              name: 'permissionUser',
              text: '用户管理',
              path: '/permission/user'
            }, {
              name: 'permissionUserEdit',
              text: '添加/编辑用户',
              path: '/permission/user/edit'
            }, {
              name: 'permissionLog',
              text: '操作日志',
              path: '/permission/log'
            }]
        }],
    }
  },
  created () {
    let type = this.$route.path
    type = type.substr(1)
    let num = type.indexOf('/')
    type = type.substring(0, num)
    this.leftNav.forEach((item, index) => {
      if (item.type == type) {
        this.navIndex = index
      }
    });
  },
  computed: {

  },
  methods: {
    ...mapMutations('lxr', [
      'PUBLIC_NAME'
    ]),
    goNav (idx) {
      let path = this.leftNav[idx].child[0].path
      this.navIndex = idx
      this.childIndex = 0
      this.$router.push({ path });
    },
    goChildNav (idx, cIdx) {
      let path = this.leftNav[idx].child[cIdx].path
      let text = this.leftNav[idx].child[cIdx].text
      this.PUBLIC_NAME(text)
      this.navIndex = idx
      this.childIndex = cIdx
      this.$router.push({ path });
    },
  },
  mounted () { },
}
</script>
<style lang="scss" scoped>
.left-nav {
  position: absolute;
  left: 0;
  top: 0;
  width: 210px;
  background: rgba(248, 248, 248, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  min-height: calc(100vh - 90px);
}
.nav-list {
  margin-bottom: 6px;
  height: 48px;
  overflow: hidden;
  &.open {
    height: auto;
    ul {
      height: auto;
      visibility: visible;
      opacity: 1;
    }
    h3 {
      &:after {
        transform: rotate(-180deg);
      }
    }
  }
  h3 {
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    padding-left: 79px;
    background: #fff url("~@/assets/images/icon/default.svg") no-repeat left
      31px center;
    background-size: 14px 14px;
    position: relative;
    cursor: pointer;
    &:after {
      content: "";
      position: absolute;
      top: 21px;
      right: 18px;
      font-size: 0;
      height: 0;
      width: 0;
      border-width: 6px 5px 0;
      border-style: solid dashed;
      border-color: #3985fe transparent transparent;
      overflow: hidden;
      -webkit-transition: all 0.4s ease 0s;
      transition: all 0.4s ease 0s;
    }
  }
  ul {
    padding: 0 10px;
    visibility: hidden;
    opacity: 0;
    transition: all, ease, 0.2s;
    height: 0;
  }
  li {
    line-height: 40px;
    text-align: center;
    font-size: 12px;
    border-radius: 4px;
    margin-top: 10px;
    color: #999999;
    cursor: pointer;
    &:hover {
      color: #3985fe;
    }
    &.current {
      background-color: #3985fe;
      color: #fff;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>