import Vue from 'vue'

const initState = {
  /* enterpriseSerialNumber:'', */
}

const state = {
  public_name: '',
  albumList_state: '', //图库列表
}

const mutations = {
  PUBLIC_NAME(state, data) {
    state.public_name = data
  },

  MY_RECRUITER_INFO(state, payload) {
    state.myRecruiterInfo = payload
    state.enterpriseSerialNumber = payload.enterpriseSerialNumber
  },

  ALBUM_LIST(state, payload) {
    state.albumList_state = payload.data.list
  }

}

const actions = {
  // 读取企业我的资料-基本信息
  /* my_recruiter_info({ commit }, params = {}) {
    return Vue.iBox
      .http('my-recruiter-info', params)({
        method: 'post'
      })
      .then(res => {
        //commit('MY_RECRUITER_INFO', res.data)
        return res
      })
  } */
  //获取商品详情
  get_product_detail({
    commit
  }, params = {}) {
    return Vue.iBox
      .http('getProductDetail', params)({
        method: 'post'
      })
      .then(res => {
        return res
      })
  },

  //商品编辑保存
  productEditSave({
    commit
  }, params = {}) {
    return Vue.iBox
      .http('product-editSave', params)({
        method: 'post'
      })
      .then(res => {
        return res
      })
  },

  //商品参数管理列表
  productParams({
    commit
  }, params = {}) {
    return Vue.iBox
      .http('product-params', params)({
        method: 'post'
      })
      .then(res => {
        return res
      })
  },

  //商品参数编辑
  productParamsEdit({
    commit
  }, params = {}) {
    return Vue.iBox
      .http('product-params-edit', params)({
        method: 'post'
      })
      .then(res => {
        return res
      })
  },

  //系统缓存
  systemCache({
    commit
  }, params = {}) {
    return Vue.iBox
      .http('system-cache', params)({
        method: 'post'
      })
      .then(res => {
        return res
      })
  },

  // 参数添加选型
  product_addModel({
    commit
  }, params = {}) {
    return Vue.iBox.http('/product/attr/addModel' + params)({
      method: 'get'
    }).then(res => {
      return res
    })
  },

  // 参数参数
  product_editSave({
    commit
  }, params = {}) {
    return Vue.iBox.http('product-editSave', params)({
      method: 'post'
    }).then(res => {
      return res
    })
  },

  // 商品分类列表
  category_getlist({
    commit
  }, params = {}) {
    return Vue.iBox.http('category-getlist', params)({
      method: 'post'
    }).then(res => {
      return res
    })
  },

  // 商品分类列表-删除
  category_del({
    commit
  }, params = {}) {
    return Vue.iBox.http('category-del', params)({
      method: 'post'
    }).then(res => {
      return res
    })
  },
  // 商品分类列表-添加
  category_add({
    commit
  }, params = {}) {
    return Vue.iBox.http('category-add', params)({
      method: 'post'
    }).then(res => {
      return res
    })
  },
  // 商品分类列表-编辑
  category_edit({
    commit
  }, params = {}) {
    return Vue.iBox.http('category-edit', params)({
      method: 'post'
    }).then(res => {
      return res
    })
  },

  // 图库列表
  album_list({
    commit
  }, params = {}) {
    return Vue.iBox.http('album-list', params)({
      method: 'post'
    }).then(res => {
      commit('ALBUM_LIST', res)
      return res
    })
  },

  // 图库添加
  album_add({
    commit
  }, params = {}) {
    return Vue.iBox.http('album-add', params)({
      method: 'post'
    }).then(res => {
      return res
    })
  },

  // 图库编辑
  album_edit({
    commit
  }, params = {}) {
    return Vue.iBox.http('album-edit', params)({
      method: 'post'
    }).then(res => {
      return res
    })
  },

  // 图库删除
  album_del({
    commit
  }, params = {}) {
    return Vue.iBox.http('album-del', params)({
      method: 'post'
    }).then(res => {
      return res
    })
  },

  // 图库详情
  album_details({
    commit
  }, params = {}) {
    return Vue.iBox.http('album-details', params)({
      method: 'post'
    }).then(res => {
      return res
    })
  },


  // 图片列表
  album_picture_list({
    commit
  }, params = {}) {
    return Vue.iBox.http('album-picture-list', params)({
      method: 'post'
    }).then(res => {
      return res
    })
  },

  // 图片上传
  album_picture_add({
    commit
  }, params = {}) {
    return Vue.iBox.http('album-picture-add', params)({
      method: 'post'
    }).then(res => {
      return res
    })
  },

  // 图片删除
  album_picture_del({
    commit
  }, params = {}) {
    return Vue.iBox.http('album-picture-del', params)({
      method: 'post'
    }).then(res => {
      return res
    })
  },

  // 转移相册
  album_picture_edit({
    commit
  }, params = {}) {
    return Vue.iBox.http('album-picture-edit', params)({
      method: 'post'
    }).then(res => {
      return res
    })
  },


  //获取语言
  getLanguage({
    commit
  }, params = {}) {
    return Vue.iBox
      .http('getLanguage', params)({
        method: 'post'
      })
      .then(res => {
        //commit('MY_RECRUITER_INFO', res.data)
        return res
      })
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}