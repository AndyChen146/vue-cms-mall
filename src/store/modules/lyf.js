import Vue from 'vue'

const initState = {
    /* enterpriseSerialNumber:'', */
}

const state = {

}

const mutations = {
    MY_RECRUITER_INFO(state, payload) {
        state.myRecruiterInfo = payload
        state.enterpriseSerialNumber = payload.enterpriseSerialNumber
    }
}

const actions = {
    //登录
    loginIn({
        commit
    }, params = {}) {
        return Vue.iBox.http('loginIn', params)({
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res
        })
    },
    //验证token
    refreshToken({
        commit
    }, params = {}) {
        return Vue.iBox.http('refreshToken', params)({
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res
        })
    },
    getOrder({
        commit
    }, params = {}) {
        return Vue.iBox.http('getOrder', params)({
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res
        })
    },

    // 获取商品列表
    getProductList({
        commit
    }, params = {}) {
        return Vue.iBox.http('getProductList', params)({
            method: 'post'
        }).then(res => {
            return res
        })
    },
    //获取商品选项卡数量统计
    getProductCounts({
        commit
    }, params = {}) {
        return Vue.iBox.http('getProductCounts', params)({
            method: 'post'
        }).then(res => {

            return res
        })
    },
    //获取分类列表
    getCategoryList({
        commit
    }, params = {}) {
        return Vue.iBox.http('getCategoryList', params)({
            method: 'post'
        }).then(res => {

            return res
        })
    },
    //获取品牌列表
    getBrandList({
        commit
    }, params = {}) {
        return Vue.iBox.http('getBrandList', params)({
            method: 'post'
        }).then(res => {
            return res
        })
    },
    //设置 品牌显示状态
    setBrandState({
        commit
    }, params = {}) {
        return Vue.iBox.http('setBrandState', params)({
            method: 'post'
        }).then(res => {
            return res
        })
    },
    //增加品牌信息
    addBrandInfo({
        commit
    }, params = {}) {
        return Vue.iBox.http('addBrandInfo', params)({
            method: 'post'
        }).then(res => {
            return res
        })
    },
    //编辑品牌信息
    editBrandInfo({
        commit
    }, params = {}) {
        return Vue.iBox.http('editBrandInfo', params)({
            method: 'post'
        }).then(res => {
            return res
        })
    },
    getBrandDetail({
        commit
    }, params = {}) {
        return Vue.iBox.http('getBrandDetail', params)({
            method: 'post'
        }).then(res => {
            return res
        })
    },
    //删除品牌
    deleteBrandId({
        commit
    }, params = {}) {
        return Vue.iBox.http('deleteBrandId', params)({
            method: 'post'
        }).then(res => {
            return res
        })
    },
    //商品审核管理详情查看
    getProductAuditDetail({
        commit
    }, params = {}) {
        return Vue.iBox.http('getProductAuditDetail', params)({
            method: 'post'
        }).then(res => {
            return res
        })
    },
    //删除商品列表
    deleteProductId({
        commit
    }, params = {}) {
        return Vue.iBox.http('deleteProductId', params)({
            method: 'post'
        }).then(res => {
            return res
        })
    },
    //商品审核
    productAudioSava({
        commit
    }, params = {}) {
        return Vue.iBox.http('productAudioSava', params)({
            method: 'post'
        }).then(res => {
            return res
        })
    },
    //商品还原
    productReduction({
        commit
    }, params = {}) {
        return Vue.iBox.http('productReduction', params)({
            method: 'post'
        }).then(res => {

            return res
        })
    },
    //操作日志列表
    getAccessList({
        commit
    }, params = {}) {
        return Vue.iBox.http('getAccessList', params)({
            method: 'post'
        }).then(res => {
            return res
        })
    },
    //操作日志详情中列表
    getAccessDetail({
        commit
    }, params = {}) {
        return Vue.iBox.http('getAccessDetail', params)({
            method: 'post'
        }).then(res => {
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