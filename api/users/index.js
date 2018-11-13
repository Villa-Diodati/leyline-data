const router = require('express').Router()

const {
  adjustQuery,
  createUser,
  updateUser,
  deleteUser,
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

router.route('/:_id')
  .all(auth.required)
  .get(
    findFullUserByID,
    send,
  )
  .put(
    updateUser,
    send,
  )
  .delete(
    deleteUser,
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

module.exports = router
