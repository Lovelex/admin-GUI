import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

export default new vuex.Store({
  state: {
    isMenuVisible: true,
    user: {
      name: 'Usuario Mock',
      email: 'mock@email.com'
    }
  },
  mutations: {
    toggleMenu(state, isVisible) {
      if(isVisible === undefined) {
        state.isMenuVisible = !state.isMenuVisible
      } else {
        state.isMenuVisible = isVisible
      }
      console.log(isVisible)
      console.log(`toggleMenu = ${state.isMenuVisible}`)
    }
  },
  getters: {

  },
  actions: {

  }
})