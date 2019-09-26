//兼容到IE9或到10
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import IboxPlugin from '@/plugins/ibox'
import VueAwesomeSwiper from 'vue-awesome-swiper'
/* let webim = require("../public/js/webim") */

//ElementUI库
import {
    MessageBox,
    Message,
    DatePicker,
    Pagination,
    Loading,
    Select,
    Option,
    Dialog,
    Button,
    Switch,
    Radio,
    Form,
    Upload,
    Table,
    tableColumn,
    Checkbox
} from 'element-ui'
//过渡动画模块
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
//swiper轮播图库
import 'swiper/dist/css/swiper.css'

Vue.use(IboxPlugin)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Loading.directive)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Radio)
Vue.use(Form)
Vue.use(Upload)
Vue.use(Table)
Vue.use(tableColumn)
Vue.use(Checkbox)
Vue.use(VueAwesomeSwiper)

/* element 组件按需加载 */
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
/* Vue.prototype.$webim = webim */
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')