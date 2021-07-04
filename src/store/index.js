import { createStore } from 'vuex'
const store = createStore({
  state: {
    lang: localStorage.getItem('lang') || 'zh_CN',
    userInfo:
      (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'))) || {},
    user: (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'))) || {}
  },
  mutations: {
    setLang(state, lang) {
      state.lang = lang
      localStorage.setItem('lang', lang)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo) || '')
    },
    setUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user) || '')
    }
  },
  actions: {
    setLang({ commit }, val) {
      commit('setLang', val)
    },
    setUserInfo({ commit }, val) {
      commit('setUserInfo', val)
    },
    setUser({ commit }, val) {
      commit('setUser', val)
    }
  }
})
export default store
