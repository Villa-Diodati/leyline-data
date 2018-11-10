const mongoose = require('mongoose')

const User = mongoose.model('User')

const userControls = {
  adjustQuery: (req, res, next) => {
    const { query = {} } = req
    res.locals.query = query

    if (typeof query.uid !== 'undefined') {
      res.locals.uid = query.uid
      delete res.locals.query.uid
    }
    
    next()
  },
  findUserById: (req, res, next) => {
    const { uid } = res.locals
    User.findOne({ _id: uid })
      .then(users => {
        console.log('\nFound users:', users)
        res.locals.data = { users }
        next()
      })
      .catch(err => {
        console.error('\nError finding user...', err)
        next()
      })
  }
}

module.exports = userControls
