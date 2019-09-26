// API
var date = new Date()
var timer = date.getTime().toString()

const API = {
    // 第三方接口（Lee）
    //'Amap.staticmap': '/v3/staticmap', // 获取高德地图静态图
    // 公共服务（Lee）
    //'Api.position': '/mock/position.json?t=' + timer, // 获取职位
    // 正式接口（Lee）
    //'send-captcha': '/uaa/api/send-captcha', // 获取验证码

    //tobey
    'getProductDetail': '/product/index/editView', //获取商品详情
    'product-editSave': '/product/index/editSave', //商品编辑保存
    'product-params': '/product/attr/getList', //商品参数管理列表
    'product-params-edit': '/product/attr/editView', //商品参数编辑
    'system-cache': '/system/Attr/index', //系统缓存
    //'product-addModel': '/product/attr/addModel', //参数添加选型
    'product-editSave': '/product/attr/editSave', //保存选型选型
    'category-getlist': '/category/index/getlist', //分类列表
    'category-del': '/category/index/del', //分类列表删除
    'category-add': '/category/index/add', //分类列表添加
    'category-edit': '/category/index/edit', //分类列表编辑
    'album-list': '/album/index/getlist', //图库列表
    'album-add': '/album/index/add', //图库添加
    'album-edit': '/album/index/edit', //图库编辑
    'album-del': '/album/index/del', //图库删除
    'album-details': '/album/index/details', //图库详情
    'album-picture-list': '/album/picture/getlist', //图库列表
    'album-picture-add': '/album/picture/add', //图片上传
    'album-picture-del': '/album/picture/del', //图片上传
    'album-picture-edit': '/album/picture/edit', //转移相册

    // allen
    'loginIn': '/api/v1/users/apassport/login', //登录
    'refreshToken': '/api/v1/users/apassport/refreshToken', //验证token
    'getOrder': '/api/v1/unity/seq/getOrder', // 测试
    'getLanguage': '/set/Index/language', //获取多语言
    'getProductList': '/product/Index/getList', // 获取商品列表
    'getProductCounts': '/product/Index/getCounts', //获取商品选项卡数量统计
    'getCategoryList': '/category/index/getlist', //获取分类列表
    'getBrandList': '/brand/index/getlist', //获取品牌列表
    'getBrandDetail': '/brand/index/details', //获取具体的品牌信息
    'setBrandState': '/brand/index/isshow', //设置 品牌显示状态
    'addBrandInfo': '/brand/index/add', //增加品牌信息
    'editBrandInfo': '/brand/index/edit', //编辑品牌信息
    'deleteBrandId': '/brand/index/del', //删除品牌
    'getProductAuditDetail': '/product/audit/auditList', //商品审核管理详情查看
    'deleteProductId': '/product/Index/del', //删除商品列表
    'productAudioSava': '/product/audit/save', //商品审核
    'productReduction': '/product/Audit/reduction', //商品还原
    'getAccessList': '/access/log/getlist', //操作日志列表
    'getAccessDetail': '/access/log/details', //操作日志详情中列表


}

export default API