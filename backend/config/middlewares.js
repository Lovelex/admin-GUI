const { json, urlencoded } = require('body-parser')
const cors = require('cors')

module.exports = app => {
  app.use(json({ limit: '10mb', extended: true }))
  app.use(urlencoded({ limit: '10mb', extended: true }))
  app.use(cors())
  
}