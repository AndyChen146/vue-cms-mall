import Vue from 'vue'
const state = {
  count: 0,
  vuexres: null
}

const mutations = {
  INCREMENT: (state) => {
    const obj = state
    obj.count += 1
  },
  DECREMENT: (state) => {
    const obj = state
    obj.count -= 1
  },
  GETPROVINCE: (state, payload) => {
    state.vuexres = payload
  }
}

const actions = {
  increment({
    commit
  }) {
    commit('INCREMENT')
  },
  decrement({
    commit
  }) {
    commit('DECREMENT')
  },
  getProvince({
    commit
  }, params = {}) {
    return Vue.iBox.http('Api.xiaoqu', params)({
      method: 'get'
    }).then(res => {
      console.log(res)
      commit('GETPROVINCE', res)
      return res
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}