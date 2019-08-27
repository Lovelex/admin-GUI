import vue from 'vue'
export const baseApiUrl = 'http://127.0.0.1:3000'

export function showError(e) {
  if(e && e.response && e.response.data) {
    vue.toasted.global.defaultError({ msg: e.response.data })
  } else if (typeof e === 'string') {
    vue.toasted.global.defaultError({ msg: e })
  } else {
    vue.toasted.global.defaultError()
  }
}