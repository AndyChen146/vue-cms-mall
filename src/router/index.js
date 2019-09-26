import Vue from 'vue'
import Router from 'vue-router'
import mainCon from '@/views/mainCon.vue'
import goodsList from '@/views/goodsManage/list.vue'
import goodsListEdit from '@/views/goodsManage/edit.vue'
import goodsAudit from '@/views/goodsManage/audit.vue'
import goodsParams from '@/views/goodsManage/params.vue'
import goodsImport from '@/views/goodsManage/import.vue'
import goodsTask from '@/views/goodsManage/task.vue'
import goodsTaskDetail from '@/views/goodsManage/taskDetail.vue'
import goodsLog from '@/views/goodsManage/log.vue'
import systemCache from '@/views/systemManage/cache.vue'
import brandList from '@/views/brandManage/list.vue'
import brandListAdd from '@/views/brandManage/add.vue'
import recycleList from '@/views/goodsRecycle/list.vue'
import typeList from '@/views/goodsType/list.vue'
import imagesList from '@/views/imageManage/list.vue'
import imagesPhoto from '@/views/imageManage/photo.vue'
import imagesPhotoAdd from '@/views/imageManage/addPhoto.vue'
import priceList from '@/views/priceManage/list.vue'
import priceListEdit from '@/views/priceManage/edit.vue'
import priceTask from '@/views/priceManage/task.vue'
import priceTaskDetail from '@/views/priceManage/taskDetail.vue'
import priceAudit from '@/views/priceManage/audit.vue'
import priceLog from '@/views/priceManage/log.vue'
import priceLogDetail from '@/views/priceManage/logDetail.vue'
import permissionRole from '@/views/permissionManage/role.vue'
import permissionRoleEdit from '@/views/permissionManage/roleEdit.vue'
import permissionUser from '@/views/permissionManage/user.vue'
import permissionUserEdit from '@/views/permissionManage/userEdit.vue'
import permissionLog from '@/views/permissionManage/log.vue'
import permissionLogDetail from '@/views/permissionManage/logDetail.vue'
import login from '@/views/login/login.vue'


const router = new Router({
    // hash
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '*',
            redirect: '/goods/list'
        },
        {
            name: 'mainCon',
            component: mainCon,
            path: '/',
            redirect: '/goods/list',
            children: [{
                path: '/goods/list',
                name: 'goodsList',
                component: goodsList
            }, {
                path: '/goods/list/edit',
                name: 'goodsListEdit',
                component: goodsListEdit
            }, {
                path: '/goods/audit',
                name: 'goodsAudit',
                component: goodsAudit
            }, {
                path: '/goods/params',
                name: 'goodsParams',
                component: goodsParams
            }, {
                path: '/goods/import',
                name: 'goodsImport',
                component: goodsImport
            }, {
                path: '/goods/task',
                name: 'goodsTask',
                component: goodsTask
            }, {
                path: '/goods/task/detail',
                name: 'goodsTaskDetail',
                component: goodsTaskDetail
            }, {
                path: '/goods/log',
                name: 'goodsLog',
                component: goodsLog
            }, {
                path: '/goods/log',
                name: 'goodsLog',
                component: goodsLog
            }, {
                path: '/csystem/cache',
                name: 'systemCache',
                component: systemCache
            }, {
                path: '/cbrand/list',
                name: 'brandList',
                component: brandList
            }, {
                path: '/cbrand/list/add',
                name: 'brandListAdd',
                component: brandListAdd
            }, {
                path: '/recycle/list',
                name: 'recycleList',
                component: recycleList
            }, {
                path: '/type/list',
                name: 'typeList',
                component: typeList
            }, {
                path: '/images/list',
                name: 'imagesList',
                component: imagesList
            }, {
                path: '/images/photo',
                name: 'imagesPhoto',
                component: imagesPhoto
            }, {
                path: '/images/photo/add',
                name: 'imagesPhotoAdd',
                component: imagesPhotoAdd
            }, {
                path: '/price/list',
                name: 'priceList',
                component: priceList
            }, {
                path: '/price/list/edit',
                name: 'priceListEdit',
                component: priceListEdit
            }, {
                path: '/price/task',
                name: 'priceTask',
                component: priceTask
            }, {
                path: '/price/task/detail',
                name: 'priceTaskDetail',
                component: priceTaskDetail
            }, {
                path: '/price/audit',
                name: 'priceAudit',
                component: priceAudit
            }, {
                path: '/price/log',
                name: 'priceLog',
                component: priceLog
            }, , {
                path: '/price/log/detail',
                name: 'priceLogDetail',
                component: priceLogDetail
            }, {
                path: '/permission/role',
                name: 'permissionRole',
                component: permissionRole
            }, {
                path: '/permission/role/edit',
                name: 'permissionRoleEdit',
                component: permissionRoleEdit
            }, {
                path: '/permission/user',
                name: 'permissionUser',
                component: permissionUser
            }, {
                path: '/permission/user/edit',
                name: 'permissionUserEdit',
                component: permissionUserEdit
            }, {
                path: '/permission/log',
                name: 'permissionLog',
                component: permissionLog
            }, {
                path: '/permission/log/detail',
                name: 'permissionLogDetail',
                component: permissionLogDetail
            }]
        },
        {
            path: '/login',
            name: 'login',
            component: login
        }
    ],

    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

router.beforeEach((to, from, next) => {
    const TOKEN = window.sessionStorage.getItem('token')
    if (!TOKEN && to.fullPath != '/login') {
        next({
            path: '/login'
        });
    } else {
        next()
    }
})


/* router.beforeEach((to, from, next) => {
  const TOKEN = window.localStorage.getItem('token')
  const RECRUIT = window.localStorage.getItem('RECRUIT')
  if (to.matched.some(m => m.meta.auth)) {
    // console.log('需要验证')
    // 判断所有需要登录的页面
    if (TOKEN) {
      // 如果已经存在tonken
      // console.log('已登录')
      if (to.fullPath.indexOf('home/') != -1) {
        // 如果是求职者访问的是企业端，强制退回首页
        // console.log(RECRUIT == 'JOBSEEKER')
        if (RECRUIT == 'JOBSEEKER') {
          next({
            path: '/index'
          });
        } else {
          next();
        }
      } else if (to.fullPath.indexOf('home/') == -1) {
        // 如果是招聘者者访问的是用户端，强制退回企业端主页
        if (RECRUIT == 'RECRUITER') {
          next({
            path: '/home'
          });
        } else {
          next();
        }
      }
    } else {
      // 如果没有tonken信息，跳转登录页面
      // console.log('未登录')
      next({
        path: '/login'
      });
    }
  } else {
    // console.log('不需要验证')
    // 判断所有不需要验证的页面
    if (to.fullPath.indexOf('/login') == 0) {
      if (RECRUIT == 'JOBSEEKER') {
        // 如果求职者已登录并且访问登陆页面，跳转首页
        next({
          path: '/index'
        });
      } else if (RECRUIT == 'RECRUITER') {
        // 如果招聘者已登录并且访问登陆页面，跳转企业主页
        next({
          path: '/home'
        });
      } else {
        next();
      }
    } else {
      if (to.meta.mode == 'lyf' && RECRUIT == 'RECRUITER') {
        //招聘者如果访问用户端需要验证的页面，跳转企业主页
        next({
          path: '/home'
        });
      } else if (to.meta.mode == 'lxr' && RECRUIT == 'JOBSEEKER') {
        //求职者者如果访问企业端需要验证的页面，跳转首页
        next({
          path: '/index'
        });
      } else {
        next();
      }
    }
  }
}) */

/* 动态注册路由文件 */
const routerContext = require.context('@/router/modules', true, /\.js$/)
routerContext.keys().forEach(modules => {
    router.addRoutes(routerContext(modules).default)
})

Vue.use(Router)

export default router