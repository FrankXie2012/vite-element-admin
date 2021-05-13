let mutations = {
  setLang(state, lang) {
    state.lang = lang
    localStorage.setItem('lang', lang)
  }
}
export default mutations
