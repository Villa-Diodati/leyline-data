const router = require('express').Router()
const passport = require('passport')

const {
  adjustQuery,
  createUser,
  loginUser,
  findUserByQuery,
  findFullUserByID,
} = require('./controller')
const auth = require('../auth')
const send = require('../send')

router.route('/create')
  .post(
    createUser,
    send,
  )

router.route('/login')
  .post(
    loginUser,
    send,
  )

router.route('/find')
  .get(
    adjustQuery,
    findUserByQuery,
    send,
  )

router.route('/find/:_id')
  .get(
    auth.required,
    findFullUserByID,
    send,
  )

module.exports = router
