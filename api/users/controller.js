const mongoose = require('mongoose')
const passport = require('passport')

const User = mongoose.model('User')

const userControls = {
  adjustQuery: (req, res, next) => {
    const { query = {} } = req

    if (typeof query._id !== 'undefined') {
      res.locals.query = { _id: query._id }
    }
    if (typeof query.email !== 'undefined') {
      res.locals.query = { email: query.email }
    }
    next()
  },

  createUser: (req, res, next) => {
    const { body: { name, email, password } } = req
    if (password) {
      const user = new User({ name, email })
      user.setPassword(password)
      user.save()
      .then(() => {
        res.locals.data = { user: user.toAuthJSON() }
        next()
      })
      .catch(error => {
        res.locals = { status: 500, data: error }
        next()
      })
    } else {
      next()
    }
  },

  loginUser: (req, res, next) => {
    return passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) return next(err)
      if (user){
        user.token = user.generateJWT()
        return res.json({ user: user.toAuthJSON() })
      }
      return res.status(422).json(info)
    })(req, res, next)
  },

  findUserByQuery: (req, res, next) => {
    const { query } = res.locals
    query ?
      User.findOne(query)
      .then(user => {
        res.locals.data = { user: user.toPublicJSON() }
        next()
      })
      .catch(error => {
        res.locals = { status: 500, data: error }
        next()
      })
    : next()
  },

  findFullUserByID: (req, res, next) => {
    const { params } = req
    User.findOne(params)
      .then(user => {
        res.locals.data = { user }
        next()
      })
      .catch(error => {
        res.locals = { status: 500, data: error }
        next()
      })
  }
}

module.exports = userControls
