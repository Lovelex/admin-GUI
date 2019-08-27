import vue from 'vue'
import toasted from 'vue-toasted'

vue.use(toasted, {
  iconPack: 'fontawesome',
  duration: 3000
})

vue.toasted.register(
  'defaultSuccess',
  payload => !payload.msg ? 'Operação realizada com sucesso!' : payload.msg,
  { type: 'success', icon: 'check' }  
)

vue.toasted.register(
  'defaultError',
  payload => !payload.msg ? 'Ooops... Erro inesperado.' : payload.msg,
  { type: 'error', icon: 'times' }
)