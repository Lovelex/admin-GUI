import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'

vue.use(vuex)

export default new vuex.Store({
  state: {
    isMenuVisible: false,
    user: null
  },
  mutations: {
    toggleMenu(state, isVisible) {
      if(!state.user) {
        state.isMenuVisible = false
        return
      }

      if(isVisible === undefined) {
        state.isMenuVisible = !state.isMenuVisible
      } else {
        state.isMenuVisible = isVisible
      }
    },
    setUser(state, user) {
      state.user = user
      if(user) {
        axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
        state.isMenuVisible = true
      } else {
        delete axios.defaults.headers.common['Authorization']
        state.isMenuVisible = false
      }
    }
  },
  getters: {

  },
  actions: {

  }
})