import vue from 'vue'
import vueMq from 'vue-mq'

vue.use(vueMq, {
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 960,
    lg: 1140,
    xl: Infinity
  }
})