import Vue from 'vue'
import Vuex from 'vuex'
import app from '../main'
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    permission: 'admin',
    fullname: 'admin 1',
    historyOpen: [
      {
        'grade': 2,
        'semester': 0,
        'week': 1,
        'day': 1,
        'lesson': 0,
        'task': 0
      }
    ],
    userInformation: {},
    listGradeItems: [],
    lang: ''
  },
  mutations: {
    updatePermission: function (state, permission) { state.permission = permission },
    updateName: function (state, fullname) { state.fullname = fullname },
    updateHistoryOpen: function (state, historyOpen) { state.historyOpen = historyOpen },
    updateUserInformation: function (state, userInformation) { state.userInformation = userInformation },
    listGradeItems: function (state, listGradeItems) { state.listGradeItems = listGradeItems },
    SET_LANG (state, payload) {
      app.$i18n.locale = payload
      state.lang = payload
    }
  },
  actions: {
    setLang ({commit}, payload) {
      commit('SET_LANG', payload)
    }
  }
})
