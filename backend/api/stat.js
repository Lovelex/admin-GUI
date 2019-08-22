module.exports = app => {
  const Stat = app.mongoose.model('Stat', {
    user: Number,
    categories: Number,
    articles: Number,
    createdAt: Date
  })

  const get = (req, res) => {
    Stat.findOne({}, {}, { sort: { 'createdAt' : -1 } })
      .then(stat => {
        const defaultStats = {
          user: 0,
          categories: 0,
          articles: 0,
        }
        res.json(stat || defaultStats)
      })
  }

  return { Stat, get }
}