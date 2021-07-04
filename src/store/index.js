import { createStore } from 'vuex'
const store = createStore({
  state: {
    username: 'admin',
    lang: localStorage.getItem('lang') || 'zh_CN',
    userInfo: localStorage.getItem('userInfo') || {},
    user: localStorage.getItem('user') || {}
  },
  mutations: {
    setLang(state, lang) {
      state.lang = lang
      localStorage.setItem('lang', lang)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      localStorage.setItem('userInfo', userInfo)
    },
    setUser(state, user) {
      state.user = user
      localStorage.setItem('user', user)
    }
  },
  actions: {
    setLang({ commit }) {
      commit('setLang')
    },
    setUserInfo({ commit }) {
      commit('setUserInfo')
    },
    setUser({ commit }, val) {
      commit('setUser', val)
    }
  }
})
export default store
