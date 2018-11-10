const router = require('express').Router()

const {
  adjustQuery,
  findUserById,
} = require('./controller')
const send = require('../send')

router.route('/')
  .get(adjustQuery, findUserById, send)

module.exports = router
