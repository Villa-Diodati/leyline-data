const mongoose = require('mongoose')
const passport = require('passport')

const handleErr = require('../handleErr')

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
        .catch(error => (
          handleErr({ msg: error, res, next })
        ))
    } else {
      handleErr({ msg: 'no password provided', res, next })
    }
  },

  updateUser: async (req, res, next) => {
    const { body, body: { email, newEmail }, params: { _id } } = req
    const user = await User.findOne({ email, _id })
    if (user) {
      user.set({...body, email: newEmail || email })
      user.save()
        .then(savedUser => {
          res.locals.data = { user: savedUser.toJSON() }
          next()
        })
        .catch(error => (
          handleErr({ msg: error, res, next })
        ))
    } else {
      handleErr({ msg: 'no such email / _id pair exists', res, next })
    }
  },

  deleteUser: (req, res, next) => {
    const { body: { email }, params: _id } = req
    User.deleteOne({ email, _id })
      .then(({ n: result }) => {
        res.locals.data = { user: result ? 'deleted' : 'not found' }
        next()
      })
      .catch(error => (
        handleErr({ msg: error, res, next })
      ))
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
    if (query) {
      User.findOne(query)
        .then(user => {
          res.locals.data = { user: user.toPublicJSON() }
          next()
        })
        .catch(error => (
          handleErr({ msg: error, res, next })
        ))
    } else {
      handleErr({ msg: 'no apparent query', res, next })
    }
  },

  findFullUserByID: (req, res, next) => {
    const { params } = req
    User.findOne(params)
      .then(user => {
        res.locals.data = { user }
        next()
      })
      .catch(error => (
        handleErr({ msg: error, res, next })
      ))
  }
}

module.exports = userControls
