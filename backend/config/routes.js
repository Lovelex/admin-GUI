module.exports = app => {
  app.route('/user')
    .post(app.api.user.save)
}