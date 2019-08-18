const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
  const save = (req, res) => {
    res.send('user save')
  }

  return { save }
}