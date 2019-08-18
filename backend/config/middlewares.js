const { json } = require('body-parser')
const cors = require('cors')

module.exports = app => {
  app.use(json())
  app.use(cors())
  
}